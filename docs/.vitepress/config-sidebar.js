export const sidebar = {
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
				{ text: 'Guided Installation', link: '/guides/orchestrator-installation'},
				{ text: 'Other Installation Options', link: '/guides/orchestrator-installation-alternatives'},
				{ text: 'Environment Variables', link: '/guides/orchestrator-environment-variables'},
			]
		},
		{
			text: 'General',
			collapsible: true,
			items: [
				{ text: 'Terminology', link: '/guides/download-overview'},
				{ text: 'How We Sign Code', link: '/guides/how-we-sign-code'},
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
}
