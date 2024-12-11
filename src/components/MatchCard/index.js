import './index.css'

const MatchCard = props => {
  const {details} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = details
  let styleStatus = 'lose'
  if (matchStatus === 'Won') {
    styleStatus = 'won'
  }
  return (
    <li>
      <img src={competingTeamLogo} alt={competingTeam} />
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      <p className={styleStatus}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
