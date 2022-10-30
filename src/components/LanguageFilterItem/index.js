import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageFilter, onFilteredData, isSelected} = props
  const {language, id} = eachLanguageFilter
  const onClickFilter = () => {
    onFilteredData(id)
  }
  const selectedClass = isSelected ? 'filter-item' : ''
  return (
    <li className={`${selectedClass}`}>
      <button onClick={onClickFilter} className="btn" type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
