import React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, EditProps, ImageField, ImageInput, Create, FunctionField } from "react-admin";
import { IMAGES_URL } from "./constants";

const choices = [
  { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
  { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
// Use instead for options 
const FullNameField = ({ record }: any) => <span>{record.first_name} {record.last_name}</span>;
{/* <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/> */ }



export const ZoneMediaEdit = (props: EditProps) => {
  return (

    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="src" />
        <TextInput source="title" />
        {/* <ImageField source="src" title="Image Loaded" /> */}
        <FunctionField label="media" render={(record: any) => <img src={`${IMAGES_URL}/${record.src}`} />} />
        <ImageInput source="Image" label="Related pictures" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <SelectInput source="type" choices={[
          { id: 0, name: 'image' },
          { id: 1, name: 'video' },
        ]} />
        <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="id" /></ReferenceInput>
      </SimpleForm>
    </Edit>
  )
};

export const ZoneMediaCreate = (props: EditProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      {/* <ImageField source="src" title="Image Loaded" /> */}
      {/* <FunctionField label="media" render={(record: any) => <img src={`${IMAGES_URL}/public/sus.png`} />} /> */}
      <ImageInput source="Image" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <SelectInput source="type" choices={[
        { id: 0, name: 'image' },
        { id: 1, name: 'video' },
      ]} />
      <ReferenceInput source="zoneId" reference="zones"><SelectInput optionText="id" /></ReferenceInput>
    </SimpleForm>
  </Create>
);