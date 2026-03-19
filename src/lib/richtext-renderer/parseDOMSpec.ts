import type { ParsedDOMSpec } from './types';

/**
 * Simplified parser for ProseMirror/Tiptap DOM spec into a clean Astro-friendly format.
 * Returns { tag, attrs, staticChildren }.
 */
export function parseDOMSpec(spec: any): ParsedDOMSpec | null {
  if (!spec) return null;

  // If it's a string, just a tag with no attrs
  if (typeof spec === 'string') {
    return { tag: spec, attrs: {}, staticChildren: [] };
  }

  // If it's an HTMLElement, extract tag and attributes
  if (typeof spec === 'object' && spec.nodeType === 1) {
    const element = spec as HTMLElement;
    const attrs: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (attr.value != null && attr.value !== '') {
        attrs[attr.name] = attr.value;
      }
    }
    return { tag: element.tagName.toLowerCase(), attrs, staticChildren: [] };
  }

  // If it's an array, e.g. ["pre", { class: "foo" }, ["code", 0]]
  if (Array.isArray(spec)) {
    const tag = spec[0];
    let attrs: Record<string, any> = {};
    let contentIdx = 1;

    // Second element might be attrs object
    if (
      spec.length > 1 &&
      typeof spec[1] === 'object' &&
      !Array.isArray(spec[1]) &&
      spec[1]?.nodeType !== 1 &&
      spec[1] !== null
    ) {
      attrs = Object.fromEntries(
        Object.entries(spec[1]).filter(([_, v]) => v != null)
      );
      contentIdx = 2;
    }

    // Parse static children
    const staticChildren: ParsedDOMSpec[] = [];
    for (let i = contentIdx; i < spec.length; i++) {
      const childSpec = spec[i];
      if (Array.isArray(childSpec) || typeof childSpec === 'string') {
        const parsedChild = parseDOMSpec(childSpec);
        if (parsedChild) staticChildren.push(parsedChild);
      }
    }

    return { tag, attrs, staticChildren };
  }

  return null;
}
