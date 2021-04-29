import React from 'react';
import { ChipField, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormDataConsumer, FunctionField, ImageField, ImageInput, List, NumberField, NumberInput, ReferenceField, ReferenceInput, ReferenceManyField, SelectInput, SimpleForm, SingleFieldList, TextField, TextInput } from 'react-admin';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { ResourceActions } from '../helper';
import { ConditionalMediaRender } from './ArtefactMedia';




export const ArtefactCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
      <NumberInput source="CoordX" />
      <NumberInput source="CoordY" />
      <DateInput source="AcquisitionDate" />
      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined}>
        <SelectInput optionText="Name" />
      </ReferenceInput>
      <ImageInput source="Media" label="Related pictures" accept="image/*" maxSize={1000000}>
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
        {/* Display for Thumbnail image */}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <img src={formData.Image} className={classes.editImage} />
          )}
        </FormDataConsumer>
        {/* Image input */}
        <ImageInput source="Media" label="Thumbnail" accept="image/*" maxSize={1000000}>
          <ImageField source="src" title="title" />
        </ImageInput>
        {/* @ts-ignore */}
        <ReferenceField reference="artefactmedia" source="media"><div>gay</div> </ReferenceField>
        {/* <ReferenceManyField reference="artefactmedia" target="artefactId" source="id">
          <Datagrid>
            <FormDataConsumer>
              {({ formData, ...rest }) => (
                conditionalMediaRender(formData)
              )}
            </FormDataConsumer>
          </Datagrid>
        </ReferenceManyField>  */}
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
          render={(artefact: any) => <img className={classes.thumbnailImage} src={artefact.Image} />} />
        <TextField source="id" />
        <TextField source="Name" />
        <TextField source="Description" />
        <NumberField source="CoordX" />
        <NumberField source="CoordY" />
        <ReferenceField source="zoneId" reference="zones"><TextField source="id" /></ReferenceField>
        <DateField source="AcquisitionDate" />
        <DateField source="CreatedAt" />
        <DateField source="UpdatedAt" />
      </Datagrid>
    </List>
  )
}
