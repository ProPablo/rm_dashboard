import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, BooleanInput, Create, CreateProps, EditGuesser, ListGuesser, NumberInput, ReferenceInput, Resource, SelectInput, SimpleForm, TextInput } from 'react-admin';
import './App.css';

export const ArtefactCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
    </SimpleForm>
  </Create>
)