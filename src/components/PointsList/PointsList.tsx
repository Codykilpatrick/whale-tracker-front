// npm packages
import { useState, useEffect } from 'react';

// services
import * as pointService from '../../services/pointservice'

// types
import { Point } from '../../types/models';

// components
import PointComponent from '../Point/PointComponent'
import NewPointForm from '../NewPointForm/NewPointForm';


const PointsList = (): JSX.Element => {
  const [points, setPoints] = useState<Point[]>([])

  useEffect((): void => {
    const fetchPoints = async (): Promise<void> => {
      try {
        const pointsData: Point[] = await pointService.getAllPoints()
        setPoints(pointsData)
      } catch (error) {
        
      }
    }
    fetchPoints()
  }, [])

  if(!points.length) return <NewPointForm />

  return (
    <>
      <h1>HERE ARE THE POINTS</h1>
      <NewPointForm />
      {points.map((point: Point) =>
        <PointComponent key={point.id} point={point}/>
        // <p key={point.id}>{point.depth[0]}</p>
      )}
    </>
  )
}

export default PointsList