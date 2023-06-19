import getStyleFromCss from 'inline-css-parser';

export function transInlineCssToStyleObject(inlineCss: string) {
  if (!inlineCss) return {};
  const css = inlineCss.split('{')[1].split('}')[0];
  if (!css || !css.trim()) return {};
  const obj = getStyleFromCss(css);
  return obj;
}
