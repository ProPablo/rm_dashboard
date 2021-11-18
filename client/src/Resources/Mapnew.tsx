import { makeStyles, Typography, Button, Box, TextField as MuiTextField } from '@material-ui/core';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';
import { useForm } from 'react-final-form';
import React, { useEffect, useRef, useState } from 'react'
import { Title, List, Datagrid, TextField, RowClickFunction, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, ShowButton, EditProps, FormDataConsumer } from 'react-admin'
import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan.jpg';
import clsx from 'clsx';
import { v2 } from "../../../shared/types";

export enum PinType {
  Artfact,
  Zone,
  Beacon
}

export interface MapProps {

}
export interface PickupProps {
  color?: string,
  type?: PinType,
  click: any
}


export interface DragItemProps extends PickupProps {
  position: v2
}

export interface PlacedItemProps {
  pintype: PinType,
  Id: number
}

export interface EditRowProps extends EditProps {
  onClickPlace: () => void
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "75vh",
    // overflow: "hidden"
    display: "flex",

  },
  imageContainer: {
    border: "5px solid red",
    width: "90%",
    height: "100%",
    userSelect: "none"
  },
  mapImage: {
    border: "1px solid blue",
    // width: "90%",
    // height: "813px",
    userSelect: "none",
    objectFit: "contain"
  },
  dragContainer: {
    backgroundColor: "green",
    width: "10%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none",

  },
  pickupItem: {
    backgroundColor: "red",
    height: "2vw",
    width: "2vw",
    margin: "20px 0px",
    userSelect: "none",
  },
  dragItem: {
    position: "absolute",
    backgroundColor: "brown",
    width: "30px",
    height: "30px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none"
  },
  placedItem: {
    position: "absolute"
  },
  selectionArea: {
    flexGrow: 1,
    backgroundColor: "green",
    height: "100%",
  },
  dragNumeric: {
    display: "flex",
    border: "1px solid #CCC",
    alignItems: "center",
    borderRadius: 4,
    fontFamily: "sans-serif",
    width: 250,
    margin: "20px auto"
  },
  dragNumericInput: {
    flexGrow: 1,
    margin: "2px 2px"
  },
  dragNumericIcon: {
    margin: "0px 15px"
  }
}));

const initialMapState: MapState = {
  placementPosition: { x: 0, y: 0 },
  currentSelection: PinType.Artfact,
  mapPinMode: false
}

interface MapState {
  placementPosition: v2,
  mapPinMode: boolean,
  currentSelection: PinType
}

export const Map = (props: MapProps) => {
  const styles = useStyles();
  const el = useRef<HTMLImageElement>(null);
  const [mapState, setMapState] = useState<MapState>(initialMapState);
  const mouse = useMouseMove();

  function onPickupClick(type: PinType) {
    setMapState({ ...mapState, currentSelection: type });
  }

  function onClickPlace() {
    console.log("bruh");
    setMapState({ ...mapState, mapPinMode: true });
  }

  useEffect(() => {
    const testInt = setInterval(() => {
      console.log(el.current?.getBoundingClientRect())
    }, 1000);
    return () => {
      clearInterval(testInt);
    }
  }, []);

  return (
    <div className={styles.container}>
      {mapState.mapPinMode && <div className={styles.dragItem} style={{ top: mouse.y, left: mouse.x }} />}

      <Title title="Map" />
      {/* <div className={styles.dragContainer}>
        <PickupItem color="lightgreen" click={onPickupClick} type={PinType.Artfact} />
      </div> */}

      <img
        ref={el}
        src={floorPlan}
        draggable="false"
        className={styles.mapImage} >
      </img>
      <div className={styles.selectionArea}>
        <List resource="zones" basePath="/tour" sort={{ field: "priority", order: "DESC" }}>
          <Datagrid isRowSelectable={() => false} expand={<EditRow onClickPlace={onClickPlace} />}>
            <TextField source="id" label="ID" />
            <TextField source="name" />
          </Datagrid>
        </List>
      </div>
    </div>

  )
}


export function useMouseMove() {
  const [mouse, setMouse] = useState<v2>({ x: 0, y: 0 });
  function onMouseEvent(e: MouseEvent) {
    setMouse({ x: e.clientX, y: e.clientY });
  }
  useEffect(() => {
    document.addEventListener('mousemove', onMouseEvent);
    return () => {
      document.removeEventListener('mousemove', onMouseEvent);
    }
  })
  return mouse;
}


export const DragNumber = () => {
  const styles = useStyles();

  const form = useForm();
  var formdata = form.getState().values;
  const mouse = useMouseMove();
  const 

  function onStart(e: MouseEvent) {

  }

  function onEnd(e: MouseEvent) {

  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseEvent);
    return () => {
      document.removeEventListener('mouseup', onMouseEvent);
    }
  }, [])

  return (
    <div className={styles.dragNumeric}>
      <CompareArrowsSharpIcon className={styles.dragNumericIcon} />
      <MuiTextField className={styles.dragNumericInput} type="number" id="input-with-sx" label="Draggable" />
    </div>
  )
}


const EditRow = (props: EditRowProps) => (
  <Edit {...props}
    title=" "
  >
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <TextInput source="name" />
      <NumberInput source="coordX" label="Coord X" />
      <NumberInput source="coordY" label="Coord Y" />

      <FormDataConsumer>
        {() => (
          <DragNumber />
        )}
      </FormDataConsumer>

      <Button variant='contained' title="Place" onClick={props.onClickPlace} >Place</Button>
    </SimpleForm>
  </Edit>

)

export const PickupItem = ({ color, type, click }: PickupProps) => {
  const styles = useStyles();
  let typeLetter: string = "";
  switch (type) {
    case PinType.Artfact:
      typeLetter = "A";
      break;
    case PinType.Beacon:
      typeLetter = "B";
      break;
    case PinType.Zone:
      typeLetter = "Z";
      break;
  }

  return (
    <div
      onClick={() => click(type)}
      className={styles.pickupItem}
      style={{ backgroundColor: color }}
    >
      <Typography>{typeLetter}</Typography>
    </div>
  )
}