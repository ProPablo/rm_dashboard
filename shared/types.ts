export interface Artefact {
  id: number,
  name: string,
  description: string,
  acquisitionDate: Date,
  thumbnail: string,
  coordX: number,
  coordY: number,
  zoneid: number,
  priority: number,
  MediaId: number,
}

// inputArtefact {}
// export interface inputStoreItem {
//   name: string,
//   description: string,
//   cost: number,
//   inStock: boolean,
//   image: string,
// }

export interface ArtefactMedia {
  id: number,
  src: string,
  title: string,
  artefactId: number,
}

export interface Zones {
  id: number,
  name: string,
  description: string,
}

export interface Beacons {
  id: number,
  name: string,
  visits: number,
  macAddress: string,
  activation: boolean,
  coordX: number,
  coordY: number,
  zoneid: number,
}

// export interface inputBeacon {
//   Name: string,
//   Visits: number,
//   MACAddress: string,
//   CoordX: number,
//   CoordY: number,
//   Activation: boolean
  
// }

export interface StoreItems {
  id: number,
  name: string,
  description: string,
  cost: number, 
  inStock: boolean,
  thumbnail: string,
}

export interface Exhibition {
  id: number,
  name: string,
  description: string,
  organiser: string,
  priceAdult: number,
  priceConcession: number,
  priceChild: number,
  startDate: Date, 
  finishDate: Date,
  thumbnail: string
}



