import {
  contentDocumentPath,
  firebaseConfig,
  isFirebaseConfigured,
  PROJECT_ID,
} from "./firebaseConfig";

function parseFirestoreValue(value = {}) {
  if ("stringValue" in value) return value.stringValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("nullValue" in value) return null;
  if ("referenceValue" in value) return value.referenceValue;

  if ("arrayValue" in value) {
    return (value.arrayValue?.values || []).map((item) => parseFirestoreValue(item));
  }

  if ("mapValue" in value) {
    return parseFirestoreFields(value.mapValue?.fields || {});
  }

  return undefined;
}

function parseFirestoreFields(fields = {}) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, parseFirestoreValue(value)]),
  );
}

export async function fetchPortfolioContent() {
  if (!isFirebaseConfigured || !firebaseConfig.apiKey || !PROJECT_ID) {
    return null;
  }

  const documentPath = contentDocumentPath.join("/");
  const endpoint = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${documentPath}?key=${firebaseConfig.apiKey}`;

  const response = await fetch(endpoint, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Could not fetch portfolio content.");
  }

  const payload = await response.json();
  return parseFirestoreFields(payload.fields || {});
}
