import { supabase, clearTable } from './utils'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Barbers Table', () => {
  beforeEach(async () => {
    await clearTable('barbers')
  })

  it('should create a barber', async () => {
    const testBarber = {
      name: 'Test Barber',
      description: 'Test Description',
      expertise: ['Test Cut'],
      rating: 5.0,
      reviews: 1
    }

    const { data, error } = await supabase
      .from('barbers')
      .insert(testBarber)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(testBarber)
  })

  it('should read a barber', async () => {
    // Test implementation
  })

  it('should update a barber', async () => {
    // Test implementation
  })

  it('should delete a barber', async () => {
    // Test implementation
  })
})
