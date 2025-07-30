const isArray = <T>(items:T) => {
  return Array.isArray(items) ? items : [];
};

export default isArray;
