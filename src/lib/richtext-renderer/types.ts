
/**
 * Parsed DOM Output Specification for a Node or Mark
 */
export interface ParsedDOMSpec {
  tag: string;
  attrs: Record<string, any>;
  hasHole: boolean;
  children: Array<ParsedDOMSpec | string | { hole: true }>;
}

export interface SbBlokData {
_key: string;
component: string;
[otherKey: string]: any;
}
