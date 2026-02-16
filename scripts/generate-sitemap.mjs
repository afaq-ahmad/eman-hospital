import { writeFileSync } from 'node:fs';
import { sitemapArticleRoutes, sitemapRoutes } from '../src/data/siteContent.js';

const SITE_URL = 'https://emanhospital.com';

const toAbsoluteUrl = (path) => `${SITE_URL}${path}`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...sitemapRoutes, ...sitemapArticleRoutes]
  .map(
    ({ path, lastmod }) =>
      `  <url>\n    <loc>${toAbsoluteUrl(path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`Sitemap generated with ${sitemapRoutes.length + sitemapArticleRoutes.length} URLs.`);
