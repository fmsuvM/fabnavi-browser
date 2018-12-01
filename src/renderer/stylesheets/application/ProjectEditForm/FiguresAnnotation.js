import styled from 'styled-components';
import { colors } from '../../common/colors';
import { buttonProperties } from '../../common/buttonProperties';

export const EditFrame = styled.div`
  display: flex;
`;
export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const ModeSelector = styled.button`
  font-size: 12px;
  color: white;
  border-style: none;
  margin-top: 10px;
  margin-right: 30px;

  padding: 5px 10px;
  width: 80px;
  height: 25px;
  text-align: center;
  text-transform: capitalize;
  border-radius: 4px;
  background-color: ${props => (props.selected ? '#13AE67' : '#707070')};
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
