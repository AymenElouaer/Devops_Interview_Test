import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fs from 'fs-extra';
import { z } from 'zod';
import childProcess from 'child_process';

export const createEnvironmentAction = () => {
  return createTemplateAction({
    id: 'acme:create-environment',
    schema: {
      input: z.object({
        environmentName: z.string(),
        scenario: z.string(),
        containerImage: z.string(),
      }),
    },
    async handler(ctx) {
      const { environmentName, scenario, containerImage } = ctx.input;

      try {
        // Clone the core repository
        const clonePath = '/path/to/clone/repo'; // Replace with the link to the core repository
        childProcess.execSync(`git clone https://github.com/user/repo.git ${clonePath}`);

        // Create a new branch with a name based on environment, scenario, and current timestamp
        const branchName = `${environmentName}_${scenario}_${Date.now()}`;
        childProcess.execSync(`git -C ${clonePath} checkout -b ${branchName}`);

        // Make necessary changes to configuration files using input data
        const configFilePath = `${clonePath}/path/to/config.yaml`; // Replace with the file path
        const configFileContents = fs.readFileSync(configFilePath, 'utf-8');
        // Modify configFileContents based on input data

        fs.writeFileSync(configFilePath, configFileContents);

        // Commit changes
        childProcess.execSync(`git -C ${clonePath} add .`);
        childProcess.execSync(`git -C ${clonePath} commit -m "Update configuration"`);

        // Push the branch
        childProcess.execSync(`git -C ${clonePath} push origin ${branchName}`);

        // Create a pull request
        const prLink = `https://github.com/user/repo/pull/1`; // Replace with the PR link

        // Respond to the frontend with success status
        ctx.output('status', 'success');
        ctx.output('prLink', prLink);
      } catch (error) {
        // Handle errors and respond with failure status
        ctx.output('status', 'failure');
      }
    },
  });
};
