# 05 - UI Reasoning and Foundations

This document contains a molecular transcription of the `ui-reasoning.csv` matrix. It defines how specific product domains translate into precise design logic.

## Logic Overview
The reasoning matrix consists of 163 distinct app categories. For each category, it dictates:
1. `Recommended_Pattern`
2. `Style_Priority`
3. `Color_Mood`
4. `Typography_Mood`
5. `Key_Effects`
6. `Decision_Rules` (Conditional JSON logic for edgecases)
7. `Anti_Patterns`
8. `Severity`

## Core Paradigms by Sector

### SaaS & Dashboards
- **SaaS (General)**: Hero + Features + CTA. Uses Glassmorphism & Flat Design. Trust blue + Accent contrast. Subtle hover (200-250ms). **Decision**: if_ux_focused -> prioritize-minimalism, if_data_heavy -> add-glassmorphism. Avoid excessive animation.
- **Financial Dashboard**: Data-Dense. Dark Mode (OLED) + Dark bg + Red/Green alerts. Real-time number animations. **Decision**: must_have -> real-time-updates. Avoid light mode default.
- **Analytics Dashboard**: Data-Dense + Heat Map. Hover tooltips + zoom + filter animations. **Decision**: if_large_dataset -> virtualize-lists.

### E-commerce & Retail
- **E-commerce**: Feature-Rich Showcase. Vibrant block-based. Success green + brand primary. Card hover lift + scale effect. Avoid flat designs without depth.
- **E-commerce Luxury**: Liquid Glass + Glassmorphism. Premium dark + Gold. Chromatic aberration + fluid animations (400-600ms).

### Web3, AI, & Advanced Tech
- **NFT/Web3 Platform**: Cyberpunk UI + Glassmorphism. Dark + Neon + Gold. Transaction feedback animations. Avoid Light mode default in Web3.
- **AI/Chatbot Platform**: AI-Native UI + Minimalism. Neutral + AI Purple (#6366F1). Streaming text + Typing indicators + Fade-in.
- **Biotech/Life Sciences**: Glassmorphism + Clean Science. Sterile White + DNA Blue + Life Green.
- **Spatial Computing OS**: VisionOS Spatial UI. Frosted Glass + Depth Hierarchy. Gaze interactions. Avoid 2D designs.

### Health, Wellness, & Lifestyle
- **Healthcare App**: Social Proof-Focused. Neumorphism + Accessible & Ethical. Calm blue + Health green. Soft box-shadow + Smooth press (150ms). **Decision**: must_have -> wcag-aaa-compliance. Avoid neon and motion overload.
- **Fitness/Gym App**: Vibrant & Dark Mode. Energetic Orange + Dark bg. Progress ring animations. Avoid static designs.
- **Meditation & Mindfulness**: Neumorphism + Soft UI Evolution. Ultra-calm pastels + breathing animation gradient. Dual shadows (light+dark). Avoid poor contrast.
- **Period & Cycle Tracker**: Soft UI Evolution + Aurora UI. Blush/rose + lavender. Flowing gradients (8-12s).

### Professional & Trust Services
- **Legal/Law Firm**: Trust & Authority + Minimalism. Navy Blue (#1E3A5F) + Gold + White. Avoid modern playful design, use formal typography.
- **Banking/TradFi**: Accessible & Ethical. Navy + Trust Blue + Gold. Smooth number animations + Security indicators. **Decision**: must-have -> security-first.
- **Cybersecurity Platform**: Cyberpunk UI + Dark Mode (OLED). Matrix Green (#00FF00) + Deep Black. Threat visualization + Alert animations.

### Entertainment, Media & Arts
- **Gaming**: 3D & Hyperrealism + Retro-Futurism. Neon + Glitch effects. Avoid minimalist corporate design.
- **Music Streaming**: Dark Mode (OLED) + Vibrant block-based. Waveform visualization + playlist animations.
- **Creative Agency**: Brutalism + Motion-Driven. Bold primaries. CRT scanlines + Neon glow.
- **Photography Studio**: Motion-Driven + Minimalism. Full-bleed gallery + before/after reveal. Avoid heavy text.
- **Generative Art**: Minimalism + Gen Z Chaos. Neutral + content-driven. Gallery masonry.

### Core Anti-Patterns (Universal Rules)
1. **Emojis as icons**: Never use emojis; use SVG (Heroicons/Lucide).
2. **Missing cursor:pointer**: Unacceptable for clickable targets.
3. **Layout-shifting hovers**: Do not use scale transforms that move surrounding elements (CLS).
4. **Low contrast text**: WCAG 4.5:1 ratio restriction on light modes.
5. **Instant state changes**: Must use transitions (`150-300ms`).
6. **Invisible focus states**: Must provide `focus:ring` outlines for a11y.
