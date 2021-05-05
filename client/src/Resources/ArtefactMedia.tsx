import React, { FC, memo } from "react";
import { Create, CreateProps, DateInput, Edit, EditProps, FileFieldProps, FileInput, FormDataConsumer, ImageField, ImageInput, ReferenceInput, SelectInput, SimpleForm, TextInput, useRecordContext } from "react-admin";
import { MEDIA_URL } from "../constants";
import { ResourceActions } from "../helper";

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
          <ImageInput /*placeholder={<p>placeholder</p>}*/ source="Media" labelSingle="Drag an Image into here" accept="image/*" multiple={false}  >
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
          {formData.src && !!!formData.Media && <video src={`${MEDIA_URL}/${formData.src}`} controls />}
        </div>
      )
  }
}


export const ConditionalMediaRender = (props: any) => {
  console.log(props);
  // return (<>gay</>)
  switch (props.record.type) {
    case 0:
      return (
        <div>
          <img src={`${MEDIA_URL}/${props.record.src}`} />

        </div>
      )
    case 1:
      return (
        <div>
          <video src={`${MEDIA_URL}/${props.record.src}`} controls />

        </div>
      )
    default: 
        return (
          <div>Unknown Type</div>
        )
  }
}

export const ArtefactMediaEdit = (props: EditProps) => {
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
        <ReferenceInput source="artefactId" reference="artefacts" allowEmpty emptyValue={undefined} >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DateInput disabled source="createdAt" />
        <DateInput disabled source="updatedAt" />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            conditionalMediaInput(formData)
          )}
        </FormDataConsumer>

      </SimpleForm>
    </Edit>
  )
};

export const ArtefactMediaCreate = (props: CreateProps) => (
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

      <ReferenceInput source="artefactId" reference="artefacts" allowEmpty emptyValue={undefined} >
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);