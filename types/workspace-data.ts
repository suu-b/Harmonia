interface FinalDataTreeStructure {
    id: string
    name: string
    mimetype: string
    children?: FinalDataTreeStructure[] | null
}