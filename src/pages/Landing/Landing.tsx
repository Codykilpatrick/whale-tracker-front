// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'
import PointsList from '../../components/PointsList/PointsList';

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <PointsList />
    </main>
  )
}

export default Landing
