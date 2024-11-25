import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [emi, setEMI] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [calculating, setCalculating] = useState(false)

  const calculateEMI = () => {
    setCalculating(true)
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const p = parseFloat(loanAmount)
      const r = parseFloat(interestRate) / (12 * 100)
      const n = parseFloat(loanTerm) * 12
      
      const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
      setEMI(emi)
      setCalculating(false)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Mortgage Calculator</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount (AED)</Label>
          {loading ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="transition-all duration-200 focus:scale-[1.01]"
              disabled={calculating}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          {loading ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              className="transition-all duration-200 focus:scale-[1.01]"
              disabled={calculating}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanTerm">Loan Term (Years)</Label>
          {loading ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term"
              className="transition-all duration-200 focus:scale-[1.01]"
              disabled={calculating}
            />
          )}
        </div>

        <Button 
          onClick={calculateEMI} 
          className="w-full"
          loading={calculating}
          disabled={!loanAmount || !interestRate || !loanTerm}
        >
          Calculate Monthly Payment
        </Button>

        {calculating ? (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-8 w-32 mx-auto" />
          </div>
        ) : emi !== null && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg animate-fade-in">
            <p className="text-center">
              <span className="block text-sm text-gray-600">Monthly Payment</span>
              <span className="text-2xl font-bold">
                AED {emi.toLocaleString('en-AE', { maximumFractionDigits: 2 })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
