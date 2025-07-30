const assert = require('assert');
const { spawn } = require('child_process');
const http = require('http');

// Simple test to check if server starts and responds
function testServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['app.js'], {
      env: { ...process.env, PORT: '3002' },
      stdio: 'pipe'
    });

    server.stdout.on('data', (data) => {
      console.log('Server output:', data.toString());
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    // Wait for server to start
    setTimeout(() => {
      const req = http.request({
        hostname: 'localhost',
        port: 3002,
        path: '/health',
        method: 'GET'
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          server.kill();
          try {
            const response = JSON.parse(data);
            assert.strictEqual(res.statusCode, 200);
            assert.strictEqual(response.status, 'healthy');
            console.log('✅ Server test passed');
            resolve();
          } catch (error) {
            reject(new Error('Invalid response: ' + data));
          }
        });
      });

      req.on('error', (error) => {
        server.kill();
        reject(error);
      });

      req.end();
    }, 2000);
  });
}

// Run tests
async function runTests() {
  try {
    console.log('🧪 Starting tests...');
    await testServer();
    console.log('✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = { testServer };
