import React from 'react'

import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  Search 
} from 'lucide-react'

export interface TimelineEvent {
  id: string
  status: string
  date: string
  note?: string
  actor?: string
}

interface TimelineProps {
  events: TimelineEvent[]
}

export function ApplicationTimeline({ events }: TimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'submitted':
        return <Send className="h-5 w-5 text-blue-500" />
      case 'under_review':
        return <Search className="h-5 w-5 text-yellow-500" />
      case 'documents_required':
        return <FileText className="h-5 w-5 text-orange-500" />
      default:
        return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center ring-8 ring-white">
                    {getStatusIcon(event.status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    {event.note && (
                      <p className="mt-0.5 text-sm text-gray-500">{event.note}</p>
                    )}
                    {event.actor && (
                      <p className="mt-0.5 text-xs text-gray-400">By {event.actor}</p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
