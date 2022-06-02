import { Identifier } from "typescript";
import { Url } from "url";

export type tweetResponseError = {
    value: number;
    detail: string;
    title: string;
    "resource_type": string;
    parameter: Identifier;
    "resource_id": number;
    type: Url;
}

// Tweet type
export type tweet = {
    id: number;
    text: string;
}