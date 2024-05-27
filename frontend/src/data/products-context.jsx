import { createContext, useEffect, useState } from "react";
import dummyProducts from "./dummyProducts";
import dummyCategories from "./dummyCategories";
import dummySuppliers from "./dummySuppliers";


export const ProductsContext = createContext({
    products: [],
    filteredProducts: [],
    setProducts: () => {},
    setImputedText: () => {},
    inputedText: '',
    categories: [],
    suppliers: [],
    fetchData: () => {}
})


export default function ProductsContextProvider({children}) {
  
    const [products, setProducts] = useState([])
    
    const [categories, setCategories] = useState()
    const [suppliers, setSuppliers] = useState()
    const [inputedText, setImputedText] = useState('')

    //Get Data from Backend
    const fetchData = async () => {
        try {
            const productsResponse = await fetch('http://localhost:5500/products/all')
            const categoriesResponse = await fetch('http://localhost:5500/categories/all')
            const suppliersResponse = await fetch('http://localhost:5500/suppliers/all')

            if(!productsResponse.ok || !categoriesResponse.ok || !suppliersResponse.ok){
                throw new Error('Failed to fetch data') 
            }

            const productsData = await productsResponse.json()
            const categoriesData = await categoriesResponse.json()
            const suppliersData = await suppliersResponse.json()

            setProducts(productsData)
            setCategories(categoriesData)
            setSuppliers(suppliersData)

        } catch (error) {
            console.log('Error', error.message)
        }
    }

    useEffect(() => {
        fetchData()   
    }, [])

    //Search Bar Function
    const filteredProducts = products.filter((product)=> {
        if (inputedText === ''){
            return product
        } else {
            return product.product_name.toLowerCase().includes(inputedText.toLowerCase())
        }
    })


    const ctxValue = {
        products: products,
        filteredProducts: filteredProducts,
        setProducts: setProducts,
        setImputedText: setImputedText,
        inputedText: inputedText,
        categories: categories,
        suppliers: suppliers,
        fetchData: fetchData
    }
    return (
    <ProductsContext.Provider value={ctxValue}>
        {children}
    </ProductsContext.Provider>
  )
}
