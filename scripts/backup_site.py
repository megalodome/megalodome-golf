#!/usr/bin/env python3
"""Crawl and backup megalodomegolf.com pages, assets, and link map."""
from __future__ import annotations

import hashlib
import json
import mimetypes
import re
import time
import urllib.parse
from collections import deque
from pathlib import Path

import requests
from bs4 import BeautifulSoup

START = "https://megalodomegolf.com/"
ROOT = Path(r"C:\Projects\dizzat\megalodome\backup")
PAGES_DIR = ROOT / "pages"
ASSETS_DIR = ROOT / "assets"
REPORTS_DIR = Path(r"C:\Projects\dizzat\megalodome\reports")
MAX_PAGES = 200
MAX_ASSETS = 2000
TIMEOUT = 45
SLEEP = 0.35

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36"
)

session = requests.Session()
session.headers.update(
    {
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
    }
)

for d in (ROOT, PAGES_DIR, ASSETS_DIR, REPORTS_DIR):
    d.mkdir(parents=True, exist_ok=True)


def same_site(url: str) -> bool:
    try:
        p = urllib.parse.urlparse(url)
    except Exception:
        return False
    if p.scheme not in ("http", "https", ""):
        return False
    host = (p.hostname or "").lower()
    return host in {"", "megalodomegolf.com", "www.megalodomegolf.com"}


def normalize_page_url(url: str, base: str) -> str | None:
    abs_url = urllib.parse.urljoin(base, url)
    p = urllib.parse.urlparse(abs_url)
    if p.scheme not in ("http", "https"):
        return None
    if not same_site(abs_url):
        return None
    # drop fragments
    clean = p._replace(fragment="", netloc="megalodomegolf.com")
    # strip common tracking
    q = urllib.parse.parse_qsl(clean.query, keep_blank_values=True)
    q = [(k, v) for (k, v) in q if not k.lower().startswith("utm_")]
    clean = clean._replace(query=urllib.parse.urlencode(q))
    path = clean.path or "/"
    if path != "/" and path.endswith("/"):
        path = path.rstrip("/")
    clean = clean._replace(path=path)
    return urllib.parse.urlunparse(clean)


def normalize_asset_url(url: str, base: str) -> str | None:
    if not url or url.startswith("data:") or url.startswith("javascript:"):
        return None
    abs_url = urllib.parse.urljoin(base, url)
    p = urllib.parse.urlparse(abs_url)
    if p.scheme not in ("http", "https"):
        return None
    return urllib.parse.urlunparse(p._replace(fragment=""))


def page_filename(url: str) -> str:
    p = urllib.parse.urlparse(url)
    path = p.path.strip("/") or "index"
    path = re.sub(r"[^a-zA-Z0-9._/-]+", "_", path)
    if p.query:
        h = hashlib.sha1(p.query.encode()).hexdigest()[:8]
        path = f"{path}__q_{h}"
    if not path.endswith(".html"):
        path = path + ".html"
    return path.replace("/", "__")


def asset_path_for(url: str, content_type: str | None) -> Path:
    p = urllib.parse.urlparse(url)
    host = p.hostname or "unknown"
    path = p.path or "/file"
    if path.endswith("/"):
        path += "index"
    # ensure extension
    ext = Path(path).suffix
    if not ext:
        guess = mimetypes.guess_extension((content_type or "").split(";")[0].strip() or "") or ""
        if guess == ".jpe":
            guess = ".jpg"
        path = path + (guess or ".bin")
    rel = Path(host) / path.lstrip("/")
    if p.query:
        h = hashlib.sha1(p.query.encode()).hexdigest()[:10]
        rel = rel.with_name(rel.stem + f"__{h}" + rel.suffix)
    # sanitize
    parts = []
    for part in rel.parts:
        parts.append(re.sub(r"[^a-zA-Z0-9._-]+", "_", part)[:120] or "_")
    return ASSETS_DIR.joinpath(*parts)


def extract_urls_from_css(css_text: str, base: str) -> set[str]:
    found = set()
    for m in re.finditer(r"url\(([^)]+)\)", css_text, flags=re.I):
        raw = m.group(1).strip().strip("\"'")
        u = normalize_asset_url(raw, base)
        if u:
            found.add(u)
    return found


def parse_srcset(value: str, base: str) -> set[str]:
    out = set()
    if not value:
        return out
    for part in value.split(","):
        bit = part.strip().split(" ")[0].strip()
        u = normalize_asset_url(bit, base)
        if u:
            out.add(u)
    return out


