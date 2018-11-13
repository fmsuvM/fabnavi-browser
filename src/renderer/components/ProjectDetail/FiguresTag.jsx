import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import {
  FiguresTagFrame,
  TagHeader,
  NoTag,
  TagsField,
  StyledFigureTag
} from '../../stylesheets/application/ProjectShow/FiguresTag';

const debug = Debug('fabnavi:ProjectDetail:FiguresTag');

const FiguresTag = ({ contents, figureIndex }) => {
  const isTag = contents[figureIndex].figure.step_tags.length === 0;

  return (
    <FiguresTagFrame>
      <TagHeader>Tag: </TagHeader>
      <TagsField>
        {isTag ? (
          <NoTag>There is no Tag in this figure</NoTag>
        ) : (
          contents[figureIndex].figure.step_tags.map((tag, index) => {
            return <StyledFigureTag key={index}>{tag.step_tag}</StyledFigureTag>;
          })
        )}
      </TagsField>
    </FiguresTagFrame>
  );
};

FiguresTag.propTypes = {
  contents: PropTypes.array,
  figureIndex: PropTypes.number
};

export default FiguresTag;
