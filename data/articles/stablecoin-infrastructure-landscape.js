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
        "When Stripe paid $1.1 billion for Bridge in October 2024,{{1}} it was one of the largest acquisitions in crypto history. But describing it as a \u201ccrypto acquisition\u201d mostly misses the point. Stripe was not buying a blockchain company. It was buying the most mature infrastructure available for solving a problem that has made international payments expensive and slow for decades.",
        "Stripe CEO Patrick Collison put it plainly: stablecoins are \u201croom-temperature superconductors for financial services.\u201d{{2}} The metaphor is apt. A superconductor transmits electricity without resistance \u2014 the friction is not inherent to electricity but a property of the material conducting it. Cross-border payments fail not because moving money internationally is physically difficult, but because the infrastructure built to do it was designed in the 1970s and has barely changed since. Stablecoins, in Collison\u2019s framing, could remove the resistance without replacing the underlying current.",
        "This essay examines the infrastructure behind that claim: what stablecoins are, how the on-ramp and off-ramp process works in practice, the competitive landscape of platforms building on top of these rails, and what the Bridge acquisition signals for the future of global commerce.",
      ],
    },
    {
      heading: "Understanding the Infrastructure",
      paragraphs: [
        "To appreciate what Stripe acquired, it is necessary to understand the vocabulary of the space \u2014 not as an abstract glossary, but because each term maps onto a specific structural failure that stablecoin infrastructure was designed to address.",
        "The foundational concept is the stablecoin itself. Unlike Bitcoin or Ethereum, whose prices fluctuate sharply relative to fiat currencies, a stablecoin is a cryptocurrency pegged to a fiat currency \u2014 typically the U.S. dollar \u2014 through reserve backing. The two most widely used dollar stablecoins are USDC, issued by Circle and backed by fully reserved, audited dollar assets, and USDT (Tether), which draws on a broader reserve composition that has attracted more regulatory scrutiny. Bridge also introduced its own stablecoin, USDB, as part of its issuance product. Regardless of issuer, what these instruments share is that they behave like digital dollars: stable in value, transferable instantly on a blockchain, and settled finitely without a bank as intermediary.{{3}}",
        "The terms that matter most for cross-border payments are \u201con-ramp\u201d and \u201coff-ramp.\u201d An on-ramp is the process of converting fiat currency into stablecoins. A business deposits dollars, euros, reais, or pesos through a conventional payment channel \u2014 ACH or WIRE in the United States, SEPA in Europe, PIX in Brazil, SPEI in Mexico \u2014 into a virtual account maintained by the infrastructure provider. That deposit triggers the issuance of an equivalent stablecoin amount into a custodial wallet, effectively converting the fiat into digital dollars on-chain. An off-ramp is the mirror operation: stablecoins are sent to a liquidation address, which triggers a fiat deposit into the recipient\u2019s bank account via the appropriate local rail. The speed of that final step \u2014 seconds on a real-time rail like PIX or SPEI, a business day on slower systems \u2014 determines whether the infrastructure is practically useful in a given market.",
        "A custodial wallet, in this context, is one where the infrastructure provider holds the private cryptographic keys on behalf of the user, much as a bank holds deposits. Most enterprise payment platforms use this model because it integrates more naturally with KYC (Know Your Customer) and AML (Anti-Money Laundering) compliance requirements, which oblige payment platforms to verify customer identities and flag suspicious activity. The alternative \u2014 non-custodial wallets, where users hold their own keys \u2014 grants more autonomy but places compliance responsibility on the user, making it impractical for most institutional applications.",
        "The bottleneck these stablecoins replace is what the banking industry calls correspondent banking. When a U.S. bank sends money to a counterpart in Nigeria, it does so through a chain of bilateral relationships in which each institution maintains a nostro account \u2014 in essence, our money held at your bank \u2014 with the next institution in the chain. Every link extracts fees and introduces settlement delay. For major corridors like USD-EUR or USD-GBP, this network functions adequately. For emerging-market corridors \u2014 USD-NGN, USD-ARS, USD-BRL at scale \u2014 correspondent chains are expensive, slow, and sometimes unavailable. Stablecoin settlement collapses that chain into a single on-chain transaction, handling the foreign exchange conversion once, competitively priced, at the moment of off-ramp delivery.",
      ],
    },
    {
      heading: "The Foreign Exchange and Cryptocurrency Markets",
      paragraphs: [
        "The foreign exchange market processes roughly $7.5 trillion in daily turnover{{4}} \u2014 more than any other financial market in the world. It operates with no central exchange, with trades negotiated over-the-counter between banks, institutional dealers, and electronic platforms across the overlapping time zones of London, New York, Tokyo, and Singapore. This decentralized structure functions well for large institutions trading major currency pairs. It functions poorly for smaller transactions, non-major corridors, and businesses in developing economies that must convert local-currency revenue into dollars without absorbing fees of five to eight percent and waiting two to four days for settlement.{{5}}",
        "Cryptocurrency presents a structural alternative. Bitcoin, Ethereum, and their peers operate on decentralized blockchains \u2014 networks where transactions settle on shared, immutable ledgers without central bank oversight, enabling peer-to-peer value transfer without any participant trusting a single intermediary. The tradeoffs are substantial: exchange insolvency, smart contract vulnerabilities, chain congestion, and regulatory uncertainty introduce risks without clear equivalents in traditional banking. More fundamentally, the price volatility of most crypto assets makes them impractical as payment instruments for businesses that denominate goods and services in dollars.",
        "Stablecoins occupy a distinct position in this landscape. They hold their value in dollars while clearing and settling on a blockchain, which means that a payment from New York to Manila can finalize in seconds for a fraction of a percent, rather than moving through a correspondent banking chain that extracts a toll at every step. The relevant comparison is not FX trading mechanics against crypto trading mechanics but rather correspondent banking against stablecoin settlement as competing architectures for moving value across borders. The former requires bilateral account relationships at every link of the chain; the latter collapses the chain entirely, executing the foreign exchange conversion once, at delivery.",
      ],
    },
    {
      heading: "How On-Ramps and Off-Ramps Work",
      paragraphs: [
        "The abstract appeal of stablecoins is straightforward to articulate. The engineering challenge lies in the plumbing: how does a dollar actually enter a stablecoin, traverse a border, and emerge as local fiat currency in a recipient\u2019s bank account? This is the on-ramp and off-ramp problem, and it is where the majority of the infrastructure complexity is concentrated.",
        "In Bridge\u2019s architecture, the flow proceeds as follows. A business or developer initiates a payment through the Bridge API. On the sending side, the customer deposits fiat currency via the appropriate local rail \u2014 ACH or WIRE from a U.S. bank account, SEPA from a European account, PIX from a Brazilian account, SPEI from a Mexican account \u2014 into a virtual account issued in the sender\u2019s country. Bridge\u2019s system detects the deposit and credits an equivalent amount of stablecoin (USDB, USDC, or USDT) to a custodial wallet. The fiat has been on-ramped.",
      ],
      image: "/articles/stablecoin-infrastructure-landscape/slide10-img1.jpg",
      imageCaption:
        "Bridge\u2019s full infrastructure architecture: fiat enters via a local virtual account (on-ramp), is held in a custodial wallet earning approximately 4% APY, and is delivered to a recipient\u2019s bank account via a local rail (off-ramp). Supports ACH, WIRE, SEPA, SPEI, and PIX across the US, EU, MX, and BR.",
      paragraphsAfterImage: [
        "From the custodial wallet, funds may be held \u2014 earning approximately four percent APY on the stablecoin balance \u2014 sent to an external wallet, spent via a Bridge-issued Visa debit card available in 18 countries, or directed toward an off-ramp. The off-ramp mirrors the on-ramp in reverse: stablecoins are sent to a liquidation address, which triggers a fiat deposit into the recipient\u2019s local bank account via the designated rail. The stablecoin is redeemed; local currency appears in the recipient\u2019s bank within seconds on real-time systems like PIX, or within a business day on slower infrastructure.",
        "The practical effect of this architecture is that a company paying a contractor in Brazil no longer needs to initiate an international wire, wait for SWIFT settlement, and absorb an FX conversion fee at a correspondent bank. It deposits dollars into a U.S. virtual account, Bridge converts them to USDC on-chain, and the contractor receives reais directly into a local bank account via PIX. The transaction takes seconds. The fee is flat.",
      ],
    },
    {
      paragraphs: [],
      image: "/articles/stablecoin-infrastructure-landscape/slide20-img4.png",
      imageCaption:
        "A Bridge off-ramp transaction in practice: 104.72 USDC on Solana converted to R$600.00 BRL, deposited via PIX to a Nubank account at a rate of 1 USDC \u2248 5.98 BRL, with a flat fee of $0.10.",
      paragraphsAfterImage: [
        "The transaction above illustrates the off-ramp in practice. A sender is converting 104.72 USDC from a Solana wallet into 600.00 Brazilian reais, which will be deposited via PIX directly into the recipient\u2019s Nubank account. The exchange rate is locked at 5.98 BRL per USDC for five minutes, giving the sender certainty while the transaction settles. The flat fee is $0.10 \u2014 compared to the three to six percent FX spread and the $15\u201325 wire fee a traditional bank would charge for the same transfer.",
        "This corridor \u2014 U.S. dollars converted to an emerging-market currency and delivered via a real-time local rail \u2014 is where stablecoin infrastructure has its most compelling structural advantage. Correspondent banking performs worst in exactly these markets: high FX spreads, limited bilateral relationships, slow settlement. The same calculus applies across dozens of corridors where the legacy system has historically failed: companies in Nigeria receiving USD from U.S. clients, freelancers in Mexico collecting dollar-denominated fees, logistics firms in Southeast Asia managing cross-border payables. Each of these transactions previously required access to a bank with the right correspondent network. With stablecoin infrastructure, they require an API key.",
      ],
    },
    {
      heading: "Why Stripe Chose Bridge",
      paragraphs: [
        "Bridge described itself as \u201cStripe for stablecoins,\u201d{{6}} and the analogy was precise. Stripe had grown into a dominant payment platform by abstracting the complexity of card networks, fraud detection, and processor relationships behind a clean developer API. Bridge pursued the same logic for stablecoin payments: a developer could accept stablecoins, convert between any two dollar formats, and off-ramp to local fiat through a single integration, without managing wallets, gas fees, or blockchain routing directly. The core product comprised three components \u2014 orchestration, which handled the movement and routing of stablecoins across chains; issuance, which allowed businesses to mint their own stablecoins backed by treasury reserves with yield shared back to the issuer; and global transfers, which enabled USD-to-local-currency payouts in markets where traditional wire infrastructure was slow or absent.{{7}}",
        "The compliance layer was where Bridge most clearly separated itself from its peers. Moving tokens between wallets is a solved engineering problem. Moving tokens in a way that satisfies enterprise KYC and AML requirements, money transmitter regulations, and institutional audit standards is not. Bridge had obtained money transmitter licenses across the United States and was pursuing Electronic Money Institution status in the European Union.{{8}} As Bridge\u2019s Head of Product Mai Leduc put it: \u201cBridge is compliance-first\u2026 we\u2019re not just building tech \u2014 we\u2019re engineering trust.\u201d{{9}} In the payments industry, that sentence is operational rather than rhetorical: a license represents years of regulatory work and millions of dollars in compliance infrastructure, and competitors without licenses are structurally limited to crypto-native customers who can accept that risk.",
        "The company\u2019s growth validated the thesis. By 2024, Bridge was processing ten times the volume it had managed the prior year,{{10}} with clients including Coinbase, SpaceX, and several U.S. government agencies. Starlink used Bridge to repatriate peso-denominated Argentine sales revenue \u2014 a country where official USD access was severely restricted \u2014 converting local receipts into freely transferable stablecoins.{{11}} Nigerian users paid for YouTube Premium subscriptions through Bridge-integrated platforms, using USDC as a workaround for restricted card access. These are not experimental use cases. They are payments that the legacy financial system structurally could not facilitate, and Bridge\u2019s infrastructure was the working solution.",
        "For Stripe, the acquisition addressed a specific gap in its strategic ambitions. Stripe\u2019s stated mission \u2014 to \u201cincrease the GDP of the internet\u201d{{12}} \u2014 presupposes meaningful presence in markets where traditional payment infrastructure is inadequate. Building banking relationships across fifty emerging-market countries takes years and significant regulatory capital. Bridge provided a shortcut. Its issuance capabilities became the foundation of Stripe\u2019s subsequent \u201cOpen Issuance\u201d platform, which enables any business to launch its own stablecoin with reserves managed by Stripe and yield returned to the issuer. That product did not exist before the acquisition.",
      ],
    },
    {
      heading: "The Stablecoin Platform Landscape",
      paragraphs: [
        "Bridge was not building in a vacuum. By 2024, a range of stablecoin infrastructure platforms had emerged, each targeting specific corridors, customer segments, or use cases. Mapping this landscape clarifies both the scale of the opportunity and the strategic logic of Stripe\u2019s choice of acquisition target.",
        "Yellow Card dominates African payment corridors, operating across more than twenty countries through deep integrations with local mobile money networks and banking systems. Its competitive advantage is geographic specificity \u2014 the ability to source liquidity in Nigeria, Ghana, and Kenya in ways that a globally oriented platform cannot easily replicate. That same specificity limits its addressable market.",
        "Due (OpenDue) pursued a different model entirely, offering non-custodial stablecoin accounts that off-ramp to over eighty fiat currencies through local virtual accounts. Rather than building a developer API for other businesses to integrate, Due pursued vertical integration: obtaining local licenses, establishing direct banking relationships in each market, and presenting a consumer-facing product closer in feel to Wise or Revolut than to Bridge.",
        "BVNK provides stablecoin connectivity to financial institutions, linking digital assets to SEPA and Faster Payments rails. Its customers are regulated entities \u2014 banks, exchanges, and payment processors \u2014 rather than developers or businesses. Unblock Pay focuses on Latin America, enabling stablecoin-to-fiat conversions via PIX in Brazil and SPEI in Mexico; notably, Unblock Pay itself uses Bridge as part of its own infrastructure stack, a fact that signals Bridge\u2019s position as a foundational layer for the category rather than simply one competitor within it. Mural Pay streamlines B2B supply chain payments across the Americas, reducing FX friction in logistics and cross-border procurement. Afriex enables low-cost USDC remittances to Nigeria, Kenya, and Ghana.",
        "The pattern that emerges is consistent: most competitors were regionally focused or built around narrow use cases. Bridge was the only platform with genuinely horizontal ambition \u2014 a developer toolkit designed to function in any corridor with any stablecoin. That universality was the specific capability Stripe needed.",
      ],
    },
    {
      heading: "Implications for the Payments Industry",
      paragraphs: [
        "Andreessen Horowitz described the acquisition as \u201cthe first significant acknowledgment by a mainstream fintech that stablecoins are ready for primetime.\u201d{{13}} That framing may overstate the novelty \u2014 PayPal had launched its own stablecoin PYUSD in 2023,{{14}} and Robinhood had acquired a crypto exchange earlier that year \u2014 but the Stripe deal was different in institutional weight and strategic intent. A company valued above $100 billion was not adding stablecoin support as a product feature. It was restructuring a portion of its core payment infrastructure around stablecoin settlement.",
        "The transaction volume data helps explain the urgency. In 2024, stablecoins facilitated over $15 trillion in transactions \u2014 a figure that rivals Visa\u2019s annual processing volume.{{15}} For any payments infrastructure company, that growth rate raised an unavoidable question: do stablecoins complement traditional card rails, or do they begin displacing them in specific corridors?",
        "The uncomfortable implication of the Stripe-Bridge combination is that stablecoin payments, if widely adopted, would erode card interchange revenue \u2014 one of Stripe\u2019s primary income sources. Stripe addressed this tension directly, arguing that new revenue streams \u2014 interest on stablecoin float, incremental volume from markets previously outside its reach, and fee-generating services like multi-currency wallets and custom issuance \u2014 would more than offset any displacement. The argument assumes stablecoins will scale primarily in corridors where Stripe currently processes little volume, a premise that holds plausibly in the near term and becomes less certain as the technology matures.",
        "Stripe\u2019s 2018 decision to discontinue Bitcoin payments{{16}} after a brief experiment \u2014 citing slow settlement, high fees, and insufficient merchant demand \u2014 provides a useful point of comparison. The crypto market in 2018 was structurally unfit for commercial payments: volatile pricing, seven-to-ten minute confirmation times, and no regulatory framework. By 2024, USDC offered dollar-stable pricing, sub-second finality on modern Layer 2 networks, and an increasingly coherent regulatory environment. The U.S. Congress passed the GENIUS Act in mid-2025,{{17}} establishing the first comprehensive federal stablecoin framework. Stripe had already closed its Bridge acquisition before that legislation was enacted, meaning it entered the newly regulated environment with a mature and tested product rather than building one in response to the rules.",
        "That timing was not coincidental. Stripe was not reacting to regulatory developments. It was making a calculated bet on where global payment infrastructure would ultimately settle \u2014 and acquiring the best-positioned company early enough to help determine the outcome.",
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
