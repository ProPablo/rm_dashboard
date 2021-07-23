export interface Artefact {
  id: number,
  name: string,
  description: string,
  acquisitionDate: string,
  thumbnail?: string,
  coordX: number,
  coordY: number,
  zoneId: number,
  priority: number,
  Media: ArtefactMediaSmall,
}

// inputArtefact {}
// export interface inputStoreItem {
//   name: string,
//   description: string,
//   cost: number,
//   inStock: boolean,
//   image: string,
// }

export interface ArtefactMediaSmall {
  src: string,
  type: [0,1], // 0 image, 1 video 
}

export interface ZoneConsumable {
  id: number,
  name: string,
  description: string,
  coordX: number,
  coordY: number,
  Artefacts: number[],
}

export interface Beacon {
  id: number,
  name: string,
  visits: number,
  macAddress: string,
  activation: boolean,
  coordX: number,
  coordY: number,
  zoneId: number,
  rssi?: number
}

// export interface inputBeacon {
//   Name: string,
//   Visits: number,
//   MACAddress: string,
//   CoordX: number,
//   CoordY: number,
//   Activation: boolean
  
// }

export interface StoreItem {
  id: number,
  name: string,
  description: string,
  cost: number, 
  inStock: boolean,
  thumbnail?: string,
}

export interface Exhibition {
  id: number,
  name: string,
  description: string,
  organiser: string,
  priceAdult: number,
  priceConcession: number,
  priceChild: number,
  startDate: string, 
  finishDate: string,
  thumbnail?: string
}

export type artefactLookup = Record<number, Artefact>

export type zonesLookup = Record<number, ZoneConsumable>

export type beaconLookup = Record<string, Beacon>

export interface Memo {
  artefacts: artefactLookup,
  zones: zonesLookup
  // beacons: beaconLookup
}