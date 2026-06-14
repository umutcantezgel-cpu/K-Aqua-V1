# Orchestration Plan - K-Aqua Corporate Website

We are executing 26 sequential work packages to implement the K-Aqua corporate website:

1. **Step 01: Scaffold & Toolchain** - Set up folders, verify setup, ensure build works.
2. **Step 02: Design-Tokens verifizieren** - Verify variables in globals.css, theme configuration.
3. **Step 03: UI-Primitives** - Build basic UI components (MediaSlot, Buttons, Cards, Badge).
4. **Step 04: Icons & Motion-Primitives** - Icon system wrapper, Motion primitives (AnimatePresence, template.tsx).
5. **Step 05: i18n-Infrastruktur** - Set up next-intl routing, middleware, basic locales.
6. **Step 06: i18n-Inhalte & Übersetzung** - Populate message dictionaries, check key sets.
7. **Step 07: App-Shell** - Layout, Navbar, Footer components.
8. **Step 08: Mega-Menü & Sprachwähler** - Interactive header/navigation and language switching.
9. **Step 09: Page-Transitions** - Route transition animations with droplet wipe.
10. **Step 10: Globus-Engine** - Package kaqua-loader.js with D3 and topojson.
11. **Step 11: Home Page** - Hero scrollytelling and Buyers section.
12. **Step 12: Statische Kernseiten** - Products, Solutions, Company/About, Service, News, Imprint, Contact.
13. **Step 13: Produktfinder & CO₂ Rechner** - Product filter UI and comparative calculator.
14. **Step 14: Trust, Partner, Academy** - Specific static/interactive views.
15. **Step 15: Karriere & RFQ** - Form flows and application.
16. **Step 16: Referenzen Globus** - Reference map page integration with the Globe component.
17. **Step 17: Geo Hub** - Markets hub page with region filter.
18. **Step 18: Geo City Pages (pSEO)** - Programmatic SEO pages for 27 cities.
19. **Step 19: SEO Metadata & JSON-LD** - Canonical paths and Schema markup.
20. **Step 20: Sitemap, Robots, OG** - Search engine files and OpenGraph.
21. **Step 21: Performance Optimization** - Web Vitals, SSG checking, LCP improvement.
22. **Step 22: Accessibility Audit** - Keyboard navigation, contrast, screen readers.
23. **Step 23: Testing & CI** - Script verification, CI check config.
24. **Step 24: Content Layer / CMS** - Simple content model.
25. **Step 25: Vercel Deployment** - Edge config/adapters.
26. **Step 26: Handover & Visual Regression** - Validation.

Each step will be delegated to a worker/explorer agent. The Orchestrator will verify each step and update the checkpoint.
