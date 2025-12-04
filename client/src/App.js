import TextEditor from "./TextEditor";
import {BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom';
import {v4 as uuidV4} from 'uuid';
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DocProvider from "./context/DocProvider";

function App() {
  return (
    <DocProvider>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path="/" element={<Navigate replace to={`/documents/${uuidV4()}`}/>}/>
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/> */}
        <Route path="/documents/:id" element={<Home/>}/>
      </Routes>
    </Router>
    </DocProvider>
  );
}

export default App;