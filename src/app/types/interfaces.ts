interface Tech {
    src: string,
}

export interface Project {
    id: number
    title: string,
    overview: string,
}

export interface Data {
    tech: Tech[],
    link: string,
    _id: string,
    imageUrl: string,
    myProjects: Project[]
}