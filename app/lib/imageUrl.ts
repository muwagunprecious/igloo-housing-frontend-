import { config } from './config';

/**
 * Formats image URLs correctly by prepending the backend URL if the path is relative.
 * 
 * @param path The image path from the backend
 * @returns The full URL to the image
 */
export const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '/placeholder-property.jpg'; // Path to a placeholder image in public folder

    // If it's already a full URL or a data URI, return as is
    if (path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }

    // Append baseURL if it's a relative path from the uploads folder
    // The backend returns paths like "/uploads/properties/image.jpg"
    const baseURL = config.backendUrl;

    // Ensure we don't end up with double slashes
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseURL}${cleanPath}`;
};
