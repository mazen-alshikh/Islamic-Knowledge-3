import * as XLSX from 'xlsx';
import { ResourceMetadata } from '../../types';

interface ExcelRow {
  chapter?: number;
  verse?: number;
  text?: string;
  translation?: string;
  book?: string;
  page?: number;
}

export async function parseExcelFile(file: File): Promise<ExcelRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet) as ExcelRow[];
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

export function validateExcelData(data: ExcelRow[], type: string): boolean {
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  const requiredFields = {
    quran: ['chapter', 'verse', 'text', 'translation'],
    hadith: ['book', 'text', 'translation'],
    tafsir: ['chapter', 'verse', 'text'],
    fiqh: ['book', 'text'],
  }[type] || [];

  return data.every(row => 
    requiredFields.every(field => 
      Object.prototype.hasOwnProperty.call(row, field) && 
      row[field] !== undefined && 
      row[field] !== null && 
      row[field] !== ''
    )
  );
}

export function formatExcelData(data: ExcelRow[], type: string): any[] {
  return data.map(row => ({
    ...row,
    metadata: {
      chapter: row.chapter,
      verse: row.verse,
      book: row.book,
      page: row.page,
    },
    content: JSON.stringify({
      text: row.text,
      translation: row.translation,
    }),
  }));
}