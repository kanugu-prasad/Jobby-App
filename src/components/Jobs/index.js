import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobDetailsList: [],
    apiProfileStatus: apiStatusConstant.initial,
    apiJobStatus: apiJobStatusConstant.initial,
    employJobcheckList: [],
    minimumPackage: '',
    search: '',
  }

  componentDidMount() {
    this.getUserProfileDetails()
    this.getJobProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({apiProfileStatus: apiStatusConstant.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const profileOptions = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const responseProfile = await fetch(profileUrl, profileOptions)
    const updatedResponseProfileData = await responseProfile.json()
    const newProfileData = {
      name: updatedResponseProfileData.profile_details.name,
      profileImageUrl:
        updatedResponseProfileData.profile_details.profile_image_url,
      shortBio: updatedResponseProfileData.profile_details.short_bio,
    }
    if (responseProfile.ok) {
      this.setState({
        profileDetails: newProfileData,
        apiProfileStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstant.failure})
    }
  }

  getJobProfileDetails = async () => {
    this.setState({apiJobStatus: apiJobStatusConstant.inProgress})
    const {employJobcheckList, minimumPackage, search} = this.state
    const employJobcheckListString = employJobcheckList.join(',')
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${employJobcheckListString}&minimum_package=${minimumPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const jobOptions = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const responseJob = await fetch(jobUrl, jobOptions)
    const updatedResponseJobData = await responseJob.json()
    const newJobData = updatedResponseJobData.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    if (responseJob.ok) {
      this.setState({
        jobDetailsList: newJobData,
        apiJobStatus: apiJobStatusConstant.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobStatusConstant.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  apiProfileSuccesStatus = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  apiJobSuccesStatus = () => {
    const {jobDetailsList, search} = this.state
    return (
      <div>
        <div className="job-search-container1">
          <input
            type="search"
            placeholder="Search"
            className="job-search-input"
            value={search}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-container"
            onClick={this.getJobProfileDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="unorder-job-container">
          {jobDetailsList.map(eachJob => (
            <JobCard jobCardDetail={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  apiProfileLoadingStatus = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  apiJobLoadingStatus = () => (
    <div className="job-loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  apiProfileFailureStatus = () => (
    <div className="profile-failure-container">
      <button
        className="button"
        type="button"
        onClick={this.getUserProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  apiJobFailureStatus = () => {
    const {search} = this.state
    return (
      <div>
        <div className="job-search-container1">
          <input
            type="search"
            placeholder="Search"
            className="job-search-input"
            value={search}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-container"
            onClick={this.getJobProfileDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="job-failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button
            type="button"
            className="button"
            onClick={this.getJobProfileDetails}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  onClickJobType = event => {
    const {employJobcheckList} = this.state
    if (employJobcheckList.includes(event.target.id)) {
      const updatedEmployJobChekList = employJobcheckList.filter(
        each => each !== event.target.id,
      )
      this.setState(
        {employJobcheckList: updatedEmployJobChekList},
        this.getJobProfileDetails,
      )
    } else {
      this.setState(
        prevState => ({
          employJobcheckList: [
            ...prevState.employJobcheckList,
            event.target.id,
          ],
        }),
        this.getJobProfileDetails,
      )
    }
  }

  employmentTypesListStatus = () => {
    const {employJobcheckList} = this.state
    return (
      <ul className="employment-typelist-container">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="categery-container">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={employJobcheckList}
              className="categery-item-input-style"
              onChange={this.onClickJobType}
            />
            <label
              className="categery-item-paragraph"
              htmlFor={each.employmentTypeId}
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  onClickSalary = event => {
    this.setState({minimumPackage: event.target.id}, this.getJobProfileDetails)
  }

  salaryRangesListStatus = () => {
    const {minimumPackage} = this.state
    return (
      <ul className="employment-typelist-container">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="categery-container">
            <input
              type="radio"
              className="categery-item-input-style"
              value={minimumPackage}
              id={each.salaryRangeId}
              onChange={this.onClickSalary}
            />
            <label
              className="categery-item-paragraph"
              htmlFor={each.salaryRangeId}
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  apiJobEmptyResult = () => {
    const {search} = this.state
    return (
      <div>
        <div className="job-search-container1">
          <input
            type="search"
            placeholder="Search"
            className="job-search-input"
            value={search}
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-container"
            onClick={this.getJobProfileDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="job-empty-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="empty-image"
          />
          <h1 className="empty-heading">No Jobs Found</h1>
          <p className="empty-paragraph">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </div>
    )
  }

  apiProfileStatusResult = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstant.success:
        return this.apiProfileSuccesStatus()
      case apiStatusConstant.failure:
        return this.apiProfileFailureStatus()
      case apiStatusConstant.inProgress:
        return this.apiProfileLoadingStatus()
      default:
        return null
    }
  }

  apiJobStatusResult = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobStatusConstant.success:
        return this.apiJobSuccesStatus()
      case apiJobStatusConstant.failure:
        return this.apiJobFailureStatus()
      case apiJobStatusConstant.inProgress:
        return this.apiJobLoadingStatus()
      default:
        return null
    }
  }

  render() {
    const {search, jobDetailsList} = this.state
    return (
      <div className="job-container">
        <Header />
        <div className="job-sub-container">
          <div className="job-first-container">
            <div className="job-search-container">
              <input
                type="search"
                placeholder="Search"
                className="job-search-input"
                value={search}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-container"
                onClick={this.getJobProfileDetails}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.apiProfileStatusResult()}
            <hr className="horizontal-line" />
            <h1 className="categery-paragraph">Type of Employment</h1>
            {this.employmentTypesListStatus()}
            <hr className="horizontal-line" />
            <h1 className="categery-paragraph">Salary Range</h1>
            {this.salaryRangesListStatus()}
          </div>
          <div className="job-second-container">
            {jobDetailsList.length === 0
              ? this.apiJobEmptyResult()
              : this.apiJobStatusResult()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
