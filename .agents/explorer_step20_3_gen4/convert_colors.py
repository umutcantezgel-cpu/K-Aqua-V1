import math

def oklch_to_rgb(L, C, h_deg):
    h = math.radians(h_deg)
    a = C * math.cos(h)
    b = C * math.sin(h)
    
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    
    l = l_ ** 3
    m = m_ ** 3
    s = s_ ** 3
    
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    
    def gamma(c):
        if c <= 0.0031308:
            val = 12.92 * c
        else:
            val = 1.055 * (c ** (1.0 / 2.4)) - 0.055
        return max(0.0, min(1.0, val))
        
    R = int(round(gamma(r) * 255))
    G = int(round(gamma(g) * 255))
    B = int(round(gamma(b) * 255))
    
    return R, G, B, f"#{R:02X}{G:02X}{B:02X}"

colors = [
    ("brand-600", 0.44, 0.17, 302),
    ("brand-400", 0.62, 0.16, 303),
    ("aqua-600", 0.56, 0.11, 225),
    ("aqua-500", 0.68, 0.12, 220),
    ("aqua-400", 0.77, 0.11, 215),
    ("aqua-300", 0.85, 0.09, 210),
]

for name, L, C, H in colors:
    r, g, b, hex_val = oklch_to_rgb(L, C, H)
    print(f"{name} (oklch({L} {C} {H})): rgb({r}, {g}, {b}) -> {hex_val}")
