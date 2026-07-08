# 07 - Typography and Fonts

This document extracts the exhaustive, molecular-level typography configurations from the `typography.csv` database. These 80 unique typographic systems define the structural voice of any generated UI. 

Since all original source files will be deleted, this document serves as the absolute source of truth for all font pairings, CSS imports, and Tailwind configurations used in the UI/UX Pro Max engine.

## The Typography Matrix

### 1. Classic Elegant
- **Pairing**: Playfair Display (Serif) + Inter (Sans)
- **Mood**: Elegant, luxury, sophisticated, timeless, premium.
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');`
- **Tailwind**: `fontFamily: { serif: ['Playfair Display', 'serif'], sans: ['Inter', 'sans-serif'] }`
- **Notes**: High contrast between elegant heading and clean body. Perfect for luxury/premium.

### 2. Modern Professional
- **Pairing**: Poppins (Sans) + Open Sans (Sans)
- **Mood**: Modern, professional, clean, corporate, friendly.
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');`
- **Tailwind**: `fontFamily: { heading: ['Poppins', 'sans-serif'], body: ['Open Sans', 'sans-serif'] }`

### 3. Tech Startup
- **Pairing**: Space Grotesk (Sans) + DM Sans (Sans)
- **Mood**: Tech, startup, modern, bold, futuristic.
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');`
- **Tailwind**: `fontFamily: { heading: ['Space Grotesk', 'sans-serif'], body: ['DM Sans', 'sans-serif'] }`

### 4. Editorial Classic
- **Pairing**: Cormorant Garamond (Serif) + Libre Baskerville (Serif)
- **Tailwind**: `fontFamily: { heading: ['Cormorant Garamond', 'serif'], body: ['Libre Baskerville', 'serif'] }`

### 5. Minimal Swiss
- **Pairing**: Inter (Sans) + Inter (Sans)
- **Mood**: Minimal, clean, swiss, functional, neutral.
- **Tailwind**: `fontFamily: { sans: ['Inter', 'sans-serif'] }`
- **Notes**: Single font family with weight variations. Ultimate simplicity.

### 6. Playful Creative
- **Pairing**: Fredoka (Display) + Nunito (Sans)
- **Tailwind**: `fontFamily: { heading: ['Fredoka', 'sans-serif'], body: ['Nunito', 'sans-serif'] }`

### 7. Bold Statement
- **Pairing**: Bebas Neue (Display) + Source Sans 3 (Sans)
- **Tailwind**: `fontFamily: { display: ['Bebas Neue', 'sans-serif'], body: ['Source Sans 3', 'sans-serif'] }`
- **Notes**: Bebas Neue for large headlines only. All-caps display font.

### 8. Wellness Calm
- **Pairing**: Lora (Serif) + Raleway (Sans)
- **Tailwind**: `fontFamily: { serif: ['Lora', 'serif'], sans: ['Raleway', 'sans-serif'] }`

### 9. Developer Mono
- **Pairing**: JetBrains Mono (Mono) + IBM Plex Sans (Sans)
- **Tailwind**: `fontFamily: { mono: ['JetBrains Mono', 'monospace'], sans: ['IBM Plex Sans', 'sans-serif'] }`

### 10. Retro Vintage
- **Pairing**: Abril Fatface (Display) + Merriweather (Serif)
- **Tailwind**: `fontFamily: { display: ['Abril Fatface', 'serif'], body: ['Merriweather', 'serif'] }`

### 11. Geometric Modern
- **Pairing**: Outfit (Sans) + Work Sans (Sans)
- **Tailwind**: `fontFamily: { heading: ['Outfit', 'sans-serif'], body: ['Work Sans', 'sans-serif'] }`

### 12. Luxury Serif
- **Pairing**: Cormorant (Serif) + Montserrat (Sans)
- **Tailwind**: `fontFamily: { serif: ['Cormorant', 'serif'], sans: ['Montserrat', 'sans-serif'] }`

### 13. Friendly SaaS
- **Pairing**: Plus Jakarta Sans
- **Tailwind**: `fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] }`

### 14. News Editorial
- **Pairing**: Newsreader (Serif) + Roboto (Sans)
- **Tailwind**: `fontFamily: { serif: ['Newsreader', 'serif'], sans: ['Roboto', 'sans-serif'] }`

