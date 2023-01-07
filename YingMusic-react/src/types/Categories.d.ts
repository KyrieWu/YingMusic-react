interface Categories {
    all: object,
    categories: object,
    code: number,
    sub: CategorieInfo[]
}

interface CategorieInfo {
    activity: boolean,
    category: number,
    hot: boolean,
    imgId: number,
    imgUrl: string,
    name: string,
    resourceCount: number,
    resourceType: number,
    type: number,
}
