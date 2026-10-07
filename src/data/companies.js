import angkorDigital from '../assets/companies/angkor-digital.png'
import mekongFinance from '../assets/companies/mekong-finance.png'
import khmerCreative from '../assets/companies/khmer-creative.png'
import tonleLogistics from '../assets/companies/tonle-logistics.png'
import bayonTech from '../assets/companies/bayon-tech.png'
import sovannaEducation from '../assets/companies/sovanna-education.png'
import lotusMarketing from '../assets/companies/lotus-marketing.png'
import greenCambodia from '../assets/companies/green-cambodia.png'

/* Company logo art lives in src/assets/companies and is bundled by Vite, which
   returns a hashed URL for every import. To switch to the real logos, drop the
   new PNG/WebP over the same file names - no code change needed. A company
   without a logo simply omits it and the card falls back to its monogram.

   Row columns: name, industry, location, website, about, brand colour, logo */
export const companies = [
  ['Angkor Digital', 'Technology', 'Phnom Penh', 'angkordigital.example.com', 'Software studio building web and mobile products for banks, NGOs and retailers across Cambodia.', '#2563EB', angkorDigital],
  ['Mekong Finance', 'Finance', 'Phnom Penh', 'mekongfinance.example.com', 'Microfinance and digital payments provider serving more than 400,000 customers nationwide.', '#0EA5E9', mekongFinance],
  ['Khmer Creative Studio', 'Design', 'Phnom Penh', 'khmercreative.example.com', 'Branding, UI/UX and motion design agency working with local and regional brands.', '#7C3AED', khmerCreative],
  ['Tonle Logistics', 'Logistics', 'Battambang', 'tonlelogistics.example.com', 'Last-mile delivery and warehousing network connecting provinces to the capital.', '#EA580C', tonleLogistics],
  ['Bayon Tech Solutions', 'Technology', 'Siem Reap', 'bayontech.example.com', 'Cloud, data and cybersecurity consultancy supporting the tourism and hospitality sector.', '#1E3A8A', bayonTech],
  ['Sovanna Education', 'Education', 'Phnom Penh', 'sovanna.example.com', 'EdTech company delivering English and digital-skills courses to university students.', '#059669', sovannaEducation],
  ['Lotus Marketing Group', 'Marketing', 'Phnom Penh', 'lotusmarketing.example.com', 'Full-service marketing agency specialising in social media and influencer campaigns.', '#DB2777', lotusMarketing],
  ['Green Cambodia Energy', 'Business', 'Siem Reap', 'greencambodia.example.com', 'Solar and clean-energy company installing rooftop systems for homes and factories.', '#16A34A', greenCambodia],
].map(([name, industry, location, website, about, color, logo], i) => ({ id: i + 1, name, industry, location, website, about, color, logo }))
