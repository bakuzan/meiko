import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function createPortalContainer(parentTag, parentClassName) {
  const element = document.createElement(parentTag);
  element.className = classNames('portal-container', parentClassName);
  return element;
}

function Portal({ parentTag, parentClassName, querySelector, children }) {
  const ref = useRef(createPortalContainer(parentTag, parentClassName));

  useEffect(() => {
    const el = ref.current;
    const targetNode = document.querySelector(querySelector);

    targetNode.appendChild(el);

    return () => targetNode.removeChild(el);
  }, [ref, querySelector]);

  const PortalComponent = createPortal(children, ref.current);
  return <PortalComponent />;
}

Portal.displayName = 'Portal';
Portal.defaultProps = {
  parentTag: 'div'
};

Portal.propTypes = {
  parentTag: PropTypes.string,
  parentClassName: PropTypes.string,
  querySelector: PropTypes.string.isRequired
};

export default Portal;
