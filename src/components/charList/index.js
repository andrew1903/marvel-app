import './charList.scss';

import {CharListItem} from "../charListItem";
import {Spinner} from "../spinner";

export function CharList({
                             characters,
                             onClickMore,
                             ready
                         }) {

    const loadChars = () => {
        return characters.map((char) =>
            <CharListItem
                key={char.id}
                thumbnail={char.thumbnail}
                name={char.name}
            />
        )
    }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {loadChars()}
            </ul>
            <br/>

            {
                ready ? null
                    :
                    <Spinner
                        width={'50px'}
                        height={'50px'}
                    />
            }


            <button className="button button__main button__long" onClick={onClickMore}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}