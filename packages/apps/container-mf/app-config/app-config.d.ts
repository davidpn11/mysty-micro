// AUTO GENERATED CODE
// Run app-config with 'generate' command to regenerate this file

import '@app-config/main';

export interface Config {
  core: Core;
}

export interface Core {
  constants: Constants;
}

export interface Constants {
  aws_key: number;
  env_name: string;
}

// augment the default export from app-config
declare module '@app-config/main' {
  export interface ExportedConfig extends Config {}
}
