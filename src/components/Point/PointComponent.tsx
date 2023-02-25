// mpn packages
import { useState } from 'react';

// types
import { Point } from '../../types/models';

// services
import * as pointService from '../../services/pointservice'

// styles
import styles from './PointComponent.module.css'


interface PointsProps {
  point: Point;
  points: any;
  setPoints: any;
}

const PointComponent = (props: PointsProps): JSX.Element => {
  const { point } = props
  // let showTable = true
  const [show, setShow] = useState<boolean>(false)

  const handleDeletePoint = async(id: number): Promise<void> => {
    await pointService.deletePoint(id)
    props.setPoints(props.points.filter((el: Point) => el.id !== point.id))
  }

  const showTableData = () => {
    setShow(!show)
  }

  return (
    <>
      <h2>
        LAT:{point.latitude}
        LONG: {point.longitude}
        <button
        onClick={() => handleDeletePoint(point.id)}
        >
          Delete
        </button>
        <button
        onClick={() => showTableData()}
        >
          {show ? "Show" : "Hide"}
        </button>
      </h2>
      <div className={show ? styles.dataContainer : styles.dataContainerHidden}>
      {/* { showTable ? <div className={styles.dataContainer}> : <div className={styles.dataContainerHidden}> } */}
        <div>
          <h3>Depth</h3>
          {point.depth.map((depth, idx) =>
            <p key={idx}>
              {depth?.toFixed(1)}
            </p>
          )}
        </div>
        <div>
          <h3>Temperature</h3>
            {point.temperature.map((temp, idx) =>
              <p key={idx}>
                {temp?.toFixed(1)}
              </p>
            )}
        </div>
        <div>
          <h3>Salinity</h3>
            {point.salinity.map((salinity, idx) =>
              <p key={idx}>
                {salinity?.toFixed(1)}
              </p>
            )}
        </div>
        <div>
          <h3>Sound Speed</h3>
          {point.soundspeed.map((ss, idx) =>
            <p key={idx}>
              {ss?.toFixed(1)}
            </p>
            )}
        </div>
      </div>
    </>
  )
}
export default PointComponent