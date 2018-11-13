import styled from 'styled-components';
import { colors } from '../../common/colors';

export const FiguresTagFrame = styled.div`
  display: flex;
  margin-top: 70px;
  align-items: center;
`;

export const TagHeader = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  margin-right: 30px;
  color: #000;
`;

export const NoTag = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  margin-right: 30px;
  color: #000;
`;

export const TagsField = styled.ul`
  display: flex;
  padding: 0px;
  margin: 0px;
`;

export const StyledFigureTag = styled.li`
  position: relative;
  font-size: 20px;
  font-weight: 700;
  margin-right: 30px;
  line-height: 30px;
  padding: 0 1em;
  background-color: ${colors.button.green};
  border-radius: 0 3px 3px 0;
  color: #fff;
  transition: 0.2s;

  &:before {
    position: absolute;
    top: 0;
    left: -15px;
    content: '';
    width: 0;
    height: 0;
    border-color: transparent ${colors.button.green} transparent transparent;
    border-style: solid;
    border-width: 15px 15px 15px 0;
    transition: 0.2s;
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 2;
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    margin-top: -3px;
    background-color: #fff;
    border-radius: 100%;
  }

  &:hover {
    background-color: #555;
    color: #fff;

    &:before {
      border-right-color: #555;
    }
  }
`;
