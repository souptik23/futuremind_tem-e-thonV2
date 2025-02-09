import React from 'react';

const FeatureSectionWithAI = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/assets/circuit-pattern.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80"></div>
            </div>

            <div className="container mx-auto px-6 relative">
                <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 inline-block hover:scale-105 transition-transform duration-300">
                        Next-Generation AI Banking Features
                    </span>
                </h2>

                {/* 3x2 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
                    {/* Card 1 */}
                    <FeatureCard
                        title="Smart Banking"
                        description="AI-powered account management with predictive analytics and automated savings recommendations"
                        detailsTitle="Smart Banking Details"
                        metrics={[
                            "Automated Expense Tracking",
                            "Smart Budget Recommendations",
                            "Real-time Financial Insights"
                        ]}
                        iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        color="blue-400"
                    />
                    {/* Card 2 */}
                    <FeatureCard
                        title="AI Security"
                        description="Advanced fraud detection system with real-time monitoring and behavioral analysis"
                        detailsTitle="Security Analysis"
                        metrics={[
                            "Threat Detection Active",
                            "Behavioral Analysis Running",
                            "Real-time Monitoring"
                        ]}
                        iconPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        color="purple-400"
                    />
                    {/* Card 3 */}
                    <FeatureCard
                        title="Smart Investments"
                        description="AI-driven portfolio management with market trend analysis and risk assessment"
                        detailsTitle="Investment Performance"
                        metrics={[
                            "Portfolio Growth: +12.5%",
                            "Risk Level: Moderate",
                            "AI Recommendations Active"
                        ]}
                        iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        color="green-400"
                    />
                    {/* Card 4 */}
                    <FeatureCard
                        title="Performance Analytics"
                        description="Comprehensive financial analytics with AI-powered insights and recommendations"
                        detailsTitle="Analytics Dashboard"
                        metrics={[
                            "Data Processing",
                            "Pattern Recognition",
                            "Predictive Modeling"
                        ]}
                        iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        color="yellow-400"
                    />
                    {/* Card 5 */}
                    <FeatureCard
                        title="Smart Support"
                        description="24/7 AI-powered customer support with intelligent query resolution"
                        detailsTitle="Support Status"
                        metrics={[
                            "AI Agents Online: 24/7",
                            "Response Time: <2min",
                            "Resolution Rate: 95%"
                        ]}
                        iconPath="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        color="pink-400"
                    />
                    {/* Card 6 */}
                    <FeatureCard
                        title="Biometric Security"
                        description="Advanced biometric authentication with AI-powered facial and voice recognition"
                        detailsTitle="Biometric Scan"
                        metrics={[
                            "Facial Recognition Active",
                            "Voice Authentication Ready",
                            "Fingerprint Scanning Online"
                        ]}
                        iconPath="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        color="indigo-400"
                    />
                </div>
            </div>

            {/* Floating Stats */}
            {/* <div className="mt-16 bg-white/5 backdrop-blur-sm py-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-4 gap-8 text-center">
                        <div className="stat-item" data-aos="fade-up">
                            <h4 className="text-3xl font-bold text-blue-400 mb-2">99.9%</h4>
                            <p className="text-gray-300">AI Accuracy</p>
                        </div>
                        {/* Add more stats 
                    </div>
                </div>
            </div> */}
        </section>
    );
};

const FeatureCard = ({ title, description, detailsTitle, metrics, iconPath, color }) => {
    return (
        <div className="group relative h-80">
            <div className="feature-card h-full p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-full flex flex-col justify-between">
                    <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${color}/20 to-${color}/20 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                            <svg className={`w-8 h-8 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-${color} transition-colors duration-300">{title}</h3>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{description}</p>
                    </div>
                </div>
            </div>

            {/* Popup Card */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full p-8 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg rounded-xl shadow-2xl transform transition-all duration-500">
                    <div className="h-full flex flex-col">
                        <h3 className="text-xl font-semibold mb-4 text-white">{detailsTitle}</h3>
                        {/* Metrics List */}
                        <ul className="text-sm text-gray-200 space-y-2">
                            {metrics.map((metric, index) => (
                                <li className="flex items-center" key={index}>
                                    <span className={`w-2 h-2 bg-${color} rounded-full mr-2 animate-pulse`}></span>
                                    {metric}
                                </li>
                            ))}
                        </ul>
                        {/* Status Indicator */}
                        <div className="mt-auto flex justify-center">
                            <div className={`w-16 h-16 rounded-full border-4 border-${color}/30 border-t-${color} animate-spin`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureSectionWithAI;