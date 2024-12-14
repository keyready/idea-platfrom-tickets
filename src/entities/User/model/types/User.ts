export interface ServerUser {
    id: number;

    username: string;
    password: string;

    firstname: string;
    lastname: string;
}

export type User = Partial<ServerUser>;
