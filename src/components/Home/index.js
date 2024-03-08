import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {FaStar, FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import {MdSort} from 'react-icons/md'
import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    bannerImg: '',
    apiStatus: apiStatusConstants.initial,
    kitchenDetails: [],
    activeSortById: sortByOptions[0].value,
    offset: 0,
    next: 1,
  }

  componentDidMount() {
    this.getKitchensBanner()
    this.getKitchensDetails()
  }

  getKitchensBanner = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachItem => ({
        id: eachItem.id,
        imgUrl: eachItem.image_url,
      }))
      console.log(updatedData)
      this.setState({
        bannerImg: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getKitchensDetails = async () => {
    const {activeSortById, offset} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}&sort_by_rating=${activeSortById}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          rating_color: eachItem.user_rating.rating_color,
          rating_text: eachItem.user_rating.rating_text,
          total_reviews: eachItem.user_rating.total_reviews,
        },
      }))
      console.log(updatedData)
      this.setState({kitchenDetails: updatedData})
    }
  }

  updateSortValue = event => {
    this.setState({activeSortById: event.target.value}, this.getKitchensDetails)
  }

  onPrevious = () => {
    const {next} = this.state
    if (next - 1 >= 1) {
      this.setState(
        prevState => ({
          offset: prevState.offset - 9,
          next: prevState.next - 1,
        }),
        this.getKitchensDetails,
      )
    }
  }

  onNext = () => {
    const {next} = this.state
    if (next + 1 <= 4) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 9,
          next: prevState.next + 1,
        }),
        this.getKitchensDetails,
      )
    }
  }

  renderLoadingView = () => (
    <div className="home-container">
      <Navbar />
      <div className="products-loader-container">
        <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
      </div>
      <Footer />
    </div>
  )

  renderHomePage = () => {
    const {bannerImg, kitchenDetails, activeSortById, next} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      top: '50px',
    }
    return (
      <div className="home-container">
        <Navbar />
        <div className="home-center-container">
          <div className="banner-container">
            <Slider {...settings}>
              {bannerImg.map(eachItem => (
                <img
                  src={eachItem.imgUrl}
                  alt="home-banner"
                  className="home-banner"
                />
              ))}
            </Slider>
          </div>
          <div className="home-list-heading-container">
            <h1 className="home-heading">Popular Restaurants</h1>
            <div className="home-sort-heading-container">
              <p className="home-sort-para">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="sort-by">
                <MdSort className="sort-icon" />
                <h1 className="sort-text">Sort by</h1>
                <select
                  value={activeSortById}
                  onChange={this.updateSortValue}
                  className="sort-select"
                >
                  {sortByOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                      className="sort-option"
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="line" />
          </div>
          <ul className="kitchen-container">
            {kitchenDetails.map(eachItem => (
              <li className="kitchen-list">
                <img
                  src={eachItem.imageUrl}
                  alt="kitchen-img"
                  className="kitchen-img"
                />
                <div className="kitchen-name-container">
                  <h1 className="kitchen-name">{eachItem.name}</h1>
                  <p className="kitchen-type">{eachItem.menuType}</p>
                  <span className="rating">
                    <span>
                      <FaStar className="star-rating" />
                    </span>
                    <span className="rating-rate">
                      {eachItem.userRating.rating}
                      <span className="rating-total-rate">
                        ({eachItem.userRating.total_reviews})
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="left-right-btn">
            <button
              type="button"
              className="slide-btn"
              onClick={this.onPrevious}
            >
              .<FaChevronLeft className="slide" />
            </button>
            <p className="count-page">{next} of 4</p>
            <button type="button" className="slide-btn" onClick={this.onNext}>
              .<FaChevronRight className="slide" />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomePage()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home
