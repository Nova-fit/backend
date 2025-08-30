export type ProfileType = {
    id: number
    userId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    birthDate: string,
    gender: string,
    address: string
}

export type IProfileInsert = Omit<ProfileType, 'id'>;