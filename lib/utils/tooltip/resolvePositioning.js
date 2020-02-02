export const Placement = {
  Above: 'above',
  Below: 'below'
};

const TOOLTIP_SPACING = 5;

export default function resolvePositioning(
  tooltip,
  { at, adjustment },
  usePosition,
  center
) {
  const isAbove = usePosition === Placement.Above;
  const isBelow = usePosition === Placement.Below;
  const element = tooltip && tooltip.current;

  const rect = element
    ? element.getBoundingClientRect()
    : { height: 0, left: 0, top: 0, width: 0 };

  const contentHeight = element
    ? element.firstChild.offsetHeight + TOOLTIP_SPACING
    : 0;

  const startingSpotTop = element ? rect.top + rect.height / 2 : undefined;
  const startingSpotLeft = element ? rect.left : undefined;

  let top = at[1] || startingSpotTop;
  top = (isAbove ? rect.top - contentHeight : top) || undefined;
  top = (isBelow ? rect.bottom + TOOLTIP_SPACING : top) || undefined;

  let left = at[0] || startingSpotLeft;
  left = (center ? left + rect.width / 2 : left) || undefined;

  const style = usePosition ? { top, left, bottom: 'unset' } : {};
  const transform = adjustment
    ? { transform: `translateX(${adjustment}px)` }
    : {};

  return { ...style, ...transform };
}
