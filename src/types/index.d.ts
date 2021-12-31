export interface BlogDetail {
	id: number
	appreciation: boolean
	commentabled: boolean
	content: string
	createTime: string
	description: string
	picture: string
	flag: string
	published: boolean
	recommend: boolean
	shareStatement: boolean
	title: string
	updateTime: string
	views: number
	userId: number
}

export interface DisplayInfo {
	id: number
	title: string
	picture: string
	updateTime: string
	description: string
	tags: Array<Tag>
	views: number
}

export interface DisplayArch {
	id: number
	title: string
	createTime: string
	description: string
	tags: Array<Tag>
	recommend: number
}

export interface Tag {
	id: number
	name: string
}

export interface TagList {
	[letter: string]: Array<Tag>
}

export interface Message {
	id: string
	nickname: string
	email: string
	content: string
	createTime: string
	adminComment: boolean
	parentCommentId: null
	replyComments: Array<Message>
	likeComment: number
}

export interface Catalogue {
	label: string
	children: Array<Catalogue>
}

export interface Toc {
	anchor: string
	level: number
	label: string
}

export interface TocTree {
	anchor: string
	level: number
	label: string
	children: Array<Toc>
}

export interface SearchValue {
	value: string
	link: string
}

export interface NewBlog {
	id: number
	createTime: string
	title: string
	published: boolean | null
}
