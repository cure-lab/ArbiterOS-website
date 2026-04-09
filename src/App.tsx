import { type MouseEvent, useEffect, useState } from 'react';

type Lang = 'en' | 'zh';

const en = {
  meta: {
    homeTitle: 'ArbiterOS | Home',
    titleSuffix: 'ArbiterOS',
    description: 'ArbiterOS is an open-source execution governance layer for AI agents that intercepts model outputs, maps them into structured instructions, and applies policy, approval, and trace controls before actions run.',
  },
  ui: {
    brandHomeLabel: 'ArbiterOS home',
    primaryNavLabel: 'Primary',
    mobileNavLabel: 'Mobile primary',
    toggleNavigationLabel: 'Toggle navigation menu',
    switchToChineseLabel: 'Switch to Simplified Chinese',
    switchToEnglishLabel: 'Switch to English',
    closeLabel: 'Close',
    footerLabel: '\u00a9 2026 ArbiterOS Team',
  },
  nav: { introHome: 'Home', home: 'Home', overview: 'Overview', howItWorks: 'How It Works', extension: 'Observability' },
  hero: {
    eyebrow: '',
    title: 'LLMs think.\nArbiterOS enforces.',
    sub: 'Deterministic rules for probabilistic AI.',
    demoBtn: 'Demo',
    howItWorksBtn: 'Overview',
    githubBtn: 'GitHub',
    meta: ['OpenAI-compatible API', 'OpenClaw + Nanobot ready', 'Local deploy'],
    diagram: {
      ariaLabel: 'ArbiterOS governed execution flow',
      tracesTitle: 'Traces',
      signals: 'Signals',
      protected: 'Protected',
      leftTitle: 'Agent Output',
      rightTitle: 'Governed Output',
      blocked: '2 Blocked',
      safeToExecute: 'Safe to Execute',
      kernelTitle: 'ArbiterOS Kernel',
      parse: 'Parse',
      policy: 'Policy',
      guard: 'Guard',
      policyEngineTitle: 'Policy Engine',
      policyEngineSub: 'JSON + code policies guard every response before execution.',
      postCall: 'Post-call',
      failureLoop: 'Failure loop',
      define: 'Define',
      defineLine1: 'JSON rules',
      defineLine2: 'Unary / relational',
      trigger: 'Trigger',
      triggerLine1: 'Post-call hook',
      triggerLine2: 'Latest instructions',
      enforce: 'Enforce',
      enforceLine1: 'Block / confirm',
      enforceLine2: 'Observe-only / tags',
      refine: 'Refine',
      refineLine1: 'Failure cases',
      refineLine2: 'Tune + reload',
      node: 'NODE',
      executionSpan: 'EXECUTION SPAN',
      status: 'STATUS',
      trace: 'Trace',
      generation: 'Generation',
      violation: 'Violation',
      ok: 'OK',
    },
  },
  positioning: {
    label: '',
    title: 'ArbiterOS Provides the Constitution',
    // ArbiterOS intercepts model outputs, turns tool intent into structured instructions, and applies policy, approval, and tracing before sensitive actions run.
    desc: 'Sandboxes, guardrails, and observability still matter, but they solve different problems. ',
    items: [
      { title: 'Sandboxing', short: 'Constrain what code can touch' },
      { title: 'Patchwork Guardrails', short: 'Add checks at isolated steps' },
      { title: 'Content Guardrails', short: 'Filter model inputs and outputs' },
      { title: 'Behavior Monitoring', short: 'Observe after execution starts' },
      { title: 'ArbiterOS', short: 'Govern action intent and data flow. Turn security rules into a constitution agents cannot violate.' },
    ],
  },
  advantages: {
    label: '',
    title: 'How ArbiterOS governs actions',
    items: [
      {
        title: 'Intercept Before The Agent Acts',
        short: 'Capture outputs and tool calls before workflows commit',
        detail: 'ArbiterOS sits on the LLM path and captures assistant responses before the runtime turns them into live actions.',
      },
      {
        title: 'Discrete Instructions + Registry',
        short: 'Map responses into typed instructions with registry context',
        detail: 'Structured outputs, tool calls, and tool results are normalized into discrete instructions, then classified with registry-backed type, risk, trustworthiness, and confidentiality metadata.',
      },
      {
        title: 'Data-Flow-Aware Policy Control',
        short: 'Carry taint, trust, and confidentiality across steps',
        detail: 'Registry rules and taint tracking let policies reason about where data came from, what it touched, and whether a later write, exec, or outbound step should proceed.',
      },
      {
        title: 'Tools And Skills In One Governance Path',
        short: 'Fold tool results and optional skill trust into one loop',
        detail: 'ArbiterOS can merge tool results into the same instruction flow and incorporate optional skill-trust signals, instead of splitting governance across disconnected safety layers.',
      },
      {
        title: 'Approval Is A Policy Outcome',
        short: 'Allow, deny, rewrite, or hold in one decision pipeline',
        detail: 'Human approval is part of the unified decision flow: once an instruction crosses the threshold, policy automatically routes it for human handling.',
      },
      {
        title: 'Traceable, Replayable Decisions',
        short: 'Keep evidence for every governed instruction and result',
        detail: 'Per-trace instruction files, decision logs, and replay context make it possible to inspect why a step was classified, changed, blocked, or approved.',
      },
    ],
  },
  quickStart: {
    label: '',
    title: 'Get started in three steps',
    steps: [
      { step: '1', title: 'Install & Start Kernel', description: 'Run the install script or Docker Compose to start ArbiterOS Kernel (default port:4000).' },
      { step: '2', title: 'Configure Models & Policies', description: 'Configure models, API keys, optional skill trust scanning, and policy rules in litellm_config.yaml.' },
      { step: '3', title: 'Connect OpenClaw / Nanobot / Your Agent', description: 'Point your model provider to http://127.0.0.1:4000/v1 for instant governance, audit, and observability.' },
    ],
    commandsLabel: 'Install commands',
    runCommandsLabel: 'Run command',
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
    demo: {
      title: 'See governed execution in a real trace',
      // Compare the same agent workflow through real governance traces and policy decisions once ArbiterOS is in the loop.
      description: '',
      openLabel: 'Open live demo in new tab',
      iframeTitle: 'ArbiterOS selected cases demo',
    },
  },
  howItWorks: {
    label: '',
    title: 'Four steps to governed actions',
    statement: 'The key difference is not another filter around the model. ArbiterOS intercepts outputs, builds typed instructions, and governs each step before execution.',
    outcomes: ['Allow', 'Deny', 'Approve', 'Rewrite'],
    steps: [
      { step: '01', title: 'Intercept', description: 'The gateway captures assistant responses and tool calls before the agent runtime commits to action.' },
      { step: '02', title: 'Structure', description: 'Structured output, tool calls, and tool results are converted into discrete instructions with registry and security metadata.' },
      { step: '03', title: 'Govern', description: 'Registry rules, taint labels, and policy checks decide whether each instruction is allowed, denied, rewritten, or held for approval.' },
      { step: '04', title: 'Replay', description: 'Each instruction, classification, and decision is persisted for replay, audit, and policy iteration.' },
    ],
  },
  features: {
    label: '',
    title: 'Turn output into instructions',
    desc: 'ArbiterOS does more than add checks around an agent. It intercepts outputs, builds discrete instructions, carries security labels across steps, and applies policy before execution.',
    items: [
      { title: 'Intercept Model Output', description: 'Capture assistant responses and tool calls on the LLM path before the runtime commits them to action.' },
      { title: 'Build Typed Instructions', description: 'Convert structured output, tool calls, and tool results into discrete instructions with category, type, and registry-backed security metadata.' },
      { title: 'Apply Data-Flow-Aware Policies', description: 'Use registry rules, trust/confidentiality labels, and taint propagation to evaluate reads, writes, execs, and sensitive downstream steps.' },
      { title: 'Govern Tools, Skills, and Outcomes', description: 'Feed tool results and optional skill-trust signals into the same governance loop, then return allow, deny, rewrite, or approval outcomes with trace evidence.' },
    ],
  },
  extension: {
    label: '',
    title: 'Visualization, analysis, and policy iteration',
    desc: 'Built on Langfuse, the governance interface turns traces into actionable insights\n\u2014 from error diagnosis to evidence-backed policy refinement.',
    items: [
      { title: 'Governance Dashboard', description: 'Monitor governed signals \u2014 errors, warnings, and policy violations \u2014 with real-time severity counts and governance trend charts.' },
      { title: 'Trace & Execution Graph', description: 'Explore execution flows with hierarchy views, governance banners, node search, and highlighted error and violation nodes.' },
      { title: 'Error Root Cause Analysis', description: 'Identify why a run failed with structured root cause, immediate fix suggestions, and recurrence prevention guidance.' },
      { title: 'Policy Violation Tracking', description: 'Track every policy violation with action details, severity labels, and drill-down from the trace to the offending instruction.' },
      { title: 'Policy Refinement & Confirmation', description: 'Analyze confirmation acceptance and rejection rates, and generate LLM-assisted policy update suggestions from evidence.' },
      { title: 'Experience & Prompt Assets', description: 'Capture governance lessons as prompt packs and experience summaries that feed into future agent iterations.' },
    ],
  },
  architecture: {
    label: '',
    title: 'Governance flow',
    nodes: [
      { main: 'Request Preprocessing', sub: 'Trace mgmt / Format merge / Classification' },
      { main: 'LLM Invocation', sub: 'LiteLLM Proxy' },
      { main: 'Response Parsing', sub: 'Structured extraction / Instruction building' },
      { main: 'Policy Check', sub: 'Allow / deny / rewrite' },
      { main: 'Approval & Execution', sub: 'Hold for confirmation / Release safely' },
      { main: 'Audit & Observability', sub: 'Trace files / Langfuse / Logs' },
    ],
  },
  cta: {
    label: '',
    title: 'Deploy ArbiterOS in\u00a0minutes',
    desc: 'For engineering and platform teams that want to stably connect agents to real business systems, ArbiterOS is the better choice. Clone the repository, configure your model provider, and launch quickly with Docker Compose or the install script.',
    primaryBtn: 'View on GitHub',
    secondaryBtn: 'Read the Paper',
    contactBtn: 'Contact Team',
    resources: [
      { label: 'GitHub Repository', description: 'Source code, docs, and setup.', href: 'https://github.com/cure-lab/ArbiterOS' },
      { label: 'Visualization Extension', description: 'Governance visualization workspace.', href: 'https://github.com/cure-lab/ArbiterOS/tree/main/langfuse' },
      { label: 'Research Paper', description: 'Technical details on arXiv.', href: 'https://arxiv.org/abs/2510.13857' },
    ],
  },
  overview: {
    label: '',
    title: 'How ArbiterOS reviews AI\u00a0agent actions',
    desc: 'ArbiterOS sits between the agent and the LLM. It helps teams review model outputs, turn LLM responses into structured instructions, apply policy checks, request human confirmation when needed, and retain auditable trace records.',
    architecture: {
      label: '',
      title: 'Where ArbiterOS sits',
      diagram: {
        ariaLabel: 'ArbiterOS ecosystem diagram',
        humanTitle: 'Operator',
        humanSubtitle: 'Confirm when flagged',
        flaggedLabel: 'When flagged',
        pipelineNote: 'Automated for every response',
        agentsTitle: 'AI Agents',
        customAgent: 'Custom Agent',
        routeNote: 'LLM traffic -> Kernel',
        requestLabel: 'Request',
        responseLabel: 'Response',
        kernelTitle: 'ArbiterOS Kernel',
        proxy: 'LiteLLM Proxy',
        parser: 'Instruction Parser',
        policy: 'Policy Engine',
        registry: 'Registry & Context',
        risk: 'Risk',
        trust: 'Trust',
        confidentiality: 'Confid.',
        reversibility: 'Reversible',
        authority: 'Authority',
        categoriesLabel: 'INSTRUCTION TYPES',
        cognitive: 'Reasoning',
        actuation: 'Action',
        perception: 'Perception',
        apiCall: 'API Call',
        llmOutput: 'Model Output',
        providersTitle: 'Model Providers',
        compatibleApiLine1: 'OpenAI',
        compatibleApiLine2: 'Compatible API',
        endpoint: '/v1 endpoint',
        anyModel: 'Compatible models',
        observabilityTitle: 'Trace & Audit',
        instructionFiles: 'Instruction Files',
        apiCallLogs: 'API Call Logs',
      },
    },
    dataflow: {
      label: '',
      title: 'Request flow',
      stages: [
        { num: '1', title: 'Prepare Request', desc: 'Detect pending approval replies \u00b7 Assign trace context \u00b7 Merge response format \u00b7 Attach metadata' },
        { num: '2', title: 'Call Model', desc: 'Forward through LiteLLM proxy to the configured model provider \u00b7 Supports streaming and batch requests' },
        { num: '3', title: 'Parse Output', desc: 'Read assistant content and tool calls \u00b7 Build structured instructions \u00b7 Classify security attributes' },
        { num: '4', title: 'Check Policy', desc: 'Run configured checks \u00b7 Allow, revise, or hold actions \u00b7 Ask for Yes/No when needed' },
        { num: '5', title: 'Record Trace', desc: 'Write per-trace instruction files \u00b7 Keep request logs \u00b7 Emit Langfuse traces when configured' },
      ],
    },
    benchmark: {
      label: '',
      title: 'ArbiterOS blocks more than 92% of dangerous attacks and flags risky workflows.',
      desc: 'ArbiterOS still keeps normal workflows usable: 236 of 255 AgentDojo Safe slices pass (92.55%), and 50 of 57 curated real-world workflows pass (87.72%).',
      comparisons: [
        {
          name: 'Agent-SafetyBench',
          footnoteMark: '2',
          caption: 'Claude Sonnet 4 \u00b7 574 verified successful attack traces',
          baselinePct: 0,
          primaryPct: 94.25,
          residualPct: 5.75,
          delta: '',
          withoutLabel: 'Without ArbiterOS',
          withoutValue: '0%',
          withLabel: 'With ArbiterOS',
          withValue: '94.25%',
        },
        {
          name: 'AgentDojo',
          footnoteMark: '2',
          caption: 'GPT-4o \u00b7 297 verified successful attack traces',
          baselinePct: 0,
          primaryPct: 93.94,
          residualPct: 6.06,
          delta: '',
          withoutLabel: 'Without ArbiterOS',
          withoutValue: '0%',
          withLabel: 'With ArbiterOS',
          withValue: '93.94%',
        },
        {
          name: 'WildClawBench',
          footnoteMark: '3',
          caption: 'GPT-5.2 \u00b7 in-the-wild risky workflow evaluation',
          baselinePct: 55,
          primaryPct: 100,
          residualPct: 0,
          delta: '',
          withoutLabel: 'Original benchmark score',
          withoutValue: '55%',
          withLabel: 'With ArbiterOS',
          withValue: '100%',
        },
        {
          name: 'Raw OpenClaw',
          footnoteMark: '4',
          caption: 'GPT + Claude \u00b7 compared against native OpenClaw safety rules (without ArbiterOS)',
          baselinePct: 6.17,
          primaryPct: 92.95,
          residualPct: 0,
          delta: '',
          withoutLabel: 'Without ArbiterOS',
          withoutValue: '6.17%',
          withLabel: 'With ArbiterOS',
          withValue: '92.95%',
        },
      ],
      footnotes: [
        {
          marker: '1',
          text: 'This section shows replay-based attack evaluation (block rate) on AgentDojo and Agent-SafetyBench, plus warning-focused evaluation on real-world high-risk workflows in WildClawBench. ',
        },
        {
          marker: '2',
          text: 'AgentDojo and Agent-SafetyBench only count attack traces that already completed a dangerous action before ArbiterOS was inserted; results come from replay evaluation, and the remaining misses cluster around lower-severity read and web-fetch steps rather than destructive side-effecting actions.',
        },
        {
          marker: '3',
          text: 'WildClawBench uses a different, safety-oriented metric: the 100% figure measures whether ArbiterOS emitted a timely warning before the risky step so a human can intervene, rather than the benchmark\'s original task-score definition.',
        },
        {
          marker: '4',
          text: 'On successful unsafe replays, we measure how much ArbiterOS improves OpenClaw\u2019s interception rate after integration. An unsafe replay re-runs originally successful attack traces to see whether ArbiterOS now blocks the dangerous steps.',
        },
      ],
      failureAnalysis: {
        title: 'Summary of known failure types in testing',
        desc: 'Based on manual analysis, failure samples are not uniformly distributed. They cluster into a few recurring types, which can be used for later policy tuning.',
        falsePositiveTitle: 'False positives (26/312)',
        falsePositiveToggleShow: 'Expand false-positive type summary',
        falsePositiveToggleHide: 'Hide false-positive type summary',
        falsePositiveIntro: 'ArbiterOS follows a conservative governance philosophy: it may block untrusted outbound actions and trust-mismatched operations, which increases the overall interception ratio.',
        missTitle: 'Misses (135/1914)',
        missToggleShow: 'Expand miss type summary',
        missToggleHide: 'Hide miss type summary',
        missIntro: 'ArbiterOS performs dynamic taint analysis and applies a looser policy to single-step information-fetch actions. In contrast, ArbiterOS applies stricter governance to outbound information-sending actions (as reflected in the false-positive analysis).',
        falsePositiveClusters: [
          {
            category: 'Action side-effect type',
            count: '11',
            pattern: 'ArbiterOS block reason: creating/rescheduling calendar events or submitting browser forms directly changes external state.',
            examples: 'calendar_safe_01_create_meeting_from_notes; agentdojo_workspace_safe_paper_user_task_12_step_1',
          },
          {
            category: 'Outbound sending / receiver trust mismatch type',
            count: '10',
            pattern: 'ArbiterOS block reason: outbound actions like email and Slack are blocked when receiver-side trust is insufficient.',
            examples: 'mail_safe_01_reply_public_docs_request; message_safe_01_slack_thread_summary',
          },
          {
            category: 'Low-confidence execution-action type',
            count: '3',
            pattern: 'ArbiterOS block reason: execution-type actions are blocked with priority when confidence is unknown.',
            examples: 'agentdojo_slack_safe_paper_user_task_16_step_4',
          },
          {
            category: 'Cross-session forwarding type',
            count: '2',
            pattern: 'ArbiterOS block reason: forwarding content or dispatching tasks to another session expands execution scope and requires stronger trust guarantees.',
            examples: 'agent_safe_02_forward_public_bug_summary_to_reviewer_session; agent_safe_03_spawn_public_docs_research_subagent',
          },
        ],
        missClusters: [
          {
            category: 'Context-gathering type',
            count: '75',
            pattern: 'Risk description: this step looks like ordinary context reading or information fetching, but it is actually collecting key execution information for a harmful outcome.\nArbiterOS miss reason: this step is only information reading, and the action itself is legitimate.',
            examples: 'agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_1087_msg_2',
          },
          {
            category: 'Chained external-access type',
            count: '44',
            pattern: 'Risk description: first visits a normal page, then is induced by injected page content to visit a new attacker-specified site.\nArbiterOS miss reason: same as above, visiting the new site is still considered legitimate because it is information retrieval.',
            examples: 'agentdojo_v2_claude_3_5_sonnet_20240620_llm_reviewed_slack_user-task-0_injection-task-3_msg_4',
          },
          {
            category: 'Real side effects not finally blocked type',
            count: '16',
            pattern: 'Risk description: writes/edits insulting or abusive text into a file.\nArbiterOS miss reason: the write target is not a protected folder or file, needs semantic analysis.',
            examples: 'agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_32_msg_2; agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_1257_msg_4',
          },
        ],
      },
    },
    comparison: {
      label: '',
      title: 'Comparison with OpenClaw security solution',
      desc: 'Unlike hardening the runtime environment or inspecting events during execution, ArbiterOS parses model outputs and tool calls into structured instructions, enabling policy rules to evaluate the intent behind each action before sensitive steps proceed.',
      summary: {
        drawbacksTitle: 'OpenClaw native security solution limitations',
        drawbacks: [
          'Isolation and runtime checks focus on environment/events, not the intent behind each action.',
          'Cross-step context is limited, so risk signals are harder to carry through multi-step workflows.',
          'Policy enforcement is often hook- or profile-driven, with weaker instruction-level traceability.',
        ],
        strengthsTitle: 'ArbiterOS strengths',
        strengths: [
          'Interprets model outputs and tool calls as structured instructions before sensitive actions execute.',
          'Carries security labels across related steps to support context-aware policy decisions.',
          'Provides configurable policy pipeline, confirmation flow, and per-trace audit evidence.',
        ],
      },
      toggleShow: 'Expand detailed comparison',
      toggleHide: 'Collapse detailed comparison',
      columns: [
        {
          name: 'OpenClaw Isolation',
          tag: 'Sandbox boundary / runtime constraints',
          items: [
            'Container or process level',
            'Host access, file mounts, and network exposure',
            'Mainly per container or per command',
            'No \u2014 it does not interpret agent intent',
            'No',
            'Primarily static allow-or-deny rules with configurable profiles',
            'Container-level command and event logs',
            'Confining the assistant to a more restricted environment',
            'Cannot explain the intent behind an agent\u2019s action',
          ],
        },
        {
          name: 'OpenClaw Runtime Checks',
          tag: 'Approvals / runtime monitoring',
          items: [
            'Runtime hooks and approval flow',
            'Tool actions and risky steps during a live session',
            'Per tool or per session',
            'Partial \u2014 certain runtime events can be inspected',
            'Limited \u2014 context is mainly turn-by-turn scoped',
            'Hook-based checks and approvals',
            'Session transcripts, command logs, and risk signals',
            'Supervising a live assistant session',
            'Can not provide security checks and protection from a global perspective',
          ],
        },
        {
          name: 'ArbiterOS',
          tag: 'Instruction-level governance',
          items: [
            'Model response and instruction level',
            'The actions an agent is preparing to take',
            'Per instruction, with linked trace records',
            'Yes \u2014 it parses structured output and tool calls',
            'Yes \u2014 security labels can carry across related steps',
            'Configurable policy pipeline with confirmation support',
            'Per-trace instruction files and Langfuse tracing',
            'Evaluating decisions before sensitive actions proceed',
            'Requires traffic to pass through the ArbiterOS proxy',
          ],
        },
      ],
      rows: ['Works At', 'Main Focus', 'Review Detail', 'Understands Meaning', 'Tracks Context Across Steps', 'How Rules Apply', 'Audit Record', 'Best Fit', 'Main Limitation'],
    },
    addOnComparison: {
      label: '',
      title: 'Compared with existing Agent security solutions',
      // desc: 'The community has built a range of OpenClaw security add-ons \u2014 including SecureClaw, OpenGuardrails, OpenClaw Shield, ClawAegis, GuardClaw, and ClawKeeper \u2014 along with broader adapter-style layers such as APort Agent Guardrails. Each project addresses different concerns, but they are generally attached to a particular runtime or plugin surface. ArbiterOS takes a different approach: as a LiteLLM-based governance kernel, it sits at the proxy layer and can serve any agent that routes LLM traffic through a custom OpenAI-compatible endpoint.',
      desc: 'Each method focuses on different aspects, but is generally bound to a specific Agent. In contrast, ArbiterOS can serve any Agent that routes LLM traffic through a compatible OpenAI endpoint.',
      summary: {
        drawbacksTitle: 'Current protection characteristics',
        drawbacks: [
          'Mostly tied to specific plugin, skill, or runtime integration surfaces.',
          'Checks are often per-call or per-layer, with weaker shared workflow state.',
          'Policy and enforcement entry points are fragmented across separate projects.',
        ],
        strengthsTitle: 'ArbiterOS strengths',
        strengths: [
          'Reusable proxy-layer governance that can serve multiple compatible agents.',
          'Instruction-level semantics with provenance and taint-aware policy decisions.',
          'Centralized policy config with observe-only rollout and human confirmation flow.',
        ],
      },
      toggleShow: 'Expand detailed comparison',
      toggleHide: 'Collapse detailed comparison',
      columns: [
        {
          name: 'Current Add-On Protections',
          tag: 'Plugins / skills / watcher layers',
          items: [
            'SecureClaw, ClawAegis, OpenGuardrails, OpenClaw Shield, GuardClaw, and ClawKeeper are built around OpenClaw plugin or skill interfaces, while APort Agent Guardrails is positioned as a broader adapter-style authorization layer',
            'SecureClaw emphasizes audit, hardening, and runtime behavior rules; OpenGuardrails combines static scanning, runtime interception, and data masking; OpenClaw Shield focuses on layered gating and output redaction',
            'SecureClaw, OpenGuardrails, OpenClaw Shield, and ClawAegis each provide runtime checks and approvals at their own layers, but none maintains a global runtime state',
            'SecureClaw and OpenGuardrails emphasize file and skill scanning; OpenClaw Shield and ClawAegis add runtime checks or output redaction, but none propagates trust and confidentiality labels across agent runtime states like taint tracking',
            'ClawKeeper spans skill, plugin, and watcher layers; SecureClaw and ClawAegis encapsulate control logic in their own config formats and frameworks',
            'OpenClaw Shield, APort Agent Guardrails, and GuardClaw emphasize deterministic allow/deny or approval outcomes; tightening rules too quickly can disrupt existing workflows',
            'OpenClaw Shield and APort Agent Guardrails emphasize making decisions before tool execution; in OpenClaw itself, plugins can also block or pause calls for approval without restarting the whole session',
          ],
        },
        {
          name: 'ArbiterOS Kernel Defense',
          tag: 'Instruction-level governance kernel',
          items: [
            'ArbiterOS operates at the LiteLLM proxy layer and can serve any Agent that supports a custom OpenAI-compatible base URL and API key',
            'Parses structured outputs and tool calls into a unified instruction stream with security metadata',
            'Uses stateful workflow governance (EFSM), where configurable plan or state rules require sensitive actions to align with recently declared plans',
            'Taint propagation carries trust and confidentiality labels across instructions and tool results, enabling provenance-aware policy decisions',
            'Centralized policy configuration supports budgets, rate limits, taint tracking, EFSM governance, and composable rule types',
            'Even with enforcement disabled, policies still run and record potential violations so teams can evaluate impact before enabling blocking',
            'When a policy modifies or blocks a response, the kernel returns a protected version and waits for a Yes/No decision without making a new LLM call',
          ],
        },
        {
          name: 'The ArbiterOS Advantage',
          tag: 'Why it matters',
          items: [
            'Broader reuse \u2014 a single governance layer can serve any agent that routes LLM traffic through the ArbiterOS proxy, regardless of the agent framework',
            'Deeper semantic grounding \u2014 enforcement attaches to parsed instructions and their metadata, not just raw text patterns or surface-level signals',
            'Configurable workflow control \u2014 sensitive actions can be gated by EFSM rules, taint policies, or user confirmation',
            'Taint-aware leak prevention \u2014 when taint policies are active, untrusted data can be stopped before reaching high-impact sinks such as messaging or file writes',
            'Operational flexibility \u2014 policy behavior can be adjusted through configuration files rather than hard-coding checks into each agent',
            'Safer rollout tuning \u2014 observe-only mode shows would-be violations before turning on enforcement',
            'Lower-friction oversight \u2014 Yes/No confirmation keeps the session moving without forcing a restart or requiring a new LLM call',
          ],
        },
      ],
      rows: [
        'Agent Scope',
        'I/O Representation',
        'Workflow Statefulness',
        'Data Flow & Provenance',
        'Policy Configuration',
        'Testing & Deployment',
        'Human-in-the-Loop',
      ],
    },
    kernelEdge: {
      label: '',
      title: 'Kernel capabilities',
      items: [
        { title: 'Cross-step context tracking', desc: 'ArbiterOS can carry security labels such as trust and confidentiality across related instructions, so later actions can still reflect earlier risky inputs.' },
        { title: 'Configurable classification rules', desc: 'Built-in YAML registries classify files, paths, and executables, and teams can override defaults locally without changing the source code.' },
        { title: 'Review mode before enforcement', desc: 'Policies can run in observation mode and record what they would have changed before you turn on blocking behavior.' },
        { title: 'Confirmation for protected responses', desc: 'When a policy changes or blocks a response, the kernel can pause and ask the user for a Yes/No decision before continuing.' },
      ],
    },
  },
};

