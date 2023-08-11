import { useState, useEffect, useRef } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(3.057841);
  const [lat, setLat] = useState(36.7538259);
  const [zoom, setZoom] = useState(9);
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_PUBLIC_ACCESS_TOKEN,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl()); // add zoom and rotation controls to the map.
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 5000, // 5 seconds timeout to get the user's location from the device
          trackUserLocation: true,
        }, // When active the map will receive updates to the device's location as it changes.
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    setMarker(
      new Marker({
        color: "#03FF3B",
      })
        .setLngLat([lng, lat])
        .addTo(map.current)
    );
  }, [map]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      //if (marker) {
      //  //@ts-ignore
      //  marker.setLngLat([
      //    map.current.getCenter().lng,
      //    map.current.getCenter().lat,
      //  ]);
      //}
    });
  }, [map, marker]);

  return <div ref={mapContainer} className="w-screen h-screen" />;
}

export default Map;
