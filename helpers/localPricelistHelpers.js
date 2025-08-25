const XLSX = require('xlsx');
const path = require('path');

exports.loadLocalPricelist = () => {
  try {
    const filePath = path.resolve(__dirname, '..', 'data', 'cennik.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } catch (err) {
    console.error('Błąd podczas ładowania lokalnego cennika:', err.message);
    throw err;
  }
};