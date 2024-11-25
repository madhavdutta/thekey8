// components/sections/MarketInsights.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight, Bell } from 'lucide-react';
import { SectionWrapper } from '../ui/section-wrapper';

const mockData = [
  { month: 'Jan', rate: 3.45 },
  { month: 'Feb', rate: 3.52 },
  { month: 'Mar', rate: 3.48 },
  { month: 'Apr', rate: 3.49 },
  { month: 'May', rate: 3.42 },
  { month: 'Jun', rate: 3.39 },
];

export const MarketInsights = () => {
  const [selectedBank, setSelectedBank] = useState<{
    name: string;
    rate: number;
    change: number;
    fixedTerm: string;
    minAmount: number;
    maxAmount: number;
  } | null>(null);
  
  const banks = [
    { 
      name: 'FAB',
      rate: 3.49,
      change: -0.24,
      fixedTerm: '3 years',
      minAmount: 500000,
      maxAmount: 5000000
    },
    { 
      name: 'ADCB',
      rate: 3.65,
      change: 0.12,
      fixedTerm: '5 years',
      minAmount: 400000,
      maxAmount: 4000000
    },
    { 
      name: 'DIB',
      rate: 3.55,
      change: -0.15,
      fixedTerm: '4 years',
      minAmount: 450000,
      maxAmount: 4500000
    }
  ];

  return (
     <SectionWrapper 
      container="default"
      className="min-h-[calc(100vh-4rem)]"
    >
    <section className="py-32 relative">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Side - Rates Table */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold">
                Market Insights
                <span className="block text-xl text-muted-foreground mt-4">
                  Real-time UAE mortgage rates
                </span>
              </h2>

              <div className="space-y-4">
                {banks.map((bank, idx) => (
                  <motion.div
                    key={bank.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedBank(bank)}
                    className={`group p-6 rounded-2xl transition-all cursor-pointer ${
                      selectedBank?.name === bank.name 
                        ? 'bg-primary/10'
                        : 'hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{bank.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          Fixed for {bank.fixedTerm}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{bank.rate}%</div>
                        <div className={`flex items-center text-sm ${
                          bank.change < 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {bank.change < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                          {Math.abs(bank.change)}%
                        </div>
                      </div>
                    </div>

                    {selectedBank?.name === bank.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Min Amount</div>
                            <div className="font-medium">AED {bank.minAmount.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Max Amount</div>
                            <div className="font-medium">AED {bank.maxAmount.toLocaleString()}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Graph and Updates */}
          <div className="space-y-8">
            {/* Rate Trend Graph */}
            <div className="h-[300px] bg-card/50 p-6 rounded-3xl backdrop-blur-sm">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Rate Alert Signup */}
            <div className="bg-card/50 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Never Miss a Rate Change</h3>
              <p className="text-muted-foreground mb-6">
                Get notified when mortgage rates change. Stay ahead of the market.
              </p>
              
              <div className="flex gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-background border-border rounded-xl px-4"
                />
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl flex items-center gap-2">
                  Subscribe
                  <Bell className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                We'll only send relevant updates. Unsubscribe any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};