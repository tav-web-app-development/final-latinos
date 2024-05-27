import './new-supplier.css'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../data/products-context'


export default function NewSupplier() {
    const {fetchData} = useContext(ProductsContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: ''
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
            const response = await fetch('http://localhost:5500/suppliers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData.toString()
            })

            if (response.ok) {
                alert('Supplier created successfully');
                fetchData()
                navigate('/')
            } else {
                alert('Failed to create supplier');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }

    
    return (
        <main className='new-supplier-main'>
        <div className='card'>
            <h3>Add New Supplier</h3>
            <form onSubmit={handleSubmit} className='new-supplier-form'>
                <input required type="text" name='name' id='name' value={formData.name} onChange={handleOnChange} placeholder='Supplier Name' />
                <input required type="text" name='email' id='email' value={formData.email} onChange={handleOnChange} placeholder='Email' />
                <input required type="text" name='contact' id='contact' value={formData.contact} onChange={handleOnChange} placeholder='Contact' />
                <input type="submit" name='submit' id='submit' value='Create' className='btn dark-btn' />
                <Link to='/' className='btn light-btn' style={{textAlign: "center"}}>Cancel</Link>
            </form>
        </div>
    </main>
  )
}
