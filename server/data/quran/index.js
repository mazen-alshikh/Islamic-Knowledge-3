import fetch from 'node-fetch';

const BASE_URL = 'https://raw.githubusercontent.com/semarketir/quranjson/master/source';

async function fetchJson(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }
  return response.json();
}

export async function loadQuranData() {
  try {
    // Fetch surah list
    const surahList = await fetchJson('/surah.json');
    const verses = [];
    
    // Fetch all surahs
    for (let i = 1; i <= 114; i++) {
      console.log(`Fetching surah ${i}...`);
      const surahData = await fetchJson(`/surah/${i}.json`);
      
      const surah = surahList.find(s => s.index === i);
      if (!surah) continue;
      
      verses.push(...surahData.verse.map(verse => ({
        id: `${i}:${verse.index}`,
        chapter_number: i,
        verse_number: verse.index,
        text_arabic: verse.text,
        translation: verse.translation,
        footnotes: verse.footnotes || [],
        surah_name: surah.title,
        juz: verse.juz,
        page: verse.page
      })));
    }
    
    return verses;
  } catch (error) {
    console.error('Error loading Quran data:', error);
    throw new Error('Failed to load Quran dataset');
  }
}