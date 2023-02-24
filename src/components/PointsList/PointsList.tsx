// npm packages
import { useState, useEffect } from 'react';

// services
import * as pointService from '../../services/pointservice'

// types
import { Point } from '../../types/models';

// components
import PointComponent from '../Point/PointComponent'


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

  if(!points.length) return <p>No points yet</p>

  return (
    <>
      <h1>HERE ARE THE POINTS</h1>
      {points.map((point: Point) =>
        <PointComponent point={point}/>
        // <p key={point.id}>{point.depth[0]}</p>
      )}
    </>
  )
}

export default PointsList