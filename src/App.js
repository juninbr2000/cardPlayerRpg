import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';

import Home from './Pages/Home'
import Create from './Pages/Create';
import View from './Pages/View';
import Player from './Pages/Player';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Create' element={<Create/>}/>
            <Route path='/View' element={<View/>}/>
            <Route path='/player/:id' element={<Player/>}/>
          </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
