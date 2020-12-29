import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function Categories({ onDefault, rederName }) {

  const [categories, setCategories] = useState([]);
  const [linksCategories, setLinksCategories] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadGeneres();
  },[]);

  async function loadGeneres(){
    const response = await api.get('/categories');
    const { data, links } = response.data;
    setCategories(data);
    setLinksCategories(links);
  }

  async function nextGeneres(){
    const response = await api.get(linksCategories.next);
    const { data, links } = response.data;
    setCategories(data);
    setLinksCategories(links);
    setPage(page + 1);
  }

  async function prevGeneres(){
    const response = await api.get(linksCategories.prev);
    const { data, links } = response.data;
    setCategories(data);
    setLinksCategories(links);
    setPage(page - 1);
  }
 
  if(onDefault){
    return (
      <article>
          <header>
              <h1>Categories</h1>
          </header>
          <ul className='categories-default'>
            {
              categories.map( genere => (
                <li 
                  key={genere.id}
                  onClick={ () => rederName(genere.id)} 
                >{genere.attributes.title}</li>
              ))
            }
          </ul>
          <footer>
          <button
              disabled={ page === 1? true: false } 
              onClick={() => prevGeneres()}
              >Previous</button>
            <button
              onClick={ () => nextGeneres()}
            >Next</button>
          </footer>
      </article>
    );
  }

  return (
      <article>
          <header>
              <h1>Categories</h1>
          </header>
          <ul>
            {
              categories.map( genere => (
                <li key={genere.id} ><Link to={`/categories/${genere.id}`}>{genere.attributes.title}</Link></li>
              ))
            }
          </ul>
          <footer>
            <button
              disabled={ page === 1? true: false } 
              onClick={() => prevGeneres()}
              >Previous</button>
            <button
              onClick={ () => nextGeneres()}
            >Next</button>
          </footer>
      </article>
  );
}

export default Categories;