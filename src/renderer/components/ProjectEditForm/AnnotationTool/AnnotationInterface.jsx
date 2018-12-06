import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Debug from "debug";

import DetectionList from "./DetectionList.jsx";
import AnnotationWords from "./AnnotationWords.jsx";
import { requestDetection, changeDetectionTag, checkDetectionTag } from "../../../actions/analyzer";
import { Title, Root } from "../../../stylesheets/player/ImageSelector";
import {
  Frame,
  EditFrame,
  SubTitle,
  RequestFrame,
  AcceptButton
} from "../../../stylesheets/application/ProjectEditForm/AnnotationTool/AnnotationInterface";

const debug = Debug("fabnavi:AnnotationPlayer:AnnotationInterface");

class AnnotationInterface extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: []
    };

    this.addLabel = e => {
      e.preventDefault();
      this.setState({
        labels: this.state.labels.concat("")
      });
    };

    this.clickAnnotation = e => {
      e.preventDefault();
      debug("annotation");
    };

    this.onRequestDetection = e => {
      e.preventDefault();
      this.props.requestDetection(this.props.figures[this.props.index].source, this.props.index);
    };

    this.onAcceptTags = e => {
      e.preventDefault();
    };

    this.handleDetectionTag = (e, figureIndex, index, mode) => {
      e.preventDefault();
      this.props.changeDetectionTag(e.target.value, figureIndex, index, mode);
    };

    this.checkDetectionTag = (e, figureIndex, tagIndex) => {
      e.preventDefault();
      this.props.checkDetectionTag(event.target.checked, figureIndex, tagIndex);
    };
  }

  render() {
    return (
      <Frame>
        <Title>
          Figure{this.props.index + 1} Detection - {this.props.mode}
        </Title>
        <EditFrame>
          {!this.props.isFetching ? (
            this.props.mode !== "raw" ? (
              !Object.keys(this.props.figures[this.props.index].detection).length ? (
                <p>Please Detection</p>
              ) : (
                <DetectionList
                  handleDetectionTag={this.handleDetectionTag}
                  checkDetectionTag={this.checkDetectionTag}
                  figureIndex={this.props.index}
                  data={this.props.figures[this.props.index]}
                  mode={this.props.mode}
                />
              )
            ) : (
              <AnnotationWords rectangles={this.state.labels} />
            )
          ) : (
            <div>
              <p>now loading</p>
            </div>
          )}
        </EditFrame>
        <RequestFrame>
          {this.props.mode !== "raw" ? (
            !Object.keys(this.props.figures[this.props.index].detection).length ? (
              <AcceptButton onClick={e => this.onRequestDetection(e)}>Analyze</AcceptButton>
            ) : (
              <AcceptButton onClick={e => this.onAcceptTags(e)}>Accept</AcceptButton>
            )
          ) : (
            <div>
              <AcceptButton onClick={e => this.clickAnnotation(e)}>Annotation!</AcceptButton>
              <AcceptButton onClick={e => this.addLabel(e)}>Add Label</AcceptButton>
            </div>
          )}
        </RequestFrame>
      </Frame>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.analyzer.isFetching,
  figures: state.analyzer.figures
});

const mapDispatchToProps = dispatch => ({
  requestDetection: (url, index) => {
    debug("request API: ", url);
    dispatch(requestDetection(url, index));
  },
  changeDetectionTag: (input, figureIndex, index, mode) => {
    dispatch(changeDetectionTag(input, figureIndex, index, mode));
  },
  checkDetectionTag: (checked, figureIndex, tagIndex) => {
    dispatch(checkDetectionTag(checked, figureIndex, tagIndex));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotationInterface);
