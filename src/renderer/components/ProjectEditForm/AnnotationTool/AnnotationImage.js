import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';
import Debug from 'debug';

const debug = Debug('fabnavi:AnnotationToo:AnnotationImage');

class AnnotationImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: new window.Image()
    };
  }

  imageUpdate(url) {
    this.state.image.src = url;
    this.state.image.onload = () => {
      this.imageNode.getLayer().batchDraw();
    };
  }

  componentDidMount() {
    this.imageUpdate(this.props.imageUrl);
  }

  componentDidUpdate() {
    this.imageUpdate(this.props.imageUrl);
  }

  render() {
    return (
      <Image
        image={this.state.image}
        width={544}
        height={306}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

AnnotationImage.propTypes = {
  imageUrl: PropTypes.string
};

export default AnnotationImage;
