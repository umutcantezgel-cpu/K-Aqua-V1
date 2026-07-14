
## STRICT TRANSLATION RULE
- **NO SCRIPTS ALLOWED:** The user HATES scripts for translation. They are not intelligent and produce poor quality.
- **NEVER** write or execute any Node.js, Python, or bash scripts that attempt to use automated translation APIs (like Google Translate or GenAI endpoints) to translate the K-Aqua application.
- All translations must be done manually by the LLM itself, directly through its context and standard file editing tools (, ), chunk by chunk if necessary.
- Each language must be processed **individually** and perfectly. Create a specific implementation plan for each language before starting it.

## STRICT INDEXING RULE
- **ONLY** `de`, `en`, and `ar` should be indexed by Google.
- **ALL OTHER LANGUAGES** are purely for translation purposes and **MUST NOT** be indexed by search engines. They should have `robots: index: false, follow: false`.
- Do not spend SEO optimization effort (like adding extra word count or resolving Seobility warnings) on non-indexed languages unless explicitly requested by the user.
