import styled from './index';

export const StyledControlContainer = styled.div`
  flex: 1;
  padding: 5px;
  min-height: 35px;
  box-sizing: content-box;

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
