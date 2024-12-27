// types/index.d.ts

export interface AboutMe {
    firstName: string;
    lastName: string;
    age: number;
    residencyStatus: 'UAE Resident' | 'Non-resident' | 'UAE National';
    applicationType: 'Single' | 'Joint';
    nationality: string;
  }
  
  export interface FinancialRequirement {
    purpose: 'New Purchase' | 'Refinance';
    mortgageType: 'Islamic' | 'Conventional';
    salaryTransfer: boolean;
    feeFinancing: boolean;
    ratePreference: 'Variable' | 'Fixed' | 'Need Guidance';
    propertyPrice: number;
    downPayment: number;
  }
  
  export interface Employment {
    status: 'Employed' | 'Self-Employed' | 'Unemployed';
    employerName: string;
    duration: 'Newly Joined' | 'Less than 6 months' | 'More than 6 months' | 'Less than 1 month' | '1-3 months' | '3-6 months' | '6-12 months' | 'More than 1 year';
    industry: string;
    position: string;
    employmentType: string;
    companyType: string;
    businessName: string;
    tradeLicenseNumber: string;
    businessStartDate: string;
    annualTurnover: string;
    numberOfEmployees: string;
    lastEmploymentDate: string;
    reasonForUnemployment: string;
    previousEmployer: string;
    previousEmploymentDuration?: string;
  }
  
  export interface Income {
    monthlySalary: number;
    otherIncome: {
      rental?: number; // always 80% of annual rental income / 12
      bonus?: number; // 0 
      commission?: number; // 0
      other?: number; // 0
    };
    totalIncome: number; // monthlySalary + otherIncome
  }
  
  export interface Liability {
    creditCards: {
      has: boolean;
      totalLimit?: number;
    }; // 5% of credit card limit
    personalLoanEMI: number;
    autoLoanEMI: number;
    existingMortgageEMI: number;
    stressRate: number; // 4.5% + 2% = 6.5%
    totalLiability: number;
    dbr: number; // (totalMonthlyLiabilities / totalMonthlyIncome) * 100;
  }
  
  
  export interface PropertyDetails {
    stage: 'Researching' | 'Viewing' | 'Made Offer';
    type: 'Completed' | 'Handover' | 'Off Plan';
    usage: 'Commercial' | 'Residential';
    address: string;
    builtUpArea: number;
    developer: string;
    propertyValue: number;
  }
  
  
  export interface MortgageCalculation {
    eligibleAmount: number;
    recommendedBanks: Array<{
      bank: string;
      product: string;
      rate: number;
      emi: number;
      processingFee: number;
      maxLoanAmount: number;
    }>;
    dbr: number;
    stressTestDBR: number;
    requiredDownPayment: number;
  }
  
  
  export interface FormState {
    aboutMe: {
      firstName: string;
      lastName: string;
      age: number;
      residencyStatus: 'UAE Resident' | 'Non-resident' | 'UAE National';
      applicationType: 'Single' | 'Joint';
      nationality: string;
    };
    financialRequirement: {
      purpose: 'New Purchase' | 'Refinance';
      mortgageType: 'Islamic' | 'Conventional';
      salaryTransfer: boolean;
      feeFinancing: boolean;
      ratePreference: 'Variable' | 'Fixed';
    };
    employment: {
      status: 'Employed' | 'Self-Employed' | 'Unemployed';
      employerName: string;
      duration: string;
      industry: string;
      position: string;
      employmentType: string;
      companyType: string;
      businessName: string;
      tradeLicenseNumber: string;
      businessStartDate: string;
      annualTurnover: string;
      numberOfEmployees: string;
      lastEmploymentDate: string;
      reasonForUnemployment: string;
      previousEmployer: string;
      previousEmploymentDuration?: string;
    };
    income: {
      monthlySalary: number;
      otherIncome: {
        rental?: number;
        bonus?: number;
        commission?: number;
        other?: number;
      };
      totalIncome: number;
    };
    liability: {
      creditCards: {
        has: boolean;
        totalLimit?: number;
      };
      personalLoanEMI: number;
      autoLoanEMI: number;
      existingMortgageEMI: number;
      stressRate: number;
      totalLiability: number;
      dbr: number;
    };
    propertyDetails: {
      stage: 'Researching' | 'Viewing' | 'Made Offer';
      type: 'Completed' | 'Handover' | 'Off Plan';
      usage: 'Commercial' | 'Residential';
      address?: string;
      builtUpArea?: number;
      developer?: string;
      propertyValue: number;
    };
    currentStep: number;
  }
  
  
  export interface RawBankData {
    'Bank Name': string;
    'Fixed Rate': string;
    'Fixed Period': string;
    'Base Rate': string;
    'Spread': string;
    'Floor Rate': string;
    'UAE National LTV': string;
    'Resident LTV': string;
    'Non Resident LTV': string;
    'Commercial LTV': string;
    'Investment LTV': string;
    'Off Plan LTV': string;
    'Minimum Income': string;
    'Processing Fee': string;
    'Maximum DBR': string;
    'Maximum Tenure': string;
    'Life Insurance': string;
    'Property Insurance': string;
    'Early Settlement Fee': string;
    'Max Early Settlement': string;
    'Salary Transfer Required': string;
    'Valuation Fee': string;
    'Minimum Loan': string;
    'Maximum Loan': string;
    'Balance Transfer': string;
    'Top Up Facility': string;
    'Restricted Nationalities': string;
    'Restricted Industries': string;
    'Restricted Properties': string;
    'PreApproval Fee': string;
    type: 'Islamic' | 'Conventional';
  }
  
  interface RecommendedBank {
    bank: string;
    product: string;
    rate: number;
    emi: number;
    processingFee: number;
    maxLoanAmount: number;
    maxLTV: {
      uaeNational: number;
      resident: number;
      nonResident: number;
    };
    fees: {
      insurance: {
        life: number;
        property: number;
      };
      valuation: {
        fixed: number;
      };
      processing: {
        percentage: number;
        minimum: number;
        maximum: number;
      };
      earlySettlement: {
        percentage: number;
        maximum: number;
      };
    };
    features: {
      salaryTransfer: boolean;
      fixedPeriod: number;
      earlySettlementFee: number;
      maxTenure: number;
      topUp: {
        available: boolean;
        afterMonths: number;
      };
      balanceTransfer: {
        available: boolean;
        minMonths: number;
      };
    };
  }
  
  export interface SalariedBankData {
    // Bank Identification
    bank: string;
    type: 'Islamic' | 'Conventional';
  
    // Interest Rates
    'Fixed Rate'?: string;
    'Fixed Period'?: string;
    'Base Rate'?: string;
    'Spread'?: string;
    'Floor Rate'?: string;
    'Variable Rate'?: string;
    'Variable Day 1'?: string;
    'Variable Rate post fixed period'?: string;
    'Stress Test Rate'?: string;
  
    // LTV Ratios
    'UAE National LTV'?: string;
    'Resident LTV'?: string;
    'Non Resident LTV'?: string;
    'Commercial LTV'?: string;
    'Investment LTV'?: string;
    'Off Plan LTV'?: string;
  
    // Income Requirements
    'Minimum Income'?: string;
    'Maximum DBR'?: string;
    maxDBR?: string;
    'Salary Transfer Required'?: string;
    'Minimum Length of Service'?: string;
  
    // Loan Limits
    'Minimum Loan'?: string;
    'Maximum Loan'?: string;
    minLoanAmount?: string;
    maxLoanAmount?: string;
  
    // Fees and Charges
    'Processing Fee'?: string;
    'Valuation Fee'?: string;
    'Life Insurance'?: string;
    'Property Insurance'?: string;
    'Early Settlement Fee'?: string;
    'Partial Settlement Fee'?: string;
    'Max Early Settlement'?: string;
  
    // Age Requirements
    minAge?: string;
    maxAge?: string;
  
    // Tenure
    maxTenure?: string;
    'Minimum Tenure'?: string;
    'Maximum Tenure'?: string;
  
    // Property Requirements
    'Approved Developers'?: string;
    'Approved Properties'?: string;
    'Property Age Limit'?: string;
    'Construction Finance'?: string;
  
    // Documentation
    'Required Documents'?: string;
    'PreApproval Fee'?: string;
    'PreApproval Validity'?: string;
  
    // Additional Features
    // 'Payment Holiday'?: string;
    'Top Up Facility'?: string;
    'Balance Transfer'?: string;
    'Non Salary Transfer'?: string;
  
    // Customer Categories
    'Premier Customer Benefits'?: string;
    'UAE National Benefits'?: string;
    'Self Employed Terms'?: string;
  
    // Restrictions
    'Restricted Nationalities'?: string;
    'Restricted Industries'?: string;
    'Restricted Properties'?: string;
    'Minimum Company Length'?: string;
  
  
    // Additional Rate Details
    'Rate Lock Period'?: string;
    'Rate Review Period'?: string;
    'EIBOR Period'?: string; // 1M, 3M, 6M
    'Fixed Rate Options'?: string[]; // Multiple fixed rate periods
    'Rate Switch Fee'?: string;
  
    // Additional LTV Details
    'Second Property LTV'?: string;
    'Staff LTV'?: string;
    'Ready Property LTV'?: string;
    'Under Construction LTV'?: string;
  
    // Additional Fees
    'No Objection Certificate Fee'?: string;
    'Property Registration Fee'?: string;
    'Mortgage Registration Fee'?: string;
    'Title Deed Fee'?: string;
    'Insurance Assignment Fee'?: string;
  
    // Additional Features
    'Offset Account'?: string;
    'Installment Deferment'?: string;
    'Grace Period'?: string;
    'Refinance Options'?: string;
    'Joint Borrower'?: string;
    'Non Resident Options'?: string;
  
    // Additional Requirements
    'Minimum Company Grade'?: string;
    'Cheque Requirements'?: string;
    'Bank Statement Period'?: string;
    'Salary Certificate'?: string;
    'Debt Burden Before'?: string;
    'Debt Burden After'?: string;
  }
  
  // Add additional types for specific calculations
  export interface BankRates {
    fixed: {
      rate: number;
      period: number;
      stressRate: number;
    };
    variable: {
      baseRate: number;
      spread: number;
      floor: number;
      stressRate: number;
    };
  }
  
  export interface PropertyEligibility {
    propertyTypes: {
      ready: boolean;
      offPlan: boolean;
      underConstruction: boolean;
      commercial: boolean;
      investment: boolean;
    };
    propertyRestrictions: {
      minValue: number;
      maxValue: number;
      minAge: number;
      maxAge: number;
      approvedDevelopers: string[];
      restrictedAreas: string[];
    };
    propertyDocuments: {
      required: string[];
      optional: string[];
    };
  }
  
  export interface MortgageVariations {
    salaried: {
      standard: BankProduct;
      premier: Partial<BankProduct>;
      staff: Partial<BankProduct>;
    };
    selfEmployed: {
      standard: Partial<BankProduct>;
      business: Partial<BankProduct>;
    };
    nonResident: Partial<BankProduct>;
  }
  
  export interface StressTestParameters {
    interestRateIncrease: number;
    propertyValueDecrease: number;
    incomeReduction: number;
    additionalExpenses: number;
    inflationRate: number;
  }
  
  export interface LTVRatios {
    uaeNational: {
      residential: number;
      commercial: number;
      investment: number;
      offPlan: number;
    };
    resident: {
      residential: number;
      commercial: number;
      investment: number;
      offPlan: number;
    };
    nonResident: {
      residential: number;
      commercial: number;
      investment: number;
      offPlan: number;
    };
  }
  
  
  // Let's also add some additional helper types that might be useful
  
  export interface BankLimits {
    ageLimit: {
      min: number;
      max: number;
    };
    loanLimit: {
      min: number;
      max: number;
    };
    maxDBR: number;
    maxTenure: number;
  }
  
  
  
  // Update BankProduct interface to include all necessary properties
  export interface BankProduct {
    earlySettlement: any;
    bank: string;
    type: 'Islamic' | 'Conventional';
    fixedRate: Array<{
        rate: number;
        period: number;
    }>;
    variableRate: {
        baseRate: number;
        spread: number;
        floor?: number;
    };
    maxLTV: {
        uaeNational: number;
        resident: number;
        nonResident: number;
    };
    minIncome: number;
    processingFee: number;
    maxDBR: number;
    maxTenure: number;
    rates: {
        fixed: {
            rate: number;
            period: number;
            stressRate: number;
        };
        variable: {
            baseRate: number;
            spread: number;
            floor: number;
            stressRate: number;
        };
    };
    ltvRatios: {
        uaeNational: {
            residential: number;
            commercial: number;
            investment: number;
            offPlan: number;
        };
        resident: {
            residential: number;
            commercial: number;
            investment: number;
            offPlan: number;
        };
        nonResident: {
            residential: number;
            commercial: number;
            investment: number;
            offPlan: number;
        };
    };
    fees: {
        processing: {
            percentage: number;
            minimum: number;
            maximum: number;
        };
        valuation: {
            fixed: number;
        };
        insurance: {
            life: number;
            property: number;
        };
        earlySettlement: {
            percentage: number;
            maximum: number;
        };
        partialSettlement: {
            percentage: number;
            maximum: number;
            allowedPerYear: number;
        };
        preApproval: {
            amount: number;
            validity: number;
        };
    };
    features: BankFeatures;
    restrictions: {
        nationalities: string[];
        industries: string[];
        properties: string[];
    };
    minLoanAmount: number;
    maxLoanAmount: number;
    eligibility: {
        salary: {
            minimum: number;
            preferred: number;
        };
        age: {
            minimum: number;
            maximum: number;
        };
        dbr: {
            maximum: number;
            stressTest: number;
        };
        los: {
            minimum: number;
            preferred: number;
        };
        company: {
            minimumLength: number;
            approvedIndustries: string[];
            restrictedIndustries: string[];
        };
    };
  }
  
  // Update BankFees to include the new fields
  export interface BankFees {
    processing: {
      percentage: number;
      minimum: number;
      maximum: number;
    };
    valuation: {
      fixed: number;
      percentage?: number;
    };
    insurance: {
      life: number;
      property: number;
    };
    earlySettlement: {
      percentage: number;
      maximum: number;
    };
    partialSettlement: {
      percentage: number;
      maximum: number;
      allowedPerYear: number;
    };
    preApproval: {
      amount: number;
      validity: number;
    };
  }
  
  
  // Add calculation helper types
  export interface EMICalculation {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    amortizationSchedule: Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  }
  
  export interface BankFeatures {
    salaryTransfer: boolean;
    fixedPeriod: number;
    earlySettlementFee: number;
    maxTenure: number;
    offsetAccount: {
        available: boolean;
        interestSaving: number;
    };
    gracePeriod: {
        construction: number;
        readyProperty: number;
    };
    propertySwap: {
        available: boolean;
        fee: number;
        minPeriod: number;
    };
    rateSwitch: {
        available: boolean;
        fee: number;
        frequency: number;
    };
    installmentDeferment: {
        available: boolean;
        maxTimes: number;
        maxPeriod: number;
    };
    topUp: {
        available: boolean;
        afterMonths: number;
    };
    balanceTransfer: {
        available: boolean;
        minMonths: number;
    };
  }
  
  
  // Update RecommendedBank to include more details
  export interface RecommendedBank {
    bank: string;
    product: string;
    rate: number;
    emi: number;
    processingFee: number;
    maxLoanAmount: number;
    features?: BankFeatures;
    stressTestEMI?: number;
  }
  
  // Update EligibilityResult to include more details
  export interface EligibilityResult {
    eligibleAmount: number;
    recommendedBanks: RecommendedBank[];
    dbr: number;
    stressTestDBR: number;
    requiredDownPayment: number;
    maxLoanAmount: number;
    maxLTV: number;
    maxLoanTenure: number;
  }
  
  // Add a type for the bank matrix response
  export interface BankMatrixResponse {
    Salaried: SalariedBankData[];
    [key: string]: any[];
  }
  
  // Add a type for validation results
  export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }
  
  export interface BankEligibility {
    salary: {
      minimum: number;
      preferred: number;
    };
    age: {
      minimum: number;
      maximum: number;
    };
    dbr: {
      maximum: number;
      stressTest: number;
    };
    los: {
      minimum: number;
      preferred: number;
    };
    company: {
      minimumLength: number;
      approvedIndustries: string[];
      restrictedIndustries: string[];
    };
  }
  
  export interface EligibilityCalculation extends EligibilityResult {
    detailedAnalysis: {
      incomeAnalysis: {
        totalIncome: number;
        eligibleIncome: number;
        deductions: number;
        netIncome: number;
      };
      dbrAnalysis: {
        currentDBR: number;
        projectedDBR: number;
        stressTestDBR: number;
        availableDBR: number;
      };
      ltvAnalysis: {
        maxLTV: number;
        actualLTV: number;
        requiredDownPayment: number;
      };
    };
  }
  
  export interface DocumentationRequirements {
    mandatory: {
      identity: string[];
      income: string[];
      property: string[];
      financial: string[];
    };
    conditional: {
      selfEmployed: string[];
      nonResident: string[];
      investment: string[];
      refinance: string[];
    };
    processing: {
      timeframes: {
        preApproval: number;
        finalApproval: number;
        valuation: number;
        disbursal: number;
      };
      validity: {
        preApproval: number;
        finalApproval: number;
        documents: number;
      };
    };
  }
  
  
  
  
  interface RecommendedBank {
    bank: string;
    product: string;
    maxLoanAmount: number;
    emi: number;
    rate: number;
    processingFee: number;
    features: {
        salaryTransfer: boolean;
        fixedPeriod: number;
        earlySettlementFee: number;
        maxTenure: number;
    };
  }
  