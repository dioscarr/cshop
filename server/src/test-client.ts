// import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
const API_V1 = `${BASE_URL}/api/v1`;

async function testEndpoint(path: string) {
  try {
    console.log(`Testing ${BASE_URL}${path}...`);
    const response = await fetch(`${BASE_URL}${path}`);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
  console.log('-------------------');
}

async function testAdminVerification(code: string) {
  try {
    console.log(`Testing admin verification with code: ${code}...`);
    const response = await fetch(`${API_V1}/admin/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
  console.log('-------------------');
}

async function runTests() {
  console.log('🧪 Running API Tests\n');
  
  await testEndpoint('/');
  await testEndpoint('/health');
  await testEndpoint('/test/ping');
  await testEndpoint('/test/db');
  
  // Test admin verification
  await testAdminVerification('ADMIN123');
  await testAdminVerification('wrong-code');
}

runTests().catch(console.error);
