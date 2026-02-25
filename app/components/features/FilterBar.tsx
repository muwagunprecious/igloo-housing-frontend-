"use client";

import { categories } from "@/app/data/categories";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function FilterBar() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <div className="bg-white pt-4 pb-2">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row items-center justify-between gap-8">
                {/* Categories List */}
                <div className="flex-1 flex flex-row items-center justify-between overflow-x-auto gap-8 hide-scrollbar pb-2">
                    {categories.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => setSelectedCategory(item.label)}
                            className={`
                flex flex-col items-center justify-center gap-2 p-2 border-b-2 hover:text-gray-800 transition cursor-pointer min-w-fit
                ${selectedCategory === item.label ? 'border-black text-black' : 'border-transparent text-gray-500'}
              `}
                        >
                            <item.icon size={24} />
                            <div className="font-medium text-xs whitespace-nowrap">{item.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filter Button (Desktop) */}
                <div className="hidden md:flex">
                    <button className="flex flex-row items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:border-black transition text-sm font-semibold">
                        <SlidersHorizontal size={16} />
                        <span>Filters</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
