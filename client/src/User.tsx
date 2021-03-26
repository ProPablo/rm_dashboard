import { Edit, SimpleForm, TextInput, EditProps, Create, CreateProps } from "react-admin";

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Edit>
);
export const UserCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);