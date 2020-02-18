export interface AccordionToggleProps {
  className: string;
  heading: React.ReactNode;
  onToggle: () => void;
}

export interface AccordionProps extends React.HTMLProps<HTMLDivElement> {
  defaultIsCollapsed?: boolean;
  contentProps?: React.HTMLProps<HTMLDivElement>;
  headingProps?: React.HTMLProps<HTMLDivElement>;
  toggleComponent?: React.FunctionComponent<AccordionToggleProps>;
  heading: React.ReactNode;
  children: React.ReactNode | ((isCollapsed: boolean) => React.ReactNode);
  onToggle?: (isCollapsed: boolean) => void;
}

declare const Accordion: React.SFC<AccordionProps>;

export default Accordion;
