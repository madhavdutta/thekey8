import React from 'react';
import MortgageProposal from '../components/mortgage-proposal';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

// Application.tsx
export function Application() {
    const handleNewApplication = () => {
        // Reset all storage
        localStorage.removeItem('mortgageFormState');
        localStorage.removeItem('currentStep');
        // Trigger formContext reset without page reload
        setShowForm(true);
    };

    const [showForm, setShowForm] = React.useState(false);

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Mortgage Applications</h1>
                        <p className="text-muted-foreground mt-2">Track and manage your mortgage applications</p>
                    </div>
                    <Button onClick={handleNewApplication} className="group">
                        <Plus className="mr-2 h-4 w-4" />
                        New Application
                    </Button>
                </div>

                <div className="w-full">
                    {showForm ? (
                        <MortgageProposal />
                    ) : (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium">No applications found</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Start by creating a new application
                            </p>
                            <div className="mt-6">
                                <Button onClick={handleNewApplication}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Application
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

