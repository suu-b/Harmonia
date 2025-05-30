export interface FinalDataTreeStructure {
    id: string
    name: string
    mimeType: string
    createdTime: string
    modifiedTime: string
    description?: string | null
    children?: FinalDataTreeStructure[] | null
}