#!/usr/bin/env python3
from pathlib import Path
import json
import os
import urllib.error
import urllib.request

val = os.environ["POSTHOG_KEY_VALUE"].strip()
paths = [
    Path(r"C:\Users\Administrator\AppData\Local\hermes\profiles\trading\.env"),
    Path(r"C:\Users\Administrator\.hermes\.env"),
]

base_kv = {
    "MEGALODOME_POSTHOG_KEY": val,
    "MEGALODOME_POSTHOG_HOST": "https://us.i.posthog.com",
    "POSTHOG_API_KEY_MEGALODOME": val,
}


def upsert_env(path: Path, kv: dict) -> None:
    lines = path.read_text(encoding="utf-8", errors="ignore").splitlines() if path.exists() else []
    out = []
    seen = set()
    for line in lines:
        matched = False
        for k, v in kv.items():
            if line.startswith(k + "="):
                out.append(k + "=" + v)
                seen.add(k)
                matched = True
                break
        if not matched:
            out.append(line)
    for k, v in kv.items():
        if k not in seen and v != "":
            out.append(k + "=" + v)
    path.write_text("\n".join(out) + "\n", encoding="utf-8")
    try:
        path.chmod(0o600)
    except Exception:
        pass


for p in paths:
    upsert_env(p, base_kv)
    print("updated", p.name)

print("key_len", len(val), "looks_like_phc", val.startswith("phc_"))


def try_req(url: str, headers: dict):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode(errors="ignore")
            try:
                data = json.loads(body)
            except Exception:
                data = {"raw": body[:300]}
            return resp.status, data
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="ignore")
        try:
            data = json.loads(body)
        except Exception:
            data = {"raw": body[:300]}
        return e.code, data
    except Exception as e:
        return None, {"error": str(e)}


best_host = None
best_auth = None
for host in ["https://us.posthog.com", "https://app.posthog.com", "https://eu.posthog.com"]:
    for auth in [f"Bearer {val}", f"Bearer phx_{val}"]:
        status, data = try_req(
            host + "/api/projects/",
            {"Authorization": auth, "User-Agent": "hermes-megalodome"},
        )
        print("projects", host, auth[:18] + "...", status)
        if status == 200:
            best_host = host
            best_auth = auth
            items = data.get("results") if isinstance(data, dict) else data
            slim = []
            for proj in items or []:
                if isinstance(proj, dict):
                    slim.append(
                        {
                            "id": proj.get("id"),
                            "uuid": proj.get("uuid"),
                            "name": proj.get("name"),
                        }
                    )
            print("PROJECTS", json.dumps(slim, indent=2)[:2000])
            Path(r"C:\Projects\dizzat\megalodome\reports\posthog_projects.json").write_text(
                json.dumps(data, indent=2)[:8000], encoding="utf-8"
            )
            break
    if best_host:
        break

# Project/public key decide endpoint
for host in ["https://us.i.posthog.com", "https://eu.i.posthog.com"]:
    payload = json.dumps({"token": val, "distinct_id": "hermes-verify"}).encode()
    req = urllib.request.Request(
        host + "/decide/?v=3",
        data=payload,
        method="POST",
        headers={"Content-Type": "application/json", "User-Agent": "hermes-megalodome"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print("decide", host, resp.status, resp.read()[:120])
    except urllib.error.HTTPError as e:
        print("decide", host, e.code, e.read()[:120])
    except Exception as e:
        print("decide", host, "err", e)

project_api_key = None
project_id = None
ingest_host = "https://us.i.posthog.com"

if best_host and best_auth:
    st, me = try_req(
        best_host + "/api/users/@me/",
        {"Authorization": best_auth, "User-Agent": "hermes-megalodome"},
    )
    print("ME_STATUS", st)
    if st == 200 and isinstance(me, dict):
        print(
            "ME",
            {
                k: me.get(k)
                for k in ("uuid", "email", "first_name", "last_name")
                if k in me
            },
        )
        team = me.get("team") or {}
        if isinstance(team, dict):
            project_api_key = team.get("api_token") or team.get("api_key")
            project_id = team.get("id")
            print(
                "TEAM",
                {
                    "id": team.get("id"),
                    "name": team.get("name"),
                    "has_api_token": bool(project_api_key),
                },
            )

    st, data = try_req(
        best_host + "/api/projects/",
        {"Authorization": best_auth, "User-Agent": "hermes-megalodome"},
    )
    items = data.get("results") if isinstance(data, dict) else data
    if items:
        pid = items[0].get("id")
        project_id = pid
        st2, det = try_req(
            f"{best_host}/api/projects/{pid}/",
            {"Authorization": best_auth, "User-Agent": "hermes-megalodome"},
        )
        print("PROJECT_DETAIL", st2)
        if st2 == 200 and isinstance(det, dict):
            project_api_key = det.get("api_token") or det.get("api_key") or project_api_key
            print(
                "PROJECT",
                {
                    "id": det.get("id"),
                    "name": det.get("name"),
                    "has_api_token": bool(project_api_key),
                },
            )
    if "eu" in best_host:
        ingest_host = "https://eu.i.posthog.com"

env_local = Path(r"C:\Projects\dizzat\megalodome\.env.local")
text = env_local.read_text(encoding="utf-8") if env_local.exists() else ""
lines = [
    l
    for l in text.splitlines()
    if not l.startswith("NEXT_PUBLIC_POSTHOG")
    and not l.startswith("POSTHOG_")
]

if project_api_key:
    more = {
        "MEGALODOME_POSTHOG_PROJECT_API_KEY": project_api_key,
        "NEXT_PUBLIC_POSTHOG_KEY_MEGALODOME": project_api_key,
        "MEGALODOME_POSTHOG_HOST": ingest_host,
        "NEXT_PUBLIC_POSTHOG_HOST_MEGALODOME": ingest_host,
        "MEGALODOME_POSTHOG_PROJECT_ID": str(project_id or ""),
        "MEGALODOME_POSTHOG_API_HOST": best_host or "",
        "MEGALODOME_POSTHOG_PERSONAL_KEY": val,
    }
    for p in paths:
        upsert_env(p, more)
    lines += [
        f"NEXT_PUBLIC_POSTHOG_KEY={project_api_key}",
        f"NEXT_PUBLIC_POSTHOG_HOST={ingest_host}",
        f"POSTHOG_PERSONAL_API_KEY={val}",
    ]
    status = "verified_with_project_key"
    print("STORED_PROJECT_KEY_LEN", len(project_api_key), "host", ingest_host)
elif best_host:
    lines += [f"POSTHOG_PERSONAL_API_KEY={val}"]
    status = "verified_personal_only_missing_project_token"
else:
    # Maybe this already is a project token in unusual format; keep candidate
    lines += [
        f"POSTHOG_KEY_CANDIDATE={val}",
        "NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com",
    ]
    status = "unverified_need_phc_project_key"

env_local.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")

stub = Path(r"C:\Projects\dizzat\megalodome\TOKENS.txt")
slines = []
if stub.exists():
    for l in stub.read_text(encoding="utf-8", errors="ignore").splitlines():
        if l.startswith("POSTHOG_"):
            continue
        slines.append(l)
slines += [
    f"POSTHOG_STATUS={status}",
    f"POSTHOG_HOST={ingest_host if project_api_key else (best_host or 'unknown')}",
]
stub.write_text("\n".join(slines).strip() + "\n", encoding="utf-8")
print("FINAL_STATUS", status)
