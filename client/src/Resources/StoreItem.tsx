import React from 'react';
import { BooleanInput, Create, CreateProps, NumberInput, SimpleForm, TextInput } from 'react-admin';
import '../App.css';
import { ResourceActions } from '../helper';


export const StoreItemCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="Cost" />
      <BooleanInput source="InStock" />
      {/* TODO: IMAGE */}
    </SimpleForm>
  </Create>
);