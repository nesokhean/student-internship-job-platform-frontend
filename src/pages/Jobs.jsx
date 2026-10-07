import Listing from '../components/Listing.jsx'
import { jobs } from '../data/jobs.js'
export default function Jobs() {
  return <Listing kind="jobs" title="Find jobs" subtitle="Roles for graduates and students across Cambodia." items={jobs} types={['Full-time', 'Part-time', 'Contract', 'Remote']} />
}
