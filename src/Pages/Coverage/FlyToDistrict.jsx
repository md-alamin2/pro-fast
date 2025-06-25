import React, { use } from "react";
import { useMap } from "react-leaflet";
import { toast } from "react-toastify";

const branchesPromise = fetch("/data/warehouses.json").then((res) =>
  res.json()
);

const FlyToDistrict = ({ district }) => {
  const branches = use(branchesPromise);
  const map = useMap();
  const matched = branches.find((b) =>
    b.district.toLowerCase().includes(district.toLowerCase())
  );
  if (matched) {
    map.flyTo([matched.latitude, matched.longitude], 14, { duration: 0.5 });

    // Wait a bit and open popup
    setTimeout(() => {
      const popup = document.querySelector(
        `[data-popup='${matched.district}']`
      );
      if (popup) popup.click(); // Trigger marker click
    }, 1500);
  } else {
    toast.error("There is no Branch");
  }

  return null;
};

export default FlyToDistrict;
