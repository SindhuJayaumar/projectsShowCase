import {Component} from 'react'
import Loader from 'react-loader-spinner'
import HomeDetails from '../HomeDetails'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const ApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    projects: [],
    apiConstants: ApiStatus.initial,
    activeTag: 'ALL',
  }

  componentDidMount() {
    this.getProjects()
  }

  onChangeProject = event => {
    this.setState({activeTag: event.target.value}, this.getProjects)
  }

  getProjects = async () => {
    this.setState({apiConstants: ApiStatus.inProgress})
    const {activeTag} = this.state

    const apiProjectsUrl = `https://apis.ccbp.in/ps/projects?category=${activeTag}`
    const response = await fetch(apiProjectsUrl)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      this.setState({
        projects: fetchedData,
        apiConstants: ApiStatus.success,
      })
      console.log(fetchedData)
    } else {
      this.setState({
        apiConstants: ApiStatus.failure,
      })
    }
  }

  onCLickRetryButton = () => {
    this.getProjects()
  }

  renderProjectsDetails = () => {
    const {projects} = this.state

    return (
      <div>
        <ul className="ul-list">
          {projects.map(eachList => (
            <HomeDetails projectDetails={eachList} key={eachList.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureDetails = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt=" failure view"
        className="failure-image"
      />
      <h1 className="heading">OOPS! Something Went Wrong</h1>
      <p className="contents">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-btn"
        onClick={this.onCLickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingDetails = () => (
    <div data-testid="loader" className="Loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProjectsApiStatus = () => {
    const {apiConstants} = this.state
    switch (apiConstants) {
      case ApiStatus.success:
        return this.renderProjectsDetails()
      case ApiStatus.inProgress:
        return this.renderLoadingDetails()
      case ApiStatus.failure:
        return this.renderFailureDetails()
      default:
        return 'null'
    }
  }

  render() {
    const {activeTag} = this.state

    return (
      <div className="bg-container">
        <div className="nav-card">
          <nav className="nav-bar">
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
              alt="website logo"
              className="logo-image"
            />
          </nav>
        </div>

        <div className="selection-card">
          <select
            className="select"
            value={activeTag}
            onChange={this.onChangeProject}
          >
            {categoriesList.map(eachList => (
              <option value={eachList.id} key={eachList.id}>
                {eachList.displayText}
              </option>
            ))}
          </select>
        </div>

        <div>{this.renderProjectsApiStatus()}</div>
      </div>
    )
  }
}

export default Home
