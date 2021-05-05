import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, List, ListProps, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { ResourceActions } from '../helper';

export const BeaconCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput label="MAC Address" source="macAddress" />
      <NumberInput source="coordX" />
      <NumberInput source="coordY" />
      <BooleanInput source="activation" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const BeaconEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} undoable={false} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <NumberInput disabled source="visits" />
      <TextInput label="MAC Address" source="macAddress" />
      <BooleanInput source="activation" />
      <NumberInput source="coordX" />
      <NumberInput source="coordY" />
      <DateInput disabled source="createdAt" />
      <DateInput disabled source="updatedAt" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="name" />
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
      <TextField label="MAC Address" source="macAddress" />
      <BooleanField source="activation" />
      <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
      <NumberField source="coordX" />
      <NumberField source="coordY" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

