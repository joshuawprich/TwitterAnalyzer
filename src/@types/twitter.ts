export = Twitter

declare namespace Twitter {
    type Tweet = {
        id: number;
        text: string;
        sentiment: number;
    }

    type ResError = {
            value: number;
            detail: string;
            title: string;
            "resource_type": string;
            parameter: number;
            "resource_id": number;
            type: string;
        }
}