import PropTypes from 'prop-types';
const HomeButton = ({name}) => {
  return (
      <button className='home-button'>
       {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
       { name} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 arrow">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>


      </button>
  
  )
}

export default HomeButton
HomeButton.propTypes = {
    name: PropTypes.string.isRequired, 
  };