import React, { useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleTap = async () => {
    const response = await fetch('http://localhost:3001/tap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    setMessage(data.status);
  };

  return (
    <div className="App">
      <h1>Tap, Track, Win</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleTap}>Tap</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