### 15. Handwritten Charm
- **Pairing**: Caveat (Script) + Quicksand (Sans)
- **Tailwind**: `fontFamily: { script: ['Caveat', 'cursive'], sans: ['Quicksand', 'sans-serif'] }`

### 16. Corporate Trust
- **Pairing**: Lexend (Sans) + Source Sans 3 (Sans)
- **Tailwind**: `fontFamily: { heading: ['Lexend', 'sans-serif'], body: ['Source Sans 3', 'sans-serif'] }`

### 17. Brutalist Raw
- **Pairing**: Space Mono (Mono) + Space Mono (Mono)
- **Tailwind**: `fontFamily: { mono: ['Space Mono', 'monospace'] }`

### 18. Fashion Forward
- **Pairing**: Syne (Sans) + Manrope (Sans)
- **Tailwind**: `fontFamily: { heading: ['Syne', 'sans-serif'], body: ['Manrope', 'sans-serif'] }`

### 19. Soft Rounded
- **Pairing**: Varela Round (Sans) + Nunito Sans (Sans)
- **Tailwind**: `fontFamily: { heading: ['Varela Round', 'sans-serif'], body: ['Nunito Sans', 'sans-serif'] }`

### 20. Premium Sans
- **Pairing**: Satoshi / General Sans (or DM Sans fallback)
- **Tailwind**: `fontFamily: { sans: ['DM Sans', 'sans-serif'] }`

### 21. Vietnamese Friendly
- **Pairing**: Be Vietnam Pro + Noto Sans
- **Tailwind**: `fontFamily: { sans: ['Be Vietnam Pro', 'Noto Sans', 'sans-serif'] }`

### 22. Japanese Elegant
- **Pairing**: Noto Serif JP + Noto Sans JP
- **Tailwind**: `fontFamily: { serif: ['Noto Serif JP', 'serif'], sans: ['Noto Sans JP', 'sans-serif'] }`

### 23. Korean Modern
- **Pairing**: Noto Sans KR
- **Tailwind**: `fontFamily: { sans: ['Noto Sans KR', 'sans-serif'] }`

### 24. Chinese Traditional
- **Pairing**: Noto Serif TC + Noto Sans TC
- **Tailwind**: `fontFamily: { serif: ['Noto Serif TC', 'serif'], sans: ['Noto Sans TC', 'sans-serif'] }`

### 25. Chinese Simplified
- **Pairing**: Noto Sans SC
- **Tailwind**: `fontFamily: { sans: ['Noto Sans SC', 'sans-serif'] }`

### 26. Arabic Elegant
- **Pairing**: Noto Naskh Arabic + Noto Sans Arabic
- **Tailwind**: `fontFamily: { serif: ['Noto Naskh Arabic', 'serif'], sans: ['Noto Sans Arabic', 'sans-serif'] }`

### 27. Thai Modern
- **Pairing**: Noto Sans Thai
- **Tailwind**: `fontFamily: { sans: ['Noto Sans Thai', 'sans-serif'] }`

### 28. Hebrew Modern
- **Pairing**: Noto Sans Hebrew
- **Tailwind**: `fontFamily: { sans: ['Noto Sans Hebrew', 'sans-serif'] }`

### 29. Legal Professional
- **Pairing**: EB Garamond + Lato
- **Tailwind**: `fontFamily: { serif: ['EB Garamond', 'serif'], sans: ['Lato', 'sans-serif'] }`

### 30. Medical Clean
- **Pairing**: Figtree + Noto Sans
- **Tailwind**: `fontFamily: { heading: ['Figtree', 'sans-serif'], body: ['Noto Sans', 'sans-serif'] }`

### 31. Financial Trust
- **Pairing**: IBM Plex Sans + IBM Plex Sans
- **Tailwind**: `fontFamily: { sans: ['IBM Plex Sans', 'sans-serif'] }`

### 32. Real Estate Luxury
- **Pairing**: Cinzel + Josefin Sans
- **Tailwind**: `fontFamily: { serif: ['Cinzel', 'serif'], sans: ['Josefin Sans', 'sans-serif'] }`

### 33. Restaurant Menu
- **Pairing**: Playfair Display SC + Karla
- **Tailwind**: `fontFamily: { display: ['Playfair Display SC', 'serif'], sans: ['Karla', 'sans-serif'] }`

