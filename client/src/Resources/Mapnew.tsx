import { makeStyles, Typography, Button, Box, TextField as MuiTextField, Grid } from '@material-ui/core';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';
import { useForm, useField } from 'react-final-form';
import React, { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, useContext, createContext } from 'react'
import {
  Title, List, Datagrid, TextField, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, ShowButton, EditProps, FormDataConsumer,
  useNotify,
  ListBase,
  useListContext,
  FunctionField,
  NumberField
} from 'react-admin'

// import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan2.jpg';
import clsx from 'clsx';
import { v2 } from "../../../shared/types";
import { useMouseMove } from '../components/useMouseMove';
import { DragNumber } from '../components/DragNumber';

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
    height: "680px",
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
    // backgroundColor: "blue",
    width: "30px",
    height: "30px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    // textAlign: "center",
    color: "white",
    verticalAlign: "middle",
    display: "flex",
    // lineHeight: "-50%",
    opacity: "35%"
  },
  placedItem: {
    position: "absolute",
  },
  selectionArea: {
    flexGrow: 1,
    backgroundColor: "green",
    height: "100%",
    overflow: 'scroll'
  },
  goodbye: {
    display: "none"
  }
}));



const initialMapState: MapState = {
  currentSelection: PinType.Artfact,
  mapPinMode: false,
  editId: null,
}

interface MapState {
  mapPinMode: boolean,
  editId: number | null,
  currentSelection: PinType
}


export const Map = (props: MapProps) => {
  const styles = useStyles();
  const el = useRef<HTMLImageElement>(null);
  const [mapState, setMapState] = useState<MapState>(initialMapState);
  const mouse = useMouseMove();
  const [pinPos, setPinPos] = useState<v2>({ x: 0, y: 0 });

  function onEditMode(id: number) {
    setMapState({ ...mapState, editId: id })
  }

  function onClickPlace() {
    console.log("bruh");
    setMapState({ ...mapState, mapPinMode: true });
  }

  useEffect(() => {
    if (mapState.mapPinMode) {
      if (!el.current) return;
      const currentBounds = el.current.getBoundingClientRect();
      const val: v2 = { x: mouse.x - currentBounds.left, y: mouse.y - currentBounds.top };
      setPinPos(val);
    }
  }, [mouse, mapState]);

  useEffect(() => {
    // const testInt = setInterval(() => {
    //   console.log(el.current?.getBoundingClientRect())
    // }, 1000);
    // return () => {
    //   clearInterval(testInt);
    // }
  }, []);

  return (
    <div className={styles.container}>
      {/* x:{pinPos.x}, y:{pinPos.y} */}
      {mapState.mapPinMode && <div className={styles.dragItem} style={{ top: mouse.y, left: mouse.x }} />}

      <Title title="Map" />
      {/* <div className={styles.dragContainer}>
        <PickupItem color="lightgreen" click={onPickupClick} type={PinType.Artfact} />
      </div> */}
      <ListBase resource="zones" basePath="/zones" sort={{ field: "priority", order: "DESC" }}>
        <AllPoints currentID={mapState.editId} imageOff={el.current?.getBoundingClientRect()} />
      </ListBase>
      <img
        ref={el}
        src={floorPlan}
        draggable="false"
        className={styles.mapImage} >
      </img>
      <div className={styles.selectionArea}>
        {
          !!mapState.editId ? <EditRow imageOff={el.current?.getBoundingClientRect()} resource="zones" basePath="/zones" onClickPlace={onClickPlace} id={mapState.editId.toString()} /> : <div>nothing</div>
        }

        {/* https://stackoverflow.com/questions/68170423/is-it-possible-to-allow-only-one-expanded-row-in-a-datagrid */}
        <List resource="zones" basePath="/zones" sort={{ field: "priority", order: "DESC" }} actions={<div />} bulkActionButtons={false}>
          {/* <Datagrid isRowSelectable={() => false} expand={<EditRow onClickPlace={onClickPlace} />} rowClick="expand" > */}
          <Datagrid isRowSelectable={() => false} >
            <FunctionField
              label="Edit"
              render={(zone: any) => <Button onClick={() => onEditMode(zone.id)}> HAHA</Button>} />
            <TextField source="id" label="ID" />
            <TextField source="name" />
          </Datagrid>
        </List>
      </div>
    </div>

  )
}

function randomHash(input: string): number {
  // return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  //   float rand(float n){return fract(sin(n) * 43758.5453123);}
  let x = 0;
  for (var i = 0; i < input.length; i++) {
    x += input.charCodeAt(i);
  }
  x *= 0.01;
  let val = (Math.sin(x) * 43758.5453123) % 1;
  return (val + 1) / 2;
}

export const SinglePoint = ({ data, imageOff }: any) => {
  const styles = useStyles();
  const rand = randomHash(data.name);
  const hsl = {
    h: rand,
    s: 0.4,
    l: 0.6
  }
  const hslString = `hsl(${hsl.h*360}, ${Math.floor(hsl.s * 100)}%, ${Math.floor(hsl.l * 100)}%)`
  console.log({data, rand, hslString});

  return (
    <div className={styles.dragItem} style={{ top: data.coordY + imageOff.top, left: data.coordX + imageOff.left, width: data.width, height: data.height, backgroundColor: hslString }} > {data.id}</div>
  )
}


export const AllPoints = ({ imageOff, currentID }: { imageOff: DOMRect | undefined, currentID: number | null }) => {
  const styles = useStyles();
  const listContext = useListContext();
  const { data, ids } = listContext;

  if (!imageOff) return <div className={styles.goodbye} />;
  return (
    <div>
      {ids.map((id) => {
        if (currentID && currentID === id) return null;
        return (
          <SinglePoint data={data[id]} imageOff={imageOff} />
          // <div className={styles.dragItem} style={{ top: data[id].coordY + imageOff.top, left: data[id].coordX + imageOff.left, width: data[id].width, height: data[id].height }} > {id}</div>
        )
      })}
    </div>
  )
}


export interface EditRowProps extends EditProps {
  onClickPlace: () => void,
  imageOff: DOMRect | undefined
}

const EditRow = (props: EditRowProps) => {
  const notify = useNotify();
  const styles = useStyles();
  const { imageOff } = props;
  return (
    <Edit {...props}
      title=" "
      onSuccess={() => {
        notify('Submit entry succesfull');
      }}
      undoable={false}
    >
      <SimpleForm>
        <TextInput disabled source="id" label="ID" />
        <TextInput source="name" />
        <DragNumber name="coordX" />
        <DragNumber name="coordY" />
        <DragNumber name="width" />
        <DragNumber name="height" />
        {imageOff &&
          <FormDataConsumer>
            {({ formData }) => (
              <SinglePoint data={formData} imageOff={imageOff} />
            )}
          </FormDataConsumer>
        }
        <Button variant='contained' title="Place" onClick={props.onClickPlace} >Place</Button>
      </SimpleForm>
    </Edit>

  )
}

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