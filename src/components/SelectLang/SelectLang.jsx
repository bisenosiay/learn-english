import './selectLang.css'

function SelectLang({ setLanguage }) {
    return ( 
        <div className="select_lang">
            <h4>Chọn ngôn ngữ (`)</h4>

            <div>
                <input type="radio" name="fav_language" value="vi" onChange={(e)=> setLanguage(e.target.value)}/>
                <label for="vi">VI</label>
            </div>
            <div>
                <input type="radio" name="fav_language" value="en" onChange={(e)=> setLanguage(e.target.value)}/>
                <label for="en">EN</label>
            </div>

        </div>
    );
}

export default SelectLang;
