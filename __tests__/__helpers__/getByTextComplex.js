const textMatcher = (text) => (_, element) => {
  const hasText = (el) => el.textContent === text;
  const elementHasText = hasText(element);
  const childs = element?.children || [];
  const childrenDontHaveText = Array.from(childs).every((c) => !hasText(c));
  return elementHasText && childrenDontHaveText;
};

export default textMatcher;
