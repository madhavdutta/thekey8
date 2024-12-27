// utils/readExcel.ts
import { read, utils } from 'xlsx';
import { BankProduct } from '../types';

export const loadBankMatrix = async () => {
    try {
        const response = await fetch('/src/assets/bank.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = utils.sheet_to_json(worksheet);
        console.log('Loaded Excel Data:', jsonData);
        
        return {
            Banks: jsonData
        };
    } catch (error) {
        console.error('Error loading bank matrix:', error);
        return { Banks: [] };
    }
};