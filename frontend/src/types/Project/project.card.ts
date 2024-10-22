
export interface ProjectCardDto {
    id: number;
    name: string;
    description?: string,
    members?: {
        id: number,
        firstName: string,
        lastName: string,
        role: string
    }[],
}