'use client';

import { useEffect, useState } from 'react';

type DataRow = {
  name: string;
  rating: number;
  federation: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
};

export default function Home() {
  const [data, setData] = useState<DataRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setError('Invalid data format');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, []);

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Schachturnier Rangliste</h1>
      <Table data={data} />
    </div>
  );
}

function Table({ data }: { data: DataRow[] }) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Rang</th>
          <th>Name</th>
          <th>Rating</th>
          <th>Föderation</th>
          <th>Punkte</th>
          <th>Siege</th>
          <th>Remis</th>
          <th>Niederlagen</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.rating}</td>
            <td>{row.federation}</td>
            <td>{row.points}</td>
            <td>{row.wins}</td>
            <td>{row.draws}</td>
            <td>{row.losses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
