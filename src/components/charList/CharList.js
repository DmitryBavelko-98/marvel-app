import { Component } from 'react/cjs/react.production.min';

import './charList.scss';
import CharItem from '../charItem/CharItem'
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

    render() {
        const {characters} = this.state;
        let cards = characters.map(char => {
            const {id, name, thumbnail} = char;
            return (
                <CharItem 
                    key={id}
                    name={name} 
                    thumbnail={thumbnail}/>
            );
        })

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