import { useState, useEffect, useContext } from "react"
import { CarritoContext } from "../context/carritoContext"
import {useParams} from "react-router-dom"
import { obtenerProductoPorId } from "../services/productoServices"
import Loading from "../components/Loading"
import Swal from "sweetalert2"
import { useHistory } from "react-router"

export default function ProductoView() {
    const [producto, setProducto] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams()
    // Me permite acceder a lo que compartimos en el context pero necesita la referencia al contexto

    const history = useHistory()


    const {anadirCarrito} = useContext(CarritoContext)

    // console.log(miContexto)

    const getProducto = async () => {
        try{
            let productoObtenido = await obtenerProductoPorId(id)
            setProducto(productoObtenido)
            setCargando(false)
        }
        catch(error){
            console.log(error)
        }
    }

    const anadirACarritoContext = async () => {
        anadirCarrito(producto)
        const resultado = await Swal.fire({
            icon:'succes',
            title:'Producto añadido',
            showConfirmButton:true,
            showDenyButton:true,
            confirmButtonText:'Seguir comprando',
            denyButtonText:'Ir a carrito'  
        })
        if(resultado.isConfirmed){
            history.push('/')
        }
        else if(resultado.isDenied){
            history.push('/carrito')
        }
        
    }

    useEffect(() => {
        getProducto()
    }, [])
    return (
        <div>
            {cargando ? 
            (<Loading />) : 
            (
            <div>
                <div className="container">
                    <h2 className="fw-bold">
                        {producto.prod_nombre}
                    </h2>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img className="img-fluid" src={producto.prod_imagen}
                            alt={producto.prod_nombre} />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <h5 className="fw-bold">Descripción</h5>
                            <p>{producto.prod_descripcion}</p>
                            <div className="py-3 d-flex justify-content-between">
                                <span className="fw-bold">
                                    s/ {producto.prod_precio}
                                </span>
                                <button className="btn btn-dark btn-lg" onClick={anadirACarritoContext}>
                                    <i className="fas fa-shopping-cart me-2" />
                                    Añadir a carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
