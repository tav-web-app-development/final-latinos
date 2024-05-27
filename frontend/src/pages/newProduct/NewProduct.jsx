import { Link, useNavigate } from 'react-router-dom'
import './new-product.css'
import { useContext, useState } from 'react'
import { ProductsContext } from '../../data/products-context'



export default function NewProduct() {
    const {categories, suppliers, fetchData} = useContext(ProductsContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
    product_name: '',
    SKU: '',
    cat_id: 1,
    sup_id: 1,
    product_desc: '',
    quantity: 0,
    price: 0,
    })

    function handleOnChange(e) {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }


    async function handleSubmit(e){
        e.preventDefault()

        const urlEncodedData = new URLSearchParams();
        for (const [key, value] of Object.entries(formData)) {
            urlEncodedData.append(key, value);
        }
        console.log(formData)

        try {
            const response = await fetch('http://localhost:5500/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData.toString()
            })

            if (response.ok) {
                alert('Product created successfully');
                fetchData()
                navigate('/')
            } else {
                alert('Failed to create product');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }
  
    return (
    <main className='new-product-main'>
        <div className='card'>
            <h3>Create New Product</h3>
            <form onSubmit={handleSubmit} className='new-product-form'>
                <input required type="text" name='product_name' id='product_name' value={formData.product_name} onChange={handleOnChange} placeholder='Item Name' />
                <input required type="text" name='SKU' id='SKU' value={formData.SKU} onChange={handleOnChange} placeholder='SKU' />
                <textarea type="text" name='product_desc' id='product_desc' cols='200' rows='3' value={formData.product_desc} onChange={handleOnChange} placeholder='Description' />
                <label htmlFor="category">Category</label>
                <select type="text" name='cat_id' id='cat_id' value={formData.cat_id} onChange={handleOnChange} placeholder='Category'>
                    {categories.map((cat)=> <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>)}
                </select>
                <label htmlFor="supplier">Supplier</label>
                <select type="text" name='sup_id' id='sup_id' value={formData.sup_id} onChange={handleOnChange} placeholder='Supplier' >
                    {suppliers.map((sup)=> <option key={sup.supp_id} value={sup.supp_id}>{sup.supp_name}</option>)}
                </select>
                <div className='quantity-price'>
                    <label htmlFor="quantity">QTY</label>
                    <input required type="number" name='quantity' id='quantity' value={formData.quantity} onChange={handleOnChange} placeholder='Quantity' />
                    <label htmlFor="price">$</label>
                    <input required type="number" name='price' id='price' value={formData.price} onChange={handleOnChange} placeholder='Price' />
                </div>
                <input type="submit" name='submit' id='submit' value='Create' className='btn dark-btn' />
                <Link to='/' className='btn light-btn' style={{textAlign: "center"}}>Cancel</Link>
            </form>
        </div>
    </main>
  )
}
