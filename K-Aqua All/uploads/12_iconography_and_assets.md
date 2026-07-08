# 12 - Iconography and Asset Constraints

*This document extracts the exhaustive icon dictionary from `icons.csv`. These are the precise symbols the engine uses to build interfaces. Phosphor Icons is the primary library, with specific structural directives for advanced aesthetics.*

## Core Icon Dictionary (Phosphor)

### Navigation
- `list` (List): Hamburger menu toggle.
- `arrow-left` (ArrowLeft): Back router CTA.
- `arrow-right` (ArrowRight): Forward CTA.
- `caret-down` (CaretDown): Accordion/Dropdown toggle.
- `caret-up` (CaretUp): Accordion collapse.
- `house` (House): Home dashboard.
- `x` (X): Modal/dialog close.
- `arrow-square-out` (ArrowSquareOut): External link indicator.

### Action
- `plus` (Plus): Add entity.
- `minus` (Minus): Remove entity / decrease quantity.
- `trash` (Trash): Destructive deletion.
- `pencil-simple` (PencilSimple): Edit.
- `floppy-disk` (FloppyDisk): Save.
- `download-simple` (DownloadSimple): Export/Download.
- `upload-simple` (UploadSimple): Import.
- `copy` (Copy): Clipboard.
- `share` (Share): Share via social/sheet.
- `magnifying-glass` (MagnifyingGlass): Search inputs.
- `funnel` (Funnel): Filtering.
- `gear` (Gear): Settings/Config.

### Status & Feedback
- `check` (Check): Success state.
- `check-circle` (CheckCircle): Verified badge.
- `x-circle` (XCircle): Error/Failed.
- `warning` (Warning): Danger/Caution.
- `info` (Info): Tooltip triggers.
- `circle-notch` (CircleNotch): **Must** contain `className="animate-spin"`. Used for loading.
- `clock` (Clock): Pending states.

### Communication
- `envelope` (Envelope): Email.
- `chat-circle` (ChatCircle): Messages.
- `phone` (Phone): Calls.
- `paper-plane-tilt` (PaperPlaneTilt): Send/Dispatch constraint.
- `bell` (Bell): Notifications.

### User & Authentication
- `user` (User): Profile.
- `users` (Users): Teams.
- `user-plus` (UserPlus): Invite.
- `sign-in` (SignIn): Login CTA.
- `sign-out` (SignOut): Logout.

### Media & E-commerce
- `image` / `video` / `play` / `pause` / `speaker-high` / `microphone` / `camera`
- `shopping-cart` / `shopping-bag` / `credit-card` / `currency-dollar` / `tag` / `gift` / `percent`

### Data & Development
- `chart-bar` / `chart-pie` / `trend-up` / `trend-down` / `activity` / `database`
- `code` / `terminal` / `git-branch` / `github-logo`

### Layout & Hardware
- `grid-four` / `list-bullets` / `columns` / `arrows-out` / `arrows-in` / `sidebar`
- `device-mobile` / `device-tablet` / `monitor` / `laptop` / `printer`
- `lock` / `lock-open` / `shield` / `key` / `eye` / `eye-slash`

## Advanced Aesthetic Directives (Molecular Style Implementations)

The generic import `<IconName size={20} weight="regular" />` is overridden by these precise aesthetic systems based on product type:

### 1. Bold Typography Context (`bold-typography-icon-system`)
- **Rules**: `weight="regular"`. Size 20px (UI controls), 32px (Feature anchors). Icons MUST be paired with a Mono-stack text label (`JetBrains Mono`). Standalone icons are BANNED except for universal navigation (e.g., Back arrow `X`).
- **Accent**: `color="#FF3D00"` only.

### 2. Cyberpunk HUD Context (`cyberpunk-icon-system`)
- **Rules**: `weight="regular"`, `color="#00FF88"` (Matrix Green). 
- **Effect**: MUST wrap every icon in a generic View/Div with `box-shadow: 0 0 8px #00FF88; shadowOpacity: 0.6`. 
- **Constraint**: `borderRadius: 0`. Angular only. Avoid circular containers. Pair with JetBrains Mono.

### 3. Academia Mobile / Scholarly Context (`academia-icon-system`)
- **Rules**: `weight="thin"` (Thin engraved feel), `color="#C9A962"` (Brass).
- **Prohibited**: Geometric/tech-inspired icons. Prefer book, scroll, key, quill metaphors.
- **Effect**: Wrap in circular View with a crisp `1px solid #C9A962` border. Avoid high-saturation.

### 4. Web3 / Bitcoin DeFi Context (`web3-bitcoin-icon-system`)
- **Rules**: `weight="regular"`, `color="#F7931A"` (Bitcoin Orange).
- **Effect**: MUST wrap icons in a circular `BlurView` (backdrop-filter: blur) with `1px border #F7931A`. Emulated holographic node effect. Dropshadow `0 0 8px #F7931A`.

### 5. Adaptive Fallback System (`icon-fallback-rules`)
- Primary import target: `@phosphor-icons/react`
- Fallback target: `@heroicons/react/24/outline`
- **Mandatory Logic**: If the engine cannot resolve a Phosphor icon semantically suited, it defaults to Heroicons, but it must enforce the stroke-width (weight) translation to maintain visual harmony. Mixing solid and outline variations indiscriminately is strictly forbidden.
