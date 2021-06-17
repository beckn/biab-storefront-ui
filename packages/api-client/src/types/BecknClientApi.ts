export interface BecknContext{
    domain: string,
    country: string,
    city: string,
    action: string,
    // eslint-disable-next-line camelcase
    core_version: string
}

export enum AckStatusType {
    ACK = 'ACK',
    NACK = 'NACK'
}

export interface Ack{
    status: AckStatusType
}

export interface AckMessage {
    ack: Ack
}

export interface Error {
    code: string,
    message: string
}
export interface AckResponse {
    message: AckMessage
    error: Error
}

