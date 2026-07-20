#!/usr/bin/env python3
"""Generate investor PDF packs from extracted markdown."""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(r"C:\Projects\dizzat\megalodome")
EXT = ROOT / "investor-docs" / "extracted"
PUB = ROOT / "web" / "public" / "docs" / "investor"
PUB.mkdir(parents=True, exist_ok=True)

GREEN = HexColor("#0d1f18")
GOLD = HexColor("#c6a75e")
TEXT = HexColor("#1a1a1a")
MUTED = HexColor("#444444")

styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CoverTitle",
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=GREEN,
        alignment=TA_CENTER,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverSub",
        fontName="Helvetica",
        fontSize=11,
        leading=14,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="H1c",
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=GREEN,
        spaceBefore=12,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="H2c",
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=HexColor("#3d5c4a"),
        spaceBefore=9,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Bodyc",
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        textColor=TEXT,
        alignment=TA_JUSTIFY,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        name="Bulletc",
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        textColor=TEXT,
        leftIndent=12,
        spaceAfter=3,
    )
)
styles.add(
    ParagraphStyle(
        name="Disclaim",
        fontName="Helvetica-Oblique",
        fontSize=7.5,
        leading=10,
        textColor=MUTED,
        spaceBefore=10,
    )
)
styles.add(
    ParagraphStyle(
        name="Meta",
        fontName="Helvetica",
        fontSize=8,
        leading=10,
        textColor=MUTED,
        alignment=TA_CENTER,
    )
)

DISCLAIMER = (
    "CONFIDENTIAL — for accredited investors only. Not an offer to sell or a solicitation "
    "to buy any security. Any offering is made solely through the Confidential Private "
    "Placement Memorandum of MEGALODOME GOLF Equity Fund I LLC and its subscription "
    "documents under Rule 506(c) of Regulation D. Projections are modeled estimates, not "
    "guarantees; actual results will differ. Equity classes and waterfall figures may be "
    "illustrative and subject to counsel review."
)


def esc(s: str) -> str:
    return html.escape(s).replace("\n", "<br/>")


def md_to_flowables(text: str):
    lines = text.splitlines()
    if lines and lines[0].startswith("# "):
        lines = lines[1:]
    flow = []
    buf: list[str] = []

    def flush_buf():
        nonlocal buf
        if not buf:
            return
        para = " ".join(buf).strip()
        buf = []
        if para:
            flow.append(Paragraph(esc(para), styles["Bodyc"]))

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_buf()
            continue
        if line.startswith("## "):
            flush_buf()
            flow.append(Paragraph(esc(line[3:]), styles["H1c"]))
            continue
        if line.startswith("# "):
            flush_buf()
            flow.append(Paragraph(esc(line[2:]), styles["H1c"]))
            continue
        if line.startswith("[Table"):
            flush_buf()
            flow.append(Paragraph(esc(line), styles["H2c"]))
            continue
        if " | " in line and len(line) < 320:
            flush_buf()
            flow.append(Paragraph(esc(line), styles["Bulletc"]))
            continue
        if re.match(r"^[-•]\s+", line) or re.match(r"^\d+\.\s+", line):
            flush_buf()
            cleaned = re.sub(r"^[-•]\s+", "", re.sub(r"^\d+\.\s+", "", line))
            flow.append(Paragraph("• " + esc(cleaned), styles["Bulletc"]))
            continue
        if line.startswith("Q.") or line.startswith("Q "):
            flush_buf()
            flow.append(Paragraph(esc(line), styles["H2c"]))
            continue
        buf.append(line)
    flush_buf()
    return flow


