import React, { useState, useEffect } from 'react';
import ReactVirtualizedTable from './ReactVirtualizedTable';
import SimpleBackdrop from '../utils/SimpleBackdrop/SimpleBackdrop'
import "./products-panel.sass"

export default function ProductsPanel(){

    const [ productsData, setProductsData ] = React.useState(null)
    const [ headerData, setHeaderData ] = React.useState(null)
    const [ loading, setLoading ] = useState(null);

    useEffect(() => {

        setLoading(true);

        const getProducts = async (url) => {
          try {
            const config = {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }

            const request = await fetch(url, {
              headers: config
            }) 
              const jsonRequest = await request.json() 
              setProductsData(jsonRequest)
              setHeaderData(Object.keys(jsonRequest[0]))
              setLoading(false)

            } catch (e){ 
              console.log(e); 
            } } 
    
            getProducts('https://system-rentail-api.herokuapp.com/products?id_lessor=' + JSON.parse(localStorage.getItem('user')).id)
    
        },[])

    return (
        <>
            {loading ? <SimpleBackdrop loading={true} />: null} 
            <div className="header-products">
                <h3>Mis Productos</h3>
                <div className="actions products">
                    <button>Nuevo Producto</button>
                </div>
            </div>
            { productsData === null && headerData === null ? null : <ReactVirtualizedTable getHeaders={headerData} getData={productsData} />}
        </>
    )
}