import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  AnnotationWordsWrapper,
  EditFrame,
  WordInput,
  AcceptCheckBox
} from '../../../stylesheets/application/ProjectEditForm/AnnotationTool/AnnotationWords';

const debug = Debug('fabnavi:AnnotationTool:AnnotationWords');

const AnnotationWords = ({ rectangles }) => {
  return (
    <AnnotationWordsWrapper>
      {rectangles.length === 0 ? null : (
        <EditFrame>
          {rectangles.map((object, index) => {
            return (
              <div style={{ display: 'flex' }}>
                <WordInput key={index} objectColor={object.stroke} />
                <AcceptCheckBox />
              </div>
            );
          })}
        </EditFrame>
      )}
    </AnnotationWordsWrapper>
  );
};

AnnotationWords.propTypes = {
  rectangles: PropTypes.array,
  onClear: PropTypes.func,
  onClick: PropTypes.func
};

export default AnnotationWords;
