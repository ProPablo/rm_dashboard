import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import './App.css';
import { ArtefactCreate } from './Artefact';


const dataProvider = jsonServerProvider('http://localhost:3001');
function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="artefacts" list={ListGuesser} edit={EditGuesser} create={ArtefactCreate} />
      </Admin>
    </div>
  );
}

export default App;
