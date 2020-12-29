import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Categories from '../../components/Categories';
import Card from '../../components/Card';
import api from '../../services/api';

function CategoriesView() {

  const { id } = useParams();

  const [categorie, setCategorie] = useState('Categories');
  const [animes, setAnimes] = useState([]);
  const [linksPages, setLinksPages] = useState({});
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if( id !== 'default' && id != null){
      loadAnimes(id);
      loadCategorie(id);
    }
  });

  async function loadAnimes(idAnime){
    const response = await api.get(`/categories/${idAnime}/anime`);
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);

    loadCategorie(idAnime);
  }

  async function nextPage(){
    const response = await api.get(linksPages.next);
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);
    setPages(pages + 1);
  }

  async function prevPage(){
    const response = await api.get(linksPages.prev);
    const { data, links } = response.data;
    setAnimes(data);
    setLinksPages(links);
    setPages(pages - 1);
  }

  async function loadCategorie(idAnime){ 
    const response = await api.get(`/categories/${idAnime}`);
    const { data } = response.data;
    setCategorie(data.attributes.title);
  }

  if(id === 'default' && animes.length === 0){
   
    return (
      <div className='categories-conteiner-app'>
      <Header />
      <h1 className='title-categories default'>{categorie}</h1>
      <main>
        <div className='result default-result'>
          <p>Select a categorie</p>
        </div>
        <Categories 
          onDefault={true} 
          rederName={ result => loadAnimes(result)} />
      </main>
      <Footer />
    </div>
    );
  }

  return (
    <div className='categories-conteiner-app'>
      <Header />
      <h1 className='title-categories'>{categorie}</h1>
      <main>
        <div id="content-cards-buttons" className="content-cards-buttons">
          <div className='result'>
            {
              animes.map( anime => (
                <Card 
                  key={anime.id} 
                  atributes={anime.attributes}
                  id={anime.id}/>
              ))
            }
          </div>
          <div className='buttons-next-prev'>
            <button
              disabled={ pages === 1? true: false}
              onClick={() => prevPage()}
            >
             <a href="#content-cards-buttons">Previous</a>
            </button>
            <button
              onClick={() => nextPage()}
            >
             <a href="#content-cards-buttons">Next</a>
            </button>
          </div>
        </div>
        <div className="content-categories">
          <Categories 
            onDefault={true} 
            rederName={ result => loadAnimes(result)} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CategoriesView;