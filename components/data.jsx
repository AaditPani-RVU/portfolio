// Centralized data — all content sourced from resume + GitHub (github.com/AaditPani-RVU)

const PROFILE = {
  name: 'Aadit Pani',
  tagline: 'Building Secure, Intelligent Systems at the Edge',
  roles: ['AI Engineer', 'Systems Builder', 'Security-Focused Developer', 'Edge AI Researcher'],
  email: 'aadi.pani@gmail.com',
  phone: '+91 9880016643',
  github: 'github.com/AaditPani-RVU',
  linkedin: 'linkedin.com/in/aadit-pani-260078290',
  location: 'Bengaluru, IN',
  about: [
    "I build production systems at the seam where ML meets security — and they interlock: a local voice OS, the neuro-symbolic guardrail engine that polices it, the fuzzer that attacks those guardrails, and a Rust inference engine that compiles policy into the decoder itself.",
    "My instinct is to design from the protocol up: what's the threat model, what fails when the network drops, how does it run on a Raspberry Pi without the cloud.",
    "Currently a CS (AI/ML) student at RV University and AI Engineering intern at HYRGPT, shipping a healthcare AI assistant with retrieval, structured outputs, and safety layers."
  ]
};

const HERO_STATS = [
  { k: '2', v: 'Packages on PyPI' },
  { k: '6', v: 'Systems in the stack' },
  { k: 'IEEE', v: 'CAI 2026 accepted' },
  { k: '0.48ms', v: 'Guard eval latency' }
];

