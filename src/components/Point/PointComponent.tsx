// types
import { Point } from '../../types/models';


interface PointsProps {
  point: Point
}

const PointComponent = (props: PointsProps): JSX.Element => {
  const { point } = props

  return (
    <>
    <h2>LAT:{point.latitude} LONG: {point.longitude}</h2>
      <div id="data-container">
        <div>
          <h3>Depth</h3>
        {point.depth.map(depth =>
          <p>
            {depth.toFixed(1)}
          </p>
        )}
        </div>
        <div>
          <h3>Temperature</h3>
          {point.temperature.map(temp =>
            <p>
              {temp.toFixed(1)}
            </p>
          )}
        </div>
        <div>
        <h3>Salinity</h3>
          {point.salinity.map(salinity =>
            <p>
              {salinity.toFixed(1)}
            </p>
          )}
        </div>
        <div>
          <h3>Sound Speed</h3>
        {point.soundspeed.map(ss =>
            <p>
              {ss.toFixed(1)}
            </p>
          )}
        </div>
      </div>

    {/* <div id="table-container">

    <table>
      <thead>
        <tr>
          <th>Depth</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        {point.depth.map(depth =>
          <tr>
            {depth}
          </tr>
        )}
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>SS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        {point.temperature.map(temp =>
          <tr>
            {temp}
          </tr>
        )}
        </tr>
      </tbody>
    </table>
        </div> */}

        </>
  )
}
export default PointComponent