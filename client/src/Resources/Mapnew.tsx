import { makeStyles, Typography, Button, Box, TextField as MuiTextField, Grid } from '@material-ui/core';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';
import { useForm, useField } from 'react-final-form';
import React, { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, useContext, createContext, useMemo } from 'react'
import {
  Title, List, Datagrid, TextField, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, ShowButton, EditProps, FormDataConsumer,
  useNotify,
  ListBase,
  useListContext,
  FunctionField,
  NumberField,
  Create,
  CreateProps
} from 'react-admin'

// import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan2.jpg';
import clsx from 'clsx';
import { v2, ZoneConsumable } from "../../../shared/types";
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
    // width: "90%",
    // height: "680px",
    userSelect: "none",
    objectFit: "contain"
  },
  dragContainer: {
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
    color: "black",
    verticalAlign: "middle",
    display: "flex",
    // lineHeight: "-50%",
    // opacity: "35%"
  },
  placedItem: {
    position: "absolute",
  },
  selectionArea: {
    flexGrow: 1,
    backgroundColor: "white",
    height: "100%",
    overflow: 'scroll'
  },
  goodbye: {
    display: "none"
  }
}));


export enum ListMode {
  EditMode,
  CreateMode,
  None
}

const initialMapState: MapState = {
  currentSelection: PinType.Artfact,
  mapPinMode: false,
  editId: null,
  currentMode: ListMode.None
}


interface MapState {
  mapPinMode: boolean,
  editId: number | null,
  currentMode: ListMode,
  currentSelection: PinType
}

const ImageContext = createContext<null | HTMLImageElement>(null);



export const Map = (props: MapProps) => {
  const styles = useStyles();
  const imageRef = useRef<HTMLImageElement>(null);
  const [mapState, setMapState] = useState<MapState>(initialMapState);
  const mouse = useMouseMove();
  const [pinPos, setPinPos] = useState<v2>({ x: 0, y: 0 });

  function onEditMode(id: number) {
    setMapState({ ...mapState, editId: id, currentMode: ListMode.EditMode })
  }

  function onCreateMode() {
    setMapState({ ...mapState, currentMode: ListMode.CreateMode })
  }

  // function onClickPlace() {
  //   console.log("bruh");
  //   setMapState({ ...mapState, mapPinMode: true });
  // }

  useEffect(() => {
    if (mapState.mapPinMode) {
      if (!imageRef.current) return;
      const currentBounds = imageRef.current.getBoundingClientRect();
      const pinWithOffset: v2 = { x: mouse.x - currentBounds.left, y: mouse.y - currentBounds.top };
      setPinPos(pinWithOffset);
    }
  }, [mouse, mapState]);

  // useEffect(() => {
  //   const testInt = setInterval(() => {
  //     console.log(imageRef.current?.getBoundingClientRect())
  //   }, 1000);
  //   return () => {
  //     clearInterval(testInt);
  //   }
  // }, []);

  return (
    <ImageContext.Provider value={imageRef.current}>

      <div className={styles.container}>
        {/* x:{pinPos.x}, y:{pinPos.y} */}
        {mapState.mapPinMode && <div className={styles.dragItem} style={{ top: mouse.y, left: mouse.x }} />}

        <Title title="Map" />
        {/* <div className={styles.dragContainer}>
        <PickupItem color="lightgreen" click={onPickupClick} type={PinType.Artfact} />
      </div> */}
        <ListBase resource="zones" basePath="/zones" sort={{ field: "priority", order: "DESC" }}>
          <AllPoints currentID={mapState.editId} />
        </ListBase>
        <img
          ref={imageRef}
          src={floorPlan}
          draggable="false"
          className={styles.mapImage} >
        </img>
        <div className={styles.selectionArea}>
          {mapState.currentMode == ListMode.EditMode &&
            <EditRow resource="zones" basePath="/zones" id={mapState.editId?.toString()} />
            // imageOff={imageRef.current?.getBoundingClientRect()}
          }
          {
            mapState.currentMode == ListMode.CreateMode &&
            <CreateRow resource="zones" basePath="/zones" onEditMode={onEditMode} />
          }

          {/* https://stackoverflow.com/questions/68170423/is-it-possible-to-allow-only-one-expanded-row-in-a-datagrid */}
          <List
            pagination={false}
            resource="zones"
            basePath="/zones"
            sort={{ field: "priority", order: "DESC" }}
            actions={<Button onClick={onCreateMode}>Create</Button>}

            bulkActionButtons={false}>
            {/* <Datagrid isRowSelectable={() => false} expand={<EditRow onClickPlace={onClickPlace} />} rowClick="expand" > */}
            <Datagrid isRowSelectable={() => false} >
              <FunctionField
                label="Edit"
                render={(zone: any) => <Button onClick={() => onEditMode(zone.id)}>EDIT</Button>} />
              <TextField source="id" label="ID" />
              <TextField source="name" />
            </Datagrid>
          </List>
        </div>
      </div>
    </ImageContext.Provider>
  )
}

