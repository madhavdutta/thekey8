import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Circle,
  DollarSign,
  CalendarDays,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Calculator,
  ArrowRight,
  Percent,
  Building2,
  Clock,
  Shield
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Progress } from "../../components/ui/progress";


export const QuickCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [years, setYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.99);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Format number with commas as user types
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numericValue = parseInt(value);

    if (numericValue > 10000000) {
      setIsValid(false);
    } else {
      setIsValid(true);
      const formatted = value ? numericValue.toLocaleString() : '';
      setLoanAmount(formatted);
    }
  };

  // Calculate all mortgage details
  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, '')) || 0;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    if (principal > 0) {
      const payment = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalPayment = payment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      // Calculate yearly breakdown
      const yearlyBreakdown = Array.from({ length: years }, (_, yearIndex) => {
        const yearNumber = yearIndex + 1;
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        let remainingBalance = principal;

        for (let month = 1; month <= 12; month++) {
          const monthlyInterest = remainingBalance * monthlyRate;
          const monthlyPrincipal = payment - monthlyInterest;

          yearlyPrincipal += monthlyPrincipal;
          yearlyInterest += monthlyInterest;
          remainingBalance -= monthlyPrincipal;
        }

        return {
          year: yearNumber,
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          remainingBalance: Math.max(0, Math.round(remainingBalance))
        };
      });

      return {
        monthlyPayment: Math.round(payment),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        yearlyBreakdown,
        loanToValue: (principal / principal) * 100,
        monthlyIncomeRequired: Math.round(payment * 3.33) // UAE 30% DBR rule
      };
    }

    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      yearlyBreakdown: [],
      loanToValue: 0,
      monthlyIncomeRequired: 0
    };
  };

  const mortgageStats = calculateMortgage();

  // Calculate progress for rings
  const calculateProgress = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, '')) || 0;
    return {
      interestRatio: (mortgageStats.totalInterest / (principal + mortgageStats.totalInterest)) * 100,
      progressYears: (years / 25) * 100,
      affordabilityRatio: (mortgageStats.monthlyPayment / mortgageStats.monthlyIncomeRequired) * 100
    };
  };

  const progress = calculateProgress();

  // Stats Card Component
  const StatsCard = ({ icon: Icon, title, stats }) => (
    <div className="p-4 bg-accent/30 dark:bg-accent/40 backdrop-blur-sm rounded-xl
                    border border-border/20 dark:border-white/[0.08]
                    hover:bg-accent/40 dark:hover:bg-accent/50
                    transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 
                      flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="text-sm font-medium text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );


  // Modal Content Component
  const ModalContent = ({ stats, loanAmount, years, interestRate }) => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-full">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10
                       border border-border/20 dark:border-white/[0.08] backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Monthly Breakdown</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-background/50 dark:bg-background/30 rounded-xl
                          border border-border/10 dark:border-white/[0.05]">
                  <div className="text-sm text-muted-foreground">EMI Payment</div>
                  <div className="text-2xl font-bold text-primary mt-1">
                    {stats.monthlyPayment.toLocaleString()} AED
                  </div>
                </div>
                <div className="p-4 bg-background/50 dark:bg-background/30 rounded-xl
                          border border-border/10 dark:border-white/[0.05]">
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {stats.totalPayment.toLocaleString()} AED
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        {/* Key Stats Cards */}
        <StatsCard
          icon={Percent}
          title="Interest Details"
          stats={[
            {
              label: "Total Interest",
              value: `${stats.totalInterest.toLocaleString()} AED`
            },
            {
              label: "Interest Rate",
              value: `${interestRate}%`
            }
          ]}
        />

        <StatsCard
          icon={Clock}
          title="Loan Duration"
          stats={[
            {
              label: "Loan Term",
              value: `${years} Years`
            },
            {
              label: "Total Payments",
              value: `${years * 12} Months`
            }
          ]}
        />

        <StatsCard
          icon={Building2}
          title="Loan Details"
          stats={[
            {
              label: "Principal Amount",
              value: `${parseInt(loanAmount.replace(/,/g, '')).toLocaleString()} AED`
            },
            {
              label: "Down Payment Required",
              value: "20%"
            }
          ]}
        />

        <StatsCard
          icon={Shield}
          title="Protection"
          stats={[
            {
              label: "Life Insurance",
              value: "Required"
            },
            {
              label: "Property Insurance",
              value: "Required"
            }
          ]}
        />
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Next Steps</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-gradient-primary text-primary-foreground rounded-xl 
                   font-medium shadow-lg flex items-center justify-center gap-2
                   hover:shadow-primary/20 transition-all duration-300"
          >
            Get Pre-Approved Now
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-accent/30 dark:bg-accent/40 backdrop-blur-sm rounded-xl 
                   border border-border/20 dark:border-white/[0.08]
                   hover:bg-accent/40 dark:hover:bg-accent/50
                   flex items-center justify-center gap-2 text-foreground
                   transition-all duration-300"
          >
            Speak to an Advisor
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground p-4 bg-accent/20 dark:bg-accent/30 rounded-xl
                border border-border/10 dark:border-white/[0.05]">
        * This is an estimate based on the provided information. Actual loan terms and EMI may vary based on bank evaluation and other factors.
      </p>
    </div>
  );



  function getRecommendations(loanAmount, years, interestRate, monthlyPayment) {
    const recommendations: string[] = [];
    const loanValue = parseFloat(loanAmount.replace(/,/g, '')) || 0;

    // Interest rate recommendations
    if (interestRate > 4.5) {
      recommendations.push("Current rate is above market average. Compare rates from multiple banks for better offers.");
    }

    // Loan term recommendations
    if (years === 25) {
      recommendations.push("Consider a 20-year term to save on total interest while maintaining manageable EMI.");
    }

    // Loan amount recommendations
    if (loanValue > 5000000) {
      recommendations.push("High loan amount. Consider increasing down payment to reduce EMI burden.");
    }

    // Add general recommendations if none specific
    if (recommendations.length === 0) {
      recommendations.push("Get pre-approved to lock in current rates and speed up your home buying process.");
    }

    return recommendations;
  }


  return (
    <div className="relative">
      {/* Animated Gradient Border */}
      {/* <div className="absolute -inset-[1px] bg-gradient-primary rounded-[24px] opacity-20 group-hover:opacity-40 blur-sm transition-all duration-500" /> */}

      {/* Glow Effects */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[24px] opacity-20 blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // className="relative backdrop-blur-md bg-card/5 border-2 border-border/40 rounded-3xl p-12"
        className="relative backdrop-blur-md bg-card/5 border border-border/10 ring-1 ring-primary/10 rounded-3xl p-12"
      >
        {/* Ambient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-secondary/[0.07] pointer-events-none" />

        {/* Top Light Effect */}
        <div className="absolute -top-24 -right-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-20" />

        {/* Bottom Light Effect */}
        <div className="absolute -bottom-24 -left-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl opacity-20" />

        {/* Content Container */}
        <div className="relative space-y-8">
          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Loan Amount
              </label>
              <span className="text-sm font-mono text-muted-foreground">AED</span>
            </div>
            <input
              type="text"
              value={loanAmount}
              onChange={handleAmountChange}
              className={`w-full bg-transparent border-b ${isValid ? 'border-border/60 dark:border-white/[0.08] focus:border-primary/40' : 'border-red-500'
                } text-3xl py-2 focus:outline-none transition-colors placeholder-muted-foreground/50`}
              placeholder="1,000,000"
            />
            {!isValid && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-500 mt-1"
              >
                Maximum loan amount is 10,000,000 AED
              </motion.p>
            )}
          </div>

          {/* Tenor Slider */}
          <div>
            <label className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Tenor (Years)
            </label>
            <div className="relative mt-6">
              <input
                type="range"
                min="5"
                max="25"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full h-1 bg-border/40 dark:bg-white/[0.08] rounded-lg appearance-none cursor-pointer 
                          [&::-webkit-slider-thumb]:appearance-none 
                          [&::-webkit-slider-thumb]:h-4 
                          [&::-webkit-slider-thumb]:w-4 
                          [&::-webkit-slider-thumb]:rounded-full 
                          [&::-webkit-slider-thumb]:bg-primary 
                          [&::-webkit-slider-thumb]:shadow-lg
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-background
                          hover:[&::-webkit-slider-thumb]:shadow-primary/20"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>5</span>
                <span className="text-primary font-medium">{years}</span>
                <span>25</span>
              </div>
            </div>
          </div>

          {/* Interest Rate Display */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground flex items-center dark:text-muted-foreground">Interest Rate</span>
            </div>
            <span className="text-sm font-medium">{interestRate}%</span>
          </div>

          {/* Results Section */}
          <motion.div
            className="pt-8 border-t border-border/10"
            initial={false}
            animate={{ height: showDetails ? 'auto' : '140px' }}
          >
            <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Circle className="w-4 h-4 fill-primary text-primary" />
              Monthly Payment
            </div>
            <motion.div
              className="text-4xl font-bold text-primary"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              key={mortgageStats.monthlyPayment}
            >
              {mortgageStats.monthlyPayment.toLocaleString()} AED
            </motion.div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-accent/30 dark:bg-accent/40 backdrop-blur-sm rounded-xl
                                  border border-border/20 dark:border-white/[0.08]">
                      <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                      <div className="font-semibold">{mortgageStats.totalInterest.toLocaleString()} AED</div>
                    </div>
                    <div className="p-4 bg-accent/30 dark:bg-accent/40 backdrop-blur-sm rounded-xl
                                  border border-border/20 dark:border-white/[0.08]">
                      <div className="text-sm text-muted-foreground mb-1">Required Monthly Income</div>
                      <div className="font-semibold">{mortgageStats.monthlyIncomeRequired.toLocaleString()} AED</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {getRecommendations(loanAmount, years, interestRate, mortgageStats.monthlyPayment).length > 0 && (
                    <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl
                                  border border-primary/10 dark:border-primary/20">
                      <div className="text-sm font-medium mb-2">Smart Recommendations</div>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {getRecommendations(loanAmount, years, interestRate, mortgageStats.monthlyPayment)
                          .map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {rec}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-primary text-primary-foreground rounded-full font-medium
                           shadow-[0_0_0_1px_rgba(var(--primary),0.2)] hover:shadow-[0_0_0_1px_rgba(var(--primary),0.4)]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={!loanAmount || !isValid}
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Full Payment
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader className={"flex flex-col space-y-1.5 text-center sm:text-left"}>
                  <DialogTitle>Mortgage Summary</DialogTitle>
                </DialogHeader>
                <ModalContent
                  stats={mortgageStats}
                  loanAmount={loanAmount}
                  years={years}
                  interestRate={interestRate}
                />
              </DialogContent>
            </Dialog>


            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground
                       flex items-center justify-center gap-2 transition-colors duration-300"
            >
              {showDetails ? (
                <>Hide Details <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show Details <ChevronDown className="w-4 h-4" /></>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};