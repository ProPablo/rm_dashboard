import React, { useEffect, useRef, useState } from 'react';
import { Button, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, Error, FormTab, List, ListControllerProps, ListProps, NumberField, ReferenceManyField, SimpleForm, TabbedForm, TextField, TextInput, useListContext, useNotify, useRefresh } from 'react-admin';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import '../App.css';
import { SERVER_URL } from '../constants';
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

export interface PriorityTableState {
  idList: Array<any>,
  // loading: boolean,
}
export interface PriorityTableProps /*extends ListControllerProps */ {
  parentId: number | string | undefined,
  parentPath: string | undefined
}
// const redirect = (basePath: any, id: any, data: any) => `/zones/${data.id}/`;

export const ZoneArtefactsTable = (props: PriorityTableProps) => {
  const { ids, data } = useListContext();
  // const { ids, data } = props;
  const refresh = useRefresh();
  const [state, setState] = useState<PriorityTableState>({ idList: ids });
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  let oldIds = useRef(new Array<any>());
  // useEffect(() => {
  //   oldIds.current = [];
  // }, []);

  console.log("oldids", oldIds.current);
  useEffect(() => {
    let diffed = false;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] == oldIds.current[i]) continue;
      diffed = true;
      break;
    }
    if (!diffed) return;
    // if (oldIds.current == ids) return;
    console.log("refreshing idlist", ids, oldIds.current);
    oldIds.current = ids;
    setState({ ...state, idList: ids });
  }, [ids]);

  function handleSortClick() {
    setLoading(true);
    const body = JSON.stringify({ ordering: state.idList });
    const headers = new Headers({ 'content-type': 'application/json' });
    const authString = localStorage.getItem('auth');
    if (!authString) {
      notify("No auth token found", 'error');
      return;
    }

    const { token } = JSON.parse(authString);
    headers.set('Authorization', `Bearer ${token}`);
    fetch(`${SERVER_URL}${props.parentPath}/${props.parentId}/reorder`, { method: "POST", body, headers })
      .then(result => {
        if (result.status != 200) result.json().then(json => notify(json.message, 'warning'));
        // else notify("Completed reordering");
      })
      .catch((e) => {
        notify('Error: comment not approved', 'warning')
      })
      .finally(() => {
        setLoading(false);
        refresh();
      });
  }

  // console.log(data, ids, state);
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
    setState({ ...state, idList });
  }

  return (
    <div>
      {/* Error is for frontend based errors for really broken stuff */}
      {/* <Error error="bruh" /> */}
      <Button label="Confirm Sort" onClick={handleSortClick} disabled={loading} />
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
    </div>
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

        <ReferenceManyField label="ARTEFACTS" reference="artefacts" target="zoneId" source="id" sort={{ field: "Priority", order: "DESC" }}>
          {/* <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Description" />
          </Datagrid> */}
          <ZoneArtefactsTable parentId={props.id} parentPath={props.basePath} />
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