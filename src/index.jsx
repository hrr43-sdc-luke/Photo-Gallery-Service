import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import PhotoGrid from './components/PhotoGrid';
import Modal from './components/Modal';
// import Close from './components/ExitButton.jsx';
import '../public/styles.css';

const PhotoGalleryContainer = styled.div`
  justifyContent: center;
  flexDirection: row;
`;

const ContentContainer = styled.div`
  flexDirection: row;
  justifyContent: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      heroPhoto: '',
      heroPhotoIndex: 0,
      isOpen: false,
    };
  }

  componentDidMount() {
    const urlSplit = window.location.href.split('/');
    let experienceId = parseInt(urlSplit[urlSplit.length - 1] || 1, 10);

    if (Number.isNaN(experienceId)) {
      experienceId = 1;
    }

    axios.get(`/photos/${experienceId}`)
      .then((res) => {
        const photos = res.data;
        const heroPhoto = photos[0];
        this.setState({ photos, heroPhoto });
        console.log('HERO PHOTO: ', this.state.heroPhoto);
      })
      .catch((err) => {
        console.log('Axios Error: ', err);
      });
  }

  clickOnGridPhoto() {
    this.setState((prevState) => ({
      heroPhotoIndex: prevState.heroPhotoIndex,
      heroPhoto: prevState.photos[prevState.heroPhotoIndex],
      isOpen: true,
    }));
  }

  swipeToLast() {
    this.setState((prevState) => {
      let newHeroIndex = prevState.heroPhotoIndex - 1;
      let newHeroPhoto = prevState.photos[newHeroIndex];

      if (newHeroIndex <= -1) {
        newHeroIndex = prevState.photos.length - 1;
        newHeroPhoto = prevState.photos[newHeroIndex];
      }

      return {
        heroPhotoIndex: newHeroIndex,
        heroPhoto: newHeroPhoto,
      };
    });
  }

  swipeToNext() {
    this.setState((prevState) => {
      let updatedIndex = prevState.heroPhotoIndex + 1;
      let newPhoto = prevState.photos[updatedIndex];

      if (updatedIndex > prevState.photos.length - 1) {
        updatedIndex = 0;
        newPhoto = prevState.photos[updatedIndex];
      }

      return {
        heroPhotoIndex: updatedIndex,
        heroPhoto: newPhoto,
      };
    });
  }

  render() {
    const {
      photos, heroPhoto, heroPhotoIndex, isOpen,
    } = this.state;
    let modalOn = (
      <div>
        <div className="fullPageModal">
          <button type="button" className="exit" onClick={() => this.setState({ isOpen: false })}>&times;</button>
          <div className="modalPhotoContainer">
            <Modal
              photos={photos}
              heroPhoto={heroPhoto}
              heroPhotoIndex={heroPhotoIndex}
              swipeToLast={this.swipeToLast.bind(this)}
              swipeToNext={this.swipeToNext.bind(this)}
            />
          </div>
        </div>
      </div>
    );

    if (!(isOpen)) {
      modalOn = null;
    }

    return (
      <div>

        <PhotoGalleryContainer className="photoGalleryContainer">
          <ContentContainer className="contentContainer">
            <div>
              {modalOn}
            </div>

            <div className="left">
              <div>
                <div className="titleContainer">
                  <h2>Guest photos</h2>
                </div>
              </div>
            </div>

            <div className="right">
              <PhotoGrid
                photos={photos}
                heroPhoto={heroPhoto}
                onClick={this.swipeToLast.bind(this)}
              />

              <button type="button" className="showAllPhotos" id="modalButton" onClick={() => this.setState({ isOpen: true })}>Show All Photos </button>
            </div>

          </ContentContainer>
        </PhotoGalleryContainer>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('photo-gallery'));
