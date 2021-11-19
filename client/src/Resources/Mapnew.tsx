import { makeStyles, Typography, Button, Box, TextField as MuiTextField, Grid } from '@material-ui/core';
import CompareArrowsSharpIcon from '@material-ui/icons/CompareArrows';
import { useForm, useField } from 'react-final-form';
import React, { useEffect, useRef, useState, MouseEvent as ReactMouseEvent, useContext, createContext } from 'react'
import {
  Title, List, Datagrid, TextField, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, ShowButton, EditProps, FormDataConsumer,
  useNotify,
  ListBase,
  useListContext,
  FunctionField
} from 'react-admin'

// import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan.jpg';
import clsx from 'clsx';
import { v2 } from "../../../shared/types";
import { useMouseMove } from '../components/useMouseMove';

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
    backgroundColor: "blue",
    width: "30px",
    height: "30px",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 1000
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
    margin: "0px 15px",
    cursor: "ew-resize"
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
        <List resource="zones" basePath="/zones" sort={{ field: "priority", order: "DESC" }} actions={<div />}>
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

export const AllPoints = ({ imageOff, currentID }: { imageOff: DOMRect | undefined, currentID: number | null }) => {
  const styles = useStyles();
  const listContext = useListContext();
  const { data, ids } = listContext;
  if (!imageOff) return <div className={styles.goodbye} />;
  return (
    <div>
      {ids.map((id) => {
        if ( currentID && currentID === id) return null;
        return (
          <div className={styles.dragItem} style={{ top: data[id].coordY + imageOff.top, left: data[id].coordX + imageOff.left }} > {id}</div>
        )
      })}
    </div>
  )
}




export interface DragNumberProps {
  name: string
}

export const DragNumber = ({ name }: DragNumberProps) => {
  const styles = useStyles();
  const form = useForm();
  var formdata = form.getState().values;
  const mouse = useMouseMove();
  const [startPoint, setStartPoint] = useState<null | number>(null);
  const [startValue, setStartValue] = useState<number>(formdata[name]);

  function onStart(e: React.MouseEvent) {
    setStartPoint(mouse.x);
    setStartValue(formdata[name]);
    document.body.style.cursor = "ew-resize"
  }

  useEffect(() => {
    if (startPoint === null) return;
    // console.log("mouseHold")
    const newVal = (mouse.x - startPoint) + startValue;
    form.change(name, newVal);
  }, [startPoint, startValue, mouse])

  function onEnd(e: MouseEvent) {
    setStartPoint(null);
    setStartPoint(null);
    document.body.style.cursor = "auto"
  }

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    form.change(name, e.target.value);
  }

  useEffect(() => {
    document.addEventListener('mouseup', onEnd);
    return () => {
      document.removeEventListener('mouseup', onEnd);
    }
  }, [])

  return (
    <div className={styles.dragNumeric}>
      <TextInput source={name} disabled className={styles.goodbye} />
      <CompareArrowsSharpIcon className={styles.dragNumericIcon} onMouseDown={onStart} />
      <MuiTextField className={styles.dragNumericInput} type="number" id={`dragnum-${name}`} label={name} value={formdata[name]} onChange={onTextChange} />
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
        {imageOff &&
          <FormDataConsumer>
            {({ formData }) => (
              <div className={styles.dragItem} style={{ top: formData.coordY + imageOff.top, left: formData.coordX + imageOff.left }} > {formData.id}</div>
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