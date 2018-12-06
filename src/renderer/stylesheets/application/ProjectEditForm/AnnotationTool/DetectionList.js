import styled from "styled-components";
import { colors } from "../../../common/colors";
import { buttonProperties } from "../../../common/buttonProperties";

export const DetectionListFrame = styled.div`
  display: block;
  height: 306px;
  overflow: scroll;
  margin: 0px;
  padding: 0px;
`;

export const ObjectFrame = styled.div`
  display: block;
  margin-bottom: 15px;
`;

export const ObjectTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0;
`;

export const ObjectName = styled.p`
  font-size: 16px;
  font-weight: normal;
  text-transform: capitalize;
  margin: 0;
  margin-left: 15px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const AcceptCheckBox = styled.input.attrs({
  type: "checkbox"
})`
  margin-left: 5px;
  margin-right: 15px;
`;

export const UnknownInput = styled.input`
  width: 100px;
  box-shadow: none;
  background: none;
  padding-left: 5px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid black;
  margin-top: 8px;
  margin-bottom: 8px;
`;
