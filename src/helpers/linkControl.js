export const linkControl = (url) => {
  const httpRegex = /^https?:\/\//;
  const link = httpRegex.test(url) ? url : `https://${url}`;
  return link;
};
