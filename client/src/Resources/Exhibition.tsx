import React from 'react';
import { Create, CreateProps, DateInput, NumberInput, SimpleForm, TextInput } from 'react-admin';
import '../App.css';
import { ResourceActions } from '../helper';


export const ExhibitionCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <TextInput source="Organiser" />
      <DateInput source="StartDate" />
      <DateInput source="FinishDate" />
      <NumberInput source="PriceAdult" />
      <NumberInput source="PriceConcession" />
      <NumberInput source="PriceChild" />
      {/* TODO: IMAGE */}
    </SimpleForm>
  </Create>
);