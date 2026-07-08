# 10 - Product Type Adaptations

*This document is the absolute source of truth for all 161 unique product verticals defined in the original `products.csv` matrix. All structural decisions, aesthetic mappings, and strategic parameters for these verticals MUST adhere strictly to the rules below.*

## Strategic Mapping Index

The engine maps user prompts to specific product architectures based on semantic keywords. Each product type defines the default UI Style, Dashboard Pattern, Landing Page Strategy, Color Focus, and essential considerations.

### Software as a Service (SaaS) & Tech Platforms
- **SaaS (General)**: Glassmorphism + Flat Design. Use **Hero+Features+CTA**. Dash: **Data-Dense + Real-Time**. Colors: Trust Blue + Accents. Clarity is paramount.
- **Micro SaaS**: Flat Design + Vibrant & Block. Use **Minimal & Direct**. Dash: **Executive**. Speed and immediate ROI display.
- **AI/Chatbot Platform**: AI-Native UI + Minimalism. Use **Interactive Product Demo**. Dash: **AI/ML Analytics**. Colors: Neutral + AI Purple (#6366F1). Streaming text, conversational UI.
- **Design System/Component Library**: Minimalism + Accessible & Ethical. Feature-Rich Showcase. Developer-first, clean hierarchy.
- **Developer Tool / IDE**: Dark Mode (OLED) + Minimalism. Minimal & Direct + Documentation. Terminal feel, syntax themes. High performance.
- **Creator Economy Platform**: Vibrant & Block-based + Bento Box Grid. Social Proof-Focused. Monetization and profile emphasis.

### E-commerce & Retail
- **E-commerce (Standard)**: Vibrant & Block-based. Use **Feature-Rich Showcase**. Colors: Brand Primary + Success Green. High visual hierarchy, massive conversion focus.
- **E-commerce Luxury**: Liquid Glass + Glassmorphism. Use **Feature-Rich Showcase**. Premium colors, minimal accents. Sophistication and white space.
- **Marketplace (P2P)**: Vibrant & Block-based + Flat Design. Feature-Rich Showcase + Social Proof. Trust badges, seller/buyer dual profiles.
- **Subscription Box Service**: Vibrant & Block-based + Motion-Driven. Excitement colors. Focus on unboxing experience and personalization quizzes.
- **Digital Products/Downloads**: Vibrant & Block-based + Motion-Driven. Product category colors. Instant delivery UX.

### Finance, Fintech & Web3
- **Fintech/Crypto**: Glassmorphism + Dark Mode (OLED). Conversion-Optimized. Real-Time Monitoring. Security perception, dark tech colors.
- **NFT/Web3 Platform**: Cyberpunk UI + Glassmorphism. Dark + Neon + Gold (#FFD700). Wallet integration, transaction feedback, gas fees.
- **Banking/Traditional Finance**: Minimalism + Accessible & Ethical. Analytics: Financial Dashboard. Navy + Trust Blue. Security-first, AAA accessibility.
- **Financial Dashboard**: Dark Mode (OLED) + Data-Dense. Dark bg + red/green alerts + trust blue. High contrast, absolute data accuracy.
- **Personal Finance Tracker**: Glassmorphism + Dark Mode (OLED). Calm blue + success green. Receipt cameras, category donut charts.

### Healthcare, Wellness & Medical
- **Healthcare App**: Neumorphism + Accessible & Ethical. Social Proof-Focused. Calm blue + health green. Accessibility mandatory, calming patient aesthetic.
- **Medical Clinic / Hospital**: Accessible & Ethical + Minimalism. Trust & Authority. Medical Blue + Trust White. Doctor profiles, HIPAA compliance.
- **Mental Health App**: Neumorphism + Accessible & Ethical. Calm Pastels + Trust colors. Privacy-first, crisis resources, soothing soft-UI.
- **Fitness/Gym App**: Vibrant & Block-based + Dark Mode (OLED). Orange/Electric blue energy. Progress tracking, motivational design.
- **Biohacking / Longevity App**: Biomimetic / Organic 2.0. Cellular Pink/Red + DNA Blue. Scientific credibility, complex biological data viz.

### Real Estate & Travel
- **Real Estate/Property**: Glassmorphism + Minimalism. Hero-Centric. Trust Blue + Gold + White. Virtual tours, high-quality imagery, mortgage calculators.
- **Travel/Tourism Agency**: Aurora UI + Motion-Driven. Storytelling-Driven. Sky Blue + Vibrant destination colors. Mobile-first itinerary builders.
- **Hotel/Hospitality**: Liquid Glass + Minimalism. Warm neutrals + Gold. Luxury room booking, seasonal pricing.
- **Public Transit Guide**: Flat Design + Accessible & Ethical. Real-Time Monitoring. Transit line colors + alert red/green. Offline map capabilities.

### Agency, Portfolio & Creative
- **Creative Agency**: Brutalism + Motion-Driven. Storytelling-Driven. Bold primaries, artistic freedom, high differentiation.
- **Portfolio/Personal**: Motion-Driven + Minimalism. Showcase work, artistic interpretation.
- **Photography Studio**: Motion-Driven + Minimalism. Black + White. Full-bleed imagery, client galleries.
- **Architecture / Interior**: Exaggerated Minimalism + High Imagery. Monochrome + Gold. Spatial 3D layouts, massive typography.

### Social, Community & Dating
- **Social Media App**: Vibrant & Block-based + Motion-Driven. Engagement colors. Addictive design ethics, micro-interactions.
- **Dating App**: Vibrant & Block-based + Motion-Driven. Warm/Romantic (Pinks/Reds). Swipe interactions, Match animations, video chat.
- **Community/Forum**: Vibrant & Block-based. Community brand colors. Member directories, active user indicators.
- **Anonymous Community**: Dark Mode (OLED) + Minimalism. Dark protective + empathy warm accents. Fake call/safe walk modes (safety overlap).

### Dashboard Archetypes & Enterprise
- **Analytics Dashboard**: Data-Dense + Heat Map. Cool→Hot gradients. Data priority over aesthetics.
- **Executive Dashboard**: Large KPIs (4-6 max). Traffic light indicators. High-level rollups.
- **Logistics/Delivery**: Minimalism + Flat Design. Blue + Orange (tracking). Route routing, live GPS, driver management.
- **CRM & Client Management**: Flat Design + Minimalism. Pipeline stage colors. Kanban boards, lead scoring.
- **Inventory & Stock**: Flat Design + Minimalism. Functional neutral + scanner accents. Barcode modes, low-stock banners.

### Specialized Utility Tools
- **Weather App**: Glassmorphism + Aurora UI. Atmospheric gradients based on data. Hourly horizontal scrolling.
- **Calculator & Unit Converter**: Neumorphism / Dark OLED. Orange operation keys. Scientific mode toggles.
- **Translator App**: Flat Design + AI-Native UI. Voice/OCR camera integration. Offline models.
- **Password Manager**: Minimalism + Accessible & Ethical. Trust Blue + Security Green. Zero-knowledge architecture, Breach alerts.
- **Scanner & Document Manager**: Minimalism + Flat Design. OCR overlays. Folder tree organization, PDF compilation.

### Entertainment, Gaming & Media
- **Gaming Platform (Esports)**: 3D & Hyperrealism + Retro-Futurism. Neon colors. Immersion priority.
- **Casual Puzzle Game**: Claymorphism + Vibrant & Block-based. Cheerful pastels. Satisfying match animations.
- **Music/Video Streaming**: Dark Mode (OLED) + Vibrant & Block-based. Content posters dictate colors. Heavy thumbnails, media player priority.
- **Podcast Platform**: Dark Mode (OLED) + Minimalism. Audio waveform accents. Media playback UX.

### Next-Gen & Deep Tech
- **Spatial Computing OS / App**: Spatial UI (VisionOS) / Glassmorphism. Translucent depths, 3D interaction.
- **Quantum Computing Interface**: Holographic / HUD + Dark Mode. Quantum Blue + Interference patterns. Complex probability visualizations.
- **Space Tech / Aerospace**: Holographic / HUD. Deep Space Black + Star White. High precision telemetry.
- **Generative Art Platform**: Minimalism (Frame) + Gen Z Chaos. Neutral canvas that lets the AI generation shine.
- **Autonomous Drone Fleet Manager**: HUD / Sci-Fi FUI. Tactical Green + Map Dark. 3D spatial awareness, low latency updates.

### Education & Learning
- **Educational App (General)**: Claymorphism + Micro-interactions. Playful colors. Clear hierarchy.
- **Online Course/E-Learning**: Claymorphism + Vibrant & Block-based. Progress green. Video players, quizzes.
- **Kids Learning (ABC/Math)**: Claymorphism + Vibrant & Block. Bright primary + Child-safe pastels. NO ADS, NO DARK PATTERNS.
- **Language Learning**: Claymorphism. Spaced repetition algorithms, gamification, streak systems.
- **Flashcard & Study Tool**: Claymorphism. 3D card flip animations, timed quizzes.

*(Refer to `landing.csv` rules and `styles.csv` definitions for specific CSS execution of these product mappings. Every product category generated by the engine must be strictly typed to the aesthetics and patterns established here.)*
