#!/usr/bin/env python3
"""
Build Wiki Script - tools/build_wiki.py

Converts cleaned vault markdown files into a static HTML wiki with search functionality.

Features:
- Converts markdown to HTML pages
- Generates search index
- Creates navigation and styling
- Handles cross-references and images
"""

import os
import re
import json
import markdown
from pathlib import Path
from urllib.parse import quote, unquote


def build_wiki(vault_clean_path, wiki_output_path):
    """Main function to build static wiki from cleaned vault"""
    
    vault_path = Path(vault_clean_path)
    wiki_path = Path(wiki_output_path)
    
    # Create output structure
    wiki_path.mkdir(exist_ok=True)
    pages_path = wiki_path / 'pages'
    assets_path = wiki_path / 'assets'
    pages_path.mkdir(exist_ok=True)
    assets_path.mkdir(exist_ok=True)
    
    print(f"🏗️ Building wiki: {vault_path} → {wiki_path}")
    
    # Copy assets
    if (vault_path / 'assets').exists():
        print("📸 Copying assets...")
        for asset_file in (vault_path / 'assets').glob('*'):
            if asset_file.is_file():
                dest_file = assets_path / asset_file.name
                with open(asset_file, 'rb') as src, open(dest_file, 'wb') as dst:
                    dst.write(src.read())
                print(f"  📄 {asset_file.name}")
    
    # Process markdown files
    print("📝 Converting markdown to HTML...")
    
    # Initialize markdown processor with extensions
    md = markdown.Markdown(extensions=[
        'extra',           # Tables, code blocks, etc.
        'codehilite',      # Syntax highlighting
        'toc',             # Table of contents
        'meta'             # Metadata parsing
    ])
    
    pages_data = []  # For search index
    
    for md_file in vault_path.glob('*.md'):
        if md_file.name.startswith('README'):
            continue
            
        slug = md_file.stem
        
        try:
            # Read markdown content
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Process internal links before markdown conversion
            content = process_internal_links(content)
            
            # Convert to HTML
            html_content = md.convert(content)
            
            # Extract metadata if present
            meta = getattr(md, 'Meta', {})
            title = meta.get('title', [md_file.stem.replace('-', ' ').title()])[0]
            gm_only = meta.get('gmonly', ['false'])[0].lower() == 'true'
            
            # Generate snippet for search
            # Remove HTML tags and get first 300 chars
            snippet = re.sub(r'<[^>]+>', '', html_content)
            snippet = ' '.join(snippet.split())[:300]
            if len(snippet) == 300:
                snippet += '...'
            
            # Create page data for search index
            page_data = {
                'title': title,
                'slug': slug,
                'snippet': snippet,
                'gmOnly': gm_only
            }
            pages_data.append(page_data)
            
            # Generate HTML page
            html_page = generate_html_page(title, html_content, slug, gm_only)
            
            # Save page
            page_file = pages_path / f"{slug}.html"
            with open(page_file, 'w', encoding='utf-8') as f:
                f.write(html_page)
            
            print(f"  📄 {md_file.name} → {slug}.html")
            
        except Exception as e:
            print(f"  ❌ Error processing {md_file.name}: {e}")
    
    # Generate search index
    print("🔍 Building search index...")
    search_index = {
        'pages': pages_data,
        'generated': str(Path().cwd()),
        'total_pages': len(pages_data)
    }
    
    with open(wiki_path / 'search_index.json', 'w', encoding='utf-8') as f:
        json.dump(search_index, f, indent=2, ensure_ascii=False)
    
    # Generate index page
    print("🏠 Creating index page...")
    index_html = generate_index_page(pages_data)
    with open(wiki_path / 'index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    # Generate CSS
    print("🎨 Creating stylesheet...")
    css_content = generate_wiki_css()
    with open(assets_path / 'wiki.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    print(f"✅ Wiki build complete!")
    print(f"   📁 {len(pages_data)} pages generated")
    print(f"   🔍 Search index created")


def process_internal_links(content):
    """Convert markdown links to proper HTML links for the wiki"""
    
    def replace_md_link(match):
        text = match.group(1)
        url = match.group(2)
        
        # If it's a .md link, convert to .html and adjust path
        if url.endswith('.md'):
            slug = Path(url).stem
            return f'[{text}](pages/{slug}.html)'
        
        return match.group(0)  # Leave other links unchanged
    
    # Process [text](url.md) links
    content = re.sub(r'\[([^\]]+)\]\(([^)]+\.md)\)', replace_md_link, content)
    
    return content


def generate_html_page(title, content, slug, gm_only=False):
    """Generate a complete HTML page for a wiki entry"""
    
    gm_class = 'gm-only' if gm_only else ''
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Soul's Harmony Lore</title>
    <link rel="stylesheet" href="../assets/wiki.css">
</head>
<body class="{gm_class}">
    <header class="wiki-header">
        <div class="nav-container">
            <a href="../index.html" class="back-button">← Back to Library</a>
            <h1>{title}</h1>
            <div class="page-controls">
                <button id="playerModeToggle" class="mode-toggle">👁️ Player Mode</button>
            </div>
        </div>
    </header>
    
    <main class="wiki-content">
        <article>
            {content}
        </article>
    </main>
    
    <footer class="wiki-footer">
        <p>Part of the Soul's Harmony Lore Library</p>
    </footer>
    
    <script>
        // Player/GM mode toggle
        const toggle = document.getElementById('playerModeToggle');
        const body = document.body;
        
        toggle.addEventListener('click', () => {{
            const isPlayerMode = body.classList.toggle('player-mode');
            toggle.textContent = isPlayerMode ? '🎭 GM Mode' : '👁️ Player Mode';
            localStorage.setItem('wikiPlayerMode', isPlayerMode);
        }});
        
        // Load saved mode
        if (localStorage.getItem('wikiPlayerMode') === 'true') {{
            toggle.click();
        }}
    </script>
</body>
</html>"""


def generate_index_page(pages_data):
    """Generate the main wiki index page with search"""
    
    # Sort pages alphabetically
    sorted_pages = sorted(pages_data, key=lambda x: x['title'])
    
    pages_list = ""
    for page in sorted_pages:
        gm_badge = ' <span class="gm-badge">GM Only</span>' if page['gmOnly'] else ''
        pages_list += f"""
        <div class="page-item" data-gm="{str(page['gmOnly']).lower()}">
            <h3><a href="pages/{page['slug']}.html">{page['title']}</a>{gm_badge}</h3>
            <p class="page-snippet">{page['snippet']}</p>
        </div>"""
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soul's Harmony - Lore Library</title>
    <link rel="stylesheet" href="assets/wiki.css">
</head>
<body>
    <header class="wiki-header">
        <div class="nav-container">
            <h1>Soul's Harmony Lore Library</h1>
            <div class="page-controls">
                <button id="playerModeToggle" class="mode-toggle">👁️ Player Mode</button>
            </div>
        </div>
    </header>
    
    <main class="wiki-main">
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search the lore..." />
            <div class="search-stats">
                <span id="searchStats">{len(sorted_pages)} entries found</span>
            </div>
        </div>
        
        <div class="wiki-grid">
            <aside class="wiki-sidebar">
                <h2>Categories</h2>
                <div class="category-filters">
                    <button class="filter-btn active" data-filter="all">All Entries</button>
                    <button class="filter-btn" data-filter="character">Characters</button>
                    <button class="filter-btn" data-filter="egregor">Egregors</button>
                    <button class="filter-btn" data-filter="location">Locations</button>
                    <button class="filter-btn" data-filter="mechanic">Mechanics</button>
                </div>
            </aside>
            
            <section class="wiki-content">
                <div id="pagesContainer" class="pages-container">
                    {pages_list}
                </div>
            </section>
        </div>
    </main>
    
    <script>
        let searchIndex = [];
        let allPages = [];
        
        // Load search index
        fetch('search_index.json')
            .then(response => response.json())
            .then(data => {{
                searchIndex = data.pages;
                allPages = data.pages;
                setupSearch();
            }});
        
        function setupSearch() {{
            const searchInput = document.getElementById('searchInput');
            const searchStats = document.getElementById('searchStats');
            const container = document.getElementById('pagesContainer');
            
            searchInput.addEventListener('input', (e) => {{
                const query = e.target.value.toLowerCase();
                const filtered = query.length === 0 ? allPages : 
                    allPages.filter(page => 
                        page.title.toLowerCase().includes(query) ||
                        page.snippet.toLowerCase().includes(query)
                    );
                
                renderPages(filtered);
                updateSearchStats(filtered.length);
            }});
        }}
        
        function renderPages(pages) {{
            const container = document.getElementById('pagesContainer');
            container.innerHTML = pages.map(page => {{
                const gmBadge = page.gmOnly ? ' <span class="gm-badge">GM Only</span>' : '';
                return `
                    <div class="page-item" data-gm="${{page.gmOnly}}">
                        <h3><a href="pages/${{page.slug}}.html">${{page.title}}</a>${{gmBadge}}</h3>
                        <p class="page-snippet">${{page.snippet}}</p>
                    </div>
                `;
            }}).join('');
        }}
        
        function updateSearchStats(count) {{
            document.getElementById('searchStats').textContent = `${{count}} entries found`;
        }}
        
        // Player/GM mode toggle
        const toggle = document.getElementById('playerModeToggle');
        const body = document.body;
        
        toggle.addEventListener('click', () => {{
            const isPlayerMode = body.classList.toggle('player-mode');
            toggle.textContent = isPlayerMode ? '🎭 GM Mode' : '👁️ Player Mode';
            localStorage.setItem('wikiPlayerMode', isPlayerMode);
        }});
        
        // Load saved mode
        if (localStorage.getItem('wikiPlayerMode') === 'true') {{
            toggle.click();
        }}
    </script>
</body>
</html>"""


def generate_wiki_css():
    """Generate CSS for the wiki"""
    
    return """/* Soul's Harmony Wiki Styles */

:root {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --bg-tertiary: #3a3a3a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --text-muted: #888888;
    --border-color: #444444;
    --accent-gold: #d4af37;
    --accent-ember: #ff6b35;
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Georgia', serif;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
}

/* Header */
.wiki-header {
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid var(--border-color);
    padding: 20px;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-button {
    color: var(--accent-gold);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
}

.back-button:hover {
    color: var(--text-primary);
}

.wiki-header h1 {
    color: var(--accent-gold);
    font-size: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.mode-toggle {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    color: var(--text-primary);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
}

.mode-toggle:hover {
    background: var(--accent-gold);
    color: var(--bg-primary);
}

/* Main content */
.wiki-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.search-container {
    margin-bottom: 30px;
}

#searchInput {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-family: inherit;
}

#searchInput:focus {
    outline: none;
    border-color: var(--accent-gold);
}

.search-stats {
    margin-top: 10px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* Grid layout */
.wiki-grid {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
}

.wiki-sidebar {
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 20px;
    height: fit-content;
    border: 2px solid var(--border-color);
}

.wiki-sidebar h2 {
    color: var(--accent-gold);
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.filter-btn {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--accent-gold);
    color: var(--bg-primary);
    border-color: var(--accent-gold);
}

/* Pages container */
.pages-container {
    display: grid;
    gap: 20px;
}

.page-item {
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 20px;
    border: 2px solid var(--border-color);
    transition: all 0.3s ease;
}

.page-item:hover {
    border-color: var(--accent-gold);
    box-shadow: var(--shadow-light);
}

.page-item h3 {
    margin-bottom: 10px;
}

.page-item h3 a {
    color: var(--accent-gold);
    text-decoration: none;
    font-size: 1.3rem;
}

.page-item h3 a:hover {
    color: var(--text-primary);
}

.page-snippet {
    color: var(--text-secondary);
    line-height: 1.5;
}

.gm-badge {
    background: var(--accent-ember);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    margin-left: 10px;
}

/* Article content */
.wiki-content article {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 2px solid var(--border-color);
}

.wiki-content h1,
.wiki-content h2,
.wiki-content h3 {
    color: var(--accent-gold);
    margin: 20px 0 10px 0;
}

.wiki-content h1 {
    font-size: 2.2rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 10px;
}

.wiki-content h2 {
    font-size: 1.8rem;
}

.wiki-content h3 {
    font-size: 1.4rem;
}

.wiki-content p {
    margin-bottom: 15px;
}

.wiki-content ul,
.wiki-content ol {
    margin: 15px 0 15px 25px;
}

.wiki-content blockquote {
    border-left: 4px solid var(--accent-gold);
    padding-left: 20px;
    margin: 20px 0;
    color: var(--text-secondary);
    font-style: italic;
}

.wiki-content code {
    background: var(--bg-tertiary);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

.wiki-content pre {
    background: var(--bg-tertiary);
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 15px 0;
}

.wiki-content img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 15px 0;
    border: 2px solid var(--border-color);
}

.wiki-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.wiki-content th,
.wiki-content td {
    border: 1px solid var(--border-color);
    padding: 10px;
    text-align: left;
}

.wiki-content th {
    background: var(--bg-tertiary);
    color: var(--accent-gold);
    font-weight: bold;
}

/* Player mode - hide GM content */
body.player-mode .gm-only,
body.player-mode [data-gm="true"] {
    display: none !important;
}

/* Footer */
.wiki-footer {
    text-align: center;
    padding: 20px;
    color: var(--text-muted);
    border-top: 1px solid var(--border-color);
    margin-top: 40px;
}

/* Responsive design */
@media (max-width: 768px) {
    .wiki-grid {
        grid-template-columns: 1fr;
    }
    
    .nav-container {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .wiki-header h1 {
        font-size: 1.5rem;
    }
    
    .wiki-main {
        padding: 15px;
    }
    
    .wiki-content article {
        padding: 15px;
    }
}

/* Print styles */
@media print {
    body {
        background: white;
        color: black;
    }
    
    .wiki-header,
    .wiki-sidebar,
    .search-container,
    .mode-toggle {
        display: none;
    }
    
    .wiki-content article {
        box-shadow: none;
        border: none;
        background: white;
    }
}"""


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 2:
        vault_clean_path = sys.argv[1]
        wiki_output_path = sys.argv[2]
    else:
        vault_clean_path = 'vault_clean'
        wiki_output_path = 'app/wiki'
    
    if not os.path.exists(vault_clean_path):
        print(f"❌ Cleaned vault path not found: {vault_clean_path}")
        print("Run 'python tools/clean_vault.py' first")
        sys.exit(1)
    
    build_wiki(vault_clean_path, wiki_output_path)