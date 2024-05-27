import { useContext } from 'react';
import './delete-modal.css'
import { IoCloseSharp } from "react-icons/io5";
import { ProductsContext } from '../../data/products-context';


export default function DeleteModal({setIsDeleteOpen, selectedItem}) {
    const {fetchData} = useContext(ProductsContext)

    async function deleteProduct(){

        try {
            const response = await fetch(`http://localhost:5500/products/${selectedItem.product_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            if (response.ok) {
                alert('Product deleted successfully');
                fetchData()
                setIsDeleteOpen(false)
            } else {
                alert('Failed to delete the product');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }

    return (
    <div className='modal-background'>
        <div className='delete-modal-container'>
            <IoCloseSharp onClick={()=> setIsDeleteOpen(false)} className='close-modal-btn' size='30' />
            <div className='delete-modal-content'>
                <h3>Confirm Delete</h3>
                <h4 style={{fontWeight: '400'}}>Are you sure you want to delete item: {selectedItem.product_name}?</h4>
                <div className='delete-buttons-container'>
                    <button onClick={()=> setIsDeleteOpen(false)} className='btn light-btn'>Cancel</button>
                    <button onClick={deleteProduct} className='btn dark-btn'>Delete</button>
                </div>
            </div>  
        </div>
    </div>
  )
}
