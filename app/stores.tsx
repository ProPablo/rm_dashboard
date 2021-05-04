import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Artefact } from "@shared/types";
import { baseURL, request } from "./lib/controllers";
// export interface artefactsContextValue {
//   artefacts: IArtefact[];
//   artefactInfos: IArtefactInfo[];
//   loadArtefacts(): Promise<void>;
// }
export interface ActionContextValue {
  reload: () => void,
  cacheImages?: null,
}
// @ts-ignore
const GlobalActionContext = createContext<ActionContextValue>();
GlobalActionContext.displayName = "GLOBALCONTEXT";

// @ts-ignore
const ArtefactsContext = createContext<Artefact[]>();
ArtefactsContext.displayName = "ArtefactsContext";


export const GlobalStore: React.FC = ({ children }) => {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  // console.log("rerender store");
  const globalValue: ActionContextValue = useMemo(() => ({
    reload: async () => {
      const url = `${baseURL}/artefacts`;
      console.log("Getting data from " + url);
      const artefactResults = await request<Artefact[]>(`${baseURL}/artefacts`);
      console.log(artefactResults);
      setArtefacts(artefactResults);
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


export { ArtefactsContext };