"use client";

import { Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-4 md:px-0">
                    <div className="space-y-4 text-sm text-gray-500">
                        <h5 className="font-bold text-gray-900">Support</h5>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:underline">Help Center</a>
                            <a href="#" className="hover:underline">AirCover</a>
                            <a href="#" className="hover:underline">Anti-discrimination</a>
                            <a href="#" className="hover:underline">Disability support</a>
                            <a href="#" className="hover:underline">Cancellation options</a>
                            <a href="#" className="hover:underline">Report neighborhood concern</a>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-500">
                        <h5 className="font-bold text-gray-900">Hosting</h5>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:underline">Igloo your home</a>
                            <a href="#" className="hover:underline">AirCover for Hosts</a>
                            <a href="#" className="hover:underline">Hosting resources</a>
                            <a href="#" className="hover:underline">Community forum</a>
                            <a href="#" className="hover:underline">Hosting responsibly</a>
                            <a href="#" className="hover:underline">Igloo-friendly apartments</a>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-500">
                        <h5 className="font-bold text-gray-900">Igloo</h5>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:underline">Newsroom</a>
                            <a href="#" className="hover:underline">New features</a>
                            <a href="#" className="hover:underline">Careers</a>
                            <a href="#" className="hover:underline">Investors</a>
                            <a href="#" className="hover:underline">Gift cards</a>
                            <a href="#" className="hover:underline">Igloo.org emergency stays</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span>© 2025 Igloo, Inc.</span>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Privacy</a>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Terms</a>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Sitemap</a>
                    </div>
                    <div className="flex flex-row items-center gap-4 font-semibold text-gray-900">
                        <div className="flex items-center gap-2 cursor-pointer hover:underline">
                            <Globe size={16} />
                            <span>English (US)</span>
                        </div>
                        <div className="cursor-pointer hover:underline">
                            $ USD
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
