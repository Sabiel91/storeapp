// Componente siempre inician en mayusculas
import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"

export default function GroupProducts({productos}) {
    console.log(productos)
    return (
        <div className="container">
            <div className="row mt-3">
                {productos.map((prod, i) => (
                    <div className="col-6 col-lg-3" key={i}>
                        <Link className="card mb-4" to={`/detalle/${prod.prod_id}`}>
                            <img src={prod.prod_imagen} className="card-img-top" alt={prod.prod_nombre} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {prod.prod_nombre}
                                </h5>
                                <span className="fw-bold">
                                    s {prod.prod_precio}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
