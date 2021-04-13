import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditActionsProps, EditProps, ImageField, ImageInput, List, ListButton, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, TextField, TextInput, TopToolbar } from 'react-admin';
import './App.css';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { ResourceActions } from './helper';


const useListStyles = makeStyles({
  content: {
    backgroundColor: '#F2F3F8',
  },
  headerCell: {
    root: {
      backgroundColor: '#F2F3F8'
    },
    backgroundColor: '#F2F3F8',
  },
})

export const ArtefactCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions/>} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <DateInput source="AcquisitionDate" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
        <SelectInput optionText="Name" />
      </ReferenceInput>
      <ImageInput source="Image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ArtefactEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <DateInput source="AcquisitionDate" />
      <DateInput disabled source="CreatedAt" />
      <DateInput disabled source="UpdatedAt" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
        <SelectInput optionText="Name" />
      </ReferenceInput>
      <ImageInput source="Image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const ArtefactList = (props: CreateProps) => {
  const classes: any = useListStyles();
  return (
    <List
      classes={classes}
      {...props}
    >
      <Datagrid classes={classes} rowClick="edit">
        <TextField source="id" />
        <TextField source="Name" />
        <TextField source="Description" />
        <NumberField source="CoordX" />
        <NumberField source="CoordY" />
        <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
        <TextField source="Image" />
        <DateField source="AcquisitionDate" />
        <DateField source="CreatedAt" />
        <DateField source="UpdatedAt" />
      </Datagrid>
    </List>
  )
}


