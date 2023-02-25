// npm packages
import { useState, useEffect } from 'react';
import Map from "react-map-gl";

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
      mapboxAccessToken='pk.eyJ1IjoiY29keWtpbHBhdHJpY2siLCJhIjoiY2xla2NkZXhmMGdyeDQzbWxkd3Flc2UxbCJ9.YDQHBecK22YVpggfTsAsLA'
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
      <h1>Measurements</h1>
      <NewPointForm handleAddPoint={handleAddPoint}/>
      {points.map((point: Point) =>
        <PointComponent key={point.id} point={point} points={points} setPoints={setPoints}/>
      )}
    </>
  )
}

export default PointsList