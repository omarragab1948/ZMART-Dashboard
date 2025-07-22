const currency = (value: number) => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(value));
};

export default currency;
