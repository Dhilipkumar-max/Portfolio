# Futuristic Portfolio

A modern, responsive portfolio website with futuristic design elements and smooth animations.

## Features

- 🎨 Modern and futuristic design
- 📱 Fully responsive layout
- ✨ Smooth animations and transitions
- 🎯 Interactive elements
- 📝 Contact form
- 🌟 Parallax effects
- ⌨️ Typing animation
- 🎭 Glitch text effect
- 🎨 Custom scrollbar
- 📱 Mobile-friendly navigation

## Customization

### Colors
You can customize the color scheme by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00ff88;
    --secondary-color: #0a192f;
    --text-color: #e6f1ff;
    --background-color: #0a192f;
    --accent-color: #64ffda;
    --card-bg: rgba(255, 255, 255, 0.05);
}
```

### Content
1. Update your personal information in `index.html`:
   - Change "Your Name" to your actual name
   - Update the "Full Stack Developer" title
   - Modify the About section text
   - Add your own projects to the Projects section
   - Update contact information and social media links

2. Add your own images:
   - Replace the project images in the project cards
   - Add your profile picture if desired

### Projects
To add your own projects, modify the project cards in `index.html`:

```html
<div class="project-card">
    <div class="project-image"></div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-links">
            <a href="#" class="btn">View Live</a>
            <a href="#" class="btn">GitHub</a>
        </div>
    </div>
</div>
```

### Contact Form
The contact form is currently set up with a simulated submission. To make it functional:

1. Replace the form submission code in `script.js` with your preferred backend solution
2. Update the form action URL in `index.html`

## Dependencies

- Font Awesome Icons (included via CDN)
- Inter Font (included via Google Fonts)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Customize the content and styling as needed
4. Deploy to your preferred hosting service

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 