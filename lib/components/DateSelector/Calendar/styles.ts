import styled from '../../../styles';
import { standardShadow } from '../../../styles/extendables';
import {
  zIndexes,
  calendarButtonBorderColour,
  calendarSelectedDayBackgroundColour,
  calendarSelectedDayFontColour,
  calendarViewShiftButtonColourHover
} from '../../../styles/variables';
import { Button } from '../../Button';

const buttonPadding = '10px';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  z-index: ${zIndexes.get('above-siblings')};
  box-sizing: border-box;

  &:not(.flat) {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    ${standardShadow}
  }
  &.read-only button {
    cursor: default;
  }
`;
export const ViewControls = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
export const ViewShiftButton = styled(Button)`
  padding: 3px 15px;
  &:hover {
    background-color: ${calendarViewShiftButtonColourHover};
  }
`;
export const ViewContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`;
export const ViewItem = styled.div`
  text-align: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  &:not(.dummy-day):not(.header) {
    border-color: ${calendarButtonBorderColour};
  }
  &.day {
    width: calc(100% / 7);
  }
  &.month {
    width: calc(100% / 3);
  }
  .selected {
    background-color: ${calendarSelectedDayBackgroundColour};
    color: ${calendarSelectedDayFontColour};
  }
  &.header {
    padding: 5px 0;
  }
  &.dummy-day {
    z-index: -1;
    > button {
      background-color: inherit !important;
    }
  }
  > button {
    height: 100%;
    min-width: 100%;
    padding: {
      top: ${buttonPadding};
      bottom: ${buttonPadding};
    }
  }
`;
