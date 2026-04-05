export function toSlug(cityNameEn: string): string {
  return cityNameEn.toLowerCase().replace(/\s+/g, "-");
}
