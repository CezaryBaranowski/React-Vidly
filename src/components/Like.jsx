import React, { Component } from "react";

class Like extends Component {
  //   props = {
  //     movieId: Number,
  //     isLiked: Boolean,
  //   };
  render() {
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={this.getLikeClassName()}
        aria-hidden="true"
      ></i>
    );
  }

  getLikeClassName = () => {
    let className = this.props.isLiked ? "fa fa-heart" : "fa fa-heart-o";
    return className;
  };
}

export default Like;
