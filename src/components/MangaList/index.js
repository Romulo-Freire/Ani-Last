import React, { useState, useEffect, useRef } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import api from '../../services/api';

import './styles.css';

import Card from '../Card';

function MangaList() {

  const listRef = useRef(null);

  const [mangas, setMangas] = useState([]);
  const [linksPages, setLinksPages] = useState('');
  const [page, setPage] = useState(10);

  useEffect(() => {
    load();
  },[]);

  async function load(){
    const response = await api.get('/manga');
    const { data, links } = response.data;
    setMangas(data);
    setLinksPages(links);
  }

  async function loadNextPage(){
    const response = await api.get(`/manga?page%5Blimit%5D=10&page%5Boffset%5D=${page}`);
    const { data, links } = response.data;
    setMangas([...mangas, ...data]);
    setLinksPages(links);
  }

  function handleScrollListNext(){
    listRef.current.scrollLeft += 200;
    if(listRef.current.scrollLeft%360 === 0 ){
      setPage(page + 10);
      loadNextPage();
    }
  }

  function handleScrollListPrev(){
    listRef.current.scrollLeft -= 200;   
  }

  return (
      <div className='manga-view'>
        <button
          onClick={handleScrollListPrev}
        >
          <GrPrevious size={30} color={'#fff'}/>
        </button>
        <ul 
          ref={listRef}
          className="list-mangas"
        >
            {
              mangas.map( manga => (
                <li key={manga.id}>
                  <Card
                    key={manga.id}  
                    id={manga.id} 
                    atributes={manga.attributes}
                    manga={true}
                  />
                </li>
              ))
            }
        </ul>
        <button
          onClick={handleScrollListNext}
        >
          <GrNext size={30} color={'#fff'} />
        </button>
      </div>
  );
}

export default MangaList;