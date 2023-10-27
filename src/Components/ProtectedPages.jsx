import { Navigate } from "react-router-dom"
import { UserAuth } from '../Context/AuthContext'

const ProtectedPages = ({children}) => {
  const { user } = UserAuth()

  if (!user) {
    return <Navigate to='/login' />
  }
  return children
}

export default ProtectedPages