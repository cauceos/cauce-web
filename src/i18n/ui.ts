export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    // Meta
    'meta.title': 'Cauce — Open infrastructure for AI agents',
    'meta.description':
      'European open source platform to build, deploy and scale robust AI agents. No vendor lock-in. Built on Spring Boot.',

    // Nav
    'nav.problem': 'The problem',
    'nav.whatIs': 'What is',
    'nav.stack': 'Stack',
    'nav.project': 'Project',
    'nav.cta': 'Join the waitlist',

    // Hero
    'hero.eyebrow': 'OPEN SOURCE · BUILDING IN PUBLIC',
    'hero.title.line1': 'The infrastructure',
    'hero.title.line2.pre': 'where your AI',
    'hero.title.line2.emphasis': 'flows',
    'hero.title.line3': 'through.',
    'hero.subtitle':
      'Cauce is the European open source platform to build, deploy and scale robust AI agents. No vendor lock-in. No vaporware. Built to last.',
    'hero.subtitle.bold': 'European open source platform',
    'hero.cta.primary': 'Join the waitlist →',
    'hero.cta.secondary': 'See the project',
    'hero.stat1.value': 'Spring Boot',
    'hero.stat1.label': 'Solid backend',
    'hero.stat2.value': 'Multi-tenant',
    'hero.stat2.label': 'From the first commit',
    'hero.stat3.value': 'Open source',
    'hero.stat3.label': 'No lock-in',

    // Problema
    'problem.eyebrow': 'WHY CAUCE EXISTS',
    'problem.title.line1': 'There is too much',
    'problem.title.emphasis': 'vaporware',
    'problem.title.line3': 'in AI.',

    'problem.pain1.title': 'Demos that never reach production',
    'problem.pain1.body':
      '80% of AI agent projects you see on LinkedIn are prototypes nobody uses in production. Code without tests, without multi-tenancy, without observability.',

    'problem.pain2.title': 'Vendor lock-in disguised as ease',
    'problem.pain2.body':
      'SaaS agent platforms charge you per message, tie you to their LLM, and pivot when it suits them. Your business cannot depend on that.',

    'problem.pain3.title': 'Integrations that do not scale',
    'problem.pain3.body':
      'WhatsApp on one side, Telegram on another, your own API in a third repo. Each channel with its own duplicated business logic. A maintenance nightmare.',

    'problem.pain4.title': 'No European reference infrastructure',
    'problem.pain4.body':
      'Everything serious comes from the US, with prices in dollars, servers in us-east-1, and no thought for GDPR. Europe needs its own infrastructure.',

    'problem.quote.part1':
      'Cauce exists because the industry has been optimising for the demo, not for production, for far too long.',
    'problem.quote.part2': 'It is time to build something that',
    'problem.quote.emphasis': 'actually holds up.',
    'problem.quote.author': '— CAUCE OS · CAUCE.DEV',

    // Qué es Cauce
    'whatIs.eyebrow': 'WHAT IS CAUCE',
    'whatIs.title.line1': 'Real infrastructure.',
    'whatIs.title.emphasis': 'No demos.',
    'whatIs.subtitle':
      'A modular platform that connects your channels, manages your agents memory, and exposes everything through an API. Built on Spring Boot, designed for consulting firms delivering real projects to real clients.',

    'whatIs.feature1.title': 'Multichannel from day one',
    'whatIs.feature1.body':
      'WhatsApp, Telegram, voice and web chat in a single runtime. No duplicated business logic. No maintaining four separate integrations. The cauce receives every flow.',

    'whatIs.feature2.title': 'Persistent memory and context',
    'whatIs.feature2.body':
      'Agents remember. Memory per conversation, per user, per tenant. Support for multiple swappable LLMs without touching the agent code.',

    'whatIs.feature3.title': 'Multi-tenant and observable',
    'whatIs.feature3.body':
      'Designed for a single instance to serve many clients. Metrics, traces and logs built in. Each tenant isolated from the architecture, not as an afterthought.',

    // Arquitectura
    'arch.eyebrow': 'TECHNICAL STACK',
    'arch.title.line1': 'Decisions made.',
    'arch.title.emphasis': 'No compromise.',
    'arch.layer.channels': 'CHANNELS',
    'arch.layer.runtime': 'RUNTIME',
    'arch.layer.platform': 'PLATFORM',
    'arch.layer.llm': 'LLM',
    'arch.layer.api': 'API',
    'arch.channels.voice': 'Voice',
    'arch.runtime.label': 'cauce-core · agent engine + orchestration',
    'arch.platform.memory': 'Memory',
    'arch.platform.evals': 'Evals',
    'arch.platform.observability': 'Observability',
    'arch.platform.multitenant': 'Multi-tenant',
    'arch.llm.more': '+ more',
    'arch.api.label': 'cauce-api · REST + webhooks + admin panel',
    'arch.stack.label': 'STACK',

    // Building in public
    'bip.eyebrow': 'BUILDING IN PUBLIC',
    'bip.title.line1': 'Built',
    'bip.title.emphasis': 'in the open.',

    'bip.manifesto1.bold': 'A single developer, from Spain.',
    'bip.manifesto1.rest':
      'No funding rounds, no 20-person team, no office in Madrid. Just consistent code and honest work.',

    'bip.manifesto2.bold': 'The whole process, in public.',
    'bip.manifesto2.rest':
      'Every technical decision, every mistake, every refactor. If something does not work, I say so. If something works well, also.',

    'bip.manifesto3.bold': 'The code is the documentation.',
    'bip.manifesto3.rest':
      'No empty marketing. If you want to know whether Cauce is serious, open the repo, read the code, draw your own conclusions.',

    'bip.manifesto4.bold': 'Europe needs its own infrastructure.',
    'bip.manifesto4.rest':
      'GDPR, EU-based servers, Spanish as a first-class language. We are not an American fork with a European flag.',

    'bip.cta': 'Follow the progress →',

    'bip.devlog4.meta': 'DEVLOG #4 · IN PROGRESS',
    'bip.devlog4.text': 'Working on first channel integration.',
    'bip.devlog4.highlight': 'Web Chat → cauce-core prototype.',
    'bip.devlog4.after': 'WhatsApp and memory layer next.',

    'bip.devlog3.meta': 'DEVLOG #3 · DECISION',
    'bip.devlog3.text': 'Decision:',
    'bip.devlog3.highlight': '10 modules in settings.gradle.kts.',
    'bip.devlog3.after':
      'Easier to split when it hurts than to unify when everything is already separate.',

    'bip.devlog1.meta': 'DEVLOG #1 · KICKOFF',
    'bip.devlog1.text':
      'This starts. Too many AI projects never reach production. Cauce is going to be different.',

    // Waitlist
    'waitlist.title.line1': 'Be the first to',
    'waitlist.title.line2.pre': 'try',
    'waitlist.title.emphasis': 'Cauce.',
    'waitlist.subtitle':
      'We are building in the open. When we ship the first public version, the list will get access first.',
    'waitlist.email.placeholder': 'you@email.com',
    'waitlist.submit': 'Sign me up →',
    'waitlist.success': 'Signed up. We will let you know when we open.',
    'waitlist.error': 'Something went wrong. Please try again.',
    'waitlist.note': 'No spam. Only when there is something worth it.',

    // Footer
    'footer.by': 'by Payoyo Dev',
    'footer.email': 'hola@cauce.dev',
    'footer.year': 'cauce.dev · 2026',
  },
  es: {
    // Meta
    'meta.title': 'Cauce — Infraestructura abierta para agentes de IA',
    'meta.description':
      'Plataforma open source europea para construir, desplegar y escalar agentes de IA robustos. Sin vendor lock-in. Construido sobre Spring Boot.',

    // Nav
    'nav.problem': 'El problema',
    'nav.whatIs': 'Qué es',
    'nav.stack': 'Stack',
    'nav.project': 'Proyecto',
    'nav.cta': 'Únete a la waitlist',

    // Hero
    'hero.eyebrow': 'OPEN SOURCE · BUILDING IN PUBLIC',
    'hero.title.line1': 'La infraestructura',
    'hero.title.line2.pre': 'por donde',
    'hero.title.line2.emphasis': 'fluye',
    'hero.title.line3': 'tu IA.',
    'hero.subtitle':
      'Cauce es la plataforma open source europea para construir, desplegar y escalar agentes de IA robustos. Sin vendor lock-in. Sin vende-humos. Hecho para durar.',
    'hero.subtitle.bold': 'open source europea',
    'hero.cta.primary': 'Únete a la waitlist →',
    'hero.cta.secondary': 'Ver el proyecto',
    'hero.stat1.value': 'Spring Boot',
    'hero.stat1.label': 'Backend sólido',
    'hero.stat2.value': 'Multi-tenant',
    'hero.stat2.label': 'Desde el primer commit',
    'hero.stat3.value': 'Open source',
    'hero.stat3.label': 'Sin lock-in',

    // Problema
    'problem.eyebrow': 'POR QUÉ EXISTE CAUCE',
    'problem.title.line1': 'Hay demasiado',
    'problem.title.emphasis': 'vende-humos',
    'problem.title.line3': 'en IA.',

    'problem.pain1.title': 'Demos que no llegan a producción',
    'problem.pain1.body':
      'El 80% de los proyectos de agentes de IA que ves en LinkedIn son prototipos que nadie usa en producción. Código sin tests, sin multi-tenant, sin observabilidad.',

    'problem.pain2.title': 'Vendor lock-in disfrazado de facilidad',
    'problem.pain2.body':
      'Las plataformas SaaS de agentes te cobran por mensaje, te atan a su LLM y desaparecen cuando pivotan. Tu negocio no puede depender de eso.',

    'problem.pain3.title': 'Integraciones que no escalan',
    'problem.pain3.body':
      'WhatsApp por un lado, Telegram por otro, la API propia en un tercer repo. Cada canal con su lógica de negocio duplicada. Un infierno de mantenimiento.',

    'problem.pain4.title': 'Sin infraestructura europea de referencia',
    'problem.pain4.body':
      'Todo lo serio viene de EEUU, con precios en dólares, servidores en us-east-1 y sin pensar en GDPR. Europa necesita su propia infraestructura.',

    'problem.quote.part1':
      'Cauce existe porque el sector lleva demasiado tiempo optimizando para la demo y no para la producción.',
    'problem.quote.part2': 'Es hora de construir algo que',
    'problem.quote.emphasis': 'aguante de verdad.',
    'problem.quote.author': '— CAUCE OS · CAUCE.DEV',

    // Qué es Cauce
    'whatIs.eyebrow': 'QUÉ ES CAUCE',
    'whatIs.title.line1': 'Infraestructura real.',
    'whatIs.title.emphasis': 'No demos.',
    'whatIs.subtitle':
      'Una plataforma modular que conecta tus canales, gestiona la memoria de tus agentes y expone todo vía API. Construida sobre Spring Boot, pensada para consultoras que entregan proyectos reales a clientes reales.',

    'whatIs.feature1.title': 'Multicanal desde el primer día',
    'whatIs.feature1.body':
      'WhatsApp, Telegram, voz y web chat en un solo runtime. Sin duplicar lógica de negocio. Sin mantener cuatro integraciones por separado. El cauce recibe todos los flujos.',

    'whatIs.feature2.title': 'Memoria y contexto persistente',
    'whatIs.feature2.body':
      'Los agentes recuerdan. Memoria por conversación, por usuario y por tenant. Soporte para múltiples LLMs intercambiables sin tocar el código del agente.',

    'whatIs.feature3.title': 'Multi-tenant y observable',
    'whatIs.feature3.body':
      'Diseñado para que una sola instancia sirva a muchos clientes. Métricas, trazas y logs integrados. Cada tenant aislado desde la arquitectura, no como añadido posterior.',

    // Arquitectura
    'arch.eyebrow': 'STACK TÉCNICO',
    'arch.title.line1': 'Decisiones tomadas.',
    'arch.title.emphasis': 'Sin compromiso.',
    'arch.layer.channels': 'CANALES',
    'arch.layer.runtime': 'RUNTIME',
    'arch.layer.platform': 'PLATAFORMA',
    'arch.layer.llm': 'LLM',
    'arch.layer.api': 'API',
    'arch.channels.voice': 'Voz',
    'arch.runtime.label': 'cauce-core · motor de agentes + orquestación',
    'arch.platform.memory': 'Memoria',
    'arch.platform.evals': 'Evals',
    'arch.platform.observability': 'Observabilidad',
    'arch.platform.multitenant': 'Multi-tenant',
    'arch.llm.more': '+ más',
    'arch.api.label': 'cauce-api · REST + webhooks + panel de administración',
    'arch.stack.label': 'STACK',

    // Building in public
    'bip.eyebrow': 'BUILDING IN PUBLIC',
    'bip.title.line1': 'Construido',
    'bip.title.emphasis': 'en abierto.',

    'bip.manifesto1.bold': 'Un solo developer, desde España.',
    'bip.manifesto1.rest':
      'Sin rondas de financiación, sin equipo de 20 personas, sin oficina en Madrid. Solo código consistente y trabajo honesto.',

    'bip.manifesto2.bold': 'Todo el proceso, en público.',
    'bip.manifesto2.rest':
      'Cada decisión técnica, cada error, cada refactorización. Si algo no funciona, lo digo. Si algo funciona bien, también.',

    'bip.manifesto3.bold': 'El código es la documentación.',
    'bip.manifesto3.rest':
      'Sin marketing vacío. Si quieres saber si Cauce es serio, abre el repo, lee el código, y saca tus propias conclusiones.',

    'bip.manifesto4.bold': 'Europa necesita su infraestructura.',
    'bip.manifesto4.rest':
      'GDPR, servidores en la UE, idioma español de primera clase. No somos un fork americano con bandera española.',

    'bip.cta': 'Seguir el progreso →',

    'bip.devlog4.meta': 'DEVLOG #4 · EN PROGRESO',
    'bip.devlog4.text': 'Trabajando en la primera integración de canal.',
    'bip.devlog4.highlight': 'Web Chat → prototipo cauce-core.',
    'bip.devlog4.after': 'WhatsApp y capa de memoria a continuación.',

    'bip.devlog3.meta': 'DEVLOG #3 · DECISIÓN',
    'bip.devlog3.text': 'Decisión:',
    'bip.devlog3.highlight': '10 módulos en settings.gradle.kts.',
    'bip.devlog3.after':
      'Es más fácil dividir cuando duele que unificar cuando ya está separado.',

    'bip.devlog1.meta': 'DEVLOG #1 · INICIO',
    'bip.devlog1.text':
      'Esto empieza. Demasiados proyectos de IA no llegan a producción. Cauce va a ser diferente.',

    // Waitlist
    'waitlist.title.line1': 'Sé el primero en',
    'waitlist.title.line2.pre': 'probar',
    'waitlist.title.emphasis': 'Cauce.',
    'waitlist.subtitle':
      'Estamos construyendo en abierto. Cuando lancemos la primera versión pública, los de la lista serán los primeros en acceder.',
    'waitlist.email.placeholder': 'tu@email.com',
    'waitlist.submit': 'Apúntame →',
    'waitlist.success': 'Apuntado. Te avisamos cuando abramos.',
    'waitlist.error': 'Algo ha fallado. Inténtalo de nuevo.',
    'waitlist.note': 'Sin spam. Solo cuando haya algo que merezca la pena.',

    // Footer
    'footer.by': 'by Payoyo Dev',
    'footer.email': 'hola@cauce.dev',
    'footer.year': 'cauce.dev · 2026',
  },
} as const;
