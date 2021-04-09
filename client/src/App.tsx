import jsonServerProvider from 'ra-data-json-server';
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
import { SERVER_URL } from './constants';
import { authProvider } from './authprovider';

const httpClient = (url: any, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const authString = localStorage.getItem('auth');
  if (authString) {
    const { token } = JSON.parse(authString);
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};


const dataProvider = jsonServerProvider(SERVER_URL, httpClient);
function App() {
  return (
    <div className="App">
      <Admin layout={AppLayout} theme={redlandTheme} dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
        <Resource name="artefacts" list={ArtefactList} edit={ArtefactEdit} create={ArtefactCreate} icon={ArtefactIcon} />
        <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} icon={ZoneIcon} />
        <Resource name="beacons" list={BeaconList} edit={BeaconEdit} create={BeaconCreate} icon={BeaconIcon} />
      </Admin>
    </div>
  );
}

export default App;
