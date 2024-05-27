import './edit-product.css'
import { useContext } from 'react'
import { ProductsContext } from '../../data/products-context'
import { useNavigate } from 'react-router-dom'


export default function EditProduct({editedProduct, setIsEditOpen, setEditedProduct}) {
    const {categories, suppliers, fetchData} = useContext(ProductsContext)

    function handleOnChange(e) {
        const {name, value} = e.target
        setEditedProduct(prev => ({
            ...prev, [name]: value
        }))
    }

    
    async function handleSubmit(e){

        e.preventDefault()

        const urlEncodedData = new URLSearchParams();
        for (const [key, value] of Object.entries(editedProduct)) {
            urlEncodedData.append(key, value);
        }

        try {
            const response = await fetch(`http://localhost:5500/products/${editedProduct.product_id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData.toString()
            })

            if (response.ok) {
                alert('Product updated successfully');
                fetchData()
                setIsEditOpen(false)
            } else {
                alert('Failed to edit product');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }

    }


  
    return (
      <main className='edit-product-main'>
        <div className='card'>
            <h3>Edit Product</h3>
            <form onSubmit={handleSubmit} className='form'>
                <input type="text" name='product_name' id='name' value={editedProduct.product_name} onChange={handleOnChange} placeholder='Item Name' />
                <input type="text" name='SKU' id='SKU' value={editedProduct.SKU} onChange={handleOnChange} placeholder='SKU' />
                <textarea type="text" name='product_desc' id='description' cols='200' rows='3' value={editedProduct.product_desc} onChange={handleOnChange} placeholder='Description' />
                <label htmlFor="category">Category</label>
                <select type="text" name='cat_id' id='category' value={editedProduct.cat_id} onChange={handleOnChange} placeholder='Category'>
                    {categories.map((cat)=> <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>)}
                </select>
                <label htmlFor="supplier">Supplier</label>
                <select type="text" name='sup_id' id='supplier' value={editedProduct.sup_id} onChange={handleOnChange} placeholder='Supplier' >
                    {suppliers.map((sup)=> <option key={sup.supp_id} value={sup.supp_id}>{sup.supp_name}</option>)}
                </select>
                <div className='quantity-price'>
                    <label htmlFor="quantity">QTY</label>
                    <input type="number" name='quantity' id='quantity' value={editedProduct.quantity} onChange={handleOnChange} placeholder='Quantity' />
                    <label htmlFor="price">$</label>
                    <input type="number" name='price' id='price' value={editedProduct.price} onChange={handleOnChange} placeholder='Price' />
                </div>
                <input type="submit" name='submit' id='submit' value='Save' className='btn dark-btn' />
                <button className='btn light-btn' onClick={()=> setIsEditOpen(false)}>Cancel</button>
            </form>
        </div>
    </main>
  )
}
