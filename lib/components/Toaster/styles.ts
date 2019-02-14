import styled, { keyframes } from '../../styles';
import { uiMessaging } from '../../styles/variables';

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 9001;
  pointer-events: none;
`;

const coolDown = keyframes`
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.8;
  }
  75% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
  }
`;

export const Toast = styled.span<{ type: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 10px;
  padding-left: 40px;
  width: 300px;
  border-radius: 3px;
  box-shadow: 0 0 12px #999;
  color: #fff;
  opacity: 0;
  cursor: pointer;
  animation: 3s ${coolDown} 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 1.6rem;
  }

  ${(props) => {
    const v = uiMessaging.get(props.type);
    return `
        background-color: ${v.background};
        color: ${v.colour};
        &::before {
            content: "${v.icon}";
        }
    `;
  }}

  .toast__title {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
