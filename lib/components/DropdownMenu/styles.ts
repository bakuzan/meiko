import styled from '../../styles';
import { zIndexes } from '../../styles/variables';
import { standardShadow } from '../../styles/extendables';

export const StyledContainer = styled.div`
  > input {
    display: none;
  }
  > label {
    cursor: pointer;
    &:before {
      content: attr(icon);
      font-size: 1.5rem;
    }
  }
`;

export const StyledDropdownList = styled.ul<{ align: string }>`
  position: fixed;
  width: 200px;
  min-height: 100px;
  background-color: $white;
  border-radius: 4px;
  top: 0;
  right: 0;
  padding: 2px;
  margin: 0;
  list-style-type: none;
  transform: translateY(50%);
  transition: visibility 0.5s;
  transition-delay: 1s !important;
  z-index: ${zIndexes.get('popover')};
  ${standardShadow}

  ${(props) =>
    props.align === 'left' &&
    `
    .dropdown-arrow {
        left: 0;
    }
  `}
  ${(props) =>
    props.align === 'center' &&
    `
    left: 50%;
    transform: translateY(50%) translateX(-50%);
    .dropdown-arrow {
      left: 50%;
      transform: translateX(-50%);
    }
  `}
    ${(props) =>
      props.align === 'right' &&
      `
      .dropdown-arrow {
        right: 0;
      }
  `}
  
`;

export const DropdownArrow = styled.li`
  position: absolute;
  top: -20px;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #fff;
  width: 0;
  height: 0;
  filter: drop-shadow(0 -2px 2px #aaa);
`;
