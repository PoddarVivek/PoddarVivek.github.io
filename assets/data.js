/* ============================================================
   EDIT ZONE — all site content lives here.
   The page is told as a story in chapters; each array feeds one chapter.
   ============================================================ */

const CONFIG = {
  email: 'vivekpoddar.work@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vivekpoddar-work',
  github: 'https://github.com/PoddarVivek',
  resume: 'assets/Vivek_Poddar_Resume.pdf',
};

/* ---------- Chapter 2 · The learning curve (oldest → newest) ---------- */
const CURVE = [
  {year:'2022', tag:'Hardware', learned:'Circuits & digital logic',
   proof:'A 4-bit CPU, an FSM digital lock and a stopwatch — all in Verilog.'},
  {year:'2024', tag:'Data', learned:'SQL, Python & Power BI',
   proof:'A T20 World Cup analysis, a tested sales pipeline and Power BI dashboards.'},
  {year:'2024', tag:'Industry', learned:'Working inside a product team',
   proof:'Product analytics & development intern at Grrowup — PMs, devs, designers and 20+ REST APIs.'},
  {year:'2025', tag:'Machine learning', learned:'Models that predict',
   proof:'Churn drivers from 15,000+ customer records; LightGBM + SARIMA demand forecasting.'},
  {year:'2026', tag:'Product', learned:'Product thinking & PRDs',
   proof:'PRDs and case studies — like the HyperScan digital KYC flow.'},
  {year:'2026', tag:'Design', learned:'UI/UX & product design',
   proof:'Three live products — in edtech, fintech and healthtech.'},
  {year:'Now', tag:'Business', learned:'Client relationships, backed by data',
   proof:'Founders Office at Butter Search — finding new clients through market research and building long-term relationships with them.'},
];

/* ---------- Chapter 3 · The proof — live products ----------
   img: screenshot in assets/img; tall:true means it scrolls on hover */
const LIVE = [
  {id:'maitry', name:'Maitry Finance', sector:'Fintech · RBI-registered NBFC', year:'2026',
   url:'https://maitry-finance-website.vercel.app/', img:'assets/img/live-maitry.jpg', tall:true, cs:'case-studies/maitry-finance.html',
   brief:'A lender needed a website that makes borrowing feel simple — while meeting every RBI disclosure rule.',
   learned:'How digital lending is regulated: Key Facts Statements, cooling-off windows, grievance redressal and the RBI Ombudsman.',
   shipped:['Plain-language voice — "Borrowing, minus the jargon"','An EMI calculator with real numbers upfront','Loan lineup, rates & terms and a two-tier grievance flow mapped to RBI requirements','An enquiry form routed straight to the support inbox'],
   tags:['Next.js','UI/UX','Content design','Compliance']},

  {id:'clinic', name:'ClinicAI', sector:'Healthtech · SaaS product', year:'2026',
   url:'https://clinic-ai-pi.vercel.app/', img:'assets/img/live-clinic.jpg', tall:true,
   brief:'Independent clinics lose patients to missed calls. ClinicAI is the front desk that answers every one.',
   learned:'How a clinic front desk really runs — sessions, slot lengths, days off — and what a doctor will and won’t let an AI decide.',
   shipped:['An AI receptionist that answers in English, Hindi and Bengali and books into the clinic’s real schedule','Doctor stays in control: anything outside the rules becomes a request to approve or decline','A 5-step onboarding wizard that ends with a test call booking a real slot','A patient portal to reschedule or cancel without calling, plus a demo workspace to try it','A product brief with a North Star metric: appointments booked by the AI per clinic per week'],
   tags:['Next.js','Supabase','Product strategy','Dashboard design']},

  {id:'rinkal', name:'Coaching Institute Website', sector:'Edtech · real client', year:'2026',
   url:'https://rinkal-coaching.vercel.app/', img:'assets/img/live-rinkal.jpg', tall:true, cs:'case-studies/rinkal-coaching.html',
   brief:'A home tutor for Classes 8–10 needed parents to get in touch. Enquiry forms weren\'t getting filled.',
   learned:'How parents actually pick a tutor — and that they\'d rather send a WhatsApp than fill in a form.',
   shipped:['A WhatsApp enquiry builder: tap class, board and subjects → a ready-to-send message','A 60-second subject quiz and 30-second lessons, so students come back','A mobile-first design system built around a notebook metaphor'],
   tags:['UI/UX','Design system','HTML/CSS/JS','Vercel']},
];

