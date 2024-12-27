import { FormState, BankProduct, EligibilityResult, RecommendedBank } from '../../../types/mortgage-proposal/forms';

export class EligibilityCalculator {
    private static readonly MAX_DBR = 49;
    private static readonly STRESS_RATE = 4.5 + 2;
    private static readonly DEFAULT_TENURE = 25;
    private static readonly MONTHS_PER_YEAR = 12;
    private static readonly PERCENTAGE_DIVISOR = 100;

    private static calculateMonthlyPayment(
        principal: number,
        annualRate: number,
        years: number
    ): number {
        const monthlyRate = annualRate / this.MONTHS_PER_YEAR / this.PERCENTAGE_DIVISOR;
        const numberOfPayments = years * this.MONTHS_PER_YEAR;
        return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    private static calculateMaxLoanAmount(
        monthlyIncome: number,
        currentLiabilities: number,
        interestRate: number,
        tenure: number = this.DEFAULT_TENURE
    ): number {
        const availableDBR = this.MAX_DBR / this.PERCENTAGE_DIVISOR;
        const availableEMI = (monthlyIncome * availableDBR) - currentLiabilities;
        const monthlyRate = interestRate / this.MONTHS_PER_YEAR / this.PERCENTAGE_DIVISOR;
        const numberOfPayments = tenure * this.MONTHS_PER_YEAR;

        return availableEMI * (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;
    }

    
    private static getEmploymentDuration(duration: string): number {
        const durationMap: { [key: string]: number } = {
            'Newly Joined': 0.1,
            'Less than 6 months': 0.5,
            'More than 6 months': 0.7,
            'Less than 1 month': 0.1,
            '1-3 months': 0.25,
            '3-6 months': 0.5,
            '6-12 months': 0.8,
            'More than 1 year': 1.2
        };
        return durationMap[duration] || 1;
    }

    
    private static isBankEligible(
    bank: BankProduct,
    formData: FormState,
    monthlyIncome: number
): boolean {
    console.log(`Checking eligibility for ${bank.bank}:`, {
        monthlyIncome,
        bankMinIncome: bank.minIncome,
        mortgageType: bank.type,
        requiredType: formData.financialRequirement.mortgageType
    });

    // Basic checks
    if (monthlyIncome < 8000) return false;
    
    // All banks should be eligible for initial recommendation
    return true;
}

    private static getBusinessLength(startDate: string): number {
        if (!startDate) return 0;
        const start = new Date(startDate);
        const now = new Date();
        return (now.getFullYear() - start.getFullYear()) + 
               (now.getMonth() - start.getMonth()) / 12;
    }

    public static calculateEligibility(
        formData: FormState,
        bankProducts: BankProduct[]
    ): EligibilityResult {
        const monthlyIncome = Number(formData.income.totalIncome);
        const currentLiabilities = Number(formData.liability.totalLiability);
        const currentDBR = (currentLiabilities / monthlyIncome) * 100;

        // Calculate max LTV based on residency status
        const maxLTV = 
            formData.aboutMe.residencyStatus === 'UAE National' ? 85 :
            formData.aboutMe.residencyStatus === 'UAE Resident' ? 80 : 65;

        const maxLoanAmount = this.calculateMaxLoanAmount(
            monthlyIncome,
            currentLiabilities,
            this.STRESS_RATE,
            this.DEFAULT_TENURE
        );

        // Filter and rank banks
        const recommendedBanks = bankProducts
            .filter(bank => this.isBankEligible(bank, formData, monthlyIncome))
            .map(bank => this.createBankOffer(bank, formData, maxLoanAmount))
            .sort((a, b) => {
                // Primary sort by max loan amount
                if (b.maxLoanAmount !== a.maxLoanAmount) {
                    return b.maxLoanAmount - a.maxLoanAmount;
                }
                // Secondary sort by interest rate
                return a.rate - b.rate;
            })
            .slice(0, 3); // Get top 3 banks

        return {
            eligibleAmount: maxLoanAmount,
            recommendedBanks,
            dbr: currentDBR,
            stressTestDBR: this.calculateStressTestDBR(
                currentLiabilities,
                monthlyIncome,
                maxLoanAmount,
                this.STRESS_RATE
            ),
            requiredDownPayment: maxLoanAmount * (1 - maxLTV/100),
            maxLoanAmount,
            maxLTV,
            maxLoanTenure: this.DEFAULT_TENURE
        };
    }

    
    private static createBankOffer(
        bank: BankProduct,
        formData: FormState,
        maxLoanAmount: number
    ): RecommendedBank {
        // Get rate based on preference
        const isFixed = formData.financialRequirement.ratePreference === 'Fixed';
        const effectiveRate = isFixed ? 
            (bank.rates.fixed.rate || 4.99) : 
            (bank.rates.variable.baseRate + bank.rates.variable.spread);
    
        // Calculate loan amount considering LTV
        const residencyStatus = formData.aboutMe.residencyStatus;
        const propertyValue = formData.propertyDetails.propertyValue;
        const ltv = residencyStatus === 'UAE National' ? 
            bank.ltvRatios.uaeNational.residential : 
            residencyStatus === 'UAE Resident' ? 
                bank.ltvRatios.resident.residential : 
                bank.ltvRatios.nonResident.residential;
    
        const ltvBasedAmount = propertyValue * (ltv / 100);
        const bankMaxLoan = bank.maxLoanAmount || 5000000;
        const finalLoanAmount = Math.min(maxLoanAmount, ltvBasedAmount, bankMaxLoan);
    
        // Calculate monthly EMI
        const emi = this.calculateMonthlyPayment(
            finalLoanAmount,
            effectiveRate,
            bank.maxTenure || this.DEFAULT_TENURE
        );
    
        return {
            bank: bank.bank,
            product: `${formData.financialRequirement.mortgageType} Mortgage`,
            rate: effectiveRate,
            emi,
            maxLoanAmount: finalLoanAmount,
            processingFee: bank.fees.processing.percentage || 1,
            maxLTV: {
                resident: ltv,
                nonResident: bank.ltvRatios.nonResident.residential,
                uaeNational: bank.ltvRatios.uaeNational.residential
            },
            fees: {
                insurance: bank.fees.insurance,
                valuation: { fixed: bank.fees.valuation.fixed },
                processing: {
                    percentage: bank.fees.processing.percentage,
                    minimum: bank.fees.processing.minimum,
                    maximum: bank.fees.processing.maximum
                },
                earlySettlement: {
                    percentage: bank.fees.earlySettlement.percentage,
                    maximum: bank.fees.earlySettlement.maximum
                }
            },
            features: {
                salaryTransfer: bank.features.salaryTransfer,
                fixedPeriod: isFixed ? bank.rates.fixed.period : 0,
                earlySettlementFee: bank.fees.earlySettlement.percentage,
                maxTenure: bank.maxTenure || this.DEFAULT_TENURE,
                topUp: bank.features.topUp,
                balanceTransfer: bank.features.balanceTransfer
            }
        };
    }

    private static calculateStressTestDBR(
        currentLiabilities: number,
        monthlyIncome: number,
        loanAmount: number,
        stressRate: number
    ): number {
        const stressEMI = this.calculateMonthlyPayment(
            loanAmount,
            stressRate,
            this.DEFAULT_TENURE
        );
        return ((currentLiabilities + stressEMI) / monthlyIncome) * 100;
    }
}