export const transformTitle = (title: string): string => {
  let transformed = title.toLowerCase();

  if (transformed.endsWith("ies")) {
    transformed = transformed.slice(0, -3) + "y";
  } else if (transformed.endsWith("es")) {
    transformed = transformed.slice(0, -2);
  } else if (transformed.endsWith("s")) {
    transformed = transformed.slice(0, -1);
  }

  return transformed;
};
