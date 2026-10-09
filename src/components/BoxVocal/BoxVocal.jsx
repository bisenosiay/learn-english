import { useEffect, useRef } from 'react';
import './boxVocal.css'


function BoxVocal({ __vocal, __setVocal, __setDataList, __language, __meaning, __setMeaning, __onRoll }) {
    const vocalRef = useRef(__vocal)
    const setVocalRef = useRef(__setVocal)
    const setDataListRef = useRef(__setDataList)
    const setMeaningRef = useRef(__setMeaning)
    vocalRef.current = __vocal
    setVocalRef.current = __setVocal
    setDataListRef.current = __setDataList
    setMeaningRef.current = __setMeaning

    const handleRemove = () => {
        const current = vocalRef.current
        if (!current) return
        let removed = []
        try {
            const saved = JSON.parse(localStorage.getItem("old"))
            if (Array.isArray(saved)) removed = saved
        } catch (error) {
            removed = []
        }
        localStorage.setItem("old", JSON.stringify(removed.concat(current)))
        setDataListRef.current((old) => old.filter((word) => String(word._id) !== String(current._id)))
        setVocalRef.current(null)
    }

    useEffect(() => {
        const keyDownHandler = event => {
            const tag = event.target.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return

            if (event.key === 'r' || event.key === 'R') {
                event.preventDefault();
                handleRemove()
            } else if (event.key === 't' || event.key === 'T') {
                event.preventDefault();
                setMeaningRef.current(pre => !pre)
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const answer = __vocal[__language === "vi" ? "en" : "vi"]
    const prompt = __language === "vi" ? "Say it in English" : "What does this mean?"
    const cambridgeWord = __vocal.en || __vocal[__language]

    return (
        <div className="box_vocal">
            <p className="box_kicker">{prompt}</p>
            <h2>{__vocal[__language]}</h2>
            {__vocal.type ? <span className="pos">{__vocal.type}</span> : <span className="pos pos-empty">No word type</span>}
            <div className={__meaning ? "meaning is-open" : "meaning"}>
                {__meaning ? (
                    <p>{answer || "No translation in this row."}</p>
                ) : (
                    <p className="hint">Think first, then reveal the answer.</p>
                )}
            </div>
            {__language === 'en' && cambridgeWord && (
                <a
                    className="dictionary-link"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://dictionary.cambridge.org/vi/dictionary/english/${encodeURIComponent(cambridgeWord)}`}
                >
                    Open in Cambridge
                </a>
            )}
            <div className="box_actions">
                <button type="button" className="primary" onClick={() => __setMeaning(pre => !pre)}>
                    {__meaning ? "Hide" : "Reveal"} <kbd>T</kbd>
                </button>
                <button type="button" onClick={__onRoll}>
                    Next <kbd>Space</kbd>
                </button>
                <button type="button" className="danger" onClick={handleRemove}>
                    Remove <kbd>R</kbd>
                </button>
            </div>
        </div>
    );
}

export default BoxVocal;
