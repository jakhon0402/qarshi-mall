import React from "react";
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// const IMAGE_BASE_URL = "http://localhost:8086/api/fayl/download/";
const IMAGE_BASE_URL = "https://api.qarshimall.uz/api/fayl/download/";

export const getStoreImage = (fileEntity) => {
  return fileEntity !== null && fileEntity?.id
    ? `${IMAGE_BASE_URL}${fileEntity?.id}?t=${new Date().getTime()}`
    : "https://bsmi.uz/wp-content/uploads/2021/12/empty-img.png";
};
