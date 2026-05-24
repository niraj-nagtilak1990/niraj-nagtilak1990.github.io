/**
 * SOURCE OF TRUTH for client names and URLs.
 * Used by scripts/build-client-sprite.mjs to generate clientSprite.js and the logo sprite PNG.
 * NOT imported at runtime — edit this file, then run: node scripts/build-client-sprite.mjs
 */
export const clients = [
  { name: 'DataTorque',                  url: 'https://www.datatorque.com',                domain: 'datatorque.com',        category: 'employer' },
  { name: 'Mastercard',                  url: 'https://www.mastercard.com',                  domain: 'mastercard.com',          category: 'employer' },
  { name: 'ANZ Bank',                    url: 'https://www.anz.co.nz',                       domain: 'anz.com',                 category: 'employer' },
  { name: 'Capgemini',                   url: 'https://www.capgemini.com',                   domain: 'capgemini.com',           category: 'employer' },
  { name: 'SMC Global',                  url: 'https://www.smcglobal.com',                   domain: 'smcglobal.com',           category: 'employer' },
  { name: 'Smart Salary',                url: 'https://www.smartsalary.com.au',              domain: 'smartsalary.com.au',      category: 'client' },
  { name: 'Ministry of Education NZ',    url: 'https://www.education.govt.nz',               domain: 'education.govt.nz',       category: 'client' },
  { name: 'MBIE',                        url: 'https://www.mbie.govt.nz',                    domain: 'mbie.govt.nz',            category: 'client' },
  { name: 'NZ Police',                   url: 'https://www.police.govt.nz',                  domain: 'police.govt.nz',          category: 'client' },
  { name: 'Toyota NZ',                   url: 'https://www.toyota.co.nz',                    domain: 'toyota.co.nz',            category: 'client' },
  { name: 'Auckland Council',            url: 'https://www.aucklandcouncil.govt.nz',         domain: 'aucklandcouncil.govt.nz', category: 'client' },
  { name: 'Bhutan Revenue & Customs',    url: 'https://bits.systems.gov.bt',                 domain: 'drcsm.gov.bt',            category: 'client' },
  { name: 'Guyana Revenue Authority',    url: 'https://eservices.gra.gov.gy/',               domain: 'gra.gov.gy',              category: 'client' },
  { name: 'Belize Tax Administration',   url: 'https://irisbelize.bts.gov.bz',               domain: 'bts.gov.bz',              category: 'client' },
  { name: 'Cyprus Tax Dept',             url: 'https://taxforall.mof.gov.cy',                domain: 'mof.gov.cy',              category: 'client' },
  { name: 'Cook Islands Revenue',        url: 'https://tax.cookislands.gov.ck',              domain: 'cookislands.gov.ck',      category: 'client' },
  { name: 'Perpetual Guardian',            url: 'https://www.perpetualguardian.co.nz',  domain: 'perpetualguardian.co.nz',  category: 'client' },
  { name: 'Fire & Emergency NZ',           url: 'https://www.fireandemergency.nz',      domain: 'fireandemergency.nz',      category: 'client' },
  { name: 'Itemize',                        url: 'https://www.itemize.com',              domain: 'itemize.com',              category: 'client' },
];
