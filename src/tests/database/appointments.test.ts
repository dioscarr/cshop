import { supabase, clearTable } from './utils'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Appointments Table', () => {
  beforeEach(async () => {
    await clearTable('appointments')
  })

  it('should create an appointment', async () => {
    const testAppointment = {
      user_id: 'test-user-id',
      barber_id: 'test-barber-id',
      service_id: 'test-service-id',
      appointment_datetime: new Date().toISOString(),
      status: 'pending',
      payment_status: 'unpaid'
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert(testAppointment)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(testAppointment)
  })

  // Additional test cases...
})
