import './charItem.scss';

const CharItem = (props) => {
    const {name, thumbnail} = props;

    let styles = {};

    if (thumbnail.includes('not_available')) {
        styles = {objectFit: 'unset'}
    } 

    return (
        <li className="char__item">
            <img style={styles} src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    );
}

export default CharItem;