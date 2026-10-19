// Use only the verified public origin. The demonstration deliberately has no canonical URL.
import { writeFileSync } from 'node:fs';
const origin = process.env.SITE_ORIGIN;
if (origin) {
 const url = new URL(origin);
 if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) throw new Error('SITE_ORIGIN must be an HTTPS origin without path or credentials.');
 writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.origin.replaceAll('&','&amp;').replaceAll('<','&lt;')}</loc></url></urlset>`);
} else {
 writeFileSync('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
}
