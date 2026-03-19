const article = {
  slug: "stablecoin-infrastructure-landscape",
  title: "Stablecoin Infrastructure Landscape",
  author: "Luiz Felipe Barbosa",
  date: "2026-01-10",
  summary:
    "A case study of Stripe\u2019s acquisition of Bridge and the emerging stablecoin infrastructure landscape, examining how digital dollars are reshaping cross-border payments and challenging traditional financial rails.",
  sections: [
    {
      paragraphs: [
        "When Stripe paid $1.1 billion for Bridge in October 2024,{{1}} it was one of the largest acquisitions in crypto history. But calling it a \u201ccrypto acquisition\u201d mostly misses the point. Stripe was not buying a blockchain company. It was buying the most mature infrastructure available for solving a problem that has made international payments expensive and slow for decades.",
        "Stripe CEO Patrick Collison put it plainly: stablecoins are \u201croom-temperature superconductors for financial services.\u201d{{2}} The metaphor is precise. A superconductor transmits electricity without resistance \u2014 the friction isn\u2019t inherent to electricity, it\u2019s a property of the material. Cross-border payments fail not because moving money internationally is hard in any physical sense, but because the plumbing built to do it was designed in the 1970s and has barely changed. Stablecoins, in Collison\u2019s framing, could remove the resistance.",
        "This essay examines the infrastructure behind that claim: what stablecoins are, how the on-ramp and off-ramp process actually works, the competitive landscape of platforms building on top of them, and what the Bridge acquisition signals for the future of cross-border commerce.",
      ],
    },
    {
      heading: "Key Terms",
      paragraphs: [
        "Before examining the infrastructure, it helps to define the vocabulary. These markets generate a lot of terminology that is often used loosely.",
        "A \u201cstablecoin\u201d is a cryptocurrency whose value is pegged to a fiat currency \u2014 typically the U.S. dollar \u2014 through some form of backing. The two most widely used dollar stablecoins are USDC (USD Coin, issued by Circle) and USDT (Tether). Both aim to maintain a 1:1 value with the U.S. dollar. USDC maintains this peg through fully reserved, audited dollar-denominated assets. USDT uses a broader reserve composition that has attracted more scrutiny. Bridge introduced its own stablecoin, USDB, as part of its issuance product. What all of these share is that they behave like digital dollars: they hold their value, transfer instantly on a blockchain, and settle finitely without a bank in the middle.{{3}}",
        "An \u201con-ramp\u201d is the process of converting fiat currency into a stablecoin. A user or business deposits dollars (or euros, reais, pesos) via a traditional payment channel \u2014 ACH wire, SEPA transfer, PIX, SPEI \u2014 into a virtual account maintained by the infrastructure provider. That deposit is then matched with an equivalent amount of stablecoin, which is credited to a custodial wallet. The fiat goes in; digital dollars come out.",
        "An \u201coff-ramp\u201d is the reverse: converting stablecoins back into fiat and depositing them into a local bank account. Stablecoins are sent to a liquidation address, which triggers a fiat payout via the appropriate local rail. The stablecoin balance disappears; a bank deposit appears. The speed, cost, and availability of this last step varies by country and provider \u2014 and is where most of the hard infrastructure work lives.",
        "A \u201ccustodial wallet\u201d is a digital wallet where a third party (the infrastructure provider) holds the private cryptographic keys on behalf of the user. This is the standard model for payment-focused stablecoin platforms: users trust the provider to hold funds, similar to how a bank holds deposits. A \u201cnon-custodial\u201d wallet is one where the user controls the keys directly, which offers more sovereignty but more complexity. Most enterprise cross-border payment infrastructure uses custodial models for compliance reasons.",
        "The \u201cpayment rails\u201d are the underlying systems that move money within and between banking systems. ACH (Automated Clearing House) handles most U.S. bank transfers. WIRE refers to direct bank-to-bank international transfers (SWIFT). SEPA is the European equivalent for EUR-denominated transfers. PIX is Brazil\u2019s real-time payment system, launched in 2020, which enables instant bank transfers 24/7. SPEI is Mexico\u2019s equivalent. Understanding which rails exist in which markets matters because off-ramp viability depends entirely on whether a local rail can receive the funds at reasonable cost and speed.",
        "Finally, \u201ccorrespondent banking\u201d refers to the network of bilateral agreements between banks that enables international money movement. When a U.S. bank needs to send money to a bank in Nigeria, it typically does so through a chain of correspondent relationships \u2014 each bank in the chain maintains a \u201cnostro\u201d account (our money, at your bank) with the next. Every link in that chain charges fees and introduces delay. For major corridors (USD-EUR, USD-GBP), this works adequately. For emerging-market corridors \u2014 USD-NGN, USD-ARS, USD-BRL at scale \u2014 the chain is expensive, slow, and sometimes unavailable entirely.",
      ],
    },
    {
      heading: "The Foreign Exchange and Cryptocurrency Markets",
      paragraphs: [
        "The foreign exchange market processes roughly $7.5 trillion in daily turnover{{4}} \u2014 more than any other financial market on earth. It has no central exchange. Trades happen over-the-counter, negotiated between banks, institutional dealers, and electronic platforms across overlapping time zones in London, New York, Tokyo, and Singapore. This decentralized structure works well for large institutions trading major currency pairs. It works poorly for smaller transactions, non-major corridors, and businesses in developing economies that need to convert sales revenue from a local currency into dollars without paying 5\u20138% in fees and waiting two to four days for settlement.{{5}}",
        "Cryptocurrency presents a structural alternative. Bitcoin, Ethereum, and their peers operate on decentralized blockchains \u2014 networks where transactions settle on shared, immutable ledgers without central bank oversight. The tradeoffs are real: exchange insolvency, smart contract vulnerabilities, chain congestion, and regulatory uncertainty don\u2019t have clean equivalents in traditional banking. And the price volatility of most crypto assets makes them impractical as payment mediums for businesses that price goods in dollars.",
        "Stablecoins sit at the intersection. They hold their value in dollars while clearing and settling on a blockchain, which means a payment from New York to Manila can finalize in seconds for a fraction of a percent, rather than threading through a correspondent banking chain that extracts fees at each step. The key comparison is not FX trading mechanics versus crypto trading mechanics \u2014 it is correspondent banking versus stablecoin settlement as infrastructure for moving value across borders.",
        "Traditional correspondent banking requires bilateral account relationships at every step: originating bank, intermediary bank, receiving bank. Each link adds overhead. Stablecoin settlement collapses that chain to a single cryptographic transaction \u2014 one sender, one receiver, one fee. The FX conversion still happens (dollars to local currency), but it happens at the off-ramp rather than mid-chain, meaning it happens once, competitively priced, at the point of delivery.",
      ],
    },
    {
      heading: "How On-Ramps and Off-Ramps Work",
      paragraphs: [
        "The abstract appeal of stablecoins is easy to state. The engineering challenge is in the plumbing: how does a dollar actually get into a stablecoin, travel across borders, and come out as local fiat on the other side? This is the on-ramp/off-ramp problem, and it is where most of the infrastructure complexity lives.",
        "In Bridge\u2019s architecture, the flow works as follows. A business or developer initiates a payment through the Bridge API. On the sending side, the customer deposits fiat currency via ACH, WIRE, SEPA, SPEI, or PIX into a virtual account \u2014 a local bank account number issued in the sender\u2019s country. Bridge\u2019s system detects the deposit and credits an equivalent amount of stablecoin (USDB, USDC, or USDT) to a custodial wallet. The fiat has been on-ramped into digital dollars.",
      ],
      image: "/articles/stablecoin-infrastructure-landscape/slide10-img1.jpg",
      imageCaption:
        "Bridge\u2019s full infrastructure architecture: on-ramp (fiat \u2192 stablecoin via virtual account), custodial wallet holding stablecoin earning ~4% APY, and off-ramp (stablecoin \u2192 fiat via liquidation address to local bank). Supports ACH, WIRE, SEPA, SPEI, and PIX across US, EU, MX, and BR.",
      paragraphsAfterImage: [
        "From the custodial wallet, funds can be held (earning approximately 4% APY on the stablecoin balance), sent to an external wallet, spent via a Visa debit card issued by Bridge in 18 countries, or off-ramped. The off-ramp is the mirror of the on-ramp: stablecoins are sent to a liquidation address, which triggers a fiat deposit into the recipient\u2019s local bank account via the appropriate payment rail. The stablecoin is burned; the equivalent local currency appears in the recipient\u2019s bank within seconds for real-time rails like PIX or within a business day for slower systems.",
        "The practical result of this architecture is that a company paying a contractor in Brazil does not need to wire dollars internationally, wait for SWIFT settlement, and pay FX conversion fees at a bank. It deposits dollars into a U.S. ACH-enabled virtual account, Bridge converts them to USDC on-chain, and the Brazilian contractor receives reais via PIX directly into their Nubank account. One API call. Two to four seconds for the PIX leg. A flat fee rather than a percentage of the transaction.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/stablecoin-infrastructure-landscape/slide20-img4.png",
      imageCaption:
        "A real Bridge off-ramp transaction: 104.72 USDC (on Solana) converted to R$600.00 BRL, deposited via PIX to a Nubank account. Exchange rate: 1 USDC \u2248 5.98 BRL. Flat fee: $0.10.",
      paragraphsAfterImage: [
        "The transaction screenshot above shows exactly this. A user is sending 104.72 USDC from a Solana wallet to Lucca Freire\u2019s Nubank account in Brazil. The exchange rate is locked at 5.98 BRL per USDC for five minutes while the transaction completes. The flat fee is $0.10 \u2014 compared to the 3\u20136% FX conversion fee and $15\u201325 wire fee a traditional bank would charge for the same transfer. The quote expires in under five minutes because stablecoin exchange rates update in real time; Bridge freezes the rate momentarily to give the sender certainty.",
        "This type of corridor \u2014 U.S. dollars to an emerging-market currency via a real-time local rail \u2014 is where stablecoins have the clearest structural advantage over correspondent banking. Traditional infrastructure struggles most in exactly these markets: high FX spread, limited correspondent relationships, slow settlement. The same logic applies across corridors: a company in Nigeria receiving USD from a U.S. client, a freelancer in Mexico getting paid in dollars, a logistics firm in Southeast Asia managing USD-denominated payables. Each of these previously required a bank with the right correspondent relationships. With stablecoin infrastructure, they require an API key.",
      ],
    },
    {
      heading: "Why Stripe Chose Bridge",
      paragraphs: [
        "Bridge described itself as \u201cStripe for stablecoins,\u201d{{6}} and the analogy was exact. Stripe made it easy to accept card payments by abstracting the complexity of card networks, processors, and fraud detection behind a developer API. Bridge did the same for stablecoin payments: a developer could accept stablecoins, convert between any two dollar formats, and off-ramp to local fiat through a single integration \u2014 without managing wallets, gas fees, or blockchain routing directly.",
        "The core product had three components. Orchestration handled the movement and storage of stablecoins, routing payments across chains to optimize cost and speed. Issuance allowed businesses to create their own stablecoins backed by treasury reserves, with Bridge managing custody and sharing yield with the issuer. Global transfers enabled USD-to-local-currency payouts in markets where traditional wire infrastructure was slow or unavailable.{{7}}",
      ],
      image: "/articles/stablecoin-infrastructure-landscape/bridge-architecture.jpg",
      imageCaption:
        "Bridge\u2019s product architecture, showing fiat on-ramp and off-ramp flows through custodial wallets, with support for ACH, WIRE, SEPA, SPEI, and PIX rails across US, EU, MX, and BR bank accounts.",
      paragraphsAfterImage: [
        "The compliance layer was where Bridge genuinely differentiated itself from the field. Moving tokens is a solved problem. Moving tokens in a way that satisfies enterprise KYC/AML requirements, money transmitter regulations, and institutional audit standards is not. KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements obligate payment platforms to verify customer identities and monitor for suspicious activity \u2014 this is expensive and operationally complex to implement at scale. Bridge had obtained money transmitter licenses across the U.S. and was pursuing Electronic Money Institution status in the EU.{{8}} As Bridge\u2019s Head of Product Mai Leduc put it: \u201cBridge is compliance-first\u2026 we\u2019re not just building tech \u2014 we\u2019re engineering trust.\u201d{{9}} In payments that sentence is operational, not philosophical: a license is a market access right that takes years and millions of dollars to obtain.",
        "The traction validated the thesis. By 2024, Bridge was handling 10x year-over-year volume growth{{10}}, with clients including Coinbase, SpaceX, and several government agencies. Starlink used Bridge to repatriate peso-denominated Argentine sales revenue \u2014 a country where official USD access was severely restricted \u2014 converting local sales into freely movable USD stablecoins.{{11}} Nigeria-based users paid for YouTube Premium through Bridge-integrated platforms, using USDC as a workaround for restricted card access. These are not edge cases. They are real payment problems in markets where the legacy financial system has materially failed, and Bridge\u2019s infrastructure was the working solution.",
        "For Stripe, the acquisition addressed a specific strategic constraint. Stripe\u2019s stated mission \u2014 \u201cincrease the GDP of the internet\u201d{{12}} \u2014 requires growth in markets where traditional payment infrastructure is insufficient. Building banking relationships in 50 emerging-market countries takes years and enormous regulatory resources. Bridge offered a shortcut. Stripe\u2019s President of Tech & Business Will Gaybrick was explicit about the roadmap: Bridge\u2019s issuance capabilities became the foundation of Stripe\u2019s \u201cOpen Issuance\u201d platform, which lets any business launch its own stablecoin with yield shared back to the issuer. That product did not exist before the acquisition.",
      ],
    },
    {
      heading: "The Stablecoin Platform Landscape",
      paragraphs: [
        "Bridge was not building in a vacuum. A range of stablecoin infrastructure platforms had emerged by 2024, each targeting specific corridors, customer segments, or use cases. Mapping that landscape makes Stripe\u2019s acquisition logic clearer.",
        "Yellow Card dominates African payment corridors, operating across 20+ countries with deep integrations into local mobile money networks and banking systems. Its value is geographic specificity: Yellow Card knows how to source liquidity in Nigeria, Ghana, and Kenya in ways that a global platform doesn\u2019t. The tradeoff is that it doesn\u2019t travel well outside Africa.",
        "Due (OpenDue) took a different approach entirely \u2014 non-custodial stablecoin accounts that off-ramp to 80+ fiat currencies through local virtual accounts. Rather than building a developer API, Due pursued vertical integration: obtaining local licenses, building direct banking connections in each market, and presenting a product that feels more like Wise than like Bridge.",
        "BVNK provides stablecoin plumbing to financial institutions, connecting digital assets to SEPA and Faster Payments rails. Its customers are regulated entities \u2014 banks, exchanges, processors \u2014 rather than developers or business operators. Unblock Pay specializes in Latin America: stablecoin-to-fiat via PIX in Brazil and SPEI in Mexico. Notably, Unblock Pay itself uses Bridge as part of its own infrastructure stack \u2014 a signal that Bridge sat as a foundational layer for the entire category, not just one competitor among many. Mural Pay handles B2B supply chain payments across the Americas, reducing FX friction in logistics. Afriex provides low-cost USDC remittances to Nigeria, Kenya, and Ghana, letting users fund wallets in local currency for on-chain conversion.",
        "The consistent pattern: most competitors were regionally specialized or built for narrow use cases. Bridge was the only platform with genuinely horizontal ambition \u2014 a developer toolkit designed to work in any corridor with any stablecoin. That was the specific gap Stripe needed to fill.",
      ],
    },
    {
      heading: "Implications for the Payments Industry",
      paragraphs: [
        "Andreessen Horowitz called the acquisition \u201cthe first significant acknowledgment by a mainstream fintech that stablecoins are ready for primetime.\u201d{{13}} That framing may overstate the novelty \u2014 PayPal had launched its own USD stablecoin PYUSD in 2023,{{14}} and Robinhood had acquired a crypto exchange earlier that year. But the Stripe deal was different in institutional weight and strategic intent. A $100+ billion payment company wasn\u2019t adding stablecoin support as a feature. It was rebuilding a piece of its core infrastructure around stablecoin settlement.",
        "The transaction volume data explained the urgency. In 2024, stablecoins facilitated over $15 trillion in transactions \u2014 a figure that rivals Visa\u2019s annual processing volume.{{15}} That growth rate forced an obvious question for any payments infrastructure company: do stablecoins complement traditional card rails, or do they start displacing them in specific corridors?",
        "The uncomfortable subtext of the Stripe-Bridge combination is that stablecoin payments, if widely adopted, would reduce card interchange revenue \u2014 one of Stripe\u2019s primary income sources. Stripe addressed this directly, arguing that new revenue streams \u2014 float interest on stablecoin reserves, incremental volume from emerging markets previously outside Stripe\u2019s reach, and fee-generating services like multi-currency wallets and custom issuance \u2014 more than offset potential displacement. The calculation assumes stablecoins scale primarily in corridors where Stripe currently does little business. That assumption is probably right in the near term and increasingly uncertain over the long term.",
        "Stripe\u2019s 2018 decision to shut down Bitcoin payments{{16}} after a brief experiment \u2014 citing slow confirmations, high fees, and minimal merchant demand \u2014 made the Bridge acquisition a natural point of comparison. The crypto market in 2018 was structurally unfit for payments: volatile pricing, seven-to-ten minute settlement, and no regulatory clarity. By 2024, USDC offered dollar-stable pricing, sub-second finality on modern L2 networks, and an increasingly coherent regulatory framework. The U.S. Congress passed the GENIUS Act in mid-2025,{{17}} establishing the first comprehensive federal stablecoin framework. Stripe had already closed its Bridge acquisition before that legislation passed, meaning it entered the newly regulated market with a mature product rather than scrambling to build one after the rules were written.",
        "That timing was not coincidental. Stripe was not reacting to events. It was making a calculated bet on where global payment infrastructure would settle \u2014 then acquiring the best-positioned company early enough to help shape the outcome.",
      ],
    },
  ],
  footnotes: [
    "\"Stripe acquires stablecoin startup Bridge for $1.1 billion.\" The Verge, October 20, 2024.",
    "Patrick Collison, Stripe Annual Letter, 2024.",
    "Circle, \"USDC: A Dollar Digital Currency,\" circle.com. Tether, \"Tether Transparency,\" tether.to.",
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
    "Multiple industry reports, Q4 2024. Visa FY2024 payment volume: ~$14.8T. Stablecoin volume per The Block Research and Artemis.",
    "\"Stripe ends Bitcoin support,\" TechCrunch, January 23, 2018.",
    "GENIUS Act (Guiding and Establishing National Innovation for U.S. Stablecoins Act), S.394, 119th Congress, signed 2025.",
  ],
  citations: [
    "\"Stripe Acquires Bridge for $1.1 Billion in Largest-Ever Crypto Acquisition.\" The Verge, October 20, 2024. theverge.com/2024/10/20/stripe-bridge-acquisition",
    "Collison, Patrick. \"Annual Letter 2024.\" Stripe, 2024. stripe.com/annual-letter/2024",
    "Bank for International Settlements. \"OTC Foreign Exchange Turnover in April 2022.\" Triennial Central Bank Survey, September 2022. bis.org/statistics/rpfx22_fx.htm",
    "World Bank. \"Remittance Prices Worldwide.\" Report No. 47, December 2023. remittanceprices.worldbank.org",
    "Circle. \"USDC: A Dollar Digital Currency.\" circle.com",
    "Bridge. \"Product Documentation and API Reference.\" bridge.xyz, 2024.",
    "Leduc, Mai. \"Compliance-First Stablecoin Infrastructure.\" Bridge company blog, 2024.",
    "Gaybrick, Will. \"Open Issuance: Launching Custom Stablecoins.\" Stripe product announcement, 2025. stripe.com/blog/open-issuance",
    "Andreessen Horowitz. \"Portfolio Update: Stripe Acquires Bridge.\" a16z.com, October 2024.",
    "PayPal. \"PayPal Launches U.S. Dollar Stablecoin PYUSD.\" PayPal Newsroom, August 7, 2023. newsroom.paypal.com",
    "\"Stablecoins Processed More Transaction Volume Than Visa in 2024.\" Mariblock, January 2025. mariblock.com/stories/stablecoins-grossed-more-transaction-volume-than-visa-in-2024-report",
    "\"Stripe Ends Bitcoin Support.\" TechCrunch, January 23, 2018. techcrunch.com/2018/01/23/stripe-ends-bitcoin-support",
    "GENIUS Act (S.394), 119th Congress. U.S. Senate, 2025.",
    "\u201cJ.P. Morgan Wins Big in the $7.5 Trillion FX Market.\u201d J.P. Morgan, www.jpmorgan.com/insights/markets-and-economy/markets/euromoney-fx",
  ],
}

export default article
