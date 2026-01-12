"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadFieldProps {
    images: File[];
    onImagesChange: (files: File[]) => void;
    maxImages?: number;
}

export default function ImageUploadField({ images, onImagesChange, maxImages = 10 }: ImageUploadFieldProps) {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const validFiles = Array.from(files).filter((file) => {
            const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max

            if (!isValidType) {
                alert(`${file.name}: Only JPG, PNG, and WebP images are allowed`);
                return false;
            }
            if (!isValidSize) {
                alert(`${file.name}: File size must be less than 5MB`);
                return false;
            }
            return true;
        });

        const remainingSlots = maxImages - images.length;
        const filesToAdd = validFiles.slice(0, remainingSlots);

        if (filesToAdd.length < validFiles.length) {
            alert(`Maximum ${maxImages} images allowed. Only first ${remainingSlots} images will be added.`);
        }

        onImagesChange([...images, ...filesToAdd]);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        handleFiles(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />

                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 mb-2 font-medium">
                    Drag and drop images here, or click to select
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    JPG, PNG or WebP (Max 5MB per image, up to {maxImages} images)
                </p>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                    disabled={images.length >= maxImages}
                >
                    {images.length >= maxImages ? `Maximum ${maxImages} images` : 'Choose Files'}
                </button>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((file, index) => (
                        <div key={index} className="relative group">
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                title="Remove image"
                            >
                                <X size={16} />
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
