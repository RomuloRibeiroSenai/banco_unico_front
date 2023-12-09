import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Inicio from './pages/Inicio';
import Home from './pages/Home';


function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
