import './randomChar.scss';

import {AppContext} from "../app/app";

import React, {useContext, useState} from "react";

import {Spinner} from "../spinner";
import {ErrorMessage} from "../errorMessage";
import {changeImageStyles} from "../charListItem";

import mjolnir from '../../resources/img/mjolnir.png';

export function RandomChar() {

    const {marvelService} = useContext(AppContext);

    const [error, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [randomChar, setRandomChar] = useState({});
    const [randomCharId, setRandomCharId] = useState(getRandomNumber());

    function getRandomNumber() {
        return Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    }

    const getRandomChar = () => {
        setRandomCharId(getRandomNumber());
    }

    const imgStyle = changeImageStyles(randomChar.thumbnail);

    const truncate = (str, n, useWordBoundary) => {
        if (str.length <= n) {
            return str;
        }
        const subString = str.slice(0, n - 1);
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + '...';
    }

    React.useEffect(() => {
        async function fetchData() {

            setIsLoading(true);
            await marvelService.getCharacterById(getRandomNumber())
                .then(res => {
                    setHasError(false);
                    setRandomChar(res);
                })
                .catch(() => {
                    setHasError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        fetchData()
            .catch(error => console.error(error));

    }, [randomCharId]);

    return (
        <div className="randomchar">
            {
                isLoading
                    ?
                    <Spinner
                        width={'100px'}
                        height={'100px'}
                    />
                    :
                    <>
                        {
                            error
                                ?
                                <ErrorMessage/>
                                :
                                <div className="randomchar__block">
                                    <img src={randomChar.thumbnail} alt="Random character" className="randomchar__img"
                                         style={imgStyle}/>
                                    <div className="randomchar__info">
                                        <p className="randomchar__name">{randomChar.name}</p>
                                        <p className="randomchar__descr">
                                            {truncate(randomChar.description, 213, true)}
                                        </p>
                                        <div className="randomchar__btns">
                                            <a href={randomChar.homepage} className="button button__main">
                                                <div className="inner">homepage</div>
                                            </a>
                                            <a href={randomChar.wiki} className="button button__secondary">
                                                <div className="inner">Wiki</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        }
                    </>
            }


            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={getRandomChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}