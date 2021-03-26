import React from "react";
import { Edit, SimpleForm, TextInput, EditProps, Create, CreateProps, NumberField, NumberInput, ReferenceField, Datagrid, DateField, EmailField, List, TextField, ListProps, ReferenceInput, SelectInput, EditButton, ReferenceManyField, ArrayField, Toolbar, CreateButton, ToolbarProps, Button, Link } from "react-admin";

export const StudentList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <EmailField source="email" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <ReferenceField source="sourceId" reference="sources"><TextField source="name" /></ReferenceField>
    </Datagrid>
  </List>
);
const StudentEditToolbar = (props: ToolbarProps) => (
  // This is standard MUI and react-router interaction
  <Toolbar>
    <Button label="Add new registration"
      component={Link}
      to={{
        pathname: `/registrations/create`,
        state: { record: { studentId: props.record?.id } }
      }}
    // redirect={(redirectTo, basePath, is, data) => `/registrations/create?source={"studentId":"${data.studentId}"}`}
    />
  </Toolbar>
);

export const StudentEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm toolbar={<StudentEditToolbar />}>
      <ReferenceInput source="sourceId" reference="sources">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="firstName" label="Name" />
      <TextInput source="lastName" />
      <TextInput source="email" label="Email" />
      <ArrayField source="registrations">
        <Datagrid >
          <TextField source="courseId" />
          <ReferenceField source="id" reference="registrations"><TextField source="id" /></ReferenceField>
          <ReferenceField source="courseId" reference="courses"><TextField source="name" /></ReferenceField>
        </Datagrid>
      </ArrayField>
    </SimpleForm>
  </Edit>
);

export const StudentCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="sourceId" reference="sources">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <TextInput source="email" label="Email" />

      {/* <ReferenceManyField reference="registrations" target="post_id" addLabel={false}>
        <Datagrid>
          <TextField source="body" />
          <DateField source="created_at" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField> */}
    </SimpleForm>
  </Create>
);