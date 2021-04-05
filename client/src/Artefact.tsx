import jsonServerProvider from 'ra-data-json-server';
import React from 'react';
import { Admin, BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, EditGuesser, ImageField, ImageInput, List, ListGuesser, NumberField, NumberInput, ReferenceField, ReferenceInput, Resource, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';


export const ArtefactCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      {/* <ImageInput> */}
      <ImageInput source="Image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <BooleanInput source="Activation" />
    </SimpleForm>
  </Create>
);

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


export const ArtefactList = (props: CreateProps) =>  {
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
              <BooleanField source="Activation" />
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
  
  
  