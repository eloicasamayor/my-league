export function nameToUrlName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/["']/g, "-")
    .replace(/["·^]/g, "-")
    .toLowerCase();
}
