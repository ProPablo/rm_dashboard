import { makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { Title } from 'react-admin'
import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan.jpg';
import clsx from 'clsx';


export interface MapProps {

}

const MAP_ZOOM_SCALE = 0.001;

// Best practice would be to store everything in UV coordinates

const useStyles = makeStyles(theme => ({
  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "green",
    zIndex: 10,
    // opacity: 0,
    border: "5px solid green",
    pointerEvents: 'none',
    // transform: ""
  },
  movableHolder: {
    touchAction: "none",
    position: "relative"
  },
  mapMain: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    width: "70%",
    height: "100%",
    border: "5px solid red",
    overflow: "hidden"
  },
  movable: {
    position: "absolute"
  },
  mapImage: {
    width: "100%",
    height: "auto",
  }

}));

export const Map = (props: MapProps) => {
  const styles = useStyles();
  const [current, setCurrPan] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const mapRef = useRef(null);

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        //setOffset({ xOffset: down ? mx : 0, yOffset: down ? my : 0 })
        if (down) setCurrPan({ x: mx, y: my });
        else {
          setOffset((prev) => ({ x: prev.x + mx, y: prev.y + my }));
          setCurrPan({ x: 0, y: 0 });
          console.log("lifted", mx, my);
        }
        // setOffset({ xOffset: down ? mx : 0, yOffset: down ? my : 0 })
      },

      onWheel: ({ wheeling, movement: [_, y] }) => {
        // Negative y = bigger
        if (wheeling) {
          setZoom(zoom + (-y * MAP_ZOOM_SCALE));
        }
      }
    }
  )
  console.log({zoom})
  const style = {
    transform: `scale(${zoom})`,
    top: `${current.y + offset.y}px`,
    left: `${current.x + offset.x}px`
  };
  const movableStyle = {
    transform: `scale(${zoom}) translate(-50%, -50%)`,
    top: `${(current.y + offset.y)/zoom}px`,
    left: `${(current.x + offset.x)/zoom}px`
  }

  return (
    <div className={styles.mapContainer}>
      <Title title="Map" />
      <div
        className={clsx(styles.mapMain, styles.movableHolder)}
      >
        <div className={clsx(styles.circle, styles.movable)}
          style={movableStyle}
        />
        <img
          style={style}
          {...bind()}
          src={floorPlan}
          draggable="false"
          className={clsx(styles.mapImage, styles.movable)} >
        </img>
      </div>
    </div>
  )
}
