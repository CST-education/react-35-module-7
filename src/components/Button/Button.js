import './Button.scss';
import PropTypes from 'prop-types';

export function LoadMoreBtn({ btnType, handleClick }) {
  return (
    <>
      <button type={btnType} onClick={handleClick} className="custom-btn btn-5">
        <span>Read More</span>
      </button>
    </>
  );
}
LoadMoreBtn.defaultProps = {
  btnType: 'button',
  handleClick: () => alert(`Click!!!`),
};
LoadMoreBtn.propTypes = {
  btnType: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
