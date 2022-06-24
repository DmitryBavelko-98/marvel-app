import { Component } from 'react/cjs/react.production.min';

import './charList.scss';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        characters: []
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacters();
    }

    setCharacters = (res) => {
        this.setState({
            characters: [...res]
        })
    }

    updateCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(res => this.setCharacters(res));
    }

    renderItems = (items) => {
        let cards = items.map(item => {
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
                {cards}
            </ul>
        )
    }

    render() {
        const {characters} = this.state;

        let cards = this.renderItems(characters);

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {cards}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;