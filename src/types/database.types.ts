export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          bank_name: string
          created_at: string
          documents: Json | null
          id: string
          interest_rate: number
          loan_amount: number
          location: string
          offer_status: Database["public"]["Enums"]["offer_status"] | null
          property_type: string
          property_value: number
          status: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Insert: {
          bank_name: string
          created_at?: string
          documents?: Json | null
          id?: string
          interest_rate: number
          loan_amount: number
          location: string
          offer_status?: Database["public"]["Enums"]["offer_status"] | null
          property_type: string
          property_value: number
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id: string
        }
        Update: {
          bank_name?: string
          created_at?: string
          documents?: Json | null
          id?: string
          interest_rate?: number
          loan_amount?: number
          location?: string
          offer_status?: Database["public"]["Enums"]["offer_status"] | null
          property_type?: string
          property_value?: number
          status?: Database["public"]["Enums"]["application_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bankdata: {
        Row: {
          approved_developers: string | null
          approved_properties: string | null
          audited_accounts_required: boolean | null
          bank_name: string | null
          commercial_ltv: number | null
          consider_bonuses: boolean | null
          consider_bonuses_value: number | null
          consider_rental_income: boolean | null
          consider_rental_income_value: number | null
          consider_variable_pay_commission: boolean | null
          consider_variable_pay_commission_value: number | null
          early_settlement_fee: number | null
          eibor_period: number | null
          emirates: string | null
          fee_finance: boolean | null
          fixed_period: number | null
          fixed_rate: number | null
          floor_rate: number | null
          following_rate: number | null
          government_fees: number | null
          id: number
          industry_margin: number | null
          is_bank_friendly_for_self_employed: boolean | null
          is_self_employed: boolean | null
          joint_borrower: boolean | null
          life_insurance: number | null
          max_age: number | null
          max_ltv_with_audit_accountant: number | null
          max_ltv_without_audit_accountant: number | null
          maximum_dbr: number | null
          maximum_loan: number | null
          maximum_tenure: number | null
          min_age: number | null
          minimum_company_length: number | null
          minimum_income: number | null
          minimum_length_of_business: number | null
          minimum_length_of_service: number | null
          minimum_loan: number | null
          minimum_tenure: number | null
          minimum_turnover_year: number | null
          mortgage_registration_fee: number | null
          non_resident_ltv: number | null
          non_resident_options: string | null
          non_salary_transfer: boolean | null
          partial_settlement_fee: number | null
          pre_approval_fee: number | null
          premier_customer_benefits: string | null
          processing_fee: number | null
          product_type: string | null
          property_insurance: number | null
          ready_property_ltv: number | null
          real_estate_agent_fees: number | null
          required_documents: string | null
          resident_ltv: number | null
          restricted_industries: string | null
          restricted_nationalities: string | null
          restricted_properties: string | null
          salary_transfer_required: boolean | null
          second_property_ltv: number | null
          stress_rate: number | null
          transaction_type: string | null
          trustee_fee: number | null
          uae_national_benefits: string | null
          uae_national_ltv: number | null
          under_construction_ltv: number | null
          valuation_fee: number | null
          variable_rate: number | null
        }
        Insert: {
          approved_developers?: string | null
          approved_properties?: string | null
          audited_accounts_required?: boolean | null
          bank_name?: string | null
          commercial_ltv?: number | null
          consider_bonuses?: boolean | null
          consider_bonuses_value?: number | null
          consider_rental_income?: boolean | null
          consider_rental_income_value?: number | null
          consider_variable_pay_commission?: boolean | null
          consider_variable_pay_commission_value?: number | null
          early_settlement_fee?: number | null
          eibor_period?: number | null
          emirates?: string | null
          fee_finance?: boolean | null
          fixed_period?: number | null
          fixed_rate?: number | null
          floor_rate?: number | null
          following_rate?: number | null
          government_fees?: number | null
          id?: number
          industry_margin?: number | null
          is_bank_friendly_for_self_employed?: boolean | null
          is_self_employed?: boolean | null
          joint_borrower?: boolean | null
          life_insurance?: number | null
          max_age?: number | null
          max_ltv_with_audit_accountant?: number | null
          max_ltv_without_audit_accountant?: number | null
          maximum_dbr?: number | null
          maximum_loan?: number | null
          maximum_tenure?: number | null
          min_age?: number | null
          minimum_company_length?: number | null
          minimum_income?: number | null
          minimum_length_of_business?: number | null
          minimum_length_of_service?: number | null
          minimum_loan?: number | null
          minimum_tenure?: number | null
          minimum_turnover_year?: number | null
          mortgage_registration_fee?: number | null
          non_resident_ltv?: number | null
          non_resident_options?: string | null
          non_salary_transfer?: boolean | null
          partial_settlement_fee?: number | null
          pre_approval_fee?: number | null
          premier_customer_benefits?: string | null
          processing_fee?: number | null
          product_type?: string | null
          property_insurance?: number | null
          ready_property_ltv?: number | null
          real_estate_agent_fees?: number | null
          required_documents?: string | null
          resident_ltv?: number | null
          restricted_industries?: string | null
          restricted_nationalities?: string | null
          restricted_properties?: string | null
          salary_transfer_required?: boolean | null
          second_property_ltv?: number | null
          stress_rate?: number | null
          transaction_type?: string | null
          trustee_fee?: number | null
          uae_national_benefits?: string | null
          uae_national_ltv?: number | null
          under_construction_ltv?: number | null
          valuation_fee?: number | null
          variable_rate?: number | null
        }
        Update: {
          approved_developers?: string | null
          approved_properties?: string | null
          audited_accounts_required?: boolean | null
          bank_name?: string | null
          commercial_ltv?: number | null
          consider_bonuses?: boolean | null
          consider_bonuses_value?: number | null
          consider_rental_income?: boolean | null
          consider_rental_income_value?: number | null
          consider_variable_pay_commission?: boolean | null
          consider_variable_pay_commission_value?: number | null
          early_settlement_fee?: number | null
          eibor_period?: number | null
          emirates?: string | null
          fee_finance?: boolean | null
          fixed_period?: number | null
          fixed_rate?: number | null
          floor_rate?: number | null
          following_rate?: number | null
          government_fees?: number | null
          id?: number
          industry_margin?: number | null
          is_bank_friendly_for_self_employed?: boolean | null
          is_self_employed?: boolean | null
          joint_borrower?: boolean | null
          life_insurance?: number | null
          max_age?: number | null
          max_ltv_with_audit_accountant?: number | null
          max_ltv_without_audit_accountant?: number | null
          maximum_dbr?: number | null
          maximum_loan?: number | null
          maximum_tenure?: number | null
          min_age?: number | null
          minimum_company_length?: number | null
          minimum_income?: number | null
          minimum_length_of_business?: number | null
          minimum_length_of_service?: number | null
          minimum_loan?: number | null
          minimum_tenure?: number | null
          minimum_turnover_year?: number | null
          mortgage_registration_fee?: number | null
          non_resident_ltv?: number | null
          non_resident_options?: string | null
          non_salary_transfer?: boolean | null
          partial_settlement_fee?: number | null
          pre_approval_fee?: number | null
          premier_customer_benefits?: string | null
          processing_fee?: number | null
          product_type?: string | null
          property_insurance?: number | null
          ready_property_ltv?: number | null
          real_estate_agent_fees?: number | null
          required_documents?: string | null
          resident_ltv?: number | null
          restricted_industries?: string | null
          restricted_nationalities?: string | null
          restricted_properties?: string | null
          salary_transfer_required?: boolean | null
          second_property_ltv?: number | null
          stress_rate?: number | null
          transaction_type?: string | null
          trustee_fee?: number | null
          uae_national_benefits?: string | null
          uae_national_ltv?: number | null
          under_construction_ltv?: number | null
          valuation_fee?: number | null
          variable_rate?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string
          emirates_id: string | null
          employment_duration: number | null
          employment_status:
            | Database["public"]["Enums"]["employment_status"]
            | null
          id: string
          monthly_income: number | null
          name: string
          nationality: string | null
          phone: string | null
          preferred_language: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          emirates_id?: string | null
          employment_duration?: number | null
          employment_status?:
            | Database["public"]["Enums"]["employment_status"]
            | null
          id: string
          monthly_income?: number | null
          name: string
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          emirates_id?: string | null
          employment_duration?: number | null
          employment_status?:
            | Database["public"]["Enums"]["employment_status"]
            | null
          id?: string
          monthly_income?: number | null
          name?: string
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "documents_required"
        | "approved"
        | "rejected"
      employment_status:
        | "Employed"
        | "Self-Employed"
        | "Business Owner"
        | "Retired"
        | "Other"
      offer_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
