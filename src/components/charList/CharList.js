import { Component } from 'react/cjs/react.production.min';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.setCharacters)
            .catch(this.onError);
    }

    setCharacters = (res) => {
        this.setState({
            characters: [...res],
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems = (arr) => {
        const items = arr.map(item => {
            const {id, name, thumbnail} = item;

            let styles = {};

            if (thumbnail.includes('not_available')) {
                styles = {objectFit: 'unset'}
            } 

            return (         
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
                    <img style={styles} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            );
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {characters, loading, error} = this.state;

        let cards = this.renderItems(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? cards : null; 

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;