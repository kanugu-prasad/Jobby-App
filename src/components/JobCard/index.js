import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobCardDetail} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobCardDetail
  return (
    <Link className="link-style" to={`/jobs/${id}`}>
      <li key={id} className="job-list-container">
        <div className="companylogo-title-star-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-style"
          />
          <ul className="title-star-container">
            <h1 className="job-title">{title}</h1>
            <ul className="staricon-star-container">
              <li>
                <FaStar className="star-icon" />
              </li>
              <p className="rating-style">{rating}</p>
            </ul>
          </ul>
        </div>
        <div className="location-jobtype-package-container">
          <div className="location-jobtype-container">
            <IoLocationSharp className="location-icon" />
            <p className="location-para">{location}</p>
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location-para">{employmentType}</p>
          </div>
          <p className="package-style">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line-job" />
        <h1 className="description-para">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
