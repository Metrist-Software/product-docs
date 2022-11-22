import { defineConfig } from 'vitepress'

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
		// editLink: {
		// 	pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub',
		// },
		logo: '/metrist-logo.svg',
		footer: {
			// message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Metrist Inc.',
		},
		nav: [
			{ text: 'Guides', link: '/guides/' },
			{ text: 'Monitor Library', link: '/monitors/' },
			{ text: 'API & Tools', link: '/tools/' },
			// { text: 'Starters', link: '/' },
		],
		sidebar: {
			'/guides/': [
				{
					text: 'Apps',
					collapsible: true,
					items: [
						{ text: 'Chat Apps', link: '/guides/chat-apps'},
						{ text: 'Slack Setup', link: '/guides/slack'},
						{ text: 'Web App', link: '/guides/web-app'},
						{ text: 'Invite Your Team', link: '/guides/web-app-invites'},
						{ text: 'Add Service Monitors', link: '/guides/web-app-monitors'},
						{ text: 'Configure Notifications', link: '/guides/web-app-notifications'},
						{ text: 'Configure Thresholds', link: '/guides/web-app-thresholds'},
					]
				},
				{
					text: 'Orchestrator',
					collapsible: true,
					items: [
						{ text: 'Orchestrator Installation', link: '/guides/orchestrator-installation'},
					]
				},
				{
					text: 'General',
					collapsible: true,
					items: [
						{ text: 'Terminology', link: '/guides/download-overview'},
					]
				},
			],
			'/monitors/': [
				{
					text: 'Monitor Library',
					collapsible: true,
					items: [
						{ text: 'Shared', link: '/monitors/shared/'},
						// { text: 'Build Your Own', link: '/monitors/shared'},
					]
				}
			],
			'/tools/': [
				{
					text: 'API',
					collapsible: true,
					items: [
						{ text: 'API Spec', link: '/tools/api'},
					]
				},
				{
					text: 'In-Process Agent',
					collapsible: true,
					items: [
						{ text: 'PHP', link: '/tools/agent-php-in-process'},
						{ text: 'Ruby', link: '/tools/agent-ruby-in-process'},
					]
				},
				{
					text: 'Plugins',
					collapsible: true,
					items: [
						{ text: 'eBPF Plugin', link: '/tools/orchestrator-ebpf-plugin' },
					]
				},
				{
					text: 'Source',
					collapsible: true,
					items: [
						{ text: 'Orchestrator Source Code', link: '/tools/orchestrator-source-code' }
					]
				}
			],
		},
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
