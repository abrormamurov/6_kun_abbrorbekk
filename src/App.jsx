import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/useGlobal";
//Layout
import MainLayout from "./layout/MainLayout";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleProduct from "./components/SingleProduct";
//login
import Login from "./pages/Login";
import Singup from "./pages/Signup";
//componetns
import ProtectotRoots from "./components/ProtectedRoutes";
import { action as SingupAction } from "./pages/Signup";
import { action as LoginAction } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";

//firebase
import auth, { db } from "./firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Card from "./pages/Card";

export default function App() {
  let { user, dispetch, authReady } = useContext(GlobalContext);
  localStorage.getItem(user) ? JSON.parse(localStorage.getItem(user)) : null;

  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectotRoots user={user}>
          <MainLayout />,
        </ProtectotRoots>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "/card",
          element: <Card />,
        },
      ],
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Singup />,
      action: SingupAction,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispetch({ type: "LOG_IN", paylod: user });
      dispetch({ type: "AUTH_READY" });
    });
    let allData = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "products"));
      // console.log({
      //   ...querySnapshot.docs[0].data(),
      //   idf: querySnapshot.docs[0].id,
      // });
      querySnapshot.docs.forEach((itme) => {
        allData.push({ idF: itme.id, ...itme.data() });
      });
      // console.log(item);

      dispetch({ type: "DATA_BASE", paylod: allData });
    }

    getData();
  }, []);
  return <>{authReady && <RouterProvider router={router} />}</>;
}
