import { Pairing, VIBES, Vibe } from "@/data/pairings";

export interface SearchablePairing extends Pairing {
  vibe: Vibe;
  vibeLabel: string;
  vibeEmoji: string;
  accent: string;
}

/** Flatten all pairings across every vibe into a single array. */
export function getAllPairings(): SearchablePairing[] {
  const result: SearchablePairing[] = [];
  for (const [vibeKey, vibeData] of Object.entries(VIBES)) {
    for (const pairing of vibeData.pairings) {
      result.push({
        ...pairing,
        vibe: vibeKey as Vibe,
        vibeLabel: vibeData.label,
        vibeEmoji: vibeData.emoji,
        accent: vibeData.accent,
      });
    }
  }
  return result;
}

/**
 * Score and return pairings that match the user's natural-language query.
 *
 * Scoring:
 *  +3  exact keyword match
 *  +2  exact tag match
 *  +1  partial match (query token appears inside a keyword)
 *  +1  vibe name / label match
 *
 * Returns pairings with score > 0, sorted by score descending.
 * If nothing scores above 0, returns the top 3 by partial match as fallback.
 */
export function searchPairings(
  query: string,
  allPairings: SearchablePairing[]
): SearchablePairing[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];

  // Tokenize: split on whitespace and commas, drop empty tokens
  const tokens = raw
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);

  if (tokens.length === 0) return [];

  const scored = allPairings.map((pairing) => {
    let score = 0;

    const kwLower = pairing.keywords.map((k) => k.toLowerCase());
    const tagLower = pairing.tags.map((t) => t.toLowerCase());
    const vibeLower = pairing.vibe.toLowerCase();
    const vibeLabelLower = pairing.vibeLabel.toLowerCase();

    for (const token of tokens) {
      // +3 exact keyword match
      for (const kw of kwLower) {
        if (kw === token) {
          score += 3;
        }
      }

      // +2 exact tag match
      for (const tag of tagLower) {
        if (tag === token) {
          score += 2;
        }
      }

      // +1 partial match — token appears inside a keyword
      for (const kw of kwLower) {
        if (kw !== token && kw.includes(token)) {
          score += 1;
        }
      }

      // +1 vibe name / label match
      if (vibeLower.includes(token) || vibeLabelLower.includes(token)) {
        score += 1;
      }
    }

    return { pairing, score };
  });

  const matched = scored.filter((s) => s.score > 0);

  if (matched.length > 0) {
    return matched
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((s) => s.pairing);
  }

  // Fallback: return top 3 by partial match (score may still be 0)
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.pairing);
}
