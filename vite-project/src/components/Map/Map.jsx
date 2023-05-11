import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import style from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const Maps = ({ location, name, direccion }) => {
  const position = location;
  return (
    <div className={style.divMap}>
      <MapContainer
        className={style.leaflet}
        center={{ lat: location[0].toString(), lng: location[1].toString() }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {name}
            <br />
            {direccion}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
