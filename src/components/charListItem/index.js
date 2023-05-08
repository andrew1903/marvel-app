import abyss from "../../resources/img/abyss.jpg";

export function CharListItem({
                                 thumbnail,
                                 name
                             }) {
    return (
        <li className="char__item">
            <img src={thumbnail} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    );
}