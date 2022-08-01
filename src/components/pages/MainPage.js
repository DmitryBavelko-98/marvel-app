import { lazy, Suspense, useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import Spinner from "../spinner/Spinner";

import decoration from '../../resources/img/vision.png';

const CharInfo = lazy(() => import('../charInfo/CharInfo'));

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <Suspense fallback={<Spinner/>}>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </Suspense>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;