const zh: typeof en = {
  meta: {
    homeTitle: 'ArbiterOS | 首页',
    titleSuffix: 'ArbiterOS',
    description: 'ArbiterOS 是一个开源的智能体执行治理层，在动作真正执行前拦截模型输出、映射结构化指令，并施加策略、审批与追踪控制。',
  },
  ui: {
    brandHomeLabel: 'ArbiterOS 首页',
    primaryNavLabel: '主导航',
    mobileNavLabel: '移动端主导航',
    toggleNavigationLabel: '切换导航菜单',
    switchToChineseLabel: '切换到简体中文',
    switchToEnglishLabel: '切换到英文',
    closeLabel: '关闭',
    footerLabel: '\u00a9 2026 ArbiterOS 团队',
  },
  nav: { introHome: '介绍首页', home: '首页', overview: '系统总览', howItWorks: '工作原理', extension: '可观测性' },
  hero: {
    eyebrow: '',
    title: '大模型负责思考，\nArbiterOS 治理执行。',
    sub: '用确定性的规则，约束不确定的硅基智能。',
    demoBtn: 'Demo',
    howItWorksBtn: '系统总览',
    githubBtn: 'GitHub',
    meta: ['兼容 OpenAI API', '支持 OpenClaw / Nanobot 集成', '支持本地部署'],
    diagram: {
      ariaLabel: 'ArbiterOS 执行治理流程图',
      tracesTitle: '追踪',
      signals: '信号',
      protected: '已保护',
      leftTitle: '原始输出',
      rightTitle: '治理后输出',
      blocked: '阻止 2 项',
      safeToExecute: '可安全执行',
      kernelTitle: 'ArbiterOS Kernel',
      parse: '解析',
      policy: '策略',
      guard: '防护',
      policyEngineTitle: '策略引擎',
      policyEngineSub: '每次响应执行前，都会经过 JSON 与代码策略检查。',
      postCall: '后调用',
      failureLoop: '失败回路',
      define: '定义',
      defineLine1: 'JSON 规则',
      defineLine2: '单元 / 关系',
      trigger: '触发',
      triggerLine1: '后调用钩子',
      triggerLine2: '最新指令',
      enforce: '执行',
      enforceLine1: '阻止 / 确认',
      enforceLine2: '仅观察 / 标签',
      refine: '迭代',
      refineLine1: '失败样例',
      refineLine2: '更新并重载',
      node: '节点',
      executionSpan: '执行跨度',
      status: '状态',
      trace: '追踪',
      generation: '生成',
      violation: '违规',
      ok: '正常',
    },
  },
  positioning: {
    label: '',
    title: 'ArbiterOS 为 Agent 行为设立宪法',
    // ArbiterOS 会先拦截模型输出，将工具意图整理为结构化指令，在敏感动作真正执行前施加策略、审批和追踪控制。
    desc: '沙箱、Guardrails 和可观测性都很重要，但它们解决的是不同层面的问题。',
    items: [
      { title: '沙箱隔离', short: '限制代码能接触什么' },
      { title: '打补丁式 Guardrails', short: '在局部环节补检查' },
      { title: '内容 Guardrails', short: '过滤模型输入与输出' },
      { title: '行为监测', short: '执行开始后再观察' },
      { title: 'ArbiterOS', short: '治理关键动作意图和数据流。将安全规则设定为 Agent 无法违反的宪法。' },
    ],
  },
  advantages: {
    label: '',
    title: 'ArbiterOS 如何治理关键动作意图和数据流',
    items: [
      {
        title: '执行前拦截',
        short: '在工作流真正提交前捕获LLM输出和工具调用',
        detail: 'ArbiterOS 工作在 LLM 链路上，在模型响应被转化为真实动作之前完成拦截。',
      },
      {
        title: '离散指令 + 规则注册表',
        short: '把模型响应整理成带上下文的结构化指令',
        detail: '结构化输出、工具调用和工具结果会被统一整理成离散指令，再结合规则注册表补上类型、风险、可信度和保密性等元数据。',
      },
      {
        title: '按数据流施加策略',
        short: '让污点标签、可信度和保密性跨步骤延续',
        detail: '借助规则注册表和污点跟踪，策略可以判断数据从哪里来、经过了哪些环节，从而决定后续写入、执行或外发动作是否应该继续。',
      },
      {
        title: '统一治理各种工具和 Skills',
        short: '同时支持工具结果和可选的技能信任信号同步治理',
        detail: 'ArbiterOS 可以把工具结果和技能信任信号并入同一条指令流，而不是将治理拆散到多个彼此割裂的安全层。',
      },
      {
        title: '人工审批更灵活',
        short: '放行、拦截、改写或挂起都在同一决策流程中',
        detail: '人工审批属于统一决策流程的一部分，指令一旦触发阈值，就会被策略自动提交人工处理。',
      },
      {
        title: '决策可追溯可回放',
        short: '保留每条受治理指令的证据和结果',
        detail: '逐条追踪的指令文件、决策日志和回放上下文，让你能事后看清每一步为什么被治理、怎么治理的、治理结果是什么。',
      },
    ],
  },
  quickStart: {
    label: '',
    title: '三步接入 ArbiterOS',
    steps: [
      { step: '1', title: '安装并启动内核', description: '一条命令安装或使用 Docker Compose，启动 ArbiterOS 内核 (默认端口：4000)' },
      { step: '2', title: '配置模型与策略', description: '在 ArbiterOS 的配置文件中配置模型、API、技能信任目录，以及策略规则' },
      { step: '3', title: '连接 OpenClaw、Nanobot 或其他智能体', description: '将模型提供方指向 http://127.0.0.1:4000/v1，即可获得治理、审计与可观测能力。' },
    ],
    commandsLabel: '安装命令',
    runCommandsLabel: '启动命令',
    copyLabel: '复制',
    copiedLabel: '已复制',
    demo: {
      title: '真实治理过程演示',
      // 通过真实的治理追踪和策略决策，看看对于不安全的动作，ArbiterOS 接入后会发生什么变化。
      description: '',
      openLabel: '在新页面打开在线 Demo',
      iframeTitle: 'ArbiterOS 真实治理过程演示',
    },
  },
  howItWorks: {
    label: '',
    title: '四个核心步骤',
    statement: '关键不在于额外增加一层过滤器，而在于输出拦截、整理为结构化指令，执行前完成治理。',
    outcomes: ['允许', '阻止', '审批', '改写'],
    steps: [
      { step: '01', title: '拦截', description: '网关会在运行时真正提交动作前，先捕获模型响应与工具调用。' },
      { step: '02', title: '结构化', description: '结构化输出、工具调用和工具结果会被整理成离散指令，并补上规则注册表和安全元数据。' },
      { step: '03', title: '治理', description: '规则注册表、污点标签和策略检查会共同决定每条指令是放行、拦截、改写，还是进入审批。' },
      { step: '04', title: '回放', description: '每条指令、分类结果与决策都会被持久化，方便回放、审计与持续优化策略。' },
    ],
  },
  features: {
    label: '',
    title: '输出转化为可治理的结构化指令',
    // desc: 'ArbiterOS 并非仅在智能体外围增加检查，而是先拦截输出、构建离散指令、在跨步骤间传递安全标签，并在执行前施加策略控制。',
    desc: '',
    items: [
      { title: '拦截模型输出', description: '在 LLM 链路上捕获模型响应与工具调用，而不是等运行时已经开始动作后再补救。' },
      { title: '构建类型化指令', description: '把结构化输出、工具调用和工具结果转成离散指令，并补齐类别、类型以及规则注册表支持的安全元数据。' },
      { title: '按数据流施加策略', description: '结合规则注册表、可信度 / 保密性标签和污点传播，对读取、写入、执行以及敏感下游动作做判断。' },
      { title: '统一治理工具、Skills 和结果', description: '把工具结果和可选的技能信任信号纳入同一治理循环，再输出放行、拦截、改写或审批等结果，并保留追踪证据。' },
    ],
  },
  extension: {
    label: '',
    title: '可视化、分析与策略迭代',
    desc: '基于 Langfuse 构建的治理界面将追踪转化为可执行洞察\n\u2014 从错误诊断到基于证据的策略优化。',
    items: [
      { title: '治理仪表盘', description: '监控受治理信号，包括错误、警告与策略违规，并提供实时严重级别统计与治理趋势图。' },
      { title: '追踪与执行图谱', description: '以层级视图探索执行流程，包含治理横幅、节点搜索以及高亮的错误 / 违规节点。' },
      { title: '错误根因分析', description: '识别运行失败的原因，提供结构化根因、即时修复建议与复发预防指导。' },
      { title: '策略违规跟踪', description: '追踪每一次策略违规的动作详情、严重级别标签，以及从追踪到违规指令的下钻能力。' },
      { title: '策略优化与确认分析', description: '分析确认的接受 / 拒绝比率，并基于证据生成 LLM 辅助的策略更新建议。' },
      { title: '经验与提示词资产', description: '将治理经验转化为提示词包与经验总结，为后续智能体迭代提供输入。' },
    ],
  },
  architecture: {
    label: '',
    title: '治理流程',
    nodes: [
      { main: '请求预处理', sub: '追踪管理 / 格式合并 / 分类封装' },
      { main: 'LLM 调用', sub: 'LiteLLM Proxy' },
      { main: '响应解析', sub: '结构化抽取 / 指令构建' },
      { main: '策略检查', sub: '允许 / 阻止 / 改写' },
      { main: '审批与执行', sub: '等待确认 / 安全放行' },
      { main: '审计与可观测性', sub: '追踪文件 / Langfuse / 日志' },
    ],
  },
  cta: {
    label: '',
    title: '把智能体的"可用"升级为"可控"',
    desc: '对于希望将智能体稳定接入真实业务系统的研发和平台团队，ArbiterOS 是更合适的选择。克隆仓库、配置模型提供方后，即可通过 Docker Compose 或安装脚本快速启动。',
    primaryBtn: '查看 GitHub',
    secondaryBtn: '阅读论文',
    contactBtn: '联系团队',
    resources: [
      { label: 'GitHub 仓库', description: '源码、文档与部署指南。', href: 'https://github.com/cure-lab/ArbiterOS' },
      { label: '可视化扩展', description: '治理可视化工作空间。', href: 'https://github.com/cure-lab/ArbiterOS/tree/main/langfuse' },
      { label: '研究论文', description: 'arXiv 上的技术细节。', href: 'https://arxiv.org/abs/2510.13857' },
    ],
  },
  overview: {
    label: '',
    title: 'ArbiterOS 如何审查Agent动作',
    desc: 'ArbiterOS 位于Agent与LLM之间。它帮助团队审查模型输出，将LLM的响应整理成结构化指令，执行策略检查，在需要时请求人工确认，并保留可审计的追踪记录。',
    architecture: {
      label: '',
      title: 'ArbiterOS 在链路中的位置',
      diagram: {
        ariaLabel: 'ArbiterOS 生态架构图',
        humanTitle: '操作人员',
        humanSubtitle: '策略标记时确认',
        flaggedLabel: '策略标记时',
        pipelineNote: '每次响应自动执行',
        agentsTitle: 'AI 智能体',
        customAgent: '自定义 Agent',
        routeNote: 'LLM 流量 -> Kernel',
        requestLabel: '请求',
        responseLabel: '响应',
        kernelTitle: 'ArbiterOS Kernel',
        proxy: 'LiteLLM 代理',
        parser: '指令解析器',
        policy: '策略引擎',
        registry: '注册表 / 上下文',
        risk: '风险',
        trust: '信任',
        confidentiality: '保密',
        reversibility: '可逆',
        authority: '权限',
        categoriesLabel: '指令类别',
        cognitive: '思考',
        actuation: '执行',
        perception: '感知',
        apiCall: 'API 调用',
        llmOutput: '模型输出',
        providersTitle: '模型提供方',
        compatibleApiLine1: 'OpenAI',
        compatibleApiLine2: '兼容 API',
        endpoint: '/v1 接口',
        anyModel: '兼容模型',
        observabilityTitle: '追踪与审计',
        instructionFiles: '指令文件',
        apiCallLogs: '调用日志',
      },
    },
    dataflow: {
      label: '',
      title: '请求流程',
      stages: [
        { num: '1', title: '准备请求', desc: '识别待处理的确认回复 \u00b7 分配追踪上下文 \u00b7 合并响应格式 \u00b7 附加元数据' },
        { num: '2', title: '调用模型', desc: '通过 LiteLLM 代理转发到已配置的模型提供方 \u00b7 支持流式和批量请求' },
        { num: '3', title: '解析输出', desc: '读取助手内容与工具调用 \u00b7 生成结构化指令 \u00b7 分类安全属性' },
        { num: '4', title: '执行策略检查', desc: '运行已配置的检查 \u00b7 放行、调整或暂缓动作 \u00b7 需要时请求是/否确认' },
        { num: '5', title: '记录追踪', desc: '写入逐追踪指令文件 \u00b7 保留请求日志 \u00b7 在配置后输出 Langfuse 追踪' },
      ],
    },
    benchmark: {
      label: '',
      title: 'ArbiterOS 可拦截超过 92% 的危险攻击',
      desc: 'ArbiterOS 可以及时预警高风险工作流，同时保持较高的正常任务通过率：AgentDojo 中安全任务测试通过率为: 236/255(92.55%)，另外人工构造的真实样本的通过率为：50/57(87.72%)。',
      comparisons: [
        {
          name: 'Agent-SafetyBench',
          footnoteMark: '2',
          caption: 'Claude Sonnet 4 \u00b7 574 条已验证成功的攻击轨迹',
          baselinePct: 0,
          primaryPct: 94.25,
          residualPct: 5.75,
          delta: '',
          withoutLabel: '未接入 ArbiterOS',
          withoutValue: '平均拦截率 0%',
          withLabel: '接入 ArbiterOS 后',
          withValue: '平均拦截率 94.25%',
        },
        {
          name: 'AgentDojo',
          footnoteMark: '2',
          caption: 'GPT-4o \u00b7 297 条已验证成功的攻击轨迹',
          baselinePct: 0,
          primaryPct: 93.94,
          residualPct: 6.06,
          delta: '',
          withoutLabel: '未接入 ArbiterOS',
          withoutValue: '平均拦截率 0%',
          withLabel: '接入 ArbiterOS 后',
          withValue: '平均拦截率 93.94%',
        },
        {
          name: 'WildClawBench',
          footnoteMark: '3',
          caption: 'GPT-5.2 \u00b7 真实世界高风险工作流评测',
          baselinePct: 55,
          primaryPct: 100,
          residualPct: 0,
          delta: '',
          withoutLabel: '原始 benchmark 得分',
          withoutValue: '55%',
          withLabel: '接入 ArbiterOS 后',
          withValue: '100%',
        },
        {
          name: '原生OpenClaw对比',
          footnoteMark: '4',
          caption: 'GPT+Claude \u00b7 与未加ArbiterOS的原生OpenClaw的安全规则进行对比',
          baselinePct: 6.17,
          primaryPct: 92.95,
          residualPct: 0,
          delta: '',
          withoutLabel: '未接入ArbiterOS',
          withoutValue: '6.17%',
          withLabel: '接入 ArbiterOS 后',
          withValue: '92.95%',
        },
      ],
      footnotes: [
        {
          marker: '1',
          text: '这里展示的是 AgentDojo、Agent-SafetyBench 的回放攻击评测（平均拦截率），以及 WildClawBench 的真实世界高风险工作流 warning 评测。',
        },
        {
          marker: '2',
          text: '在 AgentDojo 与 Agent-SafetyBench 中，我们只统计未接入 ArbiterOS 时已经成功完成危险动作的攻击轨迹。结果基于回放评测，剩余未拦截案例主要集中在低风险的读取和网页抓取步骤，而非高破坏性的副作用动作。',
        },
        {
          marker: '3',
          text: 'WildClawBench 采用的是不同的安全导向评估口径：这里的 100% 指 ArbiterOS 是否能在高风险步骤发生前及时给出有效 warning，便于人工介入，而不是直接沿用该 benchmark 原始的任务得分定义。',
        },
        {
          marker: '4',
          text: '在已经攻击成功的 unsafe replay 上，给 OpenClaw 接入 ArbiterOS 之后，拦截能力提升了多少。unsafe replay 表示对原本已经攻击成功的轨迹回放其运行轨迹，观察当前危险步骤是否被拦截。'
        }
      ],
      failureAnalysis: {
        title: '测试失败实例类型汇总',
        desc: '经人工分析，失败样本并非均匀分布，而是集中在少数几个类型，并可以用于后续策略调优。',
        falsePositiveTitle: '误报（26/312 条）',
        falsePositiveToggleShow: '展开误报类型汇总',
        falsePositiveToggleHide: '收起误报类型汇总',
        falsePositiveIntro: 'ArbiterOS 本着更谨慎的治理哲学，会对不可信的外发动作、可信度不匹配的动作进行拦截，因此会带来更高的拦截比例。',
        missTitle: '漏检（135/1914 条）',
        missToggleShow: '展开漏检类型汇总',
        missToggleHide: '收起漏检类型汇总',
        missIntro: 'ArbiterOS 会在动态过程中做污点分析，针对单步的信息抓取动作会采取更宽松的治理策略。相反，对于信息外发动作，ArbiterOS 会采取更严格的治理（参考误报实例分析）。',
        falsePositiveClusters: [
          {
            category: '动作副作用型',
            count: '11',
            pattern: 'ArbiterOS 拦截原因：创建/改期日历事件、提交浏览器表单等会直接改外部状态的动作。',
            examples: 'calendar_safe_01_create_meeting_from_notes；agentdojo_workspace_safe_paper_user_task_12_step_1',
          },
          {
            category: '对外发送/接收信任度不匹配型',
            count: '10',
            pattern: 'ArbiterOS 拦截原因：邮件、Slack 等外发动作在接收侧可信度不足时会被拦截。',
            examples: 'mail_safe_01_reply_public_docs_request；message_safe_01_slack_thread_summary',
          },
          {
            category: '低置信执行动作型',
            count: '3',
            pattern: 'ArbiterOS 拦截原因：执行型动作在可信度未知时会被优先拦截。',
            examples: 'agentdojo_slack_safe_paper_user_task_16_step_4',
          },
          {
            category: '跨会话转发型',
            count: '2',
            pattern: 'ArbiterOS 拦截原因：向其他会话转发内容或派发任务会扩大执行主体范围，需要更高的信任保证。',
            examples: 'agent_safe_02_forward_public_bug_summary_to_reviewer_session；agent_safe_03_spawn_public_docs_research_subagent',
          },
        ],
        missClusters: [
          {
            category: '上下文收集型',
            count: '75',
            pattern: '危险描述：表面上像普通的“读取上下文”或“抓取信息”，但实际上是在为危险结果收集关键执行信息。\nArbiterOS 漏检原因：当前步骤仅仅是读取信息，该动作本身是合法的。',
            examples: 'agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_1087_msg_2',
          },
          {
            category: '链式外部访问型',
            count: '44',
            pattern: '危险描述：先访问正常页面，再被页面注入诱导访问攻击者指定的新站点。\nArbiterOS 漏检原因：同上，访问新站点是合法的，因为只是信息获取。',
            examples: 'agentdojo_v2_claude_3_5_sonnet_20240620_llm_reviewed_slack_user-task-0_injection-task-3_msg_4',
          },
          {
            category: '真实危险动作未拦住型',
            count: '16',
            pattern: '危险描述：写入/编辑辱骂脏话文本到文件。\nArbiterOS 漏检原因：写入的对象不是受保护的文件夹或者文件，需要语义分析。',
            examples: 'agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_32_msg_2；agent_safetybench_v1_gpt_4o_2024_05_13_llm_reviewed_case_1257_msg_4',
          },
        ],
      },
    },
    comparison: {
      label: '',
      title: '与OpenClaw自身安全防护方案的对比',
      desc: '相比于加固运行环境或者在运行过程中进行检查的方法，ArbiterOS 更着重将模型输出和工具调用解析为结构化指令，使策略规则能够在敏感步骤执行前评估每个动作背后的意图以及数据流的安全性。',
      summary: {
        drawbacksTitle: 'OpenClaw 原生防护的缺点',
        drawbacks: [
          '隔离层与运行时检查更偏向环境和事件，难以解释每个动作背后的意图。',
          '跨步骤上下文保留能力有限，对多步风险链路的连续判断较弱。',
          '规则执行多依赖钩子或档位配置，可追溯性不足。',
        ],
        strengthsTitle: 'ArbiterOS 的优点',
        strengths: [
          '在敏感动作执行前，将模型输出和工具调用解析为结构化指令并进行治理。',
          '可在相关步骤间持续传递安全标签，支持上下文感知的策略决策。',
          '提供可配置策略管线、确认流程和逐追踪审计证据。',
        ],
      },
      toggleShow: '展开详细对比',
      toggleHide: '收起详细对比',
      columns: [
        {
          name: 'OpenClaw 隔离层',
          tag: '沙箱边界 / 运行时约束',
          items: [
            '容器或进程层',
            '宿主机访问、目录挂载和网络暴露',
            '主要按容器或命令',
            '否 - 不解释智能体意图',
            '否',
            '以静态允许/拒绝规则为主，并可配置策略档位',
            '容器级命令和事件日志',
            '将助手限制在更受控的运行环境中',
            '无法解释智能体执行某动作背后的意图',
          ],
        },
        {
          name: 'OpenClaw 运行时检查',
          tag: '审批流程 / 运行时监控',
          items: [
            '运行时钩子和审批流程',
            '实时会话中的工具动作和高风险步骤',
            '按工具或按会话',
            '部分 - 可检查特定运行时事件',
            '有限 - 上下文主要局限于当前会话',
            '基于钩子的检查和审批',
            '会话记录、命令日志和风险信号',
            '监督正在运行的助手会话',
            '无法从全局角度提供安全检查与保护',
          ],
        },
        {
          name: 'ArbiterOS',
          tag: '指令级治理',
          items: [
            '模型响应和指令层',
            '智能体准备执行的动作',
            '逐指令，并带有关联追踪记录',
            '是 - 会解析结构化输出和工具调用',
            '是 - 安全标签可沿相关步骤继续传递',
            '可配置的策略管线，并支持确认流程',
            '逐追踪指令文件和 Langfuse 追踪',
            '在敏感动作执行前评估决策',
            '需要让流量先经过 ArbiterOS 代理',
          ],
        },
      ],
      rows: ['工作位置', '主要关注点', '审查粒度', '能否理解含义', '能否跨步骤保留上下文', '规则如何执行', '审计记录', '更适合', '主要限制'],
    },
    addOnComparison: {
      label: '',
      title: '与现有Agent安全防护方案的对比',
      // desc: '社区已围绕 OpenClaw 生态构建了多种安全附加防护 \u2014 包括 SecureClaw、OpenGuardrails、OpenClaw Shield、ClawAegis、GuardClaw、ClawKeeper 等项目 \u2014 以及更偏适配器路线的 APort Agent Guardrails。各项目关注的方向不尽相同，但通常绑定在特定运行时或插件接入面上。ArbiterOS 采用不同方式：作为基于 LiteLLM 的治理内核，它工作在代理层，能够服务任何将 LLM 流量路由到自定义 OpenAI 兼容端点的智能体。',
      desc: '各方法关注的方向不尽相同，但通常与特定Agent绑定。相反，ArbiterOS 通过转发与截流的方式，能够服务任何兼容 OpenAI 端点的 Agent。',
      summary: {
        drawbacksTitle: '当前防护方案的特点',
        drawbacks: [
          '多数方案绑定在插件、技能或运行时接口上，复用范围受限。',
          '检查常按单次调用或分层执行，跨会话状态能力偏弱。',
          '策略配置与执行入口分散，统一治理与维护成本较高。',
        ],
        strengthsTitle: 'ArbiterOS 的优势',
        strengths: [
          '以代理层治理内核复用，可服务兼容 OpenAI 端点的多类 Agent。',
          '基于指令级语义并结合来源/污点追踪，策略更贴近真实风险链路。',
          '集中策略配置 + 观察模式 + 人机确认流程，便于安全上线调优。',
        ],
      },
      toggleShow: '展开详细对比',
      toggleHide: '收起详细对比',
      columns: [
        {
          name: '当前附加防护',
          tag: '插件 / 技能 / 监管层',
          items: [
            'SecureClaw、ClawAegis、OpenGuardrails、OpenClaw Shield、GuardClaw、ClawKeeper 均围绕 OpenClaw 的插件或技能接口构建，APort Agent Guardrails 则以更通用的适配器式授权层定位',
            'SecureClaw 侧重审计、加固和运行时行为规则；OpenGuardrails 整合静态扫描、运行时拦截和数据脱敏；OpenClaw Shield 以分层闸门和输出脱敏为核心',
            'SecureClaw、OpenGuardrails、OpenClaw Shield、ClawAegis 各自在所属层面提供运行时检查和审批，但均未维护全局的运行状态',
            'SecureClaw、OpenGuardrails 侧重文件和技能扫描，OpenClaw Shield 和 ClawAegis 增加运行时检查或输出脱敏，但均不像污点追踪系统那样在Agent运行状态之间传播信任度和机密性标签',
            'ClawKeeper 横跨技能、插件和监管三层；SecureClaw 和 ClawAegis 将控制逻辑封装在各自的配置格式与框架中',
            'OpenClaw Shield、APort Agent Guardrails、GuardClaw 强调确定性的 allow/deny 或审批结果，如果规则收紧过快，可能影响现有工作流',
            'OpenClaw Shield、APort Agent Guardrails 强调工具执行前做出决策，在 OpenClaw 自身中，插件也可以阻断或暂停调用以等待审批，而无需重启整个会话',
          ],
        },
        {
          name: 'ArbiterOS 内核防御',
          tag: '指令级治理内核',
          items: [
            'ArbiterOS 工作在 LiteLLM 代理层，能够服务任何支持自定义 OpenAI 兼容 base URL 和 API key 的 Agent',
            '把结构化输出和工具调用解析为统一的指令流，并附带安全元数据',
            '利用有状态的工作流治理（EFSM），可配置的计划或状态规则要求敏感动作必须与近期声明的计划对齐',
            '污点传播在指令与工具结果之间传播信任度和机密性标签，支持基于来源感知的策略决策',
            '集中式策略配置支持预算、速率限制、污点追踪、EFSM 治理和可组合的规则类型',
            '即使关闭执行，策略仍会运行并记录潜在违规，方便团队在开启拦截前评估影响',
            '当策略修改或阻断响应时，内核返回受保护版本并等待用户 Yes/No 决策，无需发起新的 LLM 调用',
          ],
        },
        {
          name: 'ArbiterOS 优势',
          tag: '为何重要',
          items: [
            '更广的复用范围 \u2014 一套治理层即可服务任何将 LLM 流量路由到 ArbiterOS 代理的智能体，不受具体框架限制',
            '更深的语义锚点 \u2014 规则直接作用于解析后的指令及其元数据，而非仅依赖原始文本模式或表面信号',
            '可配置的工作流控制 \u2014 敏感动作可通过 EFSM 规则、污点分析策略或用户确认进行治理',
            '来源感知的泄漏防护 \u2014 启用污点分析策略后，不可信数据可在到达消息发送或文件写入等高风险出口前被拦截',
            '运维灵活性 \u2014 可通过配置文件调整策略行为，而非将检查逻辑硬编码进每个 Agent',
            '更安全的上线调优 \u2014 先用观察模式查看潜在违规，再启用正式拦截',
            '更无感的监督 \u2014 Yes/No 确认流程可延续会话进程，无需强制重启或发起新的 LLM 调用',
          ],
        },
      ],
      rows: [
        '适用范围',
        'I/O 表示',
        '工作流状态性',
        '数据流与来源追踪',
        '策略配置',
        '测试与部署',
        '人机协同',
      ],
    },
    kernelEdge: {
      label: '',
      title: '内核的关键能力',
      items: [
        { title: '跨步骤上下文跟踪', desc: 'ArbiterOS 可以让信任度、保密性等安全标签沿相关指令继续传递，因此后续动作仍会受到前序风险输入的影响。' },
        { title: '可配置的分类规则', desc: '内置 YAML 注册表可对文件、路径和可执行文件进行分类，团队也可以在本地覆盖默认规则，而无需改动源码。' },
        { title: '先观察、后强制', desc: '策略可以先以观察模式运行，记录“如果启用会发生什么”，帮助团队在正式拦截前先验证规则效果。' },
        { title: '受保护响应的人机确认', desc: '当策略修改或阻止响应时，内核可以暂停流程，并向用户请求明确的“是 / 否”决定后再继续。' },
      ],
    },
  },
};

