import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../types/database.types';
import { useFormContext } from '../../../contexts/formContext';
import { EligibilityCalculator } from '../../../utils/mortgage-proposal/utils/eligibilityCalculator';
import type { FormState, BankProduct, RecommendedBank, BankFeatures } from '../../../types/mortgage-proposal/forms';
import { validateEligibilityInputs } from '../../../utils/mortgage-proposal/utils/eligibilityValidator';
import { formatCurrency } from '../../../lib/utils';

interface BankPolicyData {
  bankName: string;
  policyKeyName: string;
  policyKeyValue: string | number;
}

const transformBankPolicies = (policies: BankPolicyData[]): BankProduct[] => {
  const bankGroups = policies.reduce((acc, policy) => {
    if (!acc[policy.bankName]) acc[policy.bankName] = {};
    acc[policy.bankName][policy.policyKeyName] = policy.policyKeyValue;
    return acc;
  }, {} as Record<string, any>);

  return Object.entries(bankGroups).map(([bankName, policies]): BankProduct => ({
    bank: bankName,
    type: policies.mortgageType || 'Conventional',
    fixedRate: [{
      rate: Number(policies.fixedRate) || 4.99,
      period: Number(policies.fixedPeriod) || 3,
    }],
    variableRate: {
      baseRate: Number(policies.baseRate) || 4.5,
      spread: Number(policies.spread) || 2,
      floor: Number(policies.floorRate) || 4.99,
    },
    maxLTV: {
      uaeNational: Number(policies.uaeNationalLTV) || 85,
      resident: Number(policies.residentLTV) || 80,
      nonResident: Number(policies.nonResidentLTV) || 65,
    },
    minIncome: Number(policies.minimumIncomeSalaried) || 15000,
    processingFee: Number(policies.processingFee) || 1,
    maxDBR: Number(policies.maximumDBR) || 50,
    maxTenure: Number(policies.maximumTenure) || 25,
    minLoanAmount: Number(policies.minimumLoan) || 350000,
    maxLoanAmount: Number(policies.maximumLoan) || 5000000,
    rates: {
      fixed: {
        rate: Number(policies.fixedRate) || 4.99,
        period: Number(policies.fixedPeriod) || 3,
        stressRate: Number(policies.stressRate) || 6.5
      },
      variable: {
        baseRate: Number(policies.baseRate) || 4.5,
        spread: Number(policies.spread) || 2,
        floor: Number(policies.floorRate) || 4.99,
        stressRate: Number(policies.stressRate) || 6.5
      }
    },
    earlySettlement: {
      fee: Number(policies.earlySettlementFee) || 1,
      period: Number(policies.earlySettlementPeriod) || 0
    },
    ltvRatios: {
      uaeNational: {
        residential: Number(policies.uaeNationalResidentialLTV) || 85,
        commercial: Number(policies.uaeNationalCommercialLTV) || 85,
        investment: Number(policies.uaeNationalInvestmentLTV) || 85,
        offPlan: Number(policies.uaeNationalOffPlanLTV) || 85
      },
      resident: {
        residential: Number(policies.residentResidentialLTV) || 80,
        commercial: Number(policies.residentCommercialLTV) || 80,
        investment: Number(policies.residentInvestmentLTV) || 80,
        offPlan: Number(policies.residentOffPlanLTV) || 80
      },
      nonResident: {
        residential: Number(policies.nonResidentResidentialLTV) || 65,
        commercial: Number(policies.nonResidentCommercialLTV) || 65,
        investment: Number(policies.nonResidentInvestmentLTV) || 65,
        offPlan: Number(policies.nonResidentOffPlanLTV) || 65
      }
    },
    fees: {
      preApproval: {
        amount: Number(policies.preApprovalFeeAmount) || 0,
        validity: Number(policies.preApprovalFeeValidity) || 0,
      },
      processing: {
        percentage: Number(policies.processingFeePercentage) || 1,
        minimum: Number(policies.processingFeeMinimum) || 0,
        maximum: Number(policies.processingFeeMaximum) || 0,
      },
      valuation: {
        fixed: Number(policies.valuationFeeFixed) || 3000,
      },
      insurance: {
        life: Number(policies.lifeInsuranceFee) || 0.25,
        property: Number(policies.propertyInsuranceFee) || 0.04,
      },
      earlySettlement: {
        percentage: Number(policies.earlySettlementFeePercentage) || 1,
        maximum: Number(policies.earlySettlementFeeMaximum) || 0,
      },
      partialSettlement: {
        percentage: Number(policies.partialSettlementFeePercentage) || 0,
        maximum: Number(policies.partialSettlementFeeMaximum) || 0,
        allowedPerYear: Number(policies.partialSettlementAllowedPerYear) || 0,
      },
    },
    restrictions: {
      nationalities: policies.nationalities ? policies.nationalities.split(',') : [],
      industries: policies.industries ? policies.industries.split(',') : [],
      properties: policies.properties ? policies.properties.split(',') : []
    },
    eligibility: {
      salary: {
        minimum: Number(policies.minimumIncomeSalaried) || 15000,
        preferred: Number(policies.preferredIncomeSalaried) || 20000
      },
      age: {
        minimum: Number(policies.minimumAge) || 21,
        maximum: Number(policies.maximumAge) || 65
      },
      dbr: {
        maximum: Number(policies.maximumDBR) || 50,
        stressTest: Number(policies.stressTestDBR) || 55
      },
      los: {
        minimum: Number(policies.minimumLengthOfService) || 1,
        preferred: Number(policies.preferredLengthOfService) || 2
      },
      company: {
        minimumLength: Number(policies.minimumCompanyLength) || 1,
        approvedIndustries: policies.approvedIndustries ? policies.approvedIndustries.split(',') : [],
        restrictedIndustries: policies.restrictedIndustries ? policies.restrictedIndustries.split(',') : []
      }
    },
    features: {
      salaryTransfer: policies.salaryTransfer === 'yes',
      fixedPeriod: Number(policies.fixedPeriod) || 0,
      earlySettlementFee: Number(policies.earlySettlementFee) || 1,
      maxTenure: Number(policies.maximumTenure) || 25,
      topUp: { available: policies.topUpFacility === 'yes', afterMonths: 12 },
      balanceTransfer: { available: policies.balanceTransfer === 'yes', minMonths: 6 },
      offsetAccount: { available: false, interestSaving: 0 },
      gracePeriod: { construction: 0, readyProperty: 0 },
      propertySwap: { available: false, fee: 0, minPeriod: 0 },
      rateSwitch: { available: false, fee: 0, frequency: 0 },
      installmentDeferment: { available: false, maxTimes: 0, maxPeriod: 0 }
    }
  }));
};

const SummaryCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { state } = useFormContext();
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateResults = async () => {
      try {
        setIsLoading(true);
        const { data: bankPolicies, error: bankError } = await supabase
          .from('bankPoliciesData')  // Changed from bankPoliciesData
          .select('*');

        const { data: eiborRates, error: eiborError } = await supabase
          .from('eiborData')
          .select('*');

        if (bankError || eiborError) {
          console.error('Database Error:', { bankError, eiborError });
          throw bankError || eiborError;
        }

        console.log('Bank Policies:', bankPolicies);
        console.log('Form State:', state);

        const bankProducts = transformBankPolicies(bankPolicies || []);
        console.log('Transformed Bank Products:', bankProducts);

        const results = EligibilityCalculator.calculateEligibility(state, bankProducts);
        console.log('Initial Eligibility Results:', results);

        // Check results before setting state
        if (results?.recommendedBanks?.length > 0) {
          setEligibilityResult(results);
          console.log('Setting eligibility results:', results);
        } else {
          throw new Error('No eligible banks found. Monthly income or loan requirements may not meet minimum criteria.');
        }

        // Save application
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('applications').insert({
            about_me: state.aboutMe,
            financial_requirement: state.financialRequirement,
            employment: state.employment,
            income: state.income,
            liability: state.liability,
            property_details: state.propertyDetails,
            application_status: 'draft',
            offer_status: 'pending',
            documents: {},
            userId: user.id
          });
        }

      } catch (err) {
        console.error('Error in calculation:', err);
        setError(err instanceof Error ? err.message : 'Calculation failed');
      } finally {
        setIsLoading(false);
      }
    };

    calculateResults();
  }, [state]);

  const calculateTotalIncome = (income: any) => {
    return Number(income.monthlySalary) +
      Number(income.otherIncome?.bonus || 0) / 12 +
      Number(income.otherIncome?.commission || 0) +
      Number(income.otherIncome?.rental || 0) +
      Number(income.otherIncome?.other || 0);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="mt-2 text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 print-section">
      {/* Show Warnings if any */}
      {validationWarnings.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                Important Notices
              </h3>
              <div className="mt-2 text-yellow-700">
                {validationWarnings.map((warning, index) => (
                  <p key={index}>{warning}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Mortgage Eligibility Summary
          </h2>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">

          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-8">
              Your Eligible for:
            </h3>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {formatCurrency(Math.round(eligibilityResult.eligibleAmount))}
                </p>
                <p className="text-sm font-medium text-gray-600">Max Loan Amount</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(eligibilityResult.maxLTV)}%
                </p>
                <p className="text-sm font-medium text-gray-600">Max LTV</p>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {eligibilityResult.maxLoanTenure} <span className="text-xl">Years</span>
                </p>
                <p className="text-sm font-medium text-gray-600">Loan Tenure</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 italic mb-8 text-center">
              *Calculated based on average market standards, with your eligibility subject to variation depending on the bank.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-blue-200">
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-gray-600 mb-2">Current DBR</p>
                <p className="text-2xl font-bold text-gray-900">
                  {eligibilityResult.dbr.toFixed(1)}%
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-gray-600 mb-2">Required Down Payment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(eligibilityResult.requiredDownPayment)}
                </p>
              </div>
            </div>
          </div>

          {/* DBR Warning */}
          {eligibilityResult.stressTestDBR > 49 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800">
                    High Debt Burden
                  </h3>
                  <p className="mt-2 text-red-700">
                    Your debt burden ratio under stress testing exceeds the recommended 49% threshold.
                    Consider reducing your existing liabilities or increasing your income. Contact our advisors for more information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Banks */}
          {/* Recommended Banks */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Best Rate possible:</h3>
              <p className="text-sm text-gray-600">compare and select option to generate personalized mortgage propossal</p>
            </div>

            {eligibilityResult.recommendedBanks.map((bank: RecommendedBank, index: number) => (
              <div key={bank.bank} className="mb-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Primary Info */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                      <h4 className="text-2xl font-bold mb-4">{bank.bank}</h4>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-green-600">
                          {formatCurrency(bank.maxLoanAmount)}
                        </p>
                        <p className="text-gray-600">Max loan amount</p>
                        <p className="mt-2">Tenor: {bank.features.maxTenure} years</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-green-600">{bank.rate.toFixed(2)}%</p>
                        <p className="text-gray-600">
                          fixed for {bank.features.fixedPeriod} years
                        </p>
                        <p className="mt-2">Max LTV: {bank.maxLTV.resident}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-gray-700">Life insurance</p>
                      <p>{bank.fees.insurance.life}%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Property insurance</p>
                      <p>{bank.fees.insurance.property}%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Processing fee</p>
                      <p>{bank.fees.processing.percentage}%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Early settlement</p>
                      <p>{bank.fees.earlySettlement.percentage}%</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Valuation fee</p>
                      <p>{formatCurrency(bank.fees.valuation.fixed)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {/* <div className="flex justify-end items-center space-x-4 mt-4 pt-4 border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-800">
                      View details
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Apply Now
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
        >
          Back to Details
        </button>
        <button
          onClick={() => window.print()}
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 print:hidden"
        >
          Download Summary
        </button>
      </div>
    </div>
  );
};

export default SummaryCalculator;