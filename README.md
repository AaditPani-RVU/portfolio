```
 █████╗  █████╗ ██████╗ ██╗████████╗    ██████╗  █████╗ ███╗   ██╗██╗
██╔══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ██╔══██╗██╔══██╗████╗  ██║██║
███████║███████║██║  ██║██║   ██║       ██████╔╝███████║██╔██╗ ██║██║
██╔══██║██╔══██║██║  ██║██║   ██║       ██╔═══╝ ██╔══██║██║╚██╗██║██║
██║  ██║██║  ██║██████╔╝██║   ██║       ██║     ██║  ██║██║ ╚████║██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝
```

<div align="center">

### [ [portfolio.aadi-pani.workers.dev](https://portfolio.aadi-pani.workers.dev) ]

![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Deployed on Cloudflare](https://img.shields.io/badge/Deployed%20on-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)

</div>

---

Personal portfolio showcasing my projects, experience, publications, and skills.

**Live:** https://portfolio.aadi-pani.workers.dev
**Mirror (GitHub Pages):** https://aaditpani-rvu.github.io/portfolio/

## Deploys

- **Cloudflare Workers** — `npx wrangler deploy`
- **GitHub Pages** — auto-deploys from `main` (root) on every push; enable once under
  Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
  `og-card.png` + the Open Graph tags in `index.html` make the LinkedIn preview card work.

---

## Reverting to the old UI

The previous UI (pre stack-map redesign, July 2026) is snapshotted in [`ui-v1/`](ui-v1/).
It also stays viewable on the deployed site at `/ui-v1/`.

To roll the whole site back to it:

```bash
cp ui-v1/index.html ui-v1/app.jsx ui-v1/tweaks-panel.jsx .
cp ui-v1/components/*.jsx components/
```

Then redeploy (`npx wrangler deploy`).
