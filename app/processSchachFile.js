import fs from 'fs';

export const processSchachFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContent.split('\n');

  // Entferne leere Zeilen
  lines = lines.filter(line => line.trim() !== '');

  // Finde die Zeile, die mit "DDD" beginnt
  const startIndex = lines.findIndex(line => line.startsWith('DDD'));
  if (startIndex === -1) {
    throw new Error('Start line not found');
  }

  // Extrahiere die Datenzeilen
  const dataLines = lines.slice(startIndex + 1);

  const players = dataLines.map(line => {
    const name = line.slice(12, 46).trim();
    const rating = parseInt(line.slice(48, 52).trim(), 10);
    const federation = line.slice(53, 56).trim();
    
    const rounds = [
      line.slice(91, 99).trim(),
      line.slice(101, 109).trim(),
      line.slice(111, 119).trim(),
      line.slice(121, 129).trim(),
      line.slice(131, 139).trim(),
      line.slice(141, 149).trim(),
      line.slice(151, 159).trim(),
      line.slice(161, 169).trim(),
      line.slice(171, 179).trim(),
      line.slice(181, 189).trim(),
      line.slice(191, 199).trim(),
      line.slice(201, 209).trim(),
      line.slice(211, 219).trim()
    ];

    let points = 0;
    let wins = 0;
    let draws = 0;
    let losses = 0;

    rounds.forEach(round => {
      const result = round.split(' ')[2];
      if (result === '1') {
        points += 3;
        wins += 1;
      } else if (result === '=') {
        points += 1;
        draws += 1;
      } else if (result === '0') {
        losses += 1;
      }
    });

    return { name, rating, federation, points, wins, draws, losses };
  });

  return players;
};
