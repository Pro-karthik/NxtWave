import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details

  return (
    <li>
      <Link to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} />
        <h1>{name}</h1>
      </Link>
    </li>
  )
}

export default TeamCard
