import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  DetectionListFrame,
  ObjectName,
  ObjectTitle,
  AcceptCheckBox,
  ObjectFrame,
  UnknownInput
} from '../../../stylesheets/application/ProjectEditForm/AnnotationTool/DetectionList';

export default class DetectionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data.detection;
    const detected_list =
      data.detected.length !== 0 ? data.detected : [{ candidate: [{ name: 'none', confidence: 0.0 }] }];
    const unknown_list = data.unknown.length !== 0 ? data.unknown : ['nown'];
    const mode = this.props.mode;
    return (
      <DetectionListFrame>
        {mode !== 'unknown' ?
          detected_list.map((object, index) => (
            <ObjectFrame key={index}>
              <ObjectTitle>Detected Object #{index + 1}</ObjectTitle>
              {object.candidate.map((item, index) => (
                <ObjectName key={index}>
                    #{index + 1}: {item.name} - {item.confidence}
                  <AcceptCheckBox />
                </ObjectName>
              ))}
            </ObjectFrame>
          )) :
          null}
        {mode !== 'detected' ?
          unknown_list.map((object, index) => (
            <ObjectFrame key={index}>
              <ObjectTitle>Unknown Object #{index + 1}</ObjectTitle>
              <ObjectName>
                <UnknownInput value={object.name} /> <AcceptCheckBox />
              </ObjectName>
            </ObjectFrame>
          )) :
          null}
      </DetectionListFrame>
    );
  }
}
