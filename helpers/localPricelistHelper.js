import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadLocalPricelist(fileName) {
  try {
    const filePath = path.resolve(__dirname, '..', 'data', `${fileName}.xlsx`);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } catch (err) {
    console.error('Błąd podczas ładowania lokalnego cennika:', err.message);
    throw err;
  }
};