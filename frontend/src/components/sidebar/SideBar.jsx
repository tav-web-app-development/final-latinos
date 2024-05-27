import { Link } from 'react-router-dom';
import './sidebar.css'
import { GiHamburgerMenu } from "react-icons/gi";
import navMenu from '../../data/navItems';
import { useState } from 'react';



export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true)

  function handleToggleSidebar(){
    setIsOpen(!isOpen)
  }
  
  return (
    <section className={isOpen ? 'sidebar-container': 'sidebar-container-closed'}>
      <div className='nav-header-container'>
        {isOpen && <h3>Final<br></br>Project</h3>}
        <GiHamburgerMenu onClick={handleToggleSidebar} className='menu-icon' size={35}/>
      </div>
      <nav className='nav-container'>
        {navMenu.map((item, index)=> (
          <Link key={index} className='nav-link' to={item.path}>
            {item.icon}
            {isOpen && <div>{item.name}</div>}
          </Link>
        ) )}
      </nav>
    </section>
  )
}
