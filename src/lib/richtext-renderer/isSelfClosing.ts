/**
 * Standard HTML specification for self-closing void elements
 */
 const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", 
  "link", "meta", "param", "source", "track", "wbr"
]);


export function isSelfClosing(tag: string): boolean {
  return VOID_ELEMENTS.has(tag);
}
