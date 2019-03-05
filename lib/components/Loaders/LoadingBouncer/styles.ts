import styled, { css, keyframes } from '../../../styles';

const defaultColour = '#8385aa';

export const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const orbBounce = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.1;
    transform: translateY(-1rem);
  }
`;

export const Orb = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: ${defaultColour};
  border-radius: 50%;
  animation: ${orbBounce} 0.6s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
