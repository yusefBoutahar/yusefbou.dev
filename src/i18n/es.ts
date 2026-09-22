import type { SiteContent } from './types';

/**
 * Diccionario del sitio en español.
 * Fuente única de todo el texto de la versión castellana: los componentes no
 * llevan cadenas literales.
 *
 * El token {{EXP}} se sustituye en tiempo de construcción por la antigüedad
 * profesional calculada desde agosto de 2022.
 */
export const es: SiteContent = {
  meta: {
    title: 'Yousuf Boutahar El Maachi — Ingeniero Fullstack Senior | IA',
    description:
      'Ingeniero fullstack senior de Python y TypeScript: backend, frontend, base de datos y despliegue, y microservicios de IA en producción. Remoto desde Canarias.',
    keywords:
      'Yousuf Boutahar El Maachi, Yousuf Boutahar, ingeniero fullstack senior, senior fullstack, desarrollador fullstack, ingeniero de producto, frontend senior, Python, TypeScript, React, Next.js, Astro, FastAPI, Django, PostgreSQL, LangGraph, MCP, Model Context Protocol, RAG, agentes de IA, pgvector, Kubernetes, Helm, Docker, Gran Canaria, remoto',
    ogTitle: 'Yousuf Boutahar El Maachi — Ingeniero Fullstack Senior',
    ogAlt:
      'Retrato de Yousuf Boutahar El Maachi junto a su titular, Ingeniero Fullstack Senior, y la dirección yusefbou.dev',
    localeTag: 'es_ES',
  },

  nav: {
    about: 'Perfil',
    experience: 'Experiencia',
    work: 'Trabajo',
    stack: 'Stack',
    teaching: 'Docencia',
    contact: 'Contacto',
    switchLang: 'EN',
    switchLangAria: 'EN: ver esta página en inglés',
    skipToContent: 'Saltar al contenido principal',
    menuLabel: 'Menú',
  },

  hero: {
    name: 'Yousuf Boutahar',
    role: 'Ingeniero Fullstack Senior — Product & Experience Engineer',
    tagline: 'Construyo el producto entero. Y lo despliego yo.',
    intro:
      'Llevo {{EXP}} escribiendo Python y TypeScript en producción: FastAPI y PostgreSQL detrás, Next.js delante, contenedores y despliegue al final. Los microservicios de IA que construyo y opero encima son la prueba de hasta dónde llega eso.',
    location: 'Gran Canaria, España. Remoto.',
    availability: 'Abierto a conversaciones sobre ingeniería fullstack senior, en remoto.',
    stats: [
      { value: '~4.800', label: 'commits desde agosto de 2022' },
      { value: '6.º de ~35', label: 'en un producto de 29.000 commits' },
      { value: '4', label: 'microservicios propios en producción' },
      { value: '{{EXP}}', label: 'de experiencia profesional' },
    ],
    ctaPrimary: 'Hablemos',
    ctaSecondary: 'Ver casos de estudio',
    photoAlt: 'Retrato de Yousuf Boutahar',
    scrollHint: 'Sigue bajando',
  },

  about: {
    title: 'Perfil',
    lead: 'Sé funcionar en las dos escalas: dentro de un producto grande con un equipo de treinta y cinco personas, y solo, del esquema de datos al despliegue, en un servicio entero.',
    paragraphs: [
      'Empecé en agosto de 2022 en una plataforma de formación y ventas con 29.000 commits y unos treinta y cinco autores. Allí acumulé 3.784 commits, pasé de frontend puro a dueño de dominios completos de backend en Django, y acabé dirigiendo la modernización de la interfaz: fuera la plantilla comercial, dentro una arquitectura propia, con estándares, guía de estilo y biblioteca de componentes. Ramas por incidencia, revisiones de código y pruebas compartidas: ese es el oficio de trabajar con más gente.',
      'Desde enero de 2026 hago lo contrario y me gusta igual. Soy autor único o principal de cuatro microservicios propios en producción —RAG sobre conversaciones de operaciones, capa de agentes, servicio de memoria y servidores MCP— más el frontend de la plataforma. Y despliego y opero un gestor de secretos autoalojado, que además puse bajo SSO obligatorio. Cada pieza lleva su modelo de datos, sus contenedores, su CI/CD, sus pruebas y su documentación; y las que van a Kubernetes, su chart de Helm escrito por mí, con el que las empaqueto y las despliego sobre el clúster de producción.',
      'Lo que más me interesa de la IA aplicada no es conectar un modelo, sino medir. Comparo arquitecturas sobre un benchmark común con verdad de referencia, vigilo el coste por operación con un límite duro, y documento la decisión para que se pueda revisar dentro de un año. La parte de producto viene de escribir requisitos y peticiones de cambio con clientes reales, y de casi dos años dando clase.',
    ],
    pillars: [
      {
        title: 'Producto grande, equipo grande',
        body: '3.784 commits y 4.399 ficheros de frontend tocados en un producto con 29.000 commits y unos 35 autores. Liderazgo técnico del frontend, estándares del equipo y revisiones de código sistemáticas.',
      },
      {
        title: 'Del esquema de datos al despliegue',
        body: 'Cuatro microservicios propios y el frontend principal en producción, con mi nombre en casi todos los commits: FastAPI, Next.js, PostgreSQL, Docker, GitHub Actions, pruebas, chart de Helm, observabilidad y documentación. Empaqueto y despliego mis servicios sobre el clúster con charts escritos por mí.',
      },
      {
        title: 'IA aplicada que se mide',
        body: 'RAG con búsqueda híbrida sobre pgvector, grafos de agentes con LangGraph, servidores MCP propios y evaluación con verdad de referencia, rúbrica de puntuación y control del coste por consulta.',
      },
      {
        title: 'Explicar y mentorizar',
        body: 'Casi dos años de talleres de programación y robótica en institutos, un curso de oposiciones y cursos técnicos internos. Se nota en las revisiones de código y en las decisiones que hay que defender ante quien no es técnico.',
      },
    ],
  },

  experience: {
    title: 'Experiencia',
    lead: '{{EXP}} de ingeniería desde agosto de 2022, sobre una etapa docente previa que además se solapa con el primer año.',
    presentLabel: 'Actualidad',
    jobs: [
      {
        role: 'Senior Product & Experience Engineer',
        company: 'SABAU STRAPPING',
        period: 'ene. 2026 — sept. 2026',
        location: 'Canarias, en remoto',
        summary:
          'Propiedad completa de servicios de producto y de IA, del modelo de datos al despliegue en Kubernetes, más el frontend de la plataforma. Ese es el título formal del puesto; el trabajo es fullstack de extremo a extremo, y así es como me presento.',
        bullets: [
          'Diseño y opero un servicio de RAG sobre las conversaciones de operaciones: contextos semánticos agrupados por tema en lugar de por tiempo, búsqueda híbrida de vectores y palabras clave sobre PostgreSQL con pgvector, y enrutado de la consulta según su amplitud.',
          'Construyo la capa de agentes con LangGraph y LangChain 1.0: cliente MCP multiservidor con carga tolerante a fallos, registro de herramientas acotado por ámbito, streaming de respuestas por SSE y trazabilidad con LangSmith.',
          'Levanté un servicio de memoria con tres almacenes especializados bajo un único gateway, con invalidación marcada por evidencia en lugar de sobrescritura, para poder reconstruir qué se sabía en cada momento.',
          'Escribo servidores MCP propios con FastMCP sobre HTTP transmisible: autenticación por clave de API, imagen de Docker, chart de Helm con volumen persistente e Ingress restringido por lista blanca de IPs, desplegados por mí sobre el clúster de producción.',
          'Mantengo el frontend en Next.js 16 y React 19 con internacionalización por etiquetas BCP 47 en nueve regiones, y pruebas en tres capas con Vitest, Testing Library y Cypress con cypress-axe.',
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
        role: 'Desarrollador fullstack, con liderazgo técnico del frontend',
        company: 'Talentus',
        period: 'ago. 2022 — ene. 2026',
        location: 'Gran Canaria, España',
        summary:
          'Plataforma de formación en línea, gestión comercial y justificación ante la administración pública: 3.784 commits míos, sexto contribuidor de unos treinta y cinco autores.',
        bullets: [
          'Dirigí la modernización integral de la interfaz: sustituí una plantilla comercial por una arquitectura propia, definí los estándares técnicos y la guía de estilo del equipo y creé una biblioteca de componentes reutilizables.',
          'Mentoricé a otros desarrolladores con revisiones de código sistemáticas y coordiné el trabajo entre frontend, backend y los stakeholders en ceremonias ágiles.',
          'Gestioné una migración de proveedor de infraestructura y la coordinación de varios proyectos de microservicios en paralelo.',
          'Tomé propiedad de dominios enteros en Django: campañas publicitarias, automatización de redes sociales, portal público con SEO técnico y capa de gráficas estadísticas. En 2025 pasé a integraciones, con un motor de flujos con autenticación entre servicios y reintentos.',
          'Optimicé consultas en producción con caminos rápido y lento e invalidación de caché, y trabajé sobre 205 ficheros de escenarios de Behave en un pipeline de GitLab CI con runners propios.',
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
        role: 'Personal docente, curso de oposiciones de informática',
        company: 'Flou',
        period: 'ago. 2022 — ene. 2023',
        location: 'Profesional independiente',
        summary:
          'Responsable del curso de preparación de oposiciones a técnico auxiliar de informática, en paralelo a mi primer año de desarrollo profesional.',
        bullets: [
          'Preparé y di el temario completo, con material propio y baterías de preguntas ajustadas al formato real del examen.',
          'Adapté el ritmo a un grupo con niveles de partida muy distintos, de gente sin base técnica a titulados.',
          'Hice seguimiento individual de los avances y reescribí las partes del temario donde el grupo fallaba de forma sistemática.',
        ],
        tags: ['Docencia', 'Diseño de temario', 'Evaluación', 'Sistemas y redes'],
      },
      {
        role: 'Coordinador e instructor de talleres de programación y robótica',
        company: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'mar. 2021 — ago. 2022',
        location: 'Las Palmas de Gran Canaria',
        summary:
          'Coordinación del programa de talleres y docencia directa a grupos de adolescentes, compaginado con el último tramo del grado.',
        bullets: [
          'Coordiné el calendario, los materiales y el equipo de instructores del programa de talleres.',
          'Di clase de programación y robótica a grupos de secundaria, con proyectos que se terminan y se enseñan el mismo día.',
          'Preparé el material didáctico y las prácticas, y las fui corrigiendo con lo que fallaba en el aula.',
        ],
        tags: ['Robótica educativa', 'Programación', 'Coordinación', 'Docencia'],
      },
      {
        role: 'Responsable de Ciberlandia, talleres en centros de secundaria',
        company: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'oct. 2020 — ago. 2022',
        location: 'Las Palmas de Gran Canaria',
        summary:
          'Programa de divulgación tecnológica llevado a los institutos, a jornada parcial durante casi dos años.',
        bullets: [
          'Llevé los talleres a los centros: montaje, sesión y recogida en una mañana, con el material que hubiera en cada aula.',
          'Expliqué conceptos de programación y robótica a grupos que partían de cero y en condiciones poco controladas.',
          'Fue el mejor entrenamiento posible para lo que hago ahora: contar algo técnico a quien no tiene por qué compartir el contexto.',
        ],
        tags: ['Divulgación', 'Talleres', 'Comunicación técnica'],
      },
    ],
  },

  work: {
    title: 'Casos de estudio',
    lead: 'Seis piezas que aguantan preguntas: por qué se decidió así, qué se descartó y cómo se midió.',
    confidentialityNote:
      'El trabajo de empresa se cuenta por competencias y decisiones de arquitectura. Sin nombres internos, sin clientes y sin cifras de negocio.',
    problemLabel: 'El problema',
    approachLabel: 'El enfoque',
    resultLabel: 'El resultado',
    caseStudies: [
      {
        id: 'capa-de-agentes',
        kicker: 'IA y agentes',
        title: 'Una capa de agentes completa, de cero a contenedor en un día',
        problem:
          'Los agentes necesitaban usar los sistemas de negocio como herramientas gobernadas, nunca con acceso directo a sus bases de datos. Hacía falta un servicio nuevo con autenticación, permisos por ámbito y streaming de respuestas, y hacía falta ya.',
        approach:
          'Lo ordené en siete pull requests numeradas: andamiaje del proyecto, configuración por entorno, autenticación, registro de herramientas acotado por ámbito, cliente MCP capaz de hablar con varios servidores a la vez con carga tolerante a fallos, streaming de respuestas por SSE y panel en React con Vite. Detrás, Nginx como proxy que guarda la clave de API en el servidor, pruebas, imagen de Docker, CI y documentación.',
        result:
          'El servicio quedó con el patrón entero puesto, no como un prototipo, y entró después en producción. Sobre esa base montamos un agente de resolución canónica de entidades con reglas de confianza y riesgo, que deriva a validación humana lo que no resuelve solo. La velocidad no vino de recortar: vino de tener el patrón de arquitectura interiorizado.',
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
          { value: '7', label: 'pull requests numeradas en una jornada' },
          { value: '1 día', label: 'del andamiaje al contenedor y la CI' },
        ],
      },
      {
        id: 'sso-oidc',
        kicker: 'Seguridad aplicada',
        title: 'Inicio de sesión federado con OIDC, cerrado en una jornada',
        problem:
          'Un gestor de secretos autoalojado tenía que entrar bajo inicio de sesión único obligatorio, sin puerta trasera de usuario y contraseña. La autenticación es lo último que se puede dejar a medias.',
        approach:
          'Cliente OIDC con validación de firmas contra JWKS, endpoints de entrada y de retorno con registro de auditoría, y migración de esquema para los usuarios existentes. Añadí dos cosas que casi nadie hace: un modelo de amenazas escrito antes de tocar código y un test automatizado del ataque de confusión de algoritmo. Para no depender del proveedor real en local, monté un proveedor de identidad simulado y probé el flujo de extremo a extremo.',
        result:
          'Inicio de sesión único obligatorio en producción, con Prometheus y Grafana vigilando el servicio, scripts de copia de seguridad, restauración y diagnóstico pasados por ShellCheck, y TruffleHog en el pipeline para que no se cuele un secreto en un commit.',
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
          { value: '1 día', label: 'del modelo de amenazas al flujo en producción' },
          { value: 'alg=none', label: 'confusión de algoritmo cubierta por test automático' },
        ],
      },
      {
        id: 'memoria-agentes',
        kicker: 'Evaluación con datos',
        title: 'Tres arquitecturas de memoria para agentes, medidas antes de elegir',
        problem:
          'Los agentes necesitaban una memoria que no inventara y que se pudiera auditar. El mercado ofrece alternativas gestionadas de los tres proveedores grandes, y elegir por intuición se paga cada mes en la factura y cada semana en respuestas mal fundadas.',
        approach:
          'Monté un benchmark común con verdad de referencia, esquema de salida esperada y rúbrica de puntuación, más un guardián de coste en tiempo real con límite duro para que ninguna evaluación se desbocara. Sobre esa base diseñé tres almacenes especializados bajo un único gateway que enruta al escribir e integra al leer: Neo4j 5 con Graphiti para relaciones con validez temporal, Mem0 para memoria de experiencias y PostgreSQL con pgvector para hechos canónicos. Los hechos se invalidan con marca de evidencia, nunca se sobrescriben.',
        result:
          'La decisión quedó documentada con precisión y coste por operación de cada opción, no con una opinión. El servicio está en producción, instrumentado con OpenTelemetry, y su panel dibuja los grafos de memoria con @xyflow/react y dagre para que la auditoría sea visual y no una consulta a mano.',
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
          { value: '3', label: 'arquitecturas comparadas sobre el mismo benchmark' },
          { value: 'Límite duro', label: 'guardián de coste por evaluación en tiempo real' },
        ],
      },
      {
        id: 'n8n-autoalojado',
        kicker: 'Backend y operación',
        title: 'n8n autoalojado en modo cola, entregado con manual de emergencias',
        problem:
          'Había que automatizar procesos de negocio sin depender de la versión gestionada de n8n y sin que los datos salieran de la infraestructura propia. Y un servicio así no vale nada si, cuando falla de madrugada, nadie sabe levantarlo.',
        approach:
          'Lo levanté con Docker Compose: n8n en modo cola, PostgreSQL 15 como base de datos de estado, Redis 7 como cola de trabajos, y healthchecks y límites de CPU y memoria por contenedor para que un flujo desbocado no se lleve por delante al resto. La integración con el backend de la plataforma va por autenticación de token entre servicios con reintentos. Y escribí en Bash lo que hace falta cuando el servicio ya está vivo: copia de seguridad, restauración, monitor de estado, prueba de esfuerzo y escalado manual.',
        result:
          'Se entregó con dieciséis documentos de operación —arquitectura de alta disponibilidad, manual de emergencias, guía de operaciones, estrategia de copias, alertas y verificación de producción— y con las credenciales incrustadas retiradas del repositorio. Automatizar es la mitad fácil: lo que se entrega es un servicio que otra persona puede operar sin llamarme.',
        tech: [
          'n8n autoalojado',
          'Docker Compose',
          'PostgreSQL 15',
          'Redis 7',
          'Bash',
          'Healthchecks y límites de recursos',
          'Autenticación de token entre servicios',
        ],
        metrics: [
          { value: '16', label: 'documentos de operación entregados con el servicio' },
          { value: '14', label: 'scripts de copia, restauración, monitor y prueba de esfuerzo' },
        ],
      },
      {
        id: 'rendimiento-imagenes',
        kicker: 'Rendimiento web',
        title: 'De 46 MB a 4 MB de imágenes en un sitio en producción',
        problem:
          'Un restaurante con carta y galería fotográfica servía 46 MB de imágenes. En un móvil con datos, en la puerta del local y decidiendo dónde comer, eso no es una web lenta: es una web que no existe.',
        approach:
          'Procesado masivo con Pillow desde Python, WebP con fallback JPEG en un elemento picture con srcset, y preload con fetchpriority alto del elemento LCP. CSS crítico en línea en el head para pintar el primer bloque antes de que llegue el bundle, y un sistema de esqueletos de carga que detecta si el contenedor lleva imagen, vídeo o iframe y aplica la estrategia adecuada a cada uno, con fallback en CSS puro por si falla el script.',
        result:
          '46 MB de imágenes convertidos en 4 MB, con reducciones individuales de hasta el 98,4 %. El mismo trabajo dejó la carta bilingüe entera, 124 platos, servida desde un fichero de datos y con conmutación de idioma sin recarga.',
        tech: ['Astro', 'Tailwind CSS 4', 'astro:assets', 'Pillow', 'WebP', 'Cloudflare Pages'],
        metrics: [
          { value: '46 MB → 4 MB', label: 'peso total de las imágenes del sitio' },
          { value: '98,4 %', label: 'reducción máxima en una sola imagen' },
        ],
      },
      {
        id: 'analitica-hexagonal',
        kicker: 'Arquitectura',
        title: 'Analítica hexagonal: retirar al proveedor sin tocar el dominio',
        problem:
          'La analítica del frontend principal estaba atada a un proveedor externo. Cualquier cambio de proveedor, o cualquier caída suya, se metía dentro del código de producto, que es donde nunca debe entrar una dependencia de terceros.',
        approach:
          'Arquitectura hexagonal, con la disciplina completa: una interfaz de repositorio que define lo que el dominio necesita, un gestor de almacenamiento detrás, y una capa de transporte con circuit breaker y reintentos para que un proveedor caído no arrastre a la interfaz ni pierda eventos. El dominio no sabe quién está al otro lado.',
        result:
          'Cuando se decidió retirar al proveedor externo, se retiró: se sustituyó el adaptador y el dominio no se tocó. Ese es exactamente el argumento de puertos y adaptadores, y quedó demostrado en producción en lugar de en una pizarra.',
        tech: ['TypeScript 5.9', 'Next.js 16', 'React 19', 'Arquitectura hexagonal', 'Vitest'],
        metrics: [
          { value: '0', label: 'cambios en el dominio al retirar el proveedor' },
          { value: '9', label: 'regiones servidas con etiquetas BCP 47, una de ellas RTL' },
        ],
      },
    ],
    sitesTitle: 'Sitios propios en producción',
    sitesLead:
      'Tres negocios reales de Gran Canaria, de la toma de datos al dominio en producción. Los tres migraron de Netlify a Cloudflare Pages el mismo día.',
    visitLabel: 'Visitar el sitio',
    sites: [
      {
        name: 'Qahwa',
        url: 'https://qahwa.es',
        description:
          'Cafetería en Gran Canaria. Carta consultable sin descargar un documento, con setenta productos servidos desde datos y captación por búsqueda local.',
        tech: ['Astro', 'Tailwind CSS 4', '@astrojs/sitemap', 'Anime.js 4', 'Cloudflare Pages'],
        metrics: [
          { value: '70', label: 'productos de carta servidos desde datos, no desde un PDF' },
          { value: 'Schema.org', label: 'datos estructurados con horarios, coordenadas y valoraciones' },
        ],
        shot: 'qahwa',
        shotAlt: 'Página de inicio de qahwa.es con la carta de la cafetería',
      },
      {
        name: 'Tacos Francos',
        url: 'https://tacosfrancos.es',
        description:
          'Restaurante de tacos. Galería con lightbox accesible escrito a mano, esqueletos de carga por tipo de contenido y CSP afinada a mano.',
        tech: ['Astro 6', 'Tailwind CSS 4', 'Anime.js 4', 'astro:assets', 'Cloudflare Pages'],
        metrics: [
          {
            value: 'Lightbox propio',
            label: 'con role="dialog", gestión de foco y navegación por teclado, más 65 atributos ARIA en el marcado',
          },
          { value: 'CSP propia', label: 'sin scripts en línea, ajustada proyecto a proyecto' },
        ],
        shot: 'tacosfrancos',
        shotAlt: 'Página de inicio de tacosfrancos.es con la galería del restaurante',
      },
      {
        name: 'Varadero de Mogán',
        url: 'https://varaderodemogan.es',
        description:
          'Restaurante de marisco, bilingüe. Ciento veinticuatro platos traducidos en un fichero de datos, con conmutación de idioma sin recarga y persistencia local.',
        tech: ['Astro 6', 'Tailwind CSS 4', 'i18n propia', 'Pillow', 'WebP', 'Cloudflare Pages'],
        metrics: [
          { value: '46 MB → 4 MB', label: 'peso de imágenes tras el reprocesado masivo' },
          { value: '124', label: 'platos mantenidos en dos idiomas' },
        ],
        shot: 'varaderodemogan',
        shotAlt: 'Página de inicio de varaderodemogan.es con la carta del restaurante',
      },
    ],
  },

  stack: {
    title: 'Stack',
    lead: 'El inventario, agrupado por dominio y con versión donde la versión importa.',
    groups: [
      {
        name: 'Lenguajes',
        items: ['Python 3.12', 'TypeScript 5.9', 'JavaScript ES2020+', 'SQL', 'Bash', 'HTML5 semántico', 'CSS moderno'],
      },
      {
        name: 'Frontend',
        items: [
          'React 19 y 17',
          'Next.js 16',
          'Astro 6',
          'Tailwind CSS 4',
          'Radix UI',
          'Vite 7',
          'Three.js con React Three Fiber',
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
          'SQLAlchemy 2 asíncrono',
          'Alembic',
          'Pydantic v2',
          'asyncpg',
        ],
      },
      {
        name: 'IA y agentes',
        items: [
          'LangGraph 1.0',
          'LangChain 1.0',
          'MCP (Model Context Protocol), servidor y cliente',
          'FastMCP',
          'langchain-mcp-adapters',
          'LangSmith',
          'OpenAI API',
          'RAG con búsqueda híbrida',
          'embeddings',
          'Graphiti',
          'Mem0',
          'spaCy',
          'scikit-learn',
        ],
      },
      {
        name: 'Datos y mensajería',
        items: [
          'PostgreSQL 16',
          'pgvector',
          'Neo4j 5 con grafo bitemporal',
          'Redis 7',
          'MySQL y MariaDB',
          'MongoDB',
          'NATS como bus de eventos',
          'colas sobre Redis',
        ],
      },
      {
        name: 'Contenedores y orquestación',
        items: [
          'Docker',
          'Docker Compose multientorno',
          'Kubernetes',
          'Helm 3',
          'Traefik como Ingress Controller',
          'cert-manager con Let’s Encrypt',
          'almacenamiento NFS',
        ],
      },
      {
        name: 'Plataforma y automatización',
        items: [
          'Linux (Rocky y Debian)',
          'Nginx como proxy inverso con TLS',
          'certbot',
          'systemd',
          'cortafuegos y acceso remoto seguro',
          'n8n autoalojado en modo cola',
        ],
      },
      {
        name: 'Observabilidad',
        items: ['Prometheus', 'Grafana con paneles y alertas', 'structlog', 'OpenTelemetry'],
      },
      {
        name: 'Seguridad',
        items: [
          'OIDC y OAuth2 con validación JWKS',
          'JWT entre servicios',
          'Vaultwarden autoalojado',
          'Content Security Policy',
          'TruffleHog en el pipeline (CI)',
        ],
      },
      {
        name: 'CI/CD y despliegue',
        items: [
          'GitHub Actions',
          'GitLab CI',
          'GitHub Container Registry',
          'publicación por etiqueta de versión',
          'Cloudflare Pages con cabeceras y redirecciones declarativas',
        ],
      },
      {
        name: 'Calidad y pruebas',
        items: [
          'pytest con soporte asíncrono y paralelo',
          'Vitest',
          'Jest',
          'Cypress con cypress-axe',
          'Behave (Gherkin)',
          'mypy en modo estricto',
          'Ruff',
          'ESLint',
          'Prettier',
          'ShellCheck',
        ],
      },
      {
        name: 'Móvil (proyecto de aprendizaje)',
        items: ['React Native 0.74', 'Expo SDK 51', 'Expo Router', 'NativeWind', 'Jest 30 con jest-expo'],
      },
      {
        name: 'Herramientas',
        items: ['uv', 'pnpm', 'npm', 'Git', 'GitHub CLI', 'Playwright'],
      },
    ],
    note: 'En esta lista solo hay tecnología con commits míos detrás. Por eso no verás Terraform, ni nube pública, ni lenguajes que no escribo: una lista corta y verdadera responde mejor en una entrevista técnica que una larga. El bloque de móvil es un proyecto de aprendizaje, y lo dejo aquí por lo que vino después: volví dos años más tarde, documenté que la cobertura era cero y lo cerré con 45 pruebas en siete grupos.',
  },

  teaching: {
    title: 'Docencia y divulgación',
    lead: 'Casi dos años dando clase antes de dedicarme a esto a tiempo completo, y un curso más ya solapado con el primer año de desarrollo. La costumbre no se me ha quitado.',
    paragraphs: [
      'Di talleres de programación y robótica en institutos de Gran Canaria durante casi dos años, coordiné el programa y su equipo de instructores, y llevé un curso de preparación de oposiciones a técnico auxiliar de informática. Después, ya dentro de una empresa de producto, di cursos técnicos de desarrollo web y me certifiqué en formación de formadores y como técnico de e-learning.',
      'Lo pongo aquí porque es una competencia de ingeniería senior, no un adorno biográfico. Explicar recursividad a un grupo de dieciséis años, sin perder a nadie y con el tiempo justo, entrena exactamente lo mismo que defender una decisión de arquitectura ante quien paga el proyecto, escribir un documento de decisiones que alguien leerá dentro de un año o dejar una revisión de código que enseñe en lugar de corregir.',
    ],
    items: [
      {
        role: 'Coordinador e instructor de talleres de programación y robótica',
        org: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'mar. 2021 — ago. 2022',
        description:
          'Coordinación del calendario, los materiales y el equipo de instructores, y docencia directa a grupos de secundaria.',
      },
      {
        role: 'Responsable de Ciberlandia, talleres en centros de secundaria',
        org: 'Instituto Universitario de Ciencias y Tecnologías Cibernéticas',
        period: 'oct. 2020 — ago. 2022',
        description:
          'Programa de divulgación tecnológica impartido dentro de los institutos, a jornada parcial durante casi dos años.',
        videos: [
          {
            id: 'bqBcaGVYcR8',
            title: 'Reto Final Ciberlandia 21-22',
            caption:
              'El reto final de la edición 21-22, con el aula al completo: el formato de taller que coordiné durante casi dos años.',
            thumbAlt:
              'Aula llena de alumnos sentados en mesas frente a la pantalla del reto final de Ciberlandia 21-22, con los instructores al frente.',
          },
        ],
      },
      {
        role: 'Docente del curso de oposiciones de técnico auxiliar de informática',
        org: 'Flou',
        period: 'ago. 2022 — ene. 2023',
        description:
          'Temario completo, material propio y baterías de preguntas con el formato del examen real, con seguimiento individual del grupo.',
      },
      {
        role: 'Cursos técnicos de desarrollo web',
        org: 'Talentus',
        period: 'Durante la etapa en Talentus',
        description:
          'Formación técnica interna sobre desarrollo web, en paralelo a las revisiones de código y a los estándares del equipo de frontend.',
      },
      {
        role: 'Formación de formadores y técnico de e-learning',
        org: 'Titulación',
        period: '2023',
        description:
          'Metodología de formación de personas adultas y diseño de itinerarios en línea: el oficio de enseñar, puesto por escrito.',
      },
    ],
  },

  education: {
    title: 'Formación',
    items: [
      {
        title: 'Grado en Ingeniería Informática, especialidad en Ingeniería del Software',
        org: 'Universidad de Las Palmas de Gran Canaria',
        period: 'sept. 2016 — jun. 2022',
        detail:
          'Nota media de 8 sobre 10. Los dos últimos cursos, compaginados con los talleres de Ciberlandia en institutos.',
      },
      {
        title: 'Trabajo de fin de grado: sistema de posicionamiento en interiores (IPS)',
        org: 'Universidad de Las Palmas de Gran Canaria',
        period: '2022',
        detail:
          'Posicionamiento en interiores sobre una plataforma robótica, con Bluetooth de baja energía (BLE) para mejorar la precisión y la interactividad. Es el único proyecto de esta página que no es una aplicación web: hardware y señal, con un controlador que reparte el trabajo entre los módulos de BLE, mapa, orientación y meteorología. Lo dejo con los dos vídeos delante para que no haya que creerme.',
        videos: [
          {
            id: 'Ope39gOrI_s',
            title: 'Sistema de posicionamiento en interiores (IPS)',
            caption:
              'El trabajo de fin de grado en vídeo: posicionamiento en interiores con Bluetooth de baja energía, hardware y señal en lugar de otra aplicación web.',
            thumbAlt: 'El logotipo de Bluetooth junto a la etiqueta BLE.',
          },
          {
            id: 'gL_BtunaH-Y',
            title: 'Sistema de posicionamiento en interiores: el controlador',
            caption:
              'La parte del controlador, módulo a módulo: BLE, mapa, orientación y meteorología colgando de un mismo núcleo.',
            thumbAlt:
              'Diagrama del sistema: el controlador en el centro, unido a los módulos de BLE, Robomap, orientación y meteorología, y a la base de datos.',
          },
        ],
      },
      {
        title: 'Curso de desarrollo web fullstack, 280 horas',
        org: 'Escuela de Organización Industrial (EOI)',
        period: 'mar. — jun. 2022',
        detail: 'Programa intensivo de desarrollo web de extremo a extremo.',
      },
      {
        title: 'Curso de pruebas de software, 124 horas',
        org: 'Escuela de Organización Industrial (EOI)',
        period: 'jun. — jul. 2022',
        detail: 'Estrategia de pruebas, automatización y calidad: la base de las tres capas de pruebas que sigo escribiendo hoy.',
      },
      {
        title: 'Formación de formadores y técnico de e-learning',
        org: 'Titulación profesional',
        period: '2023',
        detail: 'Metodología didáctica para personas adultas y diseño de formación en línea.',
      },
    ],
  },

  contact: {
    title: 'Contacto',
    lead: 'Si estás valorando a alguien para ingeniería fullstack senior, producto o frontend senior, escríbeme y lo hablamos con datos delante.',
    email: 'yusef@yusefbou.dev',
    emailLabel: 'Escríbeme por correo',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    youtubeLabel: 'YouTube',
    note: 'Respondo a todo lo que llegue con un contexto mínimo: qué construís, con qué stack y qué esperáis de la persona. Español nativo, inglés avanzado en entorno técnico.',
  },

  footer: {
    builtWith: 'Hecho con Astro 6 y Tailwind CSS 4. Estático, sin rastreadores y desplegado en Cloudflare Pages.',
    rights: 'Yousuf Boutahar. Todos los derechos reservados.',
    sourceLabel: 'Código fuente en GitHub',
  },
};
