import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, BooleanInput, Create, CreateProps, EditGuesser, ListGuesser, NumberInput, ReferenceInput, Resource, SelectInput, SimpleForm, TextInput } from 'react-admin';
import './App.css';

export const ZoneCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
    </SimpleForm>
  </Create>
)