import { environment } from '../../../environments/environment';

export function buildImageUrl(
  url: string | null | undefined,
  defaultImg: string = '/img/adopciones/default-adoption.webp'
): string {
  if (!url) {
    return defaultImg;
  }
  if (url.startsWith('http')) {
    return url;
  }
  const base = environment.apiUrl.replace(/\/api\/v1$/, '');
  const path = url.startsWith('/') ? url : '/' + url;
  return base + path;
}
