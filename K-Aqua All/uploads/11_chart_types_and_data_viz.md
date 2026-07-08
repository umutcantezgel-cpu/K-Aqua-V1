# 11 - Chart Types and Data Visualization Constraints

*This document synthesizes the rigorous data visualization standards from `charts.csv`. All generated dashboards, metrics, and analytics views must strictly implement these exact rules.*

## Core Visualization Architectures

### 1. Line Chart (Trend Over Time)
- **Primary Use**: Time-series data, rate of change over a continuous period.
- **Threshold**: <1000 pts (SVG) | ≥1000 pts (Canvas+Downsampling) | >10000 (Aggregate).
- **Color Rules**: Primary #0080FF. Fill 20% opacity.
- **A11y Constraint**: Add pattern overlays or distinct line styles (solid/dashed/dotted) for multiple series. Do not rely entirely on color. 
- **Tech**: Recharts, Chart.js.

### 2. Bar Chart (Compare Categories)
- **Primary Use**: Comparing discrete categories/magnitudes.
- **Threshold**: <20 (Vertical) | 20-50 (Horizontal) | >50 (Paginate table).
- **Color Rules**: Sort descending by value. Single color per metric, grouped colors for grouped metrics.
- **A11y Constraint**: Value labels strictly visible on each bar. No hover-only discovery.

### 3. Pie / Donut Chart (Part-to-Whole)
- **Primary Use**: ≤5 categories. Dominant segment emphasis.
- **Threshold**: Max 6 slices. Beyond 6, switch immediately to a Stacked Bar (100%).
- **Color Rules**: Contrasting palette. Largest slice at 12 o'clock.
- **A11y Constraint**: **Grade C**. Fails WCAG for colorblindness. Must ALWAYS provide a percentage data table as mandatory fallback.

### 4. Scatter Plot / Bubble Chart (Correlation)
- **Primary Use**: Exploring relationships between two continuous variables. Outliers.
- **Color Rules**: Gradient (blue→red). Opacity 0.6-0.8 for density. 
- **A11y Constraint**: Combine color + shape distinction (circle/square/triangle).

### 5. Heat Map (Intensity)
- **Primary Use**: Intensity/density across a 2D grid. Calendar activity.
- **Color Rules**: Cool (blue) to Hot (red) divergent scale. Always include a numeric legend.
- **A11y Constraint**: Numerical value overlay on hover. Provide a downloadable grid table.

### 6. Choropleth / Bubble Map (Geographic Data)
- **Primary Use**: Spatial distribution.
- **Threshold**: <1000 regions (SVG). Global (Deck.gl/Canvas).
- **A11y Constraint**: Text labels for major regions. Keyboard navigation between regions required.

### 7. Funnel / Sankey (Process Flow)
- **Primary Use**: Sequential conversion or drop-off rates.
- **Color Rules**: Single color gradient from start to end.
- **A11y Constraint**: Explicit conversion % as text per stage. Provide linear list view as fallback.

### 8. Gauge / Bullet Chart (Performance vs Target)
- **Primary Use**: Single KPI measured against defined target.
- **Color Rules**: Red → Yellow → Green. Target marker line.
- **A11y Constraint**: Percentage text heavily prioritized.

### 9. Line with Confidence Band (Forecast)
- **Primary Use**: Historical data + model predictions.
- **Color Rules**: Actual (solid blue). Forecast (dashed orange). Band (15% fill).
- **A11y Constraint**: Legend must explicitly state "dashed line = forecast".

### 10. Box Plot (Statistical Distribution)
- **Primary Use**: Spread, median, outlier, quartile math.
- **Color Rules**: Box fill #BBDEFB. Median Line #D32F2F bold. Outlier dots Red.
- **A11y Constraint**: Stats summary table (min/max/median) required.

### 11. Treemap (Hierarchical Nested)
- **Primary Use**: Size relationships within a hierarchy (budget breakdown).
- **Color Rules**: Parent distinct hues, children lighter shades. 2px white borders.
- **A11y Constraint**: **Grade C**. Must provide an expanding/collapsing tree table as primary view.

### 12. Sankey Diagram (Flow)
- **Primary Use**: Quantities flowing between nodes.
- **Color Rules**: Gradient source to target. 0.4 opacity on flow lines.
- **A11y Constraint**: Formless to screen readers. Provide flow table.

### 13. Waterfall Chart (Cumulative Variance)
- **Primary Use**: Additive positive/negative changes to a total.
- **Color Rules**: Increases (Green). Decreases (Red). Start/End totals (Blue).
- **A11y Constraint**: Directional arrow icons per bar. Label every bar.

### 14. Radar / Spider Chart (Multi-Variable)
- **Primary Use**: fixed sets of attributes (max 8 axes).
- **A11y Constraint**: **Grade B**. Always provide a grouped bar chart alternative.

### 15. Candlestick (OHLC Trading)
- **Primary Use**: Financial time-series.
- **Color Rules**: Bullish #26A69A / Bearish #EF5350. Hollow vs Solid bodies.
- **A11y Constraint**: Sortable OHLC numeric table required.

### 16. Network Graph (Relationships)
- **Primary Use**: Node-edge topography.
- **A11y Constraint**: **Grade D**. Fundamentally inaccessible alone. Requires adjacency list tables. 

### 17. Waffle Chart (Progress/Proportion)
- **Primary Use**: Fraction of a whole (10x10 grid).
- **A11y Constraint**: **Grade AA**. Highly superior to pie charts for accessibility. Cells have aria-labels.

### 18. Decomposition Tree (AI Root Cause)
- **Primary Use**: Decomposing metric into contributing causal factors.
- **Color Rules**: Positive #2563EB. Negative #EF4444.
- **A11y Constraint**: Keyboard-navigable tree, screen-reader announcing % impacts.

### 19. 3D Spatial Data (Volumetric/Terrain)
- **Primary Use**: Real spatial plotting (Three.js/Deck.gl).
- **A11y Constraint**: **Grade D**. NEVER use as primary UI chart for standard data. Only for scientific/engineering UI. Mandatory 2D projection alternative.

### 20. Real-Time Streaming Area 
- **Primary Use**: Live ops monitoring (≥1 Hz).
- **Color Rules**: Pulse Green/Blue head. Fading tail. Dark grid context.
- **A11y Constraint**: `prefers-reduced-motion` MUST pause animations. Pause/resume control is mandatory.

### 21. Word Cloud (Sentiment)
- **Primary Use**: NLP density view.
- **A11y Constraint**: **Grade C**. Fails screen readers. Must pair with frequency list views.

### 22. Process Mining (DAG variants)
- **Primary Use**: Event log mapping, bottleneck identification.
- **Color Rules**: Happy path = thick green. Deviations = thin amber. Bottlenecks = red.

## Accessibility Master Rules
Any chart built by the system MUST degrade gracefully.
1. **Never rely on color alone.** If the chart gets printed in greyscale, it must still be readable (via patterns, borders, or text labels).
2. **Tabular Fallbacks.** All hierarchical (Treemap), network (Graph), and circular (Pie/Sunburst) charts MUST be accompanied by a `<table aria-hidden="false">` containing the raw node/slice logic.
3. **Interactive Control.** Real-time and heavy animations MUST observe OS `reduced-motion` CSS queries.
