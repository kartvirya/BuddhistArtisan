// This is a standalone script to kill processes on port 5000 before server startup
// It will try multiple approaches to kill processes to be thorough
const { execSync } = require('child_process');

console.log('PORT KILLER: Starting forceful kill of processes on port 5000...');

try {
  // Try multiple kill approaches to be thorough
  
  // Approach 1: Using npx fkill (most reliable but might not be available)
  try {
    console.log('PORT KILLER: Trying fkill approach...');
    execSync('npx fkill :5000 --force --silent', { stdio: 'inherit' });
  } catch (e) {
    console.log('PORT KILLER: fkill approach failed or didn\'t find processes to kill.');
  }
  
  // Approach 2: Using lsof + kill (Unix/Linux systems)
  try {
    console.log('PORT KILLER: Trying lsof + kill approach...');
    const pids = execSync('lsof -t -i:5000 || echo ""').toString().trim();
    
    if (pids) {
      pids.split('\n').forEach(pid => {
        if (pid) {
          console.log(`PORT KILLER: Killing PID ${pid}`);
          try {
            execSync(`kill -9 ${pid}`);
          } catch (killErr) {
            console.log(`PORT KILLER: Error killing PID ${pid}`);
          }
        }
      });
    } else {
      console.log('PORT KILLER: No processes found by lsof.');
    }
  } catch (e) {
    console.log('PORT KILLER: lsof approach failed.');
  }
  
  // Approach 3: Using pkill (pattern kill - Unix/Linux)
  try {
    console.log('PORT KILLER: Trying pkill approach...');
    execSync("pkill -f '(listen|node).*:5000'");
  } catch (e) {
    console.log('PORT KILLER: pkill approach failed or didn\'t find processes to kill.');
  }
  
  console.log('PORT KILLER: All kill attempts completed.');
  
  // Sleep for a moment to ensure port is released
  console.log('PORT KILLER: Waiting for 3 seconds to ensure port is released...');
  setTimeout(() => {
    console.log('PORT KILLER: Port killing process completed.');
  }, 3000);
  
} catch (error) {
  console.error('PORT KILLER: Error in killing processes:', error.message);
}