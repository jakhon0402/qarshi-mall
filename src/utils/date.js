export const getMonthName = (num) => {
  switch (num) {
    case 0:
      return "Yanvar";
    case 1:
      return "Fevral";
    case 2:
      return "Mart";
    case 3:
      return "Aprel";
    case 4:
      return "May";
    case 5:
      return "Iyun";
    case 6:
      return "Iyul";
    case 7:
      return "Avgust";
    case 8:
      return "Sentabr";
    case 9:
      return "Oktabr";
    case 10:
      return "Noyabr";
    case 11:
      return "Dekabr";
    default:
      return ""; // You can handle invalid inputs here
  }
};
