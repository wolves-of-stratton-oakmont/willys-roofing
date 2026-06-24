/**
 * Service areas for Willy's Roofing — southern Ontario / Greater Golden
 * Horseshoe (area code 905). Primary city + nearby towns the crew covers.
 *
 * `blurb` is short copy for the Service Areas page cards. Keep it honest and
 * local; no fabricated project counts or addresses.
 */

export type ServiceArea = {
  name: string;
  /** True for the primary/home base city. */
  primary?: boolean;
  /** Short, location-specific line for the service-areas page. */
  blurb: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    name: "GTA",
    primary: true,
    blurb:
      "Our home base. From the lakeshore to the escarpment, we know the housing stock and the weather that beats on it.",
  },
  {
    name: "Hamilton",
    blurb:
      "Century homes, post-war bungalows and new builds across the mountain and the lower city — we roof them all.",
  },
  {
    name: "Burlington",
    blurb:
      "Full-service roofing for Burlington homes, from Aldershot to Alton, built for lakeside wind and weather.",
  },
  {
    name: "Grimsby",
    blurb:
      "Roofing and eavestrough along the Niagara bench, where escarpment wind makes proper installation matter.",
  },
  {
    name: "Beamsville",
    blurb:
      "Shingle, flat-roof and repair service throughout Beamsville and the surrounding Lincoln communities.",
  },
  {
    name: "Ancaster",
    blurb:
      "Premium roof replacements and repairs for Ancaster's established neighbourhoods and rural properties.",
  },
  {
    name: "Dundas",
    blurb:
      "Careful roofing for the valley town's older homes — including the steep pitches and detailed rooflines.",
  },
  {
    name: "Waterdown",
    blurb:
      "Roof installation, repair and eavestrough for Waterdown and Flamborough homes, old and new.",
  },
  {
    name: "Oakville",
    blurb:
      "Quality-first roofing for Oakville, with the detailing and clean-up these homes and homeowners expect.",
  },
  {
    name: "Lincoln",
    blurb:
      "Serving the Town of Lincoln across Vineland, Jordan and the wider bench and lakeshore.",
  },
  {
    name: "Smithville",
    blurb:
      "Reliable roofing and storm response for Smithville and the West Lincoln countryside.",
  },
  {
    name: "Vineland",
    blurb:
      "Shingle replacement, flat roofing and repairs across Vineland and the Niagara wine country.",
  },
];

export const primaryArea = serviceAreas.find((a) => a.primary)!;
export const nearbyAreas = serviceAreas.filter((a) => !a.primary);

/** Flat list of names, handy for inline "we serve X, Y, Z" copy. */
export const serviceAreaNames = serviceAreas.map((a) => a.name);
