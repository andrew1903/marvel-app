import React from "react";

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

export function RandomChar({
                               name,
                               description,
                               thumbnail,
                               homepage,
                               wiki,
                               onClick
                           }) {

    function truncate(str, n, useWordBoundary) {
        if (str.length === 0) {
            return 'There is no description for this character yet.';
        } else if (str.length <= n) {
            return str;
        }
        const subString = str.slice(0, n - 1);
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + '...';
    }

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {truncate(description, 213, true)}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={onClick}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}