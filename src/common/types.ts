export interface Chirp {
    id: number, 
    userid: User["id"],
    location: string,
    content: string,
    _created: string,
    name: User['name']
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

export interface IPayload {
    userid?: number,
    email?: string
}

export interface IProfileInfo {
	id?: number,
	name?: string,
	email?: string,
	_created?: Date
}

export interface IProfileChirps {
	id?: number,
	location?: string,
	content?: string,
	userid?: User['id'],
	_created?: Date
}
