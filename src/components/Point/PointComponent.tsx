// mpn packages
import { useState } from 'react';
import Plot from 'react-plotly.js'

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
  const [show, setShow] = useState<boolean>(false)

  const handleDeletePoint = async(id: number): Promise<void> => {
    await pointService.deletePoint(id)
    props.setPoints(props.points.filter((el: Point) => el.id !== point.id))
  }

  const depthArray: number[] = []
  point.depth.forEach(depth => depthArray.push(depth))
  const soundSpeedArray: number[] = []
  point.soundspeed.forEach(soundSpeed => soundSpeedArray.push(soundSpeed))


  const showTableData = () => {
    setShow(!show)
  }

  return (
    <>
      <h2 className={styles.pointHeader}>
        <p>
          Latitude: {point.latitude}
        </p>
        <p>
          Longitude: {point.longitude}
        </p>
        <button
        onClick={() => showTableData()}
        >
          {show ? "Hide" : "Show"}
        </button>
      </h2>
      <div className={show ? styles.dataContainer : styles.dataContainerHidden}>
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
        <Plot className={'plot'}
        data={[
          {
            y: depthArray,
            x: soundSpeedArray,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ { plot_bgcolor:"#446DF6", paper_bgcolor:"#446DF6", width: 320,  margin: {
          l: 50,
          r: 50,
          b: 20,
          t: 40,
          pad: 0
        }, title: {
          text:'SSP',
          font: {
            family: 'Courier New, monospace',
            size: 24,
            color: 'black'
          },
        }, font: {
          color: 'black'
        }, autosize: true, yaxis: {autorange: 'reversed'}} }
      />
        <button
        onClick={() => handleDeletePoint(point.id)}
        >
          Delete
        </button>
      </div>
    </>
  )
}
export default PointComponent