import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Artefact, Zone, Beacon, ArtefactMedia } from "@shared/types";
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


export const GlobalStore: React.FC = ({ children }) => {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [artefactMedias, setArtefactMedias] = useState<ArtefactMedia[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [beacons, setBeacons] = useState<Beacon[]>([]);

  // console.log("rerender store");
  const globalValue: ActionContextValue = useMemo(() => ({
    reload: async () => {
      // const url = `${baseURL}/artefacts`;
      // console.log("Getting data from " + url);
      const artefactResults = await request<Artefact[]>(`${baseURL}/artefacts`);
      const zoneResults = await request<Zone[]>(`${baseURL}/zones`);
      const beaconResults = await request<Beacon[]>(`${baseURL}/beacons`);

      console.log(artefactResults);
      console.log(beaconResults);
      console.log(zoneResults);
      setArtefacts(artefactResults);
      setZones(zoneResults)
      setBeacons(beaconResults);
      
    }
  }), []);

  useEffect(() => {
    globalValue.reload();
  }, [])

  return (
    <GlobalActionContext.Provider value={globalValue}>
      <ArtefactsContext.Provider value={artefacts}>
        {children}
      </ArtefactsContext.Provider>
    </GlobalActionContext.Provider>
  )
}


export { ArtefactsContext, GlobalActionContext };