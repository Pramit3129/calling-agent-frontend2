"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import SingleCallModal from "../components/SingleCallModal";
import BatchCallModal from "../components/BatchCallModal";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Phone, Clock, ArrowUpRight } from "lucide-react";

import CallAnalysisView from "../components/CallAnalysisView";

export default function Home() {
  const [activeTab, setActiveTab] = useState('make-calls');
  const [isSingleCallOpen, setIsSingleCallOpen] = useState(false);
  const [isBatchCallOpen, setIsBatchCallOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === 'make-calls' ? (
          <motion.div
            key="make-calls"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero
              onSingleCall={() => setIsSingleCallOpen(true)}
              onBatchCall={() => setIsBatchCallOpen(true)}
            />
            <Features />
          </motion.div>
        ) : (
          <CallAnalysisView key="call-analysis" />
        )}
      </AnimatePresence>

      <SingleCallModal
        isOpen={isSingleCallOpen}
        onClose={() => setIsSingleCallOpen(false)}
      />

      <BatchCallModal
        isOpen={isBatchCallOpen}
        onClose={() => setIsBatchCallOpen(false)}
      />
    </main>
  );
}
