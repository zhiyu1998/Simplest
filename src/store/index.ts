import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
	state: () => ({
		collapse: false,
		contentHeight: 0,
		dark: true
	}),
	getters: {},
	actions: {},
})
