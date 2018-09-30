import React from 'react';
import PropTypes from 'prop-types';

import {
    TagFieldWrapper,
    StyledTagField,
    TagInput,
    DeleteButton
} from '../../stylesheets/application/ProjectEditForm/TagField';

const TagField = ({ tags, onChange, onDelete }) => {
    return (
        <TagFieldWrapper>
            {tags.map((tag, index) => {
                return (
                    <StyledTagField key={index}>
                        Tag#
                        {index + 1}:
                        <TagInput
                            name="edit_tag"
                            data-index={index}
                            type="text"
                            defaultValue={tag}
                            onChange={e => onChange(e, index)}
                        />
                        <DeleteButton onClick={e => onDelete(e, index)}>delete</DeleteButton>
                    </StyledTagField>
                );
            })}
        </TagFieldWrapper>
    );
};

TagField.propTypes = {
    tags: PropTypes.array,
    onChange: PropTypes.func,
    onDelete: PropTypes.func
};

export default TagField;
