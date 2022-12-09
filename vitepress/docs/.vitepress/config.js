import { defineConfig } from 'vitepress'
import { sidebar } from './config-sidebar'

export default defineConfig({
	appearance: 'dark',
	description: 'Metrist product & developer documentation.',
	lastUpdated: true,
	markdown: {
		config: (md) => {
			md.use(require('markdown-it-deflist'))
		}
	},
	themeConfig: {
		editLink: {
      pattern: 'https://github.com/Metrist-Software/product-docs/tree/main/vitepress/docs/:path',
      text: 'Edit this page on GitHub',
		},
		logo: {
      light: '/metrist-logo-light.svg',
      dark: '/metrist-logo-dark.svg'
    },
		footer: {
			// message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Metrist Inc.',
		},
		nav: [
			{ text: 'Guides', link: '/guides/' },
			{ text: 'Monitor Library', link: '/monitors/' },
			{ text: 'API & Tools', link: '/tools/' },
			{ text: 'Web App', link: 'https://app.metrist.io' },
			{ text: 'Help ❔', link: 'mailto:support@metrist.io' }
		],
		sidebar: sidebar,
		siteTitle: '| Docs',
		socialLinks: [
			{ icon: 'twitter', link: '//twitter.com/Metrist_io' },
			{ icon: 'linkedin', link: '//www.linkedin.com/company/metrist/'},
			{ icon: 'github', link: '//github.com/Metrist-Software/orchestrator' },
		],
	},
	title: 'Metrist Docs',
	titleTemplate: 'Metrist Product & Developer Documentation',
})
