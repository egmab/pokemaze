import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { videoTrue } = this.props;
    return (
      <div>
        <div className="modal-wrapper" id="HomeModal">
          <div className="modal-body">
            <img
              className="Cross"
              src="./assets/delete.png"
              alt="cross"
              role="presentation"
              onClick={videoTrue}
            />
            <video controls className="video">
              <source src="./assets/pokeVideo.mp4" type="video/mp4" />
              <track default kind="captions" src="#" />
            </video>
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
