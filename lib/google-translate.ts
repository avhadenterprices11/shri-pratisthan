/**
 * Server-only Google Cloud Translation Service.
 *
 * Translates complete sentences from English into Hindi ('hi') and Marathi ('mr').
 * Uses the official Google Cloud Translation REST API (v2).
 *
 * SECURITY:
 * This file is executed ONLY on the server (Node.js runtime in Next.js route handlers).
 * The API key is NEVER exposed in the frontend bundle or client network tabs.
 */

export interface TranslationResult {
  hi: string;
  mr: string;
  isMock?: boolean;
}

export interface BatchTranslationInput {
  title?: string;
  content?: string;
  category?: string;
}

export interface BatchTranslationResult {
  title?: { hi: string; mr: string };
  content?: { hi: string; mr: string };
  category?: { hi: string; mr: string };
  isMock?: boolean;
}

/**
 * Calls Google Cloud Translation API v2 for a list of texts and a target language.
 */
async function callGoogleTranslateApi(
  texts: string[],
  targetLanguage: "hi" | "mr",
  apiKey: string
): Promise<string[]> {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: texts,
      source: "en",
      target: targetLanguage,
      format: "text", // "text" preserves clean formatting without HTML entity escaping
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[GoogleTranslate] API error (${response.status}):`, errorText);
    throw new Error(`Google Cloud Translation API error: ${response.statusText}`);
  }

  const data = await response.json();
  const translations = data?.data?.translations;

  if (!Array.isArray(translations)) {
    throw new Error("Invalid response format from Google Cloud Translation API");
  }

  return translations.map((item: { translatedText: string }) => item.translatedText);
}

/**
 * Intelligent fallback generator when GOOGLE_TRANSLATE_API_KEY is not yet configured in .env.local.
 * Provides context-aware placeholder translations so the app never crashes during setup.
 */
function mockTranslate(text: string, lang: "hi" | "mr"): string {
  if (!text.trim()) return "";

  // Common Marathi & Hindi mappings for common cultural phrases
  const dictionary: Record<string, { hi: string; mr: string }> = {
    announcement: { hi: "घोषणा", mr: "महत्त्वाची सूचना" },
    event: { hi: "कार्यक्रम", mr: "कार्यक्रम" },
    celebration: { hi: "उत्सव", mr: "उत्सव" },
    volunteer: { hi: "स्वयंसेवक", mr: "स्वयंसेवक" },
    meeting: { hi: "बैठक", mr: "बैठक" },
    festival: { hi: "त्योहार", mr: "सण आणि उत्सव" },
  };

  const lower = text.toLowerCase().trim();
  if (dictionary[lower]) {
    return dictionary[lower][lang];
  }

  // Meaningful prefix tag so admins clearly see it's generated via mock fallback
  const prefix = lang === "hi" ? "[हिन्दी अनुवाद]" : "[मराठी अनुवाद]";
  return `${prefix} ${text}`;
}

/**
 * Translates a single text block into both Hindi and Marathi.
 */
export async function translateTextToIndianLanguages(
  text: string
): Promise<TranslationResult> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey || apiKey === "your_google_cloud_translate_api_key_here") {
    console.warn(
      "[GoogleTranslate] GOOGLE_TRANSLATE_API_KEY is not set in environment. Using fallback translation."
    );
    return {
      hi: mockTranslate(text, "hi"),
      mr: mockTranslate(text, "mr"),
      isMock: true,
    };
  }

  try {
    const [hiResult, mrResult] = await Promise.all([
      callGoogleTranslateApi([text], "hi", apiKey),
      callGoogleTranslateApi([text], "mr", apiKey),
    ]);

    return {
      hi: hiResult[0] || "",
      mr: mrResult[0] || "",
      isMock: false,
    };
  } catch (error) {
    console.error("[GoogleTranslate] Translation failed, falling back to mock mode:", error);
    return {
      hi: mockTranslate(text, "hi"),
      mr: mockTranslate(text, "mr"),
      isMock: true,
    };
  }
}

/**
 * Batch-translates multiple fields (e.g. title, content, category) in a single API call per language.
 */
export async function batchTranslateFields(
  input: BatchTranslationInput
): Promise<BatchTranslationResult> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  const fields: (keyof BatchTranslationInput)[] = [];
  const texts: string[] = [];

  if (input.title?.trim()) {
    fields.push("title");
    texts.push(input.title.trim());
  }
  if (input.content?.trim()) {
    fields.push("content");
    texts.push(input.content.trim());
  }
  if (input.category?.trim()) {
    fields.push("category");
    texts.push(input.category.trim());
  }

  if (texts.length === 0) {
    return { isMock: false };
  }

  if (!apiKey || apiKey === "your_google_cloud_translate_api_key_here") {
    console.warn(
      "[GoogleTranslate] GOOGLE_TRANSLATE_API_KEY is not set. Generating fallback translations."
    );
    const result: BatchTranslationResult = { isMock: true };
    fields.forEach((field, i) => {
      result[field] = {
        hi: mockTranslate(texts[i], "hi"),
        mr: mockTranslate(texts[i], "mr"),
      };
    });
    return result;
  }

  try {
    const [hiResults, mrResults] = await Promise.all([
      callGoogleTranslateApi(texts, "hi", apiKey),
      callGoogleTranslateApi(texts, "mr", apiKey),
    ]);

    const result: BatchTranslationResult = { isMock: false };
    fields.forEach((field, i) => {
      result[field] = {
        hi: hiResults[i] || "",
        mr: mrResults[i] || "",
      };
    });
    return result;
  } catch (error) {
    console.error("[GoogleTranslate] Batch translation failed, falling back to mock:", error);
    const result: BatchTranslationResult = { isMock: true };
    fields.forEach((field, i) => {
      result[field] = {
        hi: mockTranslate(texts[i], "hi"),
        mr: mockTranslate(texts[i], "mr"),
      };
    });
    return result;
  }
}
