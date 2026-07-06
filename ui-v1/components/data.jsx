// Centralized data — all content sourced from resume + brief

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
    "I build production systems at the seam where ML meets security — voice-controlled local OSes, neuro-symbolic guardrails, edge intrusion detection.",
    "My instinct is to design from the protocol up: what's the threat model, what fails when the network drops, how does it run on a Raspberry Pi without the cloud.",
    "Currently a CS (AI/ML) student at RV University and AI Engineering intern at HYRGPT, shipping a healthcare AI assistant with retrieval, structured outputs, and safety layers."
  ]
};

const PROJECTS = [
  {
    id: 'nora',
    index: '01',
    name: 'NORA',
    subtitle: 'Local Voice AI Operating System',
    year: '2026 — Present',
    status: 'ACTIVE',
    accent: 'cyan',
    problem: "Cloud-tethered voice assistants leak intent, fail offline, and can't be trusted with destructive system actions.",
    solution: "A fully-local voice OS for Windows. Speech → policy guard → intent → command engine → speech, with screen vision and cognitive memory layered on top.",
    pipeline: ['faster-whisper STT', 'NeuroSym input guard', 'LLM intent (Groq / Claude / Ollama)', 'Command engine', 'edge-TTS'],
    highlights: [
      { k: '40+', v: 'voice commands' },
      { k: '9', v: 'injection attack categories blocked' },
      { k: '0', v: 'cloud dependencies in core path' }
    ],
    features: [
      { title: 'Screen Intelligence', body: 'Claude Vision (Haiku) describes screens, clicks UI by voice description, OCR-extracts, watches for events ("tell me when training finishes"), diagnoses stack traces.' },
      { title: 'Cognitive Memory v2', body: 'ChromaDB + sentence-transformers for semantic & episodic recall. Proactive engine predicts workflows from time-of-day patterns and bigram command sequences.' },
      { title: 'Hardened Action Layer', body: 'NeuroSym v0.3 enforces destructive-action confirmation, path sandboxing, and step-count limits before any command executes — plus output secret-leakage and streaming abort rules.' }
    ],
    stack: ['Python', 'faster-whisper', 'ChromaDB', 'Claude Vision', 'Ollama', 'NeuroSym-AI', 'edge-TTS']
  },
  {
    id: 'neurosym',
    index: '02',
    name: 'NeuroSym-AI',
    subtitle: 'Neuro-Symbolic Guardrails for LLMs · v0.3.0',
    year: 'Jul 2025 — Present',
    status: 'SHIPPED · PyPI v0.3.0',
    accent: 'violet',
    problem: "Guardrail libraries that depend on another LLM are slow, leaky, and recursive. They guard the prompt, never the output, the stream, or the action. Real safety needs deterministic, two-sided, auditable policy.",
    solution: "Provider-agnostic neuro-symbolic engine guarding the full pipeline — voice transcription, LLM output, streaming chunks, and agent action plans — through a boolean policy algebra over regex, schema, predicates, and action-graph rules.",
    pipeline: ['Input guard (voice / prompt)', 'Symbolic rule eval', 'Streaming chunk guard', 'Output guard (secrets / regurgitation)', 'Action-graph policy', 'Structured audit trace'],
    highlights: [
      { k: '79.8%', v: 'block rate on 134-case benchmark' },
      { k: '0%', v: 'false positives' },
      { k: '0.48ms', v: 'avg eval latency' }
    ],
    features: [
      { title: 'Two-Sided Guards', body: 'Input rules detect prompt injection across 9 attack presets. Output rules block AWS keys, JWTs, private keys, and verbatim system-prompt regurgitation. Streaming rules abort mid-token the moment a secret appears.' },
      { title: 'Action-Graph Policy', body: 'destructive_needs_confirmation, max_steps, no_path_outside_sandbox, plus a boolean algebra (AllOf · AnyOf · Not · Implies) for composing Regex, Schema, and predicate rules with full audit traces.' },
      { title: 'Production Posture', body: 'py.typed, Typer CLI, mypy strict, optional Z3 SMT linter, optional LLM repair loop. pip install neurosym-ai. MIT licensed.' }
    ],
    stack: ['Python', 'Typer', 'JSON Schema', 'Z3 (optional)', 'Streaming API', 'mypy strict', 'PyPI']
  },
  {
    id: 'edgegensec',
    index: '03',
    name: 'EdgeGenSec',
    subtitle: 'Lightweight Intrusion Detection on Raspberry Pi',
    year: 'Jul 2025 — Present',
    status: 'DEPLOYED',
    accent: 'cyan',
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
    index: '04',
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

const SKILLS = [
  {
    cat: 'AI / ML',
    color: 'cyan',
    items: ['Intrusion Detection', 'GANs', 'CNNs', 'Few-Shot Learning', 'Prototypical Networks', 'Quantization', 'TorchScript', 'Explainability']
  },
  {
    cat: 'Security',
    color: 'violet',
    items: ['Threat Modeling', 'Symbolic Policy Rules', 'JSON Schema Validation', 'Regex Policies', 'Composite Policy Algebra', 'Repair Loops', 'Audit Traces', 'Z3']
  },
  {
    cat: 'Systems',
    color: 'cyan',
    items: ['Python', 'C / C++', 'JavaScript', 'Flask', 'SQLite3', 'Docker', 'Kubernetes', 'GitHub Actions']
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
    items: ['Git', 'VS Code', 'faster-whisper', 'Google Colab', 'Typer', 'mypy strict']
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

Object.assign(window, { PROFILE, PROJECTS, SKILLS, EXPERIENCE, PUBLICATIONS, NAV });
