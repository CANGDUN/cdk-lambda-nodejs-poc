// VPC に関連付けられた PHZ を一覧表示する
import { Route53 } from 'aws-sdk';

interface FuncResponse {
    statusCode?: number;
    data?: string;
}

const route53 = new Route53();

const params: AWS.Route53.ListHostedZonesByVPCRequest = {
    VPCId: process.env.VPC_ID || '',
    VPCRegion: 'ap-northeast-1',
    MaxItems: process.env.MAX_ITEMS || '100',
    NextToken: undefined
};

const getHostedZones = async () => {
    return await route53.listHostedZonesByVPC(params).promise();
};

const getPrivateHostedZoneList = (
    data: Route53.ListHostedZonesByVPCResponse
): Route53.HostedZoneSummary[] => {
    let phzList: Route53.HostedZoneSummary[] = [];

    for (const item of data.HostedZoneSummaries) {
        if (item.Owner.OwningAccount) {
            phzList = phzList.concat(item);
        }
    }

    return phzList;
};

export async function handler(): Promise<FuncResponse> {
    const response: FuncResponse = {};

    try {
        let data = await getHostedZones();
        console.log(data);

        let queriedData = getPrivateHostedZoneList(data);

        while (data.NextToken) {
            params.NextToken = data.NextToken;
            data = await getHostedZones();
            console.log(data);
            queriedData = queriedData.concat(getPrivateHostedZoneList(data));
        }

        response.statusCode = 200;
        response.data = JSON.stringify(data);
    } catch (error) {
        console.error(error, error.stack);
        response.statusCode = error.statusCode;
        response.data = JSON.stringify(error.stack);
    }

    return response;
}
