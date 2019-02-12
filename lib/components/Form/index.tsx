import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import Strings from '../../constants/strings';
import { IJSXChildren } from '../../types';

import styled from '../../styles';
import { formSpecific } from '../../styles/extendables';

interface IFormProps {
  id?: string;
  className?: string;
  name: string;
  title?: string;
  children: IJSXChildren;
  submitOptions?: {
    text?: string;
    onSubmit?(): void;
  };
  cancelOptions?: {
    hide?: boolean;
    onCancel?(): void;
  };
}

const StyledForm = styled.form`
  ${formSpecific}
`;

class Form extends React.Component<IFormProps, any> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    submitOptions: PropTypes.object,
    cancelOptions: PropTypes.object
  };

  constructor(props: IFormProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.cancelOptions.onCancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitOptions.onSubmit();
  }

  render() {
    const {
      id,
      className,
      name,
      title,
      submitOptions,
      cancelOptions
    } = this.props;
    const hasTitle = !!title;
    const renderCancel = !cancelOptions.hide;

    return (
      <div id={id} className={classNames('form-container', className)}>
        {hasTitle && <h4 className="form-title">{title}</h4>}
        <StyledForm
          name={name}
          className={classNames('form')}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {this.props.children}
          <div className={classNames('button-group')}>
            <Button type="submit" className="ripple">
              {submitOptions.text || Strings.save}
            </Button>
            {renderCancel && (
              <Button className="ripple" onClick={this.handleCancel}>
                {Strings.cancel}
              </Button>
            )}
          </div>
        </StyledForm>
      </div>
    );
  }
}

export default Form;
