import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import { useAuth } from './context/AuthContext'
import Dashboard from './Pages/Dashboard/Dashboard'
import CreateCampain from './Pages/Create/CreateCampain'
import Campaign from './Pages/Camapaign/Campaign'

function App() {

  const { user } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={!user ? <Login />: <Dashboard />} />
          <Route path='/register' element={!user ? <Register />: <Dashboard />} />
          <Route path='/dashboard' element={user ? <Dashboard />: <Login />} />
          <Route path='/create/campaign' element={user ? <CreateCampain />: <Login />} />
          <Route path='/campaign/:id' element={user ? <Campaign />: <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
