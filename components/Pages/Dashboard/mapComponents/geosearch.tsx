"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

export const GeoSearch: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        if (!map) {
            console.error("Map instance not available");
            return;
        }

        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            style: "bar", // Use "button" for a minimal style
            showMarker: false,
            retainZoomLevel: false,
            autoClose: true,
            searchLabel: "Search for a location...",
            keepResult: true,
        });

        map.addControl(searchControl);

        // Cleanup on component unmount
        return () => {
            map.removeControl(searchControl);
        };
    }, [map]);

    return null;
};
