import { wbeBenchTitle } from "./research-titles";

export type ProjectSection = {
  title: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
};

export type ProjectTheme =
  | "wastewater"
  | "civic"
  | "portfolio"
  | "biology"
  | "cs"
  | "nature"
  | "journal"
  | "timeline"
  | "citizen";

export type ProjectStatus = "Ongoing" | "Planned" | "Done";

export type ProjectEntry = {
  group: "Research" | "Software & community" | "Personal projects";
  outcome?: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  shortSummary: string;
  role: string;
  stack: string[];
  timeframe: string;
  status: ProjectStatus;
  tags: string[];
  theme: ProjectTheme;
  motifLabel: string;
  motifHint: string;
  media: ProjectMedia;
  notes: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export const projects: ProjectEntry[] = [
  {
    group: "Research",
    slug: "wbe-bench", title: wbeBenchTitle, category: "Independent research",
    shortSummary: "This study compares nine model configurations for predicting the following week's wastewater concentrations for five pathogens. Using public WastewaterSCAN records from 191 U.S. sites, the authors evaluated forecasts against the final 183 days of observations. Linear regression models had the lowest mean absolute error for three pathogens; neural models ranked first for the other two.",
    summary: "How well can a model forecast next week's wastewater measurements? I brought records from 191 U.S. sites into a common benchmark so that different forecasting approaches could be evaluated on the same task.",
    role: "First author", timeframe: "2026", status: "Done", stack: ["Forecast evaluation", "Longitudinal data analysis"],
    tags: ["research", "public health"], theme: "wastewater", motifLabel: "Forecasts", motifHint: "",
    media: { alt: "WBE-Bench project cover", label: "WBE-Bench" }, notes: [],
    sections: [{ title: "Paper and presentation", body: "My first-author IEEE BIBM 2026 short paper is published in IEEE Xplore. I was also accepted to present the work at the conference." }],
  },
  {
    group: "Research",
    slug: "lupus-nephritis", title: "Spatial Kinome Project", category: "Computational biology",
    shortSummary: "This Mohan Lab study examines where kinase genes are expressed in kidney tissue in lupus nephritis. An interactive viewer places candidate genes in their tissue context so researchers can compare expression across kidney cell types.",
    summary: "I mapped candidate kinase genes across kidney cell types in lupus nephritis.",
    role: "Student researcher", timeframe: "2026", status: "Ongoing", stack: ["R", "Spatial transcriptomics"],
    tags: ["research", "biology"], theme: "biology", motifLabel: "Kidney tissue", motifHint: "",
    media: { alt: "Kidney research project cover", label: "Spatial analysis" }, notes: [],
    sections: [{ title: "Spatial kinome", body: "I presented the viewer and spatial analysis at the lab's final summer internship presentation." }],
  },
  {
    group: "Research",
    slug: "urinary-biomarkers", title: "Urinary Biomarkers Project", category: "Computational biology",
    shortSummary: "This Mohan Lab study investigates which kidney cells may contribute to biomarker signals detected in urine in lupus nephritis. It compares the genes associated with those biomarkers across single-cell and spatial kidney datasets to identify plausible cellular sources.",
    summary: "I used kidney gene-expression data to investigate the cellular origins of urinary biomarkers.",
    role: "Student researcher", timeframe: "2026", status: "Ongoing", stack: ["R", "Single-cell analysis", "Spatial transcriptomics"],
    tags: ["research", "biology"], theme: "biology", motifLabel: "Urinary biomarkers", motifHint: "",
    media: { alt: "Urinary biomarker study cover", label: "Biomarker analysis" }, notes: [], sections: [],
  },
  {
    group: "Research",
    slug: "genelab-spaceflight", title: "Plant Stress Responses During Suborbital Spaceflight", category: "NASA GeneLab for High Schools",
    shortSummary: "This NASA GeneLab for High Schools capstone examines gene expression in Arabidopsis plants exposed to suborbital spaceflight. The four-member team analyzed NASA dataset OSDR-624 and used the observed patterns to propose a follow-up experiment on heat stress.",
    outcome: "GeneLab selected the team as one of three capstone finalists.",
    summary: "Using NASA's OSDR-624 dataset, our team examined how Arabidopsis responded to suborbital spaceflight. We used the data to develop a hypothesis about heat stress and propose a follow-up experiment.",
    role: "Student researcher on a four-person team", timeframe: "2026", status: "Ongoing", stack: ["RNA-seq analysis", "Experimental design"],
    tags: ["research", "biology"], theme: "nature", motifLabel: "Space biology", motifHint: "",
    media: { alt: "GeneLab capstone project cover", label: "GeneLab" }, notes: [],
    sections: [{ title: "Capstone and conference", body: "We were one of the top three GeneLab capstone finalist teams. ASGSR 2026 accepted our poster and abstract, and I'm scheduled to present the poster with full travel funding." }],
  },
  {
    group: "Research",
    slug: "tephi-wastewater-dashboard",
    title: "Wastewater Viral Surveillance Dashboard",
    category: "Computational Biology",
    summary:
      "Wastewater-based norovirus genomic surveillance project using multi-year data from 16 sites across Texas. The work tracks genotype dynamics, temporal patterns, and site-level variation to study viral transmission outside clinical testing.",
    shortSummary: "This R Shiny dashboard tracks changes in norovirus genotypes across Texas wastewater monitoring sites. Researchers can follow a genotype's relative abundance over time at one site or compare its trajectory across sites, revealing differences that a statewide trend can obscure.",
    role: "Developer + Data Analyst",
    stack: ["R", "R Markdown", "Shiny", "ggplot2", "dplyr"],
    timeframe: "2025-present",
    status: "Ongoing",
    tags: ["bio", "public health", "data", "dashboard", "academic"],
    theme: "wastewater",
    motifLabel: "Flow system",
    motifHint: "Use this page for pipeline, dashboard, and signal-tracking material.",
    media: {
      alt: "Wastewater surveillance dashboard preview",
      label: "Dashboard preview",
      hint:
        "Abundance trends, genotype breakdowns, or site-level dashboard views belong here.",
    },
    notes: [
      "Tracked genotype-level dynamics such as GII.4 to GII.17 shifts across multiple sites.",
      "Compared strain prevalence and turnover patterns across time and location.",
      "Built reproducible R workflows for longitudinal visualization and genomic surveillance analysis.",
    ],
    sections: [
      {
        title: "Context",
        body:
          "Wastewater surveillance offers a population-level view of viral transmission independent of clinical testing. This project analyzes multi-year wastewater data from 16 sites across Texas to investigate norovirus genotype dynamics and temporal trends.",
      },
      {
        title: "Data & Methods",
        body:
          "The analysis uses longitudinal viral abundance and genotype-level data across multiple cities and sites. Workflows in R, tidyverse, ggplot2, and R Markdown support time-series visualization, comparative strain tracking, and reproducible reporting through GitHub.",
      },
      {
        title: "Interpretation",
        body:
          "Observed shifts in dominant genotypes, recurring temporal patterns, and site-specific strain differences suggest that wastewater data can capture early signals of replacement dynamics and localized transmission. The results support integrating genomic wastewater surveillance into public health monitoring systems.",
      },
    ],
    links: [{ label: "Repo", href: "https://github.com/ezraweng21/TEPHI" }],
  },
  {
    group: "Software & community",
    slug: "municipal-operational-surveillance-dashboard",
    title: "Municipal Operational Surveillance Dashboard",
    category: "Civic Data",
    summary:
      "Datathon project built from raw public datasets through cleaning, transformation, and visualization. The dashboard models operational strain across city systems and turns public safety and service data into a more interpretable decision-support view.",
    shortSummary: "At the City of Sugar Land Datathon, my teammates and I used public safety and municipal service records to examine demand on city services. We cleaned the datasets, built an index of operational strain, and made it explorable in an R Shiny dashboard.",
    outcome: "Our team placed first out of 12.",
    role: "Developer",
    stack: ["Data pipelines", "Visualization", "Dashboard development"],
    timeframe: "2026",
    status: "Ongoing",
    tags: ["cs", "data", "dashboard", "community", "academic"],
    theme: "civic",
    motifLabel: "City grid",
    motifHint: "Use this page for system maps, index logic, and dashboard views.",
    media: {
      alt: "Municipal dashboard preview",
      label: "Project preview",
      hint:
        "Municipal dashboard views, urban strain index panels, or core charts belong here.",
    },
    notes: [
      "Won the City of Sugar Land Datathon.",
      "Built an end-to-end pipeline from raw public data to analysis-ready outputs.",
      "Developed a custom Urban Strain Index for operational stress.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This project was built around public municipal datasets and focused on converting raw operational data into a more useful analytical dashboard for decision-making.",
      },
      {
        title: "Build Notes",
        body:
          "The work involved cleaning, transformation, comparative analysis, and visualization, with a focus on building an interpretable system rather than a one-off chart set.",
      },
      {
        title: "Details",
        body:
          "The resulting dashboard and index aimed to surface system stress, allocation needs, and broader operational patterns across public-facing city functions.",
      },
    ],
    links: [
      { label: "Repo", href: "https://github.com/mat-the-doubleu/sugarlanddatathon" },
      { label: "Live", href: "https://matthewchen3241.shinyapps.io/dataday/" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/p/DV2K7NvDLHT/?img_index=4",
      },
      {
        label: "OpenGov Story",
        href: "https://stories.opengov.com/sugarlandtx/9bf97005-412b-41bb-9871-eb28358ff42b/published/x7vLNk2fE?currentPageId=69af3737535ff591a7c29977",
      },
    ],
  },
  {
    group: "Personal projects",
    slug: "portfolio-site",
    title: "Personal Portfolio Website",
    category: "Personal Site",
    summary:
      "Custom portfolio site built to hold projects, activities, and personal work without collapsing into a single landing page. The site uses reusable data structures, dynamic project pages, and a more editorial multi-page layout that can keep evolving over time.",
    shortSummary: "I built this site in Next.js and TypeScript to keep my research, software, and photography in one place. I separated the project records from the page layout so I can add a paper or demo without having to redesign the list.",
    role: "Frontend architecture + design",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    timeframe: "2026",
    status: "Ongoing",
    tags: ["personal", "cs", "design", "web", "portfolio"],
    theme: "portfolio",
    motifLabel: "Page structure",
    motifHint: "Use this page for layout decisions, system notes, and iterative design choices.",
    media: {
      alt: "Portfolio site preview",
      label: "Site preview",
      hint:
        "Homepage and project-page screenshots belong here.",
    },
    notes: [
      "Built with reusable project data and dynamic routes.",
      "Used as both a portfolio and a live design/system project.",
      "Structured to support future case studies, archives, and media-heavy pages.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This site is meant to function as a long-term personal and technical home on the web rather than a single landing page or resume clone.",
      },
      {
        title: "Build Notes",
        body:
          "The build emphasizes maintainable components, reusable data, project-specific page treatments, and incremental design changes instead of one-shot redesigns.",
      },
      {
        title: "Details",
        body:
          "The portfolio is also a record of design decisions, content structure, and how I want different kinds of work to be presented publicly.",
      },
    ],
    links: [
      { label: "Repo", href: "https://github.com/ezraweng21/ezraweng21.github.io" },
      { label: "Live", href: "https://ezraweng21.vercel.app/" },
    ],
  },
  {
    group: "Software & community",
    slug: "biology-club-site",
    title: "Clements Biology Club Website",
    category: "Organization Site",
    summary:
      "Multi-page club website built to support officers, events, resources, and member-facing logistics in one organized place. The project focuses on clearer structure and easier updates for a larger student organization.",
    shortSummary:
      "This organization site brings club logistics, events, officers, and member resources into one place.",
    role: "Lead Developer",
    stack: ["React", "Vite", "CSS"],
    timeframe: "2026",
    status: "Done",
    tags: ["bio", "web", "leadership", "community", "club"],
    theme: "biology",
    motifLabel: "Field notes",
    motifHint: "Use this page for content structure, club logistics, and teaching materials.",
    media: {
      alt: "Biology Club site preview",
      label: "Site preview",
      hint:
        "Homepage, events, or officers layouts belong here.",
    },
    notes: [
      "Designed to support 50-100+ students.",
      "Centralized events, officers, resources, and links.",
      "Built around maintainable updates instead of one-off page edits.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "The site was built to make club information easier to navigate and easier to maintain over time, especially as officers, resources, and programming shift year to year.",
      },
      {
        title: "Build Notes",
        body:
          "It includes pages for officers, events, resources, and logistics while keeping the overall structure readable for members rather than feeling like an internal document dump.",
      },
      {
        title: "Details",
        body:
          "More broadly, it became a test case for organization-facing web systems: practical, durable, and easy to hand off.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementsbiologyclub-website",
      },
      {
        label: "Live",
        href: "https://clementsbiologyclub.vercel.app/",
      },
    ],
  },
  {
    group: "Software & community",
    slug: "cs-club-site",
    title: "Clements Computer Science Club Website",
    category: "Organization Site",
    summary:
      "Computer Science Club site adapted from an existing club-site architecture and rebuilt around a more technical identity. The project focuses on reuse, maintainability, and cleaner organization for club programming and resources.",
    shortSummary:
      "This reusable club-site system was adapted for a technical student organization.",
    role: "Developer",
    stack: ["React", "Vite"],
    timeframe: "2026",
    status: "Done",
    tags: ["cs", "web", "leadership", "community", "club"],
    theme: "cs",
    motifLabel: "System grid",
    motifHint: "Use this page for architecture notes, reuse decisions, and implementation details.",
    media: {
      alt: "Computer Science Club site preview",
      label: "Site preview",
      hint:
        "Club homepage, events, or resources layouts belong here.",
    },
    notes: [
      "Adapted shared architecture instead of rebuilding from scratch.",
      "Changed branding and structure for a more technical audience.",
      "Focused on scalable maintenance across events, resources, and announcements.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This site reused an earlier organization-site system but reworked it for a different audience, visual language, and content structure.",
      },
      {
        title: "Build Notes",
        body:
          "A big part of the project was preserving what already worked structurally while rebuilding the content, framing, and visual identity around computer science club needs.",
      },
      {
        title: "Details",
        body:
          "It also helped test how reusable the broader club-site architecture really was when moved into a new context.",
      },
    ],
    links: [
      {
        label: "Repo",
        href: "https://github.com/ezraweng21/clementscsclub-website",
      },
      {
        label: "Live",
        href: "https://clementscsclub.vercel.app/",
      },
    ],
  },
  {
    group: "Software & community",
    slug: "careforbrains",
    title: "CareForBrains",
    category: "Nonprofit / Community",
    summary:
      "CareForBrains is a youth-led mental health nonprofit focused on education, advocacy, community, and access. I helped build its public website, chapter systems, outreach, blog, podcast, and broader operations.",
    shortSummary: "We use the CareForBrains website to connect students with local chapters and volunteer opportunities. We also publish our blog and podcast there, so someone who can't attend a chapter event can still take part in the conversation about mental health.",
    role: "Co-Founder & COO",
    stack: ["Nonprofit operations", "Website", "Blog", "Podcast", "Community growth"],
    timeframe: "May 2024-present",
    status: "Ongoing",
    tags: ["personal", "community", "service", "leadership", "media"],
    theme: "citizen",
    motifLabel: "Community network",
    motifHint:
      "Use this page for chapter growth, public-facing resources, blog and podcast work, and the larger CareForBrains system.",
    media: {
      alt: "CareForBrains site preview",
      label: "Organization preview",
      hint:
        "Homepage, chapters, volunteer, podcast, or blog visuals belong here.",
    },
    notes: [
      "The live site currently presents CareForBrains as a youth-led 501(c)(3) nonprofit focused on mental health awareness and support.",
      "The site currently lists 22 chapters across North America and 852 volunteers.",
      "Public-facing work spans chapters, volunteer programs, STEM exploration, blog posts, and podcast content.",
      "Good place to keep track of website work, organizational systems, and future content output.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "CareForBrains is framed publicly as a youth-led nonprofit building mental health awareness through accessible education, advocacy, community support, and broader resource access. This page can hold both the external-facing site and the work behind making that organization run.",
      },
      {
        title: "Public-Facing Work",
        body:
          "The site already includes chapters, volunteer programming, STEM exploration, blog posts, and a podcast page. That makes this a good place to track not only organizational growth but also the content systems that support it.",
      },
      {
        title: "Future Directions",
        body:
          "This project can eventually document website improvements, chapter/network growth, editorial output, podcast development, and the broader role of public communication inside nonprofit work.",
      },
    ],
    links: [
      { label: "Live", href: "https://www.careforbrains.org/" },
      {
        label: "Repo",
        href: "https://github.com/careforbrains-stack/careforbrains-website",
      },
      { label: "Podcast", href: "https://www.careforbrains.org/projects-6" },
      { label: "Blog", href: "https://www.careforbrains.org/blog" },
    ],
  },
  {
    group: "Personal projects",
    slug: "field-notes-photography-and-inaturalist",
    title: "Field Notes, Photography, and iNaturalist",
    category: "Nature Archive",
    summary:
      "This ongoing nature archive combines field notes, photography, citizen-science observations, and image-based documentation. It connects my photography with iNaturalist records and the details I notice outdoors.",
    shortSummary: "I keep my photographs and my iNaturalist observations together here because they record different parts of a field outing. The galleries are a place to look at the images themselves; the observation records document what I saw and how it was identified.",
    role: "Photography, documentation, and archive building",
    stack: ["Photography", "iNaturalist", "Gallery system"],
    timeframe: "Ongoing",
    status: "Ongoing",
    tags: ["personal", "nature", "photography", "citizen science", "hobbies"],
    theme: "nature",
    motifLabel: "Field journal",
    motifHint:
      "Use this page for observations, photo galleries, field notes, and future iNaturalist integration.",
    media: {
      alt: "Nature archive preview",
      label: "Gallery preview",
      hint:
        "Field photos, contact sheets, or observation grids belong here.",
    },
    notes: [
      "Supports public iNaturalist observations through the API.",
      "Includes separate local galleries for nature images and looser photography.",
      "Designed as an archive rather than a standard project case study.",
      "Possible visual directions: taxonomy trees, cladistic branching, or a Pokedex-like species system.",
      "Could connect more directly to love for citizen science, nature, and photography as one larger narrative.",
      "Potential future directions include awards, collaborations, and organizations tied to photography or environmental work.",
      "Also holding field-journal, daily-photo, and broader citizen-science directions for now so the project list stays tighter.",
    ],
    sections: [
      {
        title: "Overview",
        body:
          "This page is less about one final product and more about building a long-term archive for images, observations, field notes, and slower forms of attention. It should connect photography, citizen science, and the habit of keeping records of the natural world.",
      },
      {
        title: "System Ideas",
        body:
          "Possible directions include a taxonomy or cladistics-based interface, a more visual species browser, or a Pokedex-like archive with classifications, species notes, and statistics showing the kinds of organisms encountered over time such as birds, mammals, fish, or insects.",
      },
      {
        title: "Photography Layer",
        body:
          "The photography side should stay open-ended enough to hold organism images, field photos, and more personal material. This could eventually include more intentional photo projects, a stronger visual identity, recognition through awards such as Scholastic, or collaborations with organizations that bridge science and photography.",
      },
      {
        title: "Observation Layer",
        body:
          "The iNaturalist side can grow into something more than a feed: species descriptions, observation counts, classification views, maps, and richer archive browsing. It should feel like a place where observations become both images and usable records.",
      },
    ],
    links: [
      {
        label: "iNaturalist",
        href: "https://www.inaturalist.org/people/ezraweng21",
      },
    ],
  },
];

export const publicProjects = projects.filter((project) => project.status !== "Planned");

export function getProjectBySlug(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}

export const projectStatusOrder: ProjectStatus[] = ["Ongoing", "Planned", "Done"];

export const projectTagOrder = [
  "personal",
  "bio",
  "cs",
  "academic",
  "community",
  "hobbies",
  "dashboard",
  "web",
  "photography",
  "writing",
  "nature",
  "citizen science",
  "data",
  "design",
  "leadership",
  "research",
  "simulation",
  "planning",
  "reflection",
  "tracking",
  "tool",
  "growth",
  "media",
  "service",
  "cooking",
  "portfolio",
  "club",
  "public health",
] as const;
