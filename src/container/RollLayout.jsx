import './rollLayout.css'
import SelectLang from "../components/SelectLang/SelectLang";
import ListVocal from "../components/ListVocal/ListVocal";

function RollLayout({ __setLanguage, __setVocal, __dataList,__setMeaning }) {
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
            <ListVocal data={__dataList} />
            <button className="roll_layout_btn" onClick={() => handleRandom()}>
                Roll
            </button>
        </div>
    );
}

export default RollLayout;
