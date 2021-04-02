import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, EditGuesser, MenuItemLink , ListGuesser, Resource } from 'react-admin';
import { redlandTheme } from './AppTheme';
import { ArtefactCreate, ArtefactList } from './Artefact';
import { BeaconCreate } from './Beacon';
import { ZoneCreate } from './Zone';
import ArtefactIcon from '@material-ui/icons/AccountBalance';
import ZoneIcon from '@material-ui/icons/Room';
import BeaconIcon from '@material-ui/icons/Looks';

const dataProvider = jsonServerProvider('http://localhost:3001');

function App() {
  return (
    <div className="App">
      <Admin theme={redlandTheme} dataProvider={dataProvider}>
        <Resource name="artefacts" list={ArtefactList} edit={EditGuesser} create={ArtefactCreate} icon={ArtefactIcon} />
        <Resource name="zones" list={ListGuesser} edit={EditGuesser} create={ZoneCreate} icon={ZoneIcon}/>
        <Resource name="beacons" list={ListGuesser} edit={EditGuesser} create={BeaconCreate} icon={BeaconIcon}/>
      </Admin>
    </div>
  );
}

export default App;
