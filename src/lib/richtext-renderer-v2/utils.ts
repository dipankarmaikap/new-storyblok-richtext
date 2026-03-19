import type { Mark, StoryblokRichTextJson } from ".";
import { MARK_RENDER_MAP, NODE_RENDER_MAP } from "./tiptap-render-map.generated";

export function resolveType(type: unknown) {
  if (typeof type !== 'string') return null;

  if (type in NODE_RENDER_MAP) {
    return { kind: 'node', config: NODE_RENDER_MAP[type as keyof typeof NODE_RENDER_MAP] };
  }

  if (type in MARK_RENDER_MAP) {
    return { kind: 'mark', config: MARK_RENDER_MAP[type as keyof typeof MARK_RENDER_MAP] };
  }

  return null;
}
export function resolveTag(node: StoryblokRichTextJson) {
  const map = NODE_RENDER_MAP[node.type as keyof typeof NODE_RENDER_MAP];

  if (!map) return 'div';

  // If map has a resolve function, call it
  if ('resolve' in map && typeof map.resolve === 'function') {
    return map.resolve(node.attrs ?? {});
  }

  // If map has a tag, return it
  if ('tag' in map) {
    return map.tag;
  }

  return 'div'; // fallback
}
export function resolveMarkTag(node: Mark) {
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
      styles['color'] = value;
      continue;
    }

    if (key === 'level') {
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
