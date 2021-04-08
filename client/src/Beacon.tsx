import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, Edit, EditProps, FormTab, List, ListProps, NumberField, NumberInput, SimpleForm, TabbedForm, TextField, TextInput } from 'react-admin';
import './App.css';

export const BeaconCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="MACAddress" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
    </SimpleForm>
  </Create>
)

export const BeaconList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <NumberField source="Visits" />
      <TextField source="MACAddress" />
      <BooleanField source="Activation" />
      <NumberField source="CoordX" />
      <NumberField source="CoordY" />
    </Datagrid>
  </List>
);

export const BeaconEdit = (props: EditProps) => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Beacon">
        <TextInput source="id" />
        <TextInput source="Name" />
        <NumberInput source="Visits" />
        <TextInput source="MACAddress" />
        <BooleanInput source="Activation" />
        <NumberInput source="CoordX" />
        <NumberInput source="CoordY" />
      </FormTab>

      <FormTab label="Zones">
      </FormTab>


    </TabbedForm>
  </Edit>
);