export type MaterialId = 'kaqua' | 'pvc' | 'copper' | 'steel' | 'pex' | 'pehd' | 'castiron';

export type TransportMode = 'truck' | 'ship' | 'air';
export type EnergyMix = 'green' | 'de' | 'eu' | 'global';
export type InstallationMethod = 'building' | 'trench' | 'trenchless';
export type InsulationClass = 'none' | 'basic' | 'standard' | 'premium';

export interface Co2Input {
  d: number; // nominal outer diameter for K-Aqua (mm)
  sdr: number; // Standard Dimension Ratio
  len: number; // meters
  velocity: number; // m/s
  fluidTemp: number; // °C
  ambientTemp: number; // °C
  insulation: InsulationClass;
  installMethod: InstallationMethod;
  transportKm: number;
  transportMode: TransportMode;
  energyMix: EnergyMix;
  lifespanYears: number;
  recycleEol: boolean;
}

export interface Co2PhaseResult {
  a13: number; // Production (Raw Material + Manufacturing)
  a45: number; // Transport & Installation (Excavators etc.)
  b: number;   // Operation (Thermal + Pumping + Maintenance)
  c: number;   // End of Life
  d: number;   // Module D (Recycling benefits/credits)
  total: number;
}

export interface FinancialResult {
  materialCost: number;
  installationCost: number;
  operationalCost: number; // NPV of energy
  maintenanceCost: number; // NPV of maintenance
  totalCost: number;
}

export interface Co2Result {
  id: MaterialId;
  mass: number; // kg
  phases: Co2PhaseResult;
  financial: FinancialResult;
}

// --- CONSTANTS & FACTORS ---

const ENERGY_FACTORS: Record<EnergyMix, number> = {
  green: 0.015,
  de: 0.380,
  eu: 0.250,
  global: 0.450
};

const TRANSPORT_FACTORS: Record<TransportMode, number> = {
  truck: 0.062,
  ship: 0.008,
  air: 0.602
};

// Economic assumptions for Net Present Value (NPV)
const DISCOUNT_RATE = 0.03; // 3%
const ELECTRICITY_PRICE_EUR_KWH = 0.25; // EUR/kWh
const THERMAL_PRICE_EUR_KWH = 0.10; // EUR/kWh

const INSULATION_PARAMS: Record<InsulationClass, { k: number; thicknessFactor: number; costFactor: number }> = {
  none: { k: 100, thicknessFactor: 0, costFactor: 0 },
  basic: { k: 0.040, thicknessFactor: 0.5, costFactor: 1.0 }, // 0.5x pipe diameter
  standard: { k: 0.035, thicknessFactor: 1.0, costFactor: 2.0 }, // 1.0x pipe diameter
  premium: { k: 0.025, thicknessFactor: 1.5, costFactor: 4.0 }, // 1.5x pipe diameter
};

const INSTALL_FACTORS: Record<InstallationMethod, { co2_per_m3: number; cost_per_m3: number; width_factor: number }> = {
  building: { co2_per_m3: 0, cost_per_m3: 0, width_factor: 0 },
  trench: { co2_per_m3: 15.0, cost_per_m3: 65.0, width_factor: 3.0 }, // Diesel excavator
  trenchless: { co2_per_m3: 25.0, cost_per_m3: 120.0, width_factor: 1.5 }, // HDD boring
};

