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
    const data = this.props.data;
    const mode = this.props.mode;
    const sanitizedData = mode === 'unknown' ? data.unknown : data;
    return (
      <DetectionListFrame>
        {mode !== 'unknown' ?
          data.detected.map((object, index) => (
            <ObjectFrame>
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
          data.unknown.map((object, index) => (
            <ObjectFrame>
              <ObjectTitle>Unknown Object #{index + 1}</ObjectTitle>
              {object.candidate.map((item, index) => (
                <ObjectFrame>
                  <ObjectName>
                    <UnknownInput value={item.name} /> <AcceptCheckBox />
                  </ObjectName>
                </ObjectFrame>
              ))}
            </ObjectFrame>
          )) :
          null}
      </DetectionListFrame>
    );
  }
}
