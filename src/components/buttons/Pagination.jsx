import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const Pagination = ({totalPages,currentPage,handlePageClick}) => {
    const windowSize = 5; 
    

    const getPageRange = () => {
      const currentGroup = Math.ceil(currentPage / windowSize); 
  
    
      const startPage = Math.max(1, (currentGroup - 1) * windowSize + 1);
      const endPage = Math.min(totalPages, currentGroup * windowSize);
  
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };
  
    const pageNumbers = getPageRange();

  return (
    <nav aria-label="Page navigation" className="pagination">
      <ul className="pagination__list">
        <li className={`pagination__item ${currentPage === 1 ? "pagination__item--disabled" : ""}`}>
          <NavLink className="pagination__link" onClick={()=>handlePageClick(currentPage-1)}  to={`?page=${currentPage - 1}`} aria-label="Previous">
            <span aria-hidden="true">prev</span>
          </NavLink>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`pagination__item ${currentPage === pageNumber ? "active" : ""}`}>
            <NavLink className="pagination__link" onClick={()=>handlePageClick(pageNumber)} to={`?page=${pageNumber}`}>
              {pageNumber}
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
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
  };