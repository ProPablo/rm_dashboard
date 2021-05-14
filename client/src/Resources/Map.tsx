import React, { useState } from 'react'
import { Title } from 'react-admin'
import { useDrag } from 'react-use-gesture'


export interface MapProps {

}

export const Map = (props: MapProps) => {
  const [{ x, y }, setState] = useState({ x: 0, y: 0 });

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    setState({ x: down ? mx : 0, y: down ? my : 0 })
    console.log({ x, y });
  })

  return (
    <div className="map-container">
      <Title title="Map" />
      <div {...bind()} className="draggable" style={{transform: `translate(${x}px, ${y}px)`}}/>
    </div>
  )
}
