import React from 'react';
import { BooleanField, BooleanInput, ChipField, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, SelectInput, SimpleForm, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ConditionalThumbnailEdit, ResourceActions } from '../helper';


export const ExhibitionCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description"/>
      <TextInput source="organiser" />
      <SelectInput source="status" choices={[
        { id: 'Current', name: 'Current' },
        { id: 'Upcoming', name: 'Upcoming' },
        { id: 'Past', name: 'Past' },
      ]} />
      <DateInput source="startDate" label="Start Date"/>
      <DateInput source="finishDate" label="Finish Date"/>
      <NumberInput source="priceAdult" label="Price Adult"/>
      <NumberInput source="priceConcession" label="Price Concession"/>
      <NumberInput source="priceChild" label="Price Child"/>
      <ImageInput source="InputMedia" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ExhibitionEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} {...props} undoable={false}>
    <SimpleForm>
      <TextInput disabled source="id" label="ID"/>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <TextInput source="organiser" />
      <SelectInput source="status" choices={[
        { id: 'Current', name: 'Current' },
        { id: 'Upcoming', name: 'Upcoming' },
        { id: 'Past', name: 'Past' },
      ]} />
      <DateInput source="startDate" label="Start Date"/>
      <DateInput source="finishDate" label="Finish Date"/>
      <NumberInput source="priceAdult" label="Price Adult"/>
      <NumberInput source="priceConcession" label="Price Concession"/>
      <NumberInput source="priceChild" label="Price Child"/>
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
        <TextField source="id" label="ID"/>
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="organiser" />
        <ChipField source="status"/>
        <NumberField source="priceAdult" label="Price Adult" options={{ style: 'currency', currency: 'AUD' }}/>
        <NumberField source="priceConcession" label="Price Concession" options={{ style: 'currency', currency: 'AUD' }}/>
        <NumberField source="priceChild" label="Price Child" options={{ style: 'currency', currency: 'AUD' }}/>
        <DateField source="startDate" label="Start Date"/>
        <DateField source="finishDate" label="Finish Date"/>
        <DateField source="createdAt" label="Created At"/>
        <DateField source="updatedAt" label="Updated At"/>
      </Datagrid>
    </List>
  )
}