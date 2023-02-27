// npm packages
import { useState, useEffect, useRef, MutableRefObject } from 'react';
import Map, { Marker } from "react-map-gl";

// services
import * as pointService from '../../services/pointservice'

// types
import { Point } from '../../types/models';

// components
import PointComponent from '../Point/PointComponent'
import NewPointForm from '../NewPointForm/NewPointForm'


const PointsList = (): JSX.Element => {
  const [points, setPoints] = useState<Point[]>([])

  const pointRefs = useRef({}) as MutableRefObject<any>

  const scrollPointIntoView = (pointId: number): void => {
    pointRefs.current[pointId].scrollIntoView({ behavior: "smooth" })
  }
  
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
      <h1>Measurements</h1>
      <Map
        mapboxAccessToken='pk.eyJ1IjoiY29keWtpbHBhdHJpY2siLCJhIjoiY2xla2NkZXhmMGdyeDQzbWxkd3Flc2UxbCJ9.YDQHBecK22YVpggfTsAsLA'
        initialViewState={{
          longitude: points[0].longitude,
          latitude: points[0].latitude,
          zoom: 1
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/codykilpatrick/clekdcsmo001k01ofk2cgb9aj"
      >
        {/* {points.map((point: Point) =>
        <Marker
          key={point.id + point.latitude + point.longitude}
          longitude={point.longitude} 
          latitude={point.latitude} 
          anchor="bottom" 
          onClick={() => scrollPointIntoView(point.id)}
        >
          <img src="https://i.imgur.com/6dddE05.png"/>
        </Marker>
          )} */}
      </Map>
      <NewPointForm handleAddPoint={handleAddPoint}/>
      {points.map((point: Point) =>
        <PointComponent key={point.id} point={point} points={points} setPoints={setPoints} pointRefs={pointRefs}/>
      )}
    </>
  )
}

export default PointsList