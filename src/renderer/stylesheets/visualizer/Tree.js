import styled from 'styled-components';

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

export const TagsFrame = styled.ul`
  width: 500px;
  display: flex;
  overflow-x: scroll;
  margin-left: 30px;
  padding: 0;
  vertical-align: center;
  align-items: center;
  text-align: center;
`;

export const StyledTagName = styled.li`
  position: relative;
  font-size: 20px;
  font-weight: 700;
  margin-right: 30px;
  line-height: 30px;
  padding: 0 1em;
  background-color: '#13AE67';
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
    border-color: transparent '#13AE67' transparent transparent;
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
