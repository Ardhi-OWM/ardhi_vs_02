"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function InputSection() {
    const [inputType, setInputType] = useState("api"); // Default to "API"
    const [inputValue, setInputValue] = useState("");

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setInputType(e.target.value);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    return (
        <div className="space-y-4 mr-2">
            {/* Dropdown to select input type */}
            <label htmlFor="input-type" className="block text-sm font-medium ">
                Select Input Type
            </label>
            <select
                id="input-type"
                className="block w-full px-3 py-2 border border-gray-400/[.25] rounded-md bg-transparent"
                value={inputType}
                onChange={handleTypeChange}
            >
                <option value="api">API</option>
                <option value="ml-model">Link to  Model</option>
                <option value="dataset">Link to Dataset</option>
            </select>

            {/* Input field based on selection */}
            <div>
                <label htmlFor="dynamic-input" className="block text-sm font-medium ">
                    {inputType === "api"
                        ? "Enter API"
                        : inputType === "ml-model"
                            ? "Enter Link to the Model"
                            : "Enter Link to Dataset"}
                </label>
                <Input
                    id="dynamic-input"
                    type="text"
                    placeholder={
                        inputType === "api"
                            ? "API Endpoint"
                            : inputType === "ml-model"
                                ? "Model URL"
                                : "Dataset URL"
                    }
                    value={inputValue}
                    onChange={handleInputChange}
                    className=" border-gray-400/[.25]"
                />
            </div>
        </div>
    );
}
