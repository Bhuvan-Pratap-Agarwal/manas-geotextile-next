export type ApplicationAmbientVariant =
  | "road"
  | "rail"
  | "tunnel"
  | "landfill"
  | "waterproofing"
  | "retaining"
  | "marine"
  | "canal";

export interface ApplicationSpec {
  id: string;
  indexLabel: string;
  title: string;
  /** Short infrastructural subtitle */
  dek: string;
  /** Minimal supporting copy */
  body: string;
  /** Datum / membrane / corridor line — technical overlay */
  datum: string;
  variant: ApplicationAmbientVariant;
}

export const APPLICATIONS: ApplicationSpec[] = [
  {
    id: "road-infrastructure",
    indexLabel: "01",
    title: "Road\nInfrastructure",
    dek: "Pavement strata · separation · stabilization",
    body: "Controlled reinforcement across embankments, subgrades, and long corridors—maintaining modulus and drainage discipline at highway scale.",
    datum: "LAYER STACK · GEOGRID / GEOCELL INTERFACE · DESIGN LIFE 25–50YR",
    variant: "road",
  },
  {
    id: "railway-systems",
    indexLabel: "02",
    title: "Railway\nSystems",
    dek: "Ballast stabilization · reinforcement corridors",
    body: "Engineered restraint under cyclic loading—aligning stiffness, fouling resistance, and track geometry stability across heavy-axle corridors.",
    datum: "CYCLIC STRESS FIELD · BALLAST-ISOLATION · SUBGRADE INTERFACE",
    variant: "rail",
  },
  {
    id: "tunnel-engineering",
    indexLabel: "03",
    title: "Tunnel\nEngineering",
    dek: "Primary & secondary liners · membranes",
    body: "Sealed strata under hydrostatic regimes—composite barriers with disciplined laps, transitions, and long-section continuity.",
    datum: "HYDROSTATIC HEAD · LINER STACK · INTERFACE WATERTIGHT SEQUENCE",
    variant: "tunnel",
  },
  {
    id: "landfill-protection",
    indexLabel: "04",
    title: "Landfill\nProtection",
    dek: "Containment · leachate control · isolation",
    body: "Layered barriers containing environmental loads—regulated gradients, basal integrity, and long-term diffusion resistance.",
    datum: "COMPOSITE BASE · LEACHATE PLANE · CQA TRACEABILITY WINDOW",
    variant: "landfill",
  },
  {
    id: "waterproofing-systems",
    indexLabel: "05",
    title: "Waterproofing\nSystems",
    dek: "Substructure envelopes · reservoirs",
    body: "Membrane choreography across slabs, ramps, and cold joints—cold flexibility, overlapping logic, and field-verified sequencing.",
    datum: "COLD-JOINT SEQUENCE · FILM INTERFACE · DESIGN HEAD",
    variant: "waterproofing",
  },
  {
    id: "retaining-structures",
    indexLabel: "06",
    title: "Retaining\nStructures",
    dek: "Reinforced soil · load transfer",
    body: "Geosynthetic restraint managing lateral earth pressure—articulated stiffness, drainage, and facing integration at civil scale.",
    datum: "EARTH-PRESSURE ENVELOPE · DRA WINDOW · FACING TIE SEQUENCE",
    variant: "retaining",
  },
  {
    id: "ports-coastal",
    indexLabel: "07",
    title: "Ports &\nCoastal",
    dek: "Marine works · scour · revetments",
    body: "Coastal infrastructures exposed to saline cycles and tidal fatigue—abrasion-conscious barriers and basal stability under surcharge.",
    datum: "SALINE CYCLE · TIDAL RANGE · REVETMENT / QUAY INTERFACE",
    variant: "marine",
  },
  {
    id: "canal-engineering",
    indexLabel: "08",
    title: "Canal\nEngineering",
    dek: "Lining systems · seepage control",
    body: "Controlled longitudinal sections with disciplined slope stability—composite linings resisting infiltration across long waterways.",
    datum: "SEEPAGE VECTOR · LINING INTERFACE · PROFILE CHAINAGE",
    variant: "canal",
  },
];
