import React, { useRef, useState } from 'react'
import { Title } from 'react-admin'
import { useDrag, useGesture } from 'react-use-gesture'
import floorPlan from '../floorplan.jpg';

export interface MapProps {

}

export const Map = (props: MapProps) => {
  const [{ xOffset, yOffset }, setOffset] = useState({ xOffset: 0, yOffset: 0 });
  const [zoom, setZoom] = useState(1);
  const mapRef = useRef(null);

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my] }) => {
        setOffset({ xOffset: down ? mx : 0, yOffset: down ? my : 0 });
      },
      onWheel: (state) => {
        // state.movement.y;
        console.log({ ...state });
      }
    }
  )

  const style = {
    transform: `scale(${zoom})`,
    top: `${yOffset}px`,
    left: `${xOffset}px`
  };
  return (
    <div className="map-container">
      <Title title="Map" />
      <div
        className="movable map-main"

      >
        <img
          style={style}
          {...bind()}
          src={floorPlan}
          draggable="false"
          className="map-image" />
      </div>
    </div>
  )
}
