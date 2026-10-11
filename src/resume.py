"""Master résumé (one A4 page) for the portfolio: Founder's Office, product, design and analyst roles.

Run from the repo root:  python src/resume.py
Writes assets/Vivek_Poddar_Resume.pdf, which the site links to.

Rules: product manager's voice (problem, what shipped, how it's measured); no employer-confidential
data (no Butter Search numbers, clients or internal links); AI only as fluency; no em dashes.
Facts come from the earlier résumé, the case studies and the live sites.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "Vivek_Poddar_Resume.pdf")
INK, GREY, ACC = HexColor("#15140f"), HexColor("#5f5b50"), HexColor("#2a37f0")
LINK = "#2a37f0"
SITE = "https://poddarvivek.github.io/"


def a(url, text):
    return f'<a href="{url}" color="{LINK}"><u>{text}</u></a>'


TITLE = "Founder's Office  |  Product Management  |  Product Design  |  Business Analytics"

SUMMARY = (
    "Engineer from <b>NIT Kurukshetra</b> (B.Tech ECE, 2026), an Institute of National Importance, now in the "
    "<b>Founder's Office at Butter Search</b>, where I own client acquisition. I work out what's worth building, "
    "then design and ship it: <b>four live products</b> across fintech, healthtech, edtech and food delivery, each "
    "framed by a problem, a decision and a success metric. Comfortable with founders, data and Figma alike. "
    "AI-first: fluent in Claude, ChatGPT and n8n."
)

EXPERIENCE = [
    dict(role="Founder's Office, Butter Search", when="Jul 2026 – Present",
         meta=f"Boutique executive search firm founded by IIM Calcutta alumni, hiring leaders for VC-backed startups  |  {a('https://www.buttersearch.co', 'buttersearch.co')}",
         points=[
             "Own the client-acquisition funnel end to end; defined five stages from hiring signal to signed mandate, each with an entry rule and a conversion metric.",
             "Prioritise target startups on dated hiring signals such as funding rounds and leadership hires, segmented by stage, sector and leadership gaps.",
             "Run discovery calls with founders and turn their needs into structured hiring briefs for the search team.",
             "Built the founder's funnel dashboard and daily report (stage counts, conversion, hot leads, due follow-ups); introduced a trigger-led first message and a two-day follow-up cadence.",
         ]),
    dict(role="Freelance Product Designer", when="Aug 2026 – Present",
         meta=f"Client projects in fintech and edtech  |  {a(SITE + 'case-studies/', 'Case studies')}",
         points=[
             f"<b>{a(SITE + 'case-studies/maitry-finance.html', 'Maitry Finance')}</b> (RBI-registered NBFC): a dead website brought in no leads. Rebuilt the information architecture around borrowers' worries, put RBI trust signals first, and shipped an EMI calculator and one-tap contact, with enquiries captured in Supabase.",
             f"<b>{a(SITE + 'case-studies/rinkal-coaching.html', 'Rinkal Coaching')}</b>: parents ignored the enquiry form and preferred WhatsApp. Shipped a tap-to-compose WhatsApp enquiry that takes about 20 seconds, with separate journeys for parents and students.",
             "Led both from discovery to launch: user research, scope, wireframes, design system, Next.js build and deployment.",
         ]),
    dict(role="Product Analytics & Development Intern, Grrowup", when="Jun 2024 – Jul 2024",
         meta="Remote",
         points=[
             "Worked with product managers, developers and designers; prototyped features to improve engagement and conversion.",
             "Integrated 20+ REST APIs and improved operational data reliability by 30%, enabling accurate KPI tracking.",
         ]),
]

PRODUCTS = [
    dict(role=f"ClinicAI, AI front desk for independent clinics  |  {a('https://clinic-ai-pi.vercel.app/', 'Live')}  |  {a(SITE + 'case-studies/clinicai.html', 'Case study')}",
         when="Own product",
         points=[
             "Small clinics lose patients to unanswered calls. Shipped an AI receptionist (English, Hindi, Bengali) that books inside the clinic's rules and routes every exception to the doctor for approval.",
             "Set the North Star (AI-booked appointments per clinic per week) and activation (a test call books a real slot within 10 minutes of sign-up); designed the onboarding, approval dashboard and patient portal.",
         ]),
    dict(role=f"Spotted, a social tab concept for Swiggy  |  {a(SITE + 'spotted/', 'Prototype')}  |  {a(SITE + 'case-studies/spotted.html', 'Case study')}",
         when="Concept",
         points=[
             "Ordering in is social but happens alone, and generic pushes get ignored. Designed live friend orders, stickers and one-tap “order the same”, with a research-backed impact model and a 4-week experiment measured on orders per user per week.",
         ]),
    dict(role="Product and data projects", when="SQL  |  Python  |  Power BI",
         points=[
             f"{a('https://poddarvivek.github.io/parkplus/', 'Park+ onboarding teardown')} with a metric tree, funnel model and sample-size calculator; {a('https://github.com/PoddarVivek/HyperScan-KYC', 'HyperScan')} digital KYC flow with a PRD.",
             f"Analysed 15,000+ customer records for churn drivers; {a('https://github.com/PoddarVivek/sales-data-analytics-pipeline', 'retail sales pipeline')} (September to December brings 57% of revenue); {a('https://github.com/PoddarVivek/spam-classifier', 'SMS spam classifier')} (held-out F1 0.945 to 0.969); {a('https://github.com/PoddarVivek/t20-worldcup-data-analytics', 'T20 World Cup')} and {a('https://github.com/PoddarVivek/Lown-Hospital-Index-for-Equity-SQL', 'hospital equity')} analyses.",
         ]),
]

SKILLS = [
    ("Product", "discovery, problem framing, PRDs, success metrics and North Star, funnel design, experiment design, product teardowns, stakeholder management"),
    ("Design", "Figma, wireframing, prototyping, user flows, information architecture, design systems, mobile-first UI"),
    ("Business &amp; data", "market research, founder discovery, pipeline and funnel reporting, SQL, Python, Excel, Power BI, Tableau"),
    ("Build &amp; AI", "HTML, CSS, JavaScript, Next.js, Supabase, Git; AI-first with Claude, ChatGPT and n8n"),
    ("Certifications", "GenAI Powered Data Analytics (Tata × Forage, 2026); The Complete SQL Bootcamp (Udemy, 2025)"),
]

LEADERSHIP = [
    "<b>Logistics Lead, Confluence</b> (NIT Kurukshetra annual fest): ran logistics for marquee acts across 10 to 15 vendors, stage operations, artists and audience flow.",
    "<b>Committee Head</b>, Model United Nations and Confluence 2025; <b>Publicity Head</b>, ELAD literary and debating club; district-level cricketer (CAB).",
]


def build(scale):
    s = lambda n: n * scale
    st = dict(
        name=ParagraphStyle("n", fontName="Helvetica-Bold", fontSize=s(22), leading=s(25), textColor=INK, alignment=TA_LEFT),
        sub=ParagraphStyle("s", fontName="Helvetica-Bold", fontSize=s(9.6), leading=s(12.5), textColor=ACC),
        contact=ParagraphStyle("c", fontName="Helvetica", fontSize=s(8.8), leading=s(11.6), textColor=INK),
        h=ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=s(10.2), leading=s(12.5), textColor=INK, spaceBefore=s(7)),
        body=ParagraphStyle("b", fontName="Helvetica", fontSize=s(9.1), leading=s(11.9), textColor=INK),
        role=ParagraphStyle("r", fontName="Helvetica-Bold", fontSize=s(9.7), leading=s(12), textColor=INK),
        right=ParagraphStyle("rt", fontName="Helvetica", fontSize=s(9), leading=s(12), textColor=GREY, alignment=2),
        meta=ParagraphStyle("m", fontName="Helvetica-Oblique", fontSize=s(8.7), leading=s(11.2), textColor=GREY),
        bul=ParagraphStyle("bl", fontName="Helvetica", fontSize=s(9.1), leading=s(11.9), textColor=INK, leftIndent=s(10), bulletIndent=s(1)),
    )
    W = A4[0] - 2 * 38 - 12  # frame has 6pt padding on each side

    def head(t):
        return [Paragraph(t, st["h"]), HRFlowable(width="100%", thickness=0.9, color=INK, spaceBefore=1, spaceAfter=s(3))]

    def row(left, right):
        t = Table([[Paragraph(left, st["role"]), Paragraph(right, st["right"])]], colWidths=[W * 0.76, W * 0.24])
        t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                               ("TOPPADDING", (0, 0), (-1, -1), s(3.5)), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                               ("VALIGN", (0, 0), (-1, -1), "BOTTOM")]))
        return t

    def bullets(points):
        return [Paragraph(p, st["bul"], bulletText="•") for p in points]

    def entry(e):
        parts = [row(e["role"].replace("&", "&amp;") if "<a " not in e["role"] else e["role"], e["when"])]
        if e.get("meta"):
            parts.append(Paragraph(e["meta"], st["meta"]))
        return KeepTogether(parts + bullets(e["points"]))

    story = [
        Paragraph("VIVEK PODDAR", st["name"]),
        Paragraph(TITLE, st["sub"]),
        Spacer(1, s(4)),
        Paragraph(f"Kolkata, India (open to Bengaluru, Gurugram, Pune or remote)  |  +91-8597449308  |  "
                  f"{a('mailto:vivekpoddar.work@gmail.com', 'vivekpoddar.work@gmail.com')}", st["contact"]),
        Paragraph(f"<b>Portfolio:</b> {a(SITE, 'poddarvivek.github.io')}  |  "
                  f"{a('https://www.linkedin.com/in/vivekpoddar-work', 'linkedin.com/in/vivekpoddar-work')}  |  "
                  f"{a('https://github.com/PoddarVivek', 'github.com/PoddarVivek')}", st["contact"]),
    ]
    story += head("SUMMARY") + [Paragraph(SUMMARY, st["body"])]
    story += head("EXPERIENCE") + [entry(e) for e in EXPERIENCE]
    story += head("PRODUCTS") + [entry(p) for p in PRODUCTS]
    story += head("SKILLS") + [Paragraph(f"<b>{k}:</b> {v}", st["body"]) for k, v in SKILLS]
    story += head("EDUCATION") + [
        row("B.Tech, Electronics &amp; Communication Engineering, NIT Kurukshetra", "2022 – 2026"),
        Paragraph("Institute of National Importance; admitted through JEE Main", st["meta"]),
    ]
    story += head("LEADERSHIP") + bullets(LEADERSHIP)
    return story


def render():
    for scale in [1.0, 0.98, 0.96, 0.94, 0.92, 0.90, 0.88, 0.86]:
        doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=38, rightMargin=38, topMargin=30, bottomMargin=26,
                                title="Vivek Poddar, Résumé", author="Vivek Poddar",
                                subject="Founder's Office, product management, product design and business analytics")
        doc.build(build(scale))
        if doc.page == 1:
            return scale
    raise RuntimeError("Résumé does not fit on one page")


if __name__ == "__main__":
    print(f"scale {render():.2f} -> {OUT}")
