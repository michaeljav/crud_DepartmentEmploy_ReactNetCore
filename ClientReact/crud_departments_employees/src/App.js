import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Department} from './Components/Department';
import {Employee} from './Components/Employee';

import { BrowserRouter, Routes,Route, NavLink } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        CRUD Deparment Employee
      </h3>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Department
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Employee
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes >
        <Route  path='/home' element={<Home/>} exact/>
        <Route   path='/department' element={<Department />} exact/>
        <Route  path='/employee' element={<Employee/>} exact/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;
