import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import LoadingImage from '../../assets/AL.png';

const Card = ({ atributes, id, manga }) => {

    return (
       <section className='card'>
            <Link 
                to={manga ? '/': `/anime/${id}`}
                className='link-content'>
                <img 
                    src={atributes.posterImage.small != null ? atributes.posterImage.small: LoadingImage}
                    alt={atributes.canonicalTitle} 
                    className='image' />
                <p>{atributes.canonicalTitle}</p>
            </Link> 
       </section>
    );
}

export default Card;