const workflowSteps = [
  {
    step: '01',
    title: 'Intercept',
    description:
      'The gateway captures every LLM response before the agent commits to action.',
  },
  {
    step: '02',
    title: 'Parse',
    description:
      'Tool calls and structured outputs become checkable instructions with security metadata.',
  },
  {
    step: '03',
    title: 'Govern',
    description:
      'Configurable policies allow, block, or protect operations — escalating to human approval when needed.',
  },
  {
    step: '04',
    title: 'Observe',
    description:
      'Trace every decision, analyze failures, and refine policies through evidence-backed dashboards.',
  },
];

const coreFeatures = [
  {
    title: 'Instruction-Aware Gateway',
    description:
      'Sits on the LLM request path via LiteLLM proxy, converting model outputs and tool intents into structured instructions before execution.',
    Icon: GatewayIcon,
  },
  {
    title: 'Configurable Policy Engine',
    description:
      'Sequential policy checks inspect every action for trustworthiness, confidentiality, reversibility, and execution risk.',
    Icon: PolicyEngineIcon,
  },
  {
    title: 'Human-in-the-Loop Approval',
    description:
      'Sensitive operations escalate through explicit confirmation loops. Approved actions carry full evidence for audit and replay.',
    Icon: ApprovalIcon,
  },
  {
    title: 'Traceable Reliability',
    description:
      'Every request, policy decision, and governance trace is persisted for deterministic replay, incident review, and reporting.',
    Icon: ReliabilityIcon,
  },
];

const extensionFeatures = [
  {
    title: 'Governance Dashboard',
    description:
      'Monitor governed signals — errors, warnings, and policy violations — with real-time severity counts and governance trend charts.',
    Visual: GovernanceDashboardVisual,
  },
  {
    title: 'Trace & Execution Graph',
    description:
      'Explore execution flows with hierarchy views, governance banners, node search, and highlighted error and violation nodes.',
    Visual: TraceGraphVisual,
  },
  {
    title: 'Error Root Cause Analysis',
    description:
      'Identify why a run failed with structured root cause, immediate fix suggestions, and recurrence prevention guidance.',
    Visual: ErrorAnalysisVisual,
  },
  {
    title: 'Policy Violation Tracking',
    description:
      'Track every policy violation with action details, severity labels, and drill-down from the trace to the offending instruction.',
    Visual: ViolationTrackingVisual,
  },
  {
    title: 'Policy Refinement & Confirmation',
    description:
      'Analyze confirmation acceptance and rejection rates, and generate LLM-assisted policy update suggestions from evidence.',
    Visual: PolicyRefinementVisual,
  },
  {
    title: 'Experience & Prompt Assets',
    description:
      'Capture governance lessons as prompt packs and experience summaries that feed into future agent iterations.',
    Visual: ExperienceAssetsVisual,
  },
];

const signalTags = [
  { label: 'Trustworthiness', size: 'lg', tone: 'blue' },
  { label: 'Confidentiality', size: 'md', tone: 'teal' },
  { label: 'Execution Risk', size: 'xl', tone: 'slate' },
  { label: 'Reversibility', size: 'sm', tone: 'muted' },
  { label: 'Human Confirmation', size: 'md', tone: 'blue' },
  { label: 'Policy Protection', size: 'lg', tone: 'teal' },
  { label: 'Governed Traces', size: 'md', tone: 'slate' },
  { label: 'Red-Team Validated', size: 'sm', tone: 'muted' },
];

