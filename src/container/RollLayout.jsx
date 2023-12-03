import './rollLayout.css'
import SelectLang from "../components/SelectLang/SelectLang";
import ListVocal from "../components/ListVocal/ListVocal";
import { useEffect } from 'react';

function RollLayout({ __setLanguage, __setVocal, __dataList,__setMeaning,__language }) {
    useEffect(() => {
        const keyDownHandler = event => { 
            if (event.key === ' ') {
                event.preventDefault();
                handleRandom()   
            } else if (event.key === '`'){
                __setLanguage(pre => pre === 'vi'?'en':'vi')
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    const handleRandom = () => {
        const min = 0;
        const max = __dataList.length - 1;
        const rand = min + Math.random() * (max - min);
        __setVocal(__dataList[rand.toFixed()])
        __setMeaning(false)
    }
    return (
        <div className="roll_layout">
            <SelectLang setLanguage={__setLanguage} />
            <ListVocal data={__dataList} ____language={__language}/>
            <button className="roll_layout_btn" onClick={() => handleRandom()}>
                Roll (space)
            </button>
        </div>
    );
}

export default RollLayout;
