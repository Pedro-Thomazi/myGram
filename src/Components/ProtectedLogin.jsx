import { Navigate } from "react-router-dom"
import { UserAuth } from '../Context/AuthContext'

const ProtectedPageLogin = ({children}) => {
  const { user } = UserAuth()

  if (user) {
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedPageLogin