import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {isLoading: true, iplCardList: []}

  componentDidMount = () => {
    this.GenerateList()
  }

  GenerateList = async () => {
    const promObj = await fetch('https://apis.ccbp.in/ipl')
    const jsonObj = await promObj.json()
    const finalList = jsonObj.teams.map(i => ({
      id: i.id,
      name: i.name,
      teamImageUrl: i.team_image_url,
    }))
    this.setState({isLoading: false, iplCardList: finalList})
  }

  render() {
    const {isLoading, iplCardList} = this.state
    const loader = (
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )

    return isLoading ? (
      loader
    ) : (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>IPL DashBoard</h1>
        </div>
        <ul>
          {iplCardList.map(i => (
            <TeamCard id={i.id} details={i} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
