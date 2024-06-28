
import './App.css';
import MainHeader from "./Components/containers/header";
import Accordion from "./Components/containers/acordion";
import {Route, Routes} from "react-router-dom";
import Layout from "./Components/containers";
import HomePage from "./Components/home";
import RegisterPage from "./Components/auth/register";
import NotFoundPage from "./Components/pages/404";

const App = () => {
  return (
          <>
              <Routes>
                  <Route path="/" element={<Layout />} >
                        <Route index element={<HomePage />} />
                        <Route path={"/register"} element={<RegisterPage />} />
                        <Route path={"*"} element={<NotFoundPage/>}></Route>
                  </Route>
              </Routes>


          </>
  );
}

export default App;
