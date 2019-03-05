import styled from './index';
import floatLabel from './floatLabel';

export const StyledControlContainer = styled.div<{ noFloatLabel?: boolean }>`
  flex: 1;
  padding: 5px;
  min-height: 35px;
  box-sizing: content-box;
  ${(props) => !props.noFloatLabel && floatLabel}

  input,
  select {
    background-color: inherit;
  }

  select {
    width: 100%;
  }

  input[type='text'],
  input[type='number'],
  input[type='date'],
  input[type='url'] {
    width: 100%;
    box-sizing: border-box;
  }

  > button {
    max-height: 32px;
    margin: {
      top: auto;
      bottom: auto;
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
`;

export const FlexSpacer = styled.div`
  display: flex;
  flex: 1;
`;
