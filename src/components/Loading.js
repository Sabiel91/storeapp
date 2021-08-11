import React from 'react'

export default function Loading() {
    return (
        // Los estilos dentro de un componente en react, se manejan como objetos
        // Primeras llaves indica que es Js, y las segunda es para indicar el objeto
        // Se coloca entre comillas por la unidad
        <div style={{
            position:'fixed',
            top: '0',
            left: '0',
            width:'100vw',
            height: '100vh',
            zIndex:'99',
            backgroundColor:'white'

        }}>
            <i className="fas fa-spinner fa-spin fa-6x" 
            style={{
                color:'darkgreen',
                position:'absolute',
                top:'calc(50% - 50px)',
                left:'calc(50% - 50px)'
            }} />
        </div>
    )
}
