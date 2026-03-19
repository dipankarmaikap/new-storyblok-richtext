import type { PMMark, PMNode } from ".";
import { MARK_RENDER_MAP, NODE_RENDER_MAP } from "./tiptap-render-map.generated";

export function resolveTag(node: PMNode) {
  const map = NODE_RENDER_MAP[node.type as keyof typeof NODE_RENDER_MAP];

  if (!map) return 'div';

  // If map has a resolve function, call it
  if ('resolve' in map && typeof map.resolve === 'function') {
    return map.resolve(node.attrs as Parameters<typeof map.resolve>[0]);
  }

  // If map has a tag, return it
  if ('tag' in map) {
    return map.tag;
  }

  return 'div'; // fallback
}
export function resolveMarkTag(node: PMMark) {
  const map = MARK_RENDER_MAP[node.type as keyof typeof MARK_RENDER_MAP];
  if (!map) return 'span';
  // If map has a tag, return it
  if ('tag' in map) {
    return map.tag;
  }
  return 'span'; // fallback
}

export function transformAttrs(
  attrs: Record<string, any> = {}, 
  options?: { markType?: string } // optional context for marks
): Record<string, any> {
  const result: Record<string, any> = {};
  const styles: Record<string, string> = {};

  for (const key in attrs) {
    const value = attrs[key];
    if (value == null) continue;

    if (key === 'class') {
      result.class = value;
      continue;
    }
    if (key === 'textAlign') {
      styles['text-align'] = value;
      continue;
    }
    if (key === 'color') {
      // If this is a highlight mark, treat as background-color
      if (options?.markType === 'highlight') {
        styles['background-color'] = value;
      } else {
        styles['color'] = value;
      }
      continue;
    }

    if (key === 'level') {
      continue;
    }
    if (key === "fallbackImage") {      
      result["src"]= value;
      continue;
      
    }
    result[key] = value;
  }

  // Convert styles object → string
  if (Object.keys(styles).length > 0) {
    result.style = Object.entries(styles)
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
  }

  return result;
}


export function resolveNestedTag(type: PMNode['type']) {
  const map = NODE_RENDER_MAP[type as keyof typeof NODE_RENDER_MAP];

  // TypeScript-safe: only access staticChildren if map has a tag
  if (map && 'tag' in map) {
    return {
      ...map,
      staticChildren: map.staticChildren ?? []
    };
  }

  // If map only has resolve function, return as-is
  return map;
}
