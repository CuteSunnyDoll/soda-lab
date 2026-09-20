// Bundles generated recipe photos (src/assets/recipes/*.{png,jpg,jpeg}) into a
// recipe-id -> asset URL map. Vite inlines/re-hashes assets at build time.
const modules = import.meta.glob('../assets/recipes/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function keyFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.(png|jpg|jpeg)$/, '');
}

export const RECIPE_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [keyFromPath(path), url as string]),
);

export function getRecipeImage(recipeId: string, customImage?: string): string {
  if (RECIPE_IMAGES[recipeId]) {
    return RECIPE_IMAGES[recipeId];
  }
  if (customImage && customImage.startsWith('http')) {
    return customImage;
  }
  return '';
}
