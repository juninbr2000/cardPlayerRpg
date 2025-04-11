import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication.js';
import './App.css';
import './firebase/config.js'

import Home from './Pages/Home/Home'
import Create from './Pages/Create/Create';
import View from './Pages/View/View';
import Player from './Pages/Player/Player';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [user, setUser] = useState()
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser(user)
    })

  }, [auth])

  if(loadingUser){
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/Create' element={user ? <Create/> : <Login />}/>
              <Route path='/View' element={<View/>}/>
              <Route path='/player/:id' element={<Player/>}/>
              <Route path='/login' element={!user ? <Login/> : <View /> }/>
              <Route path='/register' element={!user? <Register/>: <View />}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
