/**
 * The single source of truth for turning a service display name into a URL
 * segment. Every place that builds or resolves a service URL must call these
 * functions. Do not write a second implementation.
 *
 * Rules, per the readiness brief section 2.3:
 *   lowercase; strip punctuation, including commas, periods, and ampersands;
 *   collapse whitespace runs to a single hyphen; collapse repeated hyphens;
 *   trim leading and trailing hyphens.
 *
 * Arabic letters are preserved rather than stripped, so that a name written in
 * Arabic degrades to a readable slug instead of an empty string. No current
 * service name contains Arabic. `assertSlugsAreRoutable` below is what stops
 * such a name from reaching production unnoticed.
 */

/** Arabic, plus the Arabic Supplement and Extended-A ranges. */
const ARABIC = "؀-ۿݐ-ݿࢠ-ࣿ";

const NON_SLUG = new RegExp("[^a-z0-9" + ARABIC + "]+", "g");

export function slugify(displayName: string): string {
  return displayName
    .normalize("NFKC")
    .toLowerCase()
    .replace(NON_SLUG, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The shape the Apache rewrite and the sitemap can actually serve. */
const ROUTABLE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isRoutableSlug(slug: string): boolean {
  return ROUTABLE.test(slug);
}

/**
 * Fails loudly rather than serving the wrong service.
 *
 * Two names that collapse to the same slug would make one of them
 * unreachable, and a slug outside the routable set would 404 behind a rewrite
 * that cannot match it. Both are silent failures in production, so they are
 * raised here instead.
 */
export function assertSlugsAreRoutable(displayNames: string[]): void {
  const namesBySlug: { [slug: string]: string[] } = {};

  displayNames.forEach(function (name) {
    const slug = slugify(name);
    if (namesBySlug[slug]) {
      namesBySlug[slug].push(name);
    } else {
      namesBySlug[slug] = [name];
    }
  });

  const collisions: string[] = [];
  const unroutable: string[] = [];

  Object.keys(namesBySlug).forEach(function (slug) {
    const names = namesBySlug[slug];
    if (names.length > 1) {
      collisions.push('"' + slug + '" <- ' + names.join(", "));
    }
    if (!isRoutableSlug(slug)) {
      unroutable.push('"' + slug + '"');
    }
  });

  if (collisions.length) {
    throw new Error("Service slug collision: " + collisions.join("; "));
  }
  if (unroutable.length) {
    throw new Error(
      "Service slug is not routable by the /services/ rewrite: " +
        unroutable.join(", ")
    );
  }
}

/** Resolves a slug back to the display name that is the database key. */
export function findNameBySlug(
  requestedSlug: string,
  displayNames: string[]
): string | null {
  const target = slugify(requestedSlug);
  for (let i = 0; i < displayNames.length; i++) {
    if (slugify(displayNames[i]) === target) {
      return displayNames[i];
    }
  }
  return null;
}

/** The public URL for a service, always slugged. */
export function serviceUrl(displayName: string): string {
  return "/services/" + slugify(displayName);
}
