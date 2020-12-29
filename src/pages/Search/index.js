import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Categories from '../../components/Categories';
import Card from '../../components/Card';

function Search() {

  const { name } = useParams();

  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [linksPage,setLinksPage] = useState({});
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);

  useEffect(() => {
    setSearch( name.replace(/%20/g, ' '));
    loadResult(name);
  },[]);

  function loadSearch(e){
    if(search.length > 0){
      if(e){
        e.preventDefault();
      }
      const aux = search.replace(/''/g,'%20');
      loadResult(aux);
    }
  }

  async function loadResult(name){
    const response = await api.get(`/anime?filter[text]=${name}`);
    const { data, meta, links} = response.data;
    if(meta.count !== 0){
      setResult(data);
      setLinksPage(links);
    } 
  }

  async function loadNext(){
    try{
      const response = await api.get(linksPage.next);
      const { data, links } = response.data; 
      setResult(data);
      setLinksPage(links);
      setPage(page + 1);
    } catch (error){
      console.log(error);
        setNext(true);
    }
  }

  async function loadPrev(){
    const response = await api.get(linksPage.prev);
    const { data, links } = response.data; 
    setResult(data);
    setLinksPage(links);
    setPage(page - 1);
  }

  return (
      <div className='content-search'>
          <Header can={true} />
          <form
            className="form-search" 
            onSubmit={loadSearch}>
            <input
              required={true} 
              value={search}
              onChange={ event => setSearch(event.target.value)} 
            />
            <button>
              <FaSearch 
                size={20} 
                color='#fff'
                onClick={() => loadSearch()} />
            </button>
          </form>
          <h1 className='title-result'>Search result:</h1>
          <main>
            <div className="content-results-buttons">
              <div className='content-result'>
                {
                  result.length > 0 ? result.map( anime => (
                    <Card 
                      key={anime.id}
                      id={anime.id}
                      atributes={anime.attributes}
                    />
                  )): <p>Not found</p>
                }
              </div>
              <div className='buttons-content'>
                <button 
                  disabled={ page ===  1? true: false}
                  onClick={() => loadPrev()}
                >Previous</button>
                <button
                  disabled={next}
                  onClick={() => loadNext()}
                >Next</button>
              </div>
            </div>
            <div className="content-categories">
              <Categories />
            </div>
          </main>    
          <Footer />
      </div>
  );
}

export default Search;