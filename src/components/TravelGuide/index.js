import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlace from '../TravelPlace'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {placesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTravelPlaces()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.packages.map(eachPackage =>
        this.renderFormattedData(eachPackage),
      )
      console.log(updatedList)
      this.setState({
        placesList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="places-list-container">
        {placesList.map(eachPlace => (
          <TravelPlace eachPlace={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlacesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="separator" />
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}
export default TravelGuide
