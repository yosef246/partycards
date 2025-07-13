import React, { useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import styles from "./map.module.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");

  //שולחת בקשת fetch ל־Nominatim (שירות של OpenStreetMap) כדי להמיר קואורדינטות לכתובת טקסטואלית.
  const handleMapClick = useCallback(
    (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          const displayName = data.display_name || "לא נמצא מיקום";
          setAddress(displayName);
          onLocationSelect({ lat, lng, address: displayName });
        });
    },
    [onLocationSelect]
  );

  //מדפיס לי את הכתובת רק כאשר היא משתנה
  useEffect(() => {
    if (address) {
      console.log("כתובת נבחרת:", address);
    }
  }, [address]);

  // במיקום Marker  מציב  position אם יש  handleMapClick מאזין לאירועים במפה ברגע שיש לחיצה מפעיל את
  function LocationMarker() {
    useMapEvents({
      click: handleMapClick,
    });
    return position === null ? null : <Marker position={position}></Marker>;
  }

  return (
    <div className={styles.locationpicker}>
      <div className={styles.mapcontainer}>
        {/* המפה עצמה */}
        <MapContainer
          center={[32.0853, 34.7818]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          {/* טוען את האריחים של המפה (רקע וגרפיקה) */}
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* מאזין לקליקים ומציב סימון */}
          <LocationMarker />
        </MapContainer>
      </div>
      {/* {address && (
        <div className={styles.addressbox}>
          <strong>כתובת נבחרת:</strong> {address}
        </div>
      )} */}
    </div>
  );
}

export default LocationPicker;
