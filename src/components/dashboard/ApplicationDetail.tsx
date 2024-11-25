import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X, Download } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { ApplicationTimeline } from './ApplicationTimeline'
import { formatCurrency } from '../../lib/utils'

interface ApplicationDetailProps {
  application: any
  isOpen: boolean
  onClose: () => void
}

export function ApplicationDetail({ application, isOpen, onClose }: ApplicationDetailProps) {
  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  // Mock timeline events
  const timelineEvents = [
    {
      id: '1',
      status: 'submitted',
      date: application.created,
      note: 'Application submitted successfully',
      actor: 'System'
    },
    {
      id: '2',
      status: 'under_review',
      date: application.created,
      note: 'Application is being reviewed by our team',
      actor: 'John Smith'
    },
    {
      id: '3',
      status: application.status,
      date: new Date().toISOString(),
      note: 'Current status',
      actor: 'System'
    }
  ]

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900 mb-6">
                      Mortgage Application Details
                    </Dialog.Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Property Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-4">Property Details</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500">Property Type</p>
                              <p className="font-medium">{application.propertyType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{application.location}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Property Value</p>
                              <p className="font-medium">{formatCurrency(application.propertyValue)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Financial Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-4">Financial Details</h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500">Loan Amount</p>
                              <p className="font-medium">{formatCurrency(application.loanAmount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Bank</p>
                              <p className="font-medium">{application.bank.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Interest Rate</p>
                              <p className="font-medium">{application.bank.interestRate}% p.a.</p>
                            </div>
                          </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-4">Documents</h4>
                          <div className="space-y-3">
                            {application.documents.map((doc: any) => (
                              <div key={doc.id} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{doc.name || 'Document'}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge className={getDocumentStatusColor(doc.status)}>
                                    {doc.status}
                                  </Badge>
                                  {doc.url && (
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Status and Timeline */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-4">Application Timeline</h4>
                          <ApplicationTimeline events={timelineEvents} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                      <Button variant="outline" onClick={onClose}>
                        Close
                      </Button>
                      <Button>
                        Update Application
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
