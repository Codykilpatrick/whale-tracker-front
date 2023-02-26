// npm packages
import { useState, useEffect } from 'react';
import Map, { Marker } from "react-map-gl";

// services
import * as pointService from '../../services/pointservice'

// types
import { Point } from '../../types/models';

// components
import PointComponent from '../Point/PointComponent'
import NewPointForm from '../NewPointForm/NewPointForm';

const PointsList = (): JSX.Element => {
  const [points, setPoints] = useState<Point[]>([])
  let [viewport, setViewport] = useState({
    latitude: 37.7,
    longitude: -122,
    zoom: 8,
    width: innerWidth,
    height: innerHeight
  })

  useEffect((): void => {
    const fetchPoints = async (): Promise<void> => {
      try {
        const pointsData: Point[] = await pointService.getAllPoints()
        setPoints(pointsData)
      } catch (error) {
        console.log(error);
      }
    }
    fetchPoints()
  }, [])

  const handleAddPoint = async (newPoint: Point):Promise<void> => {
    try {
      setPoints([newPoint, ...points])
    } catch (error) {
      console.log(error);
    }
  }

  if(!points.length) return <NewPointForm handleAddPoint={handleAddPoint}/>

  return (
    <>
      <Map
      mapboxAccessToken='pk.eyJ1IjoiY29keWtpbHBhdHJpY2siLCJhIjoiY2xla2FzOXR3MGF3eTNwbG00OXNxMXFjcCJ9.85jtdIfHPE4UGaz8qvp8OA'
        initialViewState={{
          longitude: points[0].longitude,
          latitude: points[0].latitude,
          zoom: 1
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/codykilpatrick/clekdcsmo001k01ofk2cgb9aj"
      >
        {points.map((point: Point) =>
        <Marker
          key={point.id + point.latitude + point.longitude}
          longitude={point.longitude} 
          latitude={point.latitude} 
          anchor="bottom" 
          onClick={() => console.log("AHH")}
        >
          <img src="https://i.imgur.com/6dddE05.png"/>
        </Marker>
          )}
      </Map>
      <h1>Measurements</h1>
      <NewPointForm handleAddPoint={handleAddPoint}/>
      {points.map((point: Point) =>
        <PointComponent key={point.id} point={point} points={points} setPoints={setPoints}/>
      )}
    </>
  )
}

export default PointsList