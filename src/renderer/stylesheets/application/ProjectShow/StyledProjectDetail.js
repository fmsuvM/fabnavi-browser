import styled, { css } from 'styled-components';
import { colors } from '../../common/colors';

export const StyledDetailFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 20px;
`;

export const TitleFrame = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
    align-items: flex-end;
`;

export const ProjectTitle = styled.p`
    font-size: 38px;
    font-weight: 700;
    height: 2.5em;
    line-height: 1.25em;
    color: #000;
    margin: 0;
    font-feature-settings: 'palt';
    line-break: strict;
    word-break: break-word;
`;

export const PrivateNotation = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin: 0;
    margin-left: 20px;
    text-decoration: underline;
`;

export const ContentsFrame = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 3px solid ${colors.border.gray};
    margin-top: 100px;
    margin-bottom: 50px;
`;

export const DescriptionFrame = styled.div`
    width: 83%;
    display: flex;
    flex-direction: column;
    margin-top: 45px;
`;

export const StyledHead = styled.h3`
    font-size: 20px;
    margin: 0;
    color: #000;
    font-size: 36px;
`;

export const StyledDescription = styled.p`
    font-size: 22px;
    color: #000;
    margin: 30px 38px 0 0;
`;

export const StatusFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 45px;
`;

export const StatusText = styled.p`
    font-size: 18px;
    color: #000;
`;

export const TagFrame = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;
    align-items: center;
`;
export const TagHeader = styled.p`
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    margin-right: 30px;
    color: #000;
`;

export const TagField = styled.ul`
    display: flex;
    padding: 0px;
    margin: 0px;
`;

export const StyledTagName = styled.li`
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

export const RelatedProjectFrame = styled.div`
    margin-top: 30px;
`;

export const FramePerTag = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const TopTag = styled.p`
    font-size: 16px;
    margin: 0;
    color: #000;
    font-size: 36px;
`;
