import './selectLang.css'

function SelectLang({ language, setLanguage }) {
    return (
        <div className="select_lang" role="group" aria-label="Prompt language">
            <span className="select_lang_label">Language</span>
            <div className="lang-switch">
                <button
                    type="button"
                    className={language === "vi" ? "is-on" : ""}
                    aria-pressed={language === "vi"}
                    onClick={() => setLanguage("vi")}
                >
                    VI
                </button>
                <button
                    type="button"
                    className={language === "en" ? "is-on" : ""}
                    aria-pressed={language === "en"}
                    onClick={() => setLanguage("en")}
                >
                    EN
                </button>
            </div>
        </div>
    );
}

export default SelectLang;
