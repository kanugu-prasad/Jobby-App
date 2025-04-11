import Cookies from 'js-cookie'
import {Component} from 'react'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import './index.css'

const apiJobItemStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsSet: {},
    similarJobsList: [],
    apiJobItemStatus: apiJobItemStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async props => {
    this.setState({apiJobItemStatus: apiJobItemStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailUrl = `https://apis.ccbp.in/jobs/${id}`
    const jobDetailOptions = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const responseJobDetail = await fetch(jobDetailUrl, jobDetailOptions)
    const updatedResponseJobDetailData = await responseJobDetail.json()
    const newJobDetailsData = {
      companyLogoUrl: updatedResponseJobDetailData.job_details.company_logo_url,
      companyWebsiteUrl:
        updatedResponseJobDetailData.job_details.company_website_url,
      employmentType: updatedResponseJobDetailData.job_details.employment_type,
      id: updatedResponseJobDetailData.job_details.id,
      jobDescription: updatedResponseJobDetailData.job_details.job_description,
      lifeAtCompany: {
        description:
          updatedResponseJobDetailData.job_details.life_at_company.description,
        imageUrl:
          updatedResponseJobDetailData.job_details.life_at_company.image_url,
      },
      location: updatedResponseJobDetailData.job_details.location,
      packagePerAnnum:
        updatedResponseJobDetailData.job_details.package_per_annum,
      rating: updatedResponseJobDetailData.job_details.rating,
      skills: updatedResponseJobDetailData.job_details.skills.map(
        eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }),
      ),
      title: updatedResponseJobDetailData.job_details.title,
    }

    const newSimilarJobsData = updatedResponseJobDetailData.similar_jobs.map(
      need => ({
        companyLogoUrl: need.company_logo_url,
        employmentType: need.employment_type,
        id: need.id,
        jobDescription: need.job_description,
        location: need.location,
        rating: need.rating,
        title: need.title,
      }),
    )
    if (responseJobDetail.ok) {
      this.setState({
        jobDetailsSet: newJobDetailsData,
        similarJobsList: newSimilarJobsData,
        apiJobItemStatus: apiJobItemStatusConstant.success,
      })
    } else {
      this.setState({apiJobItemStatus: apiJobItemStatusConstant.failure})
    }
  }

  apiJobItemSuccessStatus = () => {
    const {jobDetailsSet, similarJobsList} = this.state

    const {
      id,
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
    } = jobDetailsSet
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-succes-container">
        <div className="job-list-container1">
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
          <div className="description-container">
            <h1 className="description-para">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-style">
                Visit
              </a>
              <BiLinkExternal className="view-icon" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="description-para">Skills</h1>
          <ul className="unorder-skill-container">
            {skills.map(eachSkill => (
              <li key={eachSkill.name} className="skill-list">
                <img
                  src={eachSkill.imageUrl}
                  className="skill-icon"
                  alt="eachSkill.name"
                />
                <p className="skill-icon-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="description-para">Life at Company</h1>
          <div className="job-description-imageurl-container">
            <p className="job-description">{description}</p>
            <img
              src={imageUrl}
              className="image-url-style"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="unorder-similar-job-container">
          {similarJobsList.map(eachSimilarJob => (
            <li key={eachSimilarJob.id} className="similar-job-list-container">
              <div className="companylogo-title-star-container">
                <img
                  src={eachSimilarJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo-style"
                />
                <ul className="title-star-container">
                  <h1 className="job-title">{eachSimilarJob.title}</h1>
                  <ul className="staricon-star-container">
                    <li>
                      <FaStar className="star-icon" />
                    </li>
                    <p className="rating-style">{eachSimilarJob.rating}</p>
                  </ul>
                </ul>
              </div>
              <h1 className="description-para">Description</h1>
              <p className="job-description">{eachSimilarJob.jobDescription}</p>
              <div className="location-jobtype-container">
                <IoLocationSharp className="location-icon" />
                <p className="location-para">{eachSimilarJob.location}</p>
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-para">{eachSimilarJob.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  apiJobItemFailureStatus = () => (
    <div className="job-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="button" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  apiJobItemLoadingStatus = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  apiJobItemStatusResult = () => {
    const {apiJobItemStatus} = this.state
    switch (apiJobItemStatus) {
      case apiJobItemStatusConstant.success:
        return this.apiJobItemSuccessStatus()
      case apiJobItemStatusConstant.failure:
        return this.apiJobItemFailureStatus()
      case apiJobItemStatusConstant.inProgress:
        return this.apiJobItemLoadingStatus()
      default:
        return null
    }
  }

  render() {
    const {jobDetailsSet, similarJobsList} = this.state

    return (
      <div className="job-item-details-container">
        <Header />
        {this.apiJobItemStatusResult()}
      </div>
    )
  }
}
export default JobItemDetails
