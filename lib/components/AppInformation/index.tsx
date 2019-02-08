import classNames from 'classnames';
import * as React from 'react';

import Icons from '../../constants/icons';
import styled from 'styles';

const resolveENVVariable = (str: string) => (str || '').trim();
const resolveLabel = (b: string, v: string) => {
  let label = '';
  if (b) {
    label += `Branch ${b}`;
  }

  if (b && v) {
    label += ', ';
  }

  if (v) {
    label += `Version ${v}`;
  }

  return label;
};

interface IAppInformationProps {
  branch?: string;
  version?: string;
}
interface IAppInformationState {
  hovered: boolean;
}

const size = '1em';
const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: ${size};
  height: ${size};
  padding: 0.2em;

  &::before {
    content: attr(data-icon);
    display: flex;
    justify-content: center;
    align-items: center;
    width: $size;
    height: $size;
  }
`;

const StyledDetail = styled.div<{ hovered: boolean }>`
  position: fixed;
  right: -100%;
  bottom: 0;
  background-color: inherit;
  padding: 5px;
  margin: 1em;
  border: 1px solid;
  pointer-events: none;
  visibility: hidden;
  transition: 1s;

  ${(props) =>
    props.hovered &&
    `
      transition: 1s;
      visibility: visible;
      right: 0;
    `}
`;

class AppInformation extends React.PureComponent<
  IAppInformationProps,
  IAppInformationState
> {
  constructor(props: IAppInformationProps) {
    super(props);
    this.state = {
      hovered: false
    };

    this.handleHovered = this.handleHovered.bind(this);
  }

  handleHovered(hovered: boolean) {
    return () => this.setState({ hovered });
  }

  render() {
    const { branch, version } = this.props;

    if (!branch && !version) {
      return null;
    }

    const codeBranch = resolveENVVariable(branch);
    const appVersion = resolveENVVariable(version);
    const ariaLabel = resolveLabel(codeBranch, appVersion);

    return (
      <StyledContainer
        className={classNames('app-information')}
        data-icon={Icons.info}
        onMouseEnter={this.handleHovered(true)}
        onMouseLeave={this.handleHovered(false)}
        aria-label={ariaLabel}
      >
        <StyledDetail
          hovered={this.state.hovered}
          className={classNames('app-information__detail', {
            'app-information__detail--visible': this.state.hovered
          })}
        >
          {codeBranch && <span>Branch: {codeBranch}</span>}
          {!!codeBranch && !!appVersion && <br />}
          {appVersion && <span>Version: {appVersion}</span>}
        </StyledDetail>
      </StyledContainer>
    );
  }
}

export default AppInformation;
