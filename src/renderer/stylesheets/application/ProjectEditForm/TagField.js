import styled, { css } from 'styled-components';
import { colors } from '../../common/colors';
import { buttonProperties } from '../../common/buttonProperties';

export const TagFieldWrapper = styled.div`
    display: block;
    padding: 0px;
    width: 340px;
`;

export const StyledTagField = styled.li`
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    vertical-align: center;
`;

export const TagInput = styled.input`
    width: 170px;
    box-shadow: none;
    background: none;
    margin-left: 10px;
    padding-left: 5px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid black;
`;

export const DeleteButton = styled.button`
    font-size: 12px;
    border: none;
    margin-left: 20px;
    font-weight: 100;
    ${buttonProperties({
    width: 100,
    height: 35,
    color: 'white',
    backgroundColor: colors.button.gray
  })};
`;
