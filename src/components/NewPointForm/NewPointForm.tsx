// npm modules
import { useState } from "react"

// types
import { PointFormData } from "../../types/forms"

// services
import * as pointService from '../../services/pointservice'

const NewPointForm = ():JSX.Element => {

  const [formData, setFormData] = useState<PointFormData>({
    latitude: 0,
    longitude: 0,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await pointService.createPoint(formData)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h3>New Point</h3>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="latitude">Latitiude</label>
          <input 
          type="number"
          id="latitude"
          value={formData.latitude}
          name="latitude"
          onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="longitude">Longitude</label>
          <input 
          type="number"
          id="longitude"
          value={formData.longitude}
          name="longitude"
          onChange={handleChange}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  )
}

export default NewPointForm