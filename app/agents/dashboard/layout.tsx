"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    MessageSquare,
    Settings,
    LogOut,
    Home,
    Users
} from "lucide-react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useEffect } from "react";

export default function AgentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated || (user && user.role !== 'agent')) {
            router.push('/login');
        }
    }, [isAuthenticated, user, router]);

    if (!user) return null;

    const navItems = [
        { name: "Overview", href: "/agents/dashboard", icon: LayoutDashboard },
        { name: "My Listings", href: "/agents/dashboard/listings", icon: List },
        { name: "Post New Property", href: "/agents/dashboard/listings/create", icon: PlusCircle },
        { name: "Roommate Requests", href: "/agents/dashboard/roommates", icon: Users },
        { name: "Messages", href: "/agents/dashboard/messages", icon: MessageSquare },
        { name: "Settings", href: "/agents/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                            <Home size={18} />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Igloo Agent</span>
                    </Link>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-green-50 text-green-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {user.name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); router.push('/login'); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
