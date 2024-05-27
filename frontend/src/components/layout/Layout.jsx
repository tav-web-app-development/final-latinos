import ProductTable from '../products/ProductTable'
import ToolsBar from '../toolsBar/ToolsBar'
import './layout.css'
import userImg from '/user-img.png'


export default function Layout() {
  return (
    <section className='layout-container'>
        <div className='header-container'>
            <div className='layout-header'>
                <h3>Dashboard</h3>
                <div><img src={userImg} alt="User Image..." /></div>
            </div>
            <div className='line'></div>
        </div>
        
        <ToolsBar/>
        <ProductTable/>

    </section>
  )
}