const PROJECTS = [
  {
    id: 'nora',
    index: '01',
    name: 'NORA',
    subtitle: 'Local Voice AI Operating System',
    year: '2026 — Present',
    status: 'ACTIVE',
    accent: 'cyan',
    repo: 'https://github.com/AaditPani-RVU/N.O.R.A',
    problem: "Cloud-tethered voice assistants leak intent, fail offline, and can't be trusted with destructive system actions.",
    solution: "A fully-local voice OS for Windows. Voice, text, WhatsApp, or UI in → policy guard → intent → command engine → speech out, with screen vision and cognitive memory layered on top. Sub-second loop, nothing leaves the machine.",
    pipeline: ['faster-whisper STT', 'NeuroSym input guard', 'LLM intent (Groq / Claude / Ollama)', 'Command engine', 'edge-TTS'],
    highlights: [
      { k: '40+', v: 'voice commands' },
      { k: '9', v: 'injection attack categories blocked' },
      { k: '0', v: 'cloud dependencies in core path' }
    ],
    features: [
      { title: 'Screen Intelligence', body: 'Claude Vision (Haiku) describes screens, clicks UI by voice description, OCR-extracts, watches for events ("tell me when training finishes"), diagnoses stack traces.' },
      { title: 'Cognitive Memory v2', body: 'ChromaDB + sentence-transformers for semantic & episodic recall. Proactive engine predicts workflows from time-of-day patterns and bigram command sequences.' },
      { title: 'Hardened Action Layer', body: 'NeuroSym v0.5 enforces destructive-action confirmation, path sandboxing, and step-count limits before any command executes — plus output secret-leakage and streaming abort rules.' }
    ],
    stack: ['Python', 'faster-whisper', 'ChromaDB', 'Claude Vision', 'Ollama', 'NeuroSym-AI', 'edge-TTS']
  },
  {
    id: 'neurosym',
    index: '02',
    name: 'NeuroSym-AI',
    subtitle: 'Neuro-Symbolic Guardrails for LLMs · v0.5.0',
    year: 'Jul 2025 — Present',
    status: 'SHIPPED · PyPI v0.5.0',
    accent: 'violet',
    repo: 'https://github.com/AaditPani-RVU/NeuroSym-AI',
    pypi: 'https://pypi.org/project/neurosym-ai/',
    install: 'pip install neurosym-ai',
    problem: "Guardrail libraries that depend on another LLM are slow, leaky, and recursive. They guard the prompt, never the output, the stream, or the action. Real safety needs deterministic, two-sided, auditable policy.",
    solution: "Provider-agnostic neuro-symbolic engine guarding the full pipeline — voice transcription, LLM output, streaming chunks, and agent action plans. v0.5.0 makes it declarative: point Guard.from_yaml() at a config file and ship, with LangChain and LlamaIndex adapters that drop into existing pipelines.",
    pipeline: ['Input guard (voice / prompt)', 'Symbolic + semantic rule eval', 'Streaming chunk guard', 'Output guard (secrets / PII redaction)', 'Action-graph policy', 'Structured audit trace'],
    highlights: [
      { k: '79.8%', v: 'block rate on 134-case benchmark' },
      { k: '0%', v: 'false positives' },
      { k: '0.48ms', v: 'avg eval latency' }
    ],
    features: [
      { title: 'Two-Sided + Streaming Guards', body: 'Input rules detect prompt injection across 9 attack presets, with a semantic embedding fallback. Output rules block AWS keys, JWTs, private keys, and system-prompt regurgitation. Streaming rules abort mid-token the moment a secret appears.' },
      { title: 'Config, Not Code — v0.5.0', body: 'Guard.from_yaml() loads a full guard stack from YAML — 13 built-in rule types plus custom registration. RedactionRule cleans PII instead of blocking the turn. Ships NeMo-migration docs and LangChain / LlamaIndex adapters.' },
      { title: 'Session-Aware Defense', body: 'Multi-turn ConversationGuard catches attacks spread across turns. Zero-shot IntentClassifierRule flags harmful intent on CPU-only NLI — no API key. Action-graph policy composes rules with a boolean algebra (AllOf · AnyOf · Not · Implies), fully audit-traced.' }
    ],
    stack: ['Python', 'YAML config', 'LangChain', 'LlamaIndex', 'Typer', 'Z3 (optional)', 'mypy strict', 'PyPI']
  },
  {
    id: 'synapse',
    index: '03',
    name: 'Synapse',
    subtitle: 'Policy-Fused Inference Engine in Rust',
    year: '2026 — Present',
    status: 'PHASE 0 · FOUNDATION',
    accent: 'cyan',
    repo: 'https://github.com/AaditPani-RVU/Synapse',
    problem: "Generic engines (Ollama, llama.cpp) are blind to the agent they serve — they recompute identical system prompts every turn, retry malformed outputs, and know nothing about the safety layer sitting next to them.",
    solution: "A Rust inference engine that fuses the agent and its guardrails into the decoder. NeuroSym policies compile into a decoding grammar that masks logits — out-of-policy output becomes structurally impossible to emit. Safer and faster at the same time, by design.",
    pipeline: ['NeuroSym policy → decoding grammar', 'Grammar Gate (logit masking)', 'Prefix Vault (radix-tree KV reuse)', 'Echo Drafter (speculative decode)', 'Router (per-request model pick)'],
    highlights: [
      { k: 'Rust', v: 'zero-GC decoder hot path' },
      { k: '0', v: 'retries — invalid output undecodable' },
      { k: '2', v: 'systems it serves: NORA + NeuroSym' }
    ],
    features: [
      { title: 'Grammar Gate', body: 'Compiles NeuroSym policies into a decoding grammar and masks logits so the model can only emit valid, in-policy output. Malformed or unsafe output is structurally impossible — zero retries.' },
      { title: 'Prefix Vault', body: 'Radix-tree KV-cache reuse of the fixed system + guardrail preamble across turns. Stops recomputing the same 1–2k tokens on every single call — lower time-to-first-token.' },
      { title: 'Echo Drafter', body: "Speculative decoding drafted from a suffix-automaton over NORA's own command history. Higher throughput on repetitive commands, provably lossless output." }
    ],
    stack: ['Rust', 'Logit masking', 'Radix-tree KV cache', 'Suffix automaton', 'Speculative decoding']
  },
  {
    id: 'lethe',
    index: '04',
    name: 'Lethe',
    subtitle: 'Policy-Algebra-Aware Fuzzer for LLM Guardrails',
    year: '2026 — Present',
    status: 'SHIPPED · PyPI',
    accent: 'violet',
    repo: 'https://github.com/AaditPani-RVU/lethe',
    pypi: 'https://pypi.org/project/lethe-fuzz/',
    install: 'pip install lethe-fuzz',
    problem: "Garak red-teams LLMs. Nobody red-teams the guardrail sitting in front of the LLM — the classifiers, rule engines, and policy stacks that are supposed to hold the line.",
    solution: "A fuzzer that attacks guardrail systems with mutations that know how guardrails think — homoglyphs, policy-algebra edge cases, streaming drip payloads — plus a genetic-algorithm loop that evolves bypasses. I built the guardrail; this is the tool I built to break it.",
    pipeline: ['Seed corpus (JSONL)', 'String / policy / streaming mutators', 'Genetic-algorithm evolution', 'Adapter → target guardrail', 'Partial-bypass detection', 'Filterable HTML report'],
    highlights: [
      { k: '3', v: 'mutation families' },
      { k: 'GA', v: 'evolved bypass search' },
      { k: '46', v: 'tests · CI green' }
    ],
    features: [
      { title: 'Guardrail-Shaped Mutations', body: 'Case flips, Cyrillic homoglyph substitution, and policy-algebra probes built to defeat regex rules and embedding classifiers — not just random noise.' },
      { title: 'Streaming-Aware Probes', body: 'Late-resolve and drip payloads that stay benign chunk-by-chunk and only turn malicious once assembled — the blind spot of chunk-level stream guards.' },
      { title: 'Any Target', body: 'Adapter protocol plugs into any guardrail: NeuroSym, LLM Guard, and Guardrails AI adapters ship in the box, with confidence-aware partial-bypass detection.' }
    ],
    stack: ['Python', 'Genetic algorithms', 'Unicode homoglyphs', 'Adapter protocol', 'HTML reports', 'Apache-2.0', 'PyPI']
  },
  {
    id: 'edgegensec',
    index: '05',
    name: 'EdgeGenSec',
    subtitle: 'Lightweight Intrusion Detection on Raspberry Pi',
    year: 'Jul 2025 — Present',
    status: 'DEPLOYED',
    accent: 'cyan',
    repo: 'https://github.com/AaditPani-RVU/EdgeGenSecIDS-Clean',
    problem: "Real-world IDS datasets are wildly imbalanced — Heartbleed, Infiltration, SQLi barely register. Edge devices can't run heavy CNN baselines.",
    solution: "GAN-synthesized rare attacks + few-shot Prototypical Networks, quantized to TorchScript for Pi 5. Adaptive retraining on uncertain traffic.",
    pipeline: ['CICIDS flow features (78D)', 'GAN attack synthesis', 'Prototypical Network classifier', 'TorchScript + INT8 quant', 'Adaptive retrain loop'],
    highlights: [
      { k: '78D', v: 'CICIDS-style flow features' },
      { k: 'Pi 5', v: 'real-time inference target' },
      { k: '4', v: 'rare-class attacks recovered' }
    ],
    features: [
      { title: 'GAN Attack Synthesis', body: 'Synthesizes SQLi, XSS, Heartbleed, and Infiltration samples to balance the long tail. Improves recall on under-represented classes without inflating FPR.' },
      { title: 'Few-Shot Prototypical Net', body: 'Episodic training over rare-attack support sets. Outperforms CNN baselines when only a handful of labeled samples exist.' },
      { title: 'Edge-Tuned Inference', body: 'TorchScript export + post-training quantization slashes latency and memory. Adaptive retrain loop ingests high-uncertainty traffic.' }
    ],
    stack: ['PyTorch', 'TorchScript', 'CICIDS', 'GANs', 'Prototypical Nets', 'Raspberry Pi 5']
  },
  {
    id: 'geofence',
    index: '06',
    name: 'Geo-Fence Swarm',
    subtitle: 'Autonomous Perimeter Monitoring',
    year: 'Sep 2025 — Present',
    status: 'FIELD TEST',
    accent: 'violet',
    problem: "Static security cameras miss the perimeter. Patrolling humans don't scale. Off-the-shelf drones leak everything to vendor clouds.",
    solution: "Distributed Pi + ESP32 swarm — static sensor nodes plus a motorized rover — talking over secure MQTT, with on-device YOLO and a streaming Flask dashboard.",
    pipeline: ['PIR / Ultrasonic / GPS sensing', 'Rover patrol (L298N motors)', 'On-device YOLO detection', 'Secure MQTT telemetry', 'Flask streaming dashboard'],
    highlights: [
      { k: '3', v: 'sensor modalities fused' },
      { k: 'YOLO', v: 'on-device human detection' },
      { k: 'MQTT', v: 'TLS-secured telemetry' }
    ],
    features: [
      { title: 'Multi-Layer Sensing', body: 'PIR motion, ultrasonic range, GPS position fused over GPIO. Layered detection survives single-modality failure.' },
      { title: 'Autonomous Rover', body: 'L298N-driven platform with patrol logic, obstacle avoidance, and geo-boundary navigation. Captures and geo-tags intrusion events on contact.' },
      { title: 'Secure Mesh', body: 'TLS-MQTT links static nodes to the rover and a Flask streaming dashboard. Telemetry stays inside your network.' }
    ],
    stack: ['Raspberry Pi', 'ESP32', 'YOLO', 'MQTT', 'Flask', 'L298N', 'GPS / PIR / Ultrasonic']
  }
];

