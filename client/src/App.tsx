import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserCreate, UserEdit } from './User';
import { StudentCreate, StudentEdit, StudentList } from './Student';
import { SourceList, SourceCreate, SourceEdit } from './Source';
import { RegistraionCreate, RegistrationEdit, RegistrationList } from './Registration';


const dataProvider = jsonServerProvider('http://localhost:3001');
function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="students" list={StudentList} edit={StudentEdit} create={StudentCreate} />
        <Resource name="registrations" list={RegistrationList} create={RegistraionCreate} edit={RegistrationEdit} />
        <Resource name="courses" list={ListGuesser} />
        <Resource name="sources" list={SourceList} create={SourceCreate} edit={SourceEdit} />
        <Resource name="users" list={ListGuesser} edit={UserEdit} create={UserCreate} />
      </Admin>
    </div>
  );
}

export default App;
