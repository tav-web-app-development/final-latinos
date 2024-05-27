import { useContext, useState } from 'react';
import './productTable.css'
import { FaEye } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { ProductsContext } from '../../data/products-context';
import DeleteModal from '../modal/DeleteModal';
import { Link } from 'react-router-dom';
import EditProduct from '../editProduct/EditProduct';



export default function ProductTable() {
 
    const {filteredProducts} = useContext(ProductsContext)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editedProduct, setEditedProduct] = useState()
    
    function shortenContent(content, n){
        if (content.length > n){
            const shortened = content.substring(0, n).concat("...")
            return shortened
        }
        return content
    }


    function handleEditModal(product){
        setIsEditOpen(true)
        setEditedProduct(product)
    }

    function handleDeleteProduct(product){
        setIsDeleteOpen(true)
        setSelectedItem(product)
    }
    
    return (
    <section>

        {isDeleteOpen && <DeleteModal setIsDeleteOpen={setIsDeleteOpen} selectedItem={selectedItem}/>}
        {isEditOpen && <EditProduct editedProduct={editedProduct} setEditedProduct={setEditedProduct} setIsEditOpen={setIsEditOpen}/>}

        <table className='products-table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Actions</th>
                </tr>
                
            </thead>
            <tbody>
                {filteredProducts.map((product)=>
                    <tr key={product.SKU} className='product'>
                        <td>{product.product_name}</td>
                        <td>{product.SKU}</td>
                        <td>{shortenContent(product.product_desc, 15)}</td>
                        <td>{product.category_name}</td>
                        <td>{product.supp_name}</td>
                        <td style={{textAlign: 'center'}}>{product.quantity}</td>
                        <td style={{textAlign: 'right'}}>$ {product.price}</td>
                        <td className='action-btns'>
                            <FaEye className='action-icon'/>
                            <FaRegEdit onClick={()=> handleEditModal(product)} className='action-icon'/>
                            <FaRegTrashAlt onClick={() => handleDeleteProduct(product)} className='action-icon'/>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </section>
  )
}
