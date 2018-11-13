import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  RecommendTagsFrame,
  TagInput,
  TagsFrame,
  TagEditor,
  AcceptButton,
  EditFrame,
  ButtonFrame,
  AcceptCheckBox
} from '../../../stylesheets/application/ProjectEditForm/NarrationAnnotator/NarrationAnnotator';

const debug = Debug('fabnavi:ProjectEditForm:StepSpliter');

const StepSpliter = ({ words, onClick }) => {
  return (
    <RecommendTagsFrame>
      <EditFrame>
        {words.map((tag, index) => {
          return (
            <TagsFrame key={index}>
              <TagEditor>
                <TagInput value={tag} />
                <AcceptCheckBox />
              </TagEditor>
            </TagsFrame>
          );
        })}
      </EditFrame>
      <AcceptButton onClick={onClick}>Split!</AcceptButton>
    </RecommendTagsFrame>
  );
};

StepSpliter.propTypes = {
  words: PropTypes.array,
  onClick: PropTypes.func
};

export default StepSpliter;
