import styled from '../../styles';
import { zIndexes, headerHeight } from '../../styles/variables';

export const Navbar = styled.nav`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${headerHeight};
  width: 100%;
  z-index: ${zIndexes.get('header')};
`;

export const LinkBlock = styled.div`
  position: relative;
  height: 100%;

  div {
    height: 100%;
  }

  a {
    height: 100%;
    padding: 8px;
    text-decoration: none;
    box-sizing: border-box;
  }
`;
