"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mapLayers } from "@/components/Pages/Dashboard/constants/mapLayers";
import { GeoSearch } from "@/components/Pages/Dashboard/mapComponents/geosearch";

const MapArea: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState(
        mapLayers.find((layer) => layer.default)?.url || mapLayers[0].url,
    );

    useEffect(() => {
        // Fix the "Map container is already initialized" issue
        const container = L.DomUtil.get("map");
        if (typeof window === "undefined") return;
        if (container != null) {
            (container as HTMLElement & { _leaflet_id?: string })._leaflet_id =
                undefined;
        }
    }, []);

    return (
        <div className="relative h-full w-full">
            {/* Map Container */}
            <MapContainer
                center={[52.52, 13.4049]} // Berlin coordinates
                zoom={13}
                style={{ height: "70vh", width: "100%" }}
            >
                {/* Base Map Layer */}
                <TileLayer url={activeLayer} />

                {/* GeoSearch Integration */}
                <GeoSearch />

                {/* Layer Options */}
                <div
                    className="absolute bottom-4 left-4 z-[1000] shadow-lg rounded "
                >
                    <Select onValueChange={(value: string) => setActiveLayer(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a layer" />
                        </SelectTrigger>
                        <SelectContent
                            className="z-[1050]"
                        >
                            {mapLayers.map((layer) => (
                                <SelectItem key={layer.url} value={layer.url}>
                                    {layer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </MapContainer>
        </div>
    );
};

export default MapArea;
