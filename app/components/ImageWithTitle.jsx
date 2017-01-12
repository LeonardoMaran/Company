import React, {Component} from 'react';

export default class ImageWithTitle extends Component {
  render() {
    const {
      src,
      title,
      href,
      ...others
    } = this.props;
    return (
      <div className="image-with-title">
        <a href={href}>
          <img src={src} />
          <p>{title}</p>
        </a>
      </div>
    );
  }
}