/* ---------- Chapter 4 · The workbench ---------- */
const KINDS = {data:'Data', ml:'Machine learning', product:'Product', hw:'Hardware'};
const BUILDS = [
  {id:'forecast', kind:'ml', year:'2026', title:'Demand Forecasting Platform',
   blurb:'LightGBM vs. a SARIMA baseline for store-level demand, explorable in a Streamlit app.',
   tags:['Python','LightGBM','SARIMA','Streamlit'], links:[]},
  {id:'churn', kind:'data', year:'2025', title:'Customer Churn & Product Insights',
   blurb:'Churn drivers and at-risk segments from 15,000+ customer records, in Power BI.',
   tags:['Python','SQL','Power BI','EDA'], links:[]},
  {id:'hyperscan', kind:'product', year:'2025', title:'HyperScan — Digital KYC Flow',
   blurb:'KYC flow with real-time ID feedback, auto-crop and selfie verification — PRD + case study.',
   tags:['UX','PRD'], links:[{label:'Repo', href:'https://github.com/PoddarVivek/HyperScan-KYC'}]},
  {id:'pipeline', kind:'data', year:'2026', title:'Retail Sales Pipeline',
   blurb:'One command loads, cleans, analyses and reports two years of transactions, with a logged cleaning step, 13 named queries, tests and a written findings report. Sales turn out to be seasonal: September to December brings 57% of revenue.',
   tags:['SQL','DuckDB','Python','Power BI'], links:[{label:'Pipeline', href:'https://github.com/PoddarVivek/sales-data-analytics-pipeline'}]},
  {id:'spam', kind:'ml', year:'2026', title:'SMS Spam Checker',
   blurb:'Found 403 duplicate messages inflating the original score, compared five models with cross-validation and raised held-out F1 from 0.945 to 0.969. The live app shows which words drove each verdict.',
   tags:['Python','scikit-learn','Streamlit'], links:[{label:'Live demo', href:'https://spam-classifier-h69raytvp9wu9lt7vyhf8m.streamlit.app/'},{label:'Repo', href:'https://github.com/PoddarVivek/spam-classifier'}]},
  {id:'parkplus', kind:'product', year:'2026', title:'Park+ Onboarding Analysis',
   blurb:'Metric tree, adjustable funnel model and sample-size calculator for testing a personalised first-launch screen, with the SQL to read the result.',
   tags:['Funnel analysis','A/B design','SQL'], links:[{label:'Analysis', href:'https://poddarvivek.github.io/parkplus/'}]},
  {id:'t20', kind:'data', year:'2024', title:'T20 World Cup Analytics',
   blurb:'Validated data model behind a Power BI dashboard for batting, bowling and a best XI, plus a Python analysis. Kohli led the 2022 tournament with 296 runs, and chasing teams won 18 of 40 matches with a result.',
   tags:['Python','Pandas','Power BI'], links:[{label:'Repo', href:'https://github.com/PoddarVivek/t20-worldcup-data-analytics'}]},
  {id:'verilog', kind:'hw', year:'2022–23', title:'Digital Design in Verilog ×3',
   blurb:'A 4-bit CPU, an FSM digital lock and a dual-mode timer, validated with testbenches.',
   tags:['Verilog','FSM'], links:[{label:'CPU', href:'https://github.com/PoddarVivek/4bit-mini-CPU'},{label:'Lock', href:'https://github.com/PoddarVivek/digital-lock-fsm'},{label:'Timer', href:'https://github.com/PoddarVivek/Stopwatch-Timer-System-in-Verilog'}]},
];
const TOOLKIT = ['UI Design','UX Research','Design Systems','Prototyping','PRD Writing','Next.js','HTML/CSS/JS','Python','SQL','Power BI','LightGBM','Streamlit','Git','Vercel','Verilog'];