export const MATERIALS: Record<MaterialId, {
  name: string;
  density: number; // kg/m³
  raw_material_factor: number; // kg CO2e/kg
  mfg_energy_kwh_per_kg: number; // kWh/kg
  thermal_cond: number; // W/mK
  roughness: number; // mm (absolute roughness)
  cost_per_kg: number; // EUR
  install_cost_per_m: number; // Base welding/pressing cost
  eol_credit_factor: number; // kg CO2e/kg
  eol_incin_factor: number; // kg CO2e/kg
  expected_lifespan: number; // Years before major replacement needed
  calcWall: (di: number) => number;
}> = {
  kaqua: {
    name: 'K-Aqua PP-RCT',
    density: 900,
    raw_material_factor: 1.5,
    mfg_energy_kwh_per_kg: 0.8,
    thermal_cond: 0.24,
    roughness: 0.007,
    cost_per_kg: 4.5,
    install_cost_per_m: 8.0,
    eol_credit_factor: -0.8,
    eol_incin_factor: 2.8,
    expected_lifespan: 100, // PP-RCT lasts > 50-100 yrs
    calcWall: (di) => di * 0.1,
  },
  pehd: {
    name: 'PE 100 (HDPE)',
    density: 950,
    raw_material_factor: 1.8,
    mfg_energy_kwh_per_kg: 0.9,
    thermal_cond: 0.38,
    roughness: 0.01,
    cost_per_kg: 3.5,
    install_cost_per_m: 9.0,
    eol_credit_factor: -0.7,
    eol_incin_factor: 2.9,
    expected_lifespan: 100,
    calcWall: (di) => di * 0.11, // SDR11 equivalents
  },
  pvc: {
    name: 'PVC-U',
    density: 1400,
    raw_material_factor: 2.4,
    mfg_energy_kwh_per_kg: 0.9,
    thermal_cond: 0.14,
    roughness: 0.007,
    cost_per_kg: 3.2,
    install_cost_per_m: 9.0,
    eol_credit_factor: -0.5,
    eol_incin_factor: 2.0,
    expected_lifespan: 50,
    calcWall: (di) => di * 0.09,
  },
  copper: {
    name: 'Kupfer',
    density: 8960,
    raw_material_factor: 3.8,
    mfg_energy_kwh_per_kg: 1.2,
    thermal_cond: 385,
    roughness: 0.0015,
    cost_per_kg: 18.0,
    install_cost_per_m: 15.0,
    eol_credit_factor: -2.5,
    eol_incin_factor: 0.1,
    expected_lifespan: 50,
    calcWall: (di) => (di > 50 ? 2.0 : 1.5),
  },
  steel: {
    name: 'Edelstahl / C-Stahl',
    density: 7850,
    raw_material_factor: 2.8,
    mfg_energy_kwh_per_kg: 1.5,
    thermal_cond: 15,
    roughness: 0.05, // Much higher roughness -> higher pump energy
    cost_per_kg: 12.0,
    install_cost_per_m: 14.0,
    eol_credit_factor: -1.2,
    eol_incin_factor: 0.1,
    expected_lifespan: 30, // Often needs replacement/repair
    calcWall: (di) => (di > 50 ? 1.5 : 1.2),
  },
  castiron: {
    name: 'Gusseisen',
    density: 7200,
    raw_material_factor: 1.8,
    mfg_energy_kwh_per_kg: 2.0,
    thermal_cond: 50,
    roughness: 0.25, // Extremely high roughness over time
    cost_per_kg: 2.5,
    install_cost_per_m: 20.0,
    eol_credit_factor: -1.0,
    eol_incin_factor: 0.05,
    expected_lifespan: 60,
    calcWall: (di) => (di > 100 ? 5.0 : 4.0),
  },
  pex: {
    name: 'Mehrschichtverbund (PEX)',
    density: 1100,
    raw_material_factor: 2.9,
    mfg_energy_kwh_per_kg: 1.4,
    thermal_cond: 0.43,
    roughness: 0.007,
    cost_per_kg: 7.0,
    install_cost_per_m: 10.0,
    eol_credit_factor: -0.2,
    eol_incin_factor: 2.5,
    expected_lifespan: 50,
    calcWall: (di) => di * 0.12,
  }
};

// Fluid Properties (Water)
const getFluidDensity = (tempC: number) => {
  // Rough water density kg/m³
  return 1000 - ((tempC - 4) ** 2) / 250;
};

const getFluidViscosity = (tempC: number) => {
  // Kinematic viscosity of water m²/s
  // Approx at 20C: 1e-6, at 60C: 0.47e-6
  return (2.414e-5) * Math.pow(10, 247.8 / (tempC + 133.15)) / getFluidDensity(tempC);
};

