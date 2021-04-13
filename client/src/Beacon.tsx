import React from 'react';
import { BooleanField, BooleanInput, ChipField, Create, CreateProps, Datagrid, Edit, EditProps, FormTab, List, ListProps, NumberField, NumberInput, ReferenceField, ReferenceInput, ReferenceManyField, SelectInput, SimpleForm, SingleFieldList, TabbedForm, TextField, TextInput } from 'react-admin';
import './App.css';
import { ResourceActions } from './helper';

export const BeaconCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput label="MAC Address" source="MACAddress" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="Name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const BeaconEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="Name" />
      <NumberInput disabled source="Visits" />
      <TextInput label="MAC Address" source="MACAddress" />
      <BooleanInput source="Activation" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="Name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const BeaconList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <NumberField source="Visits" />
      <TextField label="MAC Address" source="MACAddress" />
      <BooleanField source="Activation" />
      <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
      <NumberField source="CoordX" />
      <NumberField source="CoordY" />
    </Datagrid>
  </List>
);