/* ---------- Chapter 5 · The person ---------- */
const EXPERIENCE = [
  {when:'Jul 2026 – now', type:'Full-time', title:'Founders Office', org:'Butter Search · Kolkata (remote)',
   detail:'Business relations for an executive search firm. I map VC-backed startups by funding stage, sector and likely leadership gaps, rank them by fit, and turn the strongest prospects into long-term client relationships.',
   proofs:[]},
  {when:'Aug 2026 – now', type:'Freelance', title:'Freelance Web Developer', org:'Maitry Finance Limited · remote',
   detail:'Built the company’s official website from scratch — responsive UI with interactive loan and EMI features, from design to deployment.',
   proofs:[]},
  {when:'2026', type:'Leadership', title:'Committee Head — Model United Nations', org:'NIT Kurukshetra',
   detail:'Ran committee proceedings and delegate debate; closed with a podium address.',
   proofs:[{label:'Trophy', src:'assets/img/committee-head-trophy.jpg'},{label:'Prep workstation', src:'assets/img/mun-workstation.jpg'},{label:'Podium speech', src:'assets/img/mun-podium.jpg'}]},
  {when:'2026', type:'Simulation', title:'GenAI Powered Data Analytics', org:'Tata × Forage',
   detail:'EDA and risk profiling, AI-driven delinquency prediction and a collections strategy.',
   proofs:[{label:'Certificate', src:'assets/img/forage-cert.jpg'}]},
  {when:'2025', type:'Leadership', title:'Committee Head — Confluence 2025', org:'NIT Kurukshetra cultural fest',
   detail:'Ran organisational logistics and coordination for the Cosmic Carnival.',
   proofs:[{label:'Award', src:'assets/img/committee-head-trophy.jpg'}]},
  {when:'Jun – Aug 2025', type:'Internship', title:'Embedded Systems Intern', org:'Maven Silicon · Bengaluru (remote)',
   detail:'Built an ESP32-based IoT home-automation system end to end, in Embedded C.',
   proofs:[{label:'Certificate', src:'assets/img/maven-cert.jpg'}]},
  {when:'2024–25', type:'Leadership', title:'Logistics Lead — Confluence', org:'NIT Kurukshetra annual fest',
   detail:'Coordinated 10–15 vendors, scheduling, artist management, stage operations and audience flow.',
   proofs:[]},
  {when:'2024', type:'Internship', title:'Product Analytics & Development Intern', org:'Grrowup (via PrepInsta)',
   detail:'Worked with PMs, developers and designers on product workflows; 20+ REST APIs on a MERN stack.',
   proofs:[{label:'Certificate', src:'assets/img/grrowup-cert.jpg'}]},
  {when:'2023–25', type:'Leadership', title:'Content Head → External Publicity Head', org:'ELAD — Literary & Debating Club',
   detail:'Joined as a member in 2023; led content, then publicity campaigns across multiple stakeholders.',
   proofs:[]},
  {when:'Jan – May 2023', type:'Community', title:'Member', org:'Industry & Entrepreneurship Cell, NIT Kurukshetra',
   detail:'First brush with startups and entrepreneurship on campus.',
   proofs:[]},
];
const EDUCATION = [
  {when:'2022 – 2026', title:'B.Tech, Electronics & Communication', org:'NIT Kurukshetra',
   proofs:[{label:'Admission letter', src:'assets/img/nit-admission.jpg'},{label:'CSAB allotment', src:'assets/img/csab-allotment.jpg'}]},
  {when:'2019', title:'ICSE Class X — 95.4%', org:'St. Michael\'s School, Siliguri',
   proofs:[{label:'Marksheet', src:'assets/img/icse-marksheet.jpg'}]},
];
const CERTS = [
  {title:'GenAI Powered Data Analytics', org:'Tata × Forage · Mar 2026', src:'assets/img/forage-cert.jpg'},
  {title:'The Complete SQL Bootcamp', org:'Udemy · Sep 2025', src:'assets/img/sql-bootcamp-cert.jpg'},
  {title:'TCS iON Career Edge', org:'TCS iON · Jul 2025', src:'assets/img/tcs-ion-cert.jpg'},
  {title:'ChatGPT for Everyone', org:'HCL GUVI · Jul 2025', src:'assets/img/chatgpt-cert.jpg'},
];
const BEYOND = [
  {title:'Cricket all-rounder', note:'CAB district level · Man of the Match', proofs:[{label:'Award ceremony', src:'assets/img/cricket-award.jpg'},{label:'Trophies', src:'assets/img/cricket-trophies.jpg'},{label:'Team photo', src:'assets/img/cricket-team.jpg'}]},
  {title:'Public speaking', note:'Debating club · MUN podium', proofs:[{label:'MUN podium speech', src:'assets/img/mun-podium.jpg'}]},
  {title:'Taekwondo', note:'Yellow belt · where discipline started', proofs:[{label:'Certificate', src:'assets/img/taekwondo-cert.jpg'}]},
];