function randomHash(input: string): number {
  if (!input) return 0;
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

export const SinglePoint = ({ data }: any) => {
  const imageEl = useContext(ImageContext);
  const styles = useStyles();
  const rand = randomHash(data.name);
  const hsla = {
    h: rand,
    s: 0.4,
    l: 0.8,
    a: 0.7,
  }
  const hslString = `hsl(${hsla.h * 360}, ${Math.floor(hsla.s * 100)}%, ${Math.floor(hsla.l * 100)}%, ${hsla.a})`


  //@ts-ignore
  const styleObj = useMemo(() => {
    if (!imageEl) return {}
    const imageOff = imageEl.getBoundingClientRect();
    const xScale = imageOff.width / imageEl.naturalWidth;
    const yScale = imageOff.height / imageEl.naturalHeight;

    return {
      // creating closure so that math operations are done at once
      // left: clamp(data.coordX * xScale + imageOff.left, imageOff.left, imageEl?.naturalWidth + imageOff.left),
      left: data.coordX * xScale + imageOff.left,
      top: data.coordY * yScale + imageOff.top,
      width: data.width * xScale,
      height: data.height * yScale,
      backgroundColor: hslString
    }
  }
  )

  if (!imageEl) return (<div className={styles.goodbye} />);
  return (
    <div className={styles.dragItem} style={styleObj} > {data.name}</div>
  )
}


export const AllPoints = ({ currentID }: { currentID: number | null }) => {
  const styles = useStyles();
  const listContext = useListContext();
  const { data, ids } = listContext;

  // if (!imageOff) return <div className={styles.goodbye} />;
  return (
    <div>
      {ids.map((id) => {
        if (currentID && currentID === id) return null;
        return (
          <SinglePoint data={data[id]} />
          // <div className={styles.dragItem} style={{ top: data[id].coordY + imageOff.top, left: data[id].coordX + imageOff.left, width: data[id].width, height: data[id].height }} > {id}</div>
        )
      })}
    </div>
  )
}


export interface EditRowProps extends EditProps {
  // onClickPlace: () => void,
  // imageOff: DOMRect | undefined
}

const EditRow = (props: EditRowProps) => {
  const imageEl = useContext(ImageContext);

  const notify = useNotify();
  const styles = useStyles();
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
        <TextInput multiline source="description" />
        <DragNumber min={0} max={imageEl?.naturalWidth} name="coordX" />
        <DragNumber min={0} max={imageEl?.naturalHeight} name="coordY" />
        <DragNumber name="width" />
        <DragNumber name="height" />
        <FormDataConsumer>
          {({ formData }) => (
            <SinglePoint data={formData} />
          )}
        </FormDataConsumer>
        {/* <Button variant='contained' title="Place" onClick={props.onClickPlace} >Place</Button> */}
      </SimpleForm>
    </Edit>
  )
}

interface ZoneCreateResponse {
  data: ZoneConsumable,
}

interface CreateRowProps extends CreateProps {
  onEditMode: (id: number) => void
}

const CreateRow = (props: CreateRowProps) => {
  return (
    <Create {...props}
      title=""
      onSuccess={(response: ZoneCreateResponse) => {
        props.onEditMode(response.data.id);
      }}
    >
      <SimpleForm>
        <TextInput source="name" />
        <TextInput multiline source="description" />
      </SimpleForm>
    </Create>
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