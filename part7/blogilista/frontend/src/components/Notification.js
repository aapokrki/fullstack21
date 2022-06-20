import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  console.log(notification.message)

  return <div className={notification.style}>{notification.message}</div>
}

export default Notification
