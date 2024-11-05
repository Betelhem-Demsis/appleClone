import React, { Component } from "react";
import "./../commonResource/css/YoutubeVideos.css";

const API = process.env.REACT_APP_API_URL;



class YoutubeVideos extends Component {
  constructor() {
    super();
    this.state = {
      youTubeVideos: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        const youTubeVideos = data.items;
        this.setState({ youTubeVideos });
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }

  render() {
    return (
      <div className="allVideosWrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold video-title-wrapper">
                Latest Videos
              </div>
            </div>
            {this.state.youTubeVideos.map((singleVideo, i) => {
              let vidId = singleVideo.id.videoId;
              let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
              return (
                <div key={i} className="col-sm-12 col-md-4">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="__blank">
                        <img src={singleVideo.snippet.thumbnails.high.url} alt="" />
                      </a>
                    </div>
                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="__blank">
                          {singleVideo.snippet.title}
                        </a>
                      </div>
                      <div className="videoDesc">
                        {singleVideo.snippet.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default YoutubeVideos;
