import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  AnnotationWordsWrapper,
  EditFrame,
  WordInput,
  ButtonFrame,
  AnnotationButton,
  ClearButton
} from '../../../stylesheets/application/ProjectEditForm/AnnotationTool/AnnotationWords';

const debug = Debug('fabnavi:AnnotationTool:AnnotationWords');

const AnnotationWords = ({ rectangles, onClear }) => {
  return (
    <AnnotationWordsWrapper>
      {rectangles.length === 0 ? null : (
        <EditFrame>
          {rectangles.map((object, index) => {
            return <WordInput key={index} objectColor={object.stroke} />;
          })}
        </EditFrame>
      )}
      <ButtonFrame>
        <AnnotationButton>Annotation!</AnnotationButton>
        <ClearButton onClick={onClear}>Clear !</ClearButton>
      </ButtonFrame>
    </AnnotationWordsWrapper>
  );
};

AnnotationWords.propTypes = {
  rectangles: PropTypes.array,
  onClear: PropTypes.func
};

export default AnnotationWords;