def main() -> None:
    queue: deque[str] = deque([normalize_page_url(START, START) or START])
    seen_pages: set[str] = set()
    seen_assets: set[str] = set()
    external_links: set[str] = set()
    page_records = []
    asset_records = []
    errors = []

    # seed robots/sitemap if present
    for seed in (
        "https://megalodomegolf.com/robots.txt",
        "https://megalodomegolf.com/sitemap.xml",
        "https://megalodomegolf.com/sitemap_index.xml",
    ):
        try:
            r = session.get(seed, timeout=TIMEOUT)
            if r.status_code == 200 and r.content:
                dest = ROOT / Path(urllib.parse.urlparse(seed).path.lstrip("/") or "seed.txt")
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(r.content)
                text = r.text
                for m in re.finditer(r"https?://[^\s<>\"']+", text):
                    u = m.group(0).rstrip(").,;")
                    nu = normalize_page_url(u, START)
                    if nu and nu not in seen_pages:
                        queue.append(nu)
                print(f"seed {seed} -> {r.status_code} {len(r.content)}b")
            else:
                print(f"seed {seed} -> {r.status_code}")
        except Exception as e:
            errors.append({"url": seed, "error": str(e)})
            print(f"seed fail {seed}: {e}")

    while queue and len(seen_pages) < MAX_PAGES:
        url = queue.popleft()
        if not url or url in seen_pages:
            continue
        seen_pages.add(url)
        print(f"[page {len(seen_pages)}] {url}")
        try:
            time.sleep(SLEEP)
            r = session.get(url, timeout=TIMEOUT, allow_redirects=True)
            final = r.url
            ctype = (r.headers.get("content-type") or "").lower()
            content = r.content
            fname = page_filename(url)
            fpath = PAGES_DIR / fname
            fpath.write_bytes(content)

            rec = {
                "url": url,
                "final_url": final,
                "status": r.status_code,
                "content_type": ctype,
                "bytes": len(content),
                "file": str(fpath),
                "title": None,
                "internal_links": [],
                "external_links": [],
                "assets": [],
            }

            if "html" in ctype or content[:200].lstrip().lower().startswith((b"<!doctype", b"<html")):
                soup = BeautifulSoup(content, "lxml")
                if soup.title and soup.title.string:
                    rec["title"] = soup.title.string.strip()

                # links
                for a in soup.find_all("a", href=True):
                    href = a.get("href", "").strip()
                    abs_u = urllib.parse.urljoin(final, href)
                    if same_site(abs_u):
                        nu = normalize_page_url(href, final)
                        if nu:
                            rec["internal_links"].append(
                                {"text": " ".join((a.get_text() or "").split())[:120], "href": nu}
                            )
                            if nu not in seen_pages:
                                queue.append(nu)
                    else:
                        if abs_u.startswith("http"):
                            rec["external_links"].append(
                                {"text": " ".join((a.get_text() or "").split())[:120], "href": abs_u}
                            )
                            external_links.add(abs_u)

                # assets from tags
                asset_candidates: set[str] = set()
                for tag, attr in (
                    ("img", "src"),
                    ("img", "data-src"),
                    ("img", "data-lazy-src"),
                    ("source", "src"),
                    ("video", "src"),
                    ("video", "poster"),
                    ("audio", "src"),
                    ("script", "src"),
                    ("link", "href"),
                    ("use", "href"),
                    ("image", "href"),
                ):
                    for el in soup.find_all(tag):
                        val = el.get(attr)
                        if not val:
                            continue
                        # link tags: only stylesheet/icons/preload assets
                        if tag == "link":
                            rel = " ".join(el.get("rel") or []).lower()
                            as_attr = (el.get("as") or "").lower()
                            if not any(
                                x in rel
                                for x in (
                                    "stylesheet",
                                    "icon",
                                    "apple-touch-icon",
                                    "preload",
                                    "prefetch",
                                    "manifest",
                                )
                            ) and as_attr not in {"image", "style", "font", "script"}:
                                # still capture image preloads etc.
                                if "image" not in rel and as_attr != "image":
                                    continue
                        u = normalize_asset_url(val, final)
                        if u:
                            asset_candidates.add(u)

                for el in soup.find_all(True):
                    for attr in ("srcset", "data-srcset"):
                        if el.get(attr):
                            asset_candidates |= parse_srcset(el.get(attr), final)
                    style = el.get("style")
                    if style:
                        asset_candidates |= extract_urls_from_css(style, final)

                # meta images
                for el in soup.find_all("meta"):
                    prop = (el.get("property") or el.get("name") or "").lower()
                    if prop in {"og:image", "twitter:image", "og:image:url"} and el.get("content"):
                        u = normalize_asset_url(el["content"], final)
                        if u:
                            asset_candidates.add(u)

                # inline style/script url references on same page html
                asset_candidates |= extract_urls_from_css(content.decode("utf-8", errors="ignore"), final)

                rec["assets"] = sorted(asset_candidates)
                for aurl in asset_candidates:
                    if aurl not in seen_assets and len(seen_assets) < MAX_ASSETS:
                        seen_assets.add(aurl)
                        # download later in second phase list
                        asset_records.append({"url": aurl, "from_page": url, "status": None})

                # unique preserve order
                seen_i = set()
                il = []
                for item in rec["internal_links"]:
                    if item["href"] in seen_i:
                        continue
                    seen_i.add(item["href"])
                    il.append(item)
                rec["internal_links"] = il

            page_records.append(rec)
            print(f"  status={r.status_code} bytes={len(content)} title={rec.get('title')!r} links={len(rec['internal_links'])} assets={len(rec['assets'])}")
        except Exception as e:
            errors.append({"url": url, "error": str(e)})
            page_records.append({"url": url, "error": str(e)})
            print(f"  ERROR {e}")

    # download assets
    print(f"\nDownloading up to {len(asset_records)} assets...")
    final_assets = []
    for i, item in enumerate(list(asset_records), 1):
        url = item["url"]
        try:
            time.sleep(0.15)
            r = session.get(url, timeout=TIMEOUT, allow_redirects=True, stream=True)
            ctype = r.headers.get("content-type")
            data = r.content
            path = asset_path_for(url, ctype)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            rec = {
                "url": url,
                "final_url": r.url,
                "status": r.status_code,
                "content_type": ctype,
                "bytes": len(data),
                "file": str(path),
                "from_page": item.get("from_page"),
            }
            final_assets.append(rec)
            if i % 25 == 0 or i == 1:
                print(f"  [asset {i}/{len(asset_records)}] {r.status_code} {len(data)}b {url[:100]}")
            # if css, pull nested urls
            if ctype and "css" in ctype.lower() and len(final_assets) < MAX_ASSETS:
                nested = extract_urls_from_css(data.decode("utf-8", errors="ignore"), r.url)
                for nu in nested:
                    if nu not in seen_assets and len(seen_assets) < MAX_ASSETS:
                        seen_assets.add(nu)
                        asset_records.append({"url": nu, "from_page": url, "status": None})
        except Exception as e:
            errors.append({"url": url, "error": str(e)})
            final_assets.append({"url": url, "error": str(e), "from_page": item.get("from_page")})

    # write reports
    summary = {
        "start": START,
        "pages_crawled": len(page_records),
        "assets_downloaded": len([a for a in final_assets if a.get("status") == 200]),
        "assets_attempted": len(final_assets),
        "external_links_count": len(external_links),
        "errors_count": len(errors),
        "backup_root": str(ROOT),
    }
    (REPORTS_DIR / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    (REPORTS_DIR / "pages.json").write_text(json.dumps(page_records, indent=2), encoding="utf-8")
    (REPORTS_DIR / "assets.json").write_text(json.dumps(final_assets, indent=2), encoding="utf-8")
    (REPORTS_DIR / "external_links.json").write_text(
        json.dumps(sorted(external_links), indent=2), encoding="utf-8"
    )
    (REPORTS_DIR / "errors.json").write_text(json.dumps(errors, indent=2), encoding="utf-8")

    # human markdown report
    lines = [
        f"# Megalodome Golf site backup report",
        "",
        f"- Source: {START}",
        f"- Pages crawled: {summary['pages_crawled']}",
        f"- Assets OK: {summary['assets_downloaded']} / {summary['assets_attempted']}",
        f"- External links: {summary['external_links_count']}",
        f"- Errors: {summary['errors_count']}",
        f"- Backup dir: `{ROOT}`",
        "",
        "## Pages",
        "",
        "| Status | Title | URL | Bytes | Internal links | Assets |",
        "|---:|---|---|---:|---:|---:|",
    ]
    for p in page_records:
        if p.get("error"):
            lines.append(f"| ERR |  | {p.get('url')} |  |  | {p.get('error')} |")
        else:
            title = (p.get("title") or "").replace("|", "/")
            lines.append(
                f"| {p.get('status')} | {title} | {p.get('url')} | {p.get('bytes')} | {len(p.get('internal_links') or [])} | {len(p.get('assets') or [])} |"
            )
    lines += ["", "## External links", ""]
    for u in sorted(external_links)[:300]:
        lines.append(f"- {u}")
    (REPORTS_DIR / "BACKUP_REPORT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print("\nDONE")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
