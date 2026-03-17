const professionalExperience = [
  {
    logo: "/logos/base_growth_logo.jpg",
    logoColor: "bg-[#7c756f]",
    role: "Analyst Intern",
    company: "Base Partners",
    location: "São Paulo, Brazil",
    startDate: "Jan 2026",
    endDate: "Jan 2026",
    length: "1 mo",
    description: [
      "Applied a hypothesis-driven, scientific-method approach to market research and financial analysis to evaluate current portfolio companies across fintech, SaaS, and consumer sectors.",
      "Led expert interviews and ran sentiment analysis on online reviews/forums/social data to assess product-market fit, consumer behavior, and competitive positioning, synthesizing findings into investment memos for partner review."
    ],
  },
  {
    logo: "/logos/industry_ventures_logo.jpg",
    logoColor: "bg-blue-600",
    role: "Data Science Intern",
    company: "Industry Ventures",
    location: "San Francisco, CA",
    startDate: "Jun 2025",
    endDate: "Aug 2025",
    length: "3 mos",
    description: [
      "Used Latent Dirichlet Allocation (LDA) for topic modeling on 150,000+ historical deal memos to identify recurring patterns behind failed investments; automated ingestion, modeling, and visualization pipeline",
      "Built semantic search system using Azure Cognitive Search, LangChain, and LangGraph to accurately find relevant information across thousands of internal VC documents",
      "Integrated Azure Document Intelligence for structured extraction of tables, financials, and text from PDFs and PowerPoint decks, feeding outputs into LLM-powered due diligence workflows"
    ],
  },
  {
    logo: "/logos/ghosts_of_adelanto.png",
    logoColor: "bg-black",
    role: "Associate Producer",
    company: "Ghosts of Adelanto (Documentary)",
    location: "Washington, D.C.",
    startDate: "Sept 2023",
    endDate: "Dec 2023",
    length: "4 mos",
    description: [
      "Organized and moderated a lobbying event that included a movie screening with 50+ University of California students, fostering dialogue and advocacy with Congressman Mark Takano.",
      "Designed graphics for marketing, captioned the movie, managed finances, and conducted due diligence, displaying organizational and creative skills."
    ],
  },
  {
    logo: "/logos/lojaswift_logo.jpg",
    logoColor: "bg-red-600",
    role: "Cashier & Clerk",
    company: "Swift",
    location: "São Paulo, Brazil",
    startDate: "Aug 2021",
    endDate: "Nov 2021",
    length: "4 mos",
    description: [
      "Assisted customers by understanding their needs and providing tailored information.",
      "Managed incoming phone calls professionally, addressing inquiries and providing information.",
      "Maintained an organized and efficient work environment merchandising and cleaning the store."
    ],
  },
]

const leadershipExperience = [
  {
    logo: "/logos/brasa_logo.jpg",
    logoColor: "bg-green-600",
    role: "Co-President & Head of Technology and Marketing",
    company: "BRASA UC Berkeley",
    location: "Berkeley, CA",
    startDate: "Aug 2024",
    endDate: "Present",
    length: "1 yr 8 mos",
    description: [
      "Lead strategy and operations for a 20-member Brazilian student organization, driving community growth and campus presence.",
      "Oversaw marketing, technology, and digital infrastructure, including launching and maintaining the club website and managing all event promotion channels.",
      "Planned and executed large-scale events with 100+ attendees, increasing visibility, engagement, and participation with the Brazilian community across campus."
    ],
  },
  {
    logo: "/logos/MCS_Logo.jpg",
    logoColor: "bg-blue-800",
    role: "Founder and President",
    company: "UCR Media and Cultural Film Club",
    location: "Riverside, CA",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    length: "4 mos",
    description: [
      "Secured sponsorships, led marketing efforts and held weekly screenings of global classic movies for students.",
      "Directed and produced 14 professional-grade faculty interview videos for the MCS department, translating professors’ research and departmental resources into engaging content that introduced prospective and current students to faculty work and campus opportunities."
    ],
  },
]

export default function Experience() {
  const ExperienceList = ({ items }) => (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.company + item.role} className="flex gap-4">
          <div className="shrink-0 mt-1">
            {item.logo ? (
              <img src={item.logo} alt={`${item.company} logo`} className="w-12 h-12 rounded object-cover bg-white" />
            ) : (
              <div className={`w-12 h-12 rounded flex items-center justify-center text-white font-bold text-xl ${item.logoColor || 'bg-gray-800'}`}>
                {item.company.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-[#111]">
              {item.role} &middot; {item.company}
            </h3>
            <p className="text-sm text-[#777] mb-2">
              {item.location} &middot; {item.startDate} &ndash; {item.endDate} &middot; {item.length}
            </p>

            <ul className="text-sm text-[#444] space-y-2">
              {item.description.map((desc, i) => (
                <li key={i} className="flex">
                  <span className="mr-2 mt-2 w-1 h-1 bg-[#444] rounded-full shrink-0"></span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section id="experience" className="mt-16 flex flex-col gap-12">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#999] mb-6">
          Professional Experience
        </p>
        <ExperienceList items={professionalExperience} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-[#999] mb-6">
          Leadership Experience
        </p>
        <ExperienceList items={leadershipExperience} />
      </div>
    </section>
  )
}
