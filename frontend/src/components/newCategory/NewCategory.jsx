import { useContext, useState } from 'react'
import './new-category.css'
import { ProductsContext } from '../../data/products-context'


export default function NewCategory({setIsCategoryOpen}) {
    const {fetchData} = useContext(ProductsContext)
    const [newCategory, setNewCategory] = useState({
        name: ''
    })

    function handleOnChange(e) {
        const {name, value} = e.target
        setNewCategory(prev => ({
            ...prev, [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()

        const urlEncodedData = new URLSearchParams();
        for (const [key, value] of Object.entries(newCategory)) {
            urlEncodedData.append(key, value);
        }

        try {
            const response = await fetch('http://localhost:5500/categories/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData.toString()
            })

            if (response.ok) {
                alert('Category created successfully');
                fetchData()
                setIsCategoryOpen(false)
            } else {
                alert('Failed to create category');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }

    return (
        <main className='new-category-main'>
            <div className='card'>
                <h3>Create New Category</h3>
                <form onSubmit={handleSubmit} className='new-category-form'>
                    <input type="text" name='name' id='name' value={newCategory.name} onChange={handleOnChange} placeholder='Category Name' />
                    <input type="submit" name='submit' id='submit' value='Create' className='btn dark-btn' />
                    <button className='btn light-btn' onClick={()=> setIsCategoryOpen(false)}>Cancel</button>
                </form>
            </div>
        </main>
  )
}
