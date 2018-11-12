import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  AnnotationWordsWrapper,
  EditFrame,
  WordInput,
  AnnotationButton
} from '../../../stylesheets/application/ProjectEditForm/AnnotationTool/AnnotationWords';

const debug = Debug('fabnavi:AnnotationTool:AnnotationWords');

const AnnotationWords = ({ rectangles }) => {
  return (
    <AnnotationWordsWrapper>
      <EditFrame>
        {rectangles.map((object, index) => {
          return <WordInput key={index} objectColor={object.stroke} />;
        })}
      </EditFrame>
      <AnnotationButton>Annotation!</AnnotationButton>
    </AnnotationWordsWrapper>
  );
};

AnnotationWords.propTypes = {
  rectangles: PropTypes.array
};

export default AnnotationWords;
