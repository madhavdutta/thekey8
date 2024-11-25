import React from 'react'
import { Button } from '../../components/ui/button'
import { 
  Search,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  Landmark
} from 'lucide-react'
import { useState } from 'react'

interface FiltersProps {
  onFilterChange: (filters: any) => void
}

export function ApplicationFilters({ onFilterChange }: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <select 
                className="flex-1 border rounded-md p-2"
                onChange={(e) => onFilterChange({ propertyType: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          {/* Bank */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
            <div className="flex items-center space-x-2">
              <Landmark className="h-4 w-4 text-gray-400" />
              <select 
                className="flex-1 border rounded-md p-2"
                onChange={(e) => onFilterChange({ bank: e.target.value })}
              >
                <option value="">All Banks</option>
                <option value="ADCB">ADCB</option>
                <option value="Emirates NBD">Emirates NBD</option>
                <option value="Dubai Islamic Bank">Dubai Islamic Bank</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full border rounded-md p-2"
              onChange={(e) => onFilterChange({ status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="documents_required">Documents Required</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
