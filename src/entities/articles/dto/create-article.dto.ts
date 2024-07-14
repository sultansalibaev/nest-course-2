
export class CreateArticleDto {
    readonly id?: string
    readonly title: string
    readonly image: string
    readonly views: number
    readonly tag: number[]
    readonly type: number[]
    readonly images?: string
    readonly userId: number
    blocks: ArticleBlock[]
}

export type ArticleBlock = ArticleTitleBlock | ArticleTextBlock | ArticleImageBlock | ArticleQuoteBlock | ArticleCodeBlock | ArticleListBlock

export enum ArticleBlockType {
    TITLE = 'title',
    TEXT = 'text',
    IMAGE = 'image',
    QUOTE = 'quote',
    CODE = 'code',
    LIST = 'list',
}

export enum ArticleTitleType {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
}

export interface ArticleBlockBase {
    type: ArticleBlockType
}

interface ArticleTitleBlock extends ArticleBlockBase {
    type: ArticleBlockType.TITLE
    size: ArticleTitleType
    title: string
}

interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT
    html: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE
    src: string
    subtitle: string
}

interface ArticleQuoteBlock extends ArticleBlockBase {
    type: ArticleBlockType.QUOTE
    html: string
}

interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE
    language: string
    code: string
}

interface ArticleListBlock extends ArticleBlockBase {
    type: ArticleBlockType.LIST
    list: string[]
}