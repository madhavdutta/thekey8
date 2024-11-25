import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';
import { SectionWrapper } from '../ui/section-wrapper';
import { SectionHeading } from './SectionHeading';

export const AdvancedCalculator = () => {
    const [formData, setFormData] = useState({
    propertyValue: '',
    downPayment: 20,
    interestRate: 3.49,
    loanTerm: 25
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalAmount: 0,
    principalAmount: 0
  });

  // Calculate loan details
  useEffect(() => {
    if (formData.propertyValue) {
      const principal = parseFloat(formData.propertyValue) * (1 - formData.downPayment / 100);
      const monthlyRate = formData.interestRate / 100 / 12;
      const numberOfPayments = formData.loanTerm * 12;

      const monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalAmount = monthlyPayment * numberOfPayments;
      const totalInterest = totalAmount - principal;

      setResults({
        monthlyPayment,
        totalInterest,
        totalAmount,
        principalAmount: principal
      });
    }
  }, [formData]);

  const pieData = [
    { name: 'Principal', value: results.principalAmount },
    { name: 'Interest', value: results.totalInterest }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <SectionWrapper 
      container="default"
      className="relative min-h-screen flex items-center py-20"
    >
      <div className="w-full">
        {/* Header Section */}
        <SectionHeading
          label="Calculate Your Mortgage"
          title="Plan Your Financial Future"
          subtitle="Get a clear picture of your mortgage payments and make informed decisions"
        />
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Side - Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 border border-border shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-8">Loan Details</h3>
            <div className="space-y-8">
              {/* Property Value Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Property Value (AED)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.propertyValue}
                    onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
                    className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 text-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="1,000,000"
                  />
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Down Payment</label>
                  <span className="text-sm font-medium text-primary">
                    {formData.downPayment}%
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={formData.downPayment}
                    onChange={(e) => setFormData({...formData, downPayment: parseInt(e.target.value)})}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimum (20%)</span>
                    <span>Maximum (80%)</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="number"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({...formData, interestRate: parseFloat(e.target.value)})}
                    className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 text-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Loan Term Select */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Loan Term
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={formData.loanTerm}
                    onChange={(e) => setFormData({...formData, loanTerm: parseInt(e.target.value)})}
                    className="w-full bg-background/50 border border-border rounded-xl pl-12 pr-4 py-3 text-lg appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    {[5, 10, 15, 20, 25, 30].map(year => (
                      <option key={year} value={year}>{year} years</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Monthly Payment Card */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <div className="text-sm text-muted-foreground">
                Monthly Payment
              </div>
              <div className="text-4xl font-bold text-primary mt-2">
                AED {Math.round(results.monthlyPayment).toLocaleString()}
              </div>
            </div>

            {/* Breakdown Chart */}
            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Payment Breakdown</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index]}
                          className="transition-all duration-300 hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `AED ${Math.round(Number(value)).toLocaleString()}`}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Summary and Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="text-sm text-muted-foreground">
                  Total Principal
                </div>
                <div className="text-xl font-semibold mt-1">
                  AED {Math.round(results.principalAmount).toLocaleString()}
                </div>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="text-sm text-muted-foreground">
                  Total Interest
                </div>
                <div className="text-xl font-semibold mt-1">
                  AED {Math.round(results.totalInterest).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground py-4 px-6 rounded-xl font-medium hover:opacity-90 transition-all"
              >
                Get Pre-qualified
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card border border-border text-foreground py-4 px-6 rounded-xl font-medium hover:bg-accent transition-all"
              >
                Save Calculation
              </motion.button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground mt-4">
              * This calculator provides approximations for informational purposes only. 
              Actual payments may vary based on your bank's terms and conditions.
            </p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}