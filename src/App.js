import { useEffect, useRef, useState } from 'react';
import './App.css';
import BoxVocal from './components/BoxVocal/BoxVocal';
import RollLayout from './container/RollLayout';
import CalcFood from './container/Calc/Calc';
import axios from 'axios';
import { parseCSV } from './utils/common';

function App() {
  const [_language, _setLanguage] = useState('vi')
  const [_vocal, _setVocal] = useState()
  const [_dataList, _setDataList] = useState([])
  const [_meaning, _setMeaning] = useState(false)
  const [_url, _setUrl] = useState('')

  const fetchData = () => {
    const url = _url || localStorage.getItem("url") || ''
    axios.get(url).then(res => {
      const parsedCsvData = parseCSV(res.data);
      _setDataList(parsedCsvData);
    }).catch(err => {
      console.log(err)
    })
  }

  const removeDataSave = () => {
    const listRemove = JSON.parse(localStorage.getItem("old"))
    let dataList = _dataList.filter(v => !listRemove?.some(e => e._id == v._id))
    _setDataList(dataList)
  }

  const SetDataSave = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
    removeDataSave()
  }, [])

  return (
    <div className="App">
      <RollLayout
        __setLanguage={_setLanguage}
        __language={_language}
        __setVocal={_setVocal}
        __dataList={_dataList}
        __setMeaning={_setMeaning}
        __url={_url}
        __setUrl={_setUrl}
        _SetDataSave={SetDataSave}
      />
      {_vocal?.[_language] && <BoxVocal
        __language={_language}
        __vocal={_vocal}
        __setVocal={_setVocal}
        __setDataList={_setDataList}
        __setMeaning={_setMeaning}
        __meaning={_meaning}
      />}
      <CalcFood />
    </div>
  );
}

export default App;
