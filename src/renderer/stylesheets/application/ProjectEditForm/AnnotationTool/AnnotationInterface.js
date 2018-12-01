import styled from 'styled-components';

import { colors } from '../../../common/colors';
import { buttonProperties } from '../../../common/buttonProperties';

export const Frame = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

export const EditFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const RequestFrame = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const AcceptButton = styled.button`
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
