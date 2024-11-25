import { MortgageApplication } from '../../types/application'
import { Badge } from '../../components/ui/badge'
import { formatCurrency } from '../../lib/utils'
import { Calendar, FileText, MapPin } from 'lucide-react'
import React from 'react'

interface ApplicationCardProps {
  application: MortgageApplication
  onClick: (id: string) => void
}

const statusColors = {
  draft: 'bg-gray-500',
  submitted: 'bg-blue-500',
  under_review: 'bg-yellow-500',
  documents_required: 'bg-orange-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
  processing: 'bg-purple-500',
}

const statusLabels = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  documents_required: 'Documents Required',
  approved: 'Approved',
  rejected: 'Rejected',
  processing: 'Processing',
}

export function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onClick(application.id)}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              {application.propertyType.charAt(0).toUpperCase() + application.propertyType.slice(1)}
            </h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {application.propertyLocation}
            </p>
          </div>
          <Badge className={`${statusColors[application.status]} text-white`}>
            {statusLabels[application.status]}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Loan Amount</p>
            <p className="font-semibold">{formatCurrency(application.loanAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Property Value</p>
            <p className="font-semibold">{formatCurrency(application.propertyValue)}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(application.created).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FileText className="w-4 h-4 mr-1" />
            {application.documents.filter(d => d.uploaded).length}/{application.documents.length} Documents
          </div>
        </div>
      </div>
    </div>
  )
}
