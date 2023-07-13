import { useEffect, useState } from 'react';
import './App.css';
import BoxVocal from './components/BoxVocal/BoxVocal';
import RollLayout from './container/RollLayout';
import { dataVI } from './data/vi';
import { dataEN } from './data/en';

function App() {
  const [_language, _setLanguage] = useState('vi')
  const [_vocal, _setVocal] = useState()
  const [_dataList, _setDataList] = useState([])

  useEffect(() => {
    const listRemove = JSON.parse(localStorage.getItem(_language))
    const dataFilter = _language === 'vi' ? dataVI : dataEN
    let dataList = []
    listRemove?.forEach(element => {
      dataList = dataFilter.filter(v => v.value !== element.value)
    })
    _setDataList(dataList.length === 0 ? dataFilter : dataList)

  }, [_language])

  return (
    <div className="App">
      <RollLayout
        __setLanguage={_setLanguage}
        __setVocal={_setVocal}
        __dataList={_dataList}
      />
      {_vocal?.value && <BoxVocal
        __language={_language}
        __vocal={_vocal}
        __setVocal={_setVocal}
        __setDataList={_setDataList}
      />}
    </div>
  );
}

export default App;
