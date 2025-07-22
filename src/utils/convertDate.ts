export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString("en-US", {
    month: "long",
  });
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${day} ${month}, ${year}`;
};
