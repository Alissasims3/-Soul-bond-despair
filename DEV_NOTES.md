# Developer Notes - Soul's Harmony Unified App

## Architecture Overview

This project implements a comprehensive tabletop gaming application with three main components unified under a single launcher interface.

### Component Architecture

```
Launcher (iframe coordinator)
├── Advanced Tracker (full-featured character sheet)
├── Simple Tracker (lightweight version)
└── Wiki (static site generated from markdown)
```

### Key Design Decisions

1. **Iframe-based architecture** for component isolation and independent development
2. **Static generation** for the wiki to ensure fast loading and GitHub Pages compatibility
3. **Vanilla JavaScript** to avoid framework dependencies and deployment complexity
4. **Progressive enhancement** for mobile responsiveness and accessibility

## Build Pipeline

### Vault Processing (`tools/clean_vault.py`)

**Input**: Raw Obsidian vault markdown files  
**Output**: Cleaned markdown with standardized links and assets

**Process**:
1. **Filename slugification**: `🎴 Quote Cards.md` → `quote-cards.md`
2. **Link conversion**: `[[WikiLink]]` → `[WikiLink](wiki-link.md)`
3. **Image consolidation**: All images moved to `/assets/` with safe names
4. **Broken link detection**: Reports missing references for manual fixing

**Key Functions**:
- `slugify()`: Converts text to URL-safe format
- `process_links()`: Handles Obsidian-style link conversion
- `find_images()`: Locates and processes image files

### Wiki Generation (`tools/build_wiki.py`)

**Input**: Cleaned vault from previous step  
**Output**: Complete static website with search functionality

**Process**:
1. **Markdown to HTML**: Using Python `markdown` library with extensions
2. **Search index generation**: Creates `search_index.json` for client-side search
3. **Navigation generation**: Builds main index page with filtering
4. **Asset copying**: Handles images and generates CSS

**Key Functions**:
- `generate_html_page()`: Creates individual wiki pages with navigation
- `generate_index_page()`: Builds main wiki interface
- `process_internal_links()`: Converts markdown links to HTML

## Component Details

### Launcher (`app/launcher.html`)

**Purpose**: Unified interface for component switching  
**Technology**: Vanilla HTML/CSS/JavaScript with iframe integration

**Key Features**:
- Tab-based navigation with active state management
- Theme toggle with localStorage persistence
- Message passing for deep-linking between components
- Responsive design for mobile compatibility

**JavaScript Functions**:
- `switchTab()`: Handles component switching
- `toggleTheme()`: Manages theme state
- Message listener for cross-component communication

### Advanced Tracker (`app/tracker-advanced/`)

**Purpose**: Full-featured Soul's Harmony character sheet  
**Technology**: Vanilla JavaScript with modular class structure

**Core Components**:
- `SoulsHarmonyTracker` class: Main application logic
- Local storage persistence with manual save/load
- JSON import/export functionality
- Print CSS for session documentation

**Key Features**:
- Dual progression system (Egregor vs Despair)
- Temporary Despair with 3→1 conversion mechanics
- Player/DM view toggle with content filtering
- Real-time progress bars and visual feedback

### Simple Tracker (`app/tracker-simple/`)

**Purpose**: Lightweight version for quick games  
**Technology**: Simplified version of advanced tracker

**Differences from Advanced**:
- Reduced feature set
- Faster loading and setup
- Minimal UI complexity
- Essential tracking only

### Wiki System (`app/wiki/`)

**Purpose**: Searchable lore library  
**Technology**: Static HTML with client-side JavaScript

**Generated Files**:
- `index.html`: Main wiki interface with search
- `pages/*.html`: Individual lore entries
- `search_index.json`: Search data for client-side filtering
- `assets/wiki.css`: Styling for wiki interface

## Data Flow

### Character Data
1. **Input**: User interactions in tracker interface
2. **Processing**: JavaScript state management
3. **Storage**: LocalStorage with manual save/load
4. **Export**: JSON format for portability

### Wiki Content
1. **Source**: Markdown files in `vault/`
2. **Processing**: Python build scripts
3. **Output**: Static HTML in `app/wiki/`
4. **Search**: Client-side filtering via search index

### Theme State
1. **Input**: Theme toggle button
2. **Storage**: LocalStorage for persistence
3. **Application**: CSS class toggling

## GitHub Integration

### GitHub Pages Setup
- **Source**: Deploy from `app/` folder
- **URL**: `https://username.github.io/repo-name/launcher.html`
- **Automation**: GitHub Actions rebuild on push

### Workflow (`/.github/workflows/pages.yml`)
1. **Trigger**: Push to main branch
2. **Setup**: Python environment with markdown library
3. **Build**: Run vault cleaning and wiki generation
4. **Deploy**: Upload `app/` folder to Pages

