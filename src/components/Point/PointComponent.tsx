// types
import { Point } from '../../types/models';

// services
import * as pointService from '../../services/pointservice'

interface PointsProps {
  point: Point;
  points: any;
  setPoints: any;
}

const PointComponent = (props: PointsProps): JSX.Element => {
  const { point } = props

  const handleDeletePoint = async(id: number): Promise<void> => {
    await pointService.deletePoint(id)
    props.setPoints(props.points.filter(el => el.id !== point.id))
  }

  return (
    <>
    <h2>
      LAT:{point.latitude}
      LONG: {point.longitude}
      <button
      onClick={() => handleDeletePoint(point.id)}
      >
        DELETE
      </button>
    </h2>
      <div id="data-container">
        <div>
          <h3>Depth</h3>
        {point.depth.map(depth =>
          <p>
            {depth?.toFixed(1)}
          </p>
        )}
        </div>
        <div>
          <h3>Temperature</h3>
          {point.temperature.map(temp =>
            <p>
              {temp?.toFixed(1)}
            </p>
          )}
        </div>
        <div>
        <h3>Salinity</h3>
          {point.salinity.map(salinity =>
            <p>
              {salinity?.toFixed(1)}
            </p>
          )}
        </div>
        <div>
          <h3>Sound Speed</h3>
        {point.soundspeed.map(ss =>
            <p>
              {ss?.toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
export default PointComponent