### 34. Art Deco
- **Pairing**: Poiret One + Didact Gothic
- **Tailwind**: `fontFamily: { display: ['Poiret One', 'sans-serif'], sans: ['Didact Gothic', 'sans-serif'] }`

### 35. Magazine Style
- **Pairing**: Libre Bodoni + Public Sans
- **Tailwind**: `fontFamily: { serif: ['Libre Bodoni', 'serif'], sans: ['Public Sans', 'sans-serif'] }`

### 36. Crypto/Web3
- **Pairing**: Orbitron + Exo 2
- **Tailwind**: `fontFamily: { display: ['Orbitron', 'sans-serif'], body: ['Exo 2', 'sans-serif'] }`

### 37. Gaming Bold
- **Pairing**: Russo One + Chakra Petch
- **Tailwind**: `fontFamily: { display: ['Russo One', 'sans-serif'], body: ['Chakra Petch', 'sans-serif'] }`

### 38. Indie/Craft
- **Pairing**: Amatic SC + Cabin
- **Tailwind**: `fontFamily: { display: ['Amatic SC', 'sans-serif'], sans: ['Cabin', 'sans-serif'] }`

### 39. Startup Bold
- **Pairing**: Clash/Outfit + Rubik
- **Tailwind**: `fontFamily: { heading: ['Outfit', 'sans-serif'], body: ['Rubik', 'sans-serif'] }`

### 40. E-commerce Clean
- **Pairing**: Rubik + Nunito Sans
- **Tailwind**: `fontFamily: { heading: ['Rubik', 'sans-serif'], body: ['Nunito Sans', 'sans-serif'] }`

### 41. Academic/Research
- **Pairing**: Crimson Pro + Atkinson Hyperlegible
- **Tailwind**: `fontFamily: { serif: ['Crimson Pro', 'serif'], sans: ['Atkinson Hyperlegible', 'sans-serif'] }`

### 42. Dashboard Data
- **Pairing**: Fira Code + Fira Sans
- **Tailwind**: `fontFamily: { mono: ['Fira Code', 'monospace'], sans: ['Fira Sans', 'sans-serif'] }`

### 43. Music/Entertainment
- **Pairing**: Righteous + Poppins
- **Tailwind**: `fontFamily: { display: ['Righteous', 'sans-serif'], sans: ['Poppins', 'sans-serif'] }`

### 44. Minimalist Portfolio
- **Pairing**: Archivo + Space Grotesk
- **Tailwind**: `fontFamily: { heading: ['Space Grotesk', 'sans-serif'], body: ['Archivo', 'sans-serif'] }`

### 45. Kids/Education
- **Pairing**: Baloo 2 + Comic Neue
- **Tailwind**: `fontFamily: { display: ['Baloo 2', 'sans-serif'], sans: ['Comic Neue', 'sans-serif'] }`

### 46. Wedding/Romance
- **Pairing**: Great Vibes + Cormorant Infant
- **Tailwind**: `fontFamily: { script: ['Great Vibes', 'cursive'], serif: ['Cormorant Infant', 'serif'] }`

### 47. Science/Tech
- **Pairing**: Exo + Roboto Mono
- **Tailwind**: `fontFamily: { sans: ['Exo', 'sans-serif'], mono: ['Roboto Mono', 'monospace'] }`

### 48. Accessibility First
- **Pairing**: Atkinson Hyperlegible
- **Tailwind**: `fontFamily: { sans: ['Atkinson Hyperlegible', 'sans-serif'] }`

### 49. Sports/Fitness
- **Pairing**: Barlow Condensed + Barlow
- **Tailwind**: `fontFamily: { display: ['Barlow Condensed', 'sans-serif'], body: ['Barlow', 'sans-serif'] }`

### 50. Luxury Minimalist
- **Pairing**: Bodoni Moda + Jost
- **Tailwind**: `fontFamily: { serif: ['Bodoni Moda', 'serif'], sans: ['Jost', 'sans-serif'] }`

### 51. Tech/HUD Mono
- **Pairing**: Share Tech Mono + Fira Code
- **Tailwind**: `fontFamily: { hud: ['Share Tech Mono', 'monospace'], code: ['Fira Code', 'monospace'] }`