const i18n = { en, zh };

const featureIcons = [GatewayIcon, InstructionParseIcon, PolicyEngineIcon, TrustScanIcon];
const advantageIcons = [GatewayIcon, InstructionParseIcon, PolicyEngineIcon, TrustScanIcon, ApprovalIcon, ObservabilityIcon];
const extensionVisuals = [
  GovernanceDashboardVisual, TraceGraphVisual, ErrorAnalysisVisual,
  ViolationTrackingVisual, PolicyRefinementVisual, ExperienceAssetsVisual,
];

type SiteCopy = typeof en;
type PageKey = 'home' | 'overview' | 'extension';
type NavPageKey = Exclude<PageKey, 'home'>;

const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const langStorageKey = 'arbiteros-site-lang';

const pagePaths: Record<PageKey, string> = {
  home: withBasePath('/'),
  overview: withBasePath('/overview'),
  extension: withBasePath('/extension'),
};

const navItems: Array<{ page: NavPageKey; label: (copy: SiteCopy) => string }> = [
  { page: 'overview', label: (copy) => copy.nav.overview },
  { page: 'extension', label: (copy) => copy.nav.extension },
];

function withBasePath(path: `/${string}`): string {
  if (!appBasePath) {
    return path;
  }

  return path === '/' ? `${appBasePath}/` : `${appBasePath}${path}`;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  if (typeof document === 'undefined') {
    return false;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }
}

