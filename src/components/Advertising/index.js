import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import  './styles.css';
import 'swiper/swiper.scss';

SwiperCore.use([Autoplay]);

function Advertising() {

  const navigation = useHistory();
  const [animes, setAnimes] = useState(null);

  useEffect(() => {  
    loadAnimes();
  },[]);

  function Substring(data){
    return data.map( ani => {
      var synops = String(ani.attributes.synopsis);
      if(synops.length > 300){
        ani.attributes.synopsis = synops.substring(0, 300) + '...';
      }
      return ani;
    });
  }

  async function loadAnimes(){
      const response = await api.get(`/anime?page%5Blimit%5D=10&page%5Boffset%5D=${Math.random() * (15725 - 100) + 100}`);
      const { data } = response.data;
      setAnimes(Substring(data));
  }


  return (
      <Swiper
        loop
        autoplay={{
            delay: 10000,
            disableOnInteraction: false,
        }}
        speed={900}
        resistance={false}
        key={animes ? animes.length: 0}
        >
          {animes && animes.map( (ani, key) => (
            <SwiperSlide key={ani.id}>
                <section 
                    className='advertising'>
                    <img 
                        className="img-thumb"
                        src={ani.attributes.posterImage.medium} 
                        alt='text'
                    />
                    <div className="content-infor">
                        <h1>{ani.attributes.canonicalTitle}</h1>
                        <p>{ani.attributes.synopsis}</p>
                        <button 
                          onClick={() => navigation.push(`/anime/${ani.id}`)}
                          className="watch">
                          Watch now
                        </button> 
                    </div>
                </section>  
            </SwiperSlide>
          ))}
      </Swiper>
  );
}

export default Advertising;