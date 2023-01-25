import PropTypes from 'prop-types';

export const Button = ({ onloadMore }) => {
    return (
        <div><button type="button" onClick={onloadMore}>Load more</button></div>
    )
} 

Button.propTypes = {
  onloadMore: PropTypes.func,
};