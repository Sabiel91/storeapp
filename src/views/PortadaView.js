import { useState, useEffect } from 'react'
import { obtenerProductos } from '../services/productoServices'
import GroupProducts from '../components/GroupProducts'
import CustomCarousel from '../components/CustomCarousel'

export default function PortadaView() {
    const [productos, setProductos] = useState([])
    
    const getProductos = async () => {
        try{
            let productosObtenidos = await obtenerProductos()
            setProductos(productosObtenidos)
        }
        catch(error){
            throw error
        }
    }

    useEffect(() =>{
        getProductos()
    }, [])


    return (
        <div>
            <CustomCarousel />
            <GroupProducts productos={productos} />
        </div>
    )
}
