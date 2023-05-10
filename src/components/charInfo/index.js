import './charInfo.scss';

import {Skeleton} from "../skeleton";

import {changeImageStyles} from "../charListItem";

export function CharInfo({
                             name,
                             description,
                             thumbnail,
                             homepage,
                             wiki,
                             comics
                         }) {

    const imgStyle = changeImageStyles(thumbnail);

    return (
        <div className="char__info">
            {
                (name === undefined)
                    ?
                    <Skeleton/>
                    :
                    <>
                        <div className="char__basics">
                            <img src={thumbnail} alt={name} style={imgStyle}/>
                            <div>
                                <div className="char__info-name">{name}</div>
                                <div className="char__btns">
                                    <a href={homepage} className="button button__main">
                                        <div className="inner">homepage</div>
                                    </a>
                                    <a href={wiki} className="button button__secondary">
                                        <div className="inner">Wiki</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="char__descr">
                            {description}
                        </div>
                        <div className="char__comics">Comics:</div>
                        <ul className="char__comics-list">
                            {comics.items.length > 0 ? null : 'There is no comics for this character yet.'}
                            {
                                comics.items.map((comic, i) => {
                                    if (i > 9) return;
                                    return (
                                        <li className="char__comics-item" key={i}>
                                            {comic.name}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </>
            }
        </div>
    );
}