// The four systems that interlock into one local-AI stack.
// Edges are real dependencies: NORA imports neurosym-ai, Synapse compiles
// NeuroSym policies into its decoder, Lethe ships a NeuroSym adapter.
const STACK_MAP = {
  nodes: [
    { id: 'lethe',    name: 'LETHE',      role: 'ADVERSARY',  desc: 'fuzzes the guardrails',        accent: 'amber' },
    { id: 'neurosym', name: 'NEUROSYM',   role: 'BRAIN',      desc: 'deterministic policy engine',  accent: 'violet' },
    { id: 'synapse',  name: 'SYNAPSE',    role: 'REFLEX',     desc: 'policy-fused decoder',         accent: 'cyan' },
    { id: 'nora',     name: 'NORA',       role: 'BODY',       desc: 'voice OS that acts',           accent: 'green' }
  ]
};

const SIDE_PROJECTS = [
  {
    name: 'FR3AK',
    desc: 'Conversation intelligence over multi-user chat transcripts: Plutchik 8-D emotion modeling per message, sarcasm and manipulation detection, per-participant risk profiling, and grounded LLM summaries on a FastAPI dashboard.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'Groq'],
    repo: 'https://github.com/AaditPani-RVU/FR3AK',
    accent: 'violet'
  },
  {
    name: 'AI SDR Agent',
    desc: 'Autonomous B2B outbound with no human in the loop: researches prospects via Tavily, writes 3-email PAS sequences tone-calibrated by seniority, sends through Gmail, classifies replies, and pings Slack when a meeting books. n8n drives day-3 / day-7 follow-ups.',
    tags: ['FastAPI', 'Groq', 'Gmail API', 'n8n', 'Next.js'],
    repo: 'https://github.com/AaditPani-RVU/ai-sdr-agent',
    accent: 'cyan'
  },
  {
    name: 'Job Hunter',
    desc: 'Daily internship pipeline: pulls from 8+ job sources, hard-filters dealbreakers with zero AI cost, scores each role 0–100 with LLaMA-70B reasoning, and drafts 130-word cover letters grounded in my actual resume — delivered as an email + Telegram digest.',
    tags: ['Python', 'Groq', 'RSS / APIs', 'Telegram'],
    repo: 'https://github.com/AaditPani-RVU/job-hunter',
    accent: 'cyan'
  }
];

