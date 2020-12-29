import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Play from '../../assets/play.png';

function Video({ thumbnail, number }) {

  const play = useRef();

  return (
      <article className='content-play'>
          <Link to='#' className='content-video'>
            <img 
              className='tunbnail' 
              src={thumbnail}
              onMouseEnter={() => play.current.style.display = 'block'}
              onMouseOut={() => play.current.style.display = 'none'}
              alt='Tunbnail' />
            <img 
              ref={play} 
              className='play' 
              src={Play}
              onMouseEnter={() => play.current.style.display = 'block'}
              alt='play' />
          </Link>
          <p>Episode {number} </p>
      </article>
  );
}

export default Video;