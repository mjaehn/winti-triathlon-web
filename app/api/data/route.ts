import { NextResponse } from 'next/server';
import { processCsvFile } from '@/app/processCsv';
import path from 'path';
import fs from 'fs'; // fs hinzufügen

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'file.txt'); // Pfad zu deiner CSV-Datei
  console.log('File path:', filePath);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  let data;
  try {
    data = processCsvFile(filePath);
    console.log('Processed data:', data); // Debugging-Zeile hinzufügen
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }

  return NextResponse.json(data);
}
