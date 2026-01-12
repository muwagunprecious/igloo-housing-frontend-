"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Building2, Heart, MessageSquare, Receipt, User, Settings, Bell, CreditCard } from "lucide-react";

export default function DashboardSidebar() {
    const pathname = usePathname();

    const mainLinks = [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "My Houses", href: "/my-houses", icon: Building2 },
        { label: "Wishlists", href: "/favorites", icon: Heart },
        { label: "Messages", href: "/chat", icon: MessageSquare },
        { label: "Transactions", href: "/dashboard#transactions", icon: Receipt },
    ];

    const settingsLinks = [
        { label: "Personal info", href: "/dashboard#personal", icon: User },
        { label: "Login & security", href: "/dashboard#security", icon: Settings },
        { label: "Payments", href: "/dashboard#payments", icon: CreditCard },
        { label: "Notifications", href: "/dashboard#notifications", icon: Bell },
    ];

    const isActive = (href: string) => {
        if (href.includes("#")) {
            return pathname === href.split("#")[0];
        }
        return pathname === href;
    };

    return (
        <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-8">
                {/* Main Navigation */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                        Main
                    </h3>
                    <nav className="space-y-1">
                        {mainLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive(link.href)
                                        ? 'bg-gray-100 text-black font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}>
                                    <link.icon size={20} />
                                    <span className="text-sm">{link.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Settings */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                        Settings
                    </h3>
                    <nav className="space-y-1">
                        {settingsLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive(link.href)
                                        ? 'bg-gray-100 text-black font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}>
                                    <link.icon size={20} />
                                    <span className="text-sm">{link.label}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-200 pt-6">
                    <Link href="/search">
                        <button className="w-full bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition text-sm">
                            Browse Properties
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
