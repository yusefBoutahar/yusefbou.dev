import type { SiteContent } from './types';

/**
 * English site dictionary.
 * Single source of every string in the English version: components carry no
 * literal copy of their own.
 *
 * The {{EXP}} token is replaced at build time with the professional experience
 * accumulated since August 2022.
 *
 * Register: British/international English with Oxford -ize spelling, valid in
 * the United States too. No regional colloquialisms.
 */
export const en: SiteContent = {
  meta: {
    title: 'Yousuf Boutahar El Maachi — Senior Fullstack Engineer, AI',
    description:
      'Senior full-stack engineer, Python and TypeScript: backend, frontend, database, deployment, and AI microservices in production. Remote from the Canary Islands.',
    keywords:
      'Yousuf Boutahar El Maachi, Yousuf Boutahar, senior fullstack engineer, senior full-stack engineer, full-stack developer, product engineer, senior frontend engineer, Python, TypeScript, React, Next.js, Astro, FastAPI, Django, PostgreSQL, LangGraph, MCP, Model Context Protocol, RAG, AI agents, pgvector, Kubernetes, Helm, Docker, Gran Canaria, remote',
    ogTitle: 'Yousuf Boutahar El Maachi — Senior Fullstack Engineer',
    ogAlt:
      'Portrait of Yousuf Boutahar El Maachi next to his headline, Senior Fullstack Engineer, and the URL yusefbou.dev',
    localeTag: 'en_GB',
  },

  nav: {
    about: 'About',
    experience: 'Experience',
    work: 'Work',
    stack: 'Stack',
    teaching: 'Teaching',
    contact: 'Contact',
    cv: 'CV',
    switchLang: 'ES',
    switchLangAria: 'ES: view this page in Spanish',
    skipToContent: 'Skip to main content',
    menuLabel: 'Menu',
  },

  hero: {
    name: 'Yousuf Boutahar',
    role: 'Senior Fullstack Engineer — Product & Experience Engineer',
    tagline: 'I build the whole product. And I ship it myself.',
    intro:
      'I have spent {{EXP}} writing Python and TypeScript in production: FastAPI and PostgreSQL at the back, Next.js at the front, containers and deployment at the end. The AI microservices I build and run on top are the proof of how far that goes.',
    location: 'Gran Canaria, Spain. Remote.',
    availability: 'Open to conversations about senior full-stack engineering roles, remote.',
    stats: [
      { value: '~4,800', label: 'commits since August 2022' },
      { value: '6th of ~35', label: 'on a 29,000-commit product' },
      { value: '4', label: 'microservices of my own in production' },
      { value: '{{EXP}}', label: 'of professional experience' },
    ],
    ctaPrimary: 'Let’s talk',
    ctaSecondary: 'View case studies',
    photoAlt: 'Portrait of Yousuf Boutahar',
    scrollHint: 'Keep scrolling',
  },

  about: {
    title: 'About',
    lead: 'I work at both scales: inside a large product with a team of thirty-five, and alone, from the data schema to deployment, owning an entire service.',
    paragraphs: [
      'I started in August 2022 on a training and sales platform with 29,000 commits and around thirty-five authors. I landed 3,784 commits there, moved from pure frontend to owning whole backend domains in Django, and ended up leading the modernization of the interface: out went the off-the-shelf template, in came an architecture we built ourselves, with standards, a style guide and a component library. Branch per issue, code review and shared tests: that is the craft of working alongside other people.',
      'Since January 2026 I have been doing the opposite, and I like it just as much. I am the sole or main author of four microservices of my own in production — RAG over our operations chat history, an agent layer, a memory service and MCP servers — plus the platform frontend. I also deploy and run a self-hosted secrets manager, which I put behind mandatory SSO. Every piece comes with its data model, its containers, its CI/CD, its tests and its documentation; and the ones that go to Kubernetes, a Helm chart I wrote myself, which is how I package and deploy them onto the production cluster.',
      'What interests me most about applied AI is not wiring up a model; it is measuring one. I compare architectures on a shared benchmark with ground truth, watch cost per operation against a hard limit, and write the decision down so it can be reviewed a year from now. The product side comes from writing requirements and change requests with real clients, and from nearly two years of teaching.',
    ],
    pillars: [
      {
        title: 'Large product, large team',
        body: '3,784 commits and 4,399 frontend files touched on a product with 29,000 commits and around 35 authors. Technical leadership of the frontend, team-wide standards and systematic code review.',
      },
      {
        title: 'From data schema to deployment',
        body: 'Four microservices of my own and the main frontend in production, with my name on almost every commit: FastAPI, Next.js, PostgreSQL, Docker, GitHub Actions, tests, Helm chart, observability and documentation. I package and deploy my services onto the cluster with charts I wrote myself.',
      },
      {
        title: 'Applied AI, measured',
        body: 'RAG with hybrid search over pgvector, agent graphs with LangGraph, my own MCP servers, and evaluation with ground truth, a scoring rubric and cost-per-query control.',
      },
      {
        title: 'Explaining and mentoring',
        body: 'Nearly two years of programming and robotics workshops in secondary schools, a civil service exam preparation course and internal technical courses. It shows in code review, and in the decisions you have to defend to people who are not engineers.',
      },
    ],
  },

  experience: {
    title: 'Experience',
    lead: '{{EXP}} of engineering since August 2022, on top of an earlier teaching stretch that also overlaps the first year.',
    presentLabel: 'Present',
    jobs: [
      {
        role: 'Senior Product & Experience Engineer',
        company: 'SABAU STRAPPING',
        period: 'Jan 2026 – Sep 2026',
        location: 'Canary Islands, remote',
        summary:
          'I own product and AI services end to end, from the data model through to deployment on Kubernetes, plus the platform frontend. That is the formal job title; the work itself is full-stack, end to end, and that is how I introduce myself.',
        bullets: [
          'I design and operate a RAG service over operational conversation history: semantic contexts grouped by topic rather than by time, hybrid vector and keyword search on PostgreSQL with pgvector, and query routing based on how broad the question is.',
          'I build the agent layer with LangGraph and LangChain 1.0: a multi-server MCP client that degrades gracefully when a server is unavailable, a scoped tool registry, response streaming over Server-Sent Events and tracing with LangSmith.',
          'I stood up a memory service with three specialized stores behind a single gateway, where facts are invalidated with an evidence stamp rather than overwritten, so we can reconstruct what was known at any point in time.',
          'I write my own MCP servers with FastMCP over streamable HTTP: API key authentication, Docker image, Helm chart with a persistent volume and ingress restricted by IP allowlist, all deployed by me onto the production cluster.',
          'I maintain the frontend in Next.js 16 and React 19 with internationalization by BCP 47 tags across nine regions, and tests in three layers with Vitest, Testing Library and Cypress with cypress-axe.',
        ],
        tags: [
          'Python 3.12',
          'FastAPI',
          'LangGraph 1.0',
          'MCP',
          'PostgreSQL + pgvector',
          'Neo4j',
          'NATS',
          'Next.js 16',
          'React 19',
          'Kubernetes',
          'Helm 3',
          'Docker',
        ],
      },
      {
        role: 'Full-Stack Developer, with technical leadership of the frontend',
        company: 'Talentus',
        period: 'Aug 2022 – Jan 2026',
        location: 'Gran Canaria, Spain',
        summary:
          'Online training, sales management and public funding compliance reporting platform: 3,784 commits, sixth contributor out of around thirty-five authors.',
        bullets: [
          'I led the end-to-end modernization of the interface: I replaced an off-the-shelf template with an architecture we built ourselves, defined the team’s technical standards and style guide, and built a library of reusable components.',
          'I mentored other developers through systematic code review and coordinated the work between the frontend and backend teams and the stakeholders in agile ceremonies.',
          'I ran an infrastructure provider migration and coordinated several microservice projects running in parallel.',
          'I took ownership of entire Django domains: advertising campaigns, social media automation, a public portal with technical SEO, and a statistics charting layer. In 2025 I moved to integrations, building a workflow engine with service-to-service authentication and retries.',
          'I optimized production queries with fast and slow paths and cache invalidation, and worked across 205 Behave scenario files on a GitLab CI pipeline with self-hosted runners.',
        ],
        tags: [
          'Django 4.2',
          'Django REST Framework',
          'Celery',
          'Django Channels',
          'PostgreSQL',
          'React 17',
          'TypeScript',
          'Material UI 5',
          'Redux',
          'Auth0',
          'Behave',
          'GitLab CI',
        ],
      },
      {
        role: 'Instructor, civil service IT technician exam preparation course',
        company: 'Flou',
        period: 'Aug 2022 – Jan 2023',
        location: 'Self-employed',
        summary:
          'I ran the preparation course for the civil service IT technician entrance exam, alongside my first year working as a professional developer.',
        bullets: [
          'I prepared and delivered the full syllabus, with my own materials and question banks matched to the real exam format.',
          'I adapted the pace to a group with very different starting points, from people with no technical background to graduates.',
          'I tracked progress student by student and rewrote the parts of the syllabus where the group consistently struggled.',
        ],
        tags: ['Teaching', 'Syllabus design', 'Assessment', 'Systems & networks'],
      },
      {
        role: 'Coordinator and instructor, programming and robotics workshops',
        company: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'Mar 2021 – Aug 2022',
        location: 'Las Palmas de Gran Canaria',
        summary:
          'I coordinated the workshop programme and taught teenage groups directly, alongside the final stretch of my degree.',
        bullets: [
          'I coordinated the calendar, the materials and the instructor team for the workshop programme.',
          'I taught programming and robotics to secondary school groups, with projects that get finished and shown on the same day.',
          'I wrote the teaching materials and the exercises, and kept revising them against whatever went wrong in the classroom.',
        ],
        tags: ['Educational robotics', 'Programming', 'Coordination', 'Teaching'],
      },
      {
        role: 'Ciberlandia programme lead — workshops in secondary schools',
        company: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'Oct 2020 – Aug 2022',
        location: 'Las Palmas de Gran Canaria',
        summary:
          'I took a technology outreach programme into secondary schools, part-time for nearly two years.',
        bullets: [
          'I took the workshops into the schools: setup, session and pack-up in a single morning, with whatever equipment each classroom had.',
          'I explained programming and robotics concepts to groups starting from zero, in conditions that were far from controlled.',
          'It was the best possible training for what I do now: explaining something technical to someone who has no reason to share the context.',
        ],
        tags: ['Outreach', 'Workshops', 'Technical communication'],
      },
    ],
  },

  work: {
    title: 'Case studies',
    lead: 'Six pieces that stand up to questions: why it was decided that way, what was ruled out, how it was measured.',
    confidentialityNote:
      'Company work is described through skills and architectural decisions. No internal names, no clients and no business figures.',
    problemLabel: 'The problem',
    approachLabel: 'The approach',
    resultLabel: 'The result',
    caseStudies: [
      {
        id: 'capa-de-agentes',
        kicker: 'AI and agents',
        title: 'A complete agent layer, from zero to a shipped container in a day',
        problem:
          'The agents had to use the business systems as tools behind a permission layer, never with direct access to their databases. That meant a new service with authentication, scoped permissions and streaming responses, and it meant now.',
        approach:
          'I broke it into seven numbered pull requests: project scaffolding, per-environment configuration, authentication, a scoped tool registry, an MCP client able to talk to several servers at once and degrade gracefully when one is unavailable, response streaming over Server-Sent Events, and a React dashboard with Vite. Behind it, Nginx as a proxy keeping the API key server-side, tests, a Docker image, continuous integration and documentation.',
        result:
          'The service was left with the whole pattern in place, not as a prototype, and went into production later. On that base we built a canonical entity resolution agent with confidence and risk rules, which escalates anything it cannot resolve on its own to human validation. The speed did not come from cutting corners: it came from having the architectural pattern internalized.',
        tech: [
          'Python 3.12',
          'FastAPI',
          'LangChain 1.0',
          'LangGraph',
          'langchain-mcp-adapters',
          'LangSmith',
          'SSE',
          'React',
          'Vite',
          'Docker',
        ],
        metrics: [
          { value: '7', label: 'numbered pull requests in a single day' },
          { value: '1 day', label: 'from scaffolding to container and CI' },
        ],
      },
      {
        id: 'sso-oidc',
        kicker: 'Applied security',
        title: 'Federated sign-in with OIDC, shipped in a single day',
        problem:
          'A self-hosted secrets manager had to go behind mandatory single sign-on, with no username-and-password back door. Authentication is the last thing you can afford to leave half-finished.',
        approach:
          'An OIDC client with signature validation against JWKS, entry and callback endpoints with an audit log, and a schema migration for existing users. I added two things almost nobody does: a threat model written before touching any code, and an automated test for the algorithm confusion attack. To avoid depending on the real provider locally, I set up a mock identity provider and exercised the flow end to end.',
        result:
          'Mandatory single sign-on in production, with Prometheus and Grafana watching the service, backup, restore and diagnostic scripts run through ShellCheck, and TruffleHog in the pipeline so no secret slips into a commit.',
        tech: [
          'OIDC',
          'OAuth2',
          'JWKS',
          'Vaultwarden',
          'PostgreSQL 16',
          'Nginx',
          'certbot',
          'Prometheus',
          'Grafana',
          'TruffleHog',
          'ShellCheck',
        ],
        metrics: [
          { value: '1 day', label: 'from threat model to flow in production' },
          { value: 'alg=none', label: 'algorithm confusion covered by an automated test' },
        ],
      },
      {
        id: 'memoria-agentes',
        kicker: 'Evaluation with data',
        title: 'Three agent memory architectures, measured before choosing',
        problem:
          'The agents needed a memory that does not invent things and can be audited. The market offers managed options from all the major vendors, and choosing on instinct costs you every month on the bill and every week in poorly grounded answers.',
        approach:
          'I built a shared benchmark with ground truth, an expected output schema and a scoring rubric, plus a real-time cost guard with a hard limit so no evaluation could run away. On that base I designed three specialized stores behind a single gateway that routes on write and merges on read: Neo4j 5 with Graphiti for relationships with temporal validity, Mem0 for experiential memory, and PostgreSQL with pgvector for canonical facts. Facts are invalidated with an evidence stamp, never overwritten.',
        result:
          'The decision was documented with the accuracy and the cost per operation of each option, not with an opinion. The service is in production, instrumented with OpenTelemetry, and its dashboard draws the memory graphs with @xyflow/react and dagre so auditing is visual rather than a hand-written query.',
        tech: [
          'Neo4j 5',
          'Graphiti',
          'Mem0',
          'PostgreSQL + pgvector',
          'FastAPI',
          'OpenTelemetry',
          'React',
          '@xyflow/react',
        ],
        metrics: [
          { value: '3', label: 'architectures compared on the same benchmark' },
          { value: 'Hard limit', label: 'real-time cost guard on every evaluation' },
        ],
      },
      {
        id: 'n8n-autoalojado',
        kicker: 'Backend and operations',
        title: 'Self-hosted n8n in queue mode, delivered with an emergency runbook',
        problem:
          'Business processes had to be automated without depending on the managed version of n8n and without the data leaving the organisation’s own infrastructure. And a service like that is worth nothing if nobody can bring it back up when it fails in the middle of the night.',
        approach:
          'I stood it up with Docker Compose: n8n in queue mode, PostgreSQL 15 as the state database, Redis 7 as the job queue, and health checks plus CPU and memory limits on every container so a runaway workflow cannot take the rest down with it. Integration with the platform backend runs over service-to-service token authentication with retries. And I wrote in Bash what you actually need once the service is alive: backup, restore, a health monitor, a stress test and manual scaling.',
        result:
          'It shipped with sixteen operations documents — high-availability architecture, emergency runbook, operations guide, backup strategy, alerting and production verification — and with the embedded credentials stripped out of the repository. Automating the work is the easy half: what gets handed over is a service somebody else can run without calling me.',
        tech: [
          'Self-hosted n8n',
          'Docker Compose',
          'PostgreSQL 15',
          'Redis 7',
          'Bash',
          'Health checks and resource limits',
          'Service-to-service token auth',
        ],
        metrics: [
          { value: '16', label: 'operations documents handed over with the service' },
          { value: '14', label: 'backup, restore, monitoring and stress-test scripts' },
        ],
      },
      {
        id: 'rendimiento-imagenes',
        kicker: 'Web performance',
        title: 'From 46 MB to 4 MB of images on a live site',
        problem:
          'A restaurant with a menu and a photo gallery was serving 46 MB of images. On a phone on mobile data, standing outside the door deciding where to eat, that is not a slow site: it is a site that does not exist.',
        approach:
          'Bulk processing with Pillow from Python, WebP with JPEG fallbacks via a picture element and responsive srcset, and a high-priority preload of the LCP image. Critical CSS inlined in the head so the first block paints before the bundle lands, and a loading skeleton system that detects whether the container holds an image, a video or an embedded frame and applies the right strategy to each, with a pure CSS fallback in case the script fails.',
        result:
          '46 MB of images turned into 4 MB, with individual reductions of up to 98.4%. The same work left the entire bilingual menu, 124 dishes, served from a single data file and switching language without a reload.',
        tech: ['Astro', 'Tailwind CSS 4', 'astro:assets', 'Pillow', 'WebP', 'Cloudflare Pages'],
        metrics: [
          { value: '46 MB → 4 MB', label: 'total weight of the site’s images' },
          { value: '98.4%', label: 'largest reduction on a single image' },
        ],
      },
      {
        id: 'analitica-hexagonal',
        kicker: 'Architecture',
        title: 'Hexagonal analytics: dropping the vendor without touching the domain',
        problem:
          'Analytics on the main frontend was tied to an external vendor. Any change of vendor, or any outage on their side, worked its way into the product code, which is exactly where a third-party dependency must never reach.',
        approach:
          'Hexagonal architecture, with the full discipline: a repository interface that defines what the domain needs, a storage manager behind it, and a transport layer with a circuit breaker and retry so a vendor outage can neither drag the interface down nor lose events. The domain has no idea who is on the other side.',
        result:
          'When the call came to drop the external vendor, it was dropped: the adapter was swapped and the domain was left untouched. That is precisely the ports and adapters argument, demonstrated in production instead of on a whiteboard.',
        tech: ['TypeScript 5.9', 'Next.js 16', 'React 19', 'Hexagonal architecture', 'Vitest'],
        metrics: [
          { value: '0', label: 'domain changes when the vendor was dropped' },
          { value: '9', label: 'regions served with BCP 47 tags, one of them RTL' },
        ],
      },
    ],
    sitesTitle: 'My own live sites',
    sitesLead:
      'Three real businesses in Gran Canaria, from gathering the content to the domain in production. All three moved from Netlify to Cloudflare Pages on the same day.',
    visitLabel: 'Visit the site',
    sites: [
      {
        name: 'Qahwa',
        url: 'https://qahwa.es',
        description:
          'Coffee shop in Gran Canaria. A menu you can read without downloading a document, with 70 items served from data and visibility in local search.',
        tech: ['Astro', 'Tailwind CSS 4', '@astrojs/sitemap', 'Anime.js 4', 'Cloudflare Pages'],
        metrics: [
          { value: '70', label: 'menu items served from data, not from a PDF' },
          { value: 'Schema.org', label: 'structured data with opening hours, coordinates and ratings' },
        ],
        shot: 'qahwa',
        shotAlt: 'Home page of qahwa.es showing the coffee shop menu',
      },
      {
        name: 'Tacos Francos',
        url: 'https://tacosfrancos.es',
        description:
          'Taco restaurant. Gallery with a hand-written accessible lightbox, loading skeletons by content type, and a Content Security Policy tuned by hand.',
        tech: ['Astro 6', 'Tailwind CSS 4', 'Anime.js 4', 'astro:assets', 'Cloudflare Pages'],
        metrics: [
          {
            value: 'Custom lightbox',
            label: 'with role="dialog", focus management and keyboard navigation, plus 65 ARIA attributes in the markup',
          },
          { value: 'Custom CSP', label: 'no inline scripts, tuned project by project' },
        ],
        shot: 'tacosfrancos',
        shotAlt: 'Home page of tacosfrancos.es showing the restaurant gallery',
      },
      {
        name: 'Varadero de Mogán',
        url: 'https://varaderodemogan.es',
        description:
          'Bilingual seafood restaurant. 124 dishes translated in a single data file, with no-reload language switching remembered in localStorage.',
        tech: ['Astro 6', 'Tailwind CSS 4', 'custom i18n', 'Pillow', 'WebP', 'Cloudflare Pages'],
        metrics: [
          { value: '46 MB → 4 MB', label: 'image weight after the bulk reprocessing' },
          { value: '124', label: 'dishes maintained in two languages' },
        ],
        shot: 'varaderodemogan',
        shotAlt: 'Home page of varaderodemogan.es showing the restaurant menu',
      },
    ],
  },

  stack: {
    title: 'Stack',
    lead: 'The inventory, grouped by domain, with versions where the version matters.',
    groups: [
      {
        name: 'Languages',
        items: ['Python 3.12', 'TypeScript 5.9', 'JavaScript ES2020+', 'SQL', 'Bash', 'Semantic HTML5', 'Modern CSS'],
      },
      {
        name: 'Frontend',
        items: [
          'React 19 and 17',
          'Next.js 16',
          'Astro 6',
          'Tailwind CSS 4',
          'Radix UI',
          'Vite 7',
          'Three.js with React Three Fiber',
          'Material UI 5',
          'Anime.js 4',
          'Zod',
          'React Hook Form',
          'TanStack Table',
        ],
      },
      {
        name: 'Backend',
        items: [
          'FastAPI',
          'Django 4.2',
          'Django REST Framework',
          'Celery',
          'Django Channels',
          'Uvicorn',
          'Gunicorn',
          'Async SQLAlchemy 2',
          'Alembic',
          'Pydantic v2',
          'asyncpg',
        ],
      },
      {
        name: 'AI and agents',
        items: [
          'LangGraph 1.0',
          'LangChain 1.0',
          'MCP (Model Context Protocol), server and client',
          'FastMCP',
          'langchain-mcp-adapters',
          'LangSmith',
          'OpenAI API',
          'RAG with hybrid search',
          'embeddings',
          'Graphiti',
          'Mem0',
          'spaCy',
          'scikit-learn',
        ],
      },
      {
        name: 'Data and messaging',
        items: [
          'PostgreSQL 16',
          'pgvector',
          'Neo4j 5 with a bitemporal graph',
          'Redis 7',
          'MySQL and MariaDB',
          'MongoDB',
          'NATS as an event bus',
          'Redis-backed queues',
        ],
      },
      {
        name: 'Containers and orchestration',
        items: [
          'Docker',
          'Multi-environment Docker Compose',
          'Kubernetes',
          'Helm 3',
          'Traefik as Ingress Controller',
          'cert-manager with Let’s Encrypt',
          'NFS storage',
        ],
      },
      {
        name: 'Platform and automation',
        items: [
          'Linux (Rocky and Debian)',
          'Nginx as a reverse proxy with TLS',
          'certbot',
          'systemd',
          'firewalls and secure remote access',
          'self-hosted n8n in queue mode',
        ],
      },
      {
        name: 'Observability',
        items: ['Prometheus', 'Grafana with dashboards and alerts', 'structlog', 'OpenTelemetry'],
      },
      {
        name: 'Security',
        items: [
          'OIDC and OAuth2 with JWKS validation',
          'Service-to-service JWT',
          'Self-hosted Vaultwarden',
          'Content Security Policy',
          'TruffleHog in the pipeline (CI)',
        ],
      },
      {
        name: 'CI/CD and deployment',
        items: [
          'GitHub Actions',
          'GitLab CI',
          'GitHub Container Registry',
          'release by version tag',
          'Cloudflare Pages with declarative headers and redirects',
        ],
      },
      {
        name: 'Quality and testing',
        items: [
          'pytest with async and parallel support',
          'Vitest',
          'Jest',
          'Cypress with cypress-axe',
          'Behave (Gherkin)',
          'mypy in strict mode',
          'Ruff',
          'ESLint',
          'Prettier',
          'ShellCheck',
        ],
      },
      {
        name: 'Mobile (learning project)',
        items: ['React Native 0.74', 'Expo SDK 51', 'Expo Router', 'NativeWind', 'Jest 30 with jest-expo'],
      },
      {
        name: 'Tooling',
        items: ['uv', 'pnpm', 'npm', 'Git', 'GitHub CLI', 'Playwright'],
      },
    ],
    note: 'Everything on this list has commits of mine behind it. That is why you will not find Terraform here, or public cloud, or languages I do not write: a short, true list answers a technical interview better than a long one. The mobile block is a learning project, and it stays here for what came next: I went back two years later, documented that coverage was zero and closed it out with 45 tests in seven suites.',
  },

  teaching: {
    title: 'Teaching and outreach',
    lead: 'Nearly two years of teaching before I did this full time, and one more course that already overlapped my first year of development. The habit never left me.',
    paragraphs: [
      'I ran programming and robotics workshops in secondary schools across Gran Canaria for nearly two years, coordinated the workshop programme and its team of instructors, and led a preparation course for the civil service IT technician entrance exam. Later, inside a product company, I taught internal technical courses on web development and qualified in train-the-trainer methodology and e-learning design.',
      'It goes here because it is a senior engineering skill, not biographical decoration. Explaining recursion to a group of sixteen-year-olds, without losing anyone and with the clock running, trains exactly the same muscle as defending an architectural decision to the person paying for the project, writing a decision record someone will read a year from now, or leaving a code review that teaches instead of correcting.',
    ],
    items: [
      {
        role: 'Coordinator and instructor, programming and robotics workshops',
        org: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'Mar 2021 – Aug 2022',
        description:
          'I coordinated the calendar, the materials and the instructor team, and taught secondary school groups directly.',
      },
      {
        role: 'Ciberlandia programme lead — workshops in secondary schools',
        org: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'Oct 2020 – Aug 2022',
        description:
          'I delivered a technology outreach programme inside secondary schools, part-time for nearly two years.',
        videos: [
          {
            id: 'bqBcaGVYcR8',
            title: 'Ciberlandia 21-22 final challenge',
            caption:
              'The final challenge of the 21-22 edition, with the room full: the workshop format I ran for nearly two years.',
            thumbAlt:
              'A room full of students seated at tables facing the Ciberlandia 21-22 final challenge screen, instructors at the front.',
          },
        ],
      },
      {
        role: 'Instructor, civil service IT technician exam preparation course',
        org: 'Flou',
        period: 'Aug 2022 – Jan 2023',
        description:
          'Full syllabus, my own materials and question banks in the real exam format, with individual follow-up across the group.',
      },
      {
        role: 'Technical courses on web development',
        org: 'Talentus',
        period: 'Throughout my time at Talentus',
        description:
          'Internal technical training on web development, alongside code review and the frontend team standards.',
      },
      {
        role: 'Train-the-trainer methodology and e-learning design',
        org: 'Professional qualification',
        period: '2023',
        description:
          'Adult training methodology and online learning path design: the craft of teaching, written down.',
      },
    ],
  },

  education: {
    title: 'Education',
    items: [
      {
        title: 'BSc in Computer Engineering — Software Engineering specialism',
        org: 'Universidad de Las Palmas de Gran Canaria (ULPGC)',
        period: 'Sep 2016 – Jun 2022',
        detail:
          'Final average: 8/10. I ran the Ciberlandia school workshops alongside the last two years of the degree.',
      },
      {
        title: 'Final year project: indoor positioning system (IPS)',
        org: 'Universidad de Las Palmas de Gran Canaria (ULPGC)',
        period: '2022',
        detail:
          'Indoor positioning on a robotics platform, using Bluetooth Low Energy (BLE) to improve accuracy and interactivity. It is the one project on this page that is not a web application: hardware and signal, with a controller splitting the work across BLE, mapping, orientation and weather modules. Both videos are here so you do not have to take my word for it.',
        videos: [
          {
            id: 'Ope39gOrI_s',
            title: 'Indoor positioning system (IPS)',
            caption:
              'The final year project on video: indoor positioning over Bluetooth Low Energy — hardware and signal rather than another web app.',
            thumbAlt: 'The Bluetooth logo next to a BLE tag.',
          },
          {
            id: 'gL_BtunaH-Y',
            title: 'Indoor positioning system: the controller',
            caption:
              'The controller side, module by module: BLE, mapping, orientation and weather hanging off a single core.',
            thumbAlt:
              'System diagram: the controller at the centre, wired to the BLE, Robomap, orientation and weather modules and to the database.',
          },
        ],
      },
      {
        title: 'Full-stack web development course, 280 hours',
        org: 'Escuela de Organización Industrial (EOI)',
        period: 'Mar – Jun 2022',
        detail: 'Intensive end-to-end web development course.',
      },
      {
        title: 'Software testing course, 124 hours',
        org: 'Escuela de Organización Industrial (EOI)',
        period: 'Jun – Jul 2022',
        detail: 'Test strategy, automation and quality: the foundation of the three testing layers I still write today.',
      },
      {
        title: 'Train-the-Trainer and E-Learning Design certification',
        org: 'Professional qualification',
        period: '2023',
        detail: 'Teaching methodology for adult learners and online training design.',
      },
    ],
  },

  contact: {
    title: 'Contact',
    lead: 'If you are hiring for a senior full-stack, product or frontend role, get in touch and we can talk it through with the data in front of us.',
    email: 'yusef@yusefbou.dev',
    emailLabel: 'Email me',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    youtubeLabel: 'YouTube',
    cvLabel: 'Download CV (PDF)',
    note: 'I reply to anything that comes with a bit of context: what you are building, on what stack, and what you expect from the person. Native Spanish, fluent professional English in technical settings.',
  },

  footer: {
    builtWith: 'Built with Astro 6 and Tailwind CSS 4. Static, no trackers, deployed on Cloudflare Pages.',
    rights: 'Yousuf Boutahar. All rights reserved.',
    sourceLabel: 'Source code on GitHub',
  },
};
