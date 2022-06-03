// import { Identifier } from "typescript";
// import { Url } from "url";

// export type tweetResponseError = {
//     value: number;
//     detail: string;
//     title: string;
//     "resource_type": string;
//     parameter: Identifier;
//     "resource_id": number;
//     type: Url;
// }

// Tweet type
// type tweet = {
//     id: number;
//     text: string;
// }

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

//export = Twitter

// declare class Twitter {

// }

// declare namespace Twitter {
//     type Tweet = {
//         id: number;
//         text: string;
//     }
// }