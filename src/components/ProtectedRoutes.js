import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Route, Redirect } from "react-router-dom"

export default function ProtectedRoutes({component: Component, ...rest}) {

    const { userState } = useContext(AuthContext)

   return (
       <Route
       {...rest}
       render={(props) => userState ? (
           //El usuario esta logueado, pasa
            <Component {...rest} {...props} />

                ) : (
            <Redirect to="/login" />
                )
            }
       />
   )
}
