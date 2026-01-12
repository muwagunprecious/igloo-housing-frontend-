"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { bookings, transactions, recentChats } from "@/app/data/dashboard";
import { useFavoritesStore } from "@/app/stores/useFavoritesStore";
import { useViewHistoryStore } from "@/app/stores/useViewHistoryStore";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { properties } from "@/app/data/properties";
import PropertyCard from "@/app/components/features/PropertyCard";
import DashboardSidebar from "@/app/components/layout/DashboardSidebar";
import SecuritySection from "./components/SecuritySection";
import NotificationsSection from "./components/NotificationsSection";
import { User, Settings, Bell, Shield, CreditCard, Heart, Home, MessageSquare, Receipt, Calendar } from "lucide-react";
import Button from "@/app/components/common/Button";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/app/lib/imageUrl";

export default function Dashboard() {
    const { user } = useAuthStore();
    const [currentHash, setCurrentHash] = useState("");

    const favorites = useFavoritesStore((state) => state.favorites);
    const viewedProperties = useViewHistoryStore((state) => state.viewedProperties);

    const favoriteProperties = properties.filter((p) => favorites.includes(p.id));
    const recentlyViewedProperties = properties.filter((p) => viewedProperties.slice(0, 3).includes(p.id));
    const activeBookings = bookings.filter((b) => b.status === "Active");

    useEffect(() => {
        // Handle hash navigation
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
            // Scroll to top when hash changes
            window.scrollTo(0, 0);
        };

        // Set initial hash
        setCurrentHash(window.location.hash);

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const renderContent = () => {
        switch (currentHash) {
            case "#security":
                return <SecuritySection />;
            case "#notifications":
                return <NotificationsSection />;
            case "#payments":
                return (
                    <section className="animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 mb-6">
                            <Receipt className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold">Transaction History</h2>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            {transactions.length > 0 ? (
                                transactions.map((txn, idx) => (
                                    <div key={txn.id} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition ${idx !== transactions.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Receipt className="text-primary" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{txn.type}</h3>
                                                <p className="text-sm text-gray-500">{txn.propertyTitle}</p>
                                                <p className="text-xs text-gray-400 mt-1">{txn.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-gray-900">₦{txn.amount.toLocaleString()}</p>
                                            <p className="text-xs text-green-600 font-semibold">{txn.status}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-gray-500">No transactions yet</div>
                            )}
                        </div>
                    </section>
                );
            case "#personal":
                return (
                    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <User className="text-primary" size={24} />
                            <h2 className="text-2xl font-bold">Personal Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Full Name</label>
                                <p className="text-lg font-medium text-gray-900">{user?.name || "N/A"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Email Address</label>
                                <p className="text-lg font-medium text-gray-900">{user?.email || "N/A"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Account Role</label>
                                <p className="text-lg font-medium text-gray-900 capitalize">{user?.role || "N/A"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-1">Account Status</label>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                                    <p className="text-lg font-medium text-gray-900">Active</p>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            default:
                return (
                    <>
                        {/* Current Bookings */}
                        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Home className="text-primary" size={24} />
                                    <h2 className="text-2xl font-bold">Current Bookings</h2>
                                </div>
                                {activeBookings.length > 0 && (
                                    <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full">{activeBookings.length} active</span>
                                )}
                            </div>

                            {activeBookings.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {activeBookings.map((booking) => (
                                        <div key={booking.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition">
                                            <div className="relative h-48">
                                                <Image
                                                    src={getImageUrl(booking.propertyImage)}
                                                    alt={booking.propertyTitle}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                    {booking.status}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-bold text-lg mb-2 text-gray-900">{booking.propertyTitle}</h3>
                                                <p className="text-gray-500 text-sm mb-4">{booking.propertyAddress}</p>

                                                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                                                    <div className="relative w-10 h-10">
                                                        <Image
                                                            src={getImageUrl(booking.agentAvatar)}
                                                            alt={booking.agentName}
                                                            fill
                                                            className="rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{booking.agentName}</p>
                                                        <p className="text-xs text-gray-500 font-medium">Property Agent</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm mb-6 px-1">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500 font-medium">Duration:</span>
                                                        <span className="font-bold text-gray-900">{booking.duration}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500 font-medium">Period:</span>
                                                        <span className="font-bold text-gray-900">{booking.startDate} - {booking.endDate}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500 font-medium">Amount Paid:</span>
                                                        <span className="font-bold text-primary font-mono">₦{booking.amount.toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                <Link href={`/receipt?txn=${booking.transactionId}`}>
                                                    <Button variant="outline" className="w-full py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50">
                                                        View Receipt
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Home className="text-gray-400" size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No active bookings</h3>
                                    <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">Find your next student home today. Browse thousands of verified listings near your campus.</p>
                                    <Link href="/search">
                                        <Button className="px-10 py-3 rounded-full font-bold shadow-lg shadow-primary/20">Browse Properties</Button>
                                    </Link>
                                </div>
                            )}
                        </section>

                        {/* Recent Chats Preview */}
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="text-primary" size={24} />
                                    <h2 className="text-2xl font-bold">Recent Conversations</h2>
                                </div>
                                <Link href="/chat" className="text-sm text-primary font-bold hover:underline">
                                    See all chats
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {recentChats.length > 0 ? (
                                    recentChats.slice(0, 3).map((chat) => (
                                        <Link key={chat.id} href="/chat">
                                            <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-card-hover transition flex items-center gap-4 group">
                                                <div className="relative w-12 h-12 flex-shrink-0">
                                                    <Image
                                                        src={getImageUrl(chat.avatar)}
                                                        alt={chat.name}
                                                        fill
                                                        className="rounded-full object-cover border border-gray-100"
                                                    />
                                                    {chat.unread > 0 && (
                                                        <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                                            {chat.unread}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <h3 className="font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{chat.name}</h3>
                                                        <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                            {chat.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate font-medium">{chat.lastMessage}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-bold">{chat.timestamp}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
                                        <p className="text-gray-500 font-medium text-sm italic">No recent messages</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Account Management Quick Links */}
                        <section>
                            <div className="flex items-center gap-2 mb-6">
                                <Settings className="text-primary" size={24} />
                                <h2 className="text-2xl font-bold">Account Settings</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: User, label: "Personal info", desc: "Manage your profile", href: "#personal" },
                                    { icon: Shield, label: "Security", desc: "Change password", href: "#security" },
                                    { icon: CreditCard, label: "Payments", desc: "Review transactions", href: "#transactions" },
                                    { icon: Bell, label: "Notifications", desc: "Update alerts", href: "#notifications" },
                                ].map((link) => (
                                    <Link key={link.label} href={link.href}>
                                        <div className="p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-card-hover hover:border-primary/20 transition cursor-pointer flex flex-col gap-4 group">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <link.icon size={24} className="text-gray-700 group-hover:text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-0.5">{link.label}</h3>
                                                <p className="text-xs text-gray-500 font-medium">{link.desc}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </>
                );
        }
    };

    return (
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-[100px] pb-20 min-h-screen bg-gray-50/30">
            <div className="flex gap-8">
                {/* Sidebar */}
                <DashboardSidebar />

                {/* Main Content */}
                <div className="flex-1 min-w-0 overflow-y-auto">
                    {/* Welcome Header */}
                    <div className="mb-10 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="relative w-20 h-20 bg-primary/20 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center border-4 border-white shadow-sm">
                                {user?.avatar ? (
                                    <Image src={getImageUrl(user.avatar)} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <User size={32} className="text-primary" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-black text-gray-900 mb-1">
                                    {currentHash === "" ? "Dashboard" :
                                        currentHash === "#security" ? "Security Settings" :
                                            currentHash === "#notifications" ? "Your Notifications" :
                                                currentHash === "#transactions" ? "Transactions" :
                                                    currentHash === "#personal" ? "Personal Details" : "Account Settings"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                                    <div className="flex items-center gap-1.5 text-gray-700">
                                        <span className="text-gray-400 font-medium">Signed in as:</span>
                                        <span className="text-primary">{user?.name || "Guest User"}</span>
                                    </div>
                                    <div className="hidden sm:block text-gray-300">|</div>
                                    <div className="flex items-center gap-1.5 text-gray-700">
                                        <span className="text-gray-400 font-medium">Tier:</span>
                                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] uppercase font-black tracking-widest">Student</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/search">
                                    <Button variant="outline" className="rounded-xl font-bold border-gray-200">Explore</Button>
                                </Link>
                                <Link href="/chat">
                                    <Button className="rounded-xl font-bold shadow-lg shadow-primary/10">Messages</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content */}
                    <div className="transition-all duration-300">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
