import React from 'react';
import { Admin, EditGuesser, fetchUtils, MenuItemLink, ListGuesser, Resource, LoginComponent } from 'react-admin';
import { redlandTheme } from './AppTheme';
import { AppLayout } from './AppLayout';
import { ArtefactCreate, ArtefactEdit, ArtefactList } from './Artefact';
import { BeaconCreate, BeaconEdit, BeaconList } from './Beacon';
import { ZoneCreate, ZoneEdit, ZoneList } from './Zone';
import ArtefactIcon from '@material-ui/icons/AccountBalance';
import ZoneIcon from '@material-ui/icons/Room';
import BeaconIcon from '@material-ui/icons/Looks';
import { LoginPage } from './LoginPage';
import { authProvider } from './authprovider';
import { builtDataProvider } from './dataprovider';
import { ZoneMediaCreate, ZoneMediaEdit } from './ZoneMedia';



function App() {
  return (
    <div className="App">
      <Admin layout={AppLayout} theme={redlandTheme} dataProvider={builtDataProvider} authProvider={authProvider} loginPage={LoginPage}>
        <Resource name="artefacts" list={ArtefactList} edit={ArtefactEdit} create={ArtefactCreate} icon={ArtefactIcon} />
        <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} icon={ZoneIcon} />
        <Resource name="zonemedia" list={ListGuesser} edit={ZoneMediaEdit} create={ZoneMediaCreate}/>
        <Resource name="beacons" list={BeaconList} edit={BeaconEdit} create={BeaconCreate} icon={BeaconIcon} />
      </Admin>
    </div>
  );
}

export default App;
