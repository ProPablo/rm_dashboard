import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, BooleanInput, Create, CreateProps, EditGuesser, ImageField, ImageInput, ListGuesser, NumberInput, ReferenceInput, Resource, SelectInput, SimpleForm, TextInput } from 'react-admin';
import './App.css';

export const ArtefactCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      {/* <ImageInput> */}
      <ImageInput source="Image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
    </SimpleForm>
  </Create>
)