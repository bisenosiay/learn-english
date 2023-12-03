import { useEffect } from 'react';
import './boxVocal.css'

function BoxVocal({ __vocal, __setVocal, __language, __setDataList, __meaning, __setMeaning }) {

    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'r') {
                event.preventDefault();
                handleRemove()
            } else   if (event.key === 't') {
                event.preventDefault();
                __setMeaning(pre => !pre)
            } 
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const handleRemove = () => {
        const removeList = JSON.parse(localStorage.getItem("old"))
        if (removeList) {
            localStorage.setItem("old", JSON.stringify(removeList.concat(__vocal)))
        } else {
            localStorage.setItem("old", JSON.stringify([__vocal]))
        }
        __setDataList((old) => old.filter(e => e._id !== __vocal._id))
        __setVocal(null)
    }
    const handleKeyPress = (e) => {
        console.log(e.key)
    }
    return (
        <div className="box_vocal">
            <h4>{__vocal[__language]}</h4>
            {<span>{__vocal.type}</span>}
            {__language === 'en' && <a target='_blank' href={`https://dictionary.cambridge.org/vi/dictionary/english/${__vocal[__language]}`}>
                Cambridge
            </a>}
            {__meaning && <span>{__vocal[__language == "vi" ? "en" : "vi"]}</span>}
            <div>
                <button onClick={() => handleRemove()}>Xóa (R)</button>
                <button onClick={() => __setMeaning(pre => !pre)}>Dich (T)</button>
            </div>
        </div>
    );
}

export default BoxVocal;
