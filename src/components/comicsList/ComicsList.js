import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);
 
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8)
        setComicsEnded(ended);
    }

    const renderComics = (arr) => {
       const items = arr.map((item, i) => {
            const {id, thumbnail, title, price} = item;

            return (
                <CSSTransition key={i} timeout={300} classNames={'comics__item'}>
                    <li className="comics__item" tabIndex={0}>
                        <Link to={`/marvel-app/comics/${id}`}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">${title}</div>
                            <div className="comics__item-price">${price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
       })

       return (
        <ul className="comics__grid">
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        </ul>
       )
    }   

    let comics = renderComics(comicsList);

    let errorMessage = error ? <ErrorMessage/> : null;
    let spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comics}
            <button 
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;