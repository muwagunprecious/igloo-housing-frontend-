"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/app/stores/useAdminStore";
import {
    Search,
    Shield,
    BadgeCheck,
    Mail,
    Calendar,
    User,
    CheckCircle2,
    XCircle,
    Info
} from "lucide-react";
import Button from "@/app/components/common/Button";
import Image from "next/image";
import { getImageUrl } from "@/app/lib/imageUrl";
import Link from "next/link";

export default function AgentVerificationPage() {
    const { users, isLoading, fetchUsers, verifyAgent } = useAdminStore();
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch users who are AGENTS and NOT verified
        fetchUsers({ role: "AGENT", isVerified: "false" });
    }, [fetchUsers]);

    const unverifiedAgents = users.filter(u =>
        u.role === "AGENT" && !u.isVerified &&
        (u.fullName.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()))
    );

    const handleVerify = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to verify ${name} as a platform agent?`)) {
            await verifyAgent(id);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black mb-1 leading-tight tracking-tight">Agent Verification</h1>
                    <p className="text-gray-500 font-medium">Verify credentials and grant platform publishing rights.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs font-black text-blue-700 uppercase tracking-widest">
                        {unverifiedAgents.length} Pending Requests
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search pending agents by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-black/10 focus:ring-8 focus:ring-black/5 rounded-2xl py-4 pl-14 pr-4 transition-all duration-300 font-bold"
                    />
                </div>
            </div>

            {/* Content List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Accessing Agent Registry...</p>
                    </div>
                ) : unverifiedAgents.length === 0 ? (
                    <div className="col-span-full py-20 bg-white border border-gray-100 rounded-[32px] text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-1">Queue Empty</h3>
                        <p className="text-gray-500 font-medium max-w-xs mx-auto">All agent accounts have been processed. Great work!</p>
                    </div>
                ) : unverifiedAgents.map((agent) => (
                    <div key={agent.id} className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 group relative overflow-hidden">
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Pending
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gray-100 border-4 border-white shadow-card flex-shrink-0 relative overflow-hidden transition-transform group-hover:scale-105 duration-500">
                                {agent.avatar ? (
                                    <Image src={getImageUrl(agent.avatar)} alt={agent.fullName} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <User size={32} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 text-lg leading-tight tracking-tight mb-1">{agent.fullName}</h4>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail size={14} className="text-primary" />
                                    <span className="text-xs font-bold truncate max-w-[150px]">{agent.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined</span>
                                    <span className="text-xs font-black text-gray-700">
                                        {new Date(agent.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Role</span>
                                    <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded border border-gray-100">{agent.role}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <p className="text-[10px] leading-relaxed text-blue-700 font-bold italic">
                                    Agent is awaiting verification to post and manage property listings on the platform.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => handleVerify(agent.id, agent.fullName)}
                                className="flex-1 bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                            >
                                <BadgeCheck size={18} />
                                Verify Agent
                            </button>
                            <button className="w-14 items-center justify-center flex bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-300">
                                <XCircle size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation back to User Control */}
            <div className="flex justify-center pt-8">
                <Link href="/admin/users">
                    <button className="text-sm font-black text-gray-400 hover:text-black transition uppercase tracking-widest flex items-center gap-2">
                        View Full User Registry →
                    </button>
                </Link>
            </div>
        </div>
    );
}
