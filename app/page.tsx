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
        setData(data);
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
    return <p>Tabelle wird geladen ...</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map(header => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
