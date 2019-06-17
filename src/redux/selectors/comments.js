export default (comments) => {
  return comments.sort((a,b) => {
    return a.updatedAt < b.updatedAt ? -1 : 1;
  });
};