import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

export function initializeSearchIndex(verses) {
  verses.forEach(verse => {
    const tokens = tokenizer.tokenize(verse.translation.toLowerCase());
    tfidf.addDocument(tokens);
  });
  return tfidf;
}

export function searchVerses(query, verses, tfidf) {
  const searchTerms = tokenizer.tokenize(query.toLowerCase());
  
  const scores = verses.map((verse, index) => ({
    verse,
    score: searchTerms.reduce((sum, term) => sum + tfidf.tfidf(term, index), 0)
  }));
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}