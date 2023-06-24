export function isInlineDom(dom: HTMLElement) {
  const { display } = window.getComputedStyle(dom);
  return display === 'inline' || display === 'inline-block';
}
