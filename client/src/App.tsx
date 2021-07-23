import ArtefactIcon from '@material-ui/icons/AccountBalance';
import BeaconIcon from '@material-ui/icons/Looks';
import ExhibitionsIcon from '@material-ui/icons/PermDeviceInformation';
import ArtefactMediaIcon from '@material-ui/icons/PermMedia';
import ZoneIcon from '@material-ui/icons/Room';
import StoreItemIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import { AppLayout } from './AppLayout';
import { redlandTheme } from './AppTheme';
import { authProvider } from './authprovider';
import customRoutes from './customRoutes';
import { builtDataProvider } from './dataprovider';
import { LoginPage } from './LoginPage';
import { ArtefactCreate, ArtefactEdit, ArtefactList } from './Resources/Artefact';
import { BeaconCreate, BeaconEdit, BeaconList } from './Resources/Beacon';
import { ExhibitionCreate, ExhibitionEdit, ExhibitionList } from './Resources/Exhibition';
import { StoreItemCreate, StoreItemList, StoreItemEdit } from './Resources/StoreItem';
import { ZoneCreate, ZoneEdit, ZoneList } from './Resources/Zone';
import { ArtefactMediaCreate, ArtefactMediaEdit, ArtefactMediaList } from './Resources/ArtefactMedia';

import { Artefact } from "../../shared/types";


function App() {
  return (
    <div className="App">
      <Admin customRoutes={customRoutes} layout={AppLayout} theme={redlandTheme} dataProvider={builtDataProvider} authProvider={authProvider} loginPage={LoginPage} >
        <Resource name="artefacts" options={{label: "Artefacts"}} list={ArtefactList} edit={ArtefactEdit} create={ArtefactCreate} icon={ArtefactIcon} />
        <Resource name="artefactmedia" options={{label: "Artefact Media"}} list={ArtefactMediaList} edit={ArtefactMediaEdit} create={ArtefactMediaCreate} icon={ArtefactMediaIcon} />
        <Resource name="zones" options={{label: "Zones"}} list={ZoneList} edit={ZoneEdit} create={ZoneCreate} icon={ZoneIcon} />
        <Resource name="beacons" options={{label: "Beacons"}} list={BeaconList} edit={BeaconEdit} create={BeaconCreate} icon={BeaconIcon} />
        <Resource name="exhibitions" options={{label: "Exhibitions"}} list={ExhibitionList} edit={ExhibitionEdit} create={ExhibitionCreate} icon={ExhibitionsIcon} />
        <Resource name="storeItems" options={{label: "Store Items"}} list={StoreItemList} edit={StoreItemEdit} create={StoreItemCreate} icon={StoreItemIcon} />
      </Admin>
    </div>
  );
}

export default App;
