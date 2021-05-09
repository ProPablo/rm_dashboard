import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Artefact, Zone, Beacon, ArtefactMedia, StoreItem, Exhibition } from "@shared/types";
import { baseURL, request } from "./lib/controllers";
// export interface artefactsContextValue {
//   artefacts: IArtefact[];
//   artefactInfos: IArtefactInfo[];
//   loadArtefacts(): Promise<void>;
// }
export interface ActionContextValue {
  reload: () => void,
  cacheImages?: null,
  isLoading?: boolean
}
// @ts-ignore
const GlobalActionContext = createContext<ActionContextValue>();
GlobalActionContext.displayName = "GLOBALCONTEXT";

// @ts-ignore
const ArtefactsContext = createContext<Artefact[]>();
ArtefactsContext.displayName = "ArtefactsContext";

// @ts-ignore
const StoreItemsContext = createContext<StoreItem[]>();
StoreItemsContext.displayName = "StoreItemsContext";

// @ts-ignore
const ExhibitionsContext = createContext<Exhibition[]>();
ExhibitionsContext.displayName = "ExhibitionsContext";


export const GlobalStore: React.FC = ({ children }) => {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [beacons, setBeacons] = useState<Beacon[]>([]);

  const [isLoading, setisLoading] = useState(false);

  // console.log("rerender store");
  const globalValue: ActionContextValue = useMemo(() => ({
    reload: async () => {
      setisLoading(true);
      try {
        const artefactResults = await request<Artefact[]>(`${baseURL}/artefacts`);
        const storeItemResults = await request<StoreItem[]>(`${baseURL}/storeItems`);
        const exhibitionResults = await request<Exhibition[]>(`${baseURL}/exhibitions`);
        const zoneResults = await request<Zone[]>(`${baseURL}/zones`);
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
        setisLoading(false);
      }

    }
  }), []);

  useEffect(() => {
    globalValue.reload();
  }, [])

  return (
    <GlobalActionContext.Provider value={globalValue}>
      <ArtefactsContext.Provider value={artefacts}>
        <StoreItemsContext.Provider value={storeItems}>
          <ExhibitionsContext.Provider value={exhibitions}>
            {children}
          </ExhibitionsContext.Provider>
        </StoreItemsContext.Provider>
      </ArtefactsContext.Provider>
    </GlobalActionContext.Provider>
  )
}


export { ArtefactsContext, StoreItemsContext, ExhibitionsContext, GlobalActionContext };