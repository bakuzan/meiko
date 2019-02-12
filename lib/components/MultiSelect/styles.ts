import styled from '../../styles';
import { standardShadow } from '../../styles/extendables';
import { zIndexes } from '../../styles/variables';
import List, { IListProps } from '../List';

const padding = '10px';
const fullSizeMinusPadding = `calc(100% - ${padding});`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 100px;
  min-height: 25px;
  border: none;

  .display,
  .display > input {
    cursor: pointer;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: ${fullSizeMinusPadding};
  display: none;
  width: ${fullSizeMinusPadding};
  ${standardShadow}

  &.is-open {
    display: flex;
  }
`;

export const StyledList = styled(List)<IListProps>`
  width: 100%;
  z-index: ${zIndexes.get('popover')};

  .separator {
    height: 1px;
    border-bottom: 1px solid;
    opacity: 0.2;
  }
`;
