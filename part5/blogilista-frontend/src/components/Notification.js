import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message.toLowerCase().includes('error')){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  if(!message.toLowerCase().includes('error')){
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

}
Notification.propTypes = {
  message: PropTypes.string
}
export default Notification