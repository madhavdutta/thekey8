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
          preferred_language: string
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
          about_me: Json
          financial_requirement: Json
          employment: Json
          income: Json
          liability: Json
          property_details: Json
          application_status: string
          offer_status: string
          documents: Json
          updated_at: string
          userId: string
        }
        Insert: {
          id?: string
          created_at?: string
          about_me: Json
          financial_requirement: Json
          employment: Json
          income: Json
          liability: Json
          property_details: Json
          application_status?: string
          offer_status?: string
          documents?: Json
          updated_at?: string
          userId: string
        }
        Update: {
          about_me?: Json
          financial_requirement?: Json
          employment?: Json
          income?: Json
          liability?: Json
          property_details?: Json
          application_status?: string
          offer_status?: string
          documents?: Json
          updated_at?: string
          userId: string
        }
      }
      bankPoliciesData: {
        Row: {
          id: string
          created_at: string
          bankName: string
          policyKeyName: string
          policyKeyValue: string
        }
        Insert: {
          id?: string
          bankName: string
          policyKeyName: string
          policyKeyValue: string
        }
        Update: {
          bankName?: string
          policyKeyName?: string
          policyKeyValue?: string
        }
      }
      eiborData: {
        Row: {
          eiborPeriod: string
          eiborRates: number
          gov: string
        }
        Insert: {
          eiborPeriod: string
          eiborRates: number
          gov: string
        }
        Update: {
          eiborPeriod?: string
          eiborRates?: number
          gov?: string
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