### 52. Pixel Retro
- **Pairing**: Press Start 2P + VT323
- **Tailwind**: `fontFamily: { pixel: ['Press Start 2P', 'cursive'], terminal: ['VT323', 'monospace'] }`

### 53. Neubrutalist Bold
- **Pairing**: Lexend Mega + Public Sans
- **Tailwind**: `fontFamily: { mega: ['Lexend Mega', 'sans-serif'], body: ['Public Sans', 'sans-serif'] }`

### 54. Academic/Archival
- **Pairing**: EB Garamond + Crimson Text
- **Tailwind**: `fontFamily: { classic: ['EB Garamond', 'serif'], text: ['Crimson Text', 'serif'] }`

### 55. Spatial Clear
- **Pairing**: Inter
- **Tailwind**: `fontFamily: { sans: ['Inter', 'sans-serif'] }`

### 56. Kinetic Motion
- **Pairing**: Syncopate + Space Mono
- **Tailwind**: `fontFamily: { display: ['Syncopate', 'sans-serif'], mono: ['Space Mono', 'monospace'] }`

### 57. Gen Z Brutal
- **Pairing**: Anton + Epilogue
- **Tailwind**: `fontFamily: { display: ['Anton', 'sans-serif'], body: ['Epilogue', 'sans-serif'] }`

## Advanced Multi-Stack Paradigms (Mobile/Native/Advanced Web)

### 58. Bauhaus Geometric
- **Pairing**: Outfit (900 uppercase for heroes, 700 buttons, 500 body). Scale aggressively.

### 59. Minimalist Monochrome Editorial
- **Stack**: Playfair Display (Serif) + Source Serif 4 (Serif) + JetBrains Mono (Mono)
- **Rules**: NO UI sans-serif at all. 100% serif/mono. Playfair Display 900 for tracking-tighter heroes.

### 60. Modern Dark Cinema (Inter System)
- **Stack**: Inter only. Precision system. 
- **Rules**: Inter 700 (-1.5 tracking) for Display 48pt. Gradient text via mask-view.

### 61. SaaS Mobile Boutique
- **Stack**: Calistoga (Serif Display) + Inter + JetBrains Mono.
- **Rules**: Calistoga adds human warmth, Inter for UI, JetBrains Mono for data labels.

### 62. Terminal CLI Monospace
- **Stack**: JetBrains Mono (Single Family)
- **Rules**: Strict sizes (12, 14, 16). Weight 400 normal. All UI labels uppercase.

### 63. Kinetic Brutalism
- **Stack**: Space Grotesk (Bold-Only)
- **Rules**: 700-900 only. ALL display/buttons/nav: UPPERCASE. Letter spacing -1/large, or +2 labels.

### 64. Flat Design Mobile
- **Stack**: Inter (System Bold)
- **Rules**: Thick weights carry hierarchy. Avoid italic.

### 65. Material You MD3
- **Stack**: Roboto / System Sans
- **Rules**: Display Large 56px/400. Headline Large 32px/500. Title 22px. Never use custom weights beyond 300-700.

### 66. Neo Brutalism Mobile
- **Stack**: Space Grotesk Heavy 700/900 ONLY.

### 67. Academia Mobile Triple Stack
- **Stack**: Cormorant Garamond + Crimson Pro + Cinzel
- **Rules**: Cormorant Medium for headings. Crimson Pro Regular for body. Cinzel SemiBold for ALL-CAPS labels. Drop caps 60px Cinzel in Brass.

### 68. Cyberpunk Mobile
- **Stack**: Orbitron + JetBrains Mono
- **Rules**: Orbitron 700-900 H1 (42px uppercase tracking 4). JetBrains Mono for body/data.

### 69. Web3 Bitcoin DeFi
- **Stack**: Space Grotesk + Inter + JetBrains Mono

### 70. Claymorphism Mobile
- **Stack**: Nunito (Black/800 only for headings) + DM Sans (Medium for body).

### 71. Enterprise SaaS Mobile
- **Stack**: Plus Jakarta Sans
- **Rules**: Must support iOS Dynamic Type and Android font scaling.

### 72. Sketch Hand-Drawn
- **Stack**: Kalam + Patrick Hand
- **Rules**: Avoid alignment 'center' for long body texts.

### 73. Neumorphism
- **Stack**: Plus Jakarta Sans (Bold/Medium). Never use italic or thin weights against embossed backgrounds.
