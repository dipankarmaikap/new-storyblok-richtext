import type {
  PMMark,
  PMNode,
  RichTextComponentProps,
  TiptapComponentName,
  TiptapMarkName,
  TiptapNodeName,
} from "./vue";
import {
  MARK_RENDER_MAP,
  NODE_RENDER_MAP,
} from "./tiptap-render-map.generated";
import {
  markAttributeMappers,
  nodeAttributeMappers,
} from "../attribute-mappers";

export function resolveComponent<
  K extends TiptapComponentName,
  M extends Partial<Record<TiptapComponentName, (props: any) => any>>,
>(type: K, components?: M) {
  return components?.[type] as
    | ((props: RichTextComponentProps<K>) => any)
    | undefined;
}

export function resolveTag(node: PMNode) {
  const map = NODE_RENDER_MAP[node.type as keyof typeof NODE_RENDER_MAP];

  if (!map) return "div";

  // If map has a resolve function, call it
  if ("resolve" in map && typeof map.resolve === "function") {
    return map.resolve(node.attrs as Parameters<typeof map.resolve>[0]);
  }

  // If map has a tag, return it
  if ("tag" in map) {
    return map.tag;
  }

  return "div"; // fallback
}
export function resolveMarkTag(node: PMMark) {
  const map = MARK_RENDER_MAP[node.type as keyof typeof MARK_RENDER_MAP];
  if (!map) return "span";
  // If map has a tag, return it
  if ("tag" in map) {
    return map.tag;
  }
  return "span"; // fallback
}

export function transformAttrs(
  attrs: Record<string, any> = {},
  options?: { nodeType?: TiptapNodeName; markType?: TiptapMarkName }, // context for nodes/marks
): Record<string, any> {
  // 1. Get base attributes from the render map (e.g., static classes, styles)
  let baseAttrs: Record<string, any> = {};
  if (options?.nodeType) {
    const map = NODE_RENDER_MAP[options.nodeType];
    if (map && "attrs" in map) {
      baseAttrs = { ...map.attrs };
    }
  } else if (options?.markType) {
    const map = MARK_RENDER_MAP[options.markType];
    if (map && "attrs" in map) {
      baseAttrs = { ...map.attrs };
    }
  }

  // 2. Merge with dynamic attributes from the node, allowing them to override static ones.
  const dynamicAttrs = { ...attrs };

  // 3. Apply specific attribute mappers for the given node/mark type.
  // This handles special logic like `textAlign` -> `style`, `fallbackImage` -> `src`, etc.
  let mappedAttrs: Record<string, any> = {};
  if (options?.nodeType && nodeAttributeMappers[options.nodeType]) {
    mappedAttrs = nodeAttributeMappers[options.nodeType]!(dynamicAttrs as any);
  } else if (options?.markType && markAttributeMappers[options.markType]) {
    mappedAttrs = markAttributeMappers[options.markType]!(dynamicAttrs as any);
  } else {
    // If no mapper, just use the dynamic attributes as is.
    mappedAttrs = dynamicAttrs;
  }

  // 4. Combine all attributes. The order is important:
  // - Mapped attributes (which contain the original attributes minus the ones they transformed).
  // - Base attributes from the render map.
  const finalAttrs = { ...baseAttrs, ...mappedAttrs };

  // 5. Merge style strings if both base and mapped attributes have them.
  if (baseAttrs.style && mappedAttrs.style) {
    finalAttrs.style = `${baseAttrs.style};${mappedAttrs.style}`;
  }

  // Filter out any null/undefined values before returning
  return Object.fromEntries(
    Object.entries(finalAttrs).filter(([, value]) => value != null),
  );
}
export function styleStringToObject(style?: string): Record<string, string> {
  if (!style) return {};

  return Object.fromEntries(
    style
      .split(";")
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => {
        const [key, value] = rule.split(":");
        return [
          key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
          value.trim(),
        ];
      }),
  );
}

function resolveNestedTag(type: PMNode["type"]) {
  const map = NODE_RENDER_MAP[type as keyof typeof NODE_RENDER_MAP];
  // TypeScript-safe: only access staticChildren if map has a tag
  if (map && "tag" in map) {
    return {
      ...map,
      staticChildren: map.staticChildren ?? [],
    };
  }
  // If map only has resolve function, return as-is
  return map;
}

export function getStaticChildren(type: PMNode["type"]) {
  const nested = resolveNestedTag(type);
  const staticChildren =
    nested && "staticChildren" in nested ? nested.staticChildren : [];
  return staticChildren;
}
