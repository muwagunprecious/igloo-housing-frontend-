"use client";

import PropertyCard from "./components/features/PropertyCard";
import FilterBar from "./components/features/FilterBar";
import UniversitySearch from "./components/features/UniversitySearch";
import { usePropertyStore } from "@/app/stores/usePropertyStore";
import { Map } from "lucide-react";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function Home() {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const { properties, fetchProperties, isLoading, error } = usePropertyStore();

  useEffect(() => {
    fetchProperties(selectedUniversity ? { universityId: selectedUniversity } : {});
  }, [fetchProperties, selectedUniversity]);

  // Use properties directly from store (server-side filtered)
  const displayedProperties = properties;

  return (
    <div className="relative pt-[80px]">
      {/* University Search Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2">Find Your Perfect Student Home</h1>
            <p className="text-gray-600">Search by university or location</p>
          </div>
          <div className="flex justify-center">
            <UniversitySearch
              selectedUniversity={selectedUniversity}
              onSelect={setSelectedUniversity}
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[80px] bg-white z-40 border-b border-gray-200">
        <FilterBar />
      </div>

      {/* Property Grid */}
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-6 pb-20">
        <div className="mb-4">
          {isLoading ? (
            <p className="text-sm text-gray-600">Loading properties...</p>
          ) : error ? (
            <p className="text-sm text-red-600">Error loading properties: {error}</p>
          ) : (
            <p className="text-sm text-gray-600">
              {displayedProperties.length} properties available
              {selectedUniversity && " near selected university"}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {displayedProperties.map((property) => {
            // Map backend property to frontend PropertyCard props
            const mappedProperty = {
              id: property.id,
              title: property.title,
              images: property.images.length > 0 ? property.images.map(img => getImageUrl(img)) : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"], // Fallback image
              location: {
                lat: 0,
                lng: 0,
                address: property.location
              },
              distance: "N/A",
              period: "year",
              price: property.price,
              rating: 4.5, // Default
              description: property.description
            };

            return <PropertyCard key={property.id} property={mappedProperty} />;
          })}
        </div>
      </div>

      {/* Floating Map Button (Mobile/Tablet) */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 md:hidden">
        <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg font-semibold hover:scale-105 transition">
          <span>Map</span>
          <Map size={18} />
        </button>
      </div>
    </div>
  );
}
