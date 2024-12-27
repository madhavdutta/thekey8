import React from 'react';
import { Briefcase, Building, Calculator, ChartBar, CheckIcon, DollarSign, FileText, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepperProps {
  steps: string[];
  currentStep: number;
}


const STEPS = [
  { id: 1, title: 'About Me', description: 'Personal Information', icon: Home },
  { id: 2, title: 'Financial Requirements', description: 'Mortgage Preferences', icon: DollarSign },
  { id: 3, title: 'Employment', description: 'Work Details', icon: Briefcase },
  { id: 4, title: 'Income', description: 'Monthly Earnings', icon: Calculator },
  { id: 5, title: 'Liabilities', description: 'Existing Commitments', icon: FileText },
  { id: 6, title: 'Property Details', description: 'Property Information', icon: Building },
  { id: 7, title: 'Summary', description: 'Eligibility Results', icon: ChartBar }
];


const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex flex-col items-start space-y-6">
        {STEPS.map(({ id, title, description, icon: Icon }) => {
          const isActive = id === currentStep;
          const isCompleted = id < currentStep;
          
          return (
            <div key={id} className="w-full">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: id * 0.1 }}
                className={`flex items-start group relative p-4 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-primary/5' : isCompleted ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg
                  ${isActive ? 'bg-primary text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 
                    'bg-gray-100 text-gray-500'}
                `}>
                  <Icon size={20} />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className={`text-sm font-semibold ${
                    isActive ? 'text-primary' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-700'
                  }`}>
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>

                {isCompleted && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      ✓
                    </motion.div>
                  </div>
                )}

                {id < STEPS.length && (
                  <div className={`absolute left-7 top-14 h-12 w-0.5 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;