// Physics Engine: Darcy-Weisbach Friction Factor (Haaland Equation approx)
const getFrictionFactor = (roughness: number, di: number, velocity: number, viscosity: number) => {
  const reynolds = (velocity * (di / 1000)) / viscosity;
  if (reynolds < 2300) {
    // Laminar
    return 64 / Math.max(reynolds, 1);
  }
  // Turbulent (Haaland eq)
  const relativeRoughness = (roughness / 1000) / (di / 1000);
  const f = Math.pow(-1.8 * Math.log10(Math.pow(relativeRoughness / 3.7, 1.11) + 6.9 / reynolds), -2);
  return f;
};

export function calculateCo2(input: Co2Input): Co2Result[] {
  // 1. Establish hydraulic equivalence
  // We use K-Aqua as the baseline inner diameter so all pipes deliver the exact same volumetric flow.
  const wall_kaqua = input.d / input.sdr;
  const di = input.d - 2 * wall_kaqua; // Internal diameter in mm
  const di_m = di / 1000;

  // Fluid Mechanics
  const area_inner = Math.PI * Math.pow(di_m / 2, 2);
  const flow_m3_s = area_inner * input.velocity;
  const fluid_density = getFluidDensity(input.fluidTemp);
  const fluid_viscosity = getFluidViscosity(input.fluidTemp);

  const results: Co2Result[] = [];
  const energyFactor = ENERGY_FACTORS[input.energyMix];
  const transportFactor = TRANSPORT_FACTORS[input.transportMode];
  
  // 4000 operating hours per year
  const operatingHoursYear = 4000; 

  // Financial NPV Multiplier (Present Value of Annuity)
  const r = DISCOUNT_RATE;
  const n = input.lifespanYears;
  const npvMultiplier = (1 - Math.pow(1 + r, -n)) / r;

  for (const mat of Object.keys(MATERIALS) as MaterialId[]) {
    const config = MATERIALS[mat];
    
    // Replacement multiplier if lifespan is shorter than project lifespan
    const replacements = Math.ceil(input.lifespanYears / config.expected_lifespan);
    
    // Geometries
    const wall = mat === 'kaqua' ? wall_kaqua : config.calcWall(di);
    const d_outer = di + 2 * wall;
    const d_outer_m = d_outer / 1000;
    
    // Mass
    const area_m2 = (Math.PI * (Math.pow(d_outer_m, 2) - Math.pow(di_m, 2))) / 4;
    const volume_m3 = area_m2 * input.len;
    const mass_kg = volume_m3 * config.density;
    const totalMassLife = mass_kg * replacements; // Mass needed over entire lifespan

    // --- A1-A3: PRODUCTION ---
    const a13 = totalMassLife * (config.raw_material_factor + (config.mfg_energy_kwh_per_kg * energyFactor));
    
    // --- A4-A5: TRANSPORT & INSTALLATION ---
    const a4Transport = (totalMassLife / 1000) * input.transportKm * transportFactor;
    
    let a5InstallCo2 = 0;
    let installCost = input.len * config.install_cost_per_m * replacements;
    
    if (input.installMethod !== 'building') {
      const installData = INSTALL_FACTORS[input.installMethod];
      // Volume of earth moved (Width x Depth x Length). Rough estimate.
      const trenchWidth = d_outer_m * installData.width_factor + 0.5;
      const trenchDepth = d_outer_m + 1.0;
      const earthVol = trenchWidth * trenchDepth * input.len;
      a5InstallCo2 = earthVol * installData.co2_per_m3;
      installCost += earthVol * installData.cost_per_m3;
    }
    
    const a45 = a4Transport + a5InstallCo2;

    // --- B: OPERATION (Pumping + Heat Loss) ---
    let b = 0;
    let operationalCostAnnual = 0;

    // 1. Pumping Energy (Darcy-Weisbach)
    // Age factor: steel/iron roughness increases over time due to corrosion/scaling. PP-R stays smooth.
    let effectiveRoughness = config.roughness;
    if (mat === 'steel' || mat === 'castiron') effectiveRoughness *= 1.5; 

    const frictionFactor = getFrictionFactor(effectiveRoughness, di, input.velocity, fluid_viscosity);
    // Pressure drop (Pa) = f * (L/D) * (rho * v^2)/2
    const deltaP = frictionFactor * (input.len / di_m) * (fluid_density * Math.pow(input.velocity, 2)) / 2;
    // Pumping Power (W) = (Q * deltaP) / efficiency (assume 70% efficiency)
    const pumpPowerWatts = (flow_m3_s * deltaP) / 0.70;
    const pumpKwhYear = (pumpPowerWatts * operatingHoursYear) / 1000;
    
    const pumpCo2Total = pumpKwhYear * input.lifespanYears * ENERGY_FACTORS.global; // Operation happens globally
    b += pumpCo2Total;
    operationalCostAnnual += pumpKwhYear * ELECTRICITY_PRICE_EUR_KWH;

    // 2. Thermal Loss
    const deltaTemp = Math.abs(input.fluidTemp - input.ambientTemp);
    if (deltaTemp > 5) {
      const insulConfig = INSULATION_PARAMS[input.insulation];
      const r1 = di_m / 2;
      const r2 = d_outer_m / 2;
      const insulThickness = d_outer_m * insulConfig.thicknessFactor;
      const r3 = r2 + insulThickness;

      // Thermal resistance: pipe wall + insulation
      const rWall = Math.log(r2 / r1) / (2 * Math.PI * config.thermal_cond);
      const rInsul = insulThickness > 0 ? Math.log(r3 / r2) / (2 * Math.PI * insulConfig.k) : 0;
      const rTotal = rWall + rInsul + 0.1; // 0.1 convective resistance roughly

      const heatLossWattsPerMeter = deltaTemp / rTotal;
      const heatLossKwhYear = (heatLossWattsPerMeter * input.len * operatingHoursYear) / 1000;
      
      const heatLossCo2Total = heatLossKwhYear * input.lifespanYears * 0.2; // 0.2 kgCO2/kWh for thermal heating Mix
      b += heatLossCo2Total;
      operationalCostAnnual += heatLossKwhYear * THERMAL_PRICE_EUR_KWH;
      
      // Add insulation cost
      installCost += input.len * insulConfig.costFactor * insulThickness * 100;
    }

    // --- C & D: END OF LIFE & RECYCLING ---
    const c = input.recycleEol ? 0 : (totalMassLife * config.eol_incin_factor);
    const d = input.recycleEol ? (totalMassLife * config.eol_credit_factor) : 0;

    const total = Math.max(0, a13 + a45 + b + c + d);

    // --- FINANCIALS (NPV) ---
    const materialCost = totalMassLife * config.cost_per_kg;
    const operationalCostNPV = operationalCostAnnual * npvMultiplier;
    
    // Simplistic maintenance cost: if it needs replacement, the cost is the install+material again
    // We discount it based on when the replacement happens
    let maintenanceCostNPV = 0;
    for (let rep = 1; rep < replacements; rep++) {
      const yearOfRep = rep * config.expected_lifespan;
      const repCost = (mass_kg * config.cost_per_kg) + (input.len * config.install_cost_per_m);
      maintenanceCostNPV += repCost / Math.pow(1 + DISCOUNT_RATE, yearOfRep);
    }

    const totalCost = materialCost + installCost + operationalCostNPV + maintenanceCostNPV;

    results.push({
      id: mat,
      mass: totalMassLife,
      phases: {
        a13,
        a45,
        b,
        c,
        d,
        total
      },
      financial: {
        materialCost,
        installationCost: installCost,
        operationalCost: operationalCostNPV,
        maintenanceCost: maintenanceCostNPV,
        totalCost
      }
    });
  }

  return results;
}
