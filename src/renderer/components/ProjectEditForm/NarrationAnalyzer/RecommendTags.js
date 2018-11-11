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
  AcceptCheckBox
} from '../../../stylesheets/application/ProjectEditForm/NarrationAnnotator/NarrationAnnotator';

const debug = Debug('fabnavi:ProjectEditForm:RecommendTag');

const RecommendTags = ({ tags }) => {
  return (
    <RecommendTagsFrame>
      <EditFrame>
        {tags.map((tag, index) => {
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
      <AcceptButton>Accept!</AcceptButton>
    </RecommendTagsFrame>
  );
};

RecommendTags.propTypes = {
  tags: PropTypes.array
};

export default RecommendTags;
