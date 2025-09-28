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
      alumni: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          first_name: string
          last_name: string
          graduation_year: number
          degree: string
          company: string | null
          position: string | null
          location: string | null
          bio: string | null
          avatar_url: string | null
          industry_id: string | null
          linkedin_url: string | null
          is_active: boolean
          is_admin: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          first_name: string
          last_name: string
          graduation_year: number
          degree: string
          company?: string | null
          position?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          industry_id?: string | null
          linkedin_url?: string | null
          is_active?: boolean
          is_admin?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          first_name?: string
          last_name?: string
          graduation_year?: number
          degree?: string
          company?: string | null
          position?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          industry_id?: string | null
          linkedin_url?: string | null
          is_active?: boolean
          is_admin?: boolean
        }
      }
      industries: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      alumni_skills: {
        Row: {
          id: string
          alumni_id: string
          skill_id: string
          created_at: string
        }
        Insert: {
          id?: string
          alumni_id: string
          skill_id: string
          created_at?: string
        }
        Update: {
          id?: string
          alumni_id?: string
          skill_id?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          event_date: string
          event_time: string
          location: string
          category: string
          status: 'draft' | 'published' | 'cancelled'
          max_capacity: number | null
          registration_fee: number
          image_url: string | null
          organizer_id: string
          created_by: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          event_date: string
          event_time: string
          location: string
          category: string
          status?: 'draft' | 'published' | 'cancelled'
          max_capacity?: number | null
          registration_fee?: number
          image_url?: string | null
          organizer_id: string
          created_by: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          event_date?: string
          event_time?: string
          location?: string
          category?: string
          status?: 'draft' | 'published' | 'cancelled'
          max_capacity?: number | null
          registration_fee?: number
          image_url?: string | null
          organizer_id?: string
          created_by?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          created_at: string
          event_id: string
          alumni_id: string
          status: 'registered' | 'cancelled' | 'attended'
          registration_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          event_id: string
          alumni_id: string
          status?: 'registered' | 'cancelled' | 'attended'
          registration_date?: string
        }
        Update: {
          id?: string
          created_at?: string
          event_id?: string
          alumni_id?: string
          status?: 'registered' | 'cancelled' | 'attended'
          registration_date?: string
        }
      }
      notifications: {
        Row: {
          id: string
          created_at: string
          recipient_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          related_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          recipient_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          related_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          recipient_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          related_id?: string | null
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
      [_ in never]: never
    }
  }
}