import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 引入高亮样式

import { marked } from 'marked'

const tocObj = {
	clear: function () {
		// 清理先前数据供下次使用
		this.toc = []
		this.index = 0
		this.level = 1
		this.deepLevel = 0
	},
	add: function (text: string, level: number) {
		// 只有每一次level变换为1, 最顶层级才会发生变换
		if (level === 1) {
			this.deepLevel++
		}
		// 使每一次变换level，index能够从1开始
		if (this.level != level) {
			this.index = 0
			this.level = level
		}
		let anchor = `#toc${this.deepLevel}${level}${++this.index}`
		this.toc.push({ anchor, level, label: text })

		return anchor
	},
	toc: [] as any,
	index: 0, // h1、h2、h3...的子项目
	level: 1, // h1、h2、h3...
	deepLevel: 0, // root的个数
}

class MarkUtils {
	private rendererMD: any

	constructor() {
		this.rendererMD = new marked.Renderer() as any
		this.rendererMD.heading = function (text: string, level: number) {
			let anchor = tocObj.add(text, level)
			return `<h${level} id=${anchor}>${text}</h${level}>\n`
		}
		this.rendererMD.table = function (header: any, body: any) {
			return (
				'<table class="table" border="0" cellspacing="0" cellpadding="0">' +
				header +
				body +
				'</table>'
			)
		}
		// highlight.configure({ useBR: true });
		marked.setOptions({
			renderer: this.rendererMD,
			headerIds: false,
			gfm: true,
			// tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false,
			xhtml: false,
			highlight: function (code: string, lang: string) {
				const language = highlight.getLanguage(lang) ? lang : 'plaintext'
				return highlight.highlightAuto(code, [...language]).value
			},
		})
	}

	async marked(data: any) {
		if (data) {
			let content = await marked(data)
			let toc = tocObj.toc
			tocObj.clear()
			return { content: content, toc: toc }
		} else {
			return null
		}
	}
}

const markdown: any = new MarkUtils()

export default markdown
