import Admin from "./Containers/Admin/Admin"
import { BrowserRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";
import LandingPage from "./ZContainers/LandingPage/LandingPage.jsx";
import AddGrants from "./ZContainers/AddGrants/AddGrants.jsx";
import Signin from "./Components/auth/Signin.jsx";
import Portfolio from "./ZContainers/Portfolio/Portfolio.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/addgrant" element={<AddGrants />} />
          <Route exact path="/auth" element={<Signin/>}/>
          <Route exact path="/chart" element={<Portfolio/>}/>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
