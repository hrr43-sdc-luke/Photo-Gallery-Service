import React from 'react';
import PropTypes from 'prop-types';

function Photo({
  photoUrl,
  alt,
  username,
  photoId,
}) {
  return (
    <div>
      <img src={photoUrl} alt={alt} username={username} photoid={photoId} />

    </div>
  );
}

Photo.propTypes = {
  photoUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  photoId: PropTypes.number.isRequired,
};

export default Photo;
