export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let value: any = obj;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      return path;
    }
  }
  return typeof value === 'string' ? value : path;
}

export function replacePlaceholders(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() ?? match;
  });
}