def build_pdf(out_path: Path, title: str, subtitle: str, source_md: Path, tier_label: str):
    text = source_md.read_text(encoding="utf-8") if source_md.exists() else title
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=LETTER,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
        title=title,
        author="MEGALODOME GOLF",
    )
    story = [
        Spacer(1, 0.25 * inch),
        Paragraph("MEGALODOME GOLF", styles["CoverTitle"]),
        Paragraph("THE NEXT REVOLUTION™", styles["CoverSub"]),
        Spacer(1, 0.08 * inch),
        HRFlowable(width="100%", thickness=1, color=GOLD, spaceBefore=4, spaceAfter=10),
        Paragraph(esc(title), styles["CoverTitle"]),
    ]
    if subtitle:
        story.append(Paragraph(esc(subtitle), styles["CoverSub"]))
    story.extend(
        [
            Paragraph(esc(tier_label), styles["Meta"]),
            Paragraph(
                esc(
                    "MEGALODOME GOLF Equity Fund I LLC · Chicago West (Oswego, IL) · Reg D 506(c)"
                ),
                styles["Meta"],
            ),
            Spacer(1, 0.12 * inch),
            HRFlowable(
                width="100%",
                thickness=0.5,
                color=HexColor("#cccccc"),
                spaceBefore=2,
                spaceAfter=12,
            ),
        ]
    )
    story.extend(md_to_flowables(text))
    story.extend(
        [
            Spacer(1, 0.15 * inch),
            HRFlowable(
                width="100%",
                thickness=0.5,
                color=HexColor("#cccccc"),
                spaceBefore=8,
                spaceAfter=8,
            ),
            Paragraph(esc(DISCLAIMER), styles["Disclaim"]),
        ]
    )
    doc.build(story)
    print(f"PDF {out_path.name} ({out_path.stat().st_size} bytes)")


def main():
    docs = [
        (
            "one-pager.pdf",
            "Investor One-Pager",
            "Teaser overview",
            "Megalodome_One-Pager.md",
            "Tier 0 — Public solicitation material",
        ),
        (
            "pitch-deck-summary.pdf",
            "Pitch Deck (Text Summary)",
            "Slide narrative export",
            "Megalodome_Pitch_Deck.md",
            "Tier 0 — Public solicitation material",
        ),
        (
            "executive-summary.pdf",
            "Executive Summary",
            "Institutional overview of Fund I",
            "Megalodome_Executive_Summary.md",
            "Tier 1 — Pre-meeting pack",
        ),
        (
            "proforma-summary.pdf",
            "Pro-Forma Summary",
            "One-page modeled financial snapshot",
            "Megalodome_ProForma_Summary.md",
            "Tier 1 — Pre-meeting pack",
        ),
        (
            "investor-roadmap.pdf",
            "Investor Roadmap",
            "Project path and capital journey",
            "Megalodome_Investor_Roadmap.md",
            "Tier 1 — Pre-meeting pack",
        ),
        (
            "investor-faq.pdf",
            "Investor FAQ",
            "Objection-handling guide",
            "Megalodome_Investor_FAQ.md",
            "Tier 1 — Pre-meeting pack",
        ),
        (
            "abbreviations-key.pdf",
            "Abbreviations & Terms Key",
            "Reference aid for Fund I materials",
            "Megalodome_Abbreviations_Key.md",
            "Tier 1 — Pre-meeting pack",
        ),
        (
            "mutual-nda.pdf",
            "Mutual NDA",
            "Non-disclosure & non-circumvention template",
            "Megalodome_Mutual_NDA.md",
            "Tier 2 — Execute before data room",
        ),
        (
            "target-asset-preview.pdf",
            "Target Asset Preview",
            "Chicago West flagship overview",
            "Megalodome_Target_Asset_Preview.md",
            "Tier 2 — Data room (NDA)",
        ),
    ]

    for fname, title, sub, md, tier in docs:
        build_pdf(PUB / fname, title, sub, EXT / md, tier)

    index = {
        "tier0": [
            {"title": "One-Pager", "file": "/docs/investor/one-pager.pdf"},
            {
                "title": "Pitch Deck Summary",
                "file": "/docs/investor/pitch-deck-summary.pdf",
            },
            {"title": "Marketing Flyer 2026", "file": "/docs/flyer-2026.pdf"},
        ],
        "tier1": [
            {
                "title": "Executive Summary",
                "file": "/docs/investor/executive-summary.pdf",
            },
            {
                "title": "Pro-Forma Summary",
                "file": "/docs/investor/proforma-summary.pdf",
            },
            {
                "title": "Investor Roadmap",
                "file": "/docs/investor/investor-roadmap.pdf",
            },
            {"title": "Investor FAQ", "file": "/docs/investor/investor-faq.pdf"},
            {
                "title": "Abbreviations Key",
                "file": "/docs/investor/abbreviations-key.pdf",
            },
        ],
        "tier2": [
            {"title": "Mutual NDA", "file": "/docs/investor/mutual-nda.pdf"},
            {
                "title": "Target Asset Preview",
                "file": "/docs/investor/target-asset-preview.pdf",
                "requiresNda": True,
            },
        ],
    }
    (PUB / "index.json").write_text(json.dumps(index, indent=2), encoding="utf-8")
    print("Wrote index.json with", len(list(PUB.glob("*.pdf"))), "PDFs")


if __name__ == "__main__":
    main()
