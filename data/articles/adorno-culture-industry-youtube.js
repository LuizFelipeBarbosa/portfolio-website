const article = {
  slug: "adorno-culture-industry-youtube",
  title: "Adorno\u2019s Critique in the Age of the \u201CFor You\u201D Page",
  author: "Luiz Felipe Barbosa",
  date: "2026-03-23",
  summary:
    "This project analyzes 84,816 YouTube comments on the 15 most-streamed songs of 2025 to test Adorno\u2019s Culture Industry. It finds that only 0.32% of comments critically engage with the production system behind pop music.",
  sections: [
    {
      paragraphs: [
        "Theodor Adorno died in 1969, decades before the first recommendation algorithm was written. Yet reading his critique of the \u201CCulture Industry\u201D today, it feels less like mid-century philosophy and more like a user manual for the TikTok \u201CFor You\u201D page. Recommendation engines on modern platforms do not just process raw user data \u2014 likes, views, watch time \u2014 to suggest content we might enjoy. They go a step further: they predict what we want before we consciously want it, assembling a feed that feels like a mirror of our innermost tastes but is really a model built from the aggregated behavior of millions of statistically similar users. Through Adorno\u2019s lens, this is not proof of our individuality. It is the ultimate engine of \u201Cpseudo-individuality,\u201D a system where the \u201CFor You\u201D page makes every user feel like the center of their own unique universe while quietly sorting them into the pre-digested categories the algorithm needs to function. The Culture Industry, perfected: our conformity sold back to us as personal choice.",
        "This essay explores that premise through a single case: HUNTR/X\u2019s \u201CGolden,\u201D the animated K-pop blockbuster that became one of the 15 most-streamed songs released in 2025. \u201CGolden\u201D works as a focal point because its comment section contains, in miniature, every dynamic Adorno theorized \u2014 standardization, pseudo-individuation, passive consumption \u2014 while also hosting forms of critical discourse his theory said could not exist. Drawing on an NLP analysis of 84,816 YouTube comments across all 15 most-streamed songs, this piece shows how digital engagement has largely standardized the listener\u2019s response rather than liberating it. At the same time, it argues that modern platforms enable what I call \u201Ccollective decoding\u201D: a distributed, democratic form of cultural critique that Adorno\u2019s framework has no room for.",
      ],
    },
    {
      heading: "The Corpus: 84,816 Comments Across 15 Songs",
      paragraphs: [
        "The data comes from a straightforward source: the Top Tracks of 2025 Global playlist on Spotify, which ranks the 50 most-streamed songs released that year. I pulled the top 15 and scraped every available YouTube comment from their official music videos using youtube-comment-downloader, sorted by popularity. The result was a corpus of 84,816 comments spanning artists from Alex Warren and Taylor Swift to Bad Bunny, Jin, JENNIE, and sombr.{{1}}",
        "The artist mix matters. Five of the 15 tracks are Bad Bunny\u2019s, which means the corpus is genuinely multilingual \u2014 roughly 29,000 comments in English, 12,500 in Spanish, and the rest scattered across Dutch, Portuguese, Indonesian, Korean, Tagalog, and a dozen other languages. About 15,000 comments were too short or emoji-heavy for reliable language detection at all.",
      ],
      image: "/articles/adorno-culture-industry-youtube/language-distribution.png",
      imageCaption: "Language distribution across the corpus. English and Spanish dominate, with a long tail of global languages. The \u201Cunknown\u201D category is largely emoji-only and ultra-short comments.",
      paragraphsAfterImage: [
        "Before doing anything with NLP, the first thing to check is the most basic feature of the dataset: how long are these comments?",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/adorno-culture-industry-youtube/comment-length-distribution.png",
      imageCaption: "Left: the full distribution is almost comically skewed \u2014 65,000+ comments are under 50 characters. Right: zoomed in to comments under 500 characters, where the exponential decay is clearer.",
      paragraphsAfterImage: [
        "The answer is: overwhelmingly short. The median comment is 18 characters. The mean word count is 7.7. Nearly half the corpus \u2014 about 50,000 comments \u2014 is under 25 characters: emoji reactions, single words (\u201Cfire,\u201D \u201Cmid\u201D), timestamps, brief exclamations. Another 17% are trivial by any metric \u2014 too short or formulaic to carry any analytical content. If Adorno is right that the culture industry produces passive consumption, YouTube comment sections are exhibit A.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/adorno-culture-industry-youtube/per-song-distributions.png",
      imageCaption: "Comment length distributions broken down by song. Every track follows the same pattern: a massive spike of short comments with a thin tail. The shape is strikingly uniform across genres, languages, and fanbases.",
      paragraphsAfterImage: [
        "This pattern holds across every song. \u201CGolden,\u201D \u201CThe Fate of Ophelia,\u201D \u201CDon\u2019t Say You Love Me,\u201D \u201COrdinary\u201D \u2014 the histogram shape is identical. Different artists, different genres, different languages, different fanbases: the same behavioral signature. The structural uniformity of listener response is itself a data point that Adorno would have recognized immediately.",
      ],
    },
    {
      heading: "Looking for Critique in the Wrong Places",
      paragraphs: [
        "The first instinct was to look for critical commentary where you would expect to find it: in the longest comments or the most-engaged ones.",
        "It did not work. The longest comments sorted by likes are dominated by catharsis and glamor \u2014 people admiring artists, sharing song lyrics, posting translations, writing motivational messages, copying religious texts, telling stories about deceased family members, and posting copypasta (the generic fan-spam that is its own subculture within artist communities). The most-liked and most-replied comments tell a similar story: heartwarming narratives about beating cancer, calls for connection across time zones \u2014 \u201CAnyone here in September 2025?\u201D \u2014 and the kind of ritualistic community-building that Adorno would have filed under the catharsis function of mass culture.",
      ],
    },
    {
      heading: "Building a Critique Detector",
      paragraphs: [
        "Finding critique through engagement metrics was a dead end. So I built an NLP pipeline grounded in Adorno\u2019s own theoretical categories.",
        "The approach is regex-based \u2014 pattern matching, not machine learning. Each comment is run through three stages: data ingestion (schema validation, deduplication, emoji-only flagging), preprocessing (unicode normalization, URL and mention removal, feature extraction), and rule-based classification (curated regex patterns matched against six Adorno-grounded critique labels, with negation suppression to reduce false positives).",
      ],
      table: {
        headers: ["Label", "What it captures"],
        rows: [
          ["STANDARDIZATION", "\u201Call songs sound the same,\u201D \u201Cformulaic,\u201D \u201Cgeneric,\u201D \u201Ccookie-cutter\u201D"],
          ["PSEUDO_INDIVIDUALIZATION", "\u201Cbrand over substance,\u201D \u201Cmanufactured identity,\u201D \u201Csame product different packaging\u201D"],
          ["COMMODIFICATION / MARKET LOGIC", "\u201Calgorithm bait,\u201D \u201Cindustry plant,\u201D \u201Ccash grab,\u201D \u201Cmade for TikTok\u201D"],
          ["REGRESSIVE LISTENING", "\u201Cbackground music,\u201D \u201Celevator music,\u201D \u201Cnobody listens to lyrics\u201D"],
          ["AFFECTIVE PREPACKAGING", "\u201Cengineered emotion,\u201D \u201Cfake deep,\u201D \u201Ctrauma for clout\u201D"],
          ["FORMAL RESISTANCE", "\u201Cbreaks the mold,\u201D \u201Cgenuine artistry,\u201D \u201Cahead of their time\u201D"],
        ],
        caption: "The six Adorno-grounded critique labels used by the NLP classifier.",
      },
    },
    {
      paragraphs: [
        "A few design choices matter. The pipeline is multi-label \u2014 a single comment can carry multiple critique dimensions simultaneously. FORMAL_RESISTANCE is inverse-polarity: it represents counter-evidence to Adorno, moments where a commenter recognizes genuine artistic complexity. And the system preserves the commenter\u2019s original voice \u2014 no lowercasing, no slang removal \u2014 so ALL-CAPS emphasis and vernacular idioms survive intact.",
        "Each pattern carries a confidence score (0.0\u20131.0) calibrated to how precisely the language maps to its Adorno category. A comment matching \u201Call songs sound the same\u201D gets a higher confidence than one containing just the word \u201Cgeneric,\u201D because the former is unambiguously about structural interchangeability while the latter could mean almost anything.",
        "The pipeline processed all 84,816 comments. It found 269 with identifiable engagement with cultural production mechanisms. That is 0.32% of the corpus.",
      ],
    },
    {
      heading: "Standardization and the Algorithm That Predicts Desire",
      paragraphs: [
        "In \u201COn Popular Music,\u201D Adorno argues that the structure of popular music is \u201Cpre-given and pre-accepted, before the actual experience of the music starts\u201D (Adorno, 1941, p. 17). Every element \u2014 verse, chorus, bridge \u2014 slots into a rigid template that makes individual songs interchangeable. The culture industry does not produce art; it produces variations on a formula.",
        "The 15 most-streamed songs of 2025 bear this out. The NLP pipeline flagged 81 comments under the STANDARDIZATION label, averaging a confidence score of 0.64. The telling detail is not just that the word \u201Cgeneric\u201D appears but that it appears across completely different artists and genres: on Alex Warren\u2019s \u201COrdinary\u201D \u2014 \u201Cthis is literally a basic radio song, is so generic\u201D (@surferboypizza12); on Taylor Swift\u2019s \u201CThe Fate of Ophelia\u201D \u2014 \u201Ca generic boring comment for a generic boring song from a generic boring artist\u201D (@dominichern9446); and on Tate McRae\u2019s \u201CSports car\u201D \u2014 \u201CIt actually sounds like generic K pop from like 5 years ago\u201D (@azraksash). Listeners are picking up on something systemic, not pointing fingers at one bad song.",
      ],
      image: "/articles/adorno-culture-industry-youtube/standardization-word-freq.png",
      imageCaption: "Word frequencies in the 81 STANDARDIZATION-classified comments. \u201CSong\u201D dominates (36 occurrences), followed by \u201Cgeneric\u201D (20), \u201Cmusic\u201D (17), and \u201Csame\u201D (14). The vocabulary is almost a textbook definition of Adorno\u2019s concept.",
      paragraphsAfterImage: [
        "These threads come together most clearly on \u201CGolden.\u201D @The_Null_Theory calls the whole thing out: \u201Cpurposely generic mind rot songs for children to enjoy..not because they are actually good music.\u201D The word that matters here is \u201Cpurposely\u201D: standardization framed as a deliberate strategy. @iam1hobbit takes it further: \u201Ctoo many kpop songs today are custom built for tiktok \u2014 with choruses that are simply chanted with some viral dance move but without singing.\u201D This comment catches a feedback loop Adorno never anticipated: the song is not just distributed through the algorithm. It is designed for it, reverse-engineered from the platform\u2019s requirements for virality.",
        "Adorno\u2019s concept hits differently applied to the delivery system. In \u201CA Social Critique of Radio Music,\u201D he warns that radio atomizes music, severing listeners from \u201Cthe structural wholeness of the work\u201D (Adorno, 1945, p. 211). Today\u2019s algorithms do not just distribute standardized music; they standardize the whole context of listening. A song shows up as a fifteen-second TikTok snippet, a playlist transition, a background loop. But the TikTok algorithm does something qualitatively different from radio. Radio broadcast the same content to everyone. The \u201CFor You\u201D page builds what feels like a personal experience by predicting what each user wants to hear before they know they want to hear it. It does not wait for a listener to seek out \u201CGolden\u201D; it anticipates probable interest and serves the song proactively. This is Adorno\u2019s \u201Cpre-given and pre-accepted\u201D pushed to its logical extreme: the algorithm has pre-given not just the song\u2019s structure but the listener\u2019s desire for it.",
      ],
    },
    {
      heading: "Pseudo-Individualization and the Illusion of the Unique Universe",
      paragraphs: [
        "Adorno defines pseudo-individualization as \u201Cendowing cultural mass production with the halo of free choice or open market on the basis of standardization itself\u201D (Adorno, 1941, p. 25). The \u201CFor You\u201D page runs this trick at industrial scale through a mechanism Adorno never foresaw: the algorithmic construction of the user as a type. You open TikTok and it feels like the center of your own universe \u2014 one where \u201CGolden\u201D appears not because it is the biggest song of the moment but because you, specifically, were meant to find it. The problem is that the algorithm cannot work through genuine individuality. It runs on clusters: standardized behavioral types defined by watch-time patterns, engagement metrics, and demographic proxies. The \u201Cuniqueness\u201D of each feed is really a classification system sorting millions of users into a limited set of pre-built categories. Adorno\u2019s pseudo-individualization, written in code.",
        "The NLP pipeline flagged exactly one comment under PSEUDO_INDIVIDUALIZATION \u2014 @bailee7696 on Tate McRae\u2019s \u201CSports car\u201D: \u201Cliterally are carbon copy of buttons,\u201D at a confidence of 0.75. A phrase that could serve as a dictionary definition of the concept: surface novelty concealing structural sameness. That there is only one explicit hit is itself a finding. Pseudo-individualization, among Adorno\u2019s six dimensions, is the most ideologically effective precisely because it is the hardest to articulate. The branding veneer is so naturalized that few listeners name it directly. They circle it instead.",
        "Commenters on \u201CGolden\u201D get at this without the theoretical vocabulary. @ruskiwaffle1991 says it flat out: \u201CFunny thing is, K-pop is one of the most corporate music genres out there.\u201D @ZhonWeak goes deeper, noting that \u201Cwhat makes a song nice isn\u2019t just the names on the song title, there are people not named in the title who are the very reason why the song is amazing, ie the songwriters (not the singers most of the time for commercial music) and the producers.\u201D That comment catches both halves of pseudo-individualization: the artist puts forward a false image of creative authorship, and the listener buys a false image of individual artistry.",
        "The pipeline also flagged 14 comments under COMMODIFICATION / MARKET LOGIC (average confidence 0.77), including @fonumanukeu-bv9ty on \u201CGolden\u201D: \u201Cit was probably just a money grab.\u201D What these commenters are articulating, in raw form, is the core of Adorno\u2019s argument: that the industry manufactures both the product and the demand for it.",
      ],
    },
    {
      heading: "The Passive Listener and the Echo Chamber",
      paragraphs: [
        "Adorno\u2019s most provocative claim is not just that popular music is standardized but that it produces standardized listeners \u2014 whose response is \u201Cpre-determined by the mechanism of popular music itself\u201D (Adorno, 1941, p. 26). Recognition replaces cognition. Comfort replaces challenge.",
        "The comment sections make a strong case for this: of 84,816 comments analyzed, only 269 \u2014 a mere 0.32% \u2014 contained any identifiable engagement with cultural production mechanisms. The vast majority consist of exactly the pre-programmed responses Adorno would have predicted: \u201CThis slaps,\u201D \u201CWho\u2019s here in 2026?,\u201D \u201CI\u2019m not crying, you\u2019re crying.\u201D These are not evaluations of music. They are performances of consumption, ritualistic declarations of belonging that mirror the standardized product they accompany.",
        "The pipeline flagged 7 comments under REGRESSIVE LISTENING (average confidence 0.70). The sample is small but the language is pointed: \u201Cits terrible, elevator music...\u201D and \u201Canother ordinary overprocessed pile of garbage got a bunch of listens from the mass of braindead ordinaries\u201D (@Dr_Darrow, on Alex Warren\u2019s \u201COrdinary\u201D).",
      ],
      image: "/articles/adorno-culture-industry-youtube/regressive-listening-word-freq.png",
      imageCaption: "Word frequencies in the 7 REGRESSIVE LISTENING comments. \u201CBackground,\u201D \u201Cbrainrot,\u201D and \u201Cordinary/ordinaries\u201D appear alongside \u201Coverprocessed,\u201D \u201Cgarbage,\u201D and \u201Cpile\u201D \u2014 the vocabulary of degraded consumption.",
      paragraphsAfterImage: [
        "YouTube\u2019s sorting algorithm makes it worse, promoting the most generic reactions to the top while burying substantive critique under emojis and time-stamped affirmations. On \u201CGolden,\u201D @The_Null_Theory names the audience condition: \u201Cpurposely generic mind rot songs for children to enjoy..not because they are actually good music.\u201D This is regressive listening translated into YouTube vernacular: the accusation that audiences have been conditioned into passivity by the very infrastructure they think is setting them free.",
      ],
    },
    {
      heading: "What the Classifier Reveals",
      paragraphs: [
        "Stepping back from individual categories, the aggregate picture is worth looking at.",
      ],
      image: "/articles/adorno-culture-industry-youtube/critique-label-bar-chart.png",
      imageCaption: "Distribution of rule-based critique detections across all six labels. FORMAL_RESISTANCE leads (166 hits), followed by STANDARDIZATION (81). The remaining four categories are sparsely populated.",
      paragraphsAfterImage: [],
      table: {
        headers: ["Dimension", "Hits", "Avg. Confidence", "Max Confidence"],
        rows: [
          ["STANDARDIZATION", "81", "0.64", "0.85"],
          ["COMMODIFICATION / MARKET LOGIC", "14", "0.77", "0.88"],
          ["FORMAL RESISTANCE", "166", "0.48", "0.82"],
          ["REGRESSIVE LISTENING", "7", "0.70", "0.82"],
          ["AFFECTIVE PREPACKAGING", "3", "0.67", "0.80"],
          ["PSEUDO_INDIVIDUALIZATION", "1", "0.75", "0.75"],
        ],
        caption: "Rule-based classification summary across all 84,816 comments. Only 269 comments (0.32%) triggered any critique label.",
      },
    },
    {
      paragraphs: [
        "FORMAL RESISTANCE dominates the count at 166 hits \u2014 but this requires context. Its average confidence is the lowest of all labels at 0.48, barely above the classification threshold. Many of these are comments containing words like \u201Cunderrated,\u201D \u201Ctimeless,\u201D or \u201Crefreshing\u201D \u2014 language that signals appreciation for perceived artistic quality but does not always constitute a rigorous counter-argument to the Culture Industry. The word \u201Cunderrated\u201D alone accounts for 57 of the 166 hits.",
      ],
      image: "/articles/adorno-culture-industry-youtube/avg-confidence-per-label.png",
      imageCaption: "Average confidence per label. COMMODIFICATION/MARKET LOGIC and PSEUDO_INDIVIDUALIZATION score highest (0.77 and 0.75), while FORMAL RESISTANCE lags at 0.48.",
      paragraphsAfterImage: [
        "By contrast, COMMODIFICATION / MARKET LOGIC and PSEUDO_INDIVIDUALIZATION, while rare, score the highest average confidence \u2014 0.77 and 0.75 respectively. When commenters articulate these critiques, they tend to do so with precision: \u201Ccash grab,\u201D \u201Ccorporate music genre,\u201D \u201Ccarbon copy.\u201D The language is unambiguous.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/adorno-culture-industry-youtube/confidence-analysis-panels.png",
      imageCaption: "Three views of classifier confidence. Left: max confidence distribution, with a median of 0.48. Center: relationship between confidence and number of labels assigned. Right: per-label box plots showing COMMODIFICATION/MARKET LOGIC\u2019s tight, high-confidence distribution versus FORMAL RESISTANCE\u2019s compressed low-confidence cluster.",
      paragraphsAfterImage: [
        "The co-occurrence matrix tells another story: labels almost never appear together. Only four comments in the entire corpus carry more than one critique label. Standardization co-occurs once each with Commodification, Regressive Listening, and Formal Resistance. Every other pairing is zero. This could mean the regex rules are too mutually exclusive \u2014 or it could mean that YouTube commenters, when they do engage critically, tend to focus on one dimension at a time.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/adorno-culture-industry-youtube/co-occurrence-heatmap.png",
      imageCaption: "Co-occurrence matrix for the six critique labels. The diagonal shows single-label counts. Off-diagonal co-occurrences are almost entirely zero \u2014 commenters focus on one critique dimension at a time.",
      paragraphsAfterImage: [],
    },
    {
      heading: "The Critical Labor Adorno Could Not Envision",
      paragraphs: [
        "The strongest counter-argument to Adorno is to challenge the totality of his theory. He believes these mechanisms \u2014 standardization, pseudo-individualization, and regressive listening \u2014 are so pervasive that genuine critical consciousness becomes virtually impossible for the mass listener. But the same data that confirms his critique also undermines this conclusion, in a form he never imagined: a distributed, collective process of cultural decoding happening in the comment sections themselves.",
        "The 269 critique-bearing comments represent something Adorno\u2019s framework cannot account for: ordinary listeners doing real intellectual work. When a user argues over a song\u2019s merits, calls out its formulaic structure, or maps its production logic onto their own experience, they are not passively consuming. They are decoding. And because they are doing it in a public forum visible to thousands, these individual acts of critique add up to something bigger: a collective form of cultural analysis that works without institutional authority or Adorno\u2019s \u201Cprivileged vantage point.\u201D",
        "The comment section beneath \u201CGolden\u201D is the clearest example. @ivobaki3751 writes: \u201CI know how things are behind curtains in kpop world and as they sing lovely like angels everything i know makes me more resistant to its influence. Kids went bzrk about them and im sure these ladies good persons and all but the industry that generated entire show is what it is. Ive seen same pattern repeat too many times.\u201D",
        "Without any evident exposure to Frankfurt School theory, this commenter identifies standardization (\u201Csame pattern repeat too many times\u201D), pseudo-individualization and commodification (artists who \u201Csing lovely like angels\u201D while the apparatus runs behind a curtain), and a conscious resistance to the product\u2019s emotional pull. This is not the regressed listener Adorno described.",
        "@sandyg4646 pushes the analysis further into the visual side: \u201Ck pop is extremely formulaic in its approach despite the mixing of different styles. You said it yourself \u2018more focus on choreography and stage presence\u2019 what does that tell you?\u201D Notice this commenter is not just spotting a formula but challenging another user with a question \u2014 peer-to-peer critique happening in real time.",
        "Even @estuchedepeluche2212, on sombr\u2019s \u201Cundressed,\u201D reaches for literary theory: \u201CDerivative, not quite original, familiar, comforting, but oh, so good. As Umberto Ecco said: \u2018The cliches are talking and they are having a ball!\u2019\u201D This is someone who holds pleasure and critique in the same hand. Adorno\u2019s clean binary between critical and regressed listening cannot contain that kind of response.",
      ],
      image: "/articles/adorno-culture-industry-youtube/formal-resistance-word-freq.png",
      imageCaption: "Word frequencies in the 166 FORMAL RESISTANCE comments. \u201CUnderrated\u201D dominates (57 occurrences), followed by \u201Cmusic\u201D (42), \u201Crefreshing\u201D (30), and \u201Ctimeless\u201D (28). The vocabulary centers on perceived authenticity and artistic distinction.",
      paragraphsAfterImage: [
        "What makes this genuinely difficult for Adorno\u2019s theory is that it is collective and public. He imagined the critical listener as a solitary figure, trained in serious music, able to perceive what the masses could not. A YouTube comment section is not a seminar room. But it is a space where users argue, cite outside references, and build on each other\u2019s observations in real time. That is collective decoding: intellectual labor performed by the audience itself, using the same platforms that deliver the product to take the product apart.",
      ],
    },
    {
      heading: "Conclusion",
      paragraphs: [
        "None of this erases the force of Adorno\u2019s diagnosis. The 0.32% is still 0.32%.",
        "If the \u201CFor You\u201D page really is the culture industry perfected \u2014 predicting desire, disguising conformity as choice, pre-giving the whole before the experience even begins \u2014 then its triumph is nearly total. Standardization dominates the critique categories, directly echoing Adorno\u2019s central claim from 1941. Pseudo-individualization is the rarest label \u2014 and its rarity likely reflects how effectively it works as ideology, so naturalized that few listeners can name it. The comment sections themselves are products of the same algorithmic logic that Adorno\u2019s Commodification label targets: the medium and the message converge.",
        "But \u201Cnearly\u201D is doing important work in that sentence. The critical voices beneath \u201CGolden\u201D show that mass audiences are not the undifferentiated, regressed consumers Adorno imagined. The algorithm has not managed to silence the 0.32%. And the platforms that deliver \u201CGolden\u201D as a fifteen-second TikTok loop are the same ones hosting the collective decoding that picks it apart.",
        "That the culture industry might generate the conditions for its own critique is, in the end, maybe the most Adornian irony of all.",
      ],
    },
  ],
  footnotes: [
    "The full analysis code, NLP pipeline, and companion Jupyter notebook are available at github.com/LuizFelipeBarbosa/testing-adorno.",
  ],
  citations: [
    "Adorno, T. W. (1941). On popular music. Studies in Philosophy and Social Science, 9(1), 17\u201348.",
    "Adorno, T. W. (1945). A social critique of radio music. The Kenyon Review, 7(2), 208\u2013217.",
    "NLP pipeline source and dataset: github.com/LuizFelipeBarbosa/testing-adorno",
  ],
}

export default article
