import { supabase, clearTable } from './utils'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Services Table', () => {
  beforeEach(async () => {
    await clearTable('services')
  })

  it('should create a service', async () => {
    const testService = {
      name: 'Test Service',
      description: 'Test Description',
      price: 30.00,
      duration: 30
    }

    const { data, error } = await supabase
      .from('services')
      .insert(testService)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toMatchObject(testService)
  })

  it('should read a service', async () => {
    // Test implementation
  })

  it('should update a service', async () => {
    // Test implementation
  })

  it('should delete a service', async () => {
    // Test implementation
  })
})
