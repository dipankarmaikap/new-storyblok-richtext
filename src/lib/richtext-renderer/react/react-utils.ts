/**
 * A map of HTML attributes to their React prop equivalents.
 */
const attributeMap: { [key: string]: string } = {
  class: "className",
  colspan: "colSpan",
  rowspan: "rowSpan",
  for: "htmlFor",
};

/**
 * Converts an object of HTML attributes to React-compatible props.
 * @param attrs - An object of HTML attributes.
 * @returns An object with React-compatible props.
 */
export function toReactProps(attrs: Record<string, any>): Record<string, any> {
  if (!attrs) {
    return {};
  }
  const newAttrs: Record<string, any> = {};
  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      const newKey = attributeMap[key] || key;
      newAttrs[newKey] = attrs[key];
    }
  }
  return newAttrs;
}
