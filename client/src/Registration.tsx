import React from "react";
import { Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FunctionField, List, ListProps, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField } from "react-admin";

function addDays(date: string, days: number): Date {
  const oldDate = new Date(date)
  return new Date(oldDate.getTime() + (1000 * 60 * 60 * 24) * days)
}

export const RegistrationList = (props: ListProps) => {
  const today = new Date();
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <FunctionField
          label="Name"
          render={(registration: any) => `${registration.student.firstName} ${registration.student.lastName}`} />
        <ReferenceField source="studentId" reference="students"><TextField source="sourceId" /></ReferenceField>
        <ReferenceField source="courseId" reference="courses"><TextField source="name" /></ReferenceField>
        <DateField source="courseStart" />
        <NumberField source="coursePeriod" />
        <FunctionField
          label="Course End"
          render={(r: any) => addDays(r.courseStart, r.coursePeriod).toLocaleDateString()}
        />
        <FunctionField
          label="Days remaining"
          render={(r: any) => Math.floor(-(today.getTime() - addDays(r.courseStart, r.coursePeriod).getTime()) / 86400000)}
        />
        <NumberField source="courseAmount" />
        <TextField source="desired" />
      </Datagrid>
    </List>

  )
}

export const RegistrationEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="courseId" reference="courses">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="studentId" reference="students">
        <SelectInput optionText={(student: any) => `${student.firstName} ${student.lastName}`} />
      </ReferenceInput>
      <DateInput source="courseStart" />
      <NumberInput source="coursePeriod" />
      <NumberInput source="courseAmount" />
    </SimpleForm>
  </Edit>
);

export const RegistraionCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="courseId" reference="courses">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="studentId" reference="students">
        <SelectInput optionText="id" />
      </ReferenceInput>
      <DateInput source="courseStart" />
      <NumberInput source="coursePeriod" />
      <NumberInput source="courseAmount" />
    </SimpleForm>
  </Create>
);