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

const RecommendTags = ({ tags, onChange, onClick, figureIndex }) => {
  return (
    <RecommendTagsFrame>
      <EditFrame>
        {tags.map((tag, index) => {
          return (
            <TagsFrame key={index}>
              <TagEditor>
                {/* index: tagの番号，figureIndex: 図の番号 */}
                <TagInput value={tag} onChange={e => onChange(e, index, figureIndex)} />
                <AcceptCheckBox />
              </TagEditor>
            </TagsFrame>
          );
        })}
      </EditFrame>
      <AcceptButton onClick={onClick}>Accept!</AcceptButton>
    </RecommendTagsFrame>
  );
};

RecommendTags.propTypes = {
  tags: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  figureIndex: PropTypes.number
};

export default RecommendTags;
