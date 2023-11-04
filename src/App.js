import { useEffect, useRef, useState } from 'react';
import './App.css';
import BoxVocal from './components/BoxVocal/BoxVocal';
import RollLayout from './container/RollLayout';
import { dataEN } from './data/en';
import usePrevious from "./hook/usePrevious";

function App() {
  const [_language, _setLanguage] = useState('vi')
  const [_vocal, _setVocal] = useState()
  const [_dataList, _setDataList] = useState([])
  const [_meaning,_setMeaning] = useState(false)

  useEffect(() => {
    const listRemove = JSON.parse(localStorage.getItem("old"))
    const dataFilter = dataEN
    let dataList = []
    listRemove?.forEach(element => {
      dataList = dataFilter.filter(v => v._id !== element._id)
    })
    _setDataList(dataList.length === 0 ? dataFilter : dataList)

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
    </div>
  );
}

export default App;
