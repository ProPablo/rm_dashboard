import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, Error, FormTab, List, ListControllerProps, ListProps, NumberField, ReferenceManyField, SimpleForm, TabbedForm, TextField, TextInput, useListContext, useNotify, useRefresh } from 'react-admin';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import '../App.css';
import { SERVER_URL } from '../constants';
import { ResourceActions } from '../helper';

export const ZoneCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
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
  tableEnabled: boolean
  // loading: boolean,
}
export interface PriorityTableProps /*extends ListControllerProps */ {
  parentId: number | string | undefined,
  parentPath: string | undefined
  // refresh?: () => any,
  // priorityRef: any
}
// const redirect = (basePath: any, id: any, data: any) => `/zones/${data.id}/`;

const DEBOUNCE_TIMER = 2000;

export const ZoneArtefactsTable = (props: PriorityTableProps) => {
  const { ids, data } = useListContext();
  // const { ids, data } = props;
  const refresh = useRefresh();
  const [state, setState] = useState<PriorityTableState>({ idList: ids, tableEnabled: false });
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const enableTable = () => {
    setState({ ...state, tableEnabled: true })
  }

  let oldIds = useRef(new Array<any>());
  let debounceTimer = useRef<any>(null);
  useEffect(() => {
    // debounceTimer.current = setTimeout(enableTable, DEBOUNCE_TIMER);
    return () => {
      // clearTimeout(debounceTimer.current);
    }
  }, [])

  console.log("oldids", oldIds);
  // Use external state or ref from parent to retain 
  useEffect(() => {
    // let diffed = false;
    // for (let i = 0; i < ids.length; i++) {
    //   if (ids[i] == oldIds.current[i]) continue;
    //   diffed = true;
    //   break;
    // }
    // if (!diffed) return;
    // if (loading) return;
    console.log("refreshing idlist", ids, oldIds.current);

    // clearTimeout(debounceTimer.current);
    // debounceTimer.current = setTimeout(enableTable, DEBOUNCE_TIMER);
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
        else notify("Completed reordering");
      })
      .catch((e) => {
        notify('Error: reordering not approved, network connection missing', 'warning')
      })
      .finally(() => {
        setLoading(false);
        // Right now refresh makes it so that some flicking goes on
        // refresh();
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
      {/* <div style={{ fontSize: "20px" }}>{state.tableEnabled ? "Enabled" : "Not Enabled"}</div> */}
      {/* Table */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <Table /*contentEditable={state.tableEnabled} */
              ref={provided.innerRef} {...provided.droppableProps}>
              <TableHead>
                <TableRow>
                  <TableCell >Id</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Media</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  state.idList.map((id, index) =>
                    // Tbal Row Conditional styles based on isDragging @ react beautiful dnd
                    <Draggable draggableId={id.toString()} index={index} key={id}>
                      {provided => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <TableCell><NumberField record={data[id]} source="id" /></TableCell>
                          <TableCell> <TextField record={data[id]} source="name" /> </TableCell>
                          <TableCell>  <TextField record={data[id]} source="description" /> </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  )
                }
                {provided.placeholder}
              </TableBody>
            </Table>

          )}
        </Droppable>
      </DragDropContext >
      <Button label="Confirm Sort" onClick={handleSortClick} disabled={loading} />
    </div>
  )
}

export const ZoneEdit = (props: EditProps) => {
  const refresh = useRefresh();
  return (
    <Edit actions={<ResourceActions />} undoable={false} {...props}>

      <TabbedForm>
        <FormTab label="Zone">
          <TextInput disabled source="id" />
          <TextInput source="name" />
          <TextInput source="description" />
          <DateInput disabled source="createdAt" />
          <DateInput disabled source="updatedAt" />


        </FormTab>
        <FormTab label="Relations">

          <ReferenceManyField label="ARTEFACTS" reference="artefacts" target="zoneId" source="id" sort={{ field: "priority", order: "DESC" }}>
            {/* <Datagrid rowClick="edit">
            <TextField source="Name" />
            <TextField source="Description" />
          </Datagrid> */}
            <ZoneArtefactsTable parentId={props.id} parentPath={props.basePath} />
          </ReferenceManyField>
          <ReferenceManyField label="BEACONS" reference="beacons" target="zoneId">
            <Datagrid rowClick="edit">
              <TextField source="name" />
              <TextField label="MAC Address" source="macAddress" />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>

      </TabbedForm>
    </Edit>
  )
}

export const ZoneList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);