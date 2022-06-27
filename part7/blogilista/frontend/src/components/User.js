const User = ({ user }) => {
  return (
    <tr>
      <td>
        {user.name} ({user.username})
      </td>
      <td>{user.blogs.length} blogs</td>
    </tr>
  )
}

export default User
