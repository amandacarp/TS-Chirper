export interface Chirp {
    id: number, 
    userid: User["id"],
    location: string,
    content: string,
    _created: string
}

export interface User {
    id: number, 
    name: string,
    email: string,
    password: string | null,
    _created: string
}

export interface Mention {
    chirpid: Chirp["id"],
    userid: User["id"]
}

export interface SQLRes {
        fieldCount: number,
        affectedRows: number,
        insertId: number,
        serverStatus: number,
        warningCount: number,
        message: string,
        protocol41: boolean,
        changedRows: number
   
}
