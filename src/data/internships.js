import { daysAgo, details } from '../utils/helpers.js'

const rows = [
  ['Web Development Intern', 1, 'Phnom Penh', 'Technology', 'On-site', 100, 200, 1, '3 months', ['HTML/CSS', 'React', 'Git']],
  ['Social Media Intern', 7, 'Phnom Penh', 'Marketing', 'Hybrid', 80, 150, 2, '3 months', ['Canva', 'Content Planning', 'Facebook']],
  ['Banking Operations Intern', 2, 'Phnom Penh', 'Finance', 'On-site', 100, 150, 3, '4 months', ['Excel', 'Accounting', 'Attention to Detail']],
  ['UI/UX Design Intern', 3, 'Remote', 'Design', 'Remote', 0, 0, 4, '3 months', ['Figma', 'Wireframing', 'Research']],
  ['Cybersecurity Intern', 5, 'Siem Reap', 'Technology', 'On-site', 120, 220, 5, '6 months', ['Networking', 'Linux', 'Security Basics']],
  ['Teaching Assistant Intern', 6, 'Phnom Penh', 'Education', 'Hybrid', 60, 120, 6, '2 months', ['English', 'Presentation', 'Teamwork']],
  ['Supply Chain Intern', 4, 'Battambang', 'Logistics', 'On-site', 90, 160, 8, '3 months', ['Excel', 'Inventory', 'Reporting']],
  ['Renewable Energy Intern', 8, 'Siem Reap', 'Business', 'On-site', 100, 180, 10, '4 months', ['Research', 'Site Surveys', 'Excel']],
  ['Data Entry & Analytics Intern', 2, 'Remote', 'Finance', 'Remote', 0, 0, 12, '2 months', ['Excel', 'Google Sheets', 'Accuracy']],
]
export const internships = rows.map(([title, companyId, location, category, type, min, max, ago, duration, skills], i) =>
  ({ id: i + 1, title, companyId, location, category, type, min, max, duration, posted: daysAgo(ago), skills, ...details(title, skills, true) }))
