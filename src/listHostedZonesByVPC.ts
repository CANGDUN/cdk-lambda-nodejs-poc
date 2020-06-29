import { Route53 } from 'aws-sdk';

interface FuncResponse{
    statusCode?: number,
    data?: string
}

const route53 = new Route53();

const params: AWS.Route53.ListHostedZonesByVPCRequest = {
    VPCId: 'vpc-xxxxxxxxxxxxxxxxx',
    VPCRegion: 'ap-northeast-1'
};

export async function handler() {
    const response: FuncResponse = {};

    try {
        const data = route53.listHostedZonesByVPC(params).promise();
        console.log(data);
        response.statusCode = 200;
        response.data = JSON.stringify(data);
        
    } catch (error) {
        console.error(error, error.stack);
        response.statusCode =  error.statusCode;
        response.data = JSON.stringify(error.stack);
    }

    return response;
}