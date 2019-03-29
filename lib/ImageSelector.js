import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useReducer } from 'react';

import { Button } from './Button';

import LoadingBouncer from './LoadingBouncer';
import ClearableInput from './ClearableInput';
import FileUploader from './FileUploader';
import { isString, convertToBase64 } from './_utils';
import MeikoFetch from './_utils/fetch';
import Urls from './_constants/urls';

import styles from './_styles/ImageSelector';

async function postImage(url, image, data) {
  const result = await MeikoFetch(url, 'POST', { image });
  const isSuccessful = result && result.success;

  data.onChange({
    target: {
      type: 'text',
      name: data.name,
      value: isSuccessful ? result.url : Urls.images.deadImage
    }
  });

  if (!isSuccessful && data.onError) {
    const imageUploadError = {
      error: result.error,
      message: 'Failed to upload image.'
    };

    data.onError(imageUploadError);
  }

  data.dispatch({ type: RESPONSE });
}

const defaults = {
  isLoading: false,
  showControls: false,
  imageUrl: '',
  error: ''
};

const SHOW_CONTROLS = 'show';
const USER_INPUT = 'input';
const SUBMISSION = 'submit';
const RESPONSE = 'error';

function imageReducer(state, action) {
  switch (action.type) {
    case SHOW_CONTROLS:
      return { ...defaults, showControls: true };
    case USER_INPUT:
      return { ...state, error: '', imageUrl: action.value };
    case SUBMISSION:
      return { ...defaults, isLoading: true };
    case RESPONSE:
      return { ...defaults, isLoading: false, error: action.error };
    default:
      return state;
  }
}

function ImageSelector({ className, url, ...props }) {
  const [isFocused, setFocus] = useState(false);
  const [state, dispatch] = useReducer(imageReducer, defaults);
  const hasUrl = !!url;
  const displayUrl =
    (hasUrl || state.error) && !state.isLoading && !state.showControls;

  function handleSubmit(stringOrEvent) {
    const isUrl = isString(stringOrEvent);
    const data = isUrl ? stringOrEvent : (stringOrEvent.target.files || [])[0];

    if (!data) {
      dispatch({ type: RESPONSE, error: `No data was selected.` });
      return;
    }

    dispatch({ type: SUBMISSION });
    const actions = {
      name: props.name,
      onChange: props.onChange,
      onError: props.onError,
      dispatch
    };

    if (isUrl) {
      postImage(Urls.imgur.postUrl, data, actions);
      return;
    }

    convertToBase64(data, (event) =>
      postImage(Urls.imgur.postFile, event.target.result, actions)
    );
  }

  return (
    <div className={classNames('image-selector', styles.selector, className)}>
      {state.isLoading && <LoadingBouncer />}
      {displayUrl && (
        <div className={classNames(styles.selector__display)}>
          <div className={classNames(styles.selector__text)}>
            <div>{url}</div>
            <div className={classNames('image-selector__error', styles.error)}>
              {state.error}
            </div>
          </div>
          <Button
            btnStyle="accent"
            onClick={() => dispatch({ type: SHOW_CONTROLS })}
          >
            upload new image
          </Button>
        </div>
      )}
      {!displayUrl && !state.isLoading && (
        <div>
          <div
            className={classNames(
              'image-selector__url-uploader',
              styles.selector__urlUploader,
              isFocused && styles.selector__urlUploader_focused
            )}
          >
            <ClearableInput
              id="imageUrl"
              containerClassName={classNames(
                'image-selector__url',
                styles.selector__url
              )}
              className={classNames(styles.selector__urlInput)}
              name="imageUrl"
              label="Image Url"
              value={state.imageUrl}
              onChange={(e) =>
                dispatch({ type: USER_INPUT, value: e.target.value })
              }
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
            <Button
              className={styles.selector__urlButton}
              btnStyle="primary"
              onClick={() => handleSubmit(state.imageUrl)}
              disabled={state.isLoading}
            >
              upload url
            </Button>
          </div>
          <FileUploader
            className={props.uploaderClassName}
            id="imageFile"
            name="imageFile"
            placeholder="upload file"
            value={''}
            disabled={state.isLoading}
            onFileSelect={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.displayName = 'ImageSelector';
ImageSelector.defaultProps = {
  name: 'image'
};

ImageSelector.propTypes = {
  className: PropTypes.string,
  uploaderClassName: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func
};

export default ImageSelector;
