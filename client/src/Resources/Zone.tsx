import React, { useEffect, useState } from 'react';
import { Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, FormTab, List, ListProps, NumberField, ReferenceManyField, SimpleForm, TabbedForm, TextField, TextInput, useListContext } from 'react-admin';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import '../App.css';
import { ResourceActions } from '../helper';

export const ZoneCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="Name" />
      <TextInput source="Description" />
    </SimpleForm>
  </Create>
)

const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const ZoneArtefactsTable = () => {
  const { ids, data } = useListContext();
  const [state, setState] = useState({ idList: ids });

  useEffect(() => {
    setState({ idList: ids });
  }, [ids]);

  console.log(data, ids, state);
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const idList = reorder(
      state.idList,
      result.source.index,
      result.destination.index
    );
    console.log("rearranged data", { idList, data })

    setState({ idList });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {
              state.idList.map((id, index) =>
                <Draggable draggableId={id.toString()} index={index} key={id}>
                  {provided => (
                    <div ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <NumberField record={data[id]} source="id" />
                      <TextField record={data[id]} source="Description" />
                      <TextField record={data[id]} source="Name" />
                    </div>
                  )}
                </Draggable>
              )
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext >
  )
}


export const ZoneEdit = (props: EditProps) => (
  <Edit actions={<ResourceActions />} undoable={false} {...props}>

    <TabbedForm>
      <FormTab label="Zone">
        <TextInput disabled source="id" />
        <TextInput source="Name" />
        <TextInput source="Description" />
        <DateInput disabled source="CreatedAt" />
        <DateInput disabled source="UpdatedAt" />


      </FormTab>
      <FormTab label="Relations">
        <ReferenceManyField label="ARTEFACTS" reference="artefacts" target="zoneId" source="id">
          {/* <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Description" />
          </Datagrid> */}
          <ZoneArtefactsTable />
        </ReferenceManyField>
        <ReferenceManyField label="BEACONS" reference="beacons" target="zoneId">
          <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField label="MAC Address" source="MACAddress" />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>

    </TabbedForm>
  </Edit>
)

export const ZoneList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <TextField source="Description" />
      <DateField source="CreatedAt" />
      <DateField source="UpdatedAt" />
    </Datagrid>
  </List>
);