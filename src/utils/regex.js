export const getMoneyPattern = (val, splitBy = " ") => {
  if (val === null) {
    return "0";
  }
  // if (val) {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, splitBy);
  // }
};

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
