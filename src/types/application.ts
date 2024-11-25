export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'documents_required'
  | 'approved'
  | 'rejected'
  | 'processing'

export interface MortgageApplication {
  id: string
  userId: string
  propertyValue: number
  loanAmount: number
  downPayment: number
  term: number
  status: ApplicationStatus
  propertyType: 'apartment' | 'villa' | 'townhouse'
  propertyLocation: string
  documents: ApplicationDocument[]
  notes: string
  created: string
  updated: string
}

export interface ApplicationDocument {
  id: string
  name: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
  required: boolean
  uploaded: boolean
  url?: string
}

export interface ApplicationTimeline {
  status: ApplicationStatus
  date: string
  note?: string
}