const resourceLinks = [
  {
    label: 'GitHub Repository',
    description: 'Source code, docs, and setup.',
    href: 'https://github.com/cure-lab/ArbiterOS',
  },
  {
    label: 'Visualization Extension',
    description: 'Governance visualization workspace.',
    href: 'https://github.com/cure-lab/ArbiterOS/tree/main/langfuse',
  },
  {
    label: 'Research Paper',
    description: 'Technical details on arXiv.',
    href: 'https://arxiv.org/abs/2510.13857',
  },
];

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="ArbiterOS home">
            <BrandMark />
            <span>ArbiterOS</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#extension">Extension</a>
          </nav>
          <a
            className="btn btn-outline header-cta"
            href="https://github.com/cure-lab/ArbiterOS"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-content">
            <span className="eyebrow">Open-Source Agent Governance</span>
            <h1>
              Secure every AI&nbsp;agent action before it&nbsp;happens.
            </h1>
            <p className="hero-sub">
              ArbiterOS is an open-source protection layer for AI agents. It intercepts model
              outputs, applies policy-driven safety checks with human-in-the-loop approval, and
              provides full observability through Langfuse-powered tracing and analysis.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://github.com/cure-lab/ArbiterOS"
                target="_blank"
                rel="noreferrer"
              >
                Get Started
              </a>
              <a className="btn btn-secondary" href="#how-it-works">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <HeroIllustration />
          </div>
        </section>

        <div className="container signal-strip" aria-label="Core concepts">
          {signalTags.map((tag) => (
            <span
              className={`signal-tag signal-tag-${tag.size} signal-tag-${tag.tone}`}
              key={tag.label}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <section className="container section" id="how-it-works">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2>From agent output to governed action in four steps</h2>
          </div>
          <div className="steps-grid">
            {workflowSteps.map((s) => (
              <article className="step-card" key={s.step}>
                <span className="step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container section" id="features">
          <div className="section-header">
            <span className="section-label">Core Capabilities</span>
            <h2>Security and reliability at the center</h2>
            <p className="section-desc">
              ArbiterOS makes agent behavior inspectable before it becomes action, and risky
              behavior governable when reliability matters.
            </p>
          </div>
          <div className="features-grid">
            {coreFeatures.map(({ Icon, ...f }) => (
              <article className="feature-card" key={f.title}>
                <div className="feature-icon"><Icon /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container section" id="extension">
          <div className="section-header">
            <span className="section-label">Visualization Extension</span>
            <h2>Visualization, analysis, and policy iteration</h2>
            <p className="section-desc">
              Built on Langfuse, the governance interface turns traces into actionable insights —
              from error diagnosis to evidence-backed policy refinement.
            </p>
          </div>
          <div className="ext-grid">
            {extensionFeatures.map(({ Visual, ...f }) => (
              <article className="ext-card" key={f.title}>
                <div className="ext-visual"><Visual /></div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container section cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <span className="section-label">Get Started</span>
              <h2>Deploy ArbiterOS in&nbsp;minutes</h2>
              <p>
                Clone the repository, configure your model provider, and run with Docker Compose or
                the install script. The full stack — Kernel, Langfuse, and infrastructure — starts
                with a single command.
              </p>
              <div className="cta-actions">
                <a
                  className="btn btn-primary"
                  href="https://github.com/cure-lab/ArbiterOS"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://arxiv.org/abs/2510.13857"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the Paper
                </a>
              </div>
            </div>
            <div className="cta-links">
              {resourceLinks.map((link) => (
                <a
                  className="resource-link"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <span className="resource-name">{link.label}</span>
                    <span className="resource-desc">{link.description}</span>
                  </div>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <BrandMark />
            <span>ArbiterOS</span>
          </div>
          <div className="footer-links">
            <span>Security and reliability layer for AI agents.</span>
            <a href="https://github.com/cure-lab/ArbiterOS" target="_blank" rel="noreferrer">Project</a>
            <a href="https://github.com/cure-lab/ArbiterOS/tree/main/langfuse" target="_blank" rel="noreferrer">Extension</a>
            <a href="https://arxiv.org/abs/2510.13857" target="_blank" rel="noreferrer">Paper</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Brand
   ═══════════════════════════════════════════════ */

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="brand-icon">
      <defs>
        <linearGradient id="brand-bg" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0f66ff" />
          <stop offset="1" stopColor="#2d8cf0" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="14" fill="url(#brand-bg)" />
      <path
        d="M24 12 33 15.4v8.4c0 6-3.8 11.6-9 14-5.2-2.4-9-8-9-14V15.4L24 12Z"
        fill="#fff" opacity="0.97"
      />
      <path d="M19 21h10" stroke="#0f66ff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.5 25h7" stroke="#0f66ff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M22 29h4" stroke="#0f66ff" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Hero Illustration
   ═══════════════════════════════════════════════ */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 440" role="img" aria-label="ArbiterOS architecture flow">
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="520" y2="440">
          <stop offset="0%" stopColor="#f0f7ff" />
          <stop offset="45%" stopColor="#f7faff" />
          <stop offset="100%" stopColor="#eaf3ff" />
        </linearGradient>
        <linearGradient id="shield-fill" x1="226" y1="80" x2="294" y2="186">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f5f9ff" />
          <stop offset="100%" stopColor="#e8f1ff" />
        </linearGradient>
        <linearGradient id="shield-stroke-grad" x1="226" y1="80" x2="294" y2="186">
          <stop offset="0%" stopColor="#8bb8ff" />
          <stop offset="100%" stopColor="#267ef0" />
        </linearGradient>
        <radialGradient id="shield-core" cx="260" cy="126" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fbff" />
          <stop offset="100%" stopColor="#dcebff" />
        </radialGradient>
        <radialGradient id="shield-halo" cx="260" cy="146" r="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f66ff" stopOpacity="0.12" />
          <stop offset="40%" stopColor="#0f66ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0f66ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shield-inner" cx="260" cy="130" r="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eef6ff" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arrow-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <linearGradient id="arrow-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <linearGradient id="accent-danger" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="accent-safe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#39c0b7" />
        </linearGradient>
        <filter id="card-shadow" x="-8%" y="-6%" width="116%" height="118%">
          <feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="#0f2844" floodOpacity="0.07" />
        </filter>
        <filter id="shield-shadow" x="206" y="74" width="108" height="132" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#0f66ff" floodOpacity="0.2" />
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#0f1f3a" floodOpacity="0.1" />
        </filter>
        <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#0f66ff" opacity="0.045" />
        </pattern>
        <clipPath id="clip-left"><rect x="20" y="50" width="148" height="194" rx="16" /></clipPath>
        <clipPath id="clip-right"><rect x="352" y="50" width="148" height="194" rx="16" /></clipPath>
        <radialGradient id="block-glow-lg" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="block-glow-sm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="block-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff5f5" />
          <stop offset="100%" stopColor="#fef2f2" />
        </linearGradient>
      </defs>

      {/* ─── Background ─── */}
      <rect width="520" height="440" rx="24" fill="url(#hero-bg)" />
      <rect width="520" height="440" rx="24" fill="url(#hero-dots)" />
      <rect width="520" height="440" rx="24" fill="none" stroke="#cdddf4" strokeWidth="1" />

      <circle cx="80" cy="60" r="55" fill="#dbeafe" opacity="0.22" />
      <circle cx="460" cy="390" r="65" fill="#d1fae5" opacity="0.15" />
      <circle cx="440" cy="40" r="22" fill="#39c0b7" opacity="0.05" />
      <circle cx="35" cy="360" r="30" fill="#dbeafe" opacity="0.14" />

      {/* ─── Agent Output Card ─── */}
      <g filter="url(#card-shadow)">
        <rect x="20" y="50" width="148" height="194" rx="16" fill="#fff" />
        <rect x="20" y="50" width="148" height="194" rx="16" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <rect x="20" y="50" width="148" height="4" fill="url(#accent-danger)" opacity="0.65" clipPath="url(#clip-left)" />
      <text x="38" y="76" fill="#2c4a6e" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700">Agent Output</text>
      <circle cx="148" cy="70" r="8" fill="#fef2f2" />
      <text x="148" y="73.5" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="800" textAnchor="middle">!</text>

      <rect x="34" y="90" width="120" height="28" rx="7" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8" />
      <circle cx="46" cy="104" r="5" fill="#dc2626" opacity="0.15" />
      <text x="46" y="107" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="800" textAnchor="middle">!</text>
      <text x="56" y="100" fill="#64748b" fontFamily="'Manrope',sans-serif" fontSize="6.5" fontWeight="600">exec</text>
      <text x="56" y="111" fill="#991b1b" fontFamily="monospace,sans-serif" fontSize="7" fontWeight="700">rm -rf /etc</text>

      <rect x="34" y="124" width="120" height="28" rx="7" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8" />
      <circle cx="46" cy="138" r="5" fill="#dc2626" opacity="0.15" />
      <text x="46" y="141" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="800" textAnchor="middle">!</text>
      <text x="56" y="134" fill="#64748b" fontFamily="'Manrope',sans-serif" fontSize="6.5" fontWeight="600">send</text>
      <text x="56" y="145" fill="#991b1b" fontFamily="monospace,sans-serif" fontSize="7" fontWeight="700">{"API_KEY → ext"}</text>

      <rect x="34" y="158" width="120" height="24" rx="7" fill="#f8faff" stroke="#e2ecfa" strokeWidth="0.8" />
      <circle cx="46" cy="170" r="4" fill="#e2ecfa" />
      <text x="46" y="173" fill="#94a3b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">{"→"}</text>
      <text x="56" y="173" fill="#475569" fontFamily="monospace,sans-serif" fontSize="7">read config.yml</text>

      <rect x="34" y="188" width="120" height="24" rx="7" fill="#f8faff" stroke="#e2ecfa" strokeWidth="0.8" />
      <circle cx="46" cy="200" r="4" fill="#e2ecfa" />
      <text x="46" y="203" fill="#94a3b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">{"→"}</text>
      <text x="56" y="203" fill="#475569" fontFamily="monospace,sans-serif" fontSize="7">write report.md</text>

      {/* ─── Arrow: Agent → Kernel ─── */}
      <path d="M168 145h30" fill="none" stroke="url(#arrow-h)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M196 145l-8-5v10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="172" cy="145" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="178" cy="145" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="185" cy="145" r="2.6" fill="#0f66ff" opacity="0.15" />

      {/* ─── Central ArbiterOS Kernel ─── */}
      <circle cx="260" cy="146" r="105" fill="url(#shield-halo)" />

      <circle cx="260" cy="146" r="86" fill="none" stroke="#0f66ff" strokeWidth="0.5" opacity="0.07" strokeDasharray="4 6" />
      <circle cx="260" cy="146" r="72" fill="none" stroke="#0f66ff" strokeWidth="0.4" opacity="0.05" strokeDasharray="3 5" />

      <circle cx="346" cy="146" r="3" fill="#0f66ff" opacity="0.14" />
      <circle cx="260" cy="60" r="2.5" fill="#39c0b7" opacity="0.18" />
      <circle cx="190" cy="208" r="2" fill="#0f66ff" opacity="0.12" />

      <circle cx="260" cy="138" r="58" fill="url(#shield-inner)" opacity="0.6" />

      <g filter="url(#shield-shadow)">
        <path
          d="M260 82l34 12.5v31c0 25-14 47-34 58-20-11-34-33-34-58v-31L260 82Z"
          fill="url(#shield-fill)"
          stroke="url(#shield-stroke-grad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M260 90l26 9.6v24c0 19.5-10.8 36.5-26 45-15.2-8.5-26-25.5-26-45v-24L260 90Z"
        fill="none"
        stroke="#0f66ff"
        strokeWidth="0.7"
        opacity="0.14"
      />
      <path
        d="M240.5 99.5c6.6 2.4 13.2 4.8 19.5 7 6.3-2.2 12.9-4.6 19.5-7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M260 108l13 6v11.5c0 8.3-4.5 15.8-13 20.4-8.5-4.6-13-12.1-13-20.4V114l13-6Z"
        fill="url(#shield-core)"
        stroke="#66a5ff"
        strokeWidth="1"
        opacity="0.96"
      />
      <path
        d="M252.5 126l5.4 5.4 10.6-10.6"
        fill="none"
        stroke="#0f66ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="260" y="198" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">ArbiterOS Kernel</text>
      <rect x="205" y="206" width="36" height="15" rx="7.5" fill="#eef4ff" stroke="#d0e2f6" strokeWidth="0.5" />
      <text x="223" y="217" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Parse</text>
      <rect x="245" y="206" width="36" height="15" rx="7.5" fill="#eef4ff" stroke="#d0e2f6" strokeWidth="0.5" />
      <text x="263" y="217" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Policy</text>
      <rect x="285" y="206" width="36" height="15" rx="7.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.5" />
      <text x="303" y="217" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Block</text>

      {/* Blocked items — ejected from shield */}
      <g>
        {/* Large blocked item */}
        <circle cx="232" cy="60" r="22" fill="url(#block-glow-lg)" />
        <circle cx="232" cy="60" r="15" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.35" strokeDasharray="3 3" />
        <circle cx="232" cy="60" r="12" fill="url(#block-fill)" stroke="#f9a8a8" strokeWidth="1.2" />
        <path d="M227.5 55.5l9 9m0-9l-9 9" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="214" y="74" width="36" height="11" rx="5.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.6" />
        <text x="232" y="82" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">rm -rf</text>
        <path d="M244 48l2-6" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M220 50l-3-5" stroke="#fca5a5" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />

        {/* Small blocked item */}
        <circle cx="294" cy="50" r="18" fill="url(#block-glow-sm)" />
        <circle cx="294" cy="50" r="12" fill="none" stroke="#fca5a5" strokeWidth="0.5" opacity="0.3" strokeDasharray="2.5 2.5" />
        <circle cx="294" cy="50" r="9.5" fill="url(#block-fill)" stroke="#f9a8a8" strokeWidth="1" />
        <path d="M290.5 46.5l7 7m0-7l-7 7" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="278" y="62" width="32" height="11" rx="5.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.6" />
        <text x="294" y="70" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">leak</text>
        <path d="M305 40l2-5" stroke="#fca5a5" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      </g>

      {/* ─── Arrow: Kernel → Governed ─── */}
      <path d="M326 145h18" fill="none" stroke="url(#arrow-h)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M349 145l-7-5v10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="329" cy="145" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="334" cy="145" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="340" cy="145" r="2.6" fill="#0f66ff" opacity="0.15" />

      {/* ─── Governed Output Card ─── */}
      <g filter="url(#card-shadow)">
        <rect x="352" y="50" width="148" height="194" rx="16" fill="#fff" />
        <rect x="352" y="50" width="148" height="194" rx="16" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <rect x="352" y="50" width="148" height="4" fill="url(#accent-safe)" opacity="0.65" clipPath="url(#clip-right)" />
      <text x="372" y="76" fill="#2c4a6e" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700">Governed Output</text>
      <circle cx="478" cy="70" r="10" fill="#ecfdf5" />
      <path d="M473 70l3 3 5-5.5" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="368" y="90" width="120" height="24" rx="7" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="0.8" />
      <circle cx="380" cy="102" r="4" fill="#16a34a" opacity="0.2" />
      <path d="M378 102l1.5 1.5 3-3" fill="none" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="390" y="105" fill="#166534" fontFamily="monospace,sans-serif" fontSize="7">read config.yml</text>

      <rect x="368" y="120" width="120" height="24" rx="7" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="0.8" />
      <circle cx="380" cy="132" r="4" fill="#16a34a" opacity="0.2" />
      <path d="M378 132l1.5 1.5 3-3" fill="none" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="390" y="135" fill="#166534" fontFamily="monospace,sans-serif" fontSize="7">write report.md</text>

      <rect x="368" y="154" width="82" height="22" rx="11" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8" />
      <path d="M381 163l4 4m0-4l-4 4" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
      <text x="394" y="168" fill="#991b1b" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">2 Blocked</text>

      <rect x="368" y="184" width="100" height="22" rx="11" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="0.8" />
      <path d="M381 195l2 2 4-4" fill="none" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="394" y="198" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Safe to Execute</text>

      {/* ─── Arrow: Kernel → Langfuse ─── */}
      <path d="M260 226v24" fill="none" stroke="url(#arrow-v)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M260 249l-5-8h10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="260" cy="229" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="260" cy="234" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="260" cy="240" r="2.6" fill="#0f66ff" opacity="0.15" />

      {/* ─── Langfuse Traces Panel ─── */}
      <g filter="url(#card-shadow)">
        <rect x="50" y="260" width="420" height="164" rx="18" fill="#fff" />
        <rect x="50" y="260" width="420" height="164" rx="18" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <circle cx="76" cy="282" r="5" fill="#0f66ff" opacity="0.15" />
      <text x="88" y="286" fill="#2c4a6e" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700">Traces</text>
      <rect x="310" y="274" width="48" height="14" rx="7" fill="#eef4ff" />
      <text x="334" y="284" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600" textAnchor="middle">Signals</text>
      <rect x="364" y="274" width="72" height="14" rx="7" fill="#ecfdf5" />
      <text x="400" y="284" fill="#1a8a6e" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600" textAnchor="middle">Protected</text>

      <text x="76" y="306" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600">NODE</text>
      <text x="200" y="306" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600">EXECUTION SPAN</text>
      <text x="420" y="306" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600">STATUS</text>
      <path d="M68 311h390" stroke="#e8f0fc" strokeWidth="0.8" />

      <circle cx="80" cy="326" r="5" fill="#0f66ff" />
      <text x="92" y="329" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Trace</text>
      <rect x="200" y="322" width="210" height="8" rx="4" fill="#dbeafe" opacity="0.45" />
      <rect x="200" y="322" width="210" height="8" rx="4" fill="none" stroke="#c5d9f2" strokeWidth="0.4" />
      <rect x="420" y="321" width="26" height="12" rx="6" fill="#ecfdf5" />
      <text x="433" y="330" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">OK</text>

      <path d="M80 331v17h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />

      <circle cx="100" cy="349" r="4.5" fill="#39c0b7" />
      <text x="110" y="352" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Generation</text>
      <rect x="210" y="345" width="140" height="7" rx="3.5" fill="#99f6e4" opacity="0.4" />

      <path d="M100 353v36" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />
      <path d="M100 369h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />
      <path d="M100 389h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />

      <circle cx="120" cy="369" r="4.5" fill="#dc2626" />
      <text x="130" y="372" fill="#991b1b" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">{"exec · rm -rf"}</text>
      <rect x="230" y="365" width="80" height="7" rx="3.5" fill="#fecaca" opacity="0.5" />
      <rect x="420" y="363" width="32" height="12" rx="6" fill="#fef2f2" />
      <text x="436" y="372" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="5.5" fontWeight="700" textAnchor="middle">VIOL</text>

      <circle cx="120" cy="389" r="4.5" fill="#22c55e" />
      <text x="130" y="392" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">{"read · config"}</text>
      <rect x="260" y="385" width="110" height="7" rx="3.5" fill="#bbf7d0" opacity="0.4" />
      <rect x="420" y="383" width="26" height="12" rx="6" fill="#ecfdf5" />
      <text x="433" y="392" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">OK</text>

      <circle cx="76" cy="414" r="3.5" fill="#0f66ff" />
      <text x="84" y="417" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7">Trace</text>
      <circle cx="118" cy="414" r="3.5" fill="#39c0b7" />
      <text x="126" y="417" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7">Gen</text>
      <circle cx="158" cy="414" r="3.5" fill="#dc2626" />
      <text x="166" y="417" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7">Violation</text>
      <circle cx="218" cy="414" r="3.5" fill="#22c55e" />
      <text x="226" y="417" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7">OK</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Feature Icons — more detailed & accurate
   ═══════════════════════════════════════════════ */

function GatewayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <path d="M6 18h.01M10 18h.01" />
      <path d="M12 14V2" />
      <path d="M8 6l4-4 4 4" />
    </svg>
  );
}

function PolicyEngineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {/* Clipboard/document body */}
      <rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      {/* Tab at top */}
      <path d="M9 1.5h6v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      {/* Check line 1 */}
      <path d="M7.5 9.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* X line 2 */}
      <path d="M8 14.5l2.5 2.5m0-2.5L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rule labels */}
      <path d="M14 9.5h3M14 16h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function ApprovalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 20v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17.2 7l1.3 1.3 2.5-2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReliabilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Visualization Extension Visuals — 6 rich charts
   ═══════════════════════════════════════════════ */

function GovernanceDashboardVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#f8faff" />
      {/* Three metric tiles */}
      <rect x="16" y="14" width="88" height="46" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="26" y="32" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">ERRORS</text>
      <text x="26" y="50" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="16" fontWeight="800">12</text>
      <circle cx="88" cy="42" r="6" fill="#fef2f2" />
      <path d="M86 42l1.5 1.5 3-3" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="116" y="14" width="88" height="46" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="126" y="32" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">WARNINGS</text>
      <text x="126" y="50" fill="#f59e0b" fontFamily="'Manrope',sans-serif" fontSize="16" fontWeight="800">27</text>
      <circle cx="188" cy="42" r="6" fill="#fffbeb" />
      <path d="M188 39v3.5m0 1.5v0" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />

      <rect x="216" y="14" width="88" height="46" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="226" y="32" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">VIOLATIONS</text>
      <text x="226" y="50" fill="#0f66ff" fontFamily="'Manrope',sans-serif" fontSize="16" fontWeight="800">5</text>
      <circle cx="288" cy="42" r="6" fill="#eef4ff" />
      <path d="M288 37.5l3 1.1v2.2c0 1.8-1 3.3-3 4.2-2-.9-3-2.4-3-4.2v-2.2l3-1.1Z" fill="none" stroke="#0f66ff" strokeWidth="0.8" />

      {/* Governance trend line chart */}
      <text x="16" y="80" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">GOVERNANCE TREND</text>
      <path d="M16 156h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 136h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 116h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 96h288" stroke="#e8f0fc" strokeWidth="0.8" />
      {/* Error trend line */}
      <path d="M24 146C48 140 66 116 90 112c26-4 34 16 54 12s30-22 46-26c20-4 38 8 56 4s26-6 40-10" fill="none" stroke="#fca5a5" strokeWidth="2.2" strokeLinecap="round" />
      {/* Warning trend line */}
      <path d="M24 142C46 138 64 126 86 124c24-2 32 10 50 8s30-14 46-16c18-2 36 6 54 4s26-4 40-6" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />

      {/* Legend */}
      <rect x="16" y="166" width="6" height="6" rx="1.5" fill="#fca5a5" />
      <text x="26" y="172" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7.5">Error</text>
      <rect x="56" y="166" width="6" height="6" rx="1.5" fill="#fcd34d" />
      <text x="66" y="172" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7.5">Warning</text>
    </svg>
  );
}

function TraceGraphVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#f8faff" />
      {/* Governance banner */}
      <rect x="12" y="10" width="296" height="24" rx="8" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <circle cx="26" cy="22" r="4" fill="#22c55e" opacity="0.7" />
      <text x="34" y="26" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Session #42</text>
      <rect x="128" y="16" width="36" height="12" rx="6" fill="#fef2f2" />
      <text x="146" y="25" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">2 err</text>
      <rect x="170" y="16" width="42" height="12" rx="6" fill="#eef4ff" />
      <text x="191" y="25" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">1 viol</text>
      <rect x="218" y="16" width="36" height="12" rx="6" fill="#ecfdf5" />
      <text x="236" y="25" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">5 ok</text>

      {/* Graph edges — connect from node boundary to node boundary */}
      <path d="M70 62h36 M130 62h18 M172 62h36 M118 74v22 M160 74v22 M154 119L146 133 M168 117L182 134" stroke="#b5cceb" strokeWidth="2" strokeLinecap="round" />

      {/* Graph nodes: top row */}
      <circle cx="58" cy="62" r="12" fill="#0f66ff" opacity="0.85" />
      <text x="58" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">LLM</text>
      <circle cx="118" cy="62" r="12" fill="#39c0b7" opacity="0.85" />
      <text x="118" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T1</text>
      <circle cx="160" cy="62" r="12" fill="#0f66ff" opacity="0.65" />
      <text x="160" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T2</text>
      <circle cx="220" cy="62" r="12" fill="#39c0b7" opacity="0.75" />
      <text x="220" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T3</text>

      {/* Middle row */}
      <circle cx="118" cy="108" r="12" fill="#22c55e" opacity="0.7" />
      <text x="118" y="112" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">OK</text>
      <circle cx="160" cy="108" r="12" fill="#0f66ff" opacity="0.55" />
      <text x="160" y="112" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T4</text>

      {/* Bottom row — violation + error highlighted */}
      <circle cx="140" cy="144" r="13" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="140" y="148" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">ERR</text>
      <circle cx="190" cy="144" r="13" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="190" y="148" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">VIOL</text>

      {/* Right side: mini info panel */}
      <rect x="242" y="48" width="66" height="90" rx="8" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="252" y="64" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700">Node Detail</text>
      <rect x="252" y="72" width="44" height="5" rx="2.5" fill="#dce8f8" />
      <rect x="252" y="82" width="36" height="5" rx="2.5" fill="#e8f0fc" />
      <rect x="252" y="92" width="40" height="5" rx="2.5" fill="#dce8f8" />
      <rect x="252" y="106" width="48" height="12" rx="6" fill="#fef2f2" />
      <text x="276" y="115" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Error</text>
      <rect x="252" y="122" width="48" height="12" rx="6" fill="#eef4ff" />
      <text x="276" y="131" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Violation</text>

      {/* Legend */}
      <circle cx="20" cy="170" r="4" fill="#22c55e" opacity="0.7" />
      <text x="28" y="173" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7.5">OK</text>
      <circle cx="52" cy="170" r="4" fill="#fca5a5" />
      <text x="60" y="173" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7.5">Error</text>
      <circle cx="92" cy="170" r="4" fill="#93c5fd" />
      <text x="100" y="173" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7.5">Violation</text>
    </svg>
  );
}

function ErrorAnalysisVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#fafbff" />

      {/* Left: trace context with error node */}
      <rect x="12" y="12" width="96" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="22" y="30" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Trace</text>

      {/* Node chain — spread across full box height */}
      <circle cx="36" cy="44" r="6" fill="#22c55e" opacity="0.5" />
      <path d="M36 50v14" stroke="#d0daea" strokeWidth="1.2" />
      <circle cx="36" cy="70" r="6" fill="#22c55e" opacity="0.5" />
      <path d="M36 76v14" stroke="#d0daea" strokeWidth="1.2" />
      <circle cx="36" cy="98" r="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="36" y="101" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="5.5" fontWeight="700" textAnchor="middle">ERR</text>
      <path d="M36 106v14" stroke="#d0daea" strokeWidth="1.2" />
      <circle cx="36" cy="126" r="6" fill="#22c55e" opacity="0.5" />
      <path d="M36 132v14" stroke="#d0daea" strokeWidth="1.2" />
      <circle cx="36" cy="152" r="6" fill="#22c55e" opacity="0.5" />

      {/* Selected indicator */}
      <path d="M44 98h12" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="56" y="90" width="42" height="16" rx="5" fill="#fef2f2" />
      <text x="77" y="101" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6.5" fontWeight="600" textAnchor="middle">Selected</text>

      {/* Right: analysis panel */}
      <rect x="120" y="12" width="188" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />

      {/* Panel header */}
      <rect x="130" y="22" width="56" height="14" rx="7" fill="#fef2f2" />
      <text x="158" y="32" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700" textAnchor="middle">Analysis</text>

      {/* Output */}
      <text x="130" y="52" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Output</text>
      <rect x="130" y="57" width="160" height="5" rx="2.5" fill="#e8f0fc" />

      {/* Root cause */}
      <text x="130" y="76" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Root Cause</text>
      <rect x="130" y="81" width="156" height="5" rx="2.5" fill="#fecaca" opacity="0.4" />
      <rect x="130" y="90" width="124" height="5" rx="2.5" fill="#fecaca" opacity="0.3" />

      {/* Resolve now */}
      <text x="130" y="109" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Resolve Now</text>
      <rect x="130" y="114" width="148" height="5" rx="2.5" fill="#bbf7d0" opacity="0.5" />
      <rect x="130" y="123" width="132" height="5" rx="2.5" fill="#bbf7d0" opacity="0.4" />

      {/* Prevention next call */}
      <text x="130" y="142" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Prevention</text>
      <rect x="130" y="147" width="140" height="5" rx="2.5" fill="#dbeafe" opacity="0.5" />
      <rect x="130" y="156" width="116" height="5" rx="2.5" fill="#dbeafe" opacity="0.4" />
    </svg>
  );
}

function ViolationTrackingVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#f8faff" />

      {/* Header row */}
      <rect x="12" y="12" width="296" height="22" rx="6" fill="#eef4ff" />
      <text x="22" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">POLICY</text>
      <text x="140" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">DESCRIPTION</text>
      <text x="250" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">TRIGGERED</text>

      {/* Row 1 */}
      <rect x="12" y="40" width="296" height="28" rx="6" fill="#fff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="50" width="56" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="50" width="84" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="46" width="28" height="14" rx="7" fill="#fef2f2" />
      <text x="262" y="56" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">3</text>

      {/* Row 2 */}
      <rect x="12" y="74" width="296" height="28" rx="6" fill="#fafbff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="84" width="64" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="84" width="72" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="80" width="28" height="14" rx="7" fill="#fff7ed" />
      <text x="262" y="90" fill="#ea580c" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">7</text>

      {/* Row 3 */}
      <rect x="12" y="108" width="296" height="28" rx="6" fill="#fff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="118" width="48" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="118" width="90" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="114" width="28" height="14" rx="7" fill="#fffbeb" />
      <text x="262" y="124" fill="#ca8a04" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">12</text>

      {/* Row 4: Unclassified */}
      <rect x="12" y="142" width="296" height="28" rx="6" fill="#fafbff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="152" width="70" height="6" rx="3" fill="#e2e8f0" />
      <rect x="140" y="152" width="64" height="6" rx="3" fill="#edf2f7" />
      <rect x="248" y="148" width="28" height="14" rx="7" fill="#eef4ff" />
      <text x="262" y="158" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">5</text>
    </svg>
  );
}

function PolicyRefinementVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#fafbff" />

      {/* Confirmation rate gauge — 76% rejected */}
      <circle cx="72" cy="82" r="42" fill="none" stroke="#e2ecfa" strokeWidth="10" />
      <path d="M72 40a42 42 0 1 1 -41.9 39.4" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
      <text x="72" y="86" fill="#991b1b" fontFamily="'Manrope',sans-serif" fontSize="18" fontWeight="800" textAnchor="middle">76%</text>
      <text x="72" y="100" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="9" textAnchor="middle">Rejected</text>

      {/* Reject / Accept breakdown — centered labels */}
      <rect x="18" y="136" width="40" height="14" rx="7" fill="#fef2f2" />
      <text x="38" y="147" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">76%</text>
      <rect x="64" y="136" width="40" height="14" rx="7" fill="#ecfdf5" />
      <text x="84" y="147" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">24%</text>
      <text x="38" y="166" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">Reject</text>
      <text x="84" y="166" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">Accept</text>

      {/* Suggestion panel */}
      <rect x="140" y="14" width="166" height="152" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="152" y="32" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700">Policy Update Suggestion</text>
      <path d="M152 40h140" stroke="#e8f0fc" strokeWidth="0.8" />

      {/* Diff view: before */}
      <rect x="152" y="48" width="32" height="12" rx="4" fill="#fef2f2" />
      <text x="168" y="57" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Before</text>
      <rect x="152" y="64" width="120" height="6" rx="3" fill="#fecaca" opacity="0.5" />
      <rect x="152" y="74" width="96" height="6" rx="3" fill="#fecaca" opacity="0.4" />

      {/* Diff view: after */}
      <rect x="152" y="90" width="28" height="12" rx="4" fill="#ecfdf5" />
      <text x="166" y="99" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">After</text>
      <rect x="152" y="106" width="120" height="6" rx="3" fill="#bbf7d0" opacity="0.5" />
      <rect x="152" y="116" width="106" height="6" rx="3" fill="#bbf7d0" opacity="0.4" />
      <rect x="152" y="126" width="80" height="6" rx="3" fill="#bbf7d0" opacity="0.35" />

      {/* Action buttons — vertically centered text */}
      <rect x="152" y="142" width="56" height="18" rx="9" fill="#0f66ff" />
      <text x="180" y="154" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">Apply</text>
      <rect x="214" y="142" width="56" height="18" rx="9" fill="none" stroke="#c8d6e8" strokeWidth="1" />
      <text x="242" y="154" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600" textAnchor="middle">Dismiss</text>
    </svg>
  );
}

function ExperienceAssetsVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#f8faff" />

      {/* Prompt Pack card */}
      <rect x="12" y="12" width="144" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <rect x="22" y="22" width="62" height="14" rx="7" fill="#eef4ff" />
      <text x="53" y="32" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">Prompt Pack</text>
      <rect x="22" y="44" width="118" height="6" rx="3" fill="#dce8f8" />
      <rect x="22" y="56" width="96" height="6" rx="3" fill="#e8f0fc" />
      <rect x="22" y="68" width="108" height="6" rx="3" fill="#dce8f8" />
      <rect x="22" y="80" width="80" height="6" rx="3" fill="#e8f0fc" />
      <path d="M22 96h118" stroke="#e8f0fc" strokeWidth="0.8" />
      <text x="22" y="110" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Governance rules:</text>
      <rect x="22" y="116" width="100" height="5" rx="2.5" fill="#dce8f8" />
      <rect x="22" y="126" width="84" height="5" rx="2.5" fill="#e8f0fc" />
      <rect x="22" y="136" width="92" height="5" rx="2.5" fill="#dce8f8" />
      {/* Export badge */}
      <rect x="22" y="150" width="50" height="14" rx="7" fill="#eef4ff" />
      <text x="47" y="160" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">Export</text>

      {/* Experience card */}
      <rect x="164" y="12" width="144" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <rect x="174" y="22" width="60" height="14" rx="7" fill="#ecfdf5" />
      <text x="204" y="32" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">Experience</text>

      {/* Summary section */}
      <text x="174" y="52" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Session Summary</text>
      <rect x="174" y="58" width="118" height="5" rx="2.5" fill="#d1fae5" />
      <rect x="174" y="68" width="96" height="5" rx="2.5" fill="#e6f7f1" />
      <rect x="174" y="78" width="104" height="5" rx="2.5" fill="#d1fae5" />

      {/* Lessons learned */}
      <text x="174" y="100" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Lessons Learned</text>
      <circle cx="180" cy="112" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="109" width="80" height="5" rx="2.5" fill="#e6f7f1" />
      <circle cx="180" cy="124" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="121" width="68" height="5" rx="2.5" fill="#e6f7f1" />
      <circle cx="180" cy="136" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="133" width="90" height="5" rx="2.5" fill="#e6f7f1" />

      {/* Feed back arrow */}
      <rect x="174" y="150" width="80" height="14" rx="7" fill="#ecfdf5" />
      <text x="214" y="160" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">Feed to Agent</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Utility Icons
   ═══════════════════════════════════════════════ */

function GitHubIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
      <path d="M10 1.5a8.5 8.5 0 0 0-2.69 16.56c.43.08.58-.18.58-.4v-1.54c-2.37.52-2.87-1.01-2.87-1.01a2.26 2.26 0 0 0-.94-1.24c-.77-.53.06-.52.06-.52a1.79 1.79 0 0 1 1.3.88 1.81 1.81 0 0 0 2.48.71 1.82 1.82 0 0 1 .54-1.14c-1.89-.21-3.88-.95-3.88-4.22a3.31 3.31 0 0 1 .88-2.3 3.07 3.07 0 0 1 .08-2.26s.72-.23 2.35.88a8.1 8.1 0 0 1 4.28 0c1.63-1.1 2.35-.88 2.35-.88a3.07 3.07 0 0 1 .08 2.27 3.31 3.31 0 0 1 .88 2.29c0 3.28-2 4-3.9 4.22a2.03 2.03 0 0 1 .58 1.58v2.34c0 .23.15.49.58.4A8.5 8.5 0 0 0 10 1.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
      <path d="M6 14L14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
