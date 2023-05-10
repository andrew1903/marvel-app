import React, {createContext, useState} from 'react';

import {CharList} from "../charList";
import {CharInfo} from "../charInfo";
import {AppHeader} from "../appHeader";
import {RandomChar} from "../randomChar";

import decoration from '../../resources/img/vision.png';

import {MarvelService} from "../../services/MarvelService";

export const AppContext = createContext({});

export function App() {
    const marvelService = new MarvelService();

    const [selectedChar, setSelectedChar] = useState({});

    return (
        <AppContext.Provider value={{selectedChar, setSelectedChar, marvelService}}>
            <div className="app">

                <main>
                    <AppHeader/>

                    <RandomChar/>

                    <div className="char__content">
                        <CharList/>

                        <CharInfo {...selectedChar}/>
                    </div>

                    <img className="bg-decoration" src={decoration} alt="vision"/>

                </main>
            </div>
        </AppContext.Provider>
    );
}
