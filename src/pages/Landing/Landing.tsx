// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

// components
import PointsList from '../../components/PointsList/PointsList';

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  if (user) {
    return (
      <main className={styles.container}>
        <PointsList />
      </main>
    )
  }
  return (
    <main className={styles.notLoggedIn}>
      <h1>Welcome to whale tracker!</h1>
      <div>
        <img src="https://i.imgur.com/TaCX6n3.png" alt="Whale" />
        <article>
          <p>
            Whale Tracker is the perfect tool for anyone who needs to access ocean data quickly and easily. By connecting to an ocean data API, the app retrieves real-time information on ocean temperature, salinity, and depth for any location in the world.
          </p>
          <p>
            One of the app's most exciting features is its ability to generate sound speed profiles, which are graphs that display sound speed for a given depth! With Whale Tracker, users can quickly and easily generate these graphs to help them understand how sound behaves in different parts of the ocean.
          </p>
          <p>
            In addition to providing data on ocean conditions, Whale Tracker also allows users to create and save points on a map. This feature makes it easy for users to keep track of locations they are interested in or have visited in the past.
          </p>
          <p>
            Whale Tracker is perfect for anyone who needs to access ocean data. Whether they're a professional oceanographer or just a curious beachgoer. With its easy-to-use interface and powerful data capabilities, it's the perfect tool for anyone who wants to explore the mysteries of the ocean.
          </p>
        </article>
      </div>
    </main>
  )
}

export default Landing
