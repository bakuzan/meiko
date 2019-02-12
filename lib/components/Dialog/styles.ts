import styled from '../../styles';
import { zIndexes } from 'styles/variables';

export const StyledDialog = styled.dialog`
  min-width: 300px;
  width: auto;
  max-width: 50vw;
  box-shadow: 2px 2px 10px #aaa;
  border: none;
  transform: translateY(-50%);
  z-index: ${zIndexes.get('popover')};

  &.backdrop::backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
  }
  &.no-backdrop::backdrop {
    background-color: transparent;
  }
`;

export const DialogTitle = styled.h4`
  margin: 0;
  margin-bottom: 15px;
`;

export const DialogCustomContent = styled.div`
  padding: 5px 0;
`;
