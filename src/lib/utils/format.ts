import { ResourceMetadata } from '../../types';
import { getTranslation } from '../i18n';
import { Locale } from '../constants';

export function formatReference(metadata: ResourceMetadata, locale: Locale): string {
  const t = getTranslation(locale);
  const parts = [];

  if (metadata.book) {
    parts.push(`${t.search.book}: ${metadata.book}`);
  }
  if (metadata.chapter) {
    parts.push(`${t.search.chapter}: ${metadata.chapter}`);
  }
  if (metadata.verse) {
    parts.push(`${t.search.verse}: ${metadata.verse}`);
  }
  if (metadata.page) {
    parts.push(`${t.search.page}: ${metadata.page}`);
  }

  return parts.join(', ');
}