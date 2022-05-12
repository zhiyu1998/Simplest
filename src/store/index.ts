import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
	state: () => ({
		collapse: false,
		contentHeight: 0,
		dark: false
	}),
	getters: {},
	actions: {},
})
