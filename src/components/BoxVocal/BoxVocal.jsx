import './boxVocal.css'

function BoxVocal({ __vocal, __setVocal, __language, __setDataList }) {
    const handleRemove = () => {
        const removeList = JSON.parse(localStorage.getItem(__language))
        if (removeList) {
            localStorage.setItem(__language, JSON.stringify(removeList.concat(__vocal)))
        } else {
            localStorage.setItem(__language, JSON.stringify([__vocal]))
        }
        __setDataList((old) => old.filter(e => e.value !== __vocal.value))
        __setVocal(null)
    }
    return (
        <div className="box_vocal">
            <h4>{__vocal.value}</h4>
            {__language === 'en' && <span>{__vocal.type}</span>}
            {__language === 'en' && <a target='_blank' href={`https://dictionary.cambridge.org/vi/dictionary/english/${__vocal.value}`}>
                Cambridge
            </a>}
            <button onClick={() => handleRemove()}>Xóa</button>
        </div>
    );
}

export default BoxVocal;
