import { uiMessaging, zIndexes } from 'styles/variables';
import styled from 'styles';

const alertContainerHeight = '40px';
const alertIconWidth = alertContainerHeight;
const fontSize = '1em';

export const StyledContainer = styled.div`
  position: relative;
  top: 50px;
  left: 50%;
  width: 50%;
  height: ${alertContainerHeight};
  transform: translateX(-50%);
  z-index: ${zIndexes.get('alert')};
`;

export const StyledAlert = styled.div`
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 0;
  border-radius: inherit;
  margin: 0;
  box-shadow: 1px 1px 10px 1px;
  z-index: ${zIndexes.get('above-siblings')};

  .alert__button-group {
    padding: 2px;
    margin: 0;
    button {
      min-width: auto;
    }
  }

  .alert__close::before {
    font-size: 1rem;
  }
`;

export const AlertContent = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${alertContainerHeight};
  ${(props) =>
    props.isExpanded &&
    `
    height: auto;
    .alert-content__details {
      display: flex;
      width: auto;
      overflow: hidden;
    }
  `}
`;

export const AlertContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AlertTitle = styled.div`
  display: flex;
  flex: 1;
  margin-left: 10px;
  font-size: ${fontSize};
`;

export const AlertIcon = styled.div<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${alertIconWidth};
  height: ${alertIconWidth};
  color: #fff;
  padding: 0;
  font-size: 1.5rem;
  font-weight: bold;
  ${(props) => {
    const values = uiMessaging.get(props.type);
    return `
        background-color: ${values.background};
        color: ${values.colour};
        ::before {
          content: "${values.icon}";
        }
      `;
  }}
`;

export const AlertDetails = styled.div`
  display: none;
  padding: 10px 0 {
    left: 5px;
  }
  margin-left: ${alertIconWidth};
  white-space: pre-line;
  word-wrap: break-word;
`;

// export default {
//   AlertContainer: {
//     position: relative,
//     top: '50px',
//     left: '50%',
//     width: '50%',
//     height: alertContainerHeight,
//     transform: 'translateX(-50%)',
//     zIndex: zIndexes.get('alert')
//   },
//   Alert: {
//     width: '100%',
//     backgroundColor: '#fff',
//     color: '#000',
//     padding: 0,
//     borderRadius: 'inherit',
//     margin: 0,
//     boxShadow: '1px 1px 10px 1px',
//     zIndex: zIndexes.get('above-siblings')
//   },
//   AlertTitle: {
//     display: 'flex',
//     flex: 1,
//     marginLeft: '10px',
//     fontSize
//   },
//   ButtonGroup: {
//     padding: '2px',
//     margin: 0
//   },
//   Button: {
//     minWidth: 'auto'
//   },
//   Close: {
//     ':before': {
//       fontSize: '1rem'
//     }
//   },
//   AlertContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     height: alertContainerHeight
//   },
//   AlertTopContent: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: alertContainerHeight
//   },
//   AlertIcon: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: alertIconWidth,
//     height: alertIconWidth,
//     color: '#fff',
//     padding: 0,
//     fontSize: '1.5rem',
//     fontWeight: 'bold'
//   },
//   AlertDetails: {
//     display: 'none',
//     padding: '10px 0',
//     paddingLeft: '5px',
//     marginLeft: alertIconWidth,
//     whiteSpace: preLine,
//     wordWrap: breakWord
//   },
//   AlertContentExpanded: {
//     height: 'auto'
//   },
//   AlertContentExpandedDetails: {
//     display: 'flex',
//     width: 'auto',
//     overflow: 'hidden'
//   },
//   ...[...uiMessaging.keys()].reduce((p, k) => {
//     const values = uiMessaging.get(k);
//     return {
//       ...p,
//       [k]: {
//         backgroundColor: values.background,
//         color: values.colour,
//         ':before': {
//           content: `"${values.icon}"`
//         }
//       }
//     };
//   }, {})
// };
