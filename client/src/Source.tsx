import React from "react";
import { Edit, SimpleForm, TextInput, EditProps, Create, CreateProps, NumberField, NumberInput, List, Datagrid, TextField } from "react-admin";

export const SourceList = (props: EditProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="id" />
      <NumberField source="clicks" />
    </Datagrid>
  </List>
);

export const SourceEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="clicks" />
    </SimpleForm>
  </Edit>
);
export const SourceCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="clicks" />
    </SimpleForm>
  </Create>
);