import React from "react";
import { Create, CreateProps, DateInput, Edit, EditProps, FileFieldProps, FileInput, FormDataConsumer, ImageField, ImageInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { MEDIA_URL } from "../constants";
import { ResourceActions } from "../helper";

const choices = [
  { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
  { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
// Use instead for options 
const FullNameField = ({ record }: any) => <span>{record.first_name} {record.last_name}</span>;
{/* <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/> */ }


const VideoField = (filefield: FileFieldProps) => {
  console.log(filefield.record);
  if (filefield.record?.undefined) {
    return (
      <video src={filefield.record?.undefined} controls />
    )
  }
  return (
    <video src={filefield.record?.rawFile.src} controls />
  )
}

const conditionalMediaInput = (formData: any) => {
  // console.log(formData);
  switch (formData.type) {
    case 0:
      return (
        <div>
          <ImageInput /*placeholder={<p>gay retard</p>}*/ source="Media" labelSingle="Drag an Image into here" accept="image/*" multiple={false}  >
            <ImageField source="src" title="title" />
          </ImageInput>
          {formData.src && !!!formData.Media && <img src={`${MEDIA_URL}/${formData.src}`} />}
        </div>
      )
    case 1:
      return (
        <div>
          <FileInput source="Media" labelSingle="Drag a Video into here" accept="video/*" multiple={false}>
            {/* <video src={`${MEDIA_URL}/${formData.src}`} controls /> */}
            {/* <FileField source="src" title="title" /> */}
            <VideoField />
          </FileInput>
          {/* TODO: add conditional rendering cehck if isVideo */}
          {formData.src && !!!formData.Media && <video src={`${MEDIA_URL}/${formData.src}`} controls />}
        </div>
      )
  }
}

export const ZoneMediaEdit = (props: EditProps) => {
  return (
    <Edit actions={<ResourceActions />} {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput disabled source="src" />
        <TextInput source="title" />
        {/* <ImageField source="src" title="Image Loaded" /> */}
        <SelectInput source="type" choices={[
          { id: 0, name: 'image' },
          { id: 1, name: 'video' },
        ]} />

        <FormDataConsumer>
          {({ formData, ...rest }) => (
            conditionalMediaInput(formData)
          )}
        </FormDataConsumer>

        <DateInput disabled source="CreatedAt" />
        <DateInput disabled source="UpdatedAt" />
        <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
          <SelectInput optionText="Name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
};

export const ZoneMediaCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput disabled source="src" />
      <TextInput source="title" />
      {/* <ImageField source="src" title="Image Loaded" /> */}
      <SelectInput source="type" choices={[
        { id: 0, name: 'image' },
        { id: 1, name: 'video' },
      ]} />

      <FormDataConsumer>
        {({ formData, ...rest }) => (
          conditionalMediaInput(formData)
        )}
      </FormDataConsumer>

      <ReferenceInput source="zoneId" reference="zones" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="Name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);