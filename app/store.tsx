import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall, StoreItem, Exhibition, Memo, artefactLookup } from "@shared/types";
import { baseURL, request } from "./lib/controllers";
// export interface artefactsContextValue {
//   artefacts: IArtefact[];
//   artefactInfos: IArtefactInfo[];
//   loadArtefacts(): Promise<void>;
// }
export interface ActionContextValue {
  reload: () => void,
  cacheImages?: null,
  isLoading: boolean
}
// @ts-ignore
const GlobalActionContext = createContext<ActionContextValue>();
GlobalActionContext.displayName = "GLOBALCONTEXT";

// @ts-ignore
const ArtefactsContext = createContext<Artefact[]>();
ArtefactsContext.displayName = "ArtefactsContext";

// @ts-ignore
const ZonesContext = createContext<ZoneConsumable[]>();
ZonesContext.displayName = "ZoneContext";

// @ts-ignore
const BeaconsContext = createContext<Beacon[]>();
BeaconsContext.displayName = "BeaconContext";

// @ts-ignore
const StoreItemsContext = createContext<StoreItem[]>();
StoreItemsContext.displayName = "StoreItemsContext";

// @ts-ignore
const ExhibitionsContext = createContext<Exhibition[]>();
ExhibitionsContext.displayName = "ExhibitionsContext";

// @ts-ignore
const MemoizedContext = createContext<Memo>();
MemoizedContext.displayName = "ExhibitionsContext";

export const GlobalStore: React.FC = ({ children }) => {
  // TODO: Possibly memoize into dictionary
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [zones, setZones] = useState<ZoneConsumable[]>([]);
  const [beacons, setBeacons] = useState<Beacon[]>([]);

  const [isLoading, setisLoading] = useState(false);

  // console.log("rerender store");
  const globalValue: ActionContextValue = useMemo(() => ({
    reload: async () => {
      setisLoading(true);
      try {
        console.log("Getting payloads");
        const artefactResults = await request<Artefact[]>(`${baseURL}/artefacts`);
        const storeItemResults = await request<StoreItem[]>(`${baseURL}/storeItems`);
        const exhibitionResults = await request<Exhibition[]>(`${baseURL}/exhibitions`);
        const zoneResults = await request<ZoneConsumable[]>(`${baseURL}/zones/app`);
        const beaconResults = await request<Beacon[]>(`${baseURL}/beacons`);

        // if production / logger
        // console.log(artefactResults);
        // console.log(storeItemResults);
        // console.log(exhibitionResults);
        // console.log(beaconResults);
        // console.log(zoneResults);
        setArtefacts(artefactResults);
        setStoreItems(storeItemResults);
        setExhibitions(exhibitionResults);
        setZones(zoneResults)
        setBeacons(beaconResults);

      } catch (e) {
        console.log(e.message);
        // TODO inform user of failure and retry in setTimeout
      }
      finally {
        console.log("Done loading");
        setisLoading(false);
      }

    },
    isLoading
  }), []);

  const memoValue: Memo = useMemo(() => ({
    artefacts: artefacts.reduce((acc: artefactLookup, val) => {
      delete val.thumbnail;
      acc[val.id] = val;
      return acc;
    }, {})
  }), [artefacts, zones])

  useEffect(() => {
    globalValue.reload();
  }, [])

  return (
    <GlobalActionContext.Provider value={globalValue}>
      <MemoizedContext.Provider value={memoValue}>
        <ArtefactsContext.Provider value={artefacts}>
          <ZonesContext.Provider value={zones}>
            <BeaconsContext.Provider value={beacons}>
              <StoreItemsContext.Provider value={storeItems}>
                <ExhibitionsContext.Provider value={exhibitions}>
                  {children}
                </ExhibitionsContext.Provider>
              </StoreItemsContext.Provider>
            </BeaconsContext.Provider>
          </ZonesContext.Provider>
        </ArtefactsContext.Provider>
      </MemoizedContext.Provider>
    </GlobalActionContext.Provider>
  )
}


export { ArtefactsContext, ZonesContext, BeaconsContext, StoreItemsContext, ExhibitionsContext, GlobalActionContext, MemoizedContext };