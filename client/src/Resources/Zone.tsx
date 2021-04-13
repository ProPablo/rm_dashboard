import React from 'react';
import { Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormTab, List, ListProps, ReferenceManyField, SimpleForm, TabbedForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { ResourceActions } from '../helper';

export const ZoneCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
    </SimpleForm>
  </Create>
)

export const ZoneEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} undoable={false} {...props}>

    <TabbedForm>
      <FormTab label="Zone">
        <TextInput disabled source="id" />
        <TextInput source="Name" />
        <TextInput source="Description" />
        <DateInput disabled source="CreatedAt" />
        <DateInput disabled source="UpdatedAt" />


      </FormTab>
      <FormTab label="Relations">
        <ReferenceManyField label="ARTEFACTS" reference="artefacts" target="zoneId" source="id">
          <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Description"/>
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField label="BEACONS" reference="beacons" target="zoneId">
          <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField label="MAC Address" source="MACAddress" />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>

    </TabbedForm>
  </Edit>
)

export const ZoneList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <TextField source="Description" />
      <DateField source="CreatedAt" />
      <DateField source="UpdatedAt" />
    </Datagrid>
  </List>
);