import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { UserInfo } from "./routes/UserInfo"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" >
              <Route index element={<UserInfo/>} />
              <Route path="Sobre_nosotros" element={<></>} />       
            </Route>
        </>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}