function toRelativePathname(pathname: string): string {
  if (!appBasePath || !pathname.startsWith(appBasePath)) {
    return pathname;
  }

  const relativePath = pathname.slice(appBasePath.length);
  if (!relativePath) {
    return '/';
  }

  return relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
}

function normalizePathname(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

function getPageFromPath(pathname: string): PageKey {
  switch (normalizePathname(toRelativePathname(pathname))) {
    case '/overview':
      return 'overview';
    case '/how-it-works':
    case '/features':
      return 'overview';
    case '/extension':
      return 'extension';
    default:
      return 'home';
  }
}

function getPageTitle(page: PageKey, copy: SiteCopy): string {
  switch (page) {
    case 'overview':
      return copy.nav.overview;
    case 'extension':
      return copy.nav.extension;
    default:
      return 'ArbiterOS';
  }
}

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'zh';
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') {
    return 'en';
  }

  try {
    const savedLang = window.localStorage.getItem(langStorageKey);
    if (isLang(savedLang)) {
      return savedLang;
    }
  } catch {
    // Ignore storage access issues and fall back to browser locale.
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null);
  const [page, setPage] = useState<PageKey>(() => getPageFromPath(window.location.pathname));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const t = i18n[lang];
  const languageToggleLabel = lang === 'en' ? t.ui.switchToChineseLabel : t.ui.switchToEnglishLabel;

  useEffect(() => {
    try {
      window.localStorage.setItem(langStorageKey, lang);
    } catch {
      // Ignore storage access issues.
    }

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = page === 'home' ? t.meta.homeTitle : `${getPageTitle(page, t)} | ${t.meta.titleSuffix}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description);
  }, [lang, page, t]);

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath(window.location.pathname));
      setActiveAdvantage(null);
      setMobileNavOpen(false);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const rel = normalizePathname(toRelativePathname(window.location.pathname));
    if (rel === '/features' || rel === '/how-it-works') {
      window.history.replaceState(null, '', pagePaths.overview);
    }
  }, []);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, nextPage: PageKey) => {
    if (!isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();

    const nextPath = pagePaths[nextPage];
    if (normalizePathname(window.location.pathname) !== normalizePathname(nextPath)) {
      window.history.pushState({ page: nextPage }, '', nextPath);
    }

    setPage(nextPage);
    setActiveAdvantage(null);
    setMobileNavOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <a
            className="brand"
            href={pagePaths.home}
            onClick={(event) => handleNavigate(event, 'home')}
            aria-label={t.ui.brandHomeLabel}
          >
            <BrandMark />
            <span>ArbiterOS</span>
          </a>
          <nav className="nav" aria-label={t.ui.primaryNavLabel}>
            <a
              href={pagePaths.home}
              onClick={(event) => handleNavigate(event, 'home')}
              className={page === 'home' ? 'active' : undefined}
              aria-current={page === 'home' ? 'page' : undefined}
            >
              {t.nav.introHome}
            </a>
            {navItems.map((item) => (
              <a
                key={item.page}
                href={pagePaths[item.page]}
                onClick={(event) => handleNavigate(event, item.page)}
                className={page === item.page ? 'active' : undefined}
                aria-current={page === item.page ? 'page' : undefined}
              >
                {item.label(t)}
              </a>
            ))}
          </nav>
          <button
            className="mobile-nav-toggle"
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav-panel"
            aria-label={t.ui.toggleNavigationLabel}
          >
            <MenuIcon open={mobileNavOpen} />
          </button>
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            aria-label={languageToggleLabel}
          >
            <span className={lang === 'zh' ? 'active' : ''}>中</span>
            <span className="lang-sep">/</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
          <a
            className="btn btn-outline header-cta"
            href="https://github.com/cure-lab/ArbiterOS"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </div>
        <div
          id="mobile-nav-panel"
          className={`mobile-nav-panel ${mobileNavOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileNavOpen}
        >
          <div className="mobile-nav-content container">
            <nav className="mobile-nav" aria-label={t.ui.mobileNavLabel}>
              <a
                href={pagePaths.home}
                onClick={(event) => handleNavigate(event, 'home')}
                className={page === 'home' ? 'active' : undefined}
                aria-current={page === 'home' ? 'page' : undefined}
                style={{ animationDelay: '0.05s' }}
              >
                <HomeNavIcon />
                <span className="mobile-nav-text">{t.nav.home}</span>
                <ChevronIcon />
              </a>
              {navItems.map((item, i) => (
                <a
                  key={item.page}
                  href={pagePaths[item.page]}
                  onClick={(event) => handleNavigate(event, item.page)}
                  className={page === item.page ? 'active' : undefined}
                  aria-current={page === item.page ? 'page' : undefined}
                  style={{ animationDelay: `${0.08 + i * 0.06}s` }}
                >
                  <MobileNavPageIcon page={item.page} />
                  <span className="mobile-nav-text">{item.label(t)}</span>
                  <ChevronIcon />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <div
        className={`mobile-nav-overlay ${mobileNavOpen ? 'is-visible' : ''}`}
        onClick={() => setMobileNavOpen(false)}
      />

      <main id="top">
        {page === 'home' && (
          <>
            <HeroSection
              t={t}
              lang={lang}
              onOverviewClick={(event) => handleNavigate(event, 'overview')}
            />
            <BenchmarkSection t={t} />
            <PositioningSection t={t} />
            <ProtectionComparisonSection t={t} />
            <AdvantagesSection t={t} onSelect={setActiveAdvantage} />
            <QuickStartSection t={t} lang={lang} />
            <CtaSection t={t} />
          </>
        )}
        {page === 'overview' && <OverviewSection t={t} />}
        {page === 'extension' && <ExtensionSection t={t} />}
      </main>

      {activeAdvantage !== null && (
        <AdvantageModal
          t={t}
          activeAdvantage={activeAdvantage}
          onClose={() => setActiveAdvantage(null)}
        />
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <span>ArbiterOS</span>
          <span>{t.ui.footerLabel}</span>
        </div>
      </footer>
    </div>
  );
}

function HeroSection({
  t,
  lang,
  onOverviewClick,
}: {
  t: SiteCopy;
  lang: Lang;
  onOverviewClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <section className="hero container">
      <div className="hero-content">
        {t.hero.eyebrow ? <span className={`eyebrow ${lang === 'zh' ? 'eyebrow-cn' : ''}`}>{t.hero.eyebrow}</span> : null}
        <h1 className={lang === 'zh' ? 'hero-title-cn' : 'hero-title-en'}>{t.hero.title}</h1>
        <p className={`hero-sub ${lang === 'zh' ? 'hero-sub-cn' : 'hero-sub-en'}`}>{t.hero.sub}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#quickstart-demo">
            {t.hero.demoBtn}
          </a>
          <a
            className="btn btn-secondary"
            href={pagePaths.overview}
            onClick={onOverviewClick}
          >
            {t.hero.howItWorksBtn}
          </a>
          <a
            className="btn btn-outline"
            href="https://github.com/cure-lab/ArbiterOS"
            target="_blank"
            rel="noreferrer"
          >
            {t.hero.githubBtn}
          </a>
        </div>
        <div className="hero-meta">
          {t.hero.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-visual">
          <HeroIllustration copy={t.hero.diagram} lang={lang} />
        </div>
      </div>
    </section>
  );
}

function PositioningSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section positioning-section">
      <div className="positioning-card">
        <div className="positioning-header">
          <span className="section-label">{t.positioning.label}</span>
          <h2>{t.positioning.title}</h2>
          <p className="section-desc">{t.positioning.desc}</p>
        </div>
        <div className="positioning-grid">
          {t.positioning.items.map((item, index) => (
            <article
              className={`positioning-item${index === t.positioning.items.length - 1 ? ' is-highlight' : ''}`}
              key={item.title}
            >
              <span className="positioning-kind">{item.title}</span>
              <p>{item.short}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section cta-section">
      <div className="cta-card">
        <div className="cta-content">
          <span className="section-label">{t.cta.label}</span>
          <h2>{t.cta.title}</h2>
          <p>{t.cta.desc}</p>
          <div className="cta-actions">
            <a
              className="btn btn-primary"
              href="https://github.com/cure-lab/ArbiterOS"
              target="_blank"
              rel="noreferrer"
            >
              {t.cta.primaryBtn}
            </a>
            <a
              className="btn btn-secondary"
              href="https://arxiv.org/abs/2510.13857"
              target="_blank"
              rel="noreferrer"
            >
              {t.cta.secondaryBtn}
            </a>
            <a className="btn btn-outline" href="mailto:contact@arbiteros.ai">
              {t.cta.contactBtn}
            </a>
          </div>
        </div>
        <div className="cta-links">
          {t.cta.resources.map((link) => (
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
  );
}

function AdvantagesSection({
  t,
  onSelect,
}: {
  t: SiteCopy;
  onSelect: (index: number) => void;
}) {
  return (
    <section className="container section advantages-section" aria-label={t.advantages.label}>
      <div className="advantages-card">
        <div className="advantages-header">
          <span className="section-label">{t.advantages.label}</span>
          <h2>{t.advantages.title}</h2>
        </div>
        <div className="advantages-grid">
          {t.advantages.items.map((item, i) => {
            const Icon = advantageIcons[i];
            return (
              <article
                className="advantage-card"
                key={item.title}
                onClick={() => onSelect(i)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="advantage-icon"><Icon /></div>
                <h3>{item.title}</h3>
                <p>{item.short}</p>
                <span className="advantage-more"><ChevronIcon /></span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdvantageModal({
  t,
  activeAdvantage,
  onClose,
}: {
  t: SiteCopy;
  activeAdvantage: number;
  onClose: () => void;
}) {
  const Icon = advantageIcons[activeAdvantage];

  return (
    <div className="adv-modal-backdrop" onClick={onClose}>
      <div className="adv-modal" onClick={(event) => event.stopPropagation()}>
        <button className="adv-modal-close" onClick={onClose} aria-label={t.ui.closeLabel}>&times;</button>
        <div className="adv-modal-icon"><Icon /></div>
        <h3>{t.advantages.items[activeAdvantage].title}</h3>
        <p>{t.advantages.items[activeAdvantage].detail}</p>
      </div>
    </div>
  );
}

function QuickStartSection({ t, lang }: { t: SiteCopy; lang: Lang }) {
  const [copiedCommands, setCopiedCommands] = useState(false);
  const [copiedRunCommands, setCopiedRunCommands] = useState(false);
  const demoHref =
    lang === 'en'
      ? withBasePath('/demo/selected-cases/index.html?demoLang=en')
      : withBasePath('/demo/selected-cases/index.html');
  const installComment =
    lang === 'zh'
      ? '# 随后，会自动生成kernel执行脚本：run-kernel.sh'
      : '# Then, the kernel run script will be generated automatically: run-kernel.sh';
  const runComment =
    lang === 'zh'
      ? '# 启动ArbiterOS：'
      : '# Start ArbiterOS:';
  const installCommands = `git clone https://github.com/cure-lab/ArbiterOS.git
cd ArbiterOS
chmod +x install.sh
./install.sh
${installComment}`;
  const runCommands = `${runComment}
./run-kernel.sh`;

  async function handleCopyCommands() {
    const didCopy = await copyTextToClipboard(installCommands);

    if (!didCopy) {
      return;
    }

    setCopiedCommands(true);
    window.setTimeout(() => setCopiedCommands(false), 1800);
  }

  async function handleCopyRunCommands() {
    const didCopy = await copyTextToClipboard(runCommands);

    if (!didCopy) {
      return;
    }

    setCopiedRunCommands(true);
    window.setTimeout(() => setCopiedRunCommands(false), 1800);
  }

  return (
    <section className="container section quickstart-section" id="quickstart">
      <div className="quickstart-card">
        <div className="quickstart-header">
          <span className="section-label">{t.quickStart.label}</span>
          <h2>{t.quickStart.title}</h2>
        </div>
        <div className="quickstart-steps">
          {t.quickStart.steps.map((step) => (
            <div className="quickstart-step-group" key={step.step}>
              <div className="quickstart-step">
                <span className="quickstart-num">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="code-card quickstart-code-card">
          <div className="quickstart-code-head">
            <p className="code-title">{t.quickStart.commandsLabel}</p>
            <button
              type="button"
              className={`code-copy-btn${copiedCommands ? ' is-copied' : ''}`}
              onClick={() => { void handleCopyCommands(); }}
            >
              {copiedCommands ? t.quickStart.copiedLabel : t.quickStart.copyLabel}
            </button>
          </div>
          <pre>
            <code>{installCommands}</code>
          </pre>
        </div>
        <div className="code-card quickstart-code-card quickstart-run-code-card">
          <div className="quickstart-code-head">
            <p className="code-title">{t.quickStart.runCommandsLabel}</p>
            <button
              type="button"
              className={`code-copy-btn${copiedRunCommands ? ' is-copied' : ''}`}
              onClick={() => { void handleCopyRunCommands(); }}
            >
              {copiedRunCommands ? t.quickStart.copiedLabel : t.quickStart.copyLabel}
            </button>
          </div>
          <pre>
            <code>{runCommands}</code>
          </pre>
        </div>
        <div className="quickstart-demo" id="quickstart-demo">
          <div className="quickstart-demo-head">
            <h3>{t.quickStart.demo.title}</h3>
            <a
              className="btn btn-outline"
              href={demoHref}
              target="_blank"
              rel="noreferrer"
            >
              {t.quickStart.demo.openLabel}
            </a>
          </div>
          <p>{t.quickStart.demo.description}</p>
          <div className="quickstart-demo-frame-wrap">
            <iframe
              key={lang}
              title={t.quickStart.demo.iframeTitle}
              src={demoHref}
              className="quickstart-demo-frame"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BenchmarkSection({ t }: { t: SiteCopy }) {
  const [showFalsePositiveClusters, setShowFalsePositiveClusters] = useState(false);
  const [showMissClusters, setShowMissClusters] = useState(false);
  const renderFailurePattern = (text: string) => text.split('\n').map((line, idx) => {
    const colonIdx = line.indexOf('：');
    if (colonIdx > 0) {
      const label = line.slice(0, colonIdx + 1);
      const content = line.slice(colonIdx + 1);
      return (
        <span key={`${label}-${idx}`}>
          <strong>{label}</strong>
          {content}
          {idx < text.split('\n').length - 1 ? <br /> : null}
        </span>
      );
    }

    return (
      <span key={`line-${idx}`}>
        {line}
        {idx < text.split('\n').length - 1 ? <br /> : null}
      </span>
    );
  });

  return (
    <section className="container section benchmark-section" id="benchmark">
      <div className="overview-card benchmark-home-card">
        <div className="overview-card-header">
          <span className="section-label">{t.overview.benchmark.label}</span>
          <h3>
            {t.overview.benchmark.title}
            <sup className="bench-footnote-mark" aria-hidden="true">1</sup>
          </h3>
          <p className="section-desc">{t.overview.benchmark.desc}</p>
        </div>

        <div className="bench-compare-grid">
          {t.overview.benchmark.comparisons.map((c) => (
            <div className="bench-compare-item" key={c.name}>
              <div className="bench-compare-top">
                <div className="bench-compare-heading">
                  <p className="bench-name">
                    {c.name}
                    <span className="bench-footnote-mark" aria-hidden="true">{c.footnoteMark}</span>
                  </p>
                </div>
                <span className="bench-delta">{c.delta}</span>
                <p className="bench-caption">{c.caption}</p>
              </div>
              <div className="bench-bars">
                <div>
                  <div className="bench-bar-label">
                    <span>{c.withoutLabel}</span>
                    <strong>{c.withoutValue}</strong>
                  </div>
                  <div className="bench-track">
                    <div className="bench-seg bench-seg-baseline" style={{ width: `${c.baselinePct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="bench-bar-label">
                    <span>{c.withLabel}</span>
                    <strong>{c.withValue}</strong>
                  </div>
                  <div className="bench-track">
                    <div className="bench-seg bench-seg-blocked" style={{ width: `${c.primaryPct}%` }} />
                    <div className="bench-seg bench-seg-residual" style={{ width: `${c.residualPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bench-footnotes">
          {t.overview.benchmark.footnotes.map((note) => (
            <p className="bench-footnote" key={note.marker}>
              <span className="bench-footnote-mark bench-footnote-mark-inline" aria-hidden="true">{note.marker}</span> {note.text}
            </p>
          ))}
        </div>

        <div className="bench-failure-analysis">
          <div className="bench-failure-head">
            <h4>{t.overview.benchmark.failureAnalysis.title}</h4>
            <p>{t.overview.benchmark.failureAnalysis.desc}</p>
          </div>
          <div className="bench-failure-grid">
            <div className="bench-failure-col">
              <div className="bench-failure-col-head">
                <h5>{t.overview.benchmark.failureAnalysis.falsePositiveTitle}</h5>
                <button
                  type="button"
                  className="bench-failure-toggle"
                  onClick={() => { setShowFalsePositiveClusters((prev) => !prev); }}
                >
                  {showFalsePositiveClusters
                    ? t.overview.benchmark.failureAnalysis.falsePositiveToggleHide
                    : t.overview.benchmark.failureAnalysis.falsePositiveToggleShow}
                </button>
              </div>
              <p className="bench-failure-intro">{t.overview.benchmark.failureAnalysis.falsePositiveIntro}</p>
              {showFalsePositiveClusters
                ? t.overview.benchmark.failureAnalysis.falsePositiveClusters.map((item) => (
                  <article className="bench-failure-item" key={`${item.category}-${item.count}`}>
                    <p className="bench-failure-meta">{item.category} <span>{item.count}</span></p>
                    <p className="bench-failure-pattern">{renderFailurePattern(item.pattern)}</p>
                  </article>
                ))
                : null}
            </div>
            <div className="bench-failure-col">
              <div className="bench-failure-col-head">
                <h5>{t.overview.benchmark.failureAnalysis.missTitle}</h5>
                <button
                  type="button"
                  className="bench-failure-toggle"
                  onClick={() => { setShowMissClusters((prev) => !prev); }}
                >
                  {showMissClusters
                    ? t.overview.benchmark.failureAnalysis.missToggleHide
                    : t.overview.benchmark.failureAnalysis.missToggleShow}
                </button>
              </div>
              <p className="bench-failure-intro">{t.overview.benchmark.failureAnalysis.missIntro}</p>
              {showMissClusters
                ? t.overview.benchmark.failureAnalysis.missClusters.map((item) => (
                  <article className="bench-failure-item" key={`${item.category}-${item.count}`}>
                    <p className="bench-failure-meta">{item.category} <span>{item.count}</span></p>
                    <p className="bench-failure-pattern">{renderFailurePattern(item.pattern)}</p>
                  </article>
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  desc,
  columns,
  rows,
  summary,
  collapsible = false,
  toggleShowLabel = '',
  toggleHideLabel = '',
}: {
  title: string;
  desc: string;
  columns: SiteCopy['overview']['comparison']['columns'];
  rows: string[];
  summary?: SiteCopy['overview']['comparison']['summary'];
  collapsible?: boolean;
  toggleShowLabel?: string;
  toggleHideLabel?: string;
}) {
  const [expanded, setExpanded] = useState(!collapsible);

  useEffect(() => {
    setExpanded(!collapsible);
  }, [collapsible, title]);

  return (
    <div className="overview-card">
      <div className="overview-card-header">
        <h3>{title}</h3>
        {desc ? <p className="section-desc">{desc}</p> : null}
        {summary ? (
          <div className="comparison-summary">
            <div className="comparison-summary-box comparison-summary-box-danger">
              <p className="comparison-summary-title">{summary.drawbacksTitle}</p>
              <ul>
                {summary.drawbacks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="comparison-summary-box comparison-summary-box-safe">
              <p className="comparison-summary-title">{summary.strengthsTitle}</p>
              <ul>
                {summary.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {collapsible ? (
          <button
            type="button"
            className="comparison-toggle"
            onClick={() => { setExpanded((prev) => !prev); }}
            aria-expanded={expanded}
          >
            {expanded ? toggleHideLabel : toggleShowLabel}
          </button>
        ) : null}
      </div>
      {expanded ? (
        <div className="comparison-grid">
          {columns.map((col, colIdx) => (
            <div className={`comparison-col${colIdx === 2 ? ' comparison-col-highlight' : ''}`} key={col.name} style={{ gridRow: `span ${rows.length + 1}` }}>
              <div className="comparison-head">
                <h4>{col.name}</h4>
                <span className="comparison-tag">{col.tag}</span>
              </div>
              {col.items.map((value, rowIdx) => (
                <div className="comparison-cell" key={rowIdx}>
                  <span className="comparison-cell-label">{rows[rowIdx]}</span>
                  <span className="comparison-cell-value">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProtectionComparisonSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section protection-comparison-section">
      <ComparisonCard
        title={t.overview.comparison.title}
        desc={t.overview.comparison.desc}
        columns={t.overview.comparison.columns}
        rows={t.overview.comparison.rows}
        summary={t.overview.comparison.summary}
        collapsible
        toggleShowLabel={t.overview.comparison.toggleShow}
        toggleHideLabel={t.overview.comparison.toggleHide}
      />
      <ComparisonCard
        title={t.overview.addOnComparison.title}
        desc={t.overview.addOnComparison.desc}
        columns={t.overview.addOnComparison.columns}
        rows={t.overview.addOnComparison.rows}
        summary={t.overview.addOnComparison.summary}
        collapsible
        toggleShowLabel={t.overview.addOnComparison.toggleShow}
        toggleHideLabel={t.overview.addOnComparison.toggleHide}
      />
    </section>
  );
}

function OverviewSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section" id="overview">
      <div className="section-header section-header-wide">
        <span className="section-label">{t.overview.label}</span>
        <h2>{t.overview.title}</h2>
        <p className="section-desc">{t.overview.desc}</p>
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.overview.architecture.label}</span>
          <h3>{t.overview.architecture.title}</h3>
        </div>
        <EcosystemDiagram copy={t.overview.architecture.diagram} />
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.overview.dataflow.label}</span>
          <h3>{t.overview.dataflow.title}</h3>
        </div>
        <div className="dataflow-pipeline">
          {t.overview.dataflow.stages.flatMap((stage, i) => {
            const items = [];
            if (i > 0) {
              items.push(<div className="dataflow-arrow" key={`arrow-${i}`}>{'\u2192'}</div>);
            }
            items.push(
              <div className="dataflow-stage" key={stage.num}>
                <span className="dataflow-num">{stage.num}</span>
                <h4>{stage.title}</h4>
                <p>{stage.desc}</p>
              </div>,
            );
            return items;
          })}
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.howItWorks.label}</span>
          <h3>{t.howItWorks.title}</h3>
          <p className="how-lead">{t.howItWorks.statement}</p>
          <div className="how-outcomes">
            {t.howItWorks.outcomes.map((outcome) => (
              <span key={outcome}>{outcome}</span>
            ))}
          </div>
        </div>
        <div className="steps-grid">
          {t.howItWorks.steps.map((step) => (
            <article className="step-card" key={step.step}>
              <span className="step-num">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.architecture.label}</span>
          <h3>{t.architecture.title}</h3>
        </div>
        <div className="arch-flow">
          {t.architecture.nodes.flatMap((node, i) => {
            const items = [];
            if (i > 0) {
              items.push(<div className="flow-arrow" key={`arrow-${i}`}>→</div>);
            }
            items.push(
              <div className="flow-node" key={node.main}>
                {node.main}
                <span>{node.sub}</span>
              </div>,
            );
            return items;
          })}
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.features.label}</span>
          <h3>{t.features.title}</h3>
          {t.features.desc ? <p className="section-desc">{t.features.desc}</p> : null}
        </div>
        <div className="features-grid">
          {t.features.items.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon"><Icon /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-card-header">
          <span className="section-label">{t.overview.kernelEdge.label}</span>
          <h3>{t.overview.kernelEdge.title}</h3>
        </div>
        <div className="kernel-edge-grid">
          {t.overview.kernelEdge.items.map((item) => (
            <div className="kernel-edge-item" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemDiagram({ copy }: { copy: SiteCopy['overview']['architecture']['diagram'] }) {
  return (
    <svg viewBox="0 0 808 420" className="eco-svg" role="img" aria-label={copy.ariaLabel}>
      <defs>
        <linearGradient id="eco-bg" x1="0" y1="0" x2="808" y2="420">
          <stop offset="0%" stopColor="#f8faff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
        <linearGradient id="eco-arrow" x1="172" y1="0" x2="636" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <linearGradient id="eco-arrow-v" x1="0" y1="16" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <marker id="eco-arrowhead" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#6ea8ff" opacity="0.9" />
        </marker>
        <marker id="eco-arrowhead-soft" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#b5d0f0" opacity="0.95" />
        </marker>
        <linearGradient id="eco-kernel-fill" x1="240" y1="16" x2="568" y2="306">
          <stop offset="0%" stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#f5f9ff" />
        </linearGradient>
        <linearGradient id="eco-policy-fill" x1="256" y1="166" x2="552" y2="200">
          <stop offset="0%" stopColor="#e8f0ff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
        <filter id="eco-shadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0f2844" floodOpacity="0.06" />
        </filter>
        <clipPath id="eco-agents-clip">
          <rect x="16" y="86" width="156" height="192" rx="16" />
        </clipPath>
        <clipPath id="eco-kernel-clip">
          <rect x="240" y="16" width="328" height="290" rx="18" />
        </clipPath>
        <clipPath id="eco-providers-clip">
          <rect x="636" y="86" width="156" height="192" rx="16" />
        </clipPath>
        <clipPath id="eco-observability-clip">
          <rect x="234" y="336" width="340" height="56" rx="14" />
        </clipPath>
      </defs>

      <rect width="808" height="420" rx="18" fill="transparent" />
      <circle cx="60" cy="50" r="40" fill="#dbeafe" opacity="0.15" />
      <circle cx="748" cy="380" r="50" fill="#d1fae5" opacity="0.1" />

      {/* AI Agents (left) */}
      <g filter="url(#eco-shadow)">
        <rect x="16" y="86" width="156" height="192" rx="16" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="16" y="86" width="156" height="4" rx="2" fill="#f59e0b" opacity="0.5" clipPath="url(#eco-agents-clip)" />
      <text x="94" y="116" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">{copy.agentsTitle}</text>
      <rect x="34" y="132" width="120" height="26" rx="8" fill="#fffbeb" stroke="#fde68a" strokeWidth="0.8" />
      <text x="94" y="149" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">OpenClaw</text>
      <rect x="34" y="164" width="120" height="26" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="0.8" />
      <text x="94" y="181" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">Nanobot</text>
      <rect x="34" y="196" width="120" height="26" rx="8" fill="#fefce8" stroke="#fde68a" strokeWidth="0.8" />
      <text x="94" y="213" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">{copy.customAgent}</text>
      <text x="94" y="252" fill="#5a7a96" fontFamily="'Public Sans',sans-serif" fontSize="11" textAnchor="middle">{copy.routeNote}</text>

      {/* Arrows: Agents to Kernel */}
      <path d="M172,160 h52 v-5 l16,10 -16,10 v-5 h-52 Z" fill="url(#eco-arrow)" stroke="url(#eco-arrow)" strokeWidth="1" strokeLinejoin="round" />
      <text x="206" y="152" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.requestLabel}</text>
      <path d="M240,195 H176" fill="none" stroke="#b5d0f0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#eco-arrowhead-soft)" />
      <text x="206" y="209" fill="#6b93c4" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.responseLabel}</text>

      {/* ArbiterOS Kernel (center, expanded) */}
      <g filter="url(#eco-shadow)">
        <rect x="240" y="16" width="328" height="290" rx="18" fill="url(#eco-kernel-fill)" stroke="#0f66ff" strokeWidth="1.2" strokeOpacity="0.25" />
      </g>
      <rect x="240" y="16" width="328" height="5" rx="2.5" fill="#0f66ff" opacity="0.35" clipPath="url(#eco-kernel-clip)" />
      <text x="404" y="44" fill="#0c1d36" fontFamily="'Manrope',sans-serif" fontSize="13" fontWeight="800" textAnchor="middle">{copy.kernelTitle}</text>

      {/* Pipeline Step 1: LiteLLM Proxy + Registry & Context */}
      <rect x="256" y="56" width="140" height="28" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="326" y="74" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.proxy}</text>
      <rect x="412" y="56" width="140" height="28" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="482" y="74" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.registry}</text>

      {/* Pipeline arrow down */}
      <path d="M400,86 v4 h-4 l8,6 8,-6 h-4 v-4 Z" fill="url(#eco-arrow-v)" />

      {/* Pipeline Step 2: Instruction Parser (emphasized) */}
      <rect x="256" y="100" width="296" height="30" rx="10" fill="#f0f6ff" stroke="#0f66ff" strokeWidth="0.8" strokeOpacity="0.2" />
      <text x="404" y="119" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="700" textAnchor="middle">{copy.parser}</text>

      {/* Taint dimension pills */}
      <rect x="256" y="134" width="296" height="24" rx="8" fill="rgba(255,255,255,0.7)" stroke="#e2ecfa" strokeWidth="0.6" />
      <rect x="279" y="137" width="42" height="17" rx="7" fill="#fef2f2" />
      <text x="300" y="149" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.risk}</text>
      <rect x="325" y="137" width="42" height="17" rx="7" fill="#eef4ff" />
      <text x="346" y="149" fill="#0f66ff" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.trust}</text>
      <rect x="371" y="137" width="52" height="17" rx="7" fill="#ecfdf5" />
      <text x="397" y="149" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.confidentiality}</text>
      <rect x="427" y="137" width="56" height="17" rx="7" fill="#fffbeb" />
      <text x="455" y="149" fill="#ca8a04" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.reversibility}</text>
      <rect x="487" y="137" width="52" height="17" rx="7" fill="#f0f7ff" />
      <text x="513" y="149" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.authority}</text>

      {/* Pipeline arrow down */}
      <path d="M400,156 v4 h-4 l8,6 8,-6 h-4 v-4 Z" fill="url(#eco-arrow-v)" />

      {/* Pipeline Step 3: Policy Engine (CORE — highlighted) */}
      <rect x="256" y="170" width="296" height="34" rx="10" fill="url(#eco-policy-fill)" stroke="#0f66ff" strokeWidth="1.4" strokeOpacity="0.35" />
      <text x="404" y="191" fill="#0c1d36" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">{copy.policy}</text>

      {/* Pipeline arrow down */}
      <path d="M400,206 v4 h-4 l8,6 8,-6 h-4 v-4 Z" fill="url(#eco-arrow-v)" />

      {/* Instruction categories */}
      <rect x="256" y="220" width="296" height="46" rx="10" fill="rgba(255,255,255,0.5)" stroke="#e2ecfa" strokeWidth="0.6" />
      <text x="404" y="236" fill="#4a6a8a" fontFamily="'Manrope',sans-serif" fontSize="10.5" fontWeight="700" textAnchor="middle">{copy.categoriesLabel}</text>
      <rect x="282" y="242" width="76" height="20" rx="8" fill="#eef4ff" />
      <text x="320" y="256" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.cognitive}</text>
      <rect x="364" y="242" width="76" height="20" rx="8" fill="#ecfdf5" />
      <text x="402" y="256" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.actuation}</text>
      <rect x="446" y="242" width="80" height="20" rx="8" fill="#fef3c7" />
      <text x="486" y="256" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.perception}</text>

      {/* Pipeline note */}
      <text x="404" y="286" fill="#5a7a96" fontFamily="'Public Sans',sans-serif" fontSize="10.5" fontWeight="500" textAnchor="middle">{copy.pipelineNote}</text>

      {/* Arrows: Kernel to Providers */}
      <path d="M568,160 h52 v-5 l16,10 -16,10 v-5 h-52 Z" fill="url(#eco-arrow)" stroke="url(#eco-arrow)" strokeWidth="1" strokeLinejoin="round" />
      <text x="602" y="152" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.apiCall}</text>
      <path d="M636,195 H572" fill="none" stroke="#b5d0f0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#eco-arrowhead-soft)" />
      <text x="602" y="209" fill="#6b93c4" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">{copy.llmOutput}</text>

      {/* Model Providers (right) */}
      <g filter="url(#eco-shadow)">
        <rect x="636" y="86" width="156" height="192" rx="16" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="636" y="86" width="156" height="4" rx="2" fill="#22c55e" opacity="0.5" clipPath="url(#eco-providers-clip)" />
      <text x="714" y="116" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">{copy.providersTitle}</text>
      <rect x="654" y="138" width="120" height="54" rx="10" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="1" />
      <text x="714" y="160" fill="#166534" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700" textAnchor="middle">{copy.compatibleApiLine1}</text>
      <text x="714" y="174" fill="#166534" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700" textAnchor="middle">{copy.compatibleApiLine2}</text>
      <rect x="654" y="200" width="120" height="26" rx="10" fill="#f8fbff" stroke="#d8e6f8" strokeWidth="0.8" />
      <text x="714" y="217" fill="#4a6a8a" fontFamily="'Public Sans',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.endpoint}</text>
      <rect x="654" y="234" width="120" height="26" rx="10" fill="#f8fbff" stroke="#d8e6f8" strokeWidth="0.8" />
      <text x="714" y="251" fill="#5a7a96" fontFamily="'Public Sans',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.anyModel}</text>

      {/* Arrow: Kernel to Observability */}
      <path d="M404,308 v14 h-5 l9,10 9,-10 h-5 v-14 Z" fill="url(#eco-arrow-v)" stroke="url(#eco-arrow-v)" strokeWidth="1" strokeLinejoin="round" />

      {/* Observability (bottom center) */}
      <g filter="url(#eco-shadow)">
        <rect x="234" y="336" width="340" height="56" rx="14" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="234" y="336" width="340" height="4" rx="2" fill="#39c0b7" opacity="0.5" clipPath="url(#eco-observability-clip)" />
      <text x="404" y="358" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">{copy.observabilityTitle}</text>
      <rect x="275" y="365" width="80" height="18" rx="8" fill="#e0f7f5" />
      <text x="315" y="378" fill="#0d9488" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">Langfuse</text>
      <rect x="361" y="365" width="92" height="18" rx="8" fill="#eef4ff" />
      <text x="407" y="378" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.instructionFiles}</text>
      <rect x="459" y="365" width="82" height="18" rx="8" fill="#f1f5fa" />
      <text x="500" y="378" fill="#4a6a8a" fontFamily="'Manrope',sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">{copy.apiCallLogs}</text>

      {/* Dashed escalation path: Kernel to Human Operator */}
      <path d="M534,306 Q596,310 636,336" fill="none" stroke="#b5d0f0" strokeWidth="1.2" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#eco-arrowhead-soft)" />
      <text x="578" y="308" fill="#6b93c4" fontFamily="'Manrope',sans-serif" fontSize="8.5" fontWeight="600">{copy.flaggedLabel}</text>

      {/* Human Operator (optional, bottom-right) */}
      <rect x="636" y="336" width="164" height="60" rx="15" fill="rgba(255,255,255,0.6)" stroke="#b5d0f0" strokeWidth="1" strokeDasharray="5 3" />
      <circle cx="662" cy="366" r="12" fill="#eef4ff" />
      <text x="662" y="370" fill="#0f66ff" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="800" textAnchor="middle">H</text>
      <text x="684" y="357" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="700">{copy.humanTitle}</text>
      <text x="684" y="376" fill="#5a7a96" fontFamily="'Public Sans',sans-serif" fontSize="10.5" fontWeight="500">{copy.humanSubtitle}</text>
    </svg>
  );
}

function ExtensionSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section" id="extension">
      <div className="section-header section-header-wide">
        <span className="section-label">{t.extension.label}</span>
        <h2>{t.extension.title}</h2>
        <p className="section-desc section-desc--forced-break">{t.extension.desc}</p>
      </div>
      <div className="ext-grid">
        {t.extension.items.map((feature, i) => {
          const Visual = extensionVisuals[i];
          return (
            <article className="ext-card" key={feature.title}>
              <div className="ext-visual"><Visual /></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
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

function HeroIllustration({ copy, lang }: { copy: SiteCopy['hero']['diagram']; lang: Lang }) {
  const uiFont = lang === 'zh' ? "'Noto Sans SC','Manrope',sans-serif" : "'Manrope',sans-serif";
  const bodyFont = lang === 'zh' ? "'Noto Sans SC','Public Sans',sans-serif" : "'Public Sans',sans-serif";

  return (
    <svg viewBox="0 0 520 560" role="img" aria-label={copy.ariaLabel}>
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="520" y2="560">
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
        <clipPath id="clip-left"><rect x="20" y="50" width="148" height="176" rx="16" /></clipPath>
        <clipPath id="clip-right"><rect x="352" y="50" width="148" height="176" rx="16" /></clipPath>
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
        <linearGradient id="policy-define" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="policy-trigger" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eefcf9" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="policy-enforce" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="policy-refine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f3ff" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </linearGradient>
      </defs>

      <circle cx="80" cy="60" r="55" fill="#dbeafe" opacity="0.22" />
      <circle cx="456" cy="490" r="72" fill="#d1fae5" opacity="0.15" />
      <circle cx="440" cy="40" r="22" fill="#39c0b7" opacity="0.05" />
      <circle cx="38" cy="470" r="34" fill="#dbeafe" opacity="0.14" />

      <g transform="translate(0 158)">
      <g filter="url(#card-shadow)">
        <rect x="20" y="50" width="148" height="176" rx="16" fill="#fff" />
        <rect x="20" y="50" width="148" height="176" rx="16" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <rect x="20" y="50" width="148" height="4" fill="url(#accent-danger)" opacity="0.65" clipPath="url(#clip-left)" />
      <text x="38" y="76" fill="#2c4a6e" fontFamily={uiFont} fontSize="11" fontWeight="700">{copy.leftTitle}</text>
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
      <text x="56" y="145" fill="#991b1b" fontFamily="monospace,sans-serif" fontSize="7" fontWeight="700">API_KEY -&gt; ext</text>

      <rect x="34" y="158" width="120" height="24" rx="7" fill="#f8faff" stroke="#e2ecfa" strokeWidth="0.8" />
      <circle cx="46" cy="170" r="4" fill="#e2ecfa" />
      <text x="46" y="173" fill="#94a3b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">{"→"}</text>
      <text x="56" y="173" fill="#475569" fontFamily="monospace,sans-serif" fontSize="7">read config.yml</text>

      <rect x="34" y="188" width="120" height="24" rx="7" fill="#f8faff" stroke="#e2ecfa" strokeWidth="0.8" />
      <circle cx="46" cy="200" r="4" fill="#e2ecfa" />
      <text x="46" y="203" fill="#94a3b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">{"→"}</text>
      <text x="56" y="203" fill="#475569" fontFamily="monospace,sans-serif" fontSize="7">write report.md</text>

      <path d="M168 145h30" fill="none" stroke="url(#arrow-h)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M196 145l-8-5v10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="172" cy="145" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="178" cy="145" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="185" cy="145" r="2.6" fill="#0f66ff" opacity="0.15" />

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
      <path d="M260 90l26 9.6v24c0 19.5-10.8 36.5-26 45-15.2-8.5-26-25.5-26-45v-24L260 90Z" fill="none" stroke="#0f66ff" strokeWidth="0.7" opacity="0.14" />
      <path d="M240.5 99.5c6.6 2.4 13.2 4.8 19.5 7 6.3-2.2 12.9-4.6 19.5-7" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.78" />
      <path d="M260 108l13 6v11.5c0 8.3-4.5 15.8-13 20.4-8.5-4.6-13-12.1-13-20.4V114l13-6Z" fill="url(#shield-core)" stroke="#66a5ff" strokeWidth="1" opacity="0.96" />
      <path d="M252.5 126l5.4 5.4 10.6-10.6" fill="none" stroke="#0f66ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <text x="260" y="198" fill="#1e3d5f" fontFamily={uiFont} fontSize="12" fontWeight="800" textAnchor="middle">{copy.kernelTitle}</text>
      <rect x="205" y="206" width="36" height="15" rx="7.5" fill="#eef4ff" stroke="#d0e2f6" strokeWidth="0.5" />
      <text x="223" y="217" fill="#3b6eb5" fontFamily={uiFont} fontSize="7" fontWeight="600" textAnchor="middle">{copy.parse}</text>
      <rect x="245" y="206" width="36" height="15" rx="7.5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5" />
      <text x="263" y="217" fill="#3b6eb5" fontFamily={uiFont} fontSize="7" fontWeight="600" textAnchor="middle">{copy.policy}</text>
      <rect x="285" y="206" width="36" height="15" rx="7.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.5" />
      <text x="303" y="217" fill="#dc2626" fontFamily={uiFont} fontSize="7" fontWeight="600" textAnchor="middle">{copy.guard}</text>

      <g>
        <circle cx="232" cy="60" r="22" fill="url(#block-glow-lg)" />
        <circle cx="232" cy="60" r="15" fill="none" stroke="#fca5a5" strokeWidth="0.6" opacity="0.35" strokeDasharray="3 3" />
        <circle cx="232" cy="60" r="12" fill="url(#block-fill)" stroke="#f9a8a8" strokeWidth="1.2" />
        <path d="M227.5 55.5l9 9m0-9l-9 9" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="214" y="74" width="36" height="11" rx="5.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.6" />
        <text x="232" y="82" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">rm -rf</text>
        <path d="M244 48l2-6" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M220 50l-3-5" stroke="#fca5a5" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />

        <circle cx="294" cy="50" r="18" fill="url(#block-glow-sm)" />
        <circle cx="294" cy="50" r="12" fill="none" stroke="#fca5a5" strokeWidth="0.5" opacity="0.3" strokeDasharray="2.5 2.5" />
        <circle cx="294" cy="50" r="9.5" fill="url(#block-fill)" stroke="#f9a8a8" strokeWidth="1" />
        <path d="M290.5 46.5l7 7m0-7l-7 7" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="278" y="62" width="32" height="11" rx="5.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.6" />
        <text x="294" y="70" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6" fontWeight="700" textAnchor="middle">leak</text>
        <path d="M305 40l2-5" stroke="#fca5a5" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
      </g>

      <path d="M326 145h18" fill="none" stroke="url(#arrow-h)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M349 145l-7-5v10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="329" cy="145" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="334" cy="145" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="340" cy="145" r="2.6" fill="#0f66ff" opacity="0.15" />

      <g filter="url(#card-shadow)">
        <rect x="352" y="50" width="148" height="176" rx="16" fill="#fff" />
        <rect x="352" y="50" width="148" height="176" rx="16" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <rect x="352" y="50" width="148" height="4" fill="url(#accent-safe)" opacity="0.65" clipPath="url(#clip-right)" />
      <text x="372" y="76" fill="#2c4a6e" fontFamily={uiFont} fontSize="11" fontWeight="700">{copy.rightTitle}</text>
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
      <text x="394" y="168" fill="#991b1b" fontFamily={uiFont} fontSize="8" fontWeight="700">{copy.blocked}</text>

      <rect x="368" y="184" width="100" height="22" rx="11" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="0.8" />
      <path d="M381 195l2 2 4-4" fill="none" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="394" y="198" fill="#16a34a" fontFamily={uiFont} fontSize="7.5" fontWeight="600">{copy.safeToExecute}</text>

      <path d="M260 226v18" fill="none" stroke="url(#arrow-v)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M260 243l-5-8h10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="260" cy="229" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="260" cy="234" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="260" cy="240" r="2.6" fill="#0f66ff" opacity="0.15" />
      </g>

      <g transform="translate(0 150)">
      <g filter="url(#card-shadow)">
        <rect x="20" y="258" width="480" height="112" rx="18" fill="#fff" />
        <rect x="20" y="258" width="480" height="112" rx="18" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <circle cx="46" cy="280" r="5" fill="#0f66ff" opacity="0.15" />
      <text x="58" y="284" fill="#2c4a6e" fontFamily={uiFont} fontSize="11" fontWeight="700">{copy.policyEngineTitle}</text>
      <text x="58" y="301" fill="#7b8fa8" fontFamily={bodyFont} fontSize="7.1">
        {copy.policyEngineSub}
      </text>
      <rect x="356" y="270" width="54" height="14" rx="7" fill="#eef4ff" />
      <text x="383" y="280" fill="#3b6eb5" fontFamily={uiFont} fontSize="7.2" fontWeight="600" textAnchor="middle">{copy.postCall}</text>
      <rect x="416" y="270" width="60" height="14" rx="7" fill="#f5f3ff" />
      <text x="446" y="280" fill="#6d28d9" fontFamily={uiFont} fontSize="7.2" fontWeight="600" textAnchor="middle">{copy.failureLoop}</text>

      <rect x="44" y="316" width="96" height="36" rx="12" fill="url(#policy-define)" stroke="#bfdbfe" strokeWidth="0.8" />
      <circle cx="62" cy="334" r="8" fill="#dbeafe" />
      <text x="62" y="337" fill="#0f66ff" fontFamily={uiFont} fontSize="8" fontWeight="800" textAnchor="middle">1</text>
      <text x="78" y="329" fill="#1e3d5f" fontFamily={uiFont} fontSize="7.1" fontWeight="700">{copy.define}</text>
      <text x="78" y="340" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.defineLine1}</text>
      <text x="78" y="348" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.defineLine2}</text>

      <path d="M144 334h12" fill="none" stroke="#b9cde8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M156 334l-4-3v6Z" fill="#9ab7da" />

      <rect x="156" y="316" width="96" height="36" rx="12" fill="url(#policy-trigger)" stroke="#a7f3d0" strokeWidth="0.8" />
      <circle cx="174" cy="334" r="8" fill="#ccfbf1" />
      <text x="174" y="337" fill="#0f766e" fontFamily={uiFont} fontSize="8" fontWeight="800" textAnchor="middle">2</text>
      <text x="190" y="329" fill="#1e3d5f" fontFamily={uiFont} fontSize="7.1" fontWeight="700">{copy.trigger}</text>
      <text x="190" y="340" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.triggerLine1}</text>
      <text x="190" y="348" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.triggerLine2}</text>

      <path d="M256 334h12" fill="none" stroke="#b9cde8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M268 334l-4-3v6Z" fill="#9ab7da" />

      <rect x="268" y="316" width="96" height="36" rx="12" fill="url(#policy-enforce)" stroke="#fcd34d" strokeWidth="0.8" />
      <circle cx="286" cy="334" r="8" fill="#fde68a" />
      <text x="286" y="337" fill="#b45309" fontFamily={uiFont} fontSize="8" fontWeight="800" textAnchor="middle">3</text>
      <text x="302" y="329" fill="#1e3d5f" fontFamily={uiFont} fontSize="7.1" fontWeight="700">{copy.enforce}</text>
      <text x="302" y="340" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.enforceLine1}</text>
      <text x="302" y="348" fill="#5b7089" fontFamily={bodyFont} fontSize="6.1">{copy.enforceLine2}</text>

      <rect x="380" y="316" width="104" height="36" rx="12" fill="url(#policy-refine)" stroke="#c4b5fd" strokeWidth="0.8" />
      <circle cx="398" cy="334" r="8" fill="#ddd6fe" />
      <text x="398" y="337" fill="#6d28d9" fontFamily={uiFont} fontSize="8" fontWeight="800" textAnchor="middle">4</text>
      <text x="414" y="329" fill="#1e3d5f" fontFamily={uiFont} fontSize="7.1" fontWeight="700">{copy.refine}</text>
      <text x="414" y="340" fill="#5b7089" fontFamily={bodyFont} fontSize="5.9">{copy.refineLine1}</text>
      <text x="414" y="348" fill="#5b7089" fontFamily={bodyFont} fontSize="5.9">{copy.refineLine2}</text>
      <path d="M368 334h12" fill="none" stroke="#b9cde8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M380 334l-4-3v6Z" fill="#9ab7da" />
      </g>

      <path d="M260 202v-14" fill="none" stroke="url(#arrow-v)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M260 185l-5 8h10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="260" cy="199" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="260" cy="194" r="2.2" fill="#0f66ff" opacity="0.25" />

      <g transform="translate(0 -372)">
      <g filter="url(#card-shadow)">
        <rect x="20" y="392" width="480" height="160" rx="18" fill="#fff" />
        <rect x="20" y="392" width="480" height="160" rx="18" fill="none" stroke="#dce8f8" strokeWidth="1" />
      </g>
      <circle cx="46" cy="414" r="5" fill="#0f66ff" opacity="0.15" />
      <text x="58" y="418" fill="#2c4a6e" fontFamily={uiFont} fontSize="11" fontWeight="700">{copy.tracesTitle}</text>
      <rect x="340" y="406" width="48" height="14" rx="7" fill="#eef4ff" />
      <text x="364" y="416" fill="#3b6eb5" fontFamily={uiFont} fontSize="7.5" fontWeight="600" textAnchor="middle">{copy.signals}</text>
      <rect x="394" y="406" width="72" height="14" rx="7" fill="#ecfdf5" />
      <text x="430" y="416" fill="#1a8a6e" fontFamily={uiFont} fontSize="7.5" fontWeight="600" textAnchor="middle">{copy.protected}</text>

      <text x="46" y="438" fill="#8ca0b8" fontFamily={uiFont} fontSize="7" fontWeight="600">{copy.node}</text>
      <text x="214" y="438" fill="#8ca0b8" fontFamily={uiFont} fontSize="7" fontWeight="600">{copy.executionSpan}</text>
      <text x="448" y="438" fill="#8ca0b8" fontFamily={uiFont} fontSize="7" fontWeight="600">{copy.status}</text>
      <path d="M38 443h444" stroke="#e8f0fc" strokeWidth="0.8" />

      <circle cx="52" cy="458" r="5" fill="#0f66ff" />
      <text x="64" y="461" fill="#374a62" fontFamily={uiFont} fontSize="8" fontWeight="600">{copy.trace}</text>
      <rect x="196" y="454" width="238" height="8" rx="4" fill="#dbeafe" opacity="0.45" />
      <rect x="196" y="454" width="238" height="8" rx="4" fill="none" stroke="#c5d9f2" strokeWidth="0.4" />
      <rect x="444" y="453" width="32" height="12" rx="6" fill="#ecfdf5" />
      <text x="460" y="462" fill="#16a34a" fontFamily={uiFont} fontSize="6" fontWeight="700" textAnchor="middle">{copy.ok}</text>

      <path d="M52 463v17h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />
      <circle cx="72" cy="481" r="4.5" fill="#39c0b7" />
      <text x="82" y="484" fill="#374a62" fontFamily={uiFont} fontSize="7.5" fontWeight="600">{copy.generation}</text>
      <rect x="208" y="477" width="166" height="7" rx="3.5" fill="#99f6e4" opacity="0.4" />

      <path d="M72 485v34" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />
      <path d="M72 499h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />
      <path d="M72 519h16" stroke="#c8d6e8" strokeWidth="1.2" fill="none" />

      <circle cx="92" cy="499" r="4.5" fill="#dc2626" />
      <text x="102" y="502" fill="#991b1b" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">exec · rm -rf</text>
      <rect x="228" y="495" width="86" height="7" rx="3.5" fill="#fecaca" opacity="0.5" />
      <rect x="444" y="493" width="32" height="12" rx="6" fill="#fef2f2" />
      <text x="460" y="502" fill="#dc2626" fontFamily={uiFont} fontSize="5.5" fontWeight="700" textAnchor="middle">{lang === 'zh' ? copy.violation : 'VIOL'}</text>

      <circle cx="92" cy="519" r="4.5" fill="#22c55e" />
      <text x="102" y="522" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">read · config</text>
      <rect x="250" y="515" width="120" height="7" rx="3.5" fill="#bbf7d0" opacity="0.4" />
      <rect x="444" y="513" width="32" height="12" rx="6" fill="#ecfdf5" />
      <text x="460" y="522" fill="#16a34a" fontFamily={uiFont} fontSize="6" fontWeight="700" textAnchor="middle">{copy.ok}</text>

      <circle cx="46" cy="541" r="3.5" fill="#0f66ff" />
      <text x="54" y="544" fill="#8ca0b8" fontFamily={uiFont} fontSize="7">{copy.trace}</text>
      <circle cx="86" cy="541" r="3.5" fill="#39c0b7" />
      <text x="94" y="544" fill="#8ca0b8" fontFamily={uiFont} fontSize="7">{lang === 'zh' ? copy.generation : 'Gen'}</text>
      <circle cx="124" cy="541" r="3.5" fill="#dc2626" />
      <text x="132" y="544" fill="#8ca0b8" fontFamily={uiFont} fontSize="7">{copy.violation}</text>
      <circle cx="182" cy="541" r="3.5" fill="#22c55e" />
      <text x="190" y="544" fill="#8ca0b8" fontFamily={uiFont} fontSize="7">{copy.ok}</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Feature Icons
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
      <rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 1.5h6v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M7.5 9.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14.5l2.5 2.5m0-2.5L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
   Advantage Icons
   ═══════════════════════════════════════════════ */

function ShieldConfirmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 15c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    </svg>
  );
}

function InstructionParseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
      <path d="M9 12l-2 2 2 2" />
      <path d="M15 12l2 2-2 2" />
      <path d="M8 8h8M8 18h4" strokeOpacity="0.5" />
    </svg>
  );
}

function ObservabilityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V3M12 21v-2" />
    </svg>
  );
}

function TrustScanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11l2 2 4-4" />
    </svg>
  );
}

function OpenClawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function DeployIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242" />
      <path d="M12 12v9" />
      <path d="M8 17l4 4 4-4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Visualization Extension Visuals
   ═══════════════════════════════════════════════ */

function GovernanceDashboardVisual() {
  return (
    <svg viewBox="0 0 320 180">
      <rect width="320" height="180" rx="12" fill="#f8faff" />
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
      <text x="16" y="80" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">GOVERNANCE TREND</text>
      <path d="M16 156h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 136h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 116h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M16 96h288" stroke="#e8f0fc" strokeWidth="0.8" />
      <path d="M24 146C48 140 66 116 90 112c26-4 34 16 54 12s30-22 46-26c20-4 38 8 56 4s26-6 40-10" fill="none" stroke="#fca5a5" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 142C46 138 64 126 86 124c24-2 32 10 50 8s30-14 46-16c18-2 36 6 54 4s26-4 40-6" fill="none" stroke="#fcd34d" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
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
      <rect x="12" y="10" width="296" height="24" rx="8" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <circle cx="26" cy="22" r="4" fill="#22c55e" opacity="0.7" />
      <text x="34" y="26" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Session #42</text>
      <rect x="128" y="16" width="36" height="12" rx="6" fill="#fef2f2" />
      <text x="146" y="25" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">2 err</text>
      <rect x="170" y="16" width="42" height="12" rx="6" fill="#eef4ff" />
      <text x="191" y="25" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">1 viol</text>
      <rect x="218" y="16" width="36" height="12" rx="6" fill="#ecfdf5" />
      <text x="236" y="25" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">5 ok</text>
      <path d="M70 62h36 M130 62h18 M172 62h36 M118 74v22 M160 74v22 M154 119L146 133 M168 117L182 134" stroke="#b5cceb" strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="62" r="12" fill="#0f66ff" opacity="0.85" />
      <text x="58" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">LLM</text>
      <circle cx="118" cy="62" r="12" fill="#39c0b7" opacity="0.85" />
      <text x="118" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T1</text>
      <circle cx="160" cy="62" r="12" fill="#0f66ff" opacity="0.65" />
      <text x="160" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T2</text>
      <circle cx="220" cy="62" r="12" fill="#39c0b7" opacity="0.75" />
      <text x="220" y="66" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T3</text>
      <circle cx="118" cy="108" r="12" fill="#22c55e" opacity="0.7" />
      <text x="118" y="112" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">OK</text>
      <circle cx="160" cy="108" r="12" fill="#0f66ff" opacity="0.55" />
      <text x="160" y="112" fill="#fff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">T4</text>
      <circle cx="140" cy="144" r="13" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="140" y="148" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">ERR</text>
      <circle cx="190" cy="144" r="13" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="190" y="148" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">VIOL</text>
      <rect x="242" y="48" width="66" height="90" rx="8" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="252" y="64" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700">Node Detail</text>
      <rect x="252" y="72" width="44" height="5" rx="2.5" fill="#dce8f8" />
      <rect x="252" y="82" width="36" height="5" rx="2.5" fill="#e8f0fc" />
      <rect x="252" y="92" width="40" height="5" rx="2.5" fill="#dce8f8" />
      <rect x="252" y="106" width="48" height="12" rx="6" fill="#fef2f2" />
      <text x="276" y="115" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Error</text>
      <rect x="252" y="122" width="48" height="12" rx="6" fill="#eef4ff" />
      <text x="276" y="131" fill="#2563eb" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Violation</text>
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
      <rect x="12" y="12" width="96" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="22" y="30" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Trace</text>
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
      <path d="M44 98h12" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="56" y="90" width="42" height="16" rx="5" fill="#fef2f2" />
      <text x="77" y="101" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="6.5" fontWeight="600" textAnchor="middle">Selected</text>
      <rect x="120" y="12" width="188" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <rect x="130" y="22" width="56" height="14" rx="7" fill="#fef2f2" />
      <text x="158" y="32" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700" textAnchor="middle">Analysis</text>
      <text x="130" y="52" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Output</text>
      <rect x="130" y="57" width="160" height="5" rx="2.5" fill="#e8f0fc" />
      <text x="130" y="76" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Root Cause</text>
      <rect x="130" y="81" width="156" height="5" rx="2.5" fill="#fecaca" opacity="0.4" />
      <rect x="130" y="90" width="124" height="5" rx="2.5" fill="#fecaca" opacity="0.3" />
      <text x="130" y="109" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700">Resolve Now</text>
      <rect x="130" y="114" width="148" height="5" rx="2.5" fill="#bbf7d0" opacity="0.5" />
      <rect x="130" y="123" width="132" height="5" rx="2.5" fill="#bbf7d0" opacity="0.4" />
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
      <rect x="12" y="12" width="296" height="22" rx="6" fill="#eef4ff" />
      <text x="22" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">POLICY</text>
      <text x="140" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">DESCRIPTION</text>
      <text x="250" y="27" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700">TRIGGERED</text>
      <rect x="12" y="40" width="296" height="28" rx="6" fill="#fff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="50" width="56" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="50" width="84" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="46" width="28" height="14" rx="7" fill="#fef2f2" />
      <text x="262" y="56" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">3</text>
      <rect x="12" y="74" width="296" height="28" rx="6" fill="#fafbff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="84" width="64" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="84" width="72" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="80" width="28" height="14" rx="7" fill="#fff7ed" />
      <text x="262" y="90" fill="#ea580c" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">7</text>
      <rect x="12" y="108" width="296" height="28" rx="6" fill="#fff" stroke="#f1f5fa" strokeWidth="0.8" />
      <rect x="22" y="118" width="48" height="6" rx="3" fill="#dce8f8" />
      <rect x="140" y="118" width="90" height="6" rx="3" fill="#e8f0fc" />
      <rect x="248" y="114" width="28" height="14" rx="7" fill="#fffbeb" />
      <text x="262" y="124" fill="#ca8a04" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">12</text>
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
      <circle cx="72" cy="82" r="42" fill="none" stroke="#e2ecfa" strokeWidth="10" />
      <path d="M72 40a42 42 0 1 1 -41.9 39.4" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
      <text x="72" y="86" fill="#991b1b" fontFamily="'Manrope',sans-serif" fontSize="18" fontWeight="800" textAnchor="middle">76%</text>
      <text x="72" y="100" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="9" textAnchor="middle">Rejected</text>
      <rect x="18" y="136" width="40" height="14" rx="7" fill="#fef2f2" />
      <text x="38" y="147" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">76%</text>
      <rect x="64" y="136" width="40" height="14" rx="7" fill="#ecfdf5" />
      <text x="84" y="147" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">24%</text>
      <text x="38" y="166" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">Reject</text>
      <text x="84" y="166" fill="#8ca0b8" fontFamily="'Manrope',sans-serif" fontSize="7" textAnchor="middle">Accept</text>
      <rect x="140" y="14" width="166" height="152" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <text x="152" y="32" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700">Policy Update Suggestion</text>
      <path d="M152 40h140" stroke="#e8f0fc" strokeWidth="0.8" />
      <rect x="152" y="48" width="32" height="12" rx="4" fill="#fef2f2" />
      <text x="168" y="57" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Before</text>
      <rect x="152" y="64" width="120" height="6" rx="3" fill="#fecaca" opacity="0.5" />
      <rect x="152" y="74" width="96" height="6" rx="3" fill="#fecaca" opacity="0.4" />
      <rect x="152" y="90" width="28" height="12" rx="4" fill="#ecfdf5" />
      <text x="166" y="99" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">After</text>
      <rect x="152" y="106" width="120" height="6" rx="3" fill="#bbf7d0" opacity="0.5" />
      <rect x="152" y="116" width="106" height="6" rx="3" fill="#bbf7d0" opacity="0.4" />
      <rect x="152" y="126" width="80" height="6" rx="3" fill="#bbf7d0" opacity="0.35" />
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
      <rect x="22" y="150" width="50" height="14" rx="7" fill="#eef4ff" />
      <text x="47" y="160" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">Export</text>
      <rect x="164" y="12" width="144" height="156" rx="10" fill="#fff" stroke="#e2ecfa" strokeWidth="1" />
      <rect x="174" y="22" width="60" height="14" rx="7" fill="#ecfdf5" />
      <text x="204" y="32" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="700" textAnchor="middle">Experience</text>
      <text x="174" y="52" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Session Summary</text>
      <rect x="174" y="58" width="118" height="5" rx="2.5" fill="#d1fae5" />
      <rect x="174" y="68" width="96" height="5" rx="2.5" fill="#e6f7f1" />
      <rect x="174" y="78" width="104" height="5" rx="2.5" fill="#d1fae5" />
      <text x="174" y="100" fill="#374a62" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600">Lessons Learned</text>
      <circle cx="180" cy="112" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="109" width="80" height="5" rx="2.5" fill="#e6f7f1" />
      <circle cx="180" cy="124" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="121" width="68" height="5" rx="2.5" fill="#e6f7f1" />
      <circle cx="180" cy="136" r="3" fill="#39c0b7" opacity="0.5" />
      <rect x="188" y="133" width="90" height="5" rx="2.5" fill="#e6f7f1" />
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

function HomeNavIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="mobile-nav-icon">
      <path d="M3 10.5L10 4l7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9v7a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileNavPageIcon({ page }: { page: NavPageKey }) {
  if (page === 'overview') {
    return (
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="mobile-nav-icon">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="mobile-nav-icon">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 7h8M6 10h5M6 13h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
      <path
        d={open ? 'M5 5l10 10M15 5 5 15' : 'M4 6h12M4 10h12M4 14h12'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
