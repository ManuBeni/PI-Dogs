import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import DogCreate from "./components/DogCreate"


function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element = {<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dog" element={<DogCreate/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
