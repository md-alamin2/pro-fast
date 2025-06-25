import React, { Suspense, use, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FlyToDistrict from "./FlyToDistrict";

// 🔧 Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const branchesPromise = fetch("/data/warehouses.json").then((res) =>
  res.json()
);



const Coverage = () => {
  const branches = use(branchesPromise);
  // const [searchText, setSearchText] = useState("");
  const [searchedDistrict, setSearchedDistrict] = useState("");

  // Search handler
  const handleSearch = (e) => {
    const searchText = e.target.location.value
    e.preventDefault();
    setSearchedDistrict(searchText.trim()); // Triggers FlyToDistrict
    console.log(searchText);
  };

  return (
    <div className="p-4 my-10 py-10 bg-base-100 w-1/12 lg:container mx-auto rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl text-secondary font-bold mb-4">
          We are available in 64 districts
        </h1>

        {/* Search box */}
        <form
          onSubmit={handleSearch}
          className=" gap-2 mb-4"
        >
          <input
            type="text"
            name="location"
            placeholder="Search district (e.g., Dhaka)"
            className="input input-bordered w-full max-w-md rounded-full focus:outline-none"
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary text-black rounded-full -ml-19 z-10 relative">
            Search
          </button>
        </form>
      </div>

      {/* Map with dynamic fly-to */}
      <div className="max-w-6xl mx-auto mt-10 h-[600px] rounded-2xl shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Add flyTo Searched branch */}
          {searchedDistrict && <FlyToDistrict district={searchedDistrict} />}

          {/* Render all markers */}
          {branches.map((branch, index) => (
            <Marker
              key={index}
              position={[branch.latitude, branch.longitude]}
            >
              <Popup>
                <strong>{branch.district}</strong>
                <br />
                {branch.covered_area.join(", ")}
              </Popup>
              {/* Add hidden button for programmatic popup open */}
              <button
                className="hidden"
                data-popup={branch.district}
                onClick={(e) => {
                  e.stopPropagation();
                  e.target
                    .closest(".leaflet-marker-icon")
                    ?.dispatchEvent(new MouseEvent("click"));
                }}
              />
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
