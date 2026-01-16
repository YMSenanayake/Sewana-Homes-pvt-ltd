import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ containerStyles,setMenuOpened }) => {

  const navLink = [
    { path: '/', title: 'Home' },
    { path: '/collection', title: 'Collection' },
    { path: '/blog', title: 'AboutUs' },
    { path: '/contact', title: 'Contact' },
  ];



  return (
    <nav className={`${containerStyles}`}>
      {navLink.map((link) => (
        <NavLink onClick={()=>setMenuOpened(false)} key={link.title} to={link.path} className={({ isActive }) => `${isActive ? "active-link" : ""} p-2.5 px-5 rounded-full capitalize text-sm font-semibold`}>
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
