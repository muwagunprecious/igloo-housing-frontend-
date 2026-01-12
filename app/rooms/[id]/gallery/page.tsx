"use client";

import { useParams, useRouter } from "next/navigation";
import { properties } from "@/app/data/properties";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function GalleryPage() {
    const params = useParams();
    const router = useRouter();
    const property = properties.find((p) => p.id === params.id) || properties[0];
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="fixed inset-0 bg-black z-50">
            <button
                onClick={() => router.back()}
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition z-10"
            >
                <X size={24} />
            </button>Status

            <div className="h-full flex items-center justify-center p-4">
                <div className="relative w-full max-w-6xl aspect-video">
                    <Image
                        src={getImageUrl(property.images[selectedIndex])}
                        alt={`Photo ${selectedIndex + 1}`}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {property.images.map((img: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${idx === selectedIndex ? 'border-white' : 'border-transparent opacity-60'
                                }`}
                        >
                            <Image src={getImageUrl(img)} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
