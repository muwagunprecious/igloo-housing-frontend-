"use client";

import { universities } from "@/app/data/universities";
import { MapPin, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface UniversitySearchProps {
    onSelect: (universityId: string | null) => void;
    selectedUniversity: string | null;
}

export default function UniversitySearch({ onSelect, selectedUniversity }: UniversitySearchProps) {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedUni = universities.find((u) => u.id === selectedUniversity);
    const displayValue = selectedUni ? selectedUni.name : query;

    const filteredUniversities = universities.filter((uni) =>
        uni.name.toLowerCase().includes(query.toLowerCase()) ||
        uni.location.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (uni: typeof universities[0]) => {
        onSelect(uni.id);
        setQuery(uni.name);
        setShowDropdown(false);
    };

    const handleClear = () => {
        onSelect(null);
        setQuery("");
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full max-w-2xl" ref={dropdownRef}>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                </div>
                <input
                    type="text"
                    value={displayValue}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowDropdown(true);
                        if (selectedUniversity) onSelect(null);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search by university or location..."
                    className="w-full pl-12 pr-24 py-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm hover:shadow-md transition"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {selectedUniversity && (
                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-500 hover:text-black px-3 py-1 rounded-full hover:bg-gray-100 transition"
                        >
                            Clear
                        </button>
                    )}
                    <button className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition">
                        <Search size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {showDropdown && filteredUniversities.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-floating max-h-96 overflow-y-auto z-50">
                    {filteredUniversities.map((uni) => (
                        <button
                            key={uni.id}
                            onClick={() => handleSelect(uni)}
                            className="w-full px-6 py-4 hover:bg-gray-50 transition text-left border-b border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm">{uni.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{uni.location}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showDropdown && query && filteredUniversities.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-floating p-6 text-center z-50">
                    <p className="text-gray-500 text-sm">No universities found</p>
                </div>
            )}
        </div>
    );
}
