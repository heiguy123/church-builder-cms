const { exec } = require('child_process');

// Command to make the script executable
const makeExecutableCommand = 'chmod +x deploy_selected_layout.sh';

// Command to execute the deployment script
const deployCommand = './deploy_selected_layout.sh';

// Execute the commands
exec(makeExecutableCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error making script executable: ${error}`);
    return;
  }

  console.log('Script is now executable.');

  // Execute the deployment script
  exec(deployCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error calling deploying: ${error}`);
      return;
    }

    console.log('Deployment called successfully.');
  });
});
