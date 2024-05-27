import { Link } from 'react-router-dom'
import './toolsBar.css'
import { FaSearch } from "react-icons/fa";
import Button from "../Button"
import { useContext, useState } from 'react';
import { ProductsContext } from '../../data/products-context';
import NewCategory from '../newCategory/NewCategory';



export default function ToolsBar() {
  const {setImputedText, inputedText} = useContext(ProductsContext)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  
  return (
    <div className='tools-container'>
        {isCategoryOpen && <NewCategory setIsCategoryOpen={setIsCategoryOpen}/>}
        <div className='buttons-container'>
            <div className='search-bar'>
                <FaSearch/>
                <input type="text" placeholder='Search products' onChange={(e) => setImputedText(e.target.value)} value={inputedText} />
            </div>
            <div>
                <Link to='/new-supplier'><Button style='light-btn'>Add Supplier</Button></Link>
                <button className='light-btn btn' style={{marginLeft: "16px"}} onClick={()=> setIsCategoryOpen(true)}>New Category</button>
                <Link style={{marginLeft: "16px"}} to='/new-product'><Button style='dark-btn'>New Product</Button></Link>
            </div>
        </div>
    </div>
  )
}
