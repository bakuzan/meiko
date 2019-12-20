declare function addOutsideClick(
  element: Element | undefined,
  onOutsideClick: (this: Document, ev: any) => any
): () => void;

export default addOutsideClick;
