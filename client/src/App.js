import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home'
import LandingPage from './components/LandingPage';
function App() {
  return (
   <BrowserRouter>
   
      <div className="App">
          <Routes> 
            <Route path ='/'element={< LandingPage />} />
            <Route path ='/home'element={< Home />} />
            
          </Routes>
      </div>
   </BrowserRouter>
   
  );
}

export default App;
