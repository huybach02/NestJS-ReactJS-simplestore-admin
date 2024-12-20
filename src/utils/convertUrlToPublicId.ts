export const convertUrlToPublicId = (url: string) => {
  const publicId = url.split("/simplestore")[1].replace(".png", "");
  return "simplestore" + publicId;
};
