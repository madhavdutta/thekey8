import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { DashboardLayout } from '../components/layouts/DashboardLayout'

import {
  Plus,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Landmark
} from 'lucide-react'
import { ApplicationDetailModal } from '../components/dashboard/ApplicationDetailModal'
import { ApplicationFilters } from '../components/dashboard/ApplicationFilters'
import React from 'react'
import MortgageProposal from '../components/mortgage-proposal'
type ApplicationStatus = 'approved' | 'under_review' | 'documents_required';
interface Application {
  id: string;
  propertyType: string;
  location: string;
  status: ApplicationStatus;
  loanAmount: number;
  propertyValue: number;
  bank: {
    name: string;
    interestRate: number;
    offerStatus: 'approved' | 'pending' | 'rejected';
  };
  created: string;
  documents: Array<{
    id: string;
    name: string;
    status: 'approved' | 'pending' | 'rejected';
  }>;
}
// Mock data
const mockApplications = [
  {
    id: '1',
    propertyType: 'Apartment',
    location: 'Downtown Dubai',
    status: 'under_review',
    loanAmount: 1200000,
    propertyValue: 1500000,
    bank: {
      name: 'ADCB',
      interestRate: 3.99,
      offerStatus: 'approved'
    },
    created: '2024-02-15',
    documents: [
      { id: '1', name: 'Emirates ID', status: 'approved' },
      { id: '2', name: 'Salary Certificate', status: 'pending' }
    ]
  },
  {
    id: '2',
    propertyType: 'Villa',
    location: 'Arabian Ranches',
    status: 'documents_required',
    loanAmount: 1600000,
    propertyValue: 2000000,
    bank: {
      name: 'Emirates NBD',
      interestRate: 4.25,
      offerStatus: 'pending'
    },
    created: '2024-02-10',
    documents: [
      { id: '1', name: 'Emirates ID', status: 'approved' },
      { id: '2', name: 'Bank Statements', status: 'rejected' }
    ]
  },
  {
    id: '3',
    propertyType: 'Townhouse',
    location: 'Dubai Hills',
    status: 'approved',
    loanAmount: 2200000,
    propertyValue: 2800000,
    bank: {
      name: 'Dubai Islamic Bank',
      interestRate: 3.75,
      offerStatus: 'approved'
    },
    created: '2024-02-18',
    documents: [
      { id: '1', name: 'Emirates ID', status: 'approved' },
      { id: '2', name: 'Salary Certificate', status: 'approved' },
      { id: '3', name: 'Bank Statements', status: 'approved' }
    ]
  }
]
interface Props {
  showNewApplication?: boolean;
}

interface Filters {
  search?: string;
  propertyType?: string;
  bank?: string;
  status?: string;
}
export function Dashboard({ showNewApplication = false }: Props) {
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [isCreatingApplication, setIsCreatingApplication] = useState(showNewApplication)
  const [filters, setFilters] = useState<Filters>({})


  const handleCancelApplication = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      setIsCreatingApplication(false)
    }
  }


  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters })
  }

  const filteredApplications = mockApplications.filter(app => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      if (!app.propertyType.toLowerCase().includes(searchTerm) &&
        !app.location.toLowerCase().includes(searchTerm) &&
        !app.bank.name.toLowerCase().includes(searchTerm)) {
        return false
      }
    }
    if (filters.propertyType && app.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) {
      return false
    }
    if (filters.bank && app.bank.name !== filters.bank) {
      return false
    }
    if (filters.status && app.status !== filters.status) {
      return false
    }
    return true
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadgeVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'under_review':
        return 'warning'
      case 'documents_required':
        return 'danger'
      default:
        return 'default'
    }
  }
  const handleStartNewApplication = () => {
    try {
      setIsCreatingApplication(true);
    } catch (error) {
      console.error('Error starting new application:', error);
      // Add error handling UI
    }
  };

  return (

    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mortgage Applications</h1>
            <p className="text-muted-foreground mt-2">Track and manage your mortgage applications</p>
          </div>
          {!isCreatingApplication && (
            <Button onClick={handleStartNewApplication} className="group">
              <Plus className="mr-2 h-4 w-4" />
              New Application
            </Button>
          )}
        </div>

        {isCreatingApplication ? (
          <div className="bg-background rounded-lg border border-border">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold">New Mortgage Application</h2>
              <Button variant="ghost" size="sm" onClick={handleCancelApplication}>
                Cancel
              </Button>
            </div>
            <div>
              <MortgageProposal />
            </div>
          </div>
        ) : (
          <>
            <ApplicationFilters onFilterChange={setFilters} />
            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    onClick={() => setSelectedApplication(application.id)}
                    className="group relative"
                  >
                    {/* Card glow effect */}
                    <div className="absolute -inset-px bg-gradient-primary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />

                    <div className="relative bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold">{application.propertyType}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {application.location}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(application.status)}>
                          {application.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      {/* Financial Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold">{formatCurrency(application.loanAmount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Property Value</p>
                          <p className="font-semibold">{formatCurrency(application.propertyValue)}</p>
                        </div>
                      </div>

                      {/* Bank Details */}
                      <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Landmark className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{application.bank.name}</span>
                          </div>
                          <span className={`font-medium ${application.bank.offerStatus === 'approved'
                            ? 'text-emerald-500 dark:text-emerald-400'
                            : application.bank.offerStatus === 'pending'
                              ? 'text-amber-500 dark:text-amber-400'
                              : 'text-red-500 dark:text-red-400'
                            }`}>
                            {application.bank.offerStatus.charAt(0).toUpperCase() + application.bank.offerStatus.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p className="font-semibold">{application.bank.interestRate}% p.a.</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-border">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(application.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="h-4 w-4 mr-1" />
                          Documents: {application.documents.filter(d => d.status === 'approved').length}/{application.documents.length}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No applications found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or create a new application.
                </p>
                <div className="mt-6">
                  <Button onClick={handleStartNewApplication}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Application
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedApplication && (
          <ApplicationDetailModal
            isOpen={!!selectedApplication}
            onClose={() => setSelectedApplication(null)}
            application={mockApplications.find(app => app.id === selectedApplication)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}