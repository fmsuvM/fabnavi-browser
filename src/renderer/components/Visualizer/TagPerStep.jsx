import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import { TagView, NoTag } from '../../stylesheets/application/visualizer/TagPerStep';
import { StyledTagName } from '../../stylesheets/application/ProjectShow/StyledProjectDetail';

const debug = Debug('fabnavi:visualizer:TagPerStep');

const TagPerStep = ({ currentStep, contents }) => (
  <TagView>
    {contents[currentStep].figure.step_tags.length !== 0 ? (
      contents[currentStep].figure.step_tags.map((tag, index) => {
        return <StyledTagName key={index}>{tag.step_tag}</StyledTagName>;
      })
    ) : (
      <NoTag>There is no figure tag</NoTag>
    )}
  </TagView>
);

TagPerStep.propTypes = {
  currentStep: PropTypes.number,
  contents: PropTypes.array
};

export default TagPerStep;
