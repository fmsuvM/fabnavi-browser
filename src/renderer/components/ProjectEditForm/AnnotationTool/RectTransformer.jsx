import React from 'react';
import PropTypes from 'prop-types';
import { Transformer } from 'react-konva';
import Debug from 'debug';

const debug = Debug('fabnavi:AnnotationTool:RectTransformer');

class RectTransformer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const{ selectedShapeName } = this.props;
    const selectedNode = stage.findOne(`.${selectedShapeName}`);
    if(selectedNode === this.transformer.node()) return;
    if(selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
  }

  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
        rotateEnabled={false}
      />
    );
  }
}

RectTransformer.propTypes = {
  selectedShapeName: PropTypes.string
};

export default RectTransformer;
