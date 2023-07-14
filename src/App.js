
import "./App.css";
import Navbar from "./components/Navbar";

import {Routes,Route} from "react-router-dom";
import Movie from "./components/Movie";
import Admin from "./components/Admin";

function App() {
 
  return (
    <>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Movie/>}/>
      <Route exact path="/admin" element={<Admin/>}/>
      </Routes>
    </>
  );
}

export default App;
