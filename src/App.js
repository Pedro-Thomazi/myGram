import './App.css';

// Components
import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import ProtectedPages from './Components/ProtectedPages';
import ProtectedPageLogin from './Components/ProtectedLogin';

// React Router
import { Routes, Route } from 'react-router-dom'
import UpdateUser from './Pages/UpdateUser/UpdateUser';

// Context
import { AuthContextProvider } from './Context/AuthContext';
import Publish from './Pages/Publish/Publish';
import PageUser from './Pages/PageUser/PageUser';
import AddDetailsUser from './Pages/AddDetailsUser/AddDetailsUser';


function App() {



  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<ProtectedPages><Home /></ProtectedPages>} />
          <Route path='/dashboard' element={<ProtectedPages><Dashboard /></ProtectedPages>} />
          <Route path='/details' element={<ProtectedPages><AddDetailsUser /></ProtectedPages>} />
          <Route path='/publish' element={<ProtectedPages><Publish /></ProtectedPages>} />
          <Route path='/login' element={<ProtectedPageLogin><Login /></ProtectedPageLogin>} />
          <Route path='/register' element={<Register />} />
          <Route path='/update-user' element={<UpdateUser />} />
          <Route path='/user/:id' element={<PageUser />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
