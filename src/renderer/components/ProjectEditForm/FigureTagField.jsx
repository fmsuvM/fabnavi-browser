import React from 'react';
import PropTypes from 'prop-types';

import {
  TagFieldWrapper,
  StyledTagField,
  TagInput,
  DeleteButton
} from '../../stylesheets/application/ProjectEditForm/TagField';

const FigureTagField = ({ tag, index, figureIndex, handleFigureTagChange, onDeleteFigureTagButton }) => {
  return (
    <TagFieldWrapper>
      <StyledTagField key={index}>
        Figure{figureIndex + 1} Tag#{index + 1}
        <TagInput
          name="edit_figure_tag"
          data-index={index}
          type="text"
          defaultValue={tag}
          onChange={e => handleFigureTagChange(e, figureIndex, index)}
        />
        <DeleteButton onClick={e => onDeleteFigureTagButton(e, figureIndex, index)}>delete</DeleteButton>
      </StyledTagField>
    </TagFieldWrapper>
  );
};

FigureTagField.propTypes = {
  tag: PropTypes.string,
  index: PropTypes.number,
  figureIndex: PropTypes.number,
  handleFigureTagChange: PropTypes.func,
  onDeleteFigureTagButton: PropTypes.func
};

export default FigureTagField;
