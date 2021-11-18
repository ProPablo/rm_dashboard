import { makeStyles, Typography, Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { Title, List, Datagrid, TextField, RowClickFunction, Edit, SimpleForm, TextInput, NumberInput, TopToolbar, ShowButton, EditProps } from 'react-admin'
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
  onClickPlace: ()=>void
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

  function onPickupClick(type: PinType) {
    setMapState({ ...mapState, currentSelection: type });
  }

  // function onMouseMove(event: React.MouseEvent<Element, MouseEvent>) {
  //   console.log("thign event", event);
  // }

  function onMouseMove(event: MouseEvent) {
    // console.log('docevent', event);
    setMapState((prev) => ({ ...prev, placementPosition: { x: event.clientX, y: event.clientY } }));
  }

  function onClickPlace() {
    console.log("bruh");
    setMapState({...mapState, mapPinMode: true});
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    const testInt = setInterval(() => {
      console.log(el.current?.getBoundingClientRect())
    }, 1000);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      clearInterval(testInt);
    }
  }, []);

  // const onZoneRowClick: any = (zoneId: any) => {
  //   console.log("lol", zoneId);
  //   // return "lmao";
  // }



  return (
    <div className={styles.container}>
      {mapState.mapPinMode && <div className={styles.dragItem} style={{ top: mapState.placementPosition.y, left: mapState.placementPosition.x }} />}

      <Title title="Map" />
      {/* <div className={styles.dragContainer}>
        <PickupItem color="lightgreen" click={onPickupClick} type={PinType.Artfact} />
        <PickupItem color="blue" click={onPickupClick} type={PinType.Beacon} />
        <PickupItem color="yellow" click={onPickupClick} type={PinType.Zone} />
      </div> */}

      <img
        ref={el}
        src={floorPlan}
        draggable="false"
        className={styles.mapImage} >
      </img>
      <div className={styles.selectionArea}>
        <List resource="zones" basePath="/tour" sort={{ field: "priority", order: "DESC" }}>
          <Datagrid isRowSelectable={() => false} expand={<EditRow onClickPlace={onClickPlace}/>}>
            <TextField source="id" label="ID" />
            <TextField source="name" />
          </Datagrid>
        </List>

      </div>

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



export const PlacedItem = () => {

}