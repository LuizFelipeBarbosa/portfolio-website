# Portfolio Website

A clean, minimalist portfolio website for a UC Berkeley student studying Mathematics & Statistics and Media Studies.

## Features

- **Minimalist Design**: Clean, modern layout with a focus on typography and whitespace.
- **Responsive**: Adapts seamlessly to different screen sizes (desktop, tablet, mobile).
- **Single Page Application**: Smooth scrolling between sections without page reloads.
- **Tech Stack**:
  - **React**: UI library for building the interface.
  - **Next.js**: React framework for server-side rendering and routing.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Framer Motion**: Library for animations and transitions.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or yarn/pnpm)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The website will be available at `http://localhost:3000`.

### Build

Build the production version of the site:

```bash
npm run build
```

### Run

Start the production server:

```bash
npm run start
```

## Project Structure

```
portfolio-website/
├── app/                    # Next.js application pages
│   ├── layout.jsx          # Root layout with global styles and fonts
│   ├── page.jsx            # Home page (main entry point)
│   └── globals.css         # Global CSS styles
├── components/             # Reusable React components
│   ├── Navbar.jsx          # Navigation bar
│   ├── Hero.jsx            # Hero section
│   ├── About.jsx           # About section
│   ├── Experience.jsx      # Experience section
│   ├── Projects.jsx        # Projects section
│   ├── Contact.jsx         # Contact section
│   └── Footer.jsx          # Footer section
├── public/                 # Static assets
├── styles/                 # Additional styles (if any)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Customization

### Colors

The color scheme is defined in `app/globals.css`:

```css
@theme {
  --color-bg: #f8f8f8;
  --color-text: #111;
  --color-accent: #000;
  --color-border: #ddd;
}
```

You can customize these values to change the website's color scheme.

### Fonts

The website uses the "Inter" font from Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

To use a different font, update the `@import` URL and the `font-family` properties in `app/globals.css`.

### Content

Update the content in each component to reflect your personal information:

- `components/Hero.jsx`: Name, title, and introductory text.
- `components/About.jsx`: Personal bio and skills.
- `components/Experience.jsx`: Work experience and internships.
- `components/Projects.jsx`: Personal projects and case studies.
- `components/Contact.jsx`: Contact information and social links.

## Deployment

### Vercel

This project is optimized for deployment on Vercel:

1. Push your changes to GitHub.
2. Import the project into Vercel.
3. Vercel will automatically build and deploy your site.

### Other Platforms

You can also deploy to other platforms like Netlify, GitHub Pages, or AWS:

1. Build the project: `npm run build`
2. Deploy the contents of the `.next/static` and `.next/standalone` directories (or the entire `.next` directory if using `next export`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
