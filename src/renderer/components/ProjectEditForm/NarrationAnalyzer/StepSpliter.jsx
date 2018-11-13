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

const StepSpliter = ({ words }) => {
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
      <AcceptButton>Split!</AcceptButton>
    </RecommendTagsFrame>
  );
};

StepSpliter.propTypes = {
  words: PropTypes.array
};

export default StepSpliter;
