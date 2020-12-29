import React, { useRef, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import './styles.css';

import Logo from '../../assets/logo.svg';

function Header({ can }) {

  const [search, setSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [show, setShow] = useState(false);
  const [changePage, setChangePage] = useState(false);

  const menu = useRef()

  const inputSearch = useRef();
  const form = useRef();

  useEffect(() => {
    if(!search){
      inputSearch.current.style.display = 'none';
    }else{
      inputSearch.current.style.display = '';
    }

  }, [search]);

  useEffect(() => {
    if(can){
      form.current.style.display = 'none';
    }
  });

  function handleSearch(e){
    if(valueSearch.length > 0){
      if(e){
        e.preventDefault();
      }
      joinValue();
      setChangePage(true);
    }
  }

  function joinValue(){
    const join = valueSearch.replace(/''/g,'%20');
    setValueSearch(join);
  }

  useEffect(() => {
    if(show){
      menu.current.style.display = 'flex';
    }else{
      menu.current.style.display = 'none';
    }
  },[show]);

  if(changePage){
    return <Redirect to={`/search/${valueSearch}`} />
  }

  return (
    <>
      <header className='header-conteiner'>
        <Link to='/' className='logo-content'> 
          <img src={Logo} alt='AniLast Logo'/>
          <h1>AniLast</h1>
        </Link>
        <div className='links'> 
          <Link to='/' className='link'>Home</Link>
          <Link to='/' className='link'>Mangás</Link>
          <Link to='/categories/default' className='link'>Categories</Link>
          <form 
            ref={form} 
            onSubmit={handleSearch} 
            className='search'>
            <input 
              required={true}
              type='text' 
              ref={inputSearch}
              onChange={(event) => setValueSearch(event.target.value)} />
            <span>
              <FaSearch 
                color={'#fff'} 
                size={28} 
                onClick={ () => search? handleSearch(): setSearch(true)} />
            </span>
          </form>
        </div>
        <div className="content-links">
          <div ref={menu} className='links-menu'>
            <Link to='/' className='link'>Home</Link>
            <Link to='/' className='link'>Mangás</Link>
            <Link to='/categories/default' className='link'>Categories</Link>
          </div>
          <GiHamburgerMenu 
            className='links-menu-button'
            size={28}
            onClick={ () => show? setShow(false):setShow(true)}/>
        </div>
      </header>
      <form
        id='small-form' 
        ref={form} 
        onSubmit={handleSearch} 
        className='search'>
        <input 
          required={true}
          type='text' 
          onChange={(event) => setValueSearch(event.target.value)} />
        <span>
          <FaSearch
            className='icon' 
            color={'#fff'} 
            size={28} 
            onClick={ () => search? handleSearch(): setSearch(true)} />
        </span>
      </form>
    </>
  )
}

export default Header;