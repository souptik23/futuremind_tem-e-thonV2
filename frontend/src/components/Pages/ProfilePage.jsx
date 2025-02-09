import React, { useState } from "react";
import {
  Bell,
  Clock,
  CreditCard,
  Plus,
  Settings,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CreditScoreCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
          Credit Score
        </h3>
        <div className="bg-gradient-to-r from-green-400 to-green-500 h-12 w-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
          <TrendingUp className="text-gray-900" size={24} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-100">750</p>
          <p className="text-green-400 font-medium">Good Credit</p>
        </div>
      </div>
      <div className="mt-4 bg-gray-700 rounded-lg p-3">
        <p className="text-sm text-green-400">
          Your credit score is in good standing. Keep up the good work!
        </p>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [activeCard, setActiveCard] = useState(null);

  const monthlyData = [
    { month: "Jan", spending: 2400, income: 4500, savings: 2100 },
    { month: "Feb", spending: 1398, income: 4500, savings: 3102 },
    { month: "Mar", spending: 3800, income: 4800, savings: 1000 },
    { month: "Apr", spending: 3908, income: 4700, savings: 792 },
    { month: "May", spending: 4800, income: 5200, savings: 400 },
    { month: "Jun", spending: 3800, income: 4900, savings: 1100 },
  ];

  const upcomingPayments = [
    {
      id: 1,
      name: "Netflix Subscription",
      amount: 199,
      dueDate: "2025-02-12",
      logo: "🎬",
      daysLeft: 3,
      type: "subscription",
    },
    {
      id: 2,
      name: "Credit Card Bill",
      amount: 1250,
      dueDate: "2025-02-17",
      logo: "💳",
      daysLeft: 8,
      type: "bill",
      minimumDue: 125.0,
    },
    {
      id: 3,
      name: "Spotify Premium",
      amount: 60,
      dueDate: "2025-02-14",
      logo: "🎵",
      daysLeft: 6,
      type: "subscription",
    },
  ];

  const getDaysLeftColor = (days) => {
    if (days <= 3) return "text-red-400";
    if (days <= 7) return "text-orange-400";
    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 md:col-span-3">
            {/* Profile Section */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <img
                      src="https://www.svgrepo.com/show/404545/avatar-man-profile-user-3.svg"
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-violet-900 transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 animate-pul  "></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
                      username
                    </h2>
                    <p className="text-sm text-gray-400">Premium Member</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-700 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                  <p className="text-sm text-gray-400">Total Balance</p>
                  <p className="text-lg font-bold text-gray-100">₹24,512.00</p>
                  <span className="text-xs text-green-400 flex items-center">
                    <ArrowUpRight size={12} className="mr-1" /> +2.5%
                  </span>
                </div>
                <div className="bg-gray-700 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                  <p className="text-sm text-gray-400">Reward Points</p>
                  <p className="text-lg font-bold text-gray-100">2,145</p>
                  <span className="text-xs text-green-400 flex items-center">
                    <ArrowUpRight size={12} className="mr-1" /> +12.3%
                  </span>
                </div>
              </div>

              {/* Upcoming Payments Section */}
              <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
                    Upcoming Payments
                  </h3>
                  <Bell className="text-gray-400 hover:text-violet-400 transition-colors duration-300 cursor-pointer" />
                </div>

                <div className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="bg-gray-700 rounded-xl p-4 relative transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl transform hover:scale-110 transition-transform duration-300">
                            {payment.logo}
                          </span>
                          <div>
                            <p className="font-medium text-gray-100">
                              {payment.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              Due{" "}
                              {new Date(payment.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-100">
                          ₹{payment.amount.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span
                            className={`text-sm font-medium ${getDaysLeftColor(
                              payment.daysLeft
                            )}`}
                          >
                            {payment.daysLeft} days left
                          </span>
                        </div>
                        <button className="text-sm bg-violet-600 text-gray-100 px-3 py-1 rounded-lg hover:bg-violet-700 transition-colors duration-300">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="col-span-12 md:col-span-6 space-y-6">
            {/* Cards Section */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  gradient: "from-violet-600 to-green-600",
                  number: "4582",
                  expires: "12/24",
                },
                {
                  gradient: "from-red-600 to-violet-600", // Changed gradient here
                  number: "7851",
                  expires: "09/25",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      card.gradient
                    } rounded-2xl transform transition-all duration-500 ${
                      activeCard === index ? "scale-105" : ""
                    } shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay bg-[url('/api/placeholder/400/200')]"></div>
                  </div>
                  <div className="relative p-6 text-gray-100">
                    <div className="flex justify-between items-start mb-8">
                      <CreditCard className="h-8 w-8 transform group-hover:rotate-12 transition-transform duration-300" />
                      <img
                        src=""
                        alt="Card Network"
                        className="h-6 transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-2xl font-bold tracking-wider mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      •••• •••• •••• {card.number}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm opacity-80">Card Holder</p>
                        <p className="font-medium">username</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80">Expires</p>
                        <p className="font-medium">{card.expires}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Financial Overview */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
                  Financial Overview
                </h3>
                <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Monthly Spending",
                    value: "₹3,824",
                    change: "+2.5%",
                    gradient: "bg-gray-700",
                  },
                  {
                    label: "Monthly Income",
                    value: "₹4,900",
                    change: "+4.1%",
                    gradient: "bg-gray-700",
                  },
                  {
                    label: "Savings Rate",
                    value: "22%",
                    change: "+1.5%",
                    gradient: "bg-gray-700",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.gradient} rounded-xl p-4 transform hover:scale-105 transition-all duration-300`}
                  >
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-100">
                      {stat.value}
                    </p>
                    <span className="text-sm text-green-400 flex items-center">
                      <ArrowUpRight size={12} className="mr-1" /> {stat.change}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="colorIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4ade80"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4ade80"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorSpending"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#a78bfa"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#a78bfa"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(31, 41, 55, 0.95)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        color: "#e5e7eb",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#4ade80"
                      fillOpacity={1}
                      fill="url(#colorIncome)"
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="#a78bfa"
                      fillOpacity={1}
                      fill="url(#colorSpending)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    Income
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-violet-400 rounded-full mr-2"></div>
                    Spending
                  </span>
                </div>
                <button className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            <CreditScoreCard />

            {/* Recent Transactions */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
                  Recent Transactions
                </h3>
                <button className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300">
                  See all
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    icon: "🛒",
                    name: "Shopping",
                    amount: -82.5,
                    time: "2h ago",
                    color: "bg-gray-700",
                  },
                  {
                    icon: "🍽️",
                    name: "Restaurant",
                    amount: -35.2,
                    time: "5h ago",
                    color: "bg-gray-700",
                  },
                  {
                    icon: "💰",
                    name: "Salary",
                    amount: 2750.0,
                    time: "1d ago",
                    color: "bg-gray-700",
                  },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${transaction.color} rounded-full flex items-center justify-center text-lg transform hover:scale-110 transition-transform duration-300`}
                      >
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-100">
                          {transaction.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-medium ${
                        transaction.amount > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}₹
                      {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Transfer */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent mb-4">
                Quick Transfer
              </h3>
              <div className="flex space-x-3 mb-6">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="relative group">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={`/api/placeholder/48/48`}
                        alt="Contact"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                  </div>
                ))}
                <button className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-400 hover:border-violet-400 hover:text-violet-400 transition-all duration-300 transform hover:scale-110">
                  <Plus size={20} />
                </button>
              </div>
              <button className="w-full bg-gradient-to-r from-violet-600 to-green-600 text-gray-100 py-3 rounded-xl hover:from-violet-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1">
                Transfer Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
