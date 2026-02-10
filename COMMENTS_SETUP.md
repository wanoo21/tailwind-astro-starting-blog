# Comments Configuration

This blog now supports comments via Disqus. To enable comments on your blog posts, follow these steps:

## Setting up Disqus Comments

1. **Create a Disqus Account**
   - Go to [https://disqus.com/](https://disqus.com/)
   - Click "Get Started" and create an account
   - Choose "I want to install Disqus on my site"

2. **Register Your Site**
   - Enter your website name
   - Choose a unique Disqus shortname (e.g., `my-awesome-blog`)
   - Select a category for your site
   - Complete the registration process

3. **Configure Your Blog**
   - Open `src/consts.ts` in your project
   - Find the `comments` section in `SITE_METADATA`
   - Update the configuration:

   ```typescript
   comments: {
     provider: 'disqus',  // Change from '' to 'disqus'
     disqusConfig: {
       shortname: 'your-disqus-shortname',  // Add your shortname here
     },
   },
   ```

4. **Build and Deploy**
   - Run `npm run build` to build your site
   - Deploy your updated site
   - Comments will now appear at the bottom of each blog post

## Features

- Comments appear on both post layouts (standard and simple)
- A "Scroll to Comment" button appears in the bottom-right corner when scrolling
- Comments section includes the standard Disqus features:
  - User authentication via multiple providers
  - Moderation tools
  - Reaction buttons
  - Threading and replies
  - Email notifications

## Customization

The comments section styling can be customized in `src/components/Comments.astro`. The Disqus component itself is located in `src/components/solidjs/Disqus.tsx`.

## Troubleshooting

- **Comments not showing**: Make sure you've set the `provider` to `'disqus'` and added your `shortname`
- **Wrong site configuration**: Double-check your shortname matches exactly what you registered with Disqus
- **Development vs Production**: Disqus may behave differently in development mode. Test on your deployed site for full functionality
