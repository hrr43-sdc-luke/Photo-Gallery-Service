import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

function PhotoGrid({
  photos,
}) {
  return (

    <div>
      {(photos.slice(0, 6)).map((photo) => {
        const { photoId, photoUrl, alt } = photo;
        return (
          <div className="gridPhoto">

            <div className="gridImage">

              <Photo photoId={photoId} photoUrl={photoUrl} alt={alt} key={photoId} />

            </div>

          </div>

        );
      })}
    </div>
  );
}

PhotoGrid.propTypes = {
  photos: PropTypes.array.isRequired,
};

// PhotoGrid.propTypes = {
//   photos: Proptype.array.isRequired,

//   // Proptype.exact({
//   //   map: Proptype.array.isRequired,
//   //   photoId: Proptype.number,
//   //   photoUrl: Proptype.string.isRequired,
//   //   alt: Proptype.string.isRequired,
//   //   username: Proptype.string,
//   //   experienceId: Proptype.number,

// };


export default PhotoGrid;
