import styled from 'styled-components';
import { colors } from '../../../common/colors';
import { buttonProperties } from '../../../common/buttonProperties';

export const AnnotationWordsWrapper = styled.div`
  display: block;
`;

export const EditFrame = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 0;
  width: 544px;
`;

export const WordInput = styled.input.attrs({
  type: 'text'
})`
  width: 100px;
  margin-right: 30px;
  box-shadow: none;
  background: none;
  padding-left: 5px;
  font-size: 16px;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.objectColor || 'black'};
`;

export const AnnotationButton = styled.button`
  font-size: 12px;
  border-style: none;
  margin-top: 10px;
  margin-right: 20px;
  ${buttonProperties({
    width: 100,
    height: 35,
    color: 'white',
    backgroundColor: colors.button.green
  })};
`;
