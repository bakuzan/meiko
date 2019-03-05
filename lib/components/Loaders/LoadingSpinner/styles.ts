import styled, { css, keyframes } from '../../../styles';
import { spinnerColours } from '../../../styles/variables';

const width = '100px';
const widthSmall = '30px';

export const Loader = styled.div`
  position: relative;
  margin: 0px auto;
  width: ${width};

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  ${(props: { size?: string }) =>
    props.size === 'control' &&
    css`
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: ${widthSmall};
    `}
  ${(props) =>
    props.size === 'fullscreen' &&
    css`
      position: fixed;
      top: 50px;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #fcfcfc;
      background-color: rgba(240, 240, 240, 0.2);
      z-index: 999;
    `}
`;

const circularRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Circular = styled.svg`
  animation: ${circularRotate} 2s linear infinite;
  transform-origin: center center;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  ${(props: { size?: string }) =>
    props.size === 'fullscreen' &&
    css`
      top: 25vh;
      bottom: auto;
      left: 35vw;
      right: auto;
      width: 25vw;
      height: 25vh;
    `}
`;

const pathDash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const pathColour = keyframes`
  100%,
  0% {
    stroke: ${spinnerColours[0]};
  }
  40% {
    stroke: ${spinnerColours[1]};
  }
  66% {
    stroke: ${spinnerColours[2]};
  }
  80%,
  90% {
    stroke: ${spinnerColours[3]};
  }
`;

export const Path = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${pathDash} 1.5s ease-in-out infinite,
    ${pathColour} 6s ease-in-out infinite;
  stroke-linecap: round;
`;
