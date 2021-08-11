import { Route } from "react-router-dom"
import PortadaView from "./views/PortadaView"
import ProductoView from "./views/ProductoView"
import CarritoView from "./views/CarritoView"
import ProductosView from "./views/ProductosView"
import LoginView from "./views/LoginView"
import ProtectedRoutes from "./components/ProtectedRoutes"
import CheckoutView from "./views/CheckoutView"

export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={PortadaView} />
            <Route path="/detalle/:id" exact component={ProductoView} />
            <ProtectedRoutes path="/carrito" exact component={CarritoView} />
            <Route path="/productos" exact component={ProductosView} />
            <Route path="/login" exact component={LoginView} />
            <ProtectedRoutes path="/checkout" exact component={CheckoutView} />
        </div>
    )
}
