import { useContext } from 'react'

import { authProvider } from './Providers/AuthProvider';
import Routing from './pages/Routing'
import LoadingSpinner from './pages/components/Spinner';
import AuthRoute from './pages/auth/AuthRoute'

function App() {
  const { userDetail, loading } = useContext(authProvider);

  return (
    <>
      {loading ? <LoadingSpinner /> :
        userDetail != null ?
          <Routing /> :
          <AuthRoute />}
    </>
  )
}

export default App
