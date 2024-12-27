import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { FormState } from '../types/mortgage-proposal/forms';

type FormAction =
  | { type: 'UPDATE_STEP_DATA'; payload: Partial<FormState> }
  | { type: 'LOAD_FROM_STORAGE'; payload: FormState }
  | { type: 'RESET_FORM' };

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

const initialState: FormState = {
  aboutMe: {
    firstName: '',
    lastName: '',
    age: 0,
    residencyStatus: 'UAE Resident',
    applicationType: 'Single',
    nationality: ''
  },
  financialRequirement: {
    purpose: 'New Purchase',
    mortgageType: 'Conventional',
    salaryTransfer: false,
    feeFinancing: false,
    ratePreference: 'Fixed'
  },
  employment: {
    status: 'Employed',
    employerName: '',
    duration: 'Newly Joined',
    industry: '',
    position: '',
    employmentType: '',
    companyType: '',
    businessName: '',
    tradeLicenseNumber: '',
    businessStartDate: '',
    annualTurnover: '',
    numberOfEmployees: '',
    lastEmploymentDate: '',
    reasonForUnemployment: '',
    previousEmployer: '',
    previousEmploymentDuration: ''
  },
  income: {
    monthlySalary: 0,
    otherIncome: {
      rental: 0,
      bonus: 0,
      commission: 0,
      other: 0
    },
    totalIncome: 0
  },
  liability: {
    creditCards: {
      has: false,
      totalLimit: 0
    },
    personalLoanEMI: 0,
    autoLoanEMI: 0,
    existingMortgageEMI: 0,
    stressRate: 2,
    totalLiability: 0,
    dbr: 0
  },
  propertyDetails: {
    stage: 'Researching',
    type: 'Completed',
    usage: 'Residential',
    address: '',
    builtUpArea: 0,
    developer: '',
    propertyValue: 0
  },
  currentStep: 1
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_STEP_DATA': {
      console.log('Received update payload:', action.payload);
      
      const newState = { ...state };
  
      // Preserve existing data while updating with new data
      if (action.payload.aboutMe) {
          newState.aboutMe = {
              ...state.aboutMe,
              ...action.payload.aboutMe,
              age: Number(action.payload.aboutMe.age)
          };
      }
  
      if (action.payload.income) {
          newState.income = {
              ...state.income,
              ...action.payload.income,
              monthlySalary: Number(action.payload.income.monthlySalary || state.income.monthlySalary),
              totalIncome: Number(action.payload.income.totalIncome || state.income.totalIncome)
          };
      }
  
      if (action.payload.financialRequirement) {
        //   const propertyPrice = Number(action.payload.financialRequirement.propertyPrice);
          newState.financialRequirement = {
              ...state.financialRequirement,
              ...action.payload.financialRequirement
          };
          // Sync property value
          newState.propertyDetails = {
              ...state.propertyDetails
          };
      }
  
      if (action.payload.propertyDetails) {
          newState.propertyDetails = {
              ...state.propertyDetails,
              ...action.payload.propertyDetails
          };
      }
  
      console.log('Updated state:', newState);
      return newState;
  }

    case 'LOAD_FROM_STORAGE':
      console.log('Loading from storage:', action.payload);
      return action.payload;

    case 'RESET_FORM':
      console.log('Resetting form to initial state');
      return initialState;

    default:
      return state;
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Debug logging for state changes
  useEffect(() => {
    console.log('FormContext State Updated:', {
      aboutMe: state.aboutMe,
      income: state.income,
      propertyDetails: state.propertyDetails,
      financialRequirement: state.financialRequirement
    });
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};