import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res-console.cloudinary.com/dnncpaqsn/media_explorer_thumbnails/2c7e762dbb6c3faf823a0d124d903dbc/detailed"
      alt="not-found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
