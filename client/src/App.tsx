import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import { redlandTheme } from './AppTheme';
import { ArtefactCreate, ArtefactList } from './Artefact';
import { BeaconCreate } from './Beacon';
import { ZoneCreate } from './Zone';


const dataProvider = jsonServerProvider('http://localhost:3001');

function App() {
  return (
    <div className="App">
      <Admin theme={redlandTheme} dataProvider={dataProvider}>
        <Resource name="artefacts" list={ArtefactList} edit={EditGuesser} create={ArtefactCreate} />
        <Resource name="zones" list={ListGuesser} edit={EditGuesser} create={ZoneCreate} />
        <Resource name="beacons" list={ListGuesser} edit={EditGuesser} create={BeaconCreate} />
      </Admin>
    </div>
  );
}

export default App;
