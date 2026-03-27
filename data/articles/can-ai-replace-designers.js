const article = {
  slug: "can-ai-replace-designers",
  title: "AI Will Replace Designers",
  author: "Luiz Felipe Barbosa",
  date: "2026-01-15",
  summary:
    "AI is replacing designers by turning product managers, founders, and engineers into good-enough designers — and once everyone can do the first 80% of the work, the profession gets smaller.",
  sections: [
    {
      paragraphs: [
        "The question circulating through design communities since late 2023 — ‘can AI replace designers?’ — is now slightly too polite. The more operational question is what happens when everyone on a product team can generate usable interfaces from a prompt. Once that becomes normal, design stops being a protected function and becomes a capability distributed across the org.",
        "We tried to measure that shift. Over six months, we pulled 1,766 Reddit posts and comments from r/FigmaDesign and r/UI_Design, ran sentiment analysis across 16 discussion themes, tested four agentic AI design tools against a real-world product brief, and mapped Figma’s competitive position against the emerging landscape of AI build tools. The evidence points in one direction: AI may not eliminate every designer, but it is absolutely shrinking the amount of work that only designers can do.",
      ],
    },
    {
      heading: "The Design Job Market Contracted Before AI — Which Makes AI More Dangerous",
      paragraphs: [
        "The design job market halved between mid-2022 and early 2023. Open design roles dropped from roughly 9,500 to about 4,300 — a 55% decline over 18 months.{{1}} As of January 2026, the number sits at 4,889, which is 12.6% above the all-time low. It has effectively flatlined for two years.",
      ],
      image: "/articles/can-ai-replace-designers/slide06-img1.png",
      imageCaption:
        "Open design jobs tracked by TrueUp, January 2026. The market peaked near 9,500 in mid-2022 and has stabilized around 4,900 since early 2023.",
      paragraphsAfterImage: [
        "The timing of that collapse matters. It aligns precisely with the broader tech sector layoffs of 2022–2023 — not with the emergence of AI design tools. ChatGPT launched in November 2022. Midjourney and Stable Diffusion were barely out of beta. The tools that could theoretically displace designers at scale didn’t exist when the design job market imploded. What happened in 2022–2023 was a correction from an unsustainable post-pandemic hiring surge, not an AI-driven structural shift.",
        "The current breakdown reinforces this reading. Senior-level roles account for 41.4% of open positions; entry-to-mid-level, 38.5%; internships, 5.7%.{{1}} Leadership roles (Director and VP) sit at just 4.4%. Public tech companies dominate hiring, accounting for roughly 40% of open positions. Early-stage startups, which drove much of the 2021–2022 boom, have retreated to just 295 open design roles — the smallest category measured.",
        "That does not mean designers are safe. It means AI is arriving into a market already optimized for fewer people doing more work. That is exactly the environment where replacement happens fastest. The most exposed part of the profession is not senior strategic design; it is the broad middle of production work and the junior pipeline that used to translate rough ideas into competent screens.",
      ],
    },
    {
      heading: "Figma Isn’t in Crisis — Designers Still Might Be",
      paragraphs: [
        "If AI were actively disrupting the design tool market, Figma would be the first place you’d see it. The company’s numbers tell a more complicated story.",
        "Figma reported $1.044 billion in revenue in 2025,{{2}} holds roughly 40.7% of the design tool market by share,{{3}} and serves 13 million+ monthly active users collaborating in real time. Its net dollar retention — the rate at which existing customers expand their spending year-over-year — has stayed consistently above 125% since early 2024.{{2}} The count of customers spending over $10,000 annually has more than doubled since early 2023; customers spending over $100,000 have nearly tripled.",
      ],
      image: "/articles/can-ai-replace-designers/slide08-img1.png",
      imageCaption:
        "Figma quarterly metrics (Q1’23 – Q3’25): net dollar retention, paid customers >$10K ARR, and paid customers >$100K ARR. Enterprise traction has accelerated.",
      paragraphsAfterImage: [
        "A company being disrupted doesn’t look like this. NDR above 125% means customers are not leaving — they’re expanding. The acceleration in large enterprise accounts (>$100K ARR) suggests Figma is moving deeper into organizations, not getting squeezed out. The moat — real-time collaborative editing, shared design systems, and tight developer handoff through Dev Mode — is intact.",
        "But Figma’s strength is not the same thing as designer safety. If anything, Figma’s scale proves how much of modern product design had already become collaborative, legible, and accessible to non-designers. That made the workflow larger. It also made it easier for AI to attack. The design tool market is growing from $11.4B to a projected $22.6B between 2025 and 2030 at a 14.7% CAGR. The AI agents market is growing from $7.8B to $52.6B at a 46.3% CAGR over the same period.{{4}} Those two curves are going to intersect, and when they do, the part of design work that remains scarce gets much narrower.",
      ],
    },
    {
      heading: "The Real Shift: Everyone on the Team Is Becoming a Designer",
      paragraphs: [
        "The product design workflow runs, roughly: Concept → Design → Prototype → Build → Ship. Figma has historically owned the Concept and Design phases — the place where teams translate rough ideas into visual artifacts that can be reviewed, iterated on, and handed off to engineering. Its real moat is not the design canvas itself; it’s the multi-player coordination layer that sits on top of it. Comments on the canvas. Design decisions made in context. Handoff through Dev Mode. Figma became the system of record for product intent.",
        "The threat from agentic AI is not just that the middle of the workflow compresses. It is that the role attached to that middle compresses too. If a product manager can go from a text prompt to a working prototype in ten minutes, the two weeks of iteration that used to happen in Figma between rough concept and ready-to-build shrinks dramatically. The Design phase doesn’t disappear — but a lot of paid design labor inside it does.",
        "Agentic tools perform best in specific conditions: simple products, well-defined requirements, low collaboration overhead, and low stakes if the output is wrong. They struggle as complexity, team size, and risk increase. The early adopters who benefited most from workflow compression were solo developers and early-stage product teams with short feedback loops. Enterprise design teams working across multiple products, platforms, and stakeholders have seen less disruption. That gap will narrow. But it’s the gap that explains why Figma’s enterprise numbers are still accelerating.",
        "Here’s the specific threat that deserves more attention: Figma’s real differentiator is not any single feature — it’s collaboration. The reason Figma displaced Sketch, Adobe XD, and every other design tool before it is that it made the entire product creation process visible and accessible to everyone involved: designers, product managers, engineers, and stakeholders all in one shared space. Dev Mode is one expression of that — it’s how collaboration extends into the handoff. But the core value is that Figma became the platform where product intent lives and where teams converge around it.",
        "That broad adoption is why Figma has 13 million monthly active users, not all of whom are professional designers. Product managers comment on mocks. Engineers inspect specs. Founders review flows before meetings. Every one of those people is a seat. The collaborative platform model expanded Figma well beyond its design-tool origins — it became the place anyone involved in building a product needed access to.",
        "Agentic AI targets exactly that dynamic. The pitch from tools like Lovable, v0.dev, and FigmaMake isn’t ‘designers can build faster.’ It’s ‘anyone can build a product without learning a design tool.’ A product manager who previously needed a Figma seat to participate in the design process can now prompt an agent and get a working prototype. A developer who previously opened Figma to read specs can now describe what they want in natural language and generate it directly. The barrier to product creation that Figma’s collaboration model lowered has been lowered further — past Figma entirely.",
        "The result is not just seat compression. It is role compression. The adjacent seats go first, but junior and mid-level design seats are exposed next because so much of their value historically sat in first drafts, layout exploration, production UI, and translation work. If everyone on the team can now do the first 60% of design, companies need fewer people whose full-time job is design. That is replacement in practice, even if the title survives.",
      ],
    },
    {
      heading: "Testing Four Agentic Tools Against a Real Brief",
      paragraphs: [
        "We ran the same product brief through four agentic AI tools — FigmaMake, Lovable.ai, Google AntiGravity, and MagicPath.ai — using a geography quiz platform as the test case. The brief described a product with multiple game modes, continent-specific quizzes, and a need to communicate difficulty and variety to first-time visitors.",
        "FigmaMake — Figma’s own AI feature, built directly into the product — was the most telling test. It produced a structurally correct but visually underdeveloped result: appropriate layout, color-coded sections, and navigable hierarchy, but no craft. It read like a wireframe that someone had filled in with flat colors. As a design tool, it stayed in the design layer — it generated an artifact you’d bring into a team review, not one you’d ship.",
      ],
      image: "/articles/can-ai-replace-designers/slide23-img1.png",
      imageCaption:
        "FigmaMake output: structurally correct, appropriately colored, but flat — more wireframe than finished product. Figma’s own AI stays in the design layer.",
      paragraphsAfterImage: [
        "The agentic coding tools produced a different category of output. Lovable.ai, Google AntiGravity, and MagicPath.ai all generated working code, not design artifacts. Their outputs were deployable websites, not Figma prototypes. Lovable.ai in particular produced a noticeably more polished result — a structured landing page with feature cards, game mode descriptions, and a clear information hierarchy.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/can-ai-replace-designers/slide23-img2.png",
      imageCaption:
        "Lovable.ai output: a deployable landing page with proper feature descriptions, visual hierarchy, and game mode cards — generated from the same brief as the FigmaMake output above.",
      paragraphsAfterImage: [
        "The best output we saw across all four tools was a full-featured application dashboard with 9 distinct game modes, difficulty tags, streak tracking, gamification elements, and a structured engagement loop. It was a reasonable starting point for a real product.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/can-ai-replace-designers/slide26-img1.png",
      imageCaption:
        "The most capable output across all tools tested: a full dashboard with game modes, gamification, streak tracking, and a leaderboard — all from a single text brief.",
      paragraphsAfterImage: [
        "The right word for these outputs is not ‘finished.’ But that’s not the relevant bar. For internal tools, hackathon builds, startup MVPs, marketing sites, and low-stakes product surfaces, ‘good enough with edits’ is exactly the standard that replaces jobs. Replacement rarely waits for perfect quality; it happens when output becomes cheap, fast, and acceptable.",
        "Every result still required human judgment to take from generated to genuinely excellent. None of the tools understood the user research context behind the brief. Visual consistency broke down across pages. Complex stateful interactions — multi-step flows, error states, edge cases — were handled poorly across the board. No tool could make the judgment calls a designer makes constantly: when to break from the pattern, when the technically correct layout is the wrong one for this user.",
        "What the gap between FigmaMake and Lovable illustrates is also strategically important: FigmaMake generates design artifacts that live in Figma’s collaboration layer. Lovable generates production code that bypasses it. The better the coding tools get, the smaller the set of cases where a dedicated design pass is mandatory at all — which loops directly back to the replacement argument.",
      ],
    },
    {
      heading: "What Reddit Actually Thinks",
      paragraphs: [
        "We scraped 1,766 posts and comments from r/FigmaDesign and r/UI_Design using PRAW (the Python Reddit API Wrapper), collecting the top posts by engagement and their top-level comment threads over a six-month window from July 2025 through January 2026.{{5}} The dataset comprised 829 original posts and 937 comments. For each entry, we combined the post title and body text and ran it through two independent NLP sentiment analyzers.",
        "We used TextBlob{{6}} and VADER (Valence Aware Dictionary and sEntiment Reasoner){{7}} in tandem — not because either is sufficient alone, but because they fail differently. TextBlob assigns sentiment by averaging the polarity scores of individual words from a general-purpose lexicon. It works reasonably well for formal text but treats a lot of internet language as neutral because the vocabulary isn’t in its training dictionary. VADER was specifically tuned for social media: it handles capitalization for emphasis, punctuation patterns (“!!!” vs “.”), colloquialisms, and negation sequences that trip up generic analyzers. Comparing both gives a more complete picture.",
        "The divergence in results is itself informative. VADER classified 69.0% of entries as positive, 17.5% neutral, and 13.5% negative. TextBlob classified 51.2% positive, 40.8% neutral, and just 8.0% negative. The gap sits almost entirely in the neutral bucket: VADER recognizes enthusiasm and frustration in informal text that TextBlob reads as bland. For a community like r/FigmaDesign — where people write things like ‘homg this fixed my life’ and ‘WHY AM I UNABLE TO TEST FIGMA MAKE’ — VADER is the more accurate instrument.",
        "One pattern worth noting: Reddit posts were consistently more positive than comments across both tools. VADER put posts at 80.1% positive vs. 59.2% for comments. That tracks with how Reddit works — people post to share something they’re excited about, and the comments are where frustration and critique surfaces. If you only measured posts, you’d overestimate community satisfaction. If you only measured comments, you’d underestimate it.",
        "We also classified each entry into one of 16 discussion themes using regex pattern matching — things like ‘Pricing,’ ‘Figma Make,’ ‘Dev Mode,’ ‘Collaboration’ — and computed average polarity per theme for entries with at least 20 instances. That threshold filtered out low-signal topics and kept the comparisons statistically meaningful.",
        "VADER found an average compound polarity of 0.422 — moderately positive overall. TextBlob found 0.131 — mildly positive. The design community isn’t in denial about the tools, but it also hasn’t fully internalized what they imply for headcount.",
      ],
      image: "/articles/can-ai-replace-designers/slide18-img1.png",
      imageCaption:
        "VADER sentiment over time, July 2025 – January 2026. Sentiment peaked in early summer 2025 and declined through the fall before stabilizing at a moderately positive level.",
      paragraphsAfterImage: [
        "Sentiment was high at the start of the tracking period and declined through fall 2025 before stabilizing. The drop coincides with Figma’s pricing changes and community frustration with AI features. But it never went negative. Designers are frustrated in places; they’re not abandoning ship.",
        "The theme-level breakdown is where the data gets interesting.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/can-ai-replace-designers/slide13-img1.png",
      imageCaption:
        "TextBlob sentiment by theme (n ≥ 20 per category). Pricing scores lowest; Learning and Plugins score highest. Figma Make — Figma’s AI feature — sits near the bottom.",
      paragraphsAfterImage: [
        "Pricing generates the lowest sentiment of any topic, by a meaningful margin. Users are genuinely unhappy with what Figma costs, particularly at the enterprise tier. This has been a persistent source of tension since the collapsed Adobe acquisition attempt forced a pricing recalibration.",
        "Figma Make — Figma’s own AI feature — sits near the bottom of the sentiment ranking. The community is skeptical. The consensus reading is that the AI-assisted design features don’t meet the quality bar that Figma’s product reputation implies. Users expected more.",
        "At the top of the chart: Learning resources, Plugins, and Collaboration. These are exactly Figma’s durable advantages — the features that made it dominant in the first place. Users love what Figma has been great at for years. They’re uncertain about what it’s becoming.",
        "One other finding worth noting: Alternatives — when users discuss competing tools like Framer, Penpot, or AI-native builders — scores low. Designers aren’t excited about the alternatives. They’re dissatisfied with specific parts of Figma but aren’t actively converting. That’s Figma’s window.",
      ],
    },
    {
      heading: "What Survives",
      paragraphs: [
        "Speed at generation is already commoditized. Multiple tools can produce a reasonable UI from a text prompt in under a minute. The real question is what remains scarce after that. The durable value in design now sits in three places that agentic tools haven’t fully touched.",
        "The first is intent capture. A designer absorbing months of user research, a design system built over two years, an evolving product strategy, and the organizational politics that shape what actually ships — none of that context transfers cleanly to a prompt. Designers who can hold and apply that context are still valuable.",
        "The second is coordination. Real-time, multi-player artifacts — canvases where a product manager, two designers, and three engineers are simultaneously working, commenting, and resolving conflicts — are still best served by Figma. Agents generate; they don’t collaborate the way teams actually work. The coordination layer is Figma’s strongest card in this environment.",
        "The third is accountability. When a design decision is wrong, someone owns it. AI can produce a design; it can’t be held responsible for it. In high-stakes product environments — healthcare, fintech, anything where a bad UX decision has regulatory or reputational consequences — the accountability layer isn’t going away. Neither is the designer who provides it.",
        "But this surviving layer is not most design work. It is a narrower, more senior, more strategic band sitting on top of a much broader field of people who can now generate design artifacts themselves. The future is not ‘no designers.’ It is fewer designers, doing higher-leverage work, while everyone else gets design superpowers.",
      ],
    },
    {
      heading: "The Answer",
      paragraphs: [
        "Yes — AI will replace designers, if by ‘designers’ we mean the large class of people paid to turn rough briefs into competent screens, landing pages, and prototype flows. That work is already being absorbed by prompt-based tools and by product managers, founders, and engineers using them. The scarcity that protected the profession is collapsing.",
        "The current job-market contraction didn’t start because of AI, but that almost makes the next phase more obvious. Companies already wanted leaner teams and more output per head. AI gives them the mechanism. The old model — a larger pool of junior and mid-level designers doing translation and production work under a smaller strategic layer — is exactly the part of the profession most exposed.",
        "The more precise frame is that AI turns design from a profession guarded by tooling scarcity into a widely distributed capability. Everyone is a designer now, at least at the level of first drafts, wireframes, landing pages, and product prototypes. Once everyone can do the first 60–80% of the work, the number of people employed to do it full time falls.",
        "What remains is the narrow band of design work that still depends on judgment, systems thinking, research synthesis, coordination, and accountability. Those designers will not disappear. But the old boundary around the profession already is. AI does not need to replace every designer to replace designers as a mass-market role.",
      ],
    },
  ],
  footnotes: [
    "TrueUp tech job market tracker, January 2026. trueup.io/job-trends/design",
    "Figma company announcements and investor disclosures, 2025. figma.com/blog",
    "Design tool market share estimate based on industry analyst surveys, 2024–2025.",
    "UX design market and AI agents market CAGR projections: multiple market research reports, 2025–2030.",
    "Reddit data collected from r/FigmaDesign and r/UI_Design, July 2025 – January 2026. Total: 1,766 entries (829 posts, 937 comments).",
    "TextBlob: Loria, S. et al. ‘TextBlob: Simplified Text Processing.’ 2013. textblob.readthedocs.io",
    "VADER: Hutto, C.J. & Gilbert, E.E. ‘VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text.’ ICWSM, 2014.",
    "Figma NDR and paid customer figures from quarterly business disclosures, Q1 2023 – Q3 2025.",
  ],
  citations: [
    "TrueUp. ‘Design Job Market Tracker.’ January 2026. trueup.io/job-trends/design",
    "Figma. ‘Figma Surpasses $1B in Annual Recurring Revenue.’ Figma Blog, 2025. figma.com/blog",
    "Hutto, C.J. & Gilbert, E.E. ‘VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text.’ Proceedings of the Eighth International Conference on Weblogs and Social Media (ICWSM-14), 2014.",
    "Loria, Steven et al. ‘TextBlob: Simplified Text Processing.’ 2013. textblob.readthedocs.io",
    "‘UX Design Market Size and Forecast 2025–2030.’ Grand View Research / Allied Market Research, 2025.",
    "‘AI Agents Market Size and Forecast 2025–2030.’ Grand View Research, 2025.",
    "Reddit. r/FigmaDesign and r/UI_Design community posts. Analysis period July 2025 – January 2026.",
  ],
}

export default article
