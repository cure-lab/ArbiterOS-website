import { type MouseEvent, useEffect, useState } from 'react';

type Lang = 'en' | 'zh';

const en = {
  meta: {
    homeTitle: 'ArbiterOS | Home',
    titleSuffix: 'ArbiterOS',
    description: 'ArbiterOS is an open-source agent safety governance and observability kernel with policy protection, instruction parsing, Langfuse tracing, and one-click deployment.',
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
  nav: { home: 'Home', overview: 'Overview', howItWorks: 'How It Works', features: 'Features', extension: 'Observability' },
  hero: {
    eyebrow: 'Open-Source Agent Governance',
    title: 'Secure every AI\u00a0agent action before it\u00a0happens.',
    sub: 'ArbiterOS is an open-source protection layer for AI agents. It intercepts model outputs, applies policy-driven safety checks with human-in-the-loop approval, and provides full observability through Langfuse-powered tracing and analysis.',
    primaryBtn: 'Get Started',
    secondaryBtn: 'Learn More',
    meta: ['OpenAI-compatible API', 'OpenClaw Integration', 'Local / Docker Deploy'],
  },
  advantages: {
    label: 'Feature Advantages',
    title: 'Not just forwarding models \u2014 governing the entire Agent execution chain',
    items: [
      {
        title: 'Policy Protection + User Confirmation',
        short: 'Policy-driven interception with human-in-the-loop approval',
        detail: 'When a policy triggers interception, the kernel returns a confirmation prompt and waits for the user\u2019s Yes/No decision, preventing high-risk tool calls from executing directly.',
      },
      {
        title: 'Instruction Parsing & Structured Persistence',
        short: 'Unified instruction streams with replayable trace files',
        detail: 'Maps structured outputs, tool calls, and tool results into a unified instruction stream, generating replayable files per trace for audit and review.',
      },
      {
        title: 'Full-Chain Observability',
        short: 'Pre-call / post-call logging with Langfuse tracing',
        detail: 'Records pre-call and post-call logs simultaneously, integrates Langfuse tracing and node persistence for monitoring performance, behavior, and anomalies.',
      },
      {
        title: 'Skill Trust Scanning',
        short: 'Trust evaluation and caching for skill packages',
        detail: 'Optionally integrates a skill scanner to evaluate trustworthiness of skill packages and cache results, reducing execution risk from untrusted skills.',
      },
      {
        title: 'OpenClaw Out-of-Box Integration',
        short: 'OpenAI-compatible endpoint for seamless workflow integration',
        detail: 'Exposes an OpenAI-compatible interface that can serve as OpenClaw\u2019s default model provider, enabling seamless integration into existing workflows.',
      },
      {
        title: 'One-Click Install & Elastic Deploy',
        short: 'Multiple deployment methods for individuals and teams',
        detail: 'Supports install scripts, user-level systemd, Docker Compose, and local source builds, covering both individual and team environments.',
      },
    ],
  },
  quickStart: {
    label: 'Quick Start',
    title: 'Connect ArbiterOS to your Agent system in three steps',
    steps: [
      { step: '1', title: 'Install & Start Kernel', description: 'Run the install script or Docker Compose to start ArbiterOS Kernel (default port:4000).' },
      { step: '2', title: 'Configure Models & Policies', description: 'Configure models, API keys, optional skill trust scanning, and policy rules in litellm_config.yaml.' },
      { step: '3', title: 'Connect OpenClaw / Your Agent', description: 'Point your model provider to http://127.0.0.1:4000/v1 for instant governance, audit, and observability.' },
    ],
    demo: {
      title: 'Interactive Demo',
      description: 'Explore real governance traces and policy decisions from ArbiterOS selected cases.',
      openLabel: 'Open demo in new tab',
      iframeTitle: 'ArbiterOS selected cases demo',
    },
  },
  howItWorks: {
    label: 'How It Works',
    title: 'From agent output to governed action in four steps',
    steps: [
      { step: '01', title: 'Intercept', description: 'The gateway captures every LLM response before the agent commits to action.' },
      { step: '02', title: 'Parse', description: 'Tool calls and structured outputs become checkable instructions with security metadata.' },
      { step: '03', title: 'Govern', description: 'Configurable policies allow, block, or protect operations \u2014 escalating to human approval when needed.' },
      { step: '04', title: 'Observe', description: 'Trace every decision, analyze failures, and refine policies through evidence-backed dashboards.' },
    ],
  },
  features: {
    label: 'Core Capabilities',
    title: 'Security and reliability at the center',
    desc: 'ArbiterOS makes agent behavior inspectable before it becomes action, and risky behavior governable when reliability matters.',
    items: [
      { title: 'Instruction-Aware Gateway', description: 'Sits on the LLM request path via LiteLLM proxy, converting model outputs and tool intents into structured instructions before execution.' },
      { title: 'Configurable Policy Engine', description: 'Sequential policy checks inspect every action for trustworthiness, confidentiality, reversibility, and execution risk.' },
      { title: 'Human-in-the-Loop Approval', description: 'Sensitive operations escalate through explicit confirmation loops. Approved actions carry full evidence for audit and replay.' },
      { title: 'Traceable Reliability', description: 'Every request, policy decision, and governance trace is persisted for deterministic replay, incident review, and reporting.' },
    ],
  },
  extension: {
    label: 'Visualization Extension',
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
    label: 'Architecture',
    title: 'Full governance from pre-call to post-call',
    nodes: [
      { main: 'Request Preprocessing', sub: 'Trace mgmt / Format merge / Classification' },
      { main: 'LLM Invocation', sub: 'LiteLLM Proxy' },
      { main: 'Response Parsing', sub: 'Structured extraction / Instruction building' },
      { main: 'Policy Check', sub: 'Intercept & rewrite / Yes-No confirmation' },
      { main: 'Audit & Observability', sub: 'Trace files / Langfuse / Logs' },
    ],
  },
  cta: {
    label: 'Get Started',
    title: 'Deploy ArbiterOS in\u00a0minutes',
    desc: 'Clone the repository, configure your model provider, and run with Docker Compose or the install script. The full stack \u2014 Kernel, Langfuse, and infrastructure \u2014 starts with a single command.',
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
    label: 'System Overview',
    title: 'How ArbiterOS governs the AI\u00a0agent execution chain',
    desc: 'ArbiterOS sits on the LLM request path as a transparent governance layer. Every model call from your AI agent passes through the kernel \u2014 parsed, policy-checked, and traced \u2014 before reaching the LLM and before actions execute.',
    architecture: {
      label: 'Architecture',
      title: 'ArbiterOS in the agent ecosystem',
    },
    dataflow: {
      label: 'Data Flow',
      title: 'Request lifecycle: from agent call to governed response',
      stages: [
        { num: '1', title: 'Pre-Call', desc: 'Confirmation detection \u00b7 Trace resolution \u00b7 Format merge \u00b7 Category wrapping \u00b7 Metadata injection' },
        { num: '2', title: 'LLM Call', desc: 'LiteLLM Proxy forwards to upstream \u00b7 OpenAI / GLM / O-series \u00b7 Streaming & batch' },
        { num: '3', title: 'Parse', desc: 'Response extraction \u00b7 Category/topic transform \u00b7 Instruction parsing \u00b7 Security type classification' },
        { num: '4', title: 'Policy', desc: 'Sequential checks \u00b7 Taint validation \u00b7 Block / modify / approve \u00b7 Human confirmation' },
        { num: '5', title: 'Audit', desc: 'Per-trace files \u00b7 Langfuse tracing \u00b7 Pre/post-call logs \u00b7 Auto taint tracking' },
      ],
    },
    comparison: {
      label: 'Why Instruction-Centric',
      title: 'A fundamentally different approach to agent safety',
      desc: 'Traditional security operates at the system-call or network-packet layer \u2014 neither understands what an AI agent is trying to do. ArbiterOS governs at the semantic instruction layer where agent decisions are made.',
      columns: [
        {
          name: 'OpenClaw Sandboxing',
          tag: 'Container Isolation / Exec Approval',
          items: [
            'Container / Process level',
            'Host OS, file system, network binding',
            'Per-container boundary + exec allowlist',
            'None \u2014 binary allow/deny per system call',
            'None \u2014 no metadata propagation across steps',
            'Static allowlist; single exec-level checks',
            'Limited \u2014 treats agent as isolated process',
            'Command-level logging only (commands.log)',
            'Cannot inspect agent decisions or tool-call intent',
          ],
        },
        {
          name: 'OpenClaw Runtime Guard',
          tag: 'PRISM / ClawKeeper / HITL',
          items: [
            'Agent lifecycle hooks / Tool policy',
            'Tool invocations, credential leaks, SOUL.md boundaries',
            'Per-tool allow/deny with TTL-based risk accumulator',
            'Partial \u2014 monitors outgoing domains & sensitive data',
            'None \u2014 risk accumulator is session-level, not per-instruction',
            'Hook-based; all-or-nothing per lifecycle stage',
            'Moderate \u2014 lifecycle hooks & session risk scoring',
            'Session-level risk score; no per-instruction replay',
            'Requires OpenClaw runtime; no cross-platform instruction parsing',
          ],
        },
        {
          name: 'ArbiterOS',
          tag: 'Instruction-Centric Governance',
          items: [
            'LLM response / Instruction level',
            'Every agent action pre-execution across 6 intent categories',
            'Per-instruction with security metadata (confidentiality, trustworthiness, risk, authority)',
            'Full \u2014 two-layer YAML registry classifies executables & paths for READ/WRITE/EXEC intent',
            'Full \u2014 propagated taint (min-trust, max-conf) flows across tool-call instruction chains',
            'Composable pipeline \u2014 relational + unary gate policies; observe-only mode for safe rollout',
            'Deep \u2014 InstructionBuilder normalizes every tool call into a unified instruction graph',
            'Per-trace instruction JSON + Langfuse tracing; deterministic replay & red-team harness',
            'Requires LLM traffic routing through proxy',
          ],
        },
      ],
      rows: ['Protection Layer', 'What It Guards', 'Granularity', 'Semantic Understanding', 'Taint Propagation', 'Policy Architecture', 'Agent Awareness', 'Audit & Replay', 'Key Limitation'],
    },
    kernelEdge: {
      label: 'ArbiterOS Kernel Advantages',
      title: 'Technical capabilities that set ArbiterOS apart',
      items: [
        { title: 'Propagated Taint Tracking', desc: 'Security metadata (confidentiality, trustworthiness) propagates across instruction chains via min-trust / max-conf aggregation \u2014 catching multi-step privilege escalation that per-tool checks miss.' },
        { title: 'Two-Layer Classification Registry', desc: 'Shipped YAML rules classify executables and paths by READ/WRITE/EXEC risk. A user-override layer enables customization without forking \u2014 worst-wins semantics ensure safety defaults.' },
        { title: 'Observe-Only Policy Rollout', desc: 'Policies run full check() logic even when disabled. Modifications are reverted but logged as inactivate_error_type \u2014 enabling shadow-mode evaluation before enforcement.' },
        { title: 'Composable Policy Pipeline', desc: 'Sequential policies (RelationalPolicy + UnaryGatePolicy) see the already-modified response from prior stages \u2014 enabling layered defense-in-depth with registry-driven configuration.' },
      ],
    },
  },
};

const zh: typeof en = {
  meta: {
    homeTitle: 'ArbiterOS | 首页',
    titleSuffix: 'ArbiterOS',
    description: 'ArbiterOS 是一个开源的智能体安全治理与可观测内核，提供策略保护、指令解析、Langfuse 可观测性与一键部署能力。',
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
  nav: { home: '首页', overview: '系统总览', howItWorks: '工作原理', features: '核心能力', extension: '可观测性' },
  hero: {
    eyebrow: '开源智能体安全治理内核',
    title: '让每一次智能体调用都可控、可审计、可回放',
    sub: 'ArbiterOS 在 LiteLLM Proxy 层之上提供策略保护、指令解析、Langfuse 可观测性与技能信任评估，帮助团队更安全地运行智能体。',
    primaryBtn: '三步部署',
    secondaryBtn: '查看核心能力',
    meta: ['兼容 OpenAI 的 API', 'OpenClaw 集成', '本地 / Docker 部署'],
  },
  advantages: {
    label: '功能优势',
    title: '不是只做模型转发，而是治理整个智能体执行链路',
    items: [
      {
        title: '策略保护 + 用户确认',
        short: '策略触发拦截时等待用户决策',
        detail: '当策略触发拦截时，内核会返回确认信息并等待用户进行是/否决策，避免高风险工具调用被直接执行。',
      },
      {
        title: '指令解析与结构化落盘',
        short: '统一映射为指令流并生成可回放文件',
        detail: '将结构化输出、工具调用与工具结果统一映射为指令流，并按追踪生成可回放文件，支持审计与复盘。',
      },
      {
        title: '全链路可观测性',
        short: '记录调用前 / 调用后日志并接入 Langfuse',
        detail: '同时记录调用前 / 调用后日志，接入 Langfuse 追踪与节点持久化，便于监控性能、行为和异常。',
      },
      {
        title: '技能信任扫描',
        short: '对技能包进行信任评估并缓存结果',
        detail: '可选接入技能扫描器，对技能包进行信任评估并缓存结果，降低不可信技能带来的执行风险。',
      },
      {
        title: 'OpenClaw 集成',
        short: '对外暴露兼容 OpenAI 的 API',
        detail: '对外暴露兼容 OpenAI 的 API，配置后可作为 OpenClaw 默认模型提供方，平滑接入现有工作流。',
      },
      {
        title: '一键安装与弹性部署',
        short: '多种部署方式覆盖个人与团队环境',
        detail: '支持安装脚本、用户级 systemd、Docker Compose 与本地源码编译，覆盖个人与团队环境。',
      },
    ],
  },
  quickStart: {
    label: '快速上手',
    title: '三步将 ArbiterOS 接入你的智能体工作流',
    steps: [
      { step: '1', title: '安装并启动内核', description: '运行安装脚本或 Docker Compose，启动 ArbiterOS 内核（默认端口：4000）。' },
      { step: '2', title: '配置模型与策略', description: '在 litellm_config.yaml 中配置模型、API 密钥、可选的技能信任扫描参数与策略规则。' },
      { step: '3', title: '连接 OpenClaw / 你的智能体', description: '将模型提供方指向 http://127.0.0.1:4000/v1，即可获得治理、审计与可观测能力。' },
    ],
    demo: {
      title: '交互式 Demo',
      description: '浏览 ArbiterOS 真实样例中的治理追踪与策略决策过程。',
      openLabel: '在新标签页打开 Demo',
      iframeTitle: 'ArbiterOS 选定样例演示',
    },
  },
  howItWorks: {
    label: '工作原理',
    title: '从智能体输出到受治理动作的四个步骤',
    steps: [
      { step: '01', title: '拦截', description: '网关会在智能体提交动作之前捕获每一次大模型响应。' },
      { step: '02', title: '解析', description: '将工具调用与结构化输出转化为可检查的指令，并附带安全元数据。' },
      { step: '03', title: '治理', description: '可配置策略能够允许、阻止或保护操作，并在必要时升级为人工审批。' },
      { step: '04', title: '观测', description: '追踪每个决策、分析失败原因，并通过基于证据的仪表盘持续优化策略。' },
    ],
  },
  features: {
    label: '核心能力',
    title: '以安全性与可靠性为核心',
    desc: 'ArbiterOS 让智能体行为在执行前可检查，让高风险行为在关键时刻可治理。',
    items: [
      { title: '指令感知网关', description: '通过 LiteLLM Proxy 拦截大模型请求链路，将模型输出与工具意图转化为结构化指令后再执行。' },
      { title: '可配置策略引擎', description: '按顺序执行策略检查，审查每个操作的可信性、保密性、可逆性与执行风险。' },
      { title: 'Human-in-the-Loop 审批', description: '敏感操作会通过明确的确认流程升级。已批准的动作携带完整证据，用于审计与回放。' },
      { title: '可追踪的可靠性', description: '每个请求、策略决策与治理追踪都会被持久化，支持确定性回放、事故复盘与报告分析。' },
    ],
  },
  extension: {
    label: '可视化扩展',
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
    label: '架构能力',
    title: '从调用前到调用后的全流程治理',
    nodes: [
      { main: '请求预处理', sub: '追踪管理 / 格式合并 / 分类封装' },
      { main: 'LLM 调用', sub: 'LiteLLM Proxy' },
      { main: '响应解析', sub: '结构化抽取 / 指令构建' },
      { main: '策略检查', sub: '拦截改写 / 是或否确认' },
      { main: '审计与可观测性', sub: '追踪文件 / Langfuse / 日志' },
    ],
  },
  cta: {
    label: '立即开始',
    title: '把智能体的"可用"升级为"可控"',
    desc: 'ArbiterOS 适合希望将智能体稳定落地到真实业务系统的研发与平台团队。克隆仓库、配置模型提供方，并通过 Docker Compose 或安装脚本运行。',
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
    label: '系统总览',
    title: 'ArbiterOS 如何治理智能体执行链路',
    desc: 'ArbiterOS 作为透明治理层嵌入大模型请求路径。智能体的每一次模型调用都经过内核的解析、策略检查与追踪\u2014\u2014在到达大模型之前、在动作执行之前完成治理。',
    architecture: {
      label: '架构图',
      title: 'ArbiterOS 在智能体生态中的位置',
    },
    dataflow: {
      label: '数据流转',
      title: '请求生命周期：从智能体调用到治理响应',
      stages: [
        { num: '1', title: '调用前处理', desc: '确认检测 \u00b7 追踪解析 \u00b7 格式合并 \u00b7 分类封装 \u00b7 元数据注入' },
        { num: '2', title: 'LLM 调用', desc: 'LiteLLM 代理转发至上游 \u00b7 OpenAI / GLM / O 系列 \u00b7 流式与批量' },
        { num: '3', title: '解析', desc: '响应提取 \u00b7 分类/主题转换 \u00b7 指令解析 \u00b7 安全类型分类' },
        { num: '4', title: '策略', desc: '顺序检查 \u00b7 污点验证 \u00b7 阻止 / 修改 / 放行 \u00b7 人工确认' },
        { num: '5', title: '审计', desc: '按追踪生成文件 \u00b7 Langfuse 追踪 \u00b7 调用前后日志 \u00b7 自动污点跟踪' },
      ],
    },
    comparison: {
      label: '为什么选择指令中心化',
      title: '一种根本不同的智能体安全方法',
      desc: '传统安全在系统调用层或网络包层运作\u2014\u2014两者都无法理解智能体正在做什么。ArbiterOS 在语义指令层进行治理，这正是智能体做出决策的层面。',
      columns: [
        {
          name: 'OpenClaw 沙箱隔离',
          tag: '容器隔离 / 执行审批',
          items: [
            '容器 / 进程级',
            '宿主机 OS、文件系统、网络绑定',
            '按容器的资源边界 + 执行白名单',
            '无\u2014\u2014按系统调用的二元允许/拒绝',
            '无\u2014\u2014无跨步骤元数据传播',
            '静态白名单；单次执行级检查',
            '有限\u2014\u2014将智能体视为隔离进程',
            '仅命令级日志 (commands.log)',
            '无法检查智能体决策或工具调用意图',
          ],
        },
        {
          name: 'OpenClaw 运行时护栏',
          tag: 'PRISM / ClawKeeper / HITL',
          items: [
            '智能体生命周期钩子 / 工具策略',
            '工具调用、凭证泄露、SOUL.md 安全边界',
            '按工具的允许/拒绝 + 基于 TTL 的风险累计器',
            '部分\u2014\u2014监控外发域名与敏感数据',
            '无\u2014\u2014风险累计器仅会话级，非逐指令级',
            '钩子式；按生命周期阶段全有或全无',
            '中等\u2014\u2014生命周期钩子与会话风险评分',
            '会话级风险分；无逐指令回放',
            '依赖 OpenClaw 运行时；无跨平台指令解析',
          ],
        },
        {
          name: 'ArbiterOS',
          tag: '指令中心化治理',
          items: [
            'LLM 响应 / 指令层',
            '执行前的每一个智能体动作，覆盖 6 大意图类别',
            '逐指令的安全元数据（保密性、可信度、风险、权限）',
            '完整\u2014\u2014双层 YAML 注册表按 READ/WRITE/EXEC 意图分类可执行文件与路径',
            '完整\u2014\u2014传播式污点（最小信任度/最大保密度）跨工具调用指令链流动',
            '可组合管线\u2014\u2014关系型 + 一元门控策略；仅观测模式支持安全上线',
            '深度\u2014\u2014InstructionBuilder 将每个工具调用统一为指令图',
            '逐追踪指令 JSON + Langfuse 追踪；确定性回放与红队测试架',
            '需要 LLM 流量经代理路由',
          ],
        },
      ],
      rows: ['保护层级', '守护目标', '治理粒度', '语义理解', '污点传播', '策略架构', '智能体感知', '审计与回放', '主要限制'],
    },
    kernelEdge: {
      label: 'ArbiterOS 内核优势',
      title: '让 ArbiterOS 脱颖而出的技术能力',
      items: [
        { title: '传播式污点追踪', desc: '安全元数据（保密性、可信度）通过最小信任度/最大保密度聚合在指令链中传播\u2014\u2014捕获逐工具检查遗漏的多步权限提升。' },
        { title: '双层分类注册表', desc: '内置 YAML 规则按 READ/WRITE/EXEC 风险分类可执行文件和路径。用户覆盖层支持无需 fork 的定制\u2014\u2014最坏值优先语义确保安全默认。' },
        { title: '仅观测策略部署', desc: '策略在禁用状态下仍运行完整的 check() 逻辑。修改会被回滚但记录为 inactivate_error_type\u2014\u2014支持在强制执行前进行影子模式评估。' },
        { title: '可组合策略管线', desc: '顺序策略（RelationalPolicy + UnaryGatePolicy）各自看到前置策略已修改的响应\u2014\u2014通过注册表驱动的配置实现分层纵深防御。' },
      ],
    },
  },
};

const i18n = { en, zh };

const featureIcons = [GatewayIcon, PolicyEngineIcon, ApprovalIcon, ReliabilityIcon];
const advantageIcons = [ShieldConfirmIcon, InstructionParseIcon, ObservabilityIcon, TrustScanIcon, OpenClawIcon, DeployIcon];
const extensionVisuals = [
  GovernanceDashboardVisual, TraceGraphVisual, ErrorAnalysisVisual,
  ViolationTrackingVisual, PolicyRefinementVisual, ExperienceAssetsVisual,
];

type SiteCopy = typeof en;
type PageKey = 'home' | 'overview' | 'how-it-works' | 'features' | 'extension';
type NavPageKey = Exclude<PageKey, 'home'>;

const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const langStorageKey = 'arbiteros-site-lang';

const pagePaths: Record<PageKey, string> = {
  home: withBasePath('/'),
  overview: withBasePath('/overview'),
  'how-it-works': withBasePath('/how-it-works'),
  features: withBasePath('/features'),
  extension: withBasePath('/extension'),
};

const navItems: Array<{ page: NavPageKey; label: (copy: SiteCopy) => string }> = [
  { page: 'overview', label: (copy) => copy.nav.overview },
  { page: 'how-it-works', label: (copy) => copy.nav.howItWorks },
  { page: 'features', label: (copy) => copy.nav.features },
  { page: 'extension', label: (copy) => copy.nav.extension },
];

function withBasePath(path: `/${string}`): string {
  if (!appBasePath) {
    return path;
  }

  return path === '/' ? `${appBasePath}/` : `${appBasePath}${path}`;
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
      return 'how-it-works';
    case '/features':
      return 'features';
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
    case 'how-it-works':
      return copy.nav.howItWorks;
    case 'features':
      return copy.nav.features;
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
            GitHub
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
            <HeroSection t={t} lang={lang} />
            <CtaSection t={t} />
            <AdvantagesSection t={t} onSelect={setActiveAdvantage} />
            <QuickStartSection t={t} />
          </>
        )}
        {page === 'overview' && <OverviewSection t={t} />}
        {page === 'how-it-works' && <HowItWorksSection t={t} />}
        {page === 'features' && <FeaturesSection t={t} />}
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

function HeroSection({ t, lang }: { t: SiteCopy; lang: Lang }) {
  return (
    <section className="hero container">
      <div className="hero-content">
        <span className={`eyebrow ${lang === 'zh' ? 'eyebrow-cn' : ''}`}>{t.hero.eyebrow}</span>
        <h1>{t.hero.title}</h1>
        <p className="hero-sub">{t.hero.sub}</p>
      </div>
      <div className="hero-panel">
        <div className="code-card">
          <p className="code-title">{t.quickStart.label}</p>
          <pre>
            <code>{`git clone https://github.com/cure-lab/ArbiterOS.git
cd ArbiterOS
chmod +x install.sh
./install.sh

./run-kernel.sh`}</code>
          </pre>
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
          <div className="hero-meta cta-meta">
            {t.hero.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
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

function QuickStartSection({ t }: { t: SiteCopy }) {
  const demoHref = withBasePath('/demo/selected-cases/index.html');

  return (
    <section className="container section quickstart-section">
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
        <div className="quickstart-demo">
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
        <EcosystemDiagram />
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
          <span className="section-label">{t.overview.comparison.label}</span>
          <h3>{t.overview.comparison.title}</h3>
          <p className="section-desc">{t.overview.comparison.desc}</p>
        </div>
        <div className="comparison-grid">
          {t.overview.comparison.columns.map((col, colIdx) => (
            <div className={`comparison-col${colIdx === 2 ? ' comparison-col-highlight' : ''}`} key={col.name}>
              <div className="comparison-head">
                <h4>{col.name}</h4>
                <span className="comparison-tag">{col.tag}</span>
              </div>
              {col.items.map((value, rowIdx) => (
                <div className="comparison-cell" key={rowIdx}>
                  <span className="comparison-cell-label">{t.overview.comparison.rows[rowIdx]}</span>
                  <span className="comparison-cell-value">{value}</span>
                </div>
              ))}
            </div>
          ))}
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

function EcosystemDiagram() {
  return (
    <svg viewBox="0 0 760 440" className="eco-svg" role="img" aria-label="ArbiterOS ecosystem architecture">
      <defs>
        <linearGradient id="eco-bg" x1="0" y1="0" x2="760" y2="440">
          <stop offset="0%" stopColor="#f8faff" />
          <stop offset="100%" stopColor="#eef4ff" />
        </linearGradient>
        <linearGradient id="eco-arrow" x1="180" y1="0" x2="576" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <linearGradient id="eco-arrow-v" x1="0" y1="66" x2="0" y2="354" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b5d0f0" />
          <stop offset="100%" stopColor="#6ea8ff" />
        </linearGradient>
        <marker id="eco-arrowhead" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#6ea8ff" opacity="0.9" />
        </marker>
        <marker id="eco-arrowhead-soft" viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8.5" refY="5" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#b5d0f0" opacity="0.95" />
        </marker>
        <linearGradient id="eco-kernel-fill" x1="236" y1="96" x2="524" y2="324">
          <stop offset="0%" stopColor="#eef4ff" />
          <stop offset="100%" stopColor="#f5f9ff" />
        </linearGradient>
        <filter id="eco-shadow" x="-4%" y="-4%" width="108%" height="112%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0f2844" floodOpacity="0.06" />
        </filter>
        <clipPath id="eco-agents-clip">
          <rect x="16" y="116" width="164" height="188" rx="16" />
        </clipPath>
        <clipPath id="eco-kernel-clip">
          <rect x="236" y="96" width="288" height="228" rx="18" />
        </clipPath>
        <clipPath id="eco-providers-clip">
          <rect x="580" y="116" width="164" height="188" rx="16" />
        </clipPath>
        <clipPath id="eco-observability-clip">
          <rect x="200" y="358" width="360" height="64" rx="14" />
        </clipPath>
      </defs>

      <rect width="760" height="440" rx="18" fill="url(#eco-bg)" />
      <circle cx="60" cy="50" r="40" fill="#dbeafe" opacity="0.15" />
      <circle cx="700" cy="400" r="50" fill="#d1fae5" opacity="0.1" />

      {/* Human Operator */}
      <g filter="url(#eco-shadow)">
        <rect x="280" y="14" width="200" height="52" rx="14" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <circle cx="330" cy="40" r="12" fill="#eef4ff" />
      <text x="330" y="44" fill="#0f66ff" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="800" textAnchor="middle">H</text>
      <text x="352" y="36" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700">Human Operator</text>
      <text x="352" y="50" fill="#8ca0b8" fontFamily="'Public Sans',sans-serif" fontSize="8.5">Approve / Reject</text>

      {/* Arrow: Human to Kernel */}
      <path d="M375 66 v14 h-6 l11 12 l11 -12 h-6 v-14 Z" fill="url(#eco-arrow-v)" stroke="url(#eco-arrow-v)" strokeWidth="1" strokeLinejoin="round" />
      <text x="396" y="82" fill="#6ea8ff" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="600">Yes/No</text>

      {/* AI Agents */}
      <g filter="url(#eco-shadow)">
        <rect x="16" y="116" width="164" height="188" rx="16" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="16" y="116" width="164" height="4" rx="2" fill="#f59e0b" opacity="0.5" clipPath="url(#eco-agents-clip)" />
      <text x="98" y="146" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">AI Agents</text>
      <rect x="34" y="160" width="128" height="28" rx="8" fill="#fffbeb" stroke="#fde68a" strokeWidth="0.8" />
      <text x="98" y="178" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">OpenClaw</text>
      <rect x="34" y="194" width="128" height="28" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="0.8" />
      <text x="98" y="212" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">Nanobot</text>
      <rect x="34" y="228" width="128" height="28" rx="8" fill="#fefce8" stroke="#fde68a" strokeWidth="0.8" />
      <text x="98" y="246" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">Custom Agent</text>
      <text x="98" y="286" fill="#8ca0b8" fontFamily="'Public Sans',sans-serif" fontSize="8" textAnchor="middle">LLM URL → Kernel</text>

      {/* Arrows: Agents to Kernel */}
      <path d="M180 195 h38 v-6 l14 11 l-14 11 v-6 h-38 Z" fill="url(#eco-arrow)" stroke="url(#eco-arrow)" strokeWidth="1" strokeLinejoin="round" />
      <text x="206" y="185" fill="#6ea8ff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Request</text>
      <path d="M232 220H180" fill="none" stroke="#b5d0f0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#eco-arrowhead-soft)" />
      <text x="206" y="234" fill="#b5d0f0" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Response</text>

      {/* ArbiterOS Kernel */}
      <g filter="url(#eco-shadow)">
        <rect x="236" y="96" width="288" height="228" rx="18" fill="url(#eco-kernel-fill)" stroke="#0f66ff" strokeWidth="1.2" strokeOpacity="0.25" />
      </g>
      <rect x="236" y="96" width="288" height="5" rx="2.5" fill="#0f66ff" opacity="0.35" clipPath="url(#eco-kernel-clip)" />
      <text x="380" y="124" fill="#0c1d36" fontFamily="'Manrope',sans-serif" fontSize="13" fontWeight="800" textAnchor="middle">ArbiterOS Kernel</text>
      <rect x="256" y="140" width="120" height="32" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="316" y="160" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">LiteLLM Proxy</text>
      <rect x="384" y="140" width="120" height="32" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="444" y="160" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">Instruction Parser</text>
      <rect x="256" y="180" width="120" height="32" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="316" y="200" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">Policy Engine</text>
      <rect x="384" y="180" width="120" height="32" rx="10" fill="#fff" stroke="#d0e2f6" strokeWidth="0.8" />
      <text x="444" y="200" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="700" textAnchor="middle">Registry & Taint</text>

      {/* Taint dimension pills */}
      <rect x="256" y="224" width="248" height="24" rx="8" fill="rgba(255,255,255,0.7)" stroke="#e2ecfa" strokeWidth="0.8" />
      <rect x="264" y="228" width="40" height="16" rx="8" fill="#fef2f2" />
      <text x="284" y="239" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Risk</text>
      <rect x="308" y="228" width="42" height="16" rx="8" fill="#eef4ff" />
      <text x="329" y="239" fill="#0f66ff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Trust</text>
      <rect x="354" y="228" width="48" height="16" rx="8" fill="#ecfdf5" />
      <text x="378" y="239" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Confid.</text>
      <rect x="406" y="228" width="48" height="16" rx="8" fill="#fffbeb" />
      <text x="430" y="239" fill="#ca8a04" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Revers.</text>
      <rect x="458" y="228" width="38" height="16" rx="8" fill="#f0f7ff" />
      <text x="477" y="239" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Auth</text>

      {/* Instruction categories */}
      <rect x="256" y="258" width="248" height="50" rx="10" fill="rgba(255,255,255,0.5)" stroke="#e2ecfa" strokeWidth="0.6" />
      <text x="380" y="273" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="7.5" fontWeight="700" textAnchor="middle">INSTRUCTION CATEGORIES</text>
      <rect x="264" y="280" width="70" height="18" rx="6" fill="#eef4ff" />
      <text x="299" y="292" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">COGNITIVE</text>
      <rect x="340" y="280" width="76" height="18" rx="6" fill="#ecfdf5" />
      <text x="378" y="292" fill="#16a34a" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">ACTUATION</text>
      <rect x="422" y="280" width="76" height="18" rx="6" fill="#fef3c7" />
      <text x="460" y="292" fill="#92400e" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">PERCEPTION</text>

      {/* Arrows: Kernel to LLMs */}
      <path d="M524 195 h38 v-6 l14 11 l-14 11 v-6 h-38 Z" fill="url(#eco-arrow)" stroke="url(#eco-arrow)" strokeWidth="1" strokeLinejoin="round" />
      <text x="550" y="185" fill="#6ea8ff" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">API Call</text>
      <path d="M576 220H524" fill="none" stroke="#b5d0f0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" markerEnd="url(#eco-arrowhead-soft)" />
      <text x="550" y="234" fill="#b5d0f0" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">LLM Output</text>

      {/* LLM Providers */}
      <g filter="url(#eco-shadow)">
        <rect x="580" y="116" width="164" height="188" rx="16" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="580" y="116" width="164" height="4" rx="2" fill="#22c55e" opacity="0.5" clipPath="url(#eco-providers-clip)" />
      <text x="662" y="146" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">LLM Providers</text>
      <rect x="598" y="176" width="128" height="62" rx="10" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="1" />
      <text x="662" y="199" fill="#166534" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700" textAnchor="middle">OpenAI</text>
      <text x="662" y="213" fill="#166534" fontFamily="'Manrope',sans-serif" fontSize="11" fontWeight="700" textAnchor="middle">Compatible API</text>
      <text x="662" y="230" fill="#6b84a3" fontFamily="'Public Sans',sans-serif" fontSize="8" textAnchor="middle">/v1 endpoint</text>
      <text x="662" y="268" fill="#8ca0b8" fontFamily="'Public Sans',sans-serif" fontSize="8" textAnchor="middle">Any compatible model</text>

      {/* Arrow: Kernel to Observability */}
      <path d="M375 324 v18 h-6 l11 12 l11 -12 h-6 v-18 Z" fill="url(#eco-arrow-v)" stroke="url(#eco-arrow-v)" strokeWidth="1" strokeLinejoin="round" />

      {/* Observability */}
      <g filter="url(#eco-shadow)">
        <rect x="200" y="358" width="360" height="64" rx="14" fill="#fff" stroke="#d0e2f6" strokeWidth="1" />
      </g>
      <rect x="200" y="358" width="360" height="4" rx="2" fill="#39c0b7" opacity="0.5" clipPath="url(#eco-observability-clip)" />
      <text x="380" y="384" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">Observability</text>
      <rect x="249" y="394" width="76" height="18" rx="9" fill="#e0f7f5" />
      <text x="287" y="407" fill="#0d9488" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600" textAnchor="middle">Langfuse</text>
      <rect x="333" y="394" width="90" height="18" rx="9" fill="#eef4ff" />
      <text x="378" y="407" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600" textAnchor="middle">Instruction Files</text>
      <rect x="431" y="394" width="80" height="18" rx="9" fill="#f1f5fa" />
      <text x="471" y="407" fill="#6b84a3" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600" textAnchor="middle">API Call Logs</text>
    </svg>
  );
}

function HowItWorksSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section" id="how-it-works">
      <div className="section-header section-header-wide">
        <span className="section-label">{t.howItWorks.label}</span>
        <h2>{t.howItWorks.title}</h2>
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
      <div className="how-architecture">
        <div className="how-architecture-header">
          <span className="section-label">{t.architecture.label}</span>
          <h3>{t.architecture.title}</h3>
        </div>
        <div className="arch-flow">
          {t.architecture.nodes.flatMap((node, i) => {
            const items = [];

            if (i > 0) {
              items.push(
                <div className="flow-arrow" key={`arrow-${i}`}>→</div>,
              );
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
    </section>
  );
}

function FeaturesSection({ t }: { t: SiteCopy }) {
  return (
    <section className="container section" id="features">
      <div className="section-header">
        <span className="section-label">{t.features.label}</span>
        <h2>{t.features.title}</h2>
        <p className="section-desc">{t.features.desc}</p>
      </div>
      <div className="features-layout">
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
        <div className="features-illustration">
          <HeroIllustration />
        </div>
      </div>
    </section>
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

      

      <circle cx="80" cy="60" r="55" fill="#dbeafe" opacity="0.22" />
      <circle cx="460" cy="390" r="65" fill="#d1fae5" opacity="0.15" />
      <circle cx="440" cy="40" r="22" fill="#39c0b7" opacity="0.05" />
      <circle cx="35" cy="360" r="30" fill="#dbeafe" opacity="0.14" />

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

      <text x="260" y="198" fill="#1e3d5f" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="800" textAnchor="middle">ArbiterOS Kernel</text>
      <rect x="205" y="206" width="36" height="15" rx="7.5" fill="#eef4ff" stroke="#d0e2f6" strokeWidth="0.5" />
      <text x="223" y="217" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Parse</text>
      <rect x="245" y="206" width="36" height="15" rx="7.5" fill="#eef4ff" stroke="#d0e2f6" strokeWidth="0.5" />
      <text x="263" y="217" fill="#3b6eb5" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Policy</text>
      <rect x="285" y="206" width="36" height="15" rx="7.5" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.5" />
      <text x="303" y="217" fill="#dc2626" fontFamily="'Manrope',sans-serif" fontSize="7" fontWeight="600" textAnchor="middle">Block</text>

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

      <path d="M260 226v24" fill="none" stroke="url(#arrow-v)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M260 249l-5-8h10Z" fill="#6ea8ff" opacity="0.85" />
      <circle cx="260" cy="229" r="1.8" fill="#0f66ff" opacity="0.35" />
      <circle cx="260" cy="234" r="2.2" fill="#0f66ff" opacity="0.25" />
      <circle cx="260" cy="240" r="2.6" fill="#0f66ff" opacity="0.15" />

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
  if (page === 'how-it-works') {
    return (
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="mobile-nav-icon">
        <path d="M10 2a5 5 0 0 0-5 5c0 1.8.9 3.3 2.3 4.2.4.3.7.8.7 1.3V13h4v-.5c0-.5.3-1 .7-1.3A5 5 0 0 0 10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 15h4M8.5 17h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="8" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }
  if (page === 'features') {
    return (
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18" className="mobile-nav-icon">
        <path d="M6 3.5h8a1.2 1.2 0 0 1 1.2 1.2v11.1a.5.5 0 0 1-.75.43L10 13.7l-4.45 2.56a.5.5 0 0 1-.75-.43V4.7A1.2 1.2 0 0 1 6 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m10 6.2.95 1.92 2.12.31-1.53 1.49.36 2.1L10 11.02l-1.9 1 .36-2.1-1.53-1.49 2.12-.31L10 6.2z" fill="currentColor" opacity="0.55" />
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