const SKILLS = [
  {
    cat: 'AI / ML',
    color: 'cyan',
    items: ['Intrusion Detection', 'GANs', 'CNNs', 'Few-Shot Learning', 'Prototypical Networks', 'Quantization', 'TorchScript', 'RAG', 'Explainability']
  },
  {
    cat: 'Security',
    color: 'violet',
    items: ['Threat Modeling', 'Symbolic Policy Rules', 'Guardrail Fuzzing', 'JSON Schema Validation', 'Regex Policies', 'Composite Policy Algebra', 'Repair Loops', 'Audit Traces', 'Z3']
  },
  {
    cat: 'Systems',
    color: 'cyan',
    items: ['Python', 'Rust', 'C / C++', 'JavaScript', 'FastAPI', 'Flask', 'SQLite3', 'Docker', 'Kubernetes', 'GitHub Actions']
  },
  {
    cat: 'Edge / IoT',
    color: 'violet',
    items: ['Raspberry Pi', 'ESP32', 'Arduino', 'MQTT', 'GPS', 'PIR / Ultrasonic', 'Secure Edge Deploy']
  },
  {
    cat: 'Data / FinTech',
    color: 'cyan',
    items: ['Fraud Analytics', 'Digital Payments', 'Blockchain', 'GCP BigQuery', 'NumPy', 'ChromaDB', 'Matplotlib']
  },
  {
    cat: 'Tools',
    color: 'violet',
    items: ['Git', 'VS Code', 'faster-whisper', 'LangChain', 'LlamaIndex', 'n8n', 'Typer', 'mypy strict']
  }
];

