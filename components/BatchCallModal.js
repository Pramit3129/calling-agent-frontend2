import { useState } from 'react';
import { X, User, Mail, Phone, Plus, Trash2, Zap } from 'lucide-react';

const BatchCallModal = ({ isOpen, onClose }) => {
    const [leads, setLeads] = useState([]);
    const [currentLead, setCurrentLead] = useState({ name: "", email: "", phoneNumber: "" });
    const [triggerTimestamp, setTriggerTimestamp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleLeadChange = (e) => {
        setCurrentLead({ ...currentLead, [e.target.name]: e.target.value });
    };

    const addLead = (e) => {
        e.preventDefault();
        if (currentLead.phoneNumber) {
            setLeads([...leads, currentLead]);
            setCurrentLead({ name: "", email: "", phoneNumber: "" });
        }
    };

    const removeLead = (index) => {
        setLeads(leads.filter((_, i) => i !== index));
    };

    const isAddDisabled = !currentLead.phoneNumber;

    const handleSubmit = async () => {
        if (leads.length === 0) {
            setMessage("❌ Please add at least one lead.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const payload = {
                leads,
                trigger_timestamp: triggerTimestamp ? parseInt(triggerTimestamp) : undefined
            };

            const res = await fetch("http://localhost:5000/create-batch-call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setMessage("🚀 Batch call created successfully!");
            setLeads([]);
            setTriggerTimestamp("");
            setTimeout(onClose, 2000);
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F172A]">Create Batch Call</h2>
                </div>

                <div className="space-y-8">
                    {/* Add Lead Form */}
                    <form onSubmit={addLead} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add New Lead
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={currentLead.name}
                                    onChange={handleLeadChange}
                                    placeholder="Name"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={currentLead.email}
                                    onChange={handleLeadChange}
                                    placeholder="Email (Optional)"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={currentLead.phoneNumber}
                                    onChange={handleLeadChange}
                                    placeholder="Phone (+1...)"
                                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={isAddDisabled}
                                className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-700 flex items-center justify-center gap-2 text-sm shadow-sm"
                            >
                                <Plus className="w-4 h-4" /> Add to List
                            </button>
                            {isAddDisabled && (
                                <p className="text-xs text-center text-amber-600 mt-2 font-medium">
                                    * Phone number is required to add a lead
                                </p>
                            )}
                        </div>
                    </form>

                    {/* Leads List */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Leads to Call</h3>
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                {leads.length} leads
                            </span>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-h-48 overflow-y-auto shadow-sm">
                            {leads.length === 0 ? (
                                <div className="p-8 text-center flex flex-col items-center justify-center text-gray-400 gap-2">
                                    <User className="w-8 h-8 opacity-20" />
                                    <p className="text-sm">No leads added yet.</p>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Phone</th>
                                            <th className="px-4 py-3 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {leads.map((lead, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                                                <td className="px-4 py-3 text-gray-500">{lead.email}</td>
                                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{lead.phoneNumber}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => removeLead(index)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Timestamp (Optional)</label>
                        <input
                            type="number"
                            value={triggerTimestamp}
                            onChange={(e) => setTriggerTimestamp(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 text-sm"
                            placeholder="Unix Timestamp"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading || leads.length === 0}
                        className="w-full bg-[#0F172A] text-white rounded-xl py-3.5 font-semibold hover:bg-gray-800 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        {loading ? (
                            <>Creating Batch...</>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" /> Create Batch Call
                            </>
                        )}
                    </button>

                    {message && (
                        <p className={`text-center text-sm font-medium ${message.includes('❌') ? 'text-red-500' : 'text-emerald-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BatchCallModal;
