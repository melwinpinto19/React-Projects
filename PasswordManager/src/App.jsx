import { useState } from "react";
import { Template, Home, Passwords, Login } from "./components/index";
import crudService from "./appwrite/CRUD";
import Auth from "./appwrite/Auth";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const fun = async () => {
  let data = await crudService.getAllPasswords();
  return data ? data.documents : null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Template />}
        loader={async () => await Auth.get()}
      >
        <Route path="" element={<Home />}></Route>
        <Route path="passwords" element={<Passwords />} loader={fun}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Login type="Register" />}></Route>
    </>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-200 h-screen w-full">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
