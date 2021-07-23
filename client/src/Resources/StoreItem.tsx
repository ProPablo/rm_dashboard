import React from 'react';
import { BooleanField, BooleanInput, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ConditionalThumbnailEdit, ResourceActions } from '../helper';


export const StoreItemCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <NumberInput source="cost" />
      <BooleanInput source="inStock" label="In Stock"/>
      <ImageInput source="InputMedia" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const StoreItemEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props} undoable={false}>
    <SimpleForm>
      <TextInput disabled source="id" label="ID"/>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <NumberInput source="cost" />
      <BooleanInput source="inStock" label="In Stock"/>
      <DateInput disabled source="createdAt" label="Created At"/>
      <DateInput disabled source="updatedAt" label="Updated At"/>
      {/* Image input {}*/}
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          ConditionalThumbnailEdit(formData)
        )}
      </FormDataConsumer>
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
          render={(storeItem: any) => <img className={classes.thumbnailImage} src={storeItem.thumbnail} />} />
        <TextField source="id" label="ID"/>
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="cost" />
        <BooleanField source="inStock" label="In Stock"/>
        <DateField source="createdAt" label="Created At"/>
        <DateField source="updatedAt" label="Updated At"/>
      </Datagrid>
    </List>
  )
}