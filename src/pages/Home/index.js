import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';
import Advertising from '../../components/Advertising';
import Footer from '../../components/Footer';
import Categories from '../../components/Categories';
import Card from '../../components/Card';
import MangaList from '../../components/MangaList';

function Home() {

  const [animes, setAnimes] = useState([]);
  const [linksPages, setLinksPages] = useState('');
  const [page, setPage] = useState(1)

  useEffect(() => {
    load();
  },[]);

  async function load(){
    const response = await api.get('/anime?page[limit]=12');
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);
  }

  async function nextPage(){
    const response = await api.get(linksPages.next);
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);
    setPage(page + 1);
  }

  async function prevPage(){
    const response = await api.get(linksPages.prev);
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);
    setPage(page - 1);
  }

  return (
    <div className='app'>
      <Header />
      <Advertising />
      <h1 id="title" className='title'>Launched: </h1>
      <main className='name'>
        <div className="content-max-width">
          <ul id="content-cards" className='content-cards'>
            {
              animes.map( anime => (
                <Card 
                  key={anime.id} 
                  id={anime.id} 
                  atributes={anime.attributes} />
              ))
            }
          </ul>
        <div className='buttons-links'>
          <button 
            disabled={ page === 1? true:false}
            onClick={() => prevPage()}
            >
              <a href="#title"> Previous</a>
            </button>
          <button
            onClick={() => nextPage()}
          >
            <a href="#title"> Next</a>
        </button>
      </div>
        </div>
        <div className="content-categories-max-width">
          <hr/>
          <Categories />
        </div>
      </main>
     <MangaList />
     <span className="button-more-content">
       <button>
         More
       </button>
     </span>
     <Footer />
    </div>
  )
}

export default Home;