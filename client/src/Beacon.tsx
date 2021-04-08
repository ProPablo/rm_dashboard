import React from 'react';
import { BooleanField, BooleanInput, ChipField, Create, CreateProps, Datagrid, Edit, EditProps, FormTab, List, ListProps, NumberField, NumberInput, ReferenceField, ReferenceInput, ReferenceManyField, SelectInput, SimpleForm, SingleFieldList, TabbedForm, TextField, TextInput } from 'react-admin';
import './App.css';

export const BeaconCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="MACAddress" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
      <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="Name" /></ReferenceInput>
    </SimpleForm>
  </Create>
)

export const BeaconEdit = (props: EditProps) => (
  <Edit undoable={false} {...props}>
    <TabbedForm>
      <FormTab label="Beacon">
        <TextInput disabled source="id" />
        <TextInput source="Name" />
        <NumberInput source="Visits" />
        <TextInput source="MACAddress" />
        <BooleanInput source="Activation" />
        <NumberInput source="CoordX" />
        <NumberInput source="CoordY" />
        <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="Name" /></ReferenceInput>
      </FormTab>

      <FormTab label="Zones">
        <ReferenceManyField label="Artefacts" reference="artefacts" target="zoneId" source="id">
          <SingleFieldList>
            <ChipField source="Name" />
          </SingleFieldList>
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const BeaconList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <NumberField source="Visits" />
      <TextField source="MACAddress" />
      <BooleanField source="Activation" />
      <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
      <NumberField source="CoordX" />
      <NumberField source="CoordY" />
    </Datagrid>
  </List>
);

