import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home'
import LandingPage from './components/LandingPage';
import NewRecipe from './components/NewRecipe'
import Detail from './components/Detail'
import UploadF from './components/UploadF'

function App() {
  return (
   <BrowserRouter>
      <div className="App">
          <Routes> 
            <Route path ='/'element={< LandingPage />} />
            <Route path ='/home'element={< Home />} />
            <Route path ='/recipe' element ={< NewRecipe />} />
            <Route path ='/detail/:id' element ={< Detail />} />
            <Route path ='/upload' element ={< UploadF />} />
          </Routes>
      </div>
   </BrowserRouter>
   
  );
}

export default App;
