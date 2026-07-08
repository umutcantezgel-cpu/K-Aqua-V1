# 06 - Color Theory and Palettes

This document maps all 162 hexadecimal color palettes detailed in `colors.csv`, built specifically with WCAG 3:1 contrast compliance.

## Color Scale Schema
Every product category defines a strict mapping to Tailwind-like CSS variables:
`Primary`, `On Primary`, `Secondary`, `On Secondary`, `Accent`, `On Accent`, `Background`, `Foreground`, `Card`, `Card Foreground`, `Muted`, `Muted Foreground`, `Border`, `Destructive`, `On Destructive`, `Ring`

## Selected Category Highlights

### Enterprise & B2B
- **SaaS (General)**: Primary `#2563EB` (Blue), Accent `#EA580C` (Orange), Bg `#F8FAFC`, Destructive `#DC2626`.
- **B2B Service**: Primary `#0F172A` (Navy), Accent `#0369A1` (Blue), Bg `#F8FAFC`.
- **Financial Dashboard**: Primary `#0F172A`, Accent `#22C55E` (Green), Bg `#020617` (Dark).

### E-Commerce & Retail
- **E-commerce**: Primary `#059669` (Green), Accent `#EA580C` (Orange).
- **E-commerce Luxury**: Primary `#1C1917` (Premium Dark), Accent `#A16207` (Gold), Bg `#FAFAF9`.

### Healthcare & Wellness
- **Healthcare App**: Primary `#0891B2` (Cyan), Accent `#059669` (Health Green), Bg `#ECFEFF` (Mint tint).
- **Mental Health App**: Primary `#8B5CF6` (Lavender), Accent `#059669` (Green), Bg `#FAF5FF`.
- **Dental Practice**: Primary `#0EA5E9` (Fresh Blue), Accent `#0EA5E9`, Bg `#F0F9FF`.

### Media & Entertainment
- **Gaming**: Primary `#7C3AED` (Neon Purple), Accent `#F43F5E` (Rose Action), Bg `#0F0F23`.
- **Music/Video Streaming**: Primary `#1E1B4B` (Dark audio), Accent `#22C55E`/`#E11D48` (Play indicators), Bg `#0F0F23`.
- **Dating App**: Primary `#E11D48` (Rose), Accent `#EA580C`, Bg `#FFF1F2`.

### Productivity, Education & Work
- **Productivity Tool**: Primary `#0D9488` (Teal), Accent `#EA580C` (Orange).
- **Remote Work/Collab**: Primary `#6366F1` (Indigo).
- **Educational App**: Primary `#4F46E5` (Indigo), Accent `#EA580C` (Orange).
- **Timer & Pomodoro**: Primary `#DC2626` (Red), Accent `#059669` (Green), Bg `#0F172A` (Dark).
- **Coding Bootcamp**: Primary `#0F172A` (Terminal Dark), Accent `#22C55E` (Success Green).

### Special Interest & Niche Apps
- **AI/Chatbot Platform**: Primary `#7C3AED` (AI Purple), Accent `#0891B2` (Cyan Interaction).
- **NFT/Web3 Platform**: Primary `#8B5CF6` (Purple tech), Accent `#FBBF24` (Gold Value), Bg `#0F0F23`.
- **Smart Home/IoT**: Primary `#1E293B`, Accent `#22C55E`, Bg `#0F172A`.
- **Cybersecurity Platform**: Let Matrix Green `#00FF41` dominate on Deep Black `#000000`.
- **Weather App**: Primary `#0284C7` (Sky Blue), Accent `#F59E0B` (Sun Amber).

### Technical Notes on Semantic Values
- **Muted Colors**: Designed for structural components and soft backgrounds (e.g. `#E9EFF8` / `#64748B`).
- **Destructive**: Universally kept around Red (`#DC2626` / `#EF4444`) to enforce standardized error/danger psychology.
- **Accents**: Modified manually to sustain a minimum `WCAG 3:1` contrast ratio against surrounding layouts. (e.g. Adjusted oranges from `#F97316` to `#EA580C`, or gold from `#CA8A04` to `#A16207`).
- **Rings**: Usually mapped identically to Primary to provide uniform focus states.
