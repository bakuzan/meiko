export interface ScrollTopButtonProps
  extends Pick<React.HTMLProps<HTMLButtonElement>, 'className' | 'style'> {
  offset?: number;
}

declare const ScrollTopButton: React.FunctionComponent<ScrollTopButtonProps>;

export default ScrollTopButton;
