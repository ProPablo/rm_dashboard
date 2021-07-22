import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Create, CreateProps, Datagrid, DateField, DateInput, Edit, EditProps, Error, FormTab, Identifier, List, ListControllerProps, ListProps, NumberField, ReferenceManyField, SimpleForm, TabbedForm, TextField, TextInput, useListContext, useNotify, useRefresh } from 'react-admin';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import '../App.css';
import { useListStyles } from '../AppTheme';
import { SERVER_URL } from '../constants';
import { ResourceActions } from '../helper';
import { useForm } from 'react-final-form';

export const ZoneCreate = (props: CreateProps) => (
  <Create actions={<ResourceActions />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description" />
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

export const ZoneBeaconsTable = () => {
  const { ids } = useListContext();

  if (ids.length == 0) {
    return <div>No beacons found</div>;
  }

  return (
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField label="MAC Address" source="macAddress" />
    </Datagrid>
  )
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const ZoneArtefactsTable = (props: PriorityTableProps) => {
  const classes = useListStyles();
  const refresh = useRefresh();
  const listContext = useListContext();
  const { data } = listContext;

  const [idList, setIdList] = useState<Identifier[]>([]);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const prev: any = usePrevious(listContext);

  // Use external state or ref from parent to retain 
  useEffect(() => {

    console.log("reloading ", { listContext, prev })
    const { ids } = listContext;
    if (prev && listContext.ids.every((id, index) => id == prev.ids[index])) {
      console.log("Dey same")
    }
    else {
      setIdList(ids);
    }

  }, [listContext]);

  const handleSortClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setLoading(true);
    const body = JSON.stringify({ ordering: idList });
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
        refresh();
      });
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setIdList(reorder(
      idList,
      result.source.index,
      result.destination.index
    ));
    // setState({ ...state, idList });
  }
  if (listContext.ids.length == 0) {
    return <div>No artefacts found</div>;
  }


  return (
    <div>
      {/* Error is for frontend based errors for really broken stuff */}
      {/* <Error error="bruh" /> */}
      {/* Table */}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <Table stickyHeader/*contentEditable={state.tableEnabled} */
              ref={provided.innerRef} {...provided.droppableProps}>
              <TableHead >
                <TableRow >
                  <TableCell>Id</TableCell>
                  <TableCell className={classes.tableHeadName} padding="checkbox">Name</TableCell>
                  <TableCell className={classes.tableHeadMedia}>Media</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  idList.map((id, index) =>
                    // Tbal Row Conditional styles based on isDragging @ react beautiful dnd
                    <Draggable draggableId={id.toString()} index={index} key={id}>
                      {provided => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <TableCell><NumberField record={data[id]} source="id" /></TableCell>
                          <TableCell className={classes.tableHeadName} padding="checkbox"> <TextField record={data[id]} source="name" /> </TableCell>
                          <TableCell className={classes.tableHeadMedia}>  <TextField record={data[id]} source="media.src" /> </TableCell>
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
      <Button label="Confirm Sort" onClick={handleSortClick} disabled={loading} className={classes.zoneButton} />
    </div>
  )
}

export const ZoneEdit = (props: EditProps) => {
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
          {/* {formData.src && !!!formData.InputMedia && <img src={`${MEDIA_URL}/${formData.src}`} />} */}
          <ReferenceManyField label="ARTEFACTS" reference="artefacts" target="zoneId" source="id" sort={{ field: "priority", order: "DESC" }}>
            <ZoneArtefactsTable parentId={props.id} parentPath={props.basePath} />
          </ReferenceManyField>

          <ReferenceManyField label="BEACONS" reference="beacons" target="zoneId">
            <ZoneBeaconsTable />
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

export const TourList = (props: ListProps) => (
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