import styled from '../../styles';
import { zIndexes } from '../../styles/variables';
import { Button } from '../Button';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: wrap;

  .input-container {
    display: flex;
    flex: 1 1 90%;
  }
`;

export const SelectorButton = styled(Button)`
  margin: 10px 0;
  margin-left: -30px;
  z-index: ${zIndexes.get('wafer')};

  &.clear {
    margin-left: -60px;
  }
  & + .date-selector-button {
    margin-left: 0;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex: 1;
  padding-left: 10px;
  color: #f00;
  font-size: 0.8em;
  white-space: nowrap;
`;
