import adorno from "./adorno-culture-industry-youtube"
import mamdani from "./how-zohran-mamdani-won-new-york-city"
import burgerKing from "./burger-king-and-kid-bengala-controversy"
import rashomon from "./truth-in-frames-rashomon-vs-nationalism"
import bidenomics from "./middle-out-and-bottom-up-the-economic-policy-of-joe-biden"
import borges from "./time-choice-and-destiny"
import machineTranslation from "./analysis-of-machine-translation-algorithms"
import memorandum from "./memorandum-to-interest-groups"
import constitution from "./the-us-constitution-and-democracy"
import immigration from "./immigration-and-the-business-of-second-class-citizenship"
import federalist from "./federalist-no-70-and-immigration-reform"
import policing from "./the-george-floyd-justice-in-policing-act"
import fightclub from "./insomnia-through-the-lens-of-fight-club"
import stablecoin from "./stablecoin-infrastructure-landscape"
import figmaAI from "./can-ai-replace-designers"
import longshot from "./longshot-bias-prediction-markets"
import crossCategoryCalibration from "./cross-category-calibration-analysis"
import merda from "./my-favorite-artwork"

export const articles = [
  adorno,
  longshot,
  crossCategoryCalibration,
  figmaAI,
  merda,
  mamdani,
  burgerKing,
  memorandum,
  bidenomics,
  rashomon,
  borges,
  machineTranslation,
  constitution,
  immigration,
  federalist,
  policing,
  fightclub,
  stablecoin,
].sort((a, b) => b.date.localeCompare(a.date))

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug)
}

export function getReadTime(article) {
  if (!article.sections) return null
  const text = article.sections
    .flatMap((s) => [
      ...(s.paragraphs || []),
      ...(s.bullets || []),
      ...(s.paragraphsAfterImage || []),
    ])
    .join(" ")
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 230))
}

export function formatDate(dateStr) {
  if (!dateStr.includes("-")) return dateStr
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
