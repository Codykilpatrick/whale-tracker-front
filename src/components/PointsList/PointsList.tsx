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
      <h1>HERE ARE THE POINTS</h1>
      <NewPointForm handleAddPoint={handleAddPoint}/>
      {points.map((point: Point) =>
        <PointComponent key={point.id} point={point} points={points} setPoints={setPoints}/>
      )}
    </>
  )
}

export default PointsList