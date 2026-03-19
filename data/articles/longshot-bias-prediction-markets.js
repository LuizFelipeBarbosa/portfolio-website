const article = {
  slug: "longshot-bias-prediction-markets",
  title: "Calibration Errors and Trading Opportunities in Kalshi Political Speech Mention Markets",
  author: "Luiz Felipe Barbosa",
  date: "2026-03-15",
  summary:
    "A systematic analysis of calibration errors in Kalshi political speech mention markets. Using VWAP snapshots across eight pre-resolution horizons and 18,757 resolved contracts, this paper identifies persistent mispricing in the 70\u201380% implied-probability range and evaluates fee-adjusted trading strategies across four market subgroups.",
  sections: [
    {
      paragraphs: [
        "This paper examines the potential for systematic exploitation of persistent calibration errors in Kalshi political speech markets for profit. The dataset includes over 18,757 resolved contracts and is divided into four groups: Trump speech markets, White House press briefings, Zohran Mamdani and NYC mayoral events, and niche political one-offs. Volume-weighted average price (VWAP) snapshots are computed across eight pre-resolution horizons to estimate temporal calibration curves, then translated into implementable trading rules. The strategy layer explicitly assesses fee-adjusted profit and loss derived from acquiring undervalued outcomes, utilizing Kalshi\u2019s precise taker fee schedule.",
        "The results indicate that certain political speech mention subgroups exhibit persistent calibration errors, and descriptive evidence supports a fee-adjusted trading edge. The full analysis code is available at the prediction-market-analysis repository on GitHub.{{1}}",
      ],
    },
    {
      heading: "Introduction",
      paragraphs: [
        "Prediction markets have evolved from niche instruments used by academics and small trading groups into broadly accessible platforms that aggregate public expectations about real-world events. Market-implied probabilities are now routinely cited alongside polls and expert commentary during national elections, central bank decisions, and geopolitical shocks, owing to their capacity to aggregate and update information in real time. This broader adoption has sharpened a central empirical question: when do market prices accurately reflect information, and when do they exhibit persistent, tradable errors?",
        "Prediction markets have also shifted from coarse political predictions \u2014 election winners, for instance \u2014 toward more granular, high-frequency contracts that ask whether a specific word will appear in a scheduled speech. This shift substantially increases the informational yield of market prices. Rather than a small number of sparse, long-term bets, researchers can now observe dense sequences of short-lived contracts that update as new information arrives. Speech mention markets are particularly valuable because their contract language is unambiguous, their outcomes are rapidly verifiable, and their recurring event formats enable systematic cross-contract comparison.",
        "This paper traces a research project that began with a simple question: do prediction markets systematically misprice low-probability and high-probability events? The affirmative answer led to a systematic calibration analysis across multiple market categories, ultimately revealing a specific, persistent, and exploitable mispricing pattern in political speech mention markets.",
      ],
    },
    {
      heading: "Longshot Bias",
      paragraphs: [
        "Longshot bias is a well-documented phenomenon in betting and prediction markets in which low-probability outcomes are systematically overpriced and high-probability outcomes are underpriced relative to their true likelihood of occurring. Intuitively, traders are often drawn to long-odds contracts because of the possibility of large payoffs, while short-odds contracts offer limited upside and therefore attract less demand. This imbalance in trader preferences pushes longshot prices above fair value and compresses prices for high-probability outcomes below their true probabilities.{{2}}",
        "In prediction-market practice, this idea maps naturally into a community heuristic often summarized as \u201cnothing ever happens.\u201d Unless strong new information arrives, traders tend to default to base-rate continuation. Market participants systematically prefer high-probability status-quo contracts rather than headline-driven tail bets. The recurring \u201cNothing Ever Happens\u201d market series on Polymarket \u2014 along with the surrounding commentary \u2014 illustrates how this heuristic has evolved into an explicit, tradable strategy framework rather than merely a meme.",
        "Viewed through the lens of longshot bias, this heuristic has a clear interpretation: if traders systematically overpay for tail outcomes, the opposite side of those trades should offer positive expected value. A simple structural strategy emerges \u2014 short longshots and buy favorites. This paper begins by documenting that pattern across all Kalshi markets before narrowing to the specific category where the mispricing is largest.",
      ],
    },
    {
      heading: "Speech Mention Contracts",
      paragraphs: [
        "A speech mention contract is a binary option that settles to \u201cYes\u201d or \u201cNo\u201d depending on whether a predefined term appears during a specified event window. In economic terms, traders continuously price the probability that speaker X will mention term Y during a particular appearance, conditional on the information available at that moment.",
        "Relative to broader political contracts, this design offers unusually clean empirical structure. Resolution rules are transparent: a word either appears in a speech or it does not. Maturities are short: markets open hours or days before a speech and close immediately after. Event formats recur frequently: Trump press conferences, White House briefings, and mayoral announcements happen repeatedly, enabling systematic cross-contract comparison. Together, these features create a high-frequency laboratory for measuring calibration error and testing whether those errors remain tradable after fees.",
      ],
    },
    {
      heading: "Calibration vs. Trading Profitability",
      paragraphs: [
        "Calibration is an essential characteristic of forecasts; it assesses the alignment of quoted probabilities with actual frequencies across numerous events. Trading profitability, on the other hand, is a different economic issue, because even a pricing mistake that can be statistically detected may not be worth acting on once transaction costs and fees are taken into account. This paper first establishes whether speech mention market prices are systematically miscalibrated relative to outcomes, and only then asks whether the magnitude of those deviations is large enough to support a net profitable trading strategy after fees.",
      ],
    },
    {
      heading: "Key Terms & Definitions",
      paragraphs: [
        "The following definitions are used consistently throughout the analysis.",
      ],
      table: {
        headers: ["Term", "Definition"],
        rows: [
          ["VWAP", "Volume-Weighted Average Price \u2014 the average contract price weighted by trade volume at each time point. More representative than a simple average because it accounts for how much was traded at each price level."],
          ["Calibration", "A market is well-calibrated if contracts priced at X% resolve YES approximately X% of the time. A calibration curve plots implied probability (x-axis) against actual resolution rate (y-axis). Perfect calibration corresponds to a 45\u00b0 diagonal."],
          ["Calibration Error", "The gap between implied probability and actual resolution rate. A positive gap indicates that the market underprices YES outcomes; a negative gap indicates overpricing."],
          ["Longshot Bias", "The empirical pattern in which low-probability contracts are overpriced and high-probability contracts are underpriced relative to their true resolution rates."],
          ["Pre-resolution horizon", "The time window before market close at which the VWAP is measured. For example, the \u201c2h before\u201d snapshot uses all trades placed at least two hours before market close."],
          ["Taker fee", "Fee paid when placing a market order that fills immediately against existing liquidity. On Kalshi: Fee(p) = \u2308 0.07 \u00d7 p \u00d7 (100 \u2212 p) / 100 \u2309 cents, where p is the price in cents."],
          ["Maker order", "A limit order that adds liquidity rather than consuming it. On Kalshi, maker orders pay zero fees, but fills are not guaranteed."],
          ["Expected Value (EV)", "Expected profit per dollar invested. Positive EV indicates a profitable edge on average."],
          ["MAD", "Mean Absolute Deviation \u2014 the average magnitude of calibration error across price buckets. A lower MAD indicates better calibration."],
          ["Subgroup", "One of four market categories: (1) Trump mention markets, (2) White House press briefings, (3) Mamdani / NYC mayoral, (4) Niche one-offs."],
        ],
        caption: "Key terms and definitions used throughout the analysis.",
      },
    },
    {
      heading: "Section 1: Visualizing the Longshot Bias",
      paragraphs: [
        "This section evaluates market calibration: when a contract trades at a given price, does that price accurately reflect the contract\u2019s empirical probability of resolving in that direction? If contracts trade at 70 cents, do positions taken at that price win approximately 70% of the time? Calibration is the most direct test of whether market prices carry useful information, and its systematic failure is the precondition for a tradable edge.",
        "The analysis loads all resolved contracts with a clear binary outcome and computes, for each price point from 1 to 99 cents, the fraction of contracts at that price that resolved YES. These empirical win rates are then plotted against the 45-degree reference line representing perfect calibration.",
      ],
      image: "/articles/longshot-bias/cell05-fig1.png",
      imageCaption: "Figure 1: Actual win rate versus contract price across all resolved Kalshi markets. The 45\u00b0 diagonal represents perfect calibration. Observations above the diagonal indicate underpriced favorites; observations below indicate overpriced longshots.",
      paragraphsAfterImage: [
        "The results confirm the longshot bias clearly. At low implied probabilities \u2014 below roughly 30 cents \u2014 the actual win rate falls consistently below the diagonal, indicating that longshot contracts are overpriced. At high implied probabilities \u2014 above roughly 60 cents \u2014 the actual win rate rises above the diagonal, indicating that favorite contracts are underpriced. The deviation from the diagonal is largest at the extremes and smallest near 50 cents, consistent with the classic longshot bias pattern documented in horse racing and other betting markets.",
      ],
    },
    {
      heading: "Section 2: Maker Win Rate by Direction",
      paragraphs: [
        "This section tests whether the longshot bias is visible on the maker side of the market. Makers are participants who place limit orders that add liquidity, as opposed to takers who consume it. The question is whether makers who buy YES contracts systematically win more or less often than contract prices imply, depending on whether they are positioned on the YES or NO side.",
        "The sample is restricted to contracts that are finalized with a clear binary outcome. Win rates are computed separately for YES-side and NO-side makers across the full range of implied probabilities, then plotted against the diagonal.",
      ],
      image: "/articles/longshot-bias/cell08-fig1.png",
      imageCaption: "Figure 2: Maker win rate by direction. Blue: makers who bought YES. Red: makers who bought NO. The 45\u00b0 diagonal represents perfect calibration.",
      paragraphsAfterImage: [
        "The plot reveals the asymmetry at the heart of longshot bias. At low implied probabilities, YES-side makers underperform relative to the diagonal \u2014 they are buying contracts that are overpriced, as expected for longshots. NO-side makers, by contrast, outperform at the same price levels. The pattern reverses at high implied probabilities: YES-side makers outperform because favorites are systematically underpriced, while NO-side makers lose ground. This bidirectional pattern is the clearest possible evidence that the mispricing is structural rather than incidental.",
      ],
    },
    {
      heading: "Section 3: Calibration in NBA Game Contracts",
      paragraphs: [
        "This section uses NBA game contracts as a calibration benchmark. These contracts are among the most liquid on Kalshi, attracting sophisticated bettors, offering unambiguous outcomes, and incorporating extensive public information in the form of injury reports, team records, and historical matchup data. Under these conditions, one would expect strong calibration \u2014 making NBA contracts a natural reference point against which to measure other market categories.",
        "Contracts are grouped into ten-percentage-point probability buckets, and the actual YES resolution rate is computed within each bucket and compared to the bucket midpoint.",
      ],
      image: "/articles/longshot-bias/cell11-fig1.png",
      imageCaption: "Figure 3: NBA game contract calibration. Bars show the observed YES resolution rate per probability bucket; the dashed line represents the bucket midpoint (perfect calibration target).",
      paragraphsAfterImage: [
        "The NBA results are close to the diagonal, particularly in the 60\u201380% range. Contracts priced in the 60\u201370% bucket resolve YES at approximately 64.1%, against a target of 65% \u2014 a gap of just 0.9 percentage points. The 70\u201380% bucket resolves at 77.7%, against a target of 75%. These deviations are modest and within the range one would expect from sampling variation. NBA game markets, in other words, are well calibrated \u2014 they will serve as the baseline against which the mispricing in speech mention contracts can be assessed.",
      ],
      table: {
        headers: ["Probability Bucket", "Actual YES Rate", "Calibrated Target", "Calibration Gap"],
        rows: [
          ["60\u201370%", "64.1%", "65%", "\u22120.9%"],
          ["70\u201380%", "77.7%", "75%", "+2.7%"],
          ["80\u201390%", "100.0%", "85%", "+5.0%"],
        ],
        caption: "Table 1: NBA game contract calibration by probability bucket.",
      },
    },
    {
      heading: "Section 4: Calibration Deviation Over Time",
      paragraphs: [
        "This section tracks how Kalshi\u2019s calibration evolves over time, examining not just calibration at a single point but whether market prices become more or less accurate as the platform matures. The analysis aggregates all resolved contracts by week and probability bucket, then computes the mean absolute deviation (MAD) between implied and realized frequencies cumulatively over time.",
      ],
      paragraphsAfterImage: [],
    },
    {
      paragraphs: [],
      image: "/articles/longshot-bias/cell14-fig1.png",
      imageCaption: "Figure 4: Weekly cumulative mean absolute calibration deviation across all resolved Kalshi contracts. A declining trend indicates that market pricing is becoming more accurate over time.",
      paragraphsAfterImage: [
        "The methodology proceeds in two stages. First, the analysis reconstructs all trade positions from resolved contracts, including both the buyer side at the recorded price and the counterparty side at the complementary price. Second, it evaluates calibration cumulatively at weekly intervals, computing the mean absolute deviation across price points as the running sample grows.",
        "Formally, the calibration deviation at weekly snapshot t is defined as the mean across all represented price levels p of the absolute difference between the empirical win rate at that price and the price itself:",
        "MAD\u209C = (1/|\u2118\u209C|) \u00d7 \u03a3\u209A\u2208\u2118\u209C | WinRate\u209C(p) \u2212 p |",
        "The time series shows a clear decline over the platform\u2019s history. Early periods, when the platform was newer and liquidity was thinner, exhibit substantially higher calibration error. As the platform has grown and attracted more sophisticated participants, the mean absolute deviation has trended downward. This pattern is consistent with models of market learning in which prices converge toward fundamental values as more informed capital enters the market.{{3}}",
      ],
    },
    {
      heading: "Section 5: Political Mention Calibration Over Time",
      paragraphs: [
        "This section applies the same calibration deviation methodology to political speech mention contracts exclusively. The question is whether the calibration trajectory in this specific market category resembles the broad Kalshi trend, or whether mention contracts exhibit a distinct pattern.",
      ],
      image: "/articles/longshot-bias/cell17-fig1.png",
      imageCaption: "Figure 5: Weekly cumulative mean absolute calibration deviation for political speech mention contracts only. The declining trend indicates improving calibration, but the early-period deviation is substantially larger than the Kalshi-wide baseline.",
      paragraphsAfterImage: [
        "The results for political mention contracts show the same general improvement over time, but from a substantially higher starting point. The following table summarizes the key statistics.",
      ],
      table: {
        headers: ["Metric", "Value"],
        rows: [
          ["Mean Absolute Deviation (Overall)", "4.03 percentage points"],
          ["Early Period (First 8 Weeks)", "10.35%"],
          ["Recent Period (Last 8 Weeks)", "1.52%"],
          ["Trend", "\u22120.153 percentage points per week (improving)"],
        ],
        caption: "Table 2: Calibration deviation statistics for political speech mention contracts.",
      },
    },
    {
      paragraphs: [
        "Early contracts exhibit large pricing deviations of approximately 10.35%, suggesting limited trader experience or thinner liquidity at the category\u2019s inception. In contrast, the most recent contracts show substantially tighter calibration at approximately 1.52%, consistent with market learning and improved price discovery as traders accumulate experience with the contract format. The overall mean of 4.03 percentage points, however, remains meaningfully above the well-calibrated NBA baseline, indicating that persistent structural mispricing survives even as the market matures.",
      ],
    },
    {
      heading: "Section 6: Speech Mention Calibration Curve",
      paragraphs: [
        "This section constructs a full calibration curve for political speech mention contracts, paralleling the analysis in Section 3 for NBA markets. Contracts are grouped into ten-percentage-point probability buckets, and the actual YES resolution rate is computed within each bucket.",
      ],
      image: "/articles/longshot-bias/cell23-fig1.png",
      imageCaption: "Figure 6: Calibration curve for political speech mention contracts. The dashed diagonal represents perfect calibration. The systematic upward deviation in the 60\u201390% range indicates persistent underpricing of high-probability YES outcomes.",
      paragraphsAfterImage: [
        "The calibration curve reveals a dramatic and systematic departure from the diagonal in the upper probability range. Contracts priced in the 70\u201380% bucket resolve YES at 91.8% of the time \u2014 a calibration gap of 16.8 percentage points. The adjacent buckets show similarly large deviations. By contrast, the NBA results in the same range fall within a few percentage points of the diagonal. The comparison below makes the contrast explicit.",
      ],
      table: {
        headers: ["Category", "Bucket", "Actual YES Rate", "Calibrated Target", "Gap"],
        rows: [
          ["NBA Game Contracts", "60\u201370%", "64.1%", "65%", "\u22120.9%"],
          ["NBA Game Contracts", "70\u201380%", "77.7%", "75%", "+2.7%"],
          ["NBA Game Contracts", "80\u201390%", "100.0%", "85%", "+5.0%"],
          ["Speech Mention Contracts", "60\u201370%", "77.1%", "65%", "+12.1%"],
          ["Speech Mention Contracts", "70\u201380%", "91.8%", "75%", "+16.8%"],
          ["Speech Mention Contracts", "80\u201390%", "96.3%", "85%", "+11.3%"],
        ],
        caption: "Table 3: Calibration comparison between NBA game contracts and political speech mention contracts. Speech mention contracts show calibration gaps that are an order of magnitude larger.",
      },
    },
    {
      heading: "Section 7: Accuracy by Subgroup",
      paragraphs: [
        "This section examines whether political speech mention contracts behave differently across speaker and event types. Rather than treating all mention contracts as a single pool, the analysis breaks them into recurring subgroups and asks three related questions: first, does the market\u2019s majority view correctly predict the final outcome; second, do quoted probabilities match realized frequencies within each subgroup; and third, if a trader naively follows extreme market probabilities, are the resulting trades profitable after taker fees?",
        "This subgroup structure matters because speech mention contracts are not homogeneous. A market on whether Donald Trump will mention a phrase may behave very differently from a White House press briefing or a niche one-off political event. Grouping contracts by speaker and event type allows the analysis to test whether calibration quality and tradability vary systematically across market contexts.",
        "Subgroups are assigned using the event ticker prefix: TRUMPMENTION for Trump speeches, SECPRESSMENTION for White House press briefings, MAMDANIMENTION and NYCMAYORDEBATEMENTION for NYC mayoral events, and all other political mention contracts as niche / one-offs.",
      ],
      table: {
        headers: ["Subgroup", "Definition"],
        rows: [
          ["Group 1: Trump Markets", "Contracts involving Donald Trump or President Trump"],
          ["Group 2: Press Briefings", "Contracts involving White House press briefings"],
          ["Group 3: Mamdani / NYC Mayoral", "Contracts involving Zohran Mamdani or the NYC Mayor\u2019s Office"],
          ["Group 4: Niche / One-offs", "All remaining political speech mention contracts"],
        ],
        caption: "Table 4: Subgroup classification for political speech mention contracts.",
      },
    },
    {
      paragraphs: [],
      image: "/articles/longshot-bias/cell30-fig1.png",
      imageCaption: "Figure 7: Directional accuracy by subgroup. All four subgroups resolve YES at rates substantially above the average implied probability, confirming systematic underpricing of high-probability outcomes across all categories.",
      paragraphsAfterImage: [
        "All four subgroups show accuracy well above what market prices imply. Niche markets are the most accurate at approximately 88.6%, followed by Mamdani and Trump markets at 88% and 86.4%, respectively, while press briefings are the least accurate at approximately 83.6%. The following sections examine each subgroup in detail.",
      ],
    },
    {
      heading: "Section 7a: Trump Markets",
      paragraphs: [
        "Trump mention contracts are the largest and most liquid subgroup, comprising over 3,400 contracts. The mispricing here is substantial: prices frequently trade below 70 cents for events that resolve YES over 90% of the time. This is the most promising category for a systematic strategy, combining large volume with a large and consistent calibration gap.",
        "The calibration chart below uses three bin sizes \u2014 1, 5, and 10 percentage points \u2014 stacked vertically to show whether the finding is robust to aggregation choice.",
      ],
      image: "/articles/longshot-bias/cell34-fig1.png",
      imageCaption: "Figure 8: Trump market calibration at three bin sizes (1¢, 5¢, 10¢). Across all three panels, actual resolution rates in the 65\u201380¢ range consistently approach or exceed 90%, indicating a systematic and economically significant underpricing of favorites.",
      paragraphsAfterImage: [
        "The calibration chart confirms and sharpens the Section 6 finding. In Trump contracts, contracts priced between 65 and 80 cents resolve YES at rates approaching or exceeding 90%, indicating a systematic and economically large underpricing of favorites. The deviation is not confined to a single price band but spans the entire upper half of the price distribution, suggesting a broad structural bias rather than an anomaly in one bucket. Compared to the pooled speech mention calibration curve, Trump markets show slightly larger deviations, consistent with the high repetition and predictability of presidential speech patterns.",
      ],
    },
    {
      heading: "Section 7b: Press Briefings",
      paragraphs: [
        "White House press briefing mention contracts share a similar structure with Trump markets but operate at a somewhat smaller scale and exhibit slightly lower accuracy. Press briefing contracts ask whether a specific topic will be mentioned during the daily White House press secretary\u2019s remarks \u2014 a recurring, high-frequency event format.",
      ],
      image: "/articles/longshot-bias/cell37-fig1.png",
      imageCaption: "Figure 9: Press briefing calibration at three bin sizes. The same qualitative pattern appears, though the magnitude of the deviation is modestly smaller than in Trump markets.",
      paragraphsAfterImage: [
        "The press briefing calibration chart shows the same qualitative pattern as Trump markets \u2014 actual resolution rates exceed implied probabilities across the upper price range \u2014 but the magnitude of the deviation is somewhat smaller. Contracts priced in the 70\u201385 cent range resolve YES approximately 85\u201392% of the time, compared to 90\u201395% in Trump markets. This is consistent with press briefings being slightly less predictable: the White House press secretary\u2019s agenda is less formulaic than a presidential speech pattern, introducing more genuine uncertainty about which topics will be mentioned on any given day.",
      ],
    },
    {
      heading: "Section 7c: Mamdani Markets",
      paragraphs: [
        "The Zohran Mamdani NYC mayoral race contracts represent a distinct subgroup: hyper-local political contracts that retail traders likely price poorly due to limited information availability about local political dynamics. Despite being smaller in total volume than Trump or press briefing markets, Mamdani contracts exhibit the most dramatic mispricing of any subgroup \u2014 making them an attractive but lower-scale opportunity.",
      ],
      image: "/articles/longshot-bias/cell40-fig1.png",
      imageCaption: "Figure 10: Mamdani market calibration at three bin sizes. The 65\u201380¢ range shows calibration gaps of 15\u201325 percentage points \u2014 the largest of any subgroup.",
      paragraphsAfterImage: [
        "The Mamdani calibration chart reveals arguably the most dramatic mispricing across the entire dataset. In the 65\u201380 cent price range, actual resolution rates approach or exceed 95%, producing calibration gaps of 15\u201325 percentage points. This is consistent with the information-asymmetry hypothesis: local political contracts attract less informed pricing, and the base rate of topic mentions in mayoral debates is extremely high for bread-and-butter NYC policy issues such as housing, transit, and public safety. The narrow market and low volume also suggest less competitive arbitrage pressure, which would otherwise compress the mispricing.",
      ],
    },
    {
      heading: "Section 7d: Niche / One-off Contracts",
      paragraphs: [
        "The fourth subgroup encompasses every political speech mention contract that does not fall under Trump, press briefings, or Mamdani. This includes one-off events such as congressional hearings, agency announcements, and miscellaneous political speeches \u2014 contracts that appear once and never recur. Despite being the largest subgroup by contract count (approximately 13,300 contracts), these markets are the least promising for a systematic strategy.",
      ],
      image: "/articles/longshot-bias/cell43-fig1.png",
      imageCaption: "Figure 11: Niche / one-off contract calibration at three bin sizes. High-probability YES outcomes are consistently underpriced, particularly in the 60\u201380¢ range, but the heterogeneity of the subgroup introduces greater variability.",
      paragraphsAfterImage: [
        "The Group 4 calibration chart confirms that high-probability YES outcomes are consistently underpriced across this catch-all subgroup. When the price falls between 60 and 80 cents, actual resolution rates substantially exceed market-implied probabilities. However, the heterogeneity of the subgroup \u2014 spanning events as varied as congressional subcommittee hearings, local government announcements, and federal agency press releases \u2014 introduces substantial variance and limits the reliability of a systematic strategy. The per-trade edge is present, but the contract-by-contract unpredictability makes it the weakest category for systematic exploitation.",
      ],
    },
    {
      heading: "Section 8: Testing Trading Strategies",
      paragraphs: [
        "This section evaluates whether simple threshold-based trading rules would have been profitable within each subgroup. Using the 2-hour VWAP as the entry signal, the analysis simulates three taker strategies: the extremes strategy, which buys YES if price exceeds 70 cents and NO if price falls below 30 cents; the favorites strategy, which buys YES when price exceeds 60 cents; and the high-confidence strategy, which buys YES only when price exceeds 70 cents.",
        "An important methodological consideration is the explicit modeling of Kalshi\u2019s taker fee schedule. At a price of 70 cents, the fee is approximately 1.5 cents per contract, reducing the upside from 30 cents to 28.5 cents \u2014 approximately a 5% drag on returns. The net return formula is as follows: if YES resolves YES, the net return is (100 \u2212 price \u2212 fee) / 100; if YES resolves NO, the net return is \u2212(price + fee) / 100. All strategy evaluations use this fee-adjusted calculation.",
      ],
      image: "/articles/longshot-bias/cell48-fig1.png",
      imageCaption: "Figure 12: Strategy comparison for Trump markets. Left panel: gross vs. net per-trade returns across three strategies. Right panel: cumulative dollar profit. The >60% threshold maximizes total profit through volume; the >70% threshold maximizes per-trade return.",
      paragraphsAfterImage: [
        "The side-by-side charts make the strategy tradeoffs explicit. Fee drag is meaningful but not strategy-defeating \u2014 net per-trade returns remain positive across all three strategies after fees are applied. The high-confidence (>70%) strategy retains the largest per-trade edge after fees, but the larger trade count under the favorites (>60%) threshold more than compensates for the modestly lower per-trade return when cumulative profit is the objective. This is a classic precision-versus-recall tradeoff: tighter entry criteria improve per-trade quality but reduce total volume and therefore total profit.",
      ],
    },
    {
      heading: "Section 9: Cross-Subgroup Strategy Comparison",
      paragraphs: [
        "This section brings together all four subgroups and all strategy thresholds (>60%, >70%, >80%, >90%) in a unified comparison framework, using a profit heatmap to identify where the edge is strongest across the subgroup-threshold space.",
        "The cross-subgroup analysis confirms the ranking established in earlier sections. Trump markets offer the best combination of scale and edge, followed by Mamdani (high edge per trade, lower total volume), press briefings (moderate on both dimensions), and niche one-offs (weakest). Per-trade profit increases with threshold stringency across all subgroups \u2014 the >90% threshold yields the highest per-trade return everywhere \u2014 but trade counts drop sharply, creating the familiar tradeoff between selectivity and volume.",
      ],
      image: "/articles/longshot-bias/cell54-fig1.png",
      imageCaption: "Figure 13: Profit heatmap \u2014 per-trade profit (in cents) by subgroup and entry threshold. Green indicates higher profit; red indicates lower profit. Trump and Mamdani markets at the >70% and >80% thresholds represent the most attractive cells in the strategy space.",
      paragraphsAfterImage: [
        "The heatmap makes the optimal strategy space immediately legible. The green-to-red gradient confirms that Trump and Mamdani markets at the >70% and >80% thresholds, where per-trade profits range between 8 and 14 cents, represent the strongest opportunities. Two structural patterns stand out. The profit gradient is steeper across thresholds (columns) than across subgroups (rows), implying that entry-price discipline matters more than subgroup selection. And the >90% threshold yields the highest per-trade values for most subgroups but applies to very few trades, limiting its practical utility unless combined with a patient maker-order approach that avoids taker fees entirely.",
      ],
    },
    {
      heading: "Principal Findings",
      paragraphs: [
        "Longshot bias is pervasive across all Kalshi markets. Low-probability events are consistently overpriced, while high-probability events are consistently underpriced relative to their empirical resolution rates. This pattern is visible at the platform level and replicates across all market categories examined.",
        "Political speech mention markets are the most miscalibrated category on the platform. In the 70\u201380% implied-probability bucket, events resolve YES 91.8% of the time \u2014 a calibration gap of 16.8 percentage points. By comparison, NBA game contracts in the same bucket deviate from the diagonal by fewer than 3 percentage points.",
        "The mispricing persists, but it has narrowed substantially over time. Calibration has improved from approximately 20 percentage points of mean absolute deviation in the earliest data to approximately 1.52 percentage points in the most recent period. However, the convergence curve appears to be flattening rather than approaching zero, suggesting a structural floor to mispricing \u2014 likely attributable to thin liquidity and limited arbitrage capital in niche market categories.",
        "Trump and Mamdani markets offer the strongest risk-adjusted opportunity. Trump markets combine substantial volume with 86.4% directional accuracy. Mamdani markets, though smaller, exhibit the highest per-trade alpha \u2014 consistent with an informationally neglected niche characterized by greater information asymmetry. Press briefings occupy a middle ground, while niche one-off events are too heterogeneous for systematic exploitation.",
        "The edge survives transaction costs. All three threshold strategies \u2014 >60%, >70%, and >80% \u2014 remain profitable net of Kalshi\u2019s taker fee schedule. The >60% threshold maximizes total profit through higher volume, while the >70% threshold maximizes per-trade profit. Entry-price discipline appears more important than subgroup selection for overall profitability.",
        "Maker orders would further enhance profitability. Kalshi charges zero fees for maker (limit) orders. A patient trader willing to post limit orders rather than crossing the spread could eliminate the approximately 5\u20137% fee drag, substantially increasing expected profit per trade.",
      ],
    },
    {
      heading: "Limitations",
      paragraphs: [
        "The analysis has three principal limitations. First, there is no out-of-sample validation. The same dataset is used for both calibration estimation and strategy evaluation. The early period \u2014 when mean absolute deviation approached 20 percentage points \u2014 constitutes a substantial portion of the backtest. A trader deploying the strategy today would face a much smaller residual deviation of approximately 1.52 percentage points. The cumulative equity curves therefore conflate profits generated during an early, likely unrepeatable high-mispricing regime with those from a later, more efficient one.",
        "Second, correlated outcomes inflate the effective sample size. Speech mention contracts linked to a single event \u2014 such as dozens of contracts associated with one Trump speech \u2014 are highly correlated. When a speaker addresses multiple topics, many mention markets resolve identically, compressing the effective sample size well below the raw contract count. True drawdown risk is therefore likely higher than the smooth equity curves suggest.",
        "Third, there is no explicit execution model. The analysis assumes all trades execute at the recorded VWAP. In practice, traders seeking to acquire contracts above a given threshold must compete with other orders at those price levels. The backtest does not account for fill rates, slippage, or queue priority \u2014 particularly relevant for maker orders.",
      ],
    },
    {
      heading: "Next Steps",
      paragraphs: [
        "Several extensions would substantially strengthen the analysis. The most critical is out-of-sample validation: partitioning the dataset temporally \u2014 training on one period and testing on a subsequent holdout period \u2014 would determine whether the calibration edge persists under forward-looking conditions.",
        "A second priority is clustering returns at the event level. Grouping contracts by parent event and computing returns at the event level rather than the contract level would address cross-contract correlation and yield more accurate confidence intervals, Sharpe ratios, and drawdown estimates.",
        "A third extension is a cross-platform comparison with Polymarket. Replicating the calibration analysis on comparable Polymarket contracts would test whether the longshot bias in speech mention markets is attributable to Kalshi-specific microstructure or is a more general feature of prediction market pricing for this contract type.",
        "Finally, a forward paper trading exercise \u2014 implementing a simple threshold rule and tracking performance across future speech events without capital at risk \u2014 would validate both execution feasibility and out-of-sample performance before any live deployment.",
      ],
    },
  ],
  footnotes: [
    "The full analysis code is available at github.com/LuizFelipeBarbosa/prediction-market-analysis.",
    "Thaler, R. H. & Ziemba, W. T. (1988). Anomalies: Parimutuel Betting Markets: Racetracks and Lotteries. Journal of Economic Perspectives, 2(2), 161\u2013174.",
    "Le, N. A. (2026). Decomposing Crowd Wisdom: Domain-Specific Calibration Dynamics in Prediction Markets. arXiv. arxiv.org/abs/2602.19520",
  ],
  citations: [
    "Becker, J. (2026). The Microstructure of Wealth Transfer in Prediction Markets. jbecker.dev/research/prediction-market-microstructure",
    "Le, N. A. (2026). Decomposing Crowd Wisdom: Domain-Specific Calibration Dynamics in Prediction Markets. arXiv. arxiv.org/abs/2602.19520",
    "Thaler, R. H. & Ziemba, W. T. (1988). Anomalies: Parimutuel Betting Markets: Racetracks and Lotteries. Journal of Economic Perspectives, 2(2), 161\u2013174.",
    "Kalshi. (2026). Platform trade data. Dataset comprising 18,757 resolved political speech mention contracts, accessed January 2026. kalshi.com",
  ],
}

export default article
