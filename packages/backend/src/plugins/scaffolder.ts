import { CatalogClient } from '@backstage/catalog-client';
import { createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import { createEnvironmentAction } from './scaffolder/actions/create-environment';
import { ScmIntegrations } from '@backstage/integration';


export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  const integrations = ScmIntegrations.fromConfig(env.config);

  const builtInActions = createBuiltinActions({
    integrations,
    catalogClient,
    config: env.config,
    reader: env.reader,
  });
  // register the new action (createEnvironmentAction)
  const actions = [...builtInActions, createEnvironmentAction()];

  return await createRouter({
    actions,
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient,
    identity: env.identity,
    permissions: env.permissions,
  });
}
