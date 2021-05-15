import React from 'react';
import { Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ConditionalThumbnailEdit, ResourceActions } from '../helper';


export const ExhibitionCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <TextInput source="organiser" />
      <DateInput source="startDate" />
      <DateInput source="finishDate" />
      <NumberInput source="priceAdult" />
      <NumberInput source="priceConcession" />
      <NumberInput source="priceChild" />
      <ImageInput source="InputMedia" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ExhibitionEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props} undoable={false}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <TextInput source="organiser" />
      <DateInput source="startDate" />
      <DateInput source="finishDate" />
      <NumberInput source="priceAdult" />
      <NumberInput source="priceConcession" />
      <NumberInput source="priceChild" />
      <DateInput disabled source="createdAt" />
      <DateInput disabled source="updatedAt" />
      {/* Image input {}*/}
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          ConditionalThumbnailEdit(formData)
        )}
      </FormDataConsumer>
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
          render={(exhibition: any) => <img className={classes.thumbnailImage} src={exhibition.thumbnail} />} />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="organiser" />
        <NumberField source="priceAdult" />
        <NumberField source="priceConcession" />
        <NumberField source="priceChild" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}