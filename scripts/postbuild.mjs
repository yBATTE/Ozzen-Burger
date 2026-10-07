import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createServer} from 'vite';
import React from 'react';
import {renderToString} from 'react-dom/server';
const c=JSON.parse(readFileSync('public/config.json','utf8'));
const explicit=process.env.SITE_URL||c.seo.siteUrl;
const vercel=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
let origin=explicit||(vercel?`https://${vercel}`:'');
if(origin){const url=new URL(origin);if(!['https:','http:'].includes(url.protocol))throw Error('SITE_URL debe usar HTTPS');origin=url.origin}
const indexable=c.seo.indexable!==false&&process.env.VERCEL_ENV!=='preview';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const base=readFileSync('dist/index.html','utf8');
const vite=await createServer({server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[],entries:[]}});
try{
 const {default:App,configureSite}=await vite.ssrLoadModule('/src/App.tsx');configureSite(c);
 for(const route of ['/','/menu']){
  const home=route==='/';const title=home?c.seo.homeTitle:c.seo.menuTitle,description=home?c.seo.homeDescription:c.seo.menuDescription;
  const url=origin?origin+(home?'/':'/menu'):'';
  const schema={'@context':'https://schema.org','@type':'Restaurant',name:c.local.name,description:c.seo.homeDescription,servesCuisine:'Hamburguesas',sameAs:[c.local.instagram]};
  if(origin){schema.url=origin+'/';schema.logo=origin+'/assets/ozzen-logo.webp';schema.hasMenu=origin+'/menu'}
  if(c.local.address)schema.address={'@type':'PostalAddress',streetAddress:c.local.address,addressLocality:c.local.zone,addressRegion:c.local.region,addressCountry:'AR'};
  if(c.local.whatsapp)schema.telephone=c.local.whatsapp;
  if(c.local.mapsUrl)schema.hasMap=c.local.mapsUrl;
  const tags=`<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${indexable?'index, follow':'noindex, nofollow'}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:site_name" content="${esc(c.local.name)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}">${url?`<link rel="canonical" href="${esc(url)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(origin)}/assets/ozzen-social.png"><meta name="twitter:image" content="${esc(origin)}/assets/ozzen-social.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Logo de Ozzen Burger">`:''}<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
  const markup=renderToString(React.createElement(App,{path:route})).replaceAll('reveal"','reveal shown"');
  let html=base.replace(/<title>.*?<\/title>/g,'').replace(/<meta (?:name="description"|property="og:title"|property="og:description")[^>]*>/g,'').replace('</head>',tags+'</head>').replace('<div id="root"></div>',`<div id="root">${markup}</div>`);
  if(!home)mkdirSync('dist/menu',{recursive:true});
  writeFileSync(home?'dist/index.html':'dist/menu/index.html',html);
 }
}finally{await vite.close()}
const robots=`User-agent: *\n${indexable?'Allow: /':'Disallow: /'}\n${origin&&indexable?`\nSitemap: ${origin}/sitemap.xml\n`:''}`;
writeFileSync('dist/robots.txt',robots);
const urls=origin?['/','/menu'].map(route=>`  <url><loc>${esc(origin+route)}</loc></url>`).join('\n'):'';
writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
if(!origin)console.log('Dominio todavía no definido: canonical y URLs del sitemap se completan automáticamente en Vercel o con SITE_URL.');
console.log('SEO generado: HTML prerenderizado para inicio y menú, robots.txt, sitemap y metadatos por página.');
