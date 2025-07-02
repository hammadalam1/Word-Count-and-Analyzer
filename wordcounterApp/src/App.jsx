import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const getWordCount = () => (text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
  const getSentenceCount = () => {
    const matches = text.match(/[^.!?]+[.!?]*/g);
    return matches ? matches.filter(s => s.trim().length > 0).length : 0;
  };
  const getCharCount = () => text.length;
  const getReadingTime = () => (getWordCount() / 200).toFixed(2); // 200 words/min

  const handleReset = () => setText('');
  const toggleMode = () => setDarkMode(!darkMode);

  const exportToFile = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const anchor = document.createElement('a');
    anchor.download = 'text.txt';
    anchor.href = URL.createObjectURL(blob);
    anchor.click();
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="card">
        <div className="header">
          <h1>Word & Text Analyzer</h1>
          <button className="mode-btn" onClick={toggleMode}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <textarea
          className="textarea"
          value={text}
          onChange={handleChange}
          placeholder="Type or paste your text here..."
        />
        <div className="stats-grid">
          <div className="stat-box"><h3>Words</h3><p>{getWordCount()}</p></div>
          <div className="stat-box"><h3>Sentences</h3><p>{getSentenceCount()}</p></div>
          <div className="stat-box"><h3>Characters</h3><p>{getCharCount()}</p></div>
          <div className="stat-box"><h3>Reading Time</h3><p>{getReadingTime()} min</p></div>
        </div>
        <div className="btn-group">
          <button className="reset-btn" onClick={handleReset}>Reset</button>
          <button className="export-btn" onClick={exportToFile}>Export as .txt</button>
        </div>
      </div>
    </div>
  );
}

export default App;
