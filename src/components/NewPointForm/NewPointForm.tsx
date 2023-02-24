// npm modules
import { useState } from "react"

// types
import { PointFormData } from "../../types/forms"

const NewPointForm = ():JSX.Element => {

  const [formData, setFormData] = useState<PointFormData>({
    latitude: 0,
    longitude: 0,
  })

  return (
    <>
      <h3>New Point</h3>
      <form
        autoComplete="off"
      >
        <div>
          <label htmlFor="latitude">Latitiude</label>
          <input 
          type="number"
          id="latitude"
          value={formData.latitude}
          name="latitude"
          />
        </div>
        <div>
        <label htmlFor="longitude">Longitude</label>
          <input 
          type="number"
          id="longitude"
          value={formData.longitude}
          name="longitude"
          />
        </div>
      </form>
    </>
  )
}

export default NewPointForm