// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';
import starlightThemeNext from 'starlight-theme-next'
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid'

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            plugins: [starlightThemeNext(), starlightClientMermaid()],
            favicon: '/favicon.ico',
            title: 'Stratal',
            description: 'Stratal is a type-safe, modular framework purpose-built for Cloudflare Workers. Build scalable edge applications with dependency injection, automatic OpenAPI docs, and first-class support for Workers primitives.',
            editLink: { baseUrl: 'https://github.com/strataljs/stratal' },
            logo: { src: './src/assets/logo.webp', alt: 'Stratal Logo' },
            tagline: 'A modular Cloudflare Workers framework with automatic OpenAPI documentation, dependency injection, queue consumers, cron jobs, and type-safe configuration.',
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/strataljs/stratal' },
                { icon: 'open-book', label: 'API Reference', href: 'https://api-reference.stratal.dev' },
            ],
            customCss: ['./src/styles/custom.css'],
            sidebar: [
                {
                    label: 'Introduction',
                    items: [
                        { label: 'Why Stratal', slug: 'why-stratal' },
                    ],
                },
                {
                    label: 'Getting Started',
                    items: [
                        { label: 'Installation', slug: 'getting-started/installation' },
                        { label: 'Your First Worker', slug: 'getting-started/your-first-worker' },
                        { label: 'Project Structure', slug: 'getting-started/project-structure' },
                    ],
                },
                {
                    label: 'OpenAPI Documentation',
                    items: [
                        { label: 'Overview', slug: 'openapi/overview' },
                        { label: 'Setup', slug: 'openapi/setup' },
                        { label: 'Route Conventions', slug: 'openapi/route-conventions' },
                        { label: 'Schemas and Validation', slug: 'openapi/schemas-and-validation' },
                        { label: 'Tags and Security', slug: 'openapi/tags-and-security' },
                        { label: 'Hiding Routes', slug: 'openapi/hiding-routes' },
                        { label: 'Scalar UI', slug: 'openapi/scalar-ui' },
                    ],
                },
                {
                    label: 'Core Concepts',
                    items: [
                        { label: 'Modules', slug: 'core-concepts/modules' },
                        { label: 'Controllers and Routing', slug: 'core-concepts/controllers-and-routing' },
                        { label: 'Dependency Injection', slug: 'core-concepts/dependency-injection' },
                        { label: 'Providers', slug: 'core-concepts/providers' },
                        { label: 'Lifecycle Hooks', slug: 'core-concepts/lifecycle-hooks' },
                        { label: 'Configuration', slug: 'core-concepts/configuration' },
                    ],
                },
                {
                    label: 'Guides',
                    items: [
                        { label: 'Validation', slug: 'guides/validation' },
                        { label: 'Guards', slug: 'guides/guards' },
                        { label: 'Middleware', slug: 'guides/middleware' },
                        { label: 'Error Handling', slug: 'guides/error-handling' },
                        { label: 'Environment Typing', slug: 'guides/environment-typing' },
                    ],
                },
                {
                    label: 'Integrations',
                    items: [
                        { label: 'Queues', slug: 'integrations/queues' },
                        { label: 'Cron Jobs', slug: 'integrations/cron-jobs' },
                        { label: 'Caching', slug: 'integrations/caching' },
                        { label: 'Storage', slug: 'integrations/storage' },
                        { label: 'Email', slug: 'integrations/email' },
                        { label: 'Internationalization', slug: 'integrations/i18n' },
                        { label: 'Logging', slug: 'integrations/logging' },
                    ],
                },
                {
                    label: 'Testing',
                    items: [
                        { label: 'Overview', slug: 'testing/overview' },
                        { label: 'Testing Module', slug: 'testing/testing-module' },
                        { label: 'HTTP Testing', slug: 'testing/http-testing' },
                        { label: 'Mocks and Fakes', slug: 'testing/mocks-and-fakes' },
                    ],
                },
                {
                    label: 'API Reference',
                    attrs: { target: '_blank' },
                    link: 'https://api-reference.stratal.dev',
                },
            ],
        }),
    ],

    adapter: cloudflare(),

});
