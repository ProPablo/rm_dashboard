import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, BooleanField, BooleanInput, ChipField, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditButton, EditGuesser, EditProps, FormTab, List, ListGuesser, ListProps, NumberInput, ReferenceArrayField, ReferenceInput, ReferenceManyField, Resource, SelectInput, SimpleForm, SingleFieldList, TabbedForm, TextField, TextInput } from 'react-admin';
import './App.css';

export const ZoneCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
    </SimpleForm>
  </Create>
)

export const ZoneEdit = (props: EditProps) => (
  <Edit undoable={false} {...props}>

    <TabbedForm>
      <FormTab label="Zone">
        <TextInput disabled source="id" />
        <TextInput source="Name" />
        <TextInput source="Description" />
        <DateInput disabled source="CreatedAt" />
        <DateInput disabled source="UpdatedAt" />

        <ReferenceManyField label="Beacons" reference="beacons" target="zoneId">
          <SingleFieldList>
            <ChipField source="Name" />
          </SingleFieldList>
        </ReferenceManyField>
      </FormTab>
      <FormTab label="Artefacts">
        <ReferenceManyField label="Artefacts" reference="artefacts" target="zoneId" source="id">
          <SingleFieldList>
            <ChipField source="Name" />
          </SingleFieldList>
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