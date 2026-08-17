/* ──────────────────────────────────────────────────────────────
   Cloudinary — Mapping centralisé des vidéos KREADS
   
   Toutes les vidéos sont hébergées sur Cloudinary avec
   optimisation automatique (qualité + format adaptatifs).
   ────────────────────────────────────────────────────────────── */

const CLOUD_NAME = "mn6mspfb";

/**
 * Génère une URL Cloudinary optimisée pour une vidéo.
 *
 * Transformations appliquées :
 * - `q_auto`  → qualité adaptative (réduit le poids sans perte visible)
 * - `f_auto`  → format optimal selon le navigateur (WebM, MP4…)
 */
export function cloudinaryVideo(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}`;
}

/* ── Public IDs des 9 vidéos ── */

/** Vêtement — Spot fashion */
export const VID_FASHION_SPOT = cloudinaryVideo("kreads/fashion-spot");

/** Vélo — Spinning hook */
export const VID_SPINNING_HOOK = cloudinaryVideo("kreads/spinning-hook");

/** Vélo — Produit en action */
export const VID_VELO_ACTION = cloudinaryVideo("kreads/velo-action");

/** Roller — Vision enhance */
export const VID_ROLLER_VISION = cloudinaryVideo("kreads/roller-vision");

/** Rasoir — Spot produit 01 */
export const VID_RASOIR_01 = cloudinaryVideo("kreads/rasoir-01");

/** Rasoir — Spot produit 03 */
export const VID_RASOIR_03 = cloudinaryVideo("kreads/rasoir-03");

/** Lunettes — Spot publicitaire */
export const VID_LUNETTES_SPOT = cloudinaryVideo("kreads/lunettes-spot");

/** Fitness — Hook 3 secondes */
export const VID_FITNESS_HOOK = cloudinaryVideo("kreads/fitness-hook");

/** Mode — Storytelling produit */
export const VID_MODE_STORYTELLING = cloudinaryVideo("kreads/mode-storytelling");

/* ── Exports groupés ── */

/** Les 7 vidéos du carousel Hero (dans l'ordre d'affichage) */
export const HERO_VIDEOS = [
  VID_FASHION_SPOT,
  VID_SPINNING_HOOK,
  VID_VELO_ACTION,
  VID_ROLLER_VISION,
  VID_RASOIR_01,
  VID_RASOIR_03,
  VID_LUNETTES_SPOT,
];
