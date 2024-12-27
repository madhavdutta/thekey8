import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, DollarSign, Briefcase, Calculator, FileText, Building, ChartBar, Loader2 } from 'lucide-react';
import { FormProvider, useFormContext } from '../../contexts/formContext';
import { loadBankMatrix } from '../../utils/mortgage-proposal/utils/readExcel';
import type { FormState } from '../../types/mortgage-proposal/forms';

// Import components
import AboutMe from './steps/AboutMe';
import FinancialRequirement from './steps/FinancialRequirement';
import MyEmployer from './steps/MyEmployer';
import Step2Income from './steps/Step2Income';
import Step3Liabilities from './steps/Step3Liabilities';
import Step4PropertyDetails from './steps/Step4PropertyDetails';
import SummaryCalculator from './steps/SummaryCalculator';
import Stepper  from './steps/Stepper';

export const PROPOSAL_STEPS = [
  { id: 1, title: 'About Me', description: 'Personal Information', icon: Home },
  { id: 2, title: 'Financial Requirements', description: 'Mortgage Preferences', icon: DollarSign },
  { id: 3, title: 'Employment', description: 'Work Details', icon: Briefcase },
  { id: 4, title: 'Income', description: 'Monthly Earnings', icon: Calculator },
  { id: 5, title: 'Liabilities', description: 'Existing Commitments', icon: FileText },
  { id: 6, title: 'Property Details', description: 'Property Information', icon: Building },
  { id: 7, title: 'Summary', description: 'Eligibility Results', icon: ChartBar }
];

interface MortgageProposalProps {
  onReset?: () => void;
}

const MortgageProposal: React.FC<MortgageProposalProps> = ({ onReset }) => {
  const { state, dispatch } = useFormContext();
  const [step, setStep] = React.useState(1);
  const [bankMatrix, setBankMatrix] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const matrix = await loadBankMatrix();
        setBankMatrix(matrix);

        const savedState = localStorage.getItem('mortgageFormState');
        if (savedState) {
          const parsed = JSON.parse(savedState) as FormState;
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
          const lastStep = localStorage.getItem('currentStep');
          if (lastStep) {
            setStep(parseInt(lastStep));
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('mortgageFormState', JSON.stringify(state));
    localStorage.setItem('currentStep', step.toString());
  }, [state, step]);

  const handleNext = (data: Partial<FormState>) => {
    dispatch({ type: 'UPDATE_STEP_DATA', payload: data });
    setStep(prev => Math.min(prev + 1, PROPOSAL_STEPS.length));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  

  const renderStep = (currentStep: number) => {
    const baseProps = {
      onNext: handleNext,
      formState: state,
    };

    const withBackProps = {
      ...baseProps,
      onBack: handleBack,
    };

    const summaryProps = {
      bankMatrix,
      onBack: handleBack,
      formState: state,
    };

    switch (currentStep) {
      case 1: return <AboutMe {...baseProps} />;
      case 2: return <FinancialRequirement {...withBackProps} />;
      case 3: return <MyEmployer {...withBackProps} />;
      case 4: return <Step2Income {...withBackProps} />;
      case 5: return <Step3Liabilities {...withBackProps} />;
      case 6: return <Step4PropertyDetails {...withBackProps} />;
      case 7: return <SummaryCalculator {...summaryProps} />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4"
        >
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <p className="text-gray-700 font-medium">Loading your application...</p>
        </motion.div>
      </div>
    );
  }

  return (
      <main className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 bg-gray-50 p-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
              <Stepper currentStep={step} />
            </div>

            <div className="w-full lg:w-2/3 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {renderStep(step)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
  );
};

export default MortgageProposal;