import React from 'react';
import PropTypes from 'prop-types';

function Card({ img, title }) {
  return (
    <section
      className="card"
    >
      <img
        src={ img }
        className="card-img-top"
        alt={ title }
      />
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
      </div>
    </section>
  );
}

Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Card;
