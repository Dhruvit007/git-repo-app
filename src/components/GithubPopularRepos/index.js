import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INTIAL',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    selectedLanguage: languageFiltersData[0].id,
    repoData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getRepoDatas()
  }

  getRepoDatas = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const {selectedLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repoData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {repoData} = this.state
    return (
      <ul className="success-repo-container">
        {repoData.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-err">Something Went Wrong</h1>
    </>
  )

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onFilteredData = id => {
    this.setState({selectedLanguage: id}, this.getRepoDatas)
  }

  render() {
    const {selectedLanguage} = this.state
    return (
      <div className="container">
        <div className="contain-container">
          <h1 className="main-heading">Popular</h1>
          <ul className="filter-item-container">
            {languageFiltersData.map(eachLanguageFilter => (
              <LanguageFilterItem
                eachLanguageFilter={eachLanguageFilter}
                key={eachLanguageFilter.id}
                onFilteredData={this.onFilteredData}
                isSelected={selectedLanguage === eachLanguageFilter.id}
              />
            ))}
          </ul>
          {this.renderApiView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
