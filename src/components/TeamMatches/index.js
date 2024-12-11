import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class TeamMatches extends Component {
  state = {isLoading: true, iplDetailsList: {}}

  componentDidMount = () => {
    this.GenerateList()
  }

  GenerateList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const promObj = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonObj = await promObj.json()
    const finalList = {
      teamBannerUrl: jsonObj.team_banner_url,
      latestMatchDetails: this.ChangeListFormat(jsonObj.latest_match_details),
      recentMatches: jsonObj.recent_matches.map(i => this.ChangeListFormat(i)),
      id,
    }
    this.setState({isLoading: false, iplDetailsList: finalList})
  }

  ChangeListFormat = i => {
    const newList = {
      umpires: i.umpires,
      result: i.result,
      manOfTheMatch: i.man_of_the_match,
      id: i.id,
      date: i.date,
      venue: i.venue,
      competingTeam: i.competing_team,
      competingTeamLogo: i.competing_team_logo,
      firstInnings: i.first_innings,
      secondInnings: i.second_innings,
      matchStatus: i.match_status,
    }
    return newList
  }

  render() {
    const {isLoading, iplDetailsList, id} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = iplDetailsList
    const loader = (
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )

    return isLoading ? (
      loader
    ) : (
      <div id={`#${id}`}>
        <img src={teamBannerUrl} alt="team banner" />
        <h1>Latest Matches</h1>
        <LatestMatch details={latestMatchDetails} />
        <ul>
          {recentMatches.map(i => (
            <MatchCard key={i.id} details={i} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
