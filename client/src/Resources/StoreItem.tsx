import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ResourceActions } from '../helper';


export const StoreItemCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="Cost" />
      <BooleanInput source="InStock" />
      <ImageInput source="Media" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const StoreItemEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="Cost" />
      <BooleanInput source="InStock" />
      <DateInput disabled source="CreatedAt" />
      <DateInput disabled source="UpdatedAt" />
      {/* Display for Thumbnail image */}
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <img src={formData.Image} />
        )}
      </FormDataConsumer>
      {/* Image input */}
      <ImageInput source="Media" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const StoreItemList = (props: CreateProps) => {
  const classes = useListStyles();
  return (
    <List
      classes={classes}
      {...props}
    >
      <Datagrid classes={classes} rowClick="edit">
        {/* Thumbnail view on List*/}
        <FunctionField
          label="Thumbnail"
          render={(artefact: any) => <img className={classes.thumbnailImage} src={artefact.Image} />} />
        <TextField source="id" />
        <TextField source="Name" />
        <TextField source="Description" />
        <NumberField source="Cost" />
        <BooleanField source="InStock" />
        <DateField source="CreatedAt" />
        <DateField source="UpdatedAt" />
      </Datagrid>
    </List>
  )
}