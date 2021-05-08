import React from 'react';
import { ChipField, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, ReferenceManyField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ConditionalThumbnailEdit, ResourceActions } from '../helper';
import { ConditionalMediaRender } from './ArtefactMedia';



export const ArtefactCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="coordX" />
      <NumberInput source="coordY" />
      <DateInput source="acquisitionDate" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ImageInput source="Media" label="Thumbnail" accept="image/*" maxSize={1000000}>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ArtefactEdit = (props: EditProps) => {
  const classes = useListStyles();

  return (
    <Edit actions={<ResourceActions />} undoable={false} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="description" />
        <NumberInput source="coordX" />
        <NumberInput source="coordY" />
        <DateInput source="acquisitionDate" />
        <DateInput disabled source="createdAt" />
        <DateInput disabled source="updatedAt" />
        <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
          <SelectInput optionText="name" />
        </ReferenceInput>
        {/* Image input {}*/}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            ConditionalThumbnailEdit(formData)
          )}
        </FormDataConsumer>
        {/* <ReferenceField label="" linkType={false} reference="artefactmedia" source="MediaId"><ConditionalMediaRender /></ReferenceField> */}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            ConditionalMediaRender(formData)
          )}
        </FormDataConsumer>
      </SimpleForm>
    </Edit >
  );
}
export const ArtefactList = (props: CreateProps) => {
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
          render={(artefact: any) => <img className={classes.thumbnailImage} src={artefact.thumbnail} />} />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="coordX" />
        <NumberField source="coordY" />
        <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
        <DateField source="acquisitionDate" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  )
}
