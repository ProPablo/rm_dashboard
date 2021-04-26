import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, List, ListProps, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { ResourceActions } from '../helper';

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
      <DateInput disabled source="CreatedAt" />
      <DateInput disabled source="UpdatedAt" />
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
      <DateField source="CreatedAt" />
      <DateField source="UpdatedAt" />
    </Datagrid>
  </List>
);

