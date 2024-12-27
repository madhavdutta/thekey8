export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', { 
        style: 'currency', 
        currency: 'AED', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    }).format(value);
};
