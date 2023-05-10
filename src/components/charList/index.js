import './charList.scss';

import {Spinner} from "../spinner";
import {CharListItem} from "../charListItem";
import React, {useContext, useState} from "react";
import {AppContext} from "../app/app";

export function CharList() {

    const { marvelService, setSelectedChar } = useContext(AppContext);

    const [index, setIndex] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [isMoreReady, setIsMoreReady] = useState(false);

    const loadMore = () => {
        setIndex(prev => prev + 9);
    }

    const selectChar = (id) => {
        setSelectedChar(marvelService.getCharById(characters, id));
    }

    React.useEffect(() => {
        async function fetchData() {

            setIsMoreReady(false);
            await marvelService.getAllCharactersWithOffset(index)
                .then(res => {
                    setIsReady(true);
                    setIsMoreReady(true);
                    setCharacters(prev => [...prev, ...res]);
                });
        }

        fetchData()
            .catch(error => console.error(error));

    }, [index]);

    return (
        <div className="char__list">
            {isReady
                ?
                <>
                    <ul className="char__grid">
                        {characters.map((char) =>
                            <CharListItem
                                key={char.id}
                                id={char.id}
                                thumbnail={char.thumbnail}
                                name={char.name}
                                onCLick={selectChar}
                            />
                        )}
                    </ul>
                    <br/>

                    {
                        isMoreReady ? null
                            :
                            <Spinner
                                width={'50px'}
                                height={'50px'}
                            />
                    }

                    <button className="button button__main button__long" onClick={loadMore}>
                        <div className="inner">load more</div>
                    </button>
                </>
                :
                <Spinner/>
            }
        </div>
    );
}