const EXPERIENCE = [
  {
    when: 'Feb 2026 — Present',
    where: 'HYRGPT',
    role: 'AI Engineering Intern · Healthcare AI',
    log: [
      'Shipped Python backend pipelines combining LLM reasoning with external knowledge retrieval for a PCOS-focused healthcare assistant.',
      'Designed a curated medical knowledge → retrieval → prompt orchestration pipeline to raise reliability of health recommendations.',
      'Implemented response validation, structured outputs, and guardrails to prevent unsafe medical advice; built API services for real-time conversational interactions.'
    ]
  },
  {
    when: 'Sept 2023 — June 2027',
    where: 'RV University, Bengaluru',
    role: 'B.Tech (Hons.) Computer Science · AI/ML, Minor in FinTech',
    log: [
      'GPA 8.2 / 10.',
      'Focus: AI security, edge deployment, neuro-symbolic systems, fraud analytics.'
    ]
  }
];

const PUBLICATIONS = [
  {
    title: 'C4PS: An Interactive Pipeline for Social Media Image Enhancement and Multilingual Captioning',
    venue: 'IEEE CAI 2026',
    status: 'Accepted',
    note: 'Real-ESRGAN + transformer captioning + multilingual translation. Includes authenticated APIs, token-scoped access, and auditable media-processing workflows.'
  },
  {
    title: 'Hybrid CNN Initialization — Orthogonal + He Initialization',
    venue: 'In progress',
    status: 'Research',
    note: 'Hybrid initialization across ResNet, VGG, and GoogLeNet — faster convergence and improved gradient stability vs. standard baselines.'
  }
];

const NAV = [
  { id: 'hero',         label: 'INDEX',         n: '00' },
  { id: 'about',        label: 'ABOUT',         n: '01' },
  { id: 'projects',     label: 'SYSTEMS',       n: '02' },
  { id: 'skills',       label: 'CAPABILITIES',  n: '03' },
  { id: 'experience',   label: 'LOG',           n: '04' },
  { id: 'publications', label: 'PUBLICATIONS',  n: '05' },
  { id: 'contact',      label: 'SIGNAL',        n: '06' }
];

Object.assign(window, { PROFILE, HERO_STATS, PROJECTS, STACK_MAP, SIDE_PROJECTS, SKILLS, EXPERIENCE, PUBLICATIONS, NAV });
