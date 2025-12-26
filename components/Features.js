import { motion } from 'framer-motion';
import { Clock, MessageSquare, BarChart3 } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Clock className="w-6 h-6 text-white" />,
            color: "bg-orange-500",
            title: "Instant Engagement",
            description: "Call leads within seconds of submission. Strike while the iron is hot and increase conversion rates by up to 400%."
        },
        {
            icon: <MessageSquare className="w-6 h-6 text-white" />,
            color: "bg-emerald-500",
            title: "Human-like Conversations",
            description: "Our AI handles interruptions, complex queries, and natural back-and-forth dialogue just like a top-tier sales agent."
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-white" />,
            color: "bg-rose-500",
            title: "Seamless Integration",
            description: "Push qualified leads, call transcripts, and appointment details directly to your CRM without lifting a finger."
        }
    ];

    return (
        <section className="bg-white/50 py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-[#0F172A] mb-4"
                    >
                        Why Choose CallGenie?
                    </motion.h2>
                    <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-8"></div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        We bridge the gap between lead generation and closed deals. Whether you're a real estate agent, insurance broker, or sales team, we provide the speed and intelligence needed to scale your outreach.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                        >
                            <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-md`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
