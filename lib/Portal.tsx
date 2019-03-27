import * as PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal({ parentTag, querySelector, children }) {
  const ref = useRef(document.createElement(parentTag));

  useEffect(() => {
    const el = ref.current;
    const targetNode = document.querySelector(querySelector);

    targetNode.appendChild(el);

    return () => targetNode.removeChild(el);
  }, [ref, querySelector]);

  return createPortal(children, ref.current);
}

Portal.defaultProps = {
  parentTag: 'div'
};

Portal.propTypes = {
  parentTag: PropTypes.string,
  querySelector: PropTypes.string.isRequired
};

export default Portal;