/* ---------- Chapter 6 · Face an over — six questions per over, answered in my voice ----------
   k: keywords used to match a question someone types in */
const QNA = [
  {q:'Tell me about yourself', k:['yourself','about you','introduce','who are you','background'],
   a:"I'm an electronics engineer from NIT Kurukshetra who kept drifting toward the other side of products — the people using them. Since then I've taught myself data, ML, product thinking and UI/UX, and shipped products in edtech, fintech and healthtech along the way."},
  {q:'How do you learn something new?', k:['learn','new skill','pick up','fast','quick'],
   a:"I build the thing first and let it show me what I don't know. For Maitry Finance I had to understand RBI lending rules before I could design a single page — so I studied how an existing lender presented them, then designed something clearer."},
  {q:'Why product design?', k:['why','design','ui','ux','product'],
   a:"It's where everything I've picked up meets. Data tells me what's happening, product thinking tells me why it matters, and design is how a real person actually feels the difference."},
  {q:'Which project are you proudest of?', k:['proud','best project','favourite','favorite','project'],
   a:"Maitry Finance. Lending is full of fine print, and the brief was to make it feel human without hiding anything the regulator requires. \"Borrowing, minus the jargon\" came out of that tension."},
  {q:'What does cricket have to do with this?', k:['cricket','sport','ball','bat'],
   a:"More than you'd think. Good batting is reading conditions before you play a shot — the pitch, the bowler, the field. Design is the same: read the user and the context first, then commit. And nobody gets better in the nets by only thinking about it."},
  {q:'What would you build next?', k:['next','build next','future project','idea'],
   a:"Something that takes a phone call or a paper register out of someone's day. ClinicAI does that for clinics; there are plenty of industries still running on missed calls."},
  {q:'What are you doing right now?', k:['now','current','currently','job','working'],
   a:"I'm in the Founders Office at Butter Search, an executive search firm, working on business relations. I research which VC-backed startups are likely to need senior hires, prioritise them by stage and fit, open the conversation, and build relationships meant to last beyond a single mandate. I'm also freelancing on Maitry Finance's website."},
  {q:'A time you showed leadership', k:['leader','lead','team','manage','committee'],
   a:"As Logistics Lead for Confluence I coordinated 10–15 vendors, artist schedules and stage operations for marquee events — lots of moving parts, one deadline. I've also been Committee Head twice in a year, for MUN and Confluence 2025."},
  {q:'A challenge or failure', k:['challenge','failure','fail','mistake','difficult','hard'],
   a:"Leaving a pure electronics track wasn't a straight line — I was learning SQL and Power BI on the side while keeping up with core ECE coursework. The lesson: build consistently instead of waiting to \"feel ready\"."},
  {q:'Strengths & weaknesses?', k:['strength','weakness','good at','improve'],
   a:"Strength: I get from \"new domain\" to \"working product\" quickly. Weakness: I can go deep on what I'm building, so I deliberately zoom out and check it against what the user actually needs."},
  {q:'Where in 5 years?', k:['5 years','five years','career','goal'],
   a:"Designing products end to end — from the research to the pixels to the numbers after launch — on a team that ships often."},
  {q:'Describe yourself in 3 words', k:['three words','3 words','describe yourself'],
   a:"Curious, relentless, mildly caffeinated."},
];
