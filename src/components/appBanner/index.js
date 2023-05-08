import './appBanner.scss';

import avengers from '/src/resources/img/Avengers.png';
import avengersLogo from '/src/resources/img/Avengers_logo.png';

export function AppBanner() {
    return (
        <div className="app__banner">
            <img src={avengers} alt="Avengers"/>
            <div className="app__banner-text">
                New comics every week! <br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo"/>
        </div>
    );
}