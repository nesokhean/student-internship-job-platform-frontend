import Listing from '../components/Listing.jsx'
import { internships } from '../data/internships.js'
export default function Internships() {
  return <Listing kind="internships" title="Find internships" subtitle="Gain real experience with leading Cambodian companies." items={internships} types={['On-site', 'Hybrid', 'Remote']} />
}
