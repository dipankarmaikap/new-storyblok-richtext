import type { TiptapComponentName } from "@/lib/richtext-renderer";
import type { Component } from "vue";

export function resolveComponent<
  K extends TiptapComponentName,
  M extends Partial<Record<TiptapComponentName, Component>>,
>(type: K, components?: M): Component | undefined {
  return components?.[type];
}
