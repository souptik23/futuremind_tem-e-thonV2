import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, GraduationCap, Home, Heart, ArrowRight, Calculator, ChevronRight, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const LoanServicesSection = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const [activeLoan, setActiveLoan] = useState('student'); // Default to student loan
    const [loanAmount, setLoanAmount] = useState(500000); // Default loan amount in INR
    const [loanTerm, setLoanTerm] = useState(5); // Default loan term in years
    const [interestRate, setInterestRate] = useState(4.5); // Default interest rate

    const loanTypes = [
        {
            id: 'student',
            title: t.studentLoans,
            description: 'Low interest rates with flexible repayment options',
            details: [
                'Interest rate: 4.5% p.a.',
                'Tenure: Up to 10 years',
                'Zero processing fee for first-time applicants',
                'Option for deferred payments'
            ],
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'emerald',
            defaultRate: 4.5
        },
        {
            id: 'home',
            title: 'Home Loans',
            description: 'Make your dream home a reality with competitive rates',
            details: [
                'Interest rate: 6.5% p.a.',
                'Tenure: Up to 30 years',
                'Up to 85% of property value',
                'Free property valuation'
            ],
            icon: <Home className="w-6 h-6" />,
            color: 'blue',
            defaultRate: 6.5
        },
        {
            id: 'health',
            title: 'Health Care Loans',
            description: 'Quick medical financing with minimal documentation',
            details: [
                'Interest rate: 7% p.a.',
                'Quick approval within 24 hours',
                'No collateral required',
                'Flexible repayment options'
            ],
            icon: <Heart className="w-6 h-6" />,
            color: 'rose',
            defaultRate: 7.0
        },
        {
            id: 'business',
            title: 'Business Loans',
            description: 'Empower your business growth with custom solutions',
            details: [
                'Interest rate: 8% p.a.',
                'Flexible collateral options',
                'Line of credit available',
                'Business advisory services included'
            ],
            icon: <Building2 className="w-6 h-6" />,
            color: 'violet',
            defaultRate: 8.0
        }
    ];

    // Calculate EMI
    const calculateEMI = (amount, years, rate) => {
        const r = rate / 12 / 100;
        const n = years * 12;
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    // Generate dynamic chart data based on loan amount, term, and interest rate
    const generateChartData = (amount, years, rate) => {
        const data = [];
        for (let i = 1; i <= years; i++) {
            const remainingAmount = amount - (amount / years) * (i - 1);
            const interest = (remainingAmount * rate) / 100;
            data.push({
                year: `Year ${i}`,
                value: Math.round(interest)
            });
        }
        return data;
    };

    // Handle loan type selection
    const handleLoanSelect = (loanId) => {
        setActiveLoan(loanId);
        const selectedLoan = loanTypes.find((loan) => loan.id === loanId);
        setInterestRate(selectedLoan.defaultRate);
    };

    // Handle Apply Now button click
    const handleApplyNow = () => {
        alert(`Application submitted for ₹${loanAmount.toLocaleString()} loan for ${loanTerm} years at ${interestRate}% interest.`);
    };

    // Get the selected loan details
    const selectedLoan = loanTypes.find((loan) => loan.id === activeLoan);

    // Generate chart data for the selected loan
    const chartData = generateChartData(loanAmount, loanTerm, interestRate);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ top: '10%', left: '20%' }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ bottom: '20%', right: '20%' }}
                />
            </div>

            <div className="container mx-auto px-6 py-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {t.smartLoanSolutions}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                            {" "}{t.forYourFuture}
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        {t.discoverSolutions}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        {loanTypes.map((loan) => (
                            <motion.div
                                key={loan.id}
                                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 cursor-pointer"
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                                onClick={() => handleLoanSelect(loan.id)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg bg-${loan.color}-500/20 text-${loan.color}-400`}>
                                        {loan.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-1">{loan.title}</h3>
                                        <p className="text-gray-300 mb-3 text-sm">{loan.description}</p>
                                        
                                        <AnimatePresence>
                                            {activeLoan === loan.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="bg-white/5 rounded-lg p-3 mt-3">
                                                        {loan.details.map((detail, index) => (
                                                            <div key={index} className="flex items-center gap-2 text-gray-300 mb-1 text-sm">
                                                                <ChevronRight className="w-4 h-4" />
                                                                <span>{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="h-32 mt-3">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <LineChart data={chartData}>
                                                                <XAxis dataKey="year" stroke="#94a3b8" />
                                                                <YAxis stroke="#94a3b8" />
                                                                <Tooltip />
                                                                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} />
                                                            </LineChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-white">Loan Calculator</h3>
                            <Calculator className="w-5 h-5 text-gray-300" />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1 text-sm">Loan Amount (₹)</label>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="10000"
                                        max="10000000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="text-white mt-1 text-sm">₹{loanAmount.toLocaleString()}</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1 text-sm">Loan Term (Years)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-white mt-1 text-sm">{loanTerm} years</div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1 text-sm">Interest Rate (%)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-white mt-1 text-sm">{interestRate}%</div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4">
                                <h4 className="text-lg font-medium text-white mb-3">Estimated Monthly Payment</h4>
                                <div className="text-2xl font-bold text-blue-400">
                                    ₹{calculateEMI(loanAmount, loanTerm, interestRate).toLocaleString()}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 group"
                                onClick={handleApplyNow}
                            >
                                <span className="text-sm">Apply Now</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            {/* Loan Eligibility Check Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-gray-800/50 rounded-xl p-4 mt-4 border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                                whileHover={{ y: -5 }}
                            >
                                <h4 className="text-lg font-medium text-white mb-2">Check Loan Eligibility</h4>
                                <p className="text-gray-400 mb-3 text-sm">Answer a few questions to see if you qualify for a loan.</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm">
                                    Start Eligibility Check
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoanServicesSection;