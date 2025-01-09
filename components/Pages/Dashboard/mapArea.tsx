import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as GeoTIFF from "geotiff";
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
    const [geoTiffUrl, setGeoTiffUrl] = useState<string | null>(null);
    const [geoBounds, setGeoBounds] = useState<number[][] | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // Progress state

    useEffect(() => {
        // Fix the "Map container is already initialized" issue
        const container = L.DomUtil.get("map");
        if (typeof window === "undefined") return;
        if (container != null) {
            (container as HTMLElement & { _leaflet_id?: string })._leaflet_id =
                undefined;
        }
    }, []);

    const handleGeoTiffUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            alert("Please select a valid GeoTIFF file.");
            return;
        }

        const reader = new FileReader();

        reader.onloadstart = () => {
            setUploadProgress(0); // Reset progress at the start of the upload
        };

        reader.onprogress = (e) => {
            if (e.lengthComputable) {
                const progress = (e.loaded / e.total) * 100;
                setUploadProgress(progress); // Update progress
            }
        };

        reader.onloadend = async () => {
            setUploadProgress(100); // Set to 100% on complete
            setTimeout(() => setUploadProgress(0), 3000); // Hide progress bar after 3 seconds

            try {
                const tiff = await GeoTIFF.fromArrayBuffer(reader.result as ArrayBuffer);
                const image = await tiff.getImage();

                const [minX, minY, maxX, maxY] = image.getBoundingBox();
                setGeoBounds([
                    [minY, minX],
                    [maxY, maxX],
                ]);

                const raster = await image.readRasters({ interleave: true });
                const canvas = document.createElement("canvas");
                canvas.width = image.getWidth();
                canvas.height = image.getHeight();

                const ctx = canvas.getContext("2d");
                if (ctx) {



                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    for (let i = 0; i < raster.length; i++) {
                        imageData.data[i * 4] = raster[i]; // Red
                        imageData.data[i * 4 + 1] = raster[i]; // Green
                        imageData.data[i * 4 + 2] = raster[i]; // Blue
                        imageData.data[i * 4 + 3] = 255//255; // Alpha
                    }
                    ctx.putImageData(imageData, 0, 0);
                    setGeoTiffUrl(canvas.toDataURL());
                }
                 
                
            } catch (error) {
                console.error("Failed to process the GeoTIFF file:", error);
            }
        };

        // Start reading the file as an array buffer to track progress
        reader.readAsArrayBuffer(file);
    };

    const handleSaveGeoTiff = () => {
        if (!geoTiffUrl) {
            alert("No GeoTIFF loaded to save.");
            return;
        }
    
        // Convert the data URL to a Blob
        const dataUrlParts = geoTiffUrl.split(",");
        const mimeType = dataUrlParts[0].split(":")[1].split(";")[0];
        const byteString = atob(dataUrlParts[1]);
        const byteArray = new Uint8Array(byteString.length);
    
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([byteArray], { type: mimeType });
    
        // Create a link and trigger a download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "processed-geotiff.tif"; // Specify the filename
        link.click();
    
        // Revoke the URL after the download
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="relative h-full w-full">
            {/* File Upload for GeoTIFF */}
            <div className="absolute top-4 left-14 z-[1000] shadow-lg rounded bg-white p-2">
                <label className="block text-sm font-medium mb-2">
                    Upload GeoTIFF File
                </label>
                <input
                    type="file"
                    accept=".tif,.tiff"
                    onChange={handleGeoTiffUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
                <div className="absolute top-80 left-120 z-[1000] shadow-lg rounded bg-white p-2">
                    <div className="text-sm font-medium">Uploading: {Math.round(uploadProgress)}%</div>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div className="text-xs font-semibold inline-block py-1 uppercase">
                                Upload Progress
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="w-full bg-gray-200 rounded-full">
                                <div
                                    className="bg-blue-600 text-xs leading-none py-1 text-center text-white rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                >
                                    {Math.round(uploadProgress)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Container */}
            <MapContainer
                center={[53.6175090, 8.8305225]} //other palce  // Berlin coordinates ,
                zoom={13}
                style={{ height: "70vh", width: "100%" }}
            >
                {/* Base Map Layer */}
                <TileLayer url={activeLayer} />

                {/* GeoSearch Integration */}
                <GeoSearch />

                {/* Display GeoTIFF Overlay */}
                {geoTiffUrl && geoBounds && (
                    <ImageOverlay bounds={geoBounds} url={geoTiffUrl} />
                )}

                {/* Layer Options */}
                <div
                    className="absolute bottom-4 left-4 z-[1000] shadow-lg rounded"
                >
                    <Select onValueChange={(value: string) => setActiveLayer(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a layer" />
                        </SelectTrigger>
                        <SelectContent className="z-[1050]">
                            {mapLayers.map((layer) => (
                                <SelectItem key={layer.url} value={layer.url}>
                                    {layer.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


              {/* File Save Button */}
        {geoTiffUrl && (
            <div className="absolute top-4 right-4 z-[1000] shadow-lg rounded bg-white p-2">
             <button
                    onClick={handleSaveGeoTiff}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Save GeoTIFF
             </button>
    </div>
)}  
            </MapContainer>
        </div>
    );
};

export default MapArea;
