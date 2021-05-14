import React from 'react'
import { Title } from 'react-admin'

export interface MapProps {

}

export const Map = (props: MapProps) => {

  return (
    <div>
      <Title title="Map" />
      <div style={{ backgroundColor: "red", padding: 100, borderRadius: "50%" }} />
    </div>
  )
}
