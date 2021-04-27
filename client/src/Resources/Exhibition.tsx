import React from 'react';
import { Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ResourceActions } from '../helper';


export const ExhibitionCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <TextInput source="Organiser" />
      <DateInput source="StartDate" />
      <DateInput source="FinishDate" />
      <NumberInput source="PriceAdult" />
      <NumberInput source="PriceConcession" />
      <NumberInput source="PriceChild" />
      <ImageInput source="Media" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ExhibitionEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="Name" />
      <TextInput source="Description" />
      <TextInput source="Organiser" />
      <DateInput source="StartDate" />
      <DateInput source="FinishDate" />
      <NumberInput source="PriceAdult" />
      <NumberInput source="PriceConcession" />
      <NumberInput source="PriceChild" />
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

export const ExhibitionList = (props: CreateProps) => {
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
        <TextField source="Organiser" />
        <NumberField source="PriceAdult" />
        <NumberField source="PriceConcession" />
        <NumberField source="PriceChild" />
        <DateField source="CreatedAt" />
        <DateField source="UpdatedAt" />
      </Datagrid>
    </List>
  )
}