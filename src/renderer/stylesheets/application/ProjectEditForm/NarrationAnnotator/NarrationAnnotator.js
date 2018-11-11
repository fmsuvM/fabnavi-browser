import styled from 'styled-components';
import { colors } from '../../../common/colors';
import { buttonProperties } from '../../../common/buttonProperties';

export const NarrationWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

export const NarrationField = styled.textarea`
  resize: none;
  margin: 0;
  width: 592px;
  height: 180px;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid black;
`;

export const RecommendTagsFrame = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const TagsFrame = styled.div`
  display: flex;
`;

export const TagEditor = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const EditFrame = styled.div`
  display: flex;
  overflow-x: scroll;
  margin: 0;
  width: 592px;
`;

export const ButtonFrame = styled.div`
  display: flex;
`;

export const TagInput = styled.input`
  width: 100px;
  box-shadow: none;
  background: none;
  padding-left: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid black;
`;

export const DeleteButton = styled.button`
  font-size: 16px;
  border: none;
  margin-left: 10px;
  font-weight: 100;
  ${buttonProperties({
    width: 100,
    height: 35,
    color: 'white',
    backgroundColor: colors.button.gray
  })};
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

export const AnalyzeButton = styled.button`
  font-size: 15px;
  border-style: none;
  ${buttonProperties({
    width: 120,
    height: 35,
    color: 'white',
    backgroundColor: colors.button.green
  })};
`;

export const AcceptCheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  margin-left: 5px;
  margin-right: 15px;
`;
