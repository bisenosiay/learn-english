import './listVocal.css'

function ListVocal({ data, language, onPick, activeId }) {
    if (!data.length) {
        return <p className="list-empty">No words in this view.</p>
    }

    return (
        <ul className="list_vocal">
            {data.map((vocal, index) => {
                const label = vocal[language] || "—"
                const active = activeId !== undefined && activeId !== null && String(vocal._id) === String(activeId)
                return (
                    <li key={vocal._id || `${label}-${index}`}>
                        <button
                            type="button"
                            className={active ? "is-active" : ""}
                            onClick={() => onPick(vocal)}
                        >
                            <span className="word">{label}</span>
                            {vocal.type ? <span className="type">{vocal.type}</span> : null}
                        </button>
                    </li>
                )
            })}
        </ul>
    );
}

export default ListVocal;
