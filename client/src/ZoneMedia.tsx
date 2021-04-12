import React, { FC } from "react";
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, EditProps, ImageField, ImageInput, Create, FunctionField, FormDataConsumer, FileInput, FileField, FileFieldProps, CreateProps } from "react-admin";
import { MEDIA_URL } from "./constants";

const choices = [
  { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
  { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
// Use instead for options 
const FullNameField = ({ record }: any) => <span>{record.first_name} {record.last_name}</span>;
{/* <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/> */ }

const ConditionalMediaRender: FC<any> = (props) => {
  console.log({ props });
  return (
    <div className="gayretard">
      {/* {props ? */}
      <ImageField source="src" title="title" record={props.record} />
      {/* //     :
    //     <p>Ooops youre gay now</p>
      // } */}
    </div>
  )
}
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

    <Edit {...props}>
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

        <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="id" /></ReferenceInput>
      </SimpleForm>
    </Edit>
  )
};

export const ZoneMediaCreate = (props: CreateProps) => (
  <Create {...props}>
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

      <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="id" /></ReferenceInput>
    </SimpleForm>
  </Create>
);