const PADDING = 5;
const SCROLLBAR_WIDTH = 20;

function getOffset(direction, rect, contentWidth, usePosition, center) {
  let offset = rect.left;

  if (usePosition) {
    offset = rect.x;
  }

  if (center) {
    const halfWidth = contentWidth / 2;
    const delta = halfWidth * direction;
    offset = offset + rect.width / 2 + delta;
  } else if (direction > 0) {
    offset = offset + contentWidth;
  }

  return offset;
}

export default function calculateTooltipAdjustment(element, opts) {
  const { usePosition, center } = opts;

  let adjustment = null;

  const rect = element.getBoundingClientRect();
  const clientX = rect.x;
  const clientY = rect.y;

  const hasScrollbar = document.body.clientHeight > window.innerHeight;
  const scrollOffset = hasScrollbar ? SCROLLBAR_WIDTH : 0;

  const contentWidth = element.firstChild.offsetWidth;

  const leftOffset = getOffset(-1, rect, contentWidth, usePosition, center);
  const tooFarLeft = center && leftOffset < 0;

  const rightOffset = getOffset(1, rect, contentWidth, usePosition, center);
  const tooFarRight = window.innerWidth - scrollOffset < rightOffset;

  if (tooFarLeft) {
    const delta = (rect.left + rect.width / 2) * -1;

    adjustment = delta + PADDING;
  } else if (tooFarRight && center) {
    const distanceToEdge =
      window.innerWidth - rect.left - rect.width / 2 - scrollOffset;
    const delta = -(contentWidth - distanceToEdge);

    adjustment = delta - PADDING;
  } else if (tooFarRight) {
    const distanceToEdge = window.innerWidth - rect.left - scrollOffset;
    const delta = -(contentWidth - distanceToEdge);

    adjustment = delta - PADDING;
  }

  return { adjustment, clientX, clientY };
}
