import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Video from '../../components/Video';

import LoadingImage from '../../assets/LoadingImage.svg';

function AnimeView() {

  const [anime, setAnime] = useState([]);
  const [genres, setGenres] = useState([]);
  const [posterImage, setPosterImage] = useState('');
  const [attributes, setAttributes] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function load(){
      const response = await api.get(`/anime/${id}`);
      const { data } = response.data;

      console.log(data);

      setAnime(data);
      setAttributes(data.attributes);
      setPosterImage(data.attributes.posterImage);

      loadGenres();
      loadEpisodes();
    }
    load();
  },[]);

  async function loadGenres(){
    const response = await api.get(`/anime/${id}/genres`);
    setGenres(response.data.data);
  }
  
  async function loadEpisodes(){
    const response = await api.get(`/anime/${id}/episodes`);
    const { data, meta } = response.data;
    setCount(Number(meta.count));
    setEpisodes(data);
  }

  async function loadNextEpisodios(){
    console.log(count);
    var mincoutn = count - 10;
    if(mincoutn > 0){
      const response = await api.get(`anime/${id}/episodes?page%5Blimit%5D=10&page%5Boffset%5D=${page + 10}`);
      const { data } = response.data;
      setEpisodes(data);
      setPage(page + 10);
      setCount(mincoutn);
    }else{
      console.log('foi')
    }
  }

  async function loadPrevEpisodios(){
    if(page >= 10){
      const response = await api.get(`anime/${id}/episodes?page%5Blimit%5D=10&page%5Boffset%5D=${page - 10}`);
      const { data } = response.data;
      setEpisodes(data);
      setPage(page - 10);
      if(count >= 0){
        setCount(count + 10);
      }
    }
    
  }

  return (
    
    <div className='content-view'>
        <Header />
          <div className="anime-infor">
            <img 
              src={anime ? posterImage.small : LoadingImage} 
              alt={attributes.canonicalTitle} />

            <div className="content-infors">
              <h1>{attributes.canonicalTitle}</h1>
              <p>{attributes.synopsis}</p>
              <section className="content-genres">
                {
                    genres.map( (item, key) => (
                      <span
                        key={key} 
                        className="genre"
                      >{item.attributes.name}</span>
                    ))
                }
              </section>
            </div>
          </div>
          <h1 className="title" >Episodes </h1>
         <div  className='content-episodes' >
           
           <main>
             {
               episodes.map( (item, key) => (
                  <Video
                    key={key} 
                    thumbnail={item.attributes.thumbnail != null ? item.attributes.thumbnail.original : LoadingImage}
                    number={item.attributes.number} />
              ))
             }
           </main>
           <div className='buttons'>
             <button
              onClick={loadPrevEpisodios}
             >Previous</button>
             <button
              onClick={loadNextEpisodios}
             >Next</button>
           </div>
         </div>
        <Footer />
    </div>
  )
}

export default AnimeView;