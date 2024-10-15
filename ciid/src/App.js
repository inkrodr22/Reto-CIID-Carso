import './App.scss';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.js';
import Home from './components/Home/home.js';
import Startup from './components/Startup/startup.js';
import Technology from './components/Technologies/technologies.js';
import StartupDetail from './components/Startup/startupDetail/startupDetail.js'
import TechnologyDetail from "./components/Technologies/technologyDetail/technologyDetail.js"
import 'primereact/resources/themes/saga-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                       


function App() {
  return (
    <Router>
    
      <div className='flex'>
        <Sidebar />
        <div className='content'>
        <Routes>
            <Route path='/' exact={true} Component={Home}/>
            <Route path='/startup' exact={true} Component={Startup}/>
            <Route path='/technology' exact={true} Component={Technology}/>
            <Route path="/startup/:id" element={<StartupDetail />} />
            <Route path="/technology/:id" element={<TechnologyDetail />} />
            </Routes>
        </div>      
      </div>
    </Router>
  );
}

export default App;
