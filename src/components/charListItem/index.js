import React from "react";

import { AppContext } from "../app/app";

export function changeImageStyles(thumbnail) {
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return imgStyle;
}

export function CharListItem({
                                 id,
                                 thumbnail,
                                 name,
                                 onCLick
                             }) {

    const imgStyle = changeImageStyles(thumbnail);

    const { selectedChar } = React.useContext(AppContext);
    const isSelected = selectedChar.id === id;

    const classes = 'char__item' + (isSelected ? ' char__item_selected' : '');

    return (
        <li className={classes} onClick={() => onCLick(id)}>
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    );
}