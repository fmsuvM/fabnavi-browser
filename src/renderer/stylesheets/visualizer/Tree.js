import styled from 'styled-components';

import { buttonProperties } from '../common/buttonProperties';
import { colors } from '../common/colors';

export const SearchUIFrame = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  background-color: '#eff3f9';
`;

export const ModeSelectorFrame = styled.div`
  margin-left: 10px;
`;

export const ModeLabel = styled.label`
  font-size: 18px;
`;

export const TagsFrame = styled.div`
  width: 800px;
  display: flex;
  overflow-x: scroll;
  margin-left: 30px;
  padding: 0;
  align-items: center;
`;

export const TagHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #000;
  margin-left: 50px;
`;

export const InputFrame = styled.div`
  display: flex;
`;

export const TagInput = styled.input.attrs({
  type: 'text'
})`
  width: 100px;
  margin-left: 0;
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

export const TagButton = styled.p`
  overflow: hidden;
  font-size: 16px;
  border-style: none;
  padding: 5px 10px;
  width: 80px;
  height: 40px;
  text-align: center;
  border-radius: 4px;
  color: 'white';
  background-color: ${colors.button};
  &:hover {
    opacity: 0.6;
  }
`;
