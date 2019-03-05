import styled, { css } from '../../styles';
import { dangerColour } from '../../styles/variables';

export const MalContainer = styled.div`
  position: relative;
  ${(props: { isFetching: boolean; hasSelected: boolean; isFresh: boolean }) =>
    props.isFetching &&
    css`
      .mal-clear-input {
        visibility: hidden;
        pointer-events: none;
      }
    `}
  ${(props) =>
    (props.hasSelected || props.isFresh) &&
    css`
      .mal-results {
        visibility: hidden;
        pointer-events: none;
      }
    `}
`;

export const MalMessages = styled.div`
  display: block;
  color: ${dangerColour};
  padding-left: 0.5em;
  margin-top: -5px;
  font-size: 0.8em;
`;

// Suggestion styles

const baseIMGHeight = 100;

export const MalSuggestion = styled.li`
  span + span {
    margin-left: 2px;
  }

  > button {
    height: 25px;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
  }

  &.active > button,
  &:hover > button {
    height: ${baseIMGHeight + 10}px;
    align-items: center;
  }
`;

export const MalSuggestionImage = styled.img`
  height: ${baseIMGHeight}px;
`;
