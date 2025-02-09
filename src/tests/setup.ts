import '@testing-library/jest-dom'
import { beforeAll } from 'vitest'
import dotenv from 'dotenv'

beforeAll(() => {
  dotenv.config({ path: '.env.test' })
})
