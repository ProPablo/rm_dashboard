import React from 'react';
import { ChipField, Create, CreateProps, Datagrid, DateField, DateInput, DeleteButton, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, ReferenceManyField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput, useNotify } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ConditionalThumbnailEdit, ResourceActions } from '../helper';
import { ConditionalMediaRender } from './ArtefactMedia';

export const ArtefactCreate = (props: CreateProps) => {
  const classes = useListStyles();
  const notify = useNotify();  
  const OnBadThumbnail = () => {
      notify("Invalid thumbnail, size limit may be exceeded");
  }
  return (
    <Create actions={<ResourceActions />} {...props}>
        <SimpleForm>
        <TextInput source="name" />
        <TextInput multiline source="description" />
        <NumberInput source="coordX" label="Coord X"/>
        <NumberInput source="coordY" label="Coord Y"/>
        <DateInput source="acquisitionDate" label="Acquisition Date"/>
        <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ImageInput source="InputMedia" label="Thumbnail" accept="image/*" maxSize={1000000} options={{onDropRejected: OnBadThumbnail}}>
            <ImageField source="src" title="title" className={classes.editImage}/>
        </ImageInput>
        </SimpleForm>
    </Create>
  )};



export const ArtefactEdit = (props: EditProps) => {
  const classes = useListStyles();
  
  return (
    <Edit actions={<ResourceActions />} undoable={false} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" label="ID"/>
        <TextInput source="name" />
        <TextInput multiline source="description" />
        <NumberInput source="coordX" label="Coord X"/>
        <NumberInput source="coordY" label="Coord Y"/>
        <DateInput source="acquisitionDate" label="Acquisition Date"/>
        <DateInput disabled source="createdAt" label="Created At"/>
        <DateInput disabled source="updatedAt" label="Updated At"/>
        <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
          <SelectInput optionText="name" />
        </ReferenceInput>
        {/* Image input {}*/}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            ConditionalThumbnailEdit(formData)
          )}
        </FormDataConsumer>
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
        <TextField source="id" label="ID"/>
        <TextField source="name" />
        <TextField source="description" />
        <NumberField source="coordX" label="Coord X"/>
        <NumberField source="coordY" label="Coord Y"/>
        <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
        <DateField source="acquisitionDate" label="Acquisition Date"/>
        <DateField source="createdAt" label="Created At"/>
        <DateField source="updatedAt" label="Updated At"/>
      </Datagrid>
    </List>
  )
}
