import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as iam from '@aws-cdk/aws-iam';

export class Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        new NodejsFunction(this, 'listHostedZonesByVPCFunc', {
            entry: 'src/listHostedZonesByVPC.ts',
            projectRoot: '../',
            environment: {
                VPC_ID: this.node.tryGetContext('vpcId'),
                MAX_ITEMS: this.node.tryGetContext('maxItems')
            },
            timeout: cdk.Duration.seconds(15),
            initialPolicy: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    actions: [
                        'lambda:InvokeFunction',
                        'logs:CreateLogGroup',
                        'logs:CreateLogStream',
                        'logs:PutLogEvents',
                        'route53:listHostedZonesByVPC',
                        'ec2:describeVpcs'
                    ]
                })
            ]
        });
    }
}
