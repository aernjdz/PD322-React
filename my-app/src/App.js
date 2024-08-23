
import './App.css';
// import MainHeader from "./Components/containers/header";
// import Accordion from "./Components/containers/acordion";
import {Route, Routes} from "react-router-dom";
import Layout from "./Components/containers";
import HomePage from "./Components/home";
import RegisterPage from "./Components/auth/register";
import NotFoundPage from "./Components/pages/404";
import ImageListPicker from "./Components/common/imageListPicker";
import PizzaCreatePage from "./Components/pizza/create";
import {useState} from "react";
import {AuthContext,initState} from "./Components/auth/authContext";
import NovaPostaPage from "./Components/newPost";
import ProductsPage from "./Components/products";

const App = () => {

    const [auth, setAuth] = useState({
        ...initState,
        login : (user) => {
            setAuth({...auth, isAuth: true,user});
        },
        logout: () =>{
            setAuth({...auth, isAuth: false,user: null});
        }
    });
  return (
          <>
              <AuthContext.Provider value={auth}>
              <Routes>
                  <Route path="/" element={<Layout />} >
                        <Route index element={<HomePage />} />
                        <Route path={"/register"} element={<RegisterPage />} />
                        <Route path={'/test'} element={<ImageListPicker/>}/>
                        <Route path={'/pizza/create'} element={<PizzaCreatePage/>}/>
                        <Route path={'/NovaPostAPI'} element={<NovaPostaPage/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                        <Route path={"products"} element={<ProductsPage/>} />

                  </Route>
              </Routes>
              </AuthContext.Provider>

          </>
  );
}

export default App;
