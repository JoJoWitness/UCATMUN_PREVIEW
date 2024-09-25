import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { UserInfo } from "./routes/UserInfo"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" >
              <Route path="/Delegado/:cedula" element={<UserInfo/>} />
            
            </Route>
        </>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}