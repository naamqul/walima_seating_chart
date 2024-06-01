import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seatingData, setSeatingData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('seating_chart.json')
      .then(response => response.json())
      .then(data => setSeatingData(data))
      .catch(error => console.error('Error loading seating chart:', error));
  }, []);

  const filterSeatingChart = (query) => {
    setSearchQuery(query);
  };

  const getFilteredData = () => {
    if (!searchQuery) return seatingData;

    const filteredData = {};
    Object.entries(seatingData).forEach(([table, guests]) => {
      if (guests.some(guest => guest.toLowerCase().includes(searchQuery.toLowerCase()))) {
        filteredData[table] = guests;
      }
    });

    return filteredData;
  };

  const filteredData = getFilteredData();

  return (
    <div className="App">
      <h1>&#129333;&#8205;&#9794;&#65039; Walima Seating Chart &#128112;&#8205;&#9792;&#65039;</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for your name here to find your table..."
          value={searchQuery}
          onChange={e => filterSeatingChart(e.target.value)}
        />
      </div>
      <div className="seating-chart">
        {Object.entries(filteredData).map(([table, guests]) => (
          <div className="table" key={table}>
            <h2>{table}</h2>
            <ul className="guest-list">
              {guests.map((guest, index) => (
                <li key={index} className="guest-item">{`${index + 1}. ${guest}`}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
