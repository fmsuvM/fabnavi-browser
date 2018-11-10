import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';

import FigureTagField from './FigureTagField';
import { AddTagButton } from '../../stylesheets/application/ProjectEditForm';

const debug = Debug('fabnavi:components:FiguresTagField');

const FiguresTagField = ({ figures, handleFigureTagChange, onAddFigureTagButton, onDeleteFigureTagButton }) => {
  return (
    <div>
      <h3>Figure Tags</h3>
      {figures.map((figure, figureIndex) => {
        return (
          <div key={figureIndex}>
            <h4>Figure {figureIndex + 1} Tags</h4>
            {figure.step_tags.map((tag, index) => {
              return (
                <FigureTagField
                  key={index}
                  tag={tag.step_tag}
                  index={index}
                  figureIndex={figureIndex}
                  handleFigureTagChange={handleFigureTagChange}
                  onDeleteFigureTagButton={onDeleteFigureTagButton}
                />
              );
            })}
            <AddTagButton onClick={onAddFigureTagButton} data-index={figureIndex}>
              Add Tag
            </AddTagButton>
          </div>
        );
      })}
    </div>
  );
};

FiguresTagField.propTypes = {
  figures: PropTypes.array,
  handleFigureTagChange: PropTypes.func,
  onAddFigureTagButton: PropTypes.func,
  onDeleteFigureTagButton: PropTypes.func
};

export default FiguresTagField;
