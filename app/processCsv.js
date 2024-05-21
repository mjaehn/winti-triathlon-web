import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';

export const processCsvFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    delimiter: ';',
    skip_empty_lines: true
  });
  return records;
};
