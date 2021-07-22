import { useEffect, useRef, useState } from "react";
import { List, Datagrid, TextField, ListProps, useListContext, Identifier, useNotify, NumberField, Button, TopToolbar, EditActionsProps, ListButton, Title } from "react-admin";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { SERVER_URL } from "../constants";
import { reorder, usePrevious } from "../helper";
import { PriorityTableProps } from "./Zone";
import { useListStyles } from "../AppTheme";

interface ZoneTourTableProps {
  idList: Identifier[],
  setIdList: React.Dispatch<React.SetStateAction<Identifier[]>>
}


export const ZoneTourTable = (props: ZoneTourTableProps) => {
  const listContext = useListContext();
  const { data } = listContext;

  const classes = useListStyles();
  const prev: any = usePrevious(listContext);

  useEffect(() => {
    console.log("reloading ", { listContext, prev })
    const { ids } = listContext;
    if (prev && listContext.ids.every((id, index) => id == prev.ids[index])) {
      console.log("Dey same")
    }
    else {
      props.setIdList(ids);
    }

  }, [listContext]);



  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    props.setIdList(reorder(
      props.idList,
      result.source.index,
      result.destination.index
    ));
    // setState({ ...state, idList });
  }

  if (listContext.ids.length == 0) {
    return <div>No zones found</div>;
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
            <Table stickyHeader/*contentEditable={state.tableEnabled} */
              ref={provided.innerRef} {...provided.droppableProps}>
              <TableHead >
                <TableRow >
                  <TableCell className={classes.tableHeadId}>Id</TableCell>
                  <TableCell className={classes.tableHeadName} padding="checkbox">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.idList.map((id, index) =>
                    // Tbal Row Conditional styles based on isDragging @ react beautiful dnd
                    <Draggable draggableId={id.toString()} index={index} key={id}>
                      {provided => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <TableCell className={classes.tableHeadId}><NumberField record={data[id]} source="id" className={classes.tableId}/></TableCell>
                          <TableCell className={classes.tableHeadName} padding="checkbox"> <TextField record={data[id]} source="name" className={classes.tableName}/> </TableCell>
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
    </div>
  )
}


export const TourList = () => {
  const [loading, setLoading] = useState(false);
  const idListState = useState<Identifier[]>([]);
  const [idList, setIdList] = idListState;
  const notify = useNotify();
  const classes = useListStyles();


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
    fetch(`${SERVER_URL}/zones/reorder`, { method: "POST", body, headers })
      .then(result => {
        if (result.status != 200) result.json().then(json => notify(json.message, 'warning'));
        else notify("Completed reordering");
      })
      .catch((e) => {
        notify('Error: reordering not approved, network connection missing', 'warning')
      })
      .finally(() => {
        setLoading(false);
      });

  }

  const ResourceActions = () => (
    <TopToolbar>
      {/* TODO use existing button from react admmin */}
      <ListButton label="Confirm Sort" onClick={handleSortClick} disabled={loading} />
    </TopToolbar>
  );

  return (
    <div>
      <List title="Tour" resource="zones" basePath="/tour" sort={{ field: "priority", order: "DESC" }} pagination={false} actions={<ResourceActions />} >
        <ZoneTourTable idList={idListState[0]} setIdList={idListState[1]} />
      </List>
    </div>
  )

}