#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkNodejsPocStack } from '../lib/cdk-nodejs-poc-stack';

const app = new cdk.App();
new CdkNodejsPocStack(app, 'CdkNodejsPocStack');
