import React from "react";

import {AppHeader} from "../appHeader";
import {RandomChar} from "../randomChar";
import {CharList} from "../charList";
import {CharInfo} from "../charInfo";
import {Spinner} from "../spinner";

import decoration from '../../resources/img/vision.png';
import {MarvelService} from "../../services/MarvelService";

export function App() {
    const marvelService = new MarvelService();
    const [isReady, setIsReady] = React.useState(false);
    const [randomChar, setRandomChar] = React.useState({});
    const [randomCharId, setRandomCharId] = React.useState(getRandomNumber());

    const [index, setIndex] = React.useState(0);
    const [characters, setCharacters] = React.useState([]);
    const [isMoreReady, setIsMoreReady] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            await marvelService.getCharacterById(randomCharId)
                .then(res => {
                    setRandomChar(res);
                });
        }

        fetchData()
            .catch(error => console.error(error));

    }, [randomCharId]);

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

    function getRandomNumber() {
        return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    }

    const getRandomChar = () => {
        setRandomCharId(getRandomNumber());
    }

    const loadMore = () => {
        setIndex(prev => prev + 9);
    }

    return (
        <div className="app">

            <main>
                {isReady
                    ?
                    <>
                        <AppHeader/>

                        <RandomChar
                            {...randomChar}
                            onClick={getRandomChar}
                        />

                        <div className="char__content">
                            <CharList
                                characters={characters}
                                onClickMore={loadMore}
                                ready={isMoreReady}
                            />
                            <CharInfo/>
                        </div>

                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </>
                    :
                    <Spinner/>
                }

            </main>
        </div>
    );
}