## Development Workflow

### Local Development
```bash
# Start development server
cd app
python -m http.server 8000

# Rebuild wiki after content changes
python tools/clean_vault.py
python tools/build_wiki.py
```

### Adding New Features

#### Tracker Features
1. Edit appropriate tracker files in `app/tracker-advanced/` or `app/tracker-simple/`
2. Maintain consistency between Player/DM views
3. Test save/load functionality with new features

#### Wiki Content
1. Add markdown files to `vault/`
2. Use `[[WikiLink]]` syntax for cross-references
3. Add `gmOnly: true` frontmatter for DM-only content
4. Run build scripts to regenerate

#### Launcher Features
1. Edit `app/launcher.html`
2. Maintain iframe communication for deep-linking
3. Test responsive behavior across devices

## Troubleshooting

### Common Issues

**Wiki not updating after content changes**
```bash
# Clear the generated directories
rm -rf vault_clean app/wiki
# Rebuild from scratch
python tools/clean_vault.py
python tools/build_wiki.py
```

**Broken links in wiki**
- Check `vault_clean/link_map.json` for broken references
- Review `vault_clean/README_CLEANUP.md` for detailed report
- Fix source markdown files in `vault/` and rebuild

**Tracker data not persisting**
- Check browser LocalStorage limitations
- Test JSON export/import functionality
- Verify no JavaScript errors in console

**Theme not persisting**
- Check LocalStorage in browser developer tools
- Verify theme toggle JavaScript is working
- Clear browser cache if needed

### Performance Optimization

**Wiki Loading**
- Search index is loaded asynchronously
- Images use lazy loading attributes
- CSS is optimized for critical rendering path

**Tracker Performance**
- State updates are batched where possible
- DOM queries are cached in variables
- Event listeners are properly managed

## Security Considerations

### Content Security
- All content is static and client-side
- No server-side processing or database storage
- User data stays in browser LocalStorage

### XSS Prevention
- Markdown processing includes XSS protection
- User input is properly escaped in JavaScript
- No dynamic script execution

## Browser Compatibility

### Minimum Requirements
- **JavaScript**: ES6+ (arrow functions, const/let, classes)
- **CSS**: Grid, Flexbox, CSS Variables
- **HTML**: HTML5 semantic elements

### Tested Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Mobile Support
- Responsive design with CSS Grid and Flexbox
- Touch-friendly interface elements
- Optimized for iOS and Android browsers

## Performance Metrics

### Load Times (localhost)
- **Launcher**: < 100ms
- **Advanced Tracker**: < 200ms
- **Simple Tracker**: < 150ms
- **Wiki Index**: < 300ms
- **Individual Wiki Pages**: < 100ms

### Bundle Sizes
- **Launcher**: ~7KB (HTML + CSS + JS)
- **Advanced Tracker**: ~25KB total
- **Simple Tracker**: ~15KB total
- **Wiki**: ~2MB total (including all content)

## Future Enhancements

### Short Term
- [ ] Add keyboard shortcuts for common actions
- [ ] Implement dark/light mode auto-detection
- [ ] Add more theme options
- [ ] Enhance mobile touch interactions

### Medium Term
- [ ] Add collaborative features (shared state)
- [ ] Implement offline caching (Service Worker)
- [ ] Add audio/visual enhancements
- [ ] Build native mobile app wrapper

### Long Term
- [ ] Real-time multiplayer support
- [ ] Cloud save integration
- [ ] Advanced analytics and metrics
- [ ] Plugin architecture for extensions

## Code Style Guide

### JavaScript
- Use ES6+ features (const/let, arrow functions, classes)
- Prefer functional programming patterns where appropriate
- Comment complex logic and maintain JSDoc for public methods
- Use meaningful variable names and avoid abbreviations

### CSS
- Use CSS Custom Properties for theming
- Follow BEM-like naming conventions
- Mobile-first responsive design
- Prefer Grid and Flexbox over legacy layout methods

### HTML
- Use semantic HTML5 elements
- Include appropriate ARIA labels for accessibility
- Maintain proper heading hierarchy
- Optimize for screen readers

## Deployment Checklist

### Pre-deployment
- [ ] Test all components locally
- [ ] Verify wiki builds without errors
- [ ] Check responsive design on multiple devices
- [ ] Validate HTML/CSS with tools
- [ ] Test JavaScript in different browsers

### Deployment
- [ ] Push to main branch (triggers GitHub Actions)
- [ ] Verify GitHub Pages deployment succeeds
- [ ] Test deployed version thoroughly
- [ ] Update documentation if needed

### Post-deployment
- [ ] Monitor for issues in GitHub Issues
- [ ] Check analytics for usage patterns
- [ ] Gather user feedback
- [ ] Plan next iteration based on feedback