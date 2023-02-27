// npm modules
import { useState } from "react"

// types
import { PointFormData } from "../../types/forms"

// services
import * as pointService from '../../services/pointservice'

// styles
import styles from './NewPointForm.module.css'

interface NewPointFormProps {
  handleAddPoint: any;
}

const NewPointForm = (props: NewPointFormProps):JSX.Element => {

  const [formData, setFormData] = useState<PointFormData>({
    latitude: 0,
    longitude: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)


  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      console.log(formData);
      
      setLoading(true)
      const newPoint = await pointService.createPoint(formData)
      props.handleAddPoint(newPoint)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>New Point</h2>
      <div className={styles.newPointContainer}>
        <h4 className={loading ? styles.loadingMessage : styles.loadingMessageHidden}>Dipping our toes in now! Please wait!<br></br><img src="https://i.imgur.com/TkUkZ9T.png" alt="Cute loading whale"/> </h4>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="latitude">Latitiude:</label>
            <input 
            type="number"
            id="latitude"
            value={formData.latitude}
            name="latitude"
            onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="longitude">Longitude:</label>
            <input 
            type="number"
            id="longitude"
            value={formData.longitude}
            name="longitude"
            onChange={handleChange}
            />
          </div>
          <div>
            <button
            disabled={loading}
            >Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewPointForm