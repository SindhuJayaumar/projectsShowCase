import './index.css'

const HomeDetails = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <div>
      <ul className="ul-list">
        <li className="list-items">
          <img src={imageUrl} alt={name} className="image" />
          <p className="content">{name}</p>
        </li>
      </ul>
    </div>
  )
}

export default HomeDetails
