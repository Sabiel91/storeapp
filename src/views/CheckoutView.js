import { useState, useContext } from "react"
import { CarritoContext } from "../context/carritoContext"
import { useForm } from "react-hook-form"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"

export default function CheckoutView() {

    const [marcador, setMarcador] = useState([-12.0433, -77.0283 ])

    const { carrito } = useContext(CarritoContext)

    const { register, handleSubmit, formState: {errors} } = useForm()

    const AddMarker = () => {
        const map = useMapEvents({
            click: (e) => {
                const {lat, lng} = e.latlng
                setMarcador([lat, lng])
            }
        })
        return null
    }

    let total = 0

    total = carrito.reduce((acum, item) => {
        return acum + (item.cantidad * item.prod_precio)
    }, 0)

    const recibirSubmit = (datos) => {
        console.log(datos)
    }

    return (
        <div className="container mt-4">
            <h1>Verificar Compra</h1>
            <p>Por favor verifique los productos e indique los datos solicitados</p>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h4>Productos en CarritoView</h4>
                    <ul className="list-group">
                        {carrito.map((prod, i) => (
                            <li className="list-group-item d-flex justify-content-between" key={i}>
                                <div>
                                    <span className="fw-bold">
                                        {prod.prod_nombre}
                                        <br/>
                                        <small>
                                            Cantidad : {prod.cantidad}
                                        </small>
                                    </span>
                                </div>
                                <small className="badge bg-dark rounden-pill p-3">
                                    S/ {prod.cantidad * prod.prod_precio}
                                </small>
                            </li>
                        )
                        )}
                        {total !== 0 ? (<li className="list-group-item d-flex justify-content-between">
                            <span className="fw-bold">TOTAL :</span>
                            <span>
                                S/ {total}
                            </span>
                        </li>) : (<li className="list-group-item">
                            Todav??a no ha agregado ning??n producto
                        </li>)}
                    </ul>
                </div>

                <div className="col-sm-12 col-md-6">
                    <h4>Ingrese sus datos</h4>

                    <form onSubmit={handleSubmit(recibirSubmit)}>
                        <div className="mb-2">
                            <label className="font-label">
                                Nombres y Apeliidos
                            </label>
                            <input type="text" className="form-control" placeholder="Ej. Juan Perez" {...register("nombreCompleto", {required: true})}/>
                            {errors.nombreCompleto && (<small className="text-danger">Este campo es obligatorio</small>)}
                        </div>
                        <div className="mb-2">
                            <label className="font-label">
                                Numero de celular
                            </label>
                            <input type="text" className="form-control" placeholder="Ej. +51 926707653" 
                            {...register("telefono", {minLength:{value:6, message:"Se requiere 6 d??gitos"}, maxLength: { value: 12, message:"M??ximo 14 d??gitos"}})}
                            />
                            {errors.telefono && (<small className="text-danger">{errors.telefono.message}</small>)}

                        </div>
                        <div className="mb-2">
                            <label className="font-label">
                                Direcci??n
                            </label>
                            <input type="text" className="form-control" placeholder="Ej. Urb. Matellini S/N" {...register("direccion", {pattern: /^[A-Za-z]$/})}/>
                            {errors.direccion && (<small className="text-danger">El formato no es adecuado</small>)}
                        </div>
                        
                        <MapContainer center = {[-12.0433, -77.0283 ]} 
                        zoom={17}
                        style={{height:"400px"}}>
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <AddMarker />
                        <Marker position={marcador} 
                        />
                        </MapContainer>
                        

                        <button type="submit" className="btn btn-dark">
                            Confirmar Compra
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}
