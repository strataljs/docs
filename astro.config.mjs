// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';
import starlightThemeNext from 'starlight-theme-next'
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid'

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://stratal.dev',

  integrations: [starlight({
      plugins: [starlightThemeNext(), starlightClientMermaid()],
      components: {
        Hero: './src/components/landing/HeroOverride.astro',
      },
      favicon: '/favicon.ico',
      title: 'Stratal',
      description: 'Stratal is a type-safe, modular framework purpose-built for Cloudflare Workers. Build scalable edge applications with dependency injection, automatic OpenAPI docs, and first-class support for Workers primitives.',
      editLink: { baseUrl: 'https://github.com/strataljs/docs/edit/main/' },
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
                  { label: 'Incremental Adoption', slug: 'getting-started/incremental-adoption' },
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
                  { label: 'Events', slug: 'core-concepts/events' },
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
                  { label: 'Durable Objects', slug: 'integrations/durable-objects' },
                  { label: 'Service Bindings', slug: 'integrations/service-bindings' },
                  { label: 'Workflows', slug: 'integrations/workflows' },
              ],
          },
          {
              label: 'Testing',
              items: [
                  { label: 'Overview', slug: 'testing/overview' },
                  { label: 'Testing Module', slug: 'testing/testing-module' },
                  { label: 'HTTP Testing', slug: 'testing/http-testing' },
                  { label: 'Mocks and Fakes', slug: 'testing/mocks-and-fakes' },
                  { label: 'Factories', slug: 'testing/factories' },
                  { label: 'Seeders', slug: 'testing/seeders' },
              ],
          },
          {
              label: '@stratal/framework',
              items: [
                  { label: 'Overview', slug: 'framework/overview' },
                  { label: 'Database', slug: 'framework/database' },
                  { label: 'Database Events', slug: 'framework/database-events' },
                  { label: 'Auth', slug: 'framework/auth' },
                  { label: 'RBAC', slug: 'framework/rbac' },
                  { label: 'Auth Guard', slug: 'framework/auth-guard' },
              ],
          },
          {
              label: 'API Reference',
              attrs: { target: '_blank' },
              link: 'https://api-reference.stratal.dev',
          },
      ],
  }), react()],

  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});