export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          phone: string | null
          emirates_id: string | null
          nationality: string | null
          monthly_income: number | null
          employment_status: string | null
          company_name: string | null
          employment_duration: number | null
          preferred_language: string
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          phone?: string | null
          emirates_id?: string | null
          nationality?: string | null
          monthly_income?: number | null
          employment_status?: string | null
          company_name?: string | null
          employment_duration?: number | null
          preferred_language?: string
          avatar_url?: string | null
        }
        Update: {
          email?: string
          name?: string
          phone?: string | null
          emirates_id?: string | null
          nationality?: string | null
          monthly_income?: number | null
          employment_status?: string | null
          company_name?: string | null
          employment_duration?: number | null
          preferred_language?: string
          avatar_url?: string | null
        }
      }
      applications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          property_type: string
          location: string
          status: string
          loan_amount: number
          property_value: number
          bank_name: string
          interest_rate: number
          offer_status: string
          documents: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          property_type: string
          location: string
          status?: string
          loan_amount: number
          property_value: number
          bank_name: string
          interest_rate: number
          offer_status?: string
          documents?: Json[]
        }
        Update: {
          property_type?: string
          location?: string
          status?: string
          loan_amount?: number
          property_value?: number
          bank_name?: string
          interest_rate?: number
          offer_status?: string
          documents?: Json[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      employment_status: "Employed" | "Self-Employed" | "Business Owner" | "Retired" | "Other"
      application_status: "draft" | "submitted" | "under_review" | "documents_required" | "approved" | "rejected"
      offer_status: "pending" | "approved" | "rejected"
    }
  }
}
