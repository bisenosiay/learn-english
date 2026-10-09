import './rollLayout.css'
import SelectLang from "../components/SelectLang/SelectLang";
import ListVocal from "../components/ListVocal/ListVocal";
import BoxVocal from "../components/BoxVocal/BoxVocal";
import { useEffect, useRef, useState } from 'react';
import HeartFly from '../components/HeartFly/HeartFly';
import img1 from '../image/thuy-nga1.jpeg'
import img2 from '../image/thuy-nga2.jpeg'

function RollLayout({
    __setLanguage,
    __setVocal,
    __vocal,
    __dataList,
    __setDataList,
    __setMeaning,
    __meaning,
    __language,
    __url,
    __setUrl,
    __status,
    _SetDataSave,
    _restoreRemoved,
}) {
    const [query, setQuery] = useState("")
    const visibleRef = useRef([])
    const languageRef = useRef(__language)
    const setLanguageRef = useRef(__setLanguage)
    const setVocalRef = useRef(__setVocal)
    const setMeaningRef = useRef(__setMeaning)
    const lastIdRef = useRef(null)

    const needle = query.trim().toLowerCase()
    const visible = needle
        ? __dataList.filter((vocal) =>
            [vocal.en, vocal.vi, vocal.type].some((value) =>
                String(value || "").toLowerCase().includes(needle)
            )
        )
        : __dataList

    visibleRef.current = visible
    languageRef.current = __language
    setLanguageRef.current = __setLanguage
    setVocalRef.current = __setVocal
    setMeaningRef.current = __setMeaning

    const handleRandom = () => {
        const list = visibleRef.current
        if (!list.length) return

        let pool = list
        if (list.length > 1 && lastIdRef.current !== null) {
            const withoutLast = list.filter((word) => String(word._id) !== String(lastIdRef.current))
            if (withoutLast.length) pool = withoutLast
        }

        const pick = pool[Math.floor(Math.random() * pool.length)]
        lastIdRef.current = pick._id
        setVocalRef.current(pick)
        setMeaningRef.current(false)
    }

    const handlePick = (vocal) => {
        lastIdRef.current = vocal._id
        __setVocal(vocal)
        __setMeaning(false)
    }

    const loadSheet = () => {
        const next = __url.trim()
        if (next !== __url) __setUrl(next)
        _SetDataSave()
    }

    const saveSheet = () => {
        const next = __url.trim()
        __setUrl(next)
        localStorage.setItem("url", next)
        _SetDataSave()
    }

    useEffect(() => {
        const keyDownHandler = event => {
            const tag = event.target.tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return

            if (event.key === ' ') {
                if (event.target.closest && event.target.closest('button')) return
                event.preventDefault();
                handleRandom()
            } else if (event.key === '`') {
                event.preventDefault();
                setLanguageRef.current(languageRef.current === 'vi' ? 'en' : 'vi')
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const promptReady = Boolean(__vocal?.[__language])

    return (
        <>
            <section className="source-card">
                <label htmlFor="sheet-url">Google Sheets CSV</label>
                <div className="input-url">
                    <input
                        id="sheet-url"
                        type="url"
                        value={__url}
                        placeholder="Paste the published CSV link"
                        onChange={(e) => __setUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') loadSheet()
                        }}
                    />
                    <button type="button" onClick={loadSheet}>Load</button>
                    <button type="button" className="ghost" onClick={saveSheet}>Save</button>
                </div>
                <div className="source-notes">
                    <p className="source-help">File → Share → Publish to web → CSV, then paste that link.</p>
                    {__status && <p className="source-status" aria-live="polite">{__status}</p>}
                    <button type="button" className="text-btn" onClick={_restoreRemoved}>
                        Restore removed words
                    </button>
                </div>
            </section>

            <div className="roll_layout">
                <div className="toolbar">
                    <SelectLang language={__language} setLanguage={__setLanguage} />
                    <p className="list-meta">
                        {needle
                            ? `${visible.length} ${visible.length === 1 ? "match" : "matches"}`
                            : `${visible.length} ${visible.length === 1 ? "word" : "words"}`}
                    </p>
                </div>

                <input
                    className="search"
                    type="search"
                    value={query}
                    placeholder="Filter the list"
                    onChange={(e) => setQuery(e.target.value)}
                />

                <ListVocal
                    data={visible}
                    language={__language}
                    activeId={__vocal?._id}
                    onPick={handlePick}
                />

                <button
                    type="button"
                    className="roll_layout_btn"
                    onClick={handleRandom}
                    disabled={!visible.length}
                >
                    {needle ? "Roll a match" : "Roll a word"}
                    <kbd>Space</kbd>
                </button>
            </div>

            <section className="stage">
                <div className="portrait-frame">
                    <img src={img1} alt="" className="box_vocal_img_1" />
                    {/* <img src={img2} alt="" className="box_vocal_img_1" /> */}
                    <HeartFly />
                </div>
                {promptReady ? (
                    <BoxVocal
                        __language={__language}
                        __vocal={__vocal}
                        __setVocal={__setVocal}
                        __setDataList={__setDataList}
                        __setMeaning={__setMeaning}
                        __meaning={__meaning}
                        __onRoll={handleRandom}
                    />
                ) : (
                    <div className="stage-empty">
                        <p className="eyebrow">Practice</p>
                        <h2>Draw a word and say the other language.</h2>
                        <p>
                            The list follows the language you pick. Roll hides the translation until you reveal it.
                            Click any row to practice that word.
                        </p>
                        <ul className="shortcut-list">
                            <li><kbd>Space</kbd> Roll</li>
                            <li><kbd className="key-grave">`</kbd> Switch language</li>
                            <li><kbd>T</kbd> Reveal</li>
                            <li><kbd>R</kbd> Remove</li>
                        </ul>
                    </div>
                )}
            </section>
        </>
    );
}

export default RollLayout;
