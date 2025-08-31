# Soul's Harmony - Unified App

🌟 **A comprehensive D&D 5e Soul's Harmony tracker with integrated lore library**

![Soul's Harmony Launcher](https://github.com/user-attachments/assets/b7af9f57-4746-44f0-85a5-e4b82080f991)

## 🚀 Features

### 🎯 Unified Launcher
- **Tab-based interface** for seamless switching between components
- **Theme toggle** between Xevir (dark/gold) and Naivara (ember) themes
- **Responsive design** that works on desktop and mobile
- **Iframe integration** for smooth component loading

### ⚔️ Advanced Tracker
- **Complete Soul's Harmony system** with Egregor vs Despair mechanics
- **Player/DM view toggle** with appropriate content filtering
- **Temporary Despair tracking** with 3→1 conversion system
- **Resonance Points management** and threshold indicators
- **Bond tracking system** with anchored bonds (0-3)
- **Save/Load/Export/Import** character data (JSON format)
- **Print-to-PDF** functionality for session notes
- **Action history** with timestamped logging

### 🎲 Simple Tracker
- **Lightweight version** for quick games and one-shots
- **Essential tracking** without complex mechanics
- **Fast setup** and minimal interface

### 📚 Lore Library (Wiki)
- **99 lore entries** automatically generated from Obsidian vault
- **Real-time search** with instant filtering
- **Player/GM mode** to hide sensitive content
- **Category filters** for easy navigation
- **Clean typography** and responsive design
- **Cross-references** between entries

## 🎮 Quick Start

### Local Usage
1. **Clone or download** this repository
2. **Open a terminal** in the project directory
3. **Start a local server**:
   ```bash
   cd app
   python -m http.server 8000
   ```
4. **Open your browser** to `http://localhost:8000/launcher.html`

### GitHub Pages (Live Version)
Visit the deployed version at: `https://yourusername.github.io/-Soul-bond-despair/launcher.html`

## 📁 Project Structure

```
/
├─ app/                          # 🌐 Web application (served by GitHub Pages)
│  ├─ launcher.html              # 🚀 Main unified launcher
│  ├─ tracker-advanced/          # ⚔️ Advanced Soul's Harmony tracker
│  │  ├─ index.html
│  │  ├─ script.js
│  │  ├─ styles.css
│  │  ├─ print.css
│  │  └─ data.js
│  ├─ tracker-simple/            # 🎲 Simple tracker for quick games
│  │  └─ [same structure as advanced]
│  └─ wiki/                      # 📚 Generated static wiki
│     ├─ index.html              # Wiki homepage with search
│     ├─ pages/                  # Individual wiki pages
│     ├─ assets/                 # Images and CSS
│     └─ search_index.json       # Search functionality
│
├─ vault/                        # 📝 Source Obsidian vault (markdown files)
├─ vault_clean/                  # 🧹 Cleaned/processed vault (auto-generated)
│
├─ tools/                        # 🔧 Build scripts
│  ├─ clean_vault.py             # Markdown processing & link fixing
│  └─ build_wiki.py              # Static site generation
│
├─ .github/workflows/            # ⚙️ Automation
│  └─ pages.yml                  # Auto-rebuild wiki on push
│
└─ README.md                     # 📖 This file
```

## 🔧 Development

### Adding Content to the Wiki
1. **Add markdown files** to the `vault/` directory
2. **Run the build process**:
   ```bash
   python tools/clean_vault.py    # Clean and standardize
   python tools/build_wiki.py     # Generate static site
   ```
3. **The wiki updates automatically** via GitHub Actions when you push to main

### Customizing the Trackers
- **Advanced tracker**: Edit files in `app/tracker-advanced/`
- **Simple tracker**: Edit files in `app/tracker-simple/`
- **Styling**: Both trackers share similar CSS structure for consistency

### Build Scripts
- **`tools/clean_vault.py`**: 
  - Slugifies filenames to URL-safe format
  - Fixes internal links between markdown files
  - Consolidates images to `/assets/` folder
  - Generates cleanup reports and broken link lists

- **`tools/build_wiki.py`**:
  - Converts markdown to HTML with proper navigation
  - Generates search index for real-time filtering
  - Creates responsive wiki interface
  - Handles cross-references and images

## 🎨 Themes

### Xevir Theme (Default)
- **Dark background** with gold accents
- **Professional appearance** for serious campaigns
- **High contrast** for readability

### Naivara Theme
- **Ember/orange color scheme** 
- **Warmer, more mystical feel**
- **Toggle available** in top-right corner

## 🎯 Core Mechanics (Advanced Tracker)

### Dual Progression System
- **Egregor Score (0-20)**: Spiritual harmony and positive growth
- **Despair Score (0-20)**: Corruption and negative influences
- **Dynamic balance** between light and shadow

### Resource Management
- **Resonance Points (0-10)**: Temporary resource for abilities
- **Temporary Despair**: Accumulates during play, converts at rest
- **Strategic decisions** on when to resist vs. accept corruption

### Player Agency
- **Manual save/load** prevents accidental data loss
- **Export/Import** for character sharing and backups
- **Player/DM views** for appropriate information hiding

## 📖 Lore Integration

### Deep Worldbuilding
- **99 interconnected entries** covering characters, locations, mechanics
- **Consistent mythology** around Xevir, Naivara, and the Cosmic Drowning
- **Player-friendly** and GM-only content separation

### Search & Discovery
- **Instant search** across all content
- **Category filtering** for specific content types
- **Cross-references** between related entries

## 🚀 Deployment

### Automatic Deployment
- **GitHub Actions** automatically rebuilds the wiki when you push changes
- **No manual intervention** required for content updates
- **Fast deployment** via GitHub Pages

### Manual Deployment
```bash
# Build the complete application
python tools/clean_vault.py
python tools/build_wiki.py

# Deploy to any static hosting service
# Just upload the 'app/' folder
```

## 🔍 Technical Details

### Performance
- **Vanilla JavaScript** - no framework dependencies
- **Static generation** - fast loading and offline-capable
- **Responsive design** - works on all device sizes

### Browser Compatibility
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile-friendly** interface
- **Graceful degradation** for older browsers

### Data Persistence
- **LocalStorage** for character data
- **JSON import/export** for portability
- **No server required** - fully client-side

## 🤝 Contributing

### Adding Content
1. Add markdown files to `vault/`
2. Use standard markdown with `[[WikiLinks]]` for cross-references
3. Add `gmOnly: true` frontmatter to hide content from players

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser and operating system information
- Provide steps to reproduce the problem

### Development Setup
1. Clone the repository
2. Install Python dependencies: `pip install markdown`
3. Run build scripts to generate content
4. Start local server for testing

---

**🌟 Soul's Harmony Campaign System** - Where despair and hope dance in eternal balance.

*Built with ❤️ for immersive tabletop gaming*