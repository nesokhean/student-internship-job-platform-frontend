import { daysAgo, details } from '../utils/helpers.js'
// title, companyId, location, category, type, min, max, daysAgo, skills
const rows = [
  ['Junior Frontend Developer', 1, 'Phnom Penh', 'Technology', 'Full-time', 500, 800, 1, ['React', 'JavaScript', 'Tailwind CSS']],
  ['Digital Marketing Executive', 7, 'Phnom Penh', 'Marketing', 'Full-time', 400, 650, 2, ['Facebook Ads', 'Copywriting', 'Analytics']],
  ['Credit Officer Trainee', 2, 'Phnom Penh', 'Finance', 'Full-time', 450, 700, 3, ['Excel', 'Customer Service', 'Accounting']],
  ['UI/UX Designer', 3, 'Phnom Penh', 'Design', 'Contract', 700, 1100, 4, ['Figma', 'Prototyping', 'User Research']],
  ['IT Support Technician', 5, 'Siem Reap', 'Technology', 'Full-time', 350, 550, 5, ['Networking', 'Windows', 'Troubleshooting']],
  ['English Course Assistant', 6, 'Phnom Penh', 'Education', 'Part-time', 200, 350, 6, ['English', 'Teaching', 'Communication']],
  ['Logistics Coordinator', 4, 'Battambang', 'Logistics', 'Full-time', 400, 600, 7, ['Excel', 'Planning', 'Khmer & English']],
  ['Backend Developer (Node.js)', 1, 'Remote', 'Technology', 'Remote', 900, 1500, 8, ['Node.js', 'PostgreSQL', 'REST APIs']],
  ['Content Creator', 7, 'Remote', 'Marketing', 'Part-time', 250, 400, 9, ['Video Editing', 'Canva', 'Storytelling']],
  ['Solar Sales Associate', 8, 'Siem Reap', 'Business', 'Full-time', 400, 900, 10, ['Sales', 'Negotiation', 'Customer Service']],
  ['Data Analyst', 2, 'Phnom Penh', 'Finance', 'Full-time', 800, 1300, 11, ['SQL', 'Power BI', 'Excel']],
  ['Graphic Designer', 3, 'Remote', 'Design', 'Contract', 500, 900, 12, ['Illustrator', 'Photoshop', 'Branding']],
]
export const jobs = rows.map(([title, companyId, location, category, type, min, max, ago, skills], i) =>
  ({ id: i + 1, title, companyId, location, category, type, min, max, posted: daysAgo(ago), skills, ...details(title, skills) }))
