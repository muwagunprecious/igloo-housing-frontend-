"use client";

import { useState, useEffect } from "react";
import { User, Plus, X, MessageSquare, AlertCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/common/Button";
import { useRoommateStore } from "@/app/stores/useRoommateStore";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function RoommatesPage() {
    const { feed, fetchFeed, requests: myRequests, fetchMyRequests, createRequest, deleteRequest, isLoading, error } = useRoommateStore();
    const { user, isAuthenticated } = useAuthStore();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filterGender, setFilterGender] = useState("");

    // Form State
    const [budget, setBudget] = useState("");
    const [roomType, setRoomType] = useState("Self-contain");
    const [genderPref, setGenderPref] = useState("");
    const [bio, setBio] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user?.universityId) {
            fetchFeed({ genderPref: filterGender || undefined });
            fetchMyRequests();
        }
    }, [isAuthenticated, user?.universityId, filterGender, fetchFeed, fetchMyRequests]);

    const handleDeleteRequest = async (id: string) => {
        if (!confirm("Are you sure you want to delete this request?")) return;

        await deleteRequest(id);
        fetchMyRequests();
    };

    const handleCreateRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await createRequest({
            budget,
            roomType,
            genderPref,
            bio
        });
        setIsSubmitting(false);
        if (success) {
            setShowCreateModal(false);
            setBudget("");
            setRoomType("Self-contain");
            setGenderPref("");
            setBio("");
            fetchFeed({ genderPref: filterGender || undefined });
            fetchMyRequests();
        }
    };

    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-10 pb-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Find a Roommate</h1>
                    <p className="text-gray-500">Connect with students at your university</p>
                </div>
                {isAuthenticated && (
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="mr-2" size={18} />
                        Post Request
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div className="mb-8 flex gap-4">
                <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {/* My Active Request */}
            {myRequests.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-4">My Active Request</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myRequests.map((request) => (
                            <div key={request.id} className="bg-green-50 border border-green-200 rounded-2xl p-6 relative">
                                <button
                                    onClick={() => handleDeleteRequest(request.id)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete Request"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-700 font-bold text-lg shadow-sm">
                                        Me
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">My Request</h3>
                                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">{request.status}</span>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{request.bio}</p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Budget:</span>
                                        <span className="font-medium">₦{request.budget?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Looking for:</span>
                                        <span className="font-medium capitalize">{request.genderPref || "Any"} - {request.roomType}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Feed */}
            {isLoading ? (
                <div className="text-center py-20">Loading roommates...</div>
            ) : feed.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <User className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-semibold mb-2">No roommates found</h3>
                    <p className="text-gray-500">Be the first to post a request!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {feed.map((request) => (
                        <div key={request.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-card-hover transition flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-14 h-14">
                                    <Image
                                        src={request.user.avatar || "/placeholder-avatar.png"}
                                        alt={request.user.fullName}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{request.user.fullName}</h3>
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{request.status}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{request.bio || "No bio provided"}</p>

                            <div className="space-y-2 text-sm mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Budget</span>
                                    <span className="font-semibold">₦{request.budget?.toLocaleString() || "N/A"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Preference</span>
                                    <span className="font-medium capitalize">{request.genderPref || "Any"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Room Type</span>
                                    <span className="font-medium capitalize">{request.roomType || "Any"}</span>
                                </div>
                            </div>

                            <Link href={`/chat?userId=${request.userId}`}>
                                <Button variant="outline" className="w-full">
                                    <MessageSquare className="mr-2" size={16} />
                                    Message
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Request Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                            onClick={() => setShowCreateModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl pointer-events-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Find a Roommate</h2>
                                    <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateRequest} className="space-y-4">
                                    {error && (
                                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Budget (₦)</label>
                                        <input
                                            type="number"
                                            required
                                            value={budget}
                                            onChange={(e) => setBudget(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="e.g. 150000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Preferred Room Type</label>
                                        <select
                                            value={roomType}
                                            onChange={(e) => setRoomType(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Any</option>
                                            <option value="Self-contain">Self-contain</option>
                                            <option value="Shared">Shared</option>
                                            <option value="Flat">Flat</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Gender Preference</label>
                                        <select
                                            value={genderPref}
                                            onChange={(e) => setGenderPref(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Any</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Short Bio</label>
                                        <textarea
                                            required
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary h-24"
                                            placeholder="Tell potential roommates about yourself..."
                                        />
                                    </div>

                                    <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                                        {isSubmitting ? "Posting..." : "Post Request"}
                                    </Button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
