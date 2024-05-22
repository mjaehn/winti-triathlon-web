import { NextResponse } from 'next/server';
import { processSchachFile } from '@/app/processSchachFile';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'file.txt');

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  let data;
  try {
    data = processSchachFile(filePath);
    console.log(data)
    // Sortiere die Daten nach der Punktzahl
    data.sort((a, b) => b.points - a.points);
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 });
  }

  return NextResponse.json(data);
}
