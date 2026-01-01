# Typography & Buttons Reference

Use this snippet to copy HireDesk's body font family, button text sizes, and dark body colors into another application.

- Body font: Inter sans stack, default 16px.
- Headings: Tinos serif stack at 700 weight.
- Buttons: Primary buttons at 16px; optional `.btn-sm` at 14px.
- Body colors: Background `#0b1220`, text `#e2e8f0`.

```css
/* Load fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tinos:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap");

:root {
  --font-family-sans:
    "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-family-serif: "Tinos", Georgia, "Times New Roman", serif;
  --font-family-mono:
    "JetBrains Mono", "Fira Code", "Fira Mono", "Roboto Mono",
    "Source Code Pro", ui-monospace, SFMono-Regular, "SF Mono", Monaco,
    Inconsolata, "Roboto Mono", "Liberation Mono", Menlo, Consolas, monospace;

  /* Body colors (dark UI palette) */
  --body-bg: #0b1220;
  --body-text: #e2e8f0;
}

/* Body typography */
body {
  font-family: var(--font-family-sans);
  font-size: 16px;
  line-height: 1.6;
  background: var(--body-bg);
  color: var(--body-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  font-variant-ligatures: common-ligatures;
}

/* Headings use the serif stack */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-serif);
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Primary buttons (16px text) */
button {
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.15s ease,
    background 0.15s ease;
}
button:hover:not(:disabled) {
  transform: scale(1.02);
}
button:active:not(:disabled) {
  transform: scale(0.98);
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Secondary/smaller buttons (14px text) */
.btn-sm {
  font-size: 14px;
  padding: 0.65rem 0.9rem;
}

/* Mono helper */
.font-mono {
  font-family: var(--font-family-mono);
}
```

Sources: body and font stacks from [app/app.css](app/app.css); button sizes follow usage in login and candidate selection routes (16px default, 14px secondary).
