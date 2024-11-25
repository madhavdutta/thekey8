import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X, Download } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { ApplicationTimeline, TimelineEvent } from './ApplicationTimeline'

interface ApplicationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export function ApplicationDetailModal({ isOpen, onClose, application }: ApplicationDetailModalProps) {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      status: 'submitted',
      date: application.created,
      note: 'Application submitted successfully',
      actor: 'System'
    },
    {
      id: '2',
      status: application.status,
      date: new Date().toISOString(),
      note: 'Current status',
      actor: 'System'
    }
  ]

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-card border border-border shadow-xl transition-all p-6">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-background transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                <Dialog.Title as="h3" className="text-2xl font-semibold mb-6">
                  Application Details
                </Dialog.Title>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Property Details */}
                    <div className="bg-background/90 dark:bg-background/40 rounded-lg p-4">
                      <h4 className="font-medium mb-4">Property Information</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{application.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{application.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Value</p>
                          <p className="font-medium">
                            {new Intl.NumberFormat('en-AE', {
                              style: 'currency',
                              currency: 'AED',
                              minimumFractionDigits: 0
                            }).format(application.propertyValue)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className="bg-background/90 dark:bg-background/40 rounded-lg p-4">
                    <h4 className="font-medium mb-4">Bank Information</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Bank</p>
                          <p className="font-medium">{application.bank.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Interest Rate</p>
                          <p className="font-medium">{application.bank.interestRate}% p.a.</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Offer Status</p>
                          <Badge
                            variant={
                              application.bank.offerStatus === 'approved'
                                ? 'success'
                                : application.bank.offerStatus === 'pending'
                                ? 'warning'
                                : 'danger'
                            }
                          >
                            {application.bank.offerStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-background/90 dark:bg-background/40 rounded-lg p-4">
                    <h4 className="font-medium mb-4">Documents</h4>
                      <div className="space-y-3">
                        {application.documents.map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between">
                            <span className="text-sm">Document {doc.id}</span>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  doc.status === 'approved'
                                    ? 'success'
                                    : doc.status === 'pending'
                                    ? 'warning'
                                    : 'danger'
                                }
                              >
                                {doc.status}
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Status Timeline */}
                    <div className="bg-background/90 dark:bg-background/40 rounded-lg p-4">
                      <h4 className="font-medium mb-4">Application Timeline</h4>
                      <ApplicationTimeline events={timelineEvents} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button>
                    Update Application
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
