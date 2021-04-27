import ArtefactIcon from '@material-ui/icons/AccountBalance';
import BeaconIcon from '@material-ui/icons/Looks';
import ExhibitionsIcon from '@material-ui/icons/PermDeviceInformation';
import ZoneMediaIcon from '@material-ui/icons/PermMedia';
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
import { ZoneMediaCreate, ZoneMediaEdit } from './Resources/ZoneMedia';



function App() {
  return (
    <div className="App">
      <Admin customRoutes={customRoutes} layout={AppLayout} theme={redlandTheme} dataProvider={builtDataProvider} authProvider={authProvider} loginPage={LoginPage}>
        <Resource name="artefacts" list={ArtefactList} edit={ArtefactEdit} create={ArtefactCreate} icon={ArtefactIcon} />
        <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} icon={ZoneIcon} />
        <Resource name="zonemedia" list={ListGuesser} edit={ZoneMediaEdit} create={ZoneMediaCreate} icon={ZoneMediaIcon} />
        <Resource name="beacons" list={BeaconList} edit={BeaconEdit} create={BeaconCreate} icon={BeaconIcon} />
        <Resource name="exhibitions" list={ExhibitionList} edit={ExhibitionEdit} create={ExhibitionCreate} icon={ExhibitionsIcon}/>
        <Resource name="storeItems" list={StoreItemList} edit={StoreItemEdit} create={StoreItemCreate} icon={StoreItemIcon} />
      </Admin>
    </div>
  );
}

export default App;
