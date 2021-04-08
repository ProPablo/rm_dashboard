import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
import './App.css';


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
      <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="Name" /></ReferenceInput>
    </SimpleForm>
  </Create>
);

export const ArtefactEdit = (props: EditProps) => (
  <Edit {...props}>
      <SimpleForm>
          <TextInput source="id" />
          <TextInput source="Name" />
          <TextInput source="Description" />
          <TextInput source="Image" />
          <DateInput source="AcquisitionDate" />
          <NumberInput source="CoordX" />
          <NumberInput source="CoordY" />
          <DateInput source="CreatedAt" />
          <DateInput source="UpdatedAt" />
          <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="Name" /></ReferenceInput>
      </SimpleForm>
  </Edit>
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
  
  
  