import { useEffect, useRef, useState } from 'react';
import './App.css';
import BoxVocal from './components/BoxVocal/BoxVocal';
import RollLayout from './container/RollLayout';
import { dataEN } from './data/en';
import usePrevious from "./hook/usePrevious";
import CalcFood from './container/Calc/Calc';

function App() {
  const [_language, _setLanguage] = useState('vi')
  const [_vocal, _setVocal] = useState()
  const [_dataList, _setDataList] = useState([])
  const [_meaning,_setMeaning] = useState(false)

  useEffect(() => {
    const listRemove = JSON.parse(localStorage.getItem("old"))
    const dataFilter = dataEN
    let dataList = []

    dataList = dataFilter.filter(v=> !listRemove?.some(e=>e._id==v._id))
    _setDataList(dataList)

  }, [])

  return (
    <div className="App">
      <RollLayout
        __setLanguage={_setLanguage}
        __language={_language}
        __setVocal={_setVocal}
        __dataList={_dataList}
        __setMeaning={_setMeaning}
      />
      {_vocal?.[_language] && <BoxVocal
        __language={_language}
        __vocal={_vocal}
        __setVocal={_setVocal}
        __setDataList={_setDataList}
        __setMeaning={_setMeaning}
        __meaning={_meaning}
      />}
      <CalcFood/>
    </div>
  );
}

export default App;
