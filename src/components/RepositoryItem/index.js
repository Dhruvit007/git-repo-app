import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachRepo
  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-image"
        />
        <p className="repo-count-paragraph">{starsCount} stars</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-image"
        />
        <p className="repo-count-paragraph">{forksCount} forks</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-image"
        />
        <p className="repo-count-paragraph">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
