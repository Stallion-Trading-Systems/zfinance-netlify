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
import Report from "./ZContainers/Advisory/Report.jsx";
import Advisory from "./ZContainers/Advisory/Advisory.jsx";
import PortfolioMain from "./ZContainers/Portfolio/PortfolioMain.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/addgrant" element={<AddGrants />} />
          <Route exact path="/auth" element={<Signin/>}/>
          <Route exact path="/portfolio" element={<Portfolio/>}/>
          <Route exact path="/portfolio/:type" element={<PortfolioMain/>}/>
          <Route exact path="/advisory/report" element={<Report/>}/>
          <Route exact path="/advisory/report/:period/:capital/:liquidity" element={<Report/>}/>
          <Route exact path="/advisory" element={<Advisory/>}/>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
