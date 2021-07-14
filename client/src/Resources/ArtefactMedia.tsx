import React, { FC, memo } from "react";
import { Create, CreateProps, DateInput, Edit, EditProps, FileFieldProps, FileInput, FormDataConsumer, ImageField, ImageInput, ReferenceInput, SelectInput, SimpleForm, TextInput, useRecordContext } from "react-admin";
import { useListStyles } from "../AppTheme";
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

const ConditionalMediaInput = (formData: any) => {
  // console.log(formData);
  const classes = useListStyles();
  switch (formData.type) {
    case 0:
      return (
        <div>
          <ImageInput /*placeholder={<p>placeholder</p>}*/ source="InputMedia" labelSingle={formData.src && !!!formData.InputMedia ? "Replace image" : "Drag an image into here"} accept="image/*" multiple={false}  >
            <ImageField source="src" title="title" />
          </ImageInput>
          {formData.src && !!!formData.InputMedia && <img className={classes.mediaImage} src={`${MEDIA_URL}/${formData.src}`} />}
        </div>
      )
    case 1:
      return (
        <div>
          <FileInput source="InputMedia" labelSingle={formData.src && !!!formData.InputMedia ? "Replace video" : "Drag a video into here"} accept="video/*" multiple={false}>
            {/* <video src={`${MEDIA_URL}/${formData.src}`} controls /> */}
            {/* <FileField source="src" title="title" /> */}
            <VideoField />
          </FileInput>
          {formData.src && !!!formData.InputMedia && <video src={`${MEDIA_URL}/${formData.src}`} controls />}
        </div>
      )
  }
}

export const ConditionalMediaRender = (formdata: any) => {
  const classes = useListStyles();
  if (!formdata.Media) return (
    <div></div>
  )

  switch (formdata.Media.type) {
    case 0:
      return (
        <div>
          <img className={classes.editImage} src={`${MEDIA_URL}/${formdata.Media.src}`} />

        </div>
      )
    case 1:
      return (
        <div>
          <video src={`${MEDIA_URL}/${formdata.Media.src}`} controls />

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
    <Edit actions={<ResourceActions />} {...props} undoable={false}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput disabled source="src" />
        <TextInput source="title" />
        {/* <ImageField source="src" title="Image Loaded" /> */}
        <SelectInput source="type" choices={[
          { id: 0, name: 'image' },
          { id: 1, name: 'video' },
        ]} />
        <ReferenceInput source="artefactId" reference="artefacts" >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DateInput disabled source="createdAt" />
        <DateInput disabled source="updatedAt" />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            ConditionalMediaInput(formData)
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
          ConditionalMediaInput(formData)
        )}
      </FormDataConsumer>

      <ReferenceInput source="artefactId" reference="artefacts">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);