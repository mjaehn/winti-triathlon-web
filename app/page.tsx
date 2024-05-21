'use client';

import { useEffect, useState } from 'react';

type DataRow = {
  [key: string]: any;
};

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        // Sortiere die Daten nach der Spalte "Rg."
        const sortedData = data.sort((a: DataRow, b: DataRow) => {
          return a['Rang'] - b['Rang'];
        });
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">CSV-Daten</h1>
      <Table data={data} />
    </div>
  );
}

function Table({ data }: { data: DataRow[] }) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  // Definiere die Spalten, die du anzeigen möchtest
  const columnsToDisplay = ['Rang', 'Nachname', 'Vorname', 'EloInt', 'Fed', 'Pkt', 'Wtg1'];

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columnsToDisplay.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columnsToDisplay.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
