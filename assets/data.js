/* ============================================================
   EDIT ZONE: all site content lives here.
   ============================================================ */

const CONFIG = {
  email: 'vivekpoddar.work@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vivekpoddar-work',
  github: 'https://github.com/PoddarVivek',
  resume: 'assets/Vivek_Poddar_Resume.pdf',
};

/* ---------- Selected work ----------
   img: screenshot in assets/img; tall:true scrolls the page on hover
   label: replaces the domain shown on the card */
const WORK = [
  {id:'spotted', name:'Spotted', kind:'Swiggy feature concept', sector:'Consumer · food delivery', year:'2026',
   role:'Solo: research, product, UI, prototype',
   url:'https://poddar-vivek-github-io.vercel.app/spotted/', label:'Spotted prototype', img:'assets/img/live-spotted.jpg', tall:true,
   cs:'case-studies/spotted.html',
   brief:'Ordering in is social, but it happens alone. Spotted is a new Swiggy tab where friends see each other\'s orders live, roast them with a sticker and order the same in one tap.',
   did:['Designed a two-phone interactive prototype: a sticker sent on one phone lands on the other',
        'Backed each decision with research on notifications and onboarding, plus a 4-week experiment plan',
        'Built a 4-tap guided try-out that teaches the feature without a tutorial'],
   tags:['Product thinking','UI/UX','Prototyping','Growth'], note:'Self-initiated concept, not affiliated with Swiggy.'},

  {id:'maitry', name:'Maitry Finance', kind:'Client website', sector:'Fintech · RBI-registered NBFC', year:'2026',
   role:'Solo designer and developer',
   url:'https://www.maitryfin.com/', label:'maitryfin.com', img:'assets/img/live-maitry.jpg', tall:true,
   cs:'case-studies/maitry-finance.html',
   brief:'A Kolkata lender had a dead website that brought in no leads. I rebuilt it so borrowers understand every loan and can reach the team in one tap, while meeting RBI disclosure rules.',
   did:['Restructured the information architecture around what borrowers need to know',
        'Put RBI trust signals first and designed an EMI calculator with real numbers',
        'Shipped it end to end in Next.js, with enquiries stored in Supabase for the client'],
   tags:['UI/UX','Information architecture','Next.js','Supabase']},

  {id:'clinic', name:'ClinicAI', kind:'SaaS product', sector:'Healthtech', year:'2026',
   role:'Solo: product, design and build',
   url:'https://clinic-ai-pi.vercel.app/', img:'assets/img/live-clinic.jpg', tall:true,
   cs:'case-studies/clinicai.html',
   brief:'Independent clinics lose patients to missed calls. ClinicAI is an AI receptionist that answers in English, Hindi and Bengali and books into the clinic\'s real schedule.',
   did:['Designed a doctor-approval flow: anything outside the clinic\'s rules becomes a request to approve',
        'Built a 5-step onboarding that ends with a test call booking a real slot',
        'Defined the North Star metric: appointments booked by the AI per clinic per week'],
   tags:['Product strategy','Dashboard design','Next.js','Supabase']},

  {id:'rinkal', name:'Rinkal Coaching', kind:'Client website', sector:'Edtech', year:'2026',
   role:'Solo designer and developer',
   url:'https://rinkal-coaching.vercel.app/', img:'assets/img/live-rinkal.jpg', tall:true,
   cs:'case-studies/rinkal-coaching.html',
   brief:'A home tutor for Classes 8 to 10 had no online presence, and parents weren\'t filling in enquiry forms. I gave her a site built around how parents actually get in touch.',
   did:['Replaced the form with a WhatsApp enquiry builder: tap class, board and subjects to get a ready message',
        'Designed separate journeys for parents and students',
        'Created a mobile-first design system around a notebook metaphor'],
   tags:['UI/UX','Design system','Mobile-first','HTML/CSS/JS']},
];

/* ---------- Experience ---------- */
const EXPERIENCE = [
  {when:'Jul 2026 – now', title:'Founder\'s Office, Business Relations & Research', org:'Butter Search · executive search for VC-backed startups',
   points:['Segment VC-backed startups by funding stage, sector and leadership gaps into a ranked prospect pipeline',
           'Run discovery conversations with founders and turn their needs into structured requirement briefs',
           'Built an Excel pipeline tracker and use response and conversion trends to sharpen targeting']},
  {when:'Aug 2026 – now', title:'Freelance UI/UX & Product Designer', org:'Independent · fintech and education clients',
   points:['Revived Maitry Finance\'s defunct lending website: new information architecture, RBI trust signals, an EMI calculator',
           'Launched Rinkal Coaching\'s first online presence with a pre-filled WhatsApp enquiry flow',
           'Delivered both from research and wireframes to mobile-first UI, design system and deployment']},
  {when:'Jun – Jul 2024', title:'Product Analytics & Development Intern', org:'Grrowup · remote',
   points:['Worked with product managers, developers and designers; prototyped features for engagement and conversion',
           'Integrated 20+ REST APIs for data collection and improved operational data reliability by 30%']},
];
const LEADERSHIP = 'Logistics Lead, Confluence (NIT Kurukshetra annual fest) · Committee Head, Model United Nations and Confluence 2025 · Publicity Head, ELAD debating club';

/* ---------- More work: product and data ---------- */
const MORE = [
  {kind:'UX · PRD', title:'HyperScan: digital KYC flow',
   blurb:'KYC flow with real-time ID feedback, auto-crop and selfie verification, with a PRD and case study.',
   links:[{label:'Repo', href:'https://github.com/PoddarVivek/HyperScan-KYC'}]},
  {kind:'Product teardown', title:'Park+ onboarding analysis',
   blurb:'Metric tree, funnel model and sample-size calculator for testing a personalised first-launch screen, with the SQL to read the result.',
   links:[{label:'Analysis', href:'https://poddarvivek.github.io/parkplus/'}]},
  {kind:'Data', title:'Retail sales pipeline',
   blurb:'One command loads, cleans, analyses and reports two years of sales. Finding: September to December brings 57% of revenue.',
   links:[{label:'Repo', href:'https://github.com/PoddarVivek/sales-data-analytics-pipeline'}]},
  {kind:'Machine learning', title:'SMS spam checker',
   blurb:'Removed 403 duplicate messages that inflated the score, compared five models and raised held-out F1 from 0.945 to 0.969.',
   links:[{label:'Live demo', href:'https://spam-classifier-h69raytvp9wu9lt7vyhf8m.streamlit.app/'},{label:'Repo', href:'https://github.com/PoddarVivek/spam-classifier'}]},
  {kind:'Data', title:'T20 World Cup analytics',
   blurb:'A validated data model behind a Power BI dashboard for batting, bowling and a best XI, plus a Python analysis.',
   links:[{label:'Repo', href:'https://github.com/PoddarVivek/t20-worldcup-data-analytics'}]},
];

/* ---------- Skills (kept in step with the résumé) ---------- */
const SKILLS = [
  {group:'Design', items:['UI design','UX design','Figma','Wireframing','Prototyping','User flows','Information architecture','Design systems','Mobile-first design']},
  {group:'Research & product', items:['User research','Competitive analysis','Product teardowns','PRD writing','Success metrics','Stakeholder management']},
  {group:'Build', items:['HTML','CSS','JavaScript','Next.js','Supabase','Git','Vercel']},
  {group:'Data', items:['Python','SQL','Excel','Power BI','Tableau']},
];
