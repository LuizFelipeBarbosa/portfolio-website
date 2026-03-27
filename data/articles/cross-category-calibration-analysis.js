const article = {
  slug: "cross-category-calibration-analysis",
  title: "Cross-Category Calibration Analysis of Kalshi Mention Markets",
  author: "Luiz Felipe Barbosa",
  date: "2026-03-27",
  summary:
    "An analysis of 18,948 resolved Kalshi mention contracts across six categories, measuring calibration, convergence, and fee-adjusted trading opportunities across domains.",
  sections: [
    {
      paragraphs: [
        "Prediction markets make a very simple promise: prices should equal probabilities. If a contract trades at 70 cents, it should resolve YES about 70% of the time. When that relationship breaks, the gap is either a trading opportunity or evidence of a deeper structural bias in how the market works.",
        "This article examines calibration accuracy across Kalshi's mention markets — binary contracts that resolve based on whether a specific person, topic, or phrase is mentioned during a scheduled broadcast or event. The analysis covers 18,948 resolved contracts across 126 distinct series, spanning six categories: Politicians, Sports, Earnings, Entertainment, Finance, and Media/News. Using volume-weighted average prices (VWAPs) computed at multiple time horizons before each market's final trade, I measure how well prices track actual outcomes, how quickly markets converge toward fair pricing, and whether simple threshold strategies generate positive returns net of exchange fees.",
      ],
    },
    {
      heading: "The Dataset",
      paragraphs: [
        "The dataset is drawn from Kalshi, a CFTC-regulated prediction exchange. It consists of trade-level records and market metadata across 141 mention series.",
        "In raw form, the dataset contains 35,837 total markets. Of these, 33,587 have resolved. After filtering to markets with recorded trades and valid VWAP computations, 18,948 contracts remain for analysis. The sample spans January 2025 through March 2026 and includes approximately 7.6 million individual trades.",
        "Each mention series is assigned to one of six categories based on its content domain:",
      ],
      bullets: [
        "Trade data: individual trade records with timestamps, prices in cents (1–99), trade counts, and taker-side identification.",
        "Market data: contract metadata including ticker, series, title, result, close time, volume, and open interest.",
      ],
      table: {
        headers: ["Category", "Series", "Contracts", "Description"],
        rows: [
          ["Politicians", "32", "7,320", "Trump rallies, White House press briefings, mayoral debates, congressional hearings"],
          ["Sports", "13", "5,383", "NFL, NBA, NCAA, MLB, UFC/MMA broadcasts"],
          ["Earnings", "1", "2,118", "Corporate earnings call mentions"],
          ["Entertainment", "21", "1,228", "Late night shows, award ceremonies, reality TV, podcasts"],
          ["Media/News", "17", "757", "Cable news programs such as Fox News, MSNBC, and CNN"],
          ["Finance", "14", "559", "Federal Reserve, ECB, SEC proceedings, and fintech CEO appearances"],
        ],
        caption: "Table 1: Category structure of the Kalshi mention-markets dataset.",
      },
      paragraphsAfterImage: [
        "An additional 663 contracts from 28 series fall into an \"Other\" residual category. Politicians dominate the sample by volume, accounting for 39% of all analyzed contracts. Sports is the second-largest category at 28%. Together, those two categories make up roughly two-thirds of the full dataset.",
      ],
    },
    {
      heading: "The Settlement Lag Problem",
      paragraphs: [
        "A crucial methodological issue in this analysis is the distinction between two timestamps attached to each contract: close_time, when Kalshi settles and pays out the market, and last_trade_time, the timestamp of the final recorded trade. These are not the same thing.",
        "Settlement often lags the final trade by a substantial margin. Across all mention markets:",
      ],
      bullets: [
        "Median lag: 71 minutes (1.2 hours)",
        "75th percentile: 202 minutes (3.4 hours)",
        "Maximum: 19,617 minutes (13.6 days)",
        "53.2% of contracts have a settlement lag greater than 1 hour",
        "22.6% exceed 4 hours",
      ],
      image: "/articles/cross-category-calibration-analysis/settlement-lag.png",
      imageCaption:
        "Figure 1: Settlement lag (close_time minus last_trade_time) across all mention markets. The left panel shows the overall distribution with the median and 75th percentile marked. The right panel breaks the lag down by category.",
      paragraphsAfterImage: [
        "This matters because VWAP horizons need to be anchored to the moment trading actually stopped, not the moment Kalshi got around to settling the contract. If a so-called 2-hour VWAP is anchored to settlement time, it may end up measuring trades that occurred many hours before the market stopped moving. In extreme cases, the 10-minute, 30-minute, 1-hour, and 2-hour VWAPs all collapse to the same number because every trade happened before every cutoff.",
        "In an earlier version of this project, I anchored VWAPs to close_time. That made roughly 82% of markets show vwap_2h equal to vwap_10m. After correcting the anchor to last_trade_time, that number falls to 17.7% — which is much closer to what one would expect from genuine early trading cessation rather than a timestamping artifact.",
      ],
    },
    {
      heading: "Methodology",
      paragraphs: [
        "For each resolved contract, I compute volume-weighted average prices at eight horizons before the last trade: 7 days, 3 days, 1 day, 6 hours, 2 hours, 1 hour, 30 minutes, and 10 minutes. The 2-hour VWAP serves as the primary snapshot throughout the analysis because it balances recency with stability — close enough to capture late information, but not so close that a handful of final prints dominate the signal.",
        "The VWAP at a given horizon is defined as:",
        "$$\\mathrm{VWAP}(h)=\\frac{\\sum_{t_i<\\mathrm{cutoff}_h} p_i v_i}{\\sum_{t_i<\\mathrm{cutoff}_h} v_i}$$",
        "where the cutoff is last_trade_time minus the relevant horizon. Prices are in cents, so a VWAP of 70 corresponds to a market-implied YES probability of 70%.",
        "Calibration is measured by assigning contracts to probability buckets based on VWAP, then comparing each bucket's average implied probability to its realized YES rate. A perfectly calibrated market lies on the 45-degree diagonal: contracts priced at 15% should resolve YES about 15% of the time.",
        "To summarize calibration quality in a single number, I use Mean Absolute Deviation (MAD):",
        "$$\\mathrm{MAD} = \\operatorname{mean}\\left(\\left|\\mathrm{ActualYesRate} - \\mathrm{ImpliedProbability}\\right|\\right)$$",
        "MAD is reported in percentage points and is computed across all buckets with at least five observations. Lower values indicate better calibration.",
        "Kalshi's taker fee schedule is also built directly into the backtests:",
        "$$\\mathrm{fee}(p) = \\left\\lceil 0.07 \\cdot \\frac{p(100-p)}{100} \\right\\rceil$$",
        "where p is the contract price in cents. Fees are highest near the middle of the probability range and fall toward the extremes, which matters because the largest calibration errors often live at those extremes.",
        "To test whether miscalibration is economically meaningful rather than just statistically visible, I backtest two simple threshold strategies on the 2-hour VWAP:",
      ],
      bullets: [
        "Buy YES: purchase YES contracts when the 2-hour VWAP exceeds a given threshold.",
        "Buy NO: purchase NO contracts when the 2-hour VWAP falls below a given threshold.",
      ],
      paragraphsAfterImage: [
        "Thresholds are tested at 10-point intervals from 10% through 90%, and net PnL per trade is computed after deducting Kalshi taker fees.",
      ],
    },
    {
      heading: "Category-Level Calibration",
      paragraphs: [
        "The summary statistics reveal meaningful variation across categories:",
      ],
      table: {
        headers: ["Category", "Contracts", "YES Rate", "Directional Accuracy", "MAD (2h)"],
        rows: [
          ["Earnings", "2,118", "57.4%", "88.5%", "12.1%"],
          ["Entertainment", "1,228", "32.3%", "92.6%", "16.4%"],
          ["Finance", "559", "39.0%", "86.6%", "11.6%"],
          ["Media/News", "757", "40.8%", "83.6%", "11.2%"],
          ["Politicians", "7,320", "44.9%", "83.6%", "9.5%"],
          ["Sports", "5,383", "52.0%", "87.3%", "11.9%"],
        ],
        caption: "Table 2: Category-level summary statistics using the 2-hour VWAP.",
      },
      image: "/articles/cross-category-calibration-analysis/calibration-curves-by-category.png",
      imageCaption:
        "Figure 2: Calibration curves by category using the 2-hour VWAP. The dashed diagonal represents perfect calibration. Points above the line indicate underpricing; points below indicate overpricing.",
      paragraphsAfterImage: [
        "Directional accuracy — whether the 2-hour VWAP gets the direction right by predicting YES above 50 and NO below 50 — exceeds 83% in every category. Entertainment leads at 92.6%, though that partly reflects its low base rate: only 32.3% of entertainment contracts resolve YES, so a strategy that blindly predicts NO already starts with a structural advantage.",
        "MAD tells a different story. Politicians, the highest-volume category, also has the best calibration at 9.5 percentage points. Entertainment has the worst calibration at 16.4% despite its very high directional accuracy. That combination is exactly what systematic low-probability mispricing looks like: the market often guesses the direction correctly while still assigning the wrong magnitude to the underlying probability.",
      ],
    },
    {
      heading: "Multi-Horizon Calibration",
      paragraphs: [
        "Looking at a single snapshot is useful, but it misses the dynamics of how prices improve as an event approaches. The next set of charts compares calibration curves across multiple horizons — from one day before the final trade down to ten minutes — for the four largest categories.",
      ],
      carousel: [
        {
          label: "Earnings",
          src: "/articles/cross-category-calibration-analysis/multi-horizon-earnings.png",
          alt: "Multi-horizon calibration for Earnings markets",
          caption:
            "Figure 3: Earnings mention markets across six time horizons. The tighter clustering of curves at shorter horizons shows the market converging toward fair pricing as the call approaches.",
        },
        {
          label: "Entertainment",
          src: "/articles/cross-category-calibration-analysis/multi-horizon-entertainment.png",
          alt: "Multi-horizon calibration for Entertainment markets",
          caption:
            "Figure 4: Entertainment mention markets across horizons. Even near the end of trading, the category retains visible mispricing, especially in low-probability buckets.",
        },
        {
          label: "Politicians",
          src: "/articles/cross-category-calibration-analysis/multi-horizon-politicians.png",
          alt: "Multi-horizon calibration for Politicians markets",
          caption:
            "Figure 5: Politicians mention markets across horizons. The curves converge tightly toward the diagonal, consistent with deeper liquidity and stronger price discovery.",
        },
        {
          label: "Sports",
          src: "/articles/cross-category-calibration-analysis/multi-horizon-sports.png",
          alt: "Multi-horizon calibration for Sports markets",
          caption:
            "Figure 6: Sports mention markets across horizons. Sports achieves relatively good calibration early, likely because broadcast schedules and likely topics are more predictable.",
        },
      ],
      paragraphsAfterImage: [
        "The broad pattern is exactly what one would hope to see in an informationally efficient market: curves move toward the diagonal as the event gets closer and more information becomes observable. But the speed of that convergence varies materially across domains. Sports improves early. Entertainment and Earnings remain noisy much later. That difference matters because it says the market is not just learning over time — it is learning at different speeds depending on the structure of the underlying event.",
      ],
    },
    {
      heading: "Temporal Convergence",
      paragraphs: [
        "The same story appears in summary form when calibration is collapsed into MAD. Every category becomes better calibrated as the market approaches its final trade, but the rate of improvement is uneven.",
      ],
      image: "/articles/cross-category-calibration-analysis/mad-by-category.png",
      imageCaption:
        "Figure 7: Mean Absolute Deviation across time horizons for all six categories. Time runs from the longest horizon on the left to the shortest on the right.",
      paragraphsAfterImage: [
        "All categories show a monotonic decline in MAD from the 1-day horizon to the 10-minute horizon. But some categories, especially Sports, reach fairly tight calibration by the 6-hour mark, while others — particularly Entertainment and Earnings — still retain meaningful error near the end. That suggests information arrival is not uniform across domains. In some markets, traders can infer the likely outcome early. In others, the event stays genuinely open until the last stretch.",
      ],
    },
    {
      heading: "Calibration Over Time",
      paragraphs: [
        "There is a second convergence question here. Even if prices improve within a contract's lifetime, has the market itself become better calibrated over the months of its existence? To answer that, I compute rolling cumulative MAD at weekly intervals for the largest categories.",
      ],
      carousel: [
        {
          label: "Earnings",
          src: "/articles/cross-category-calibration-analysis/calibration-over-time-earnings.png",
          alt: "Calibration deviation over time for Earnings",
          caption:
            "Figure 8: Earnings — cumulative calibration deviation over time. The trend line shows whether pricing accuracy improves or deteriorates as the market matures.",
        },
        {
          label: "Entertainment",
          src: "/articles/cross-category-calibration-analysis/calibration-over-time-entertainment.png",
          alt: "Calibration deviation over time for Entertainment",
          caption: "Figure 9: Entertainment — cumulative calibration deviation over time.",
        },
        {
          label: "Politicians",
          src: "/articles/cross-category-calibration-analysis/calibration-over-time-politicians.png",
          alt: "Calibration deviation over time for Politicians",
          caption:
            "Figure 10: Politicians — cumulative calibration deviation over time. As the highest-volume category, it shows the most stable and gradually improving trajectory.",
        },
        {
          label: "Sports",
          src: "/articles/cross-category-calibration-analysis/calibration-over-time-sports.png",
          alt: "Calibration deviation over time for Sports",
          caption: "Figure 11: Sports — cumulative calibration deviation over time.",
        },
      ],
      paragraphsAfterImage: [
        "The category-level time series suggest that mention markets are learning. Calibration generally improves as more contracts are traded and resolved. But the slope is not identical across categories, and some domains remain structurally noisier than others. This is one reason it makes more sense to treat mention markets as a family of related microstructures rather than a single homogeneous asset class.",
      ],
    },
    {
      heading: "Strategy Profitability",
      paragraphs: [
        "The backtest reveals a sharp asymmetry between YES-side and NO-side strategies.",
        "Buy YES becomes profitable above the 50% threshold and peaks around the 70% level, where the average net PnL reaches +5.0 cents per trade across 6,424 trades. At the 90% threshold, the hit rate rises further, but the remaining upside is so small that per-trade returns start to compress.",
        "Buy NO is profitable across every tested threshold, with the strongest returns at the sub-50% level: +14.1 cents per trade at the <50% threshold across 8,152 trades. That is nearly three times the best YES-side result.",
      ],
      image: "/articles/cross-category-calibration-analysis/strategy-heatmap.png",
      imageCaption:
        "Figure 12: Net PnL per trade for Buy YES (left) and Buy NO (right) strategies across categories and thresholds. Green cells indicate positive fee-adjusted returns.",
      paragraphsAfterImage: [
        "This asymmetry is the clearest trading implication of the full calibration exercise. The dominant mispricing in mention markets sits on the low-probability end of the distribution. Traders systematically overestimate how often a marginal term or phrase will actually be mentioned, which means the NO side of cheap contracts tends to be underpriced even after taker fees. The longshot bias is not just visible on a calibration chart; it survives contact with the exchange's fee schedule.",
      ],
    },
    {
      heading: "VWAP Price Trajectories",
      paragraphs: [
        "The spaghetti plots below show the VWAP path for every contract in each major category, from seven days before the final trade down to ten minutes. Green traces resolve YES. Red traces resolve NO. The visual pattern is exactly what one would expect in a market learning into resolution: separation widens and prices funnel toward the extremes as the event approaches.",
      ],
      carousel: [
        {
          label: "Earnings",
          src: "/articles/cross-category-calibration-analysis/vwap-traces-earnings.png",
          alt: "VWAP traces for Earnings markets",
          caption:
            "Figure 13: Earnings — individual contract VWAP trajectories. Separation between YES and NO outcomes widens as the event approaches.",
        },
        {
          label: "Entertainment",
          src: "/articles/cross-category-calibration-analysis/vwap-traces-entertainment.png",
          alt: "VWAP traces for Entertainment markets",
          caption:
            "Figure 14: Entertainment — VWAP trajectories. The heavy concentration of red traces reflects the category's low YES rate.",
        },
        {
          label: "Politicians",
          src: "/articles/cross-category-calibration-analysis/vwap-traces-politicians.png",
          alt: "VWAP traces for Politicians markets",
          caption:
            "Figure 15: Politicians — VWAP trajectories. The dense cluster of lines reflects the category's large sample size and reveals clean separation by the 2-hour mark.",
        },
        {
          label: "Sports",
          src: "/articles/cross-category-calibration-analysis/vwap-traces-sports.png",
          alt: "VWAP traces for Sports markets",
          caption:
            "Figure 16: Sports — VWAP trajectories. The more balanced split between green and red lines mirrors Sports' near-even YES rate.",
        },
      ],
      paragraphsAfterImage: [
        "These plots are useful because they show the same phenomenon in a less aggregated way. Calibration curves and heatmaps summarize the edge. The trajectories show how that edge emerges in real time. Some categories separate early and cleanly. Others stay tangled for longer, which is exactly what later appears as higher residual MAD and weaker calibration.",
      ],
    },
    {
      heading: "Category-Specific Opportunities",
      paragraphs: [
        "Profitability is not uniform across domains. Entertainment and Earnings produce especially large NO-side returns, which is consistent with their low YES rates and relatively poor calibration. Politicians, by contrast, are better calibrated overall but still produce attractive YES-side opportunities at high thresholds simply because the category is so large and liquid. Sports occupies a middle ground: meaningful volume, decent calibration, and a smaller but still visible edge.",
        "That distinction matters if the goal is actual deployment rather than abstract measurement. A category with the largest statistical mispricing is not automatically the most attractive one if liquidity is thin, fills are hard, or the edge comes from a small handful of contracts. What matters is the combination of mispricing, scale, and execution quality.",
      ],
    },
    {
      heading: "Limitations",
      paragraphs: [
        "Several caveats apply to these findings:",
      ],
      bullets: [
        "In-sample only. The full dataset is used for both description and strategy evaluation, so the patterns may not persist out of sample.",
        "Correlated outcomes. Multiple contracts tied to the same event are not independent, so the effective sample size is smaller than the raw contract count suggests.",
        "Execution assumptions. The backtest assumes fills at the 2-hour VWAP, which is a retrospective benchmark rather than a guaranteed executable price.",
        "Market evolution. These markets are still relatively new, and calibration errors may continue to shrink as liquidity deepens and traders learn the format.",
        "Survivorship bias. Only resolved contracts with recorded trades are included; cancelled, delisted, or inactive markets are excluded.",
        "Maker advantage is not modeled. Kalshi charges zero fees for maker orders, so a more patient execution strategy could improve on the results shown here.",
      ],
    },
    {
      heading: "Conclusion",
      paragraphs: [
        "Kalshi's mention markets are not uniformly calibrated, and that variation is economically meaningful. The dominant pattern is longshot bias: low-probability contracts overstate the likelihood of a mention, which creates persistent value on the NO side. That bias survives even after accounting for Kalshi's taker fees, which conveniently fall near the probability extremes where the mispricing is largest.",
        "The cross-category comparison also reinforces a more general point about market design. Higher-volume categories such as Politicians tend to be better calibrated, which suggests that liquidity depth and participation matter for price quality. Smaller or more structurally ambiguous domains, such as Entertainment and Finance, show larger deviations from fair pricing.",
        "Whether these patterns represent durable alpha or mostly an artifact of in-sample measurement remains an open question. But the evidence here is clear enough on the descriptive side: mention markets converge, they converge at different speeds depending on category, and some parts of that convergence process still leave a tradable amount of error on the table.",
      ],
    },
  ],
  furtherReadings: ["longshot-bias-prediction-markets"],
}

export default article
