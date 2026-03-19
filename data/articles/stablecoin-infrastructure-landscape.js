const article = {
  slug: "stablecoin-infrastructure-landscape",
  title: "Stablecoin Infrastructure Landscape",
  author: "Luiz Felipe Barbosa",
  date: "2026-01-15",
  summary:
    "A case study of Stripe\u2019s acquisition of Bridge and the emerging stablecoin infrastructure landscape, examining how digital dollars are reshaping cross-border payments and challenging traditional financial rails.",
  sections: [
    {
      paragraphs: [
        "When Stripe paid $1.1 billion for Bridge in October 2024,{{1}} it was the largest acquisition in crypto history. But calling it a \u201ccrypto acquisition\u201d mostly misses the point. Stripe was not buying a blockchain company. It was buying the most mature infrastructure available for solving a problem that has made international payments expensive and slow for decades.",
        "Stripe CEO Patrick Collison put it plainly: stablecoins are \u201croom-temperature superconductors for financial services.\u201d{{2}} The metaphor is precise. A superconductor transmits electricity without resistance \u2014 the friction isn\u2019t inherent to electricity, it\u2019s a property of the material. Cross-border payments fail not because moving money internationally is hard in any physical sense, but because the plumbing built to do it was designed in the 1970s and has barely changed. Stablecoins, in Collison\u2019s framing, could remove the resistance without replacing the underlying voltage.",
        "This essay examines the infrastructure behind that claim \u2014 the FX and crypto markets that stablecoins straddle, the competitive landscape of platforms building on top of them, and what the Bridge acquisition signals for the future of cross-border commerce.",
      ],
    },
    {
      heading: "The Foreign Exchange and Cryptocurrency Markets",
      paragraphs: [
        "The foreign exchange market processes roughly $7.5 trillion in daily turnover{{3}} \u2014 more than any other financial market on earth. It has no central exchange. Trades happen over-the-counter, negotiated between banks, institutional dealers, and electronic platforms across overlapping time zones in London, New York, Tokyo, and Singapore. The machinery works well for large institutions trading major currency pairs. It works poorly for smaller transactions, non-major corridors, and businesses in developing economies that need to receive USD and convert to local currency without paying 5\u20138% in fees and waiting two to four days for settlement.{{4}}",
        "Cryptocurrency offers a structural alternative. Bitcoin, Ethereum, and their peers operate on decentralized blockchains \u2014 networks where transactions settle on shared, immutable ledgers without central bank oversight. This allows peer-to-peer settlement without every participant trusting a single intermediary. The tradeoffs are real: exchange insolvency, smart contract bugs, chain congestion, and regulatory uncertainty don\u2019t have clean equivalents in traditional banking. And the price volatility of most crypto assets makes them impractical as payment mediums for most purposes.",
        "Stablecoins occupy a different part of the design space. A dollar-pegged stablecoin like USDC holds its value relative to USD through dollar-denominated reserves, while clearing and settling on a blockchain. A payment from New York to Manila can finalize in seconds for a fraction of a percent, rather than threading through a correspondent banking chain that extracts fees at every handoff. Both FX and stablecoin infrastructure move value across borders. The difference is that correspondent banking requires bilateral account relationships at every step \u2014 originating bank, intermediary bank, receiving bank \u2014 while stablecoin settlement collapses that chain to a single cryptographic transaction.",
        "The structural parallel that matters most for payments is market fragmentation. Just as FX liquidity is distributed across dozens of venues with no single canonical price, stablecoin liquidity is fragmented across multiple chains, issuers, and on/off-ramp providers. Bridge\u2019s core thesis was that this fragmentation was solvable through abstraction \u2014 a single API that handles routing, conversion, and compliance regardless of which chain or corridor sits underneath.",
      ],
    },
    {
      heading: "Why Stripe Chose Bridge",
      paragraphs: [
        "Bridge described itself as \u201cStripe for stablecoins,\u201d{{5}} and the analogy was exact. Stripe made it easy to accept card payments by abstracting the complexity of card networks, processors, and fraud detection behind a developer API. Bridge did the same for stablecoin payments: a developer could accept stablecoins, convert between any two dollar formats, and off-ramp to local fiat through a single integration, without managing wallets, gas fees, or blockchain routing directly.",
        "The core product had three components. Orchestration handled the movement and storage of stablecoins, routing payments across chains to optimize cost and speed. Issuance allowed businesses to create their own stablecoins backed by treasury reserves, with Bridge managing custody and sharing yield with the issuer. Global transfers enabled USD-to-local-currency payouts in markets where traditional wire infrastructure was slow or unavailable.{{6}}",
      ],
      image: "/articles/stablecoin-infrastructure-landscape/bridge-architecture.jpg",
      imageCaption:
        "Bridge\u2019s product architecture: fiat on-ramp and off-ramp flows through custodial wallets, supporting ACH, WIRE, SEPA, SPEI, and PIX rails across US, EU, MX, and BR bank accounts.",
      paragraphsAfterImage: [
        "The compliance layer was where Bridge genuinely differentiated itself. Moving tokens is a solved problem. Moving tokens in a way that satisfies enterprise KYC/AML requirements, money transmitter regulations, and institutional audit standards is not. Bridge had obtained money transmitter licenses across the U.S. and was pursuing Electronic Money Institution status in the EU.{{7}} As Bridge\u2019s Head of Product Mai Leduc put it: \u201cBridge is compliance-first\u2026 we\u2019re not just building tech \u2014 we\u2019re engineering trust.\u201d{{8}} In payments that sentence is operational, not philosophical: a license is a market access right that takes years and millions of dollars to obtain. Competitors without them are structurally limited to crypto-native customers.",
        "The traction validated the thesis. By 2024, Bridge was handling 10x year-over-year volume growth{{9}}, with clients including Coinbase, SpaceX, and several government agencies. The use cases were telling. Starlink used Bridge to repatriate peso-denominated Argentine sales revenue \u2014 a country where official USD access was severely restricted \u2014 converting local sales into freely movable USD stablecoins.{{10}} Nigeria-based users paid for YouTube Premium through Bridge-integrated platforms, using USDC as a workaround for restricted card access. These are not niche experiments. They are real payment problems in markets where the legacy financial system has materially failed.",
        "For Stripe, the acquisition addressed a specific strategic constraint. Stripe\u2019s core revenue comes from processing payments in developed markets, but its stated mission \u2014 \u201cincrease the GDP of the internet\u201d{{11}} \u2014 requires growth in markets where traditional payment infrastructure is insufficient. Building banking relationships in 50 emerging-market countries takes years and enormous regulatory resources. Bridge offered a shortcut. Stripe\u2019s President of Tech & Business Will Gaybrick was explicit about the product roadmap: Bridge\u2019s issuance capabilities became the foundation of Stripe\u2019s \u201cOpen Issuance\u201d platform, which lets any business launch its own stablecoin with yield shared back to the issuer. That product did not exist before the acquisition.",
      ],
    },
    {
      heading: "The Stablecoin Platform Landscape",
      paragraphs: [
        "Bridge was not building in a vacuum. A range of stablecoin infrastructure platforms had emerged by 2024, each targeting specific corridors, customer segments, or use cases. Mapping that landscape makes Stripe\u2019s acquisition logic clearer.",
        "Yellow Card dominates African payment corridors, operating across 20+ countries with deep integrations into local mobile money networks and banking systems. Its value is geographic specificity: Yellow Card knows how to source liquidity in Nigeria, Ghana, and Kenya in ways that a global platform doesn\u2019t. The tradeoff is that it doesn\u2019t travel well outside Africa.",
        "Due (OpenDue) took a different approach entirely \u2014 non-custodial stablecoin accounts that off-ramp to 80+ fiat currencies through local virtual accounts. Rather than building a developer API for other businesses to integrate, Due pursued vertical integration: obtaining local licenses, building direct banking connections in each market, and presenting a consumer-facing product that feels more like Wise than like Bridge. The user experience was the product.",
        "BVNK provides stablecoin plumbing to financial institutions, connecting digital assets to SEPA and Faster Payments rails. Its customers are regulated entities \u2014 banks, exchanges, processors \u2014 rather than developers or business operators. Unblock Pay specializes in Latin America: stablecoin-to-fiat via PIX in Brazil and SPEI in Mexico. Notably, Unblock Pay itself uses Bridge as part of its infrastructure stack, which says something about where Bridge sat in the value chain \u2014 it was a foundational layer for the category, not just one competitor among many. Mural Pay handles B2B supply chain payments across the Americas, reducing FX friction in logistics and cross-border procurement. Afriex provides low-cost USDC remittances to Nigeria, Kenya, and Ghana, letting users fund wallets in local currency for on-chain conversion.",
        "The consistent pattern: most competitors were regionally specialized or built for narrow use cases. Bridge was the only platform with genuinely horizontal ambition \u2014 a developer toolkit designed to work in any corridor with any stablecoin. That was the specific gap Stripe needed to fill.",
      ],
    },
    {
      heading: "Implications for the Payments Industry",
      paragraphs: [
        "Andreessen Horowitz called the acquisition \u201cthe first significant acknowledgment by a mainstream fintech that stablecoins are ready for primetime.\u201d{{12}} That framing may overstate the novelty \u2014 PayPal had launched its own USD stablecoin PYUSD in 2023,{{13}} and Robinhood had acquired a crypto exchange earlier that year. But the Stripe deal was different in institutional weight and strategic intent. A $100+ billion payment company wasn\u2019t adding stablecoin support as a feature. It was rebuilding a piece of its core infrastructure around stablecoin settlement.",
        "The transaction volume data explained the urgency. In 2024, stablecoins facilitated over $15 trillion in transactions \u2014 a figure that rivals Visa\u2019s annual processing volume.{{14}} That growth rate forced an obvious question for any payments infrastructure company: do stablecoins complement traditional card rails, or do they start displacing them in specific corridors?",
        "The uncomfortable subtext of the Stripe-Bridge combination is that stablecoin payments, if widely adopted in some corridors, would reduce card interchange revenue \u2014 one of Stripe\u2019s primary income sources. Stripe addressed this directly, arguing that new revenue streams \u2014 float interest on stablecoin reserves, incremental volume from emerging markets previously outside Stripe\u2019s reach, and fee-generating services like multi-currency wallets and custom issuance \u2014 more than offset potential displacement. The calculation assumes stablecoins scale primarily in corridors where Stripe currently does little business. That assumption is probably right in the near term and increasingly uncertain over the long term.",
        "Stripe\u2019s 2018 decision to shut down Bitcoin payments{{15}} after a brief experiment \u2014 citing slow confirmations, high fees, and minimal merchant demand \u2014 made the Bridge acquisition a natural point of comparison. The crypto market in 2018 was structurally unfit for payments: volatile pricing, seven-to-ten minute settlement, and no regulatory clarity. By 2024, USDC offered dollar-stable pricing, sub-second finality on modern L2 networks, and an increasingly coherent regulatory framework. The U.S. Congress passed the GENIUS Act in mid-2025,{{16}} establishing the first comprehensive federal stablecoin framework. Stripe had already closed its Bridge acquisition before that legislation passed, which meant it entered the newly regulated market with a mature, proven product rather than scrambling to build one after the rules were written.",
        "That timing was not coincidental. Stripe was not reacting to events. It was making a calculated bet on where global payment infrastructure would settle \u2014 then acquiring the best-positioned company early enough to help shape the outcome.",
      ],
    },
  ],
  footnotes: [
    "\"Stripe acquires stablecoin startup Bridge for $1.1 billion.\" The Verge, October 20, 2024.",
    "Patrick Collison, Stripe Annual Letter, 2024.",
    "Bank for International Settlements, \"OTC Foreign Exchange Turnover in April 2022,\" Triennial Central Bank Survey, September 2022.",
    "World Bank, \"Remittance Prices Worldwide,\" Report No. 47, December 2023. Global average cost of sending $200: 6.2%.",
    "Bridge product documentation and API reference, bridge.xyz, 2024.",
    "Stripe / Bridge acquisition press materials, October 2024.",
    "Bridge regulatory disclosures; Stripe acquisition announcement, October 2024.",
    "Mai Leduc, \"Compliance-First Stablecoin Infrastructure,\" Bridge company blog, 2024.",
    "Stripe / Bridge press materials on Bridge growth metrics, October 2024.",
    "Patrick McKenzie, \"Bridge and Stablecoin Infrastructure,\" referenced in Stripe acquisition coverage, 2024.",
    "Stripe company mission statement, stripe.com.",
    "Andreessen Horowitz portfolio update on Bridge acquisition, October 2024.",
    "PayPal, \"PayPal Launches U.S. Dollar Stablecoin,\" press release, August 7, 2023.",
    "Multiple industry reports, Q4 2024. Visa FY2024 payment volume: ~$14.8T. Stablecoin volume figure per The Block Research and Artemis.",
    "\"Stripe ends Bitcoin support,\" TechCrunch, January 23, 2018.",
    "GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins Act), S.394, 119th Congress, signed 2025.",
  ],
  citations: [
    "\"Stripe Acquires Bridge for $1.1 Billion in Largest-Ever Crypto Acquisition.\" The Verge, October 20, 2024. theverge.com/2024/10/20/stripe-bridge-acquisition",
    "Collison, Patrick. \"Annual Letter 2024.\" Stripe, 2024. stripe.com/annual-letter/2024",
    "Bank for International Settlements. \"OTC Foreign Exchange Turnover in April 2022.\" Triennial Central Bank Survey, September 2022. bis.org/statistics/rpfx22_fx.htm",
    "World Bank. \"Remittance Prices Worldwide.\" Report No. 47, December 2023. remittanceprices.worldbank.org",
    "Bridge. \"Product Documentation and API Reference.\" bridge.xyz, 2024.",
    "Leduc, Mai. \"Compliance-First Stablecoin Infrastructure.\" Bridge company blog, 2024.",
    "Gaybrick, Will. \"Open Issuance: Launching Custom Stablecoins.\" Stripe product announcement, 2025. stripe.com/blog/open-issuance",
    "Andreessen Horowitz. \"Portfolio Update: Stripe Acquires Bridge.\" a16z.com, October 2024.",
    "PayPal. \"PayPal Launches U.S. Dollar Stablecoin PYUSD.\" PayPal Newsroom, August 7, 2023. newsroom.paypal.com",
    "\"Stablecoins Processed More Transaction Volume Than Visa in 2024.\" Mariblock, January 2025. mariblock.com/stories/stablecoins-grossed-more-transaction-volume-than-visa-in-2024-report",
    "\"Stripe Ends Bitcoin Support.\" TechCrunch, January 23, 2018. techcrunch.com/2018/01/23/stripe-ends-bitcoin-support",
    "GENIUS Act (S.394), 119th Congress. U.S. Senate, 2025.",
    "Sequoia Capital. Statement on Bridge Acquisition. October 2024.",
    "\u201cJ.P. Morgan Wins Big in the $7.5 Trillion FX Market.\u201d J.P. Morgan, www.jpmorgan.com/insights/markets-and-economy/markets/euromoney-fx",
  ],
}

export default article
