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

interface ZoneMedia {
  title: string,

}

export const builtDataProvider: DataProvider = {
  ...dataProvider,
  update: (resource, params) => {
    if (resource !== 'zonemedia' || !params.data.Media) {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }
    if (params.data.Media) {
      // TODO:Do base 64 implementation
    }
    console.log("printing param data zonemedia", params.data);
    const formData = new FormData();
    formData.append('type', params.data.type);
    formData.append('title', params.data.title);
    formData.append('zoneId', params.data.zoneId);
    formData.append('file', params.data.Media.rawFile);

    return httpClient(`${SERVER_URL}/zonemedia/${params.data.id}`, {
      method: "PUT",
      body: formData,
    }).then(({ json }) => {if (json) return { data: json }; throw new Error("No response")})
  },
  create: (resource, params) => {
    if (resource !== 'zonemedia' || !params.data.Media) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }
    console.log("printing param data zonemedia", params.data);
    const formData = new FormData();
    formData.append('type', params.data.type);
    formData.append('title', params.data.title);
    formData.append('zoneId', params.data.zoneId);
    formData.append('file', params.data.Media.rawFile);

    return httpClient(`${SERVER_URL}/zonemedia`, {
      method: "POST",
      body: formData,
    }).then(({ json }) => {if (json) return { data: json }; throw new Error("No response")})
  }
}

// const addUploadFeature = (requestHandler: any) => (type: any, resource: any, params: any) => {
//   if (type === 'UPDATE' && resource === 'posts') {
//     // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
//     // if parameter `multiple` is false, then data.pictures is not an array, but single object
//     if (params.)
//       if (params.data.pictures && params.data.pictures.length) {
//         // only freshly dropped pictures are instance of File
//         const formerPictures = params.data.pictures.filter(p => !(p.rawFile instanceof File));
//         const newPictures = params.data.pictures.filter(p => p.rawFile instanceof File);

//         return Promise.all(newPictures.map(convertFileToBase64))
//           .then(base64Pictures => base64Pictures.map((picture64, index) => ({
//             src: picture64,
//             title: `${newPictures[index].title}`,
//           })))
//           .then(transformedNewPictures => requestHandler(type, resource, {
//             ...params,
//             data: {
//               ...params.data,
//               pictures: [...transformedNewPictures, ...formerPictures],
//             },
//           }));
//       }
//   }
//   // for other request types and resources, fall back to the default request handler
//   return requestHandler(type, resource, params);
// };

// export default addUploadFeature;