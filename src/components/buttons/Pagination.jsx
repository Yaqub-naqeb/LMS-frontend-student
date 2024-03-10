import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const Pagination = ({totalPages,currentPage,handlePageClick}) => {
    console.log('cur',currentPage)
    console.log(totalPages)
  return (
    <nav aria-label="Page navigation" className="pagination">
      <ul className="pagination__list">
        <li className={`pagination__item ${currentPage === 1 ? "pagination__item--disabled" : ""}`}>
          <NavLink className="pagination__link" onClick={()=>handlePageClick(currentPage-1)} to={`?page=${currentPage - 1}`} aria-label="Previous">
            <span aria-hidden="true">prev</span>
          </NavLink>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index + 1} className={`pagination__item ${currentPage === index + 1 ? "pagination__item--active" : ""}`}>
            <NavLink className="pagination__link" to={`?page=${index + 1}`}>
              {index + 1}
            </NavLink>
          </li>
        ))}
        <li className={`pagination__item ${currentPage === totalPages ? "pagination__item--disabled" : ""}`}>
          <NavLink className="pagination__link" onClick={()=>handlePageClick(currentPage+1)} to={`?page=${currentPage+1}`} aria-label="Next">
            <span aria-hidden="true">next</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

Pagination.propTypes = {
    totalPages:PropTypes.number,
    currentPage:PropTypes.number,
  };