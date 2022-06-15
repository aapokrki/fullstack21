import { connect } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  console.log(props)
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => props.updateFilter(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter,
}

const ConnectedFilter = connect(() => {return {}},mapDispatchToProps)(Filter)
export default ConnectedFilter