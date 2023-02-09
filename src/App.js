import "./App.css";
import Create from "./components/create/Create";
import Read from "./components/read/Read";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Update from "./components/update/Update";


function App() {
  return (
    <Router>
    <div className="main">
      <div style={{marginBottom:10}}>
        <h3>React Crud Operations</h3>
      </div>

      <div>
      <Routes>
       <Route exact path='/' element={<Create/>}/>
      </Routes>
      </div>

      <div style={{marginTop:20}}>
      <Routes>
      <Route exact path='/read' element={<Read/>}/>
      </Routes>

      </div>
      <Routes>
      <Route path='/update' element={<Update/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
