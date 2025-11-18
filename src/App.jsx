import React, { useState, useEffect } from "react";
import {
	Menu,
	X,
	GithubIcon,
	LinkedinIcon,
	MailIcon,
	ExternalLink,
} from "lucide-react";

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isNavVisible, setIsNavVisible] = useState(false);

	const workExperience = [
		{
			title: "Data Science Intern",
			company: "Industry Ventures, San Francisco, California",
			period: "June 2025 - Aug 2025",
			highlights: [
				"Used Latent Dirichlet Allocation (LDA) to evaluate past deal outcomes and predict which new deals would pass investment committee with high confidence.",
				"Applied machine learning to portfolio-company 10-Qs, 10-Ks, and transcripts to derive signals and generate leads.",
				"Created dashboards and visualizations using SQL and Notion to surface insights from new data sources.",
				"Updated private market dealflow processes in Notion to streamline sourcing and evaluation workflows.",
			],
			technologies: [
				"Python",
				"LDA",
				"SQL",
				"Dashboards",
				"Notion",
				"Machine Learning",
			],
		},
	];

	const leadershipExperience = [
		{
			title: "Board Member, Technology and Marketing",
			organization: "BRASA UC Berkeley",
			period: "August 2024 - Present",
			description:
				"Built and maintained the BRASA website to improve accessibility to club information while designing flyers and posters that increased attendance and engagement across campus.",
		},
		{
			title: "Founder and Director",
			organization: "Media and Cultural Studies Film Club",
			period: "January 2024 - June 2024",
			description:
				"Founded a film club exploring media and culture intersections, secured sponsorships, led marketing, and coordinated screenings that built a consistent community of attendees.",
		},
		{
			title: "Member",
			organization: "Leadership and Innovation Society",
			period: "October 2023 - June 2024",
			description:
				"Collaborated with peers on leadership development, communication, and innovation activities focused on creative problem-solving for social-impact challenges.",
		},
	];

	const scrollToSection = (e, sectionId) => {
		e.preventDefault();
		const element = document.getElementById(sectionId);
		if (element) {
			setIsMenuOpen(false);
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsNavVisible(scrollPosition > window.innerHeight * 0.8);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const projects = [
		{
			title: "AI-Powered Document Generation",
			period: "June 2024 - Present",
			description:
				"Developed an AI agent using LangChain to generate RFP and NDA drafts from PDF ingestions, reducing document turnaround time from 20 minutes to seconds with OCR, semantic search, and vector databases.",
			tags: ["LangChain", "LLM", "OCR", "Vector Database"],
			link: "#",
		},
		{
			title: "UC Riverside Media and Cultural Studies Department Videos",
			period: "June 2024 - September 2024",
			description:
				"Directed and produced 15+ marketing videos that improved departmental outreach by showcasing faculty, facilities, and program highlights across social media channels.",
			tags: ["Video Production", "Marketing", "Content Strategy"],
			link: "https://youtube.com/playlist?list=PLMyhLs26xcYtH4j5slpayi-c1_ws6yUeI&si=14V-4PhgKSfSDAvR",
		},
		{
			title: "BRASA UC Berkeley Website",
			period: "August 2024 - Present",
			description:
				"Built a responsive website to centralize resources for Brazilian students at Berkeley, applying modern UX patterns and React components to make club information accessible.",
			tags: ["React", "JavaScript", "UI/UX"],
			link: "https://brasa.studentorg.berkeley.edu/",
		},
		{
			title: "Immersive Cinema Experience",
			period: "December 2023 - February 2024",
			description:
				"Designed a film installation exploring vulnerability through editing, integrating EEG sensors with Arduino and TouchDesigner to translate brainwave data into synchronized visuals and audio.",
			tags: ["Installation", "Arduino", "TouchDesigner", "EEG"],
			link: "#",
		},
	];

	const skills = {
		technical: [
			"JavaScript",
			"Python",
			"React",
			"HTML",
			"CSS",
			"Adobe Suite",
			"Data Science (Pandas, sklearn)",
			"Figma",
		],
		languages: [
			"English and Portuguese (native)",
			"Spanish (conversational)",
		],
	};

	const honors = [
		"Dean's Honors List, UC Berkeley (2024-2025)",
		"Dean's Honors List, UC Riverside (2023-2024)",
		"United Kingdom Mathematics Trust Award Senior Gold (2021)",
		"United Kingdom Mathematics Trust Award Intermediate Bronze (2020-2019)",
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<nav
				className={`fixed w-full bg-white shadow transition-transform duration-300 z-50 ${
					isNavVisible ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<span className="text-xl font-bold">
								Luiz Felipe Barbosa
							</span>
						</div>

						{/* Mobile menu button */}
						<div className="flex items-center sm:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="text-gray-500 hover:text-gray-700 relative w-6 h-6"
								aria-label="Toggle Menu"
							>
								<div className="absolute inset-0 transform transition-transform duration-300 ease-in-out">
									<Menu
										size={24}
										className={`absolute transition-opacity duration-300 ${
											isMenuOpen
												? "opacity-0"
												: "opacity-100"
										}`}
									/>
									<X
										size={24}
										className={`absolute transition-opacity duration-300 ${
											isMenuOpen
												? "opacity-100 rotate-90"
												: "opacity-0 -rotate-90"
										} transform transition-transform duration-300`}
									/>
								</div>
							</button>
						</div>

						{/* Desktop menu */}
						<div className="hidden sm:flex sm:items-center sm:space-x-8">
							<a
								href="#about"
								onClick={(e) => scrollToSection(e, "about")}
								className="text-gray-700 hover:text-gray-900 cursor-pointer"
							>
								About
							</a>
							<a
								href="#experience"
								onClick={(e) =>
									scrollToSection(e, "experience")
								}
								className="text-gray-700 hover:text-gray-900 cursor-pointer"
							>
								Experience
							</a>
							<a
								href="#leadership"
								onClick={(e) =>
									scrollToSection(e, "leadership")
								}
								className="text-gray-700 hover:text-gray-900 cursor-pointer"
							>
								Leadership
							</a>
							<a
								href="#projects"
								onClick={(e) => scrollToSection(e, "projects")}
								className="text-gray-700 hover:text-gray-900 cursor-pointer"
							>
								Projects
							</a>
							<a
								href="#contact"
								onClick={(e) => scrollToSection(e, "contact")}
								className="text-gray-700 hover:text-gray-900 cursor-pointer"
							>
								Contact
							</a>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
						isMenuOpen ? "max-h-64" : "max-h-0"
					}`}
				>
					<div
						className={`transform transition-transform duration-300 ${
							isMenuOpen ? "translate-y-0" : "-translate-y-full"
						}`}
					>
						<div className="pt-2 pb-3 space-y-1 bg-white">
							<a
								href="#about"
								onClick={(e) => scrollToSection(e, "about")}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								About
							</a>
							<a
								href="#experience"
								onClick={(e) =>
									scrollToSection(e, "experience")
								}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								Experience
							</a>
							<a
								href="#leadership"
								onClick={(e) =>
									scrollToSection(e, "leadership")
								}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								Leadership
							</a>
							<a
								href="#projects"
								onClick={(e) => scrollToSection(e, "projects")}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								Projects
							</a>
							<a
								href="#contact"
								onClick={(e) => scrollToSection(e, "contact")}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gray-900 opacity-5"></div>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_80%)]"></div>
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center">
						<h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
							Luiz Felipe Barbosa
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
							Mathematics and Media Studies student at UC Berkeley
							focused on data science, machine learning, and media
							storytelling. I build tools and experiences that
							combine analytical rigor with creative direction.
						</p>
						<div className="flex justify-center space-x-4">
							<button
								onClick={(e) => scrollToSection(e, "projects")}
								className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
							>
								View Projects
							</button>
							<button
								onClick={(e) => scrollToSection(e, "contact")}
								className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-300"
							>
								Contact Me
							</button>
						</div>
					</div>
				</div>
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
					<button
						onClick={(e) => scrollToSection(e, "about")}
						className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
					>
						<div className="w-6 h-10 border-2 border-gray-600 rounded-full relative flex justify-center">
							<div className="w-1 h-2 bg-gray-600 rounded-full absolute top-2"></div>
						</div>
					</button>
				</div>
			</div>

			{/* About Section */}
			<section id="about" className="bg-white py-32">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
						About Me
					</h2>
					<div className="prose prose-lg text-gray-600">
						<p>
							I'm a Mathematics and Media Studies student at UC
							Berkeley (GPA 3.90) with a background in data
							science internships and creative media work. I
							thrive at the intersection of analytics and
							storytelling, building AI-assisted tools and
							immersive experiences.
						</p>
						<p className="mt-4">
							My toolkit includes JavaScript, Python, React, the
							Adobe Suite, and data science workflows in pandas
							and scikit-learn. I'm fluent in English and
							Portuguese with conversational Spanish skills.
						</p>
						<div className="mt-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-3">
								Education
							</h3>
							<ul className="space-y-2">
								<li>
									University of California, Berkeley — BA in
									Mathematics and Media Studies (GPA 3.90),
									expected December 2026
								</li>
								<li>
									University of California, Riverside — BA in
									Media and Cultural Studies and Data Science
									(GPA 3.92), September 2022 - June 2024
								</li>
								<li>
									St Paul's School, The British School of São
									Paulo — Bilingual IB Diploma (2022)
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Work Experience Section */}
			<section id="experience" className="py-32 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
						Work Experience
					</h2>
					<div className="space-y-12">
						{workExperience.map((job, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:-translate-y-1"
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
									<div>
										<h3 className="text-2xl font-semibold text-gray-900">
											{job.title}
										</h3>
										<p className="text-lg text-gray-600">
											{job.company}
										</p>
									</div>
									<span className="text-gray-500 mt-2 md:mt-0">
										{job.period}
									</span>
								</div>
								{job.highlights ? (
									<ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
										{job.highlights.map((item, idx) => (
											<li key={idx}>{item}</li>
										))}
									</ul>
								) : (
									<p className="text-gray-600 mb-4">
										{job.description}
									</p>
								)}
								<div className="flex flex-wrap gap-2">
									{job.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Leadership Experience Section */}
			<section id="leadership" className="py-32 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
						Leadership Experience
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{leadershipExperience.map((role, index) => (
							<div
								key={index}
								className="bg-gray-50 rounded-lg p-8 transition-transform duration-300 hover:-translate-y-1"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-semibold text-gray-900">
											{role.title}
										</h3>
										<p className="text-gray-600">
											{role.organization}
										</p>
									</div>
									<span className="text-gray-500 text-sm">
										{role.period}
									</span>
								</div>
								<p className="text-gray-600">
									{role.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section id="projects" className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Projects
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow"
							>
								<h3 className="text-xl font-semibold mb-2">
									{project.title}
								</h3>
								{project.period && (
									<p className="text-gray-500 text-sm mb-2">
										{project.period}
									</p>
								)}
								<p className="text-gray-600 mb-4">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tags.map((tag, tagIndex) => (
										<span
											key={tagIndex}
											className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
										>
											{tag}
										</span>
									))}
								</div>
								<a
									href={project.link}
									className="inline-flex items-center text-blue-600 hover:text-blue-800"
								>
									View Project{" "}
									<ExternalLink size={16} className="ml-1" />
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Skills and Honors Section */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								Skills & Languages
							</h2>
							<div className="space-y-4">
								<div>
									<h3 className="text-xl font-semibold text-gray-900">
										Technical
									</h3>
									<div className="flex flex-wrap gap-2 mt-2">
										{skills.technical.map(
											(skill, index) => (
												<span
													key={index}
													className="bg-white shadow px-3 py-1 rounded-full text-sm text-gray-800"
												>
													{skill}
												</span>
											)
										)}
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900">
										Languages
									</h3>
									<ul className="list-disc list-inside text-gray-700">
										{skills.languages.map(
											(language, index) => (
												<li key={index}>{language}</li>
											)
										)}
									</ul>
								</div>
							</div>
						</div>
						<div>
							<h2 className="text-3xl font-bold text-gray-900 mb-6">
								Honors & Awards
							</h2>
							<ul className="space-y-3 text-gray-700">
								{honors.map((honor, index) => (
									<li
										key={index}
										className="bg-white shadow rounded-lg px-4 py-3"
									>
										{honor}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="bg-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
						Get in Touch
					</h2>
					<div className="flex flex-col items-center space-y-6">
						<p className="text-gray-600 text-center max-w-2xl">
							Interested in working together? Reach out for
							collaborations in data science, media production, or
							creative technology.
						</p>
						<div className="flex space-x-8 items-center">
							<a
								href="https://github.com/LuizFelipeBarbosa"
								className="text-gray-600 hover:text-gray-900"
							>
								<GithubIcon size={24} />
							</a>
							<a
								href="https://www.linkedin.com/in/luiz-felipe-barbosa-5989a9294/"
								className="text-gray-600 hover:text-gray-900"
							>
								<LinkedinIcon size={24} />
							</a>
							<a
								href="mailto:lpbp1@icloud.com"
								className="text-gray-600 hover:text-gray-900"
							>
								<MailIcon size={24} />
							</a>
							<a
								href="tel:+13474494034"
								className="text-gray-600 hover:text-gray-900 font-medium"
							>
								+1 (347) 449-4034
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p>
						&copy; {new Date().getFullYear()} Luiz Felipe Barbosa.
						All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;
