import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

//

function Modal({
  photos,
  heroPhoto,
  heroPhotoIndex,
  swipeToLast,
  swipeToNext,
}) {
  return (
    <div>
      <div className="modal">

        <button type="button" className="scrollButtons" id="leftB" onClick={() => { swipeToLast(); }}>
          &lt;
        </button>

        <div className="displayPhotoContainer">
          <div className="displayPhoto">

            <Photo
              photoUrl={heroPhoto.photoUrl}
              alt={heroPhoto.alt}
              username={heroPhoto.username}
              photoId={heroPhoto.photoId}
            />

          </div>
          <div className="photoInfo">
            <p id="photoNumber">
              {heroPhotoIndex + 1}
              /
              {photos.length}
            </p>
            <p id="photoAuthor">
              Photo by
              {` ${heroPhoto.username}`}
            </p>
          </div>
        </div>

        <button type="button" className="scrollButtons" id="rightB" onClick={() => { swipeToNext(); }}>
          &gt;
        </button>

      </div>

    </div>

  );
}

Modal.propTypes = {
  photos: PropTypes.array.isRequired,
  heroPhoto: PropTypes.string.isRequired,
  heroPhotoIndex: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  swipeToLast: PropTypes.func.isRequired,
  swipeToNext: PropTypes.func.isRequired,
};

export default Modal;
