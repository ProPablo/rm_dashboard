import { DataProvider, fetchUtils, ResourceMatch, UpdateParams } from 'react-admin';

import jsonServerProvider from 'ra-data-json-server';
import { SERVER_URL } from './constants';

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

interface ArtefactMedia {
  title: string,

}

const convertFileToBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const builtDataProvider: DataProvider = {
  ...dataProvider,
  update: (resource, params) => {
    // fallback to the default implementation
    if (!params.data.Media) return dataProvider.update(resource, params);

    // This is for remaining base64 implementations
    if (resource !== 'artefactmedia') {
      console.log("GOT params data", params.data);
      return convertFileToBase64(params.data.Media)
        .then(base64String => {
          delete params.data.Media;
          return dataProvider.update(resource, {
            ...params,
            data: {
              ...params.data,
              thumbnail: base64String
            }
          })
        })
    }

    console.log("printing param data artefactmedia", params.data);
    const formData = new FormData();
    formData.append('type', params.data.type);
    formData.append('title', params.data.title);
    formData.append('artefactId', params.data.artefactId);
    formData.append('file', params.data.Media.rawFile);

    return httpClient(`${SERVER_URL}/artefactmedia/${params.data.id}`, {
      method: "PUT",
      body: formData,
    }).then(({ json }) => { if (json) return { data: json }; throw new Error("No response") })
  },

  create: (resource, params) => {
    if (!params.data.Media) return dataProvider.create(resource, params);

    // This is for remaining base64 implementations
    if (resource !== 'artefactmedia') {
      return convertFileToBase64(params.data.Media)
        .then(base64String => {
          delete params.data.Media;
          return dataProvider.create(resource, {
            ...params,
            data: {
              ...params.data,
              thumbnail: base64String
            }
          })
        })
    }

    console.log("printing param data artefactmedia", params.data);
    const formData = new FormData();
    formData.append('type', params.data.type);
    formData.append('title', params.data.title);
    formData.append('artefactId', params.data.artefactId);
    formData.append('file', params.data.Media.rawFile);

    return httpClient(`${SERVER_URL}/artefactmedia`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => { if (json) return { data: json }; throw new Error("No response") })
  }
}