const PROJECT = 'life-signs-be094';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

function parseValue(v: any): any {
  if (v == null) return null;
  if ('stringValue'    in v) return v.stringValue;
  if ('booleanValue'   in v) return v.booleanValue;
  if ('integerValue'   in v) return parseInt(v.integerValue, 10);
  if ('doubleValue'    in v) return v.doubleValue;
  if ('nullValue'      in v) return null;
  if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue'     in v) return (v.arrayValue.values || []).map(parseValue);
  if ('mapValue'       in v) return parseFields(v.mapValue.fields || {});
  return null;
}

function parseFields(fields: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = parseValue(v);
  return out;
}

export async function getDoc(collection: string, id: string): Promise<Record<string, any> | null> {
  if (!id) return null;
  try {
    const res = await fetch(
      `${BASE}/${collection}/${encodeURIComponent(id)}`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return null;
    const doc = await res.json();
    return doc?.fields ? parseFields(doc.fields) : null;
  } catch {
    return null;
  }
}
