import { useEffect, useState } from 'react';
import './App.css';
import RollLayout from './container/RollLayout';
import axios from 'axios';
import { parseCSV } from './utils/common';

const DEFAULT_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxibTyi80mProFDfIiIBh2kpFzntDLrgQIuhnF8h9wp-Q-o6It4UhVvj_xX8crETZJuXSQvWTTxiaD/pub?output=csv"

function readRemoved() {
  try {
    const saved = JSON.parse(localStorage.getItem("old"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function App() {
  const [_language, _setLanguage] = useState('vi')
  const [_vocal, _setVocal] = useState()
  const [_dataList, _setDataList] = useState([])
  const [_meaning, _setMeaning] = useState(false)
  const [_url, _setUrl] = useState(() => localStorage.getItem("url") || DEFAULT_SHEET_URL)
  const [_status, _setStatus] = useState('')

  const fetchData = () => {
    const url = (_url || localStorage.getItem("url") || DEFAULT_SHEET_URL).trim()
    if (!url) {
      _setStatus('Add a published Google Sheets CSV link to load your vocabulary.')
      return
    }
    _setStatus('Loading words…')
    axios.get(url).then(res => {
      const parsedCsvData = parseCSV(res.data).filter(row => row && (row.en || row.vi))
      const removed = readRemoved()
      const dataList = parsedCsvData.filter(v => !removed.some(e => String(e._id) === String(v._id)))
      _setDataList(dataList)
      _setVocal(current => (current && dataList.some(v => String(v._id) === String(current._id)) ? current : null))
      _setStatus(dataList.length
        ? 'Sheet loaded.'
        : 'The sheet loaded, but no vocabulary rows were found.')
    }).catch(() => {
      _setStatus('That link could not be loaded. Use a CSV link from a published Google Sheet.')
    })
  }

  const restoreRemoved = () => {
    localStorage.removeItem("old")
    fetchData()
  }

  useEffect(() => {
    fetchData()
    // Load once from the saved sheet link. Later loads come from the buttons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="app-header">
        <div>
          <p className="eyebrow">Vocabulary practice</p>
          <h1>Learn English</h1>
        </div>
        <p className="app-count">{_dataList.length} in the deck</p>
      </header>
      <main className="app-main">
        <RollLayout
          __setLanguage={_setLanguage}
          __language={_language}
          __setVocal={_setVocal}
          __vocal={_vocal}
          __dataList={_dataList}
          __setDataList={_setDataList}
          __setMeaning={_setMeaning}
          __meaning={_meaning}
          __url={_url}
          __setUrl={_setUrl}
          __status={_status}
          _SetDataSave={fetchData}
          _restoreRemoved={restoreRemoved}
        />
      </main>
    </div>
  );
}

export default App;
