export const dailyData = (data) =>
  data.reduce((acc, item) => {
    const date = new Date(item?.createdAt * 1000)?.toISOString()?.split("T")[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += item?.price * item?.count;
    return acc;
  }, {});

export const monthlyData = (data) =>
  data.reduce((acc, item) => {
    const month = new Date(item?.createdAt * 1000)?.toISOString()?.slice(0, 7); // Extract the year and month
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += item?.price * item?.count;
    return acc;
  }, {});
