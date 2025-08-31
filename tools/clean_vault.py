#!/usr/bin/env python3
"""
Clean Vault Script - tools/clean_vault.py

Processes raw Obsidian vault markdown files to create a cleaned, standardized version
suitable for static site generation.

Features:
- Slugifies filenames to lowercase-hyphens.md
- Consolidates images to /assets/ folder
- Converts Obsidian-style links to standard markdown
- Generates link map and cleanup report
"""

import os
import re
import json
import shutil
from pathlib import Path
from urllib.parse import unquote


def slugify(text):
    """Convert text to URL-safe slug format"""
    # Remove special characters and emojis, replace with spaces
    text = re.sub(r'[^\w\s-]', '', text.strip())
    # Replace spaces and multiple hyphens with single hyphens
    text = re.sub(r'[\s_-]+', '-', text)
    return text.lower().strip('-')


def find_images(vault_path):
    """Find all image files in the vault"""
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp'}
    images = []
    
    for root, dirs, files in os.walk(vault_path):
        for file in files:
            if Path(file).suffix.lower() in image_extensions:
                images.append(os.path.join(root, file))
    
    return images


def clean_vault(vault_path, output_path):
    """Main function to clean and process vault"""
    
    vault_path = Path(vault_path)
    output_path = Path(output_path)
    
    # Create output structure
    output_path.mkdir(exist_ok=True)
    assets_path = output_path / 'assets'
    assets_path.mkdir(exist_ok=True)
    
    # Track all files and mappings
    file_map = {}  # original_name -> slug_name
    link_map = {}  # track link conversions
    broken_links = []
    processed_images = {}  # original_path -> new_name
    
    print(f"🧹 Cleaning vault: {vault_path} → {output_path}")
    
    # Step 1: Copy and rename all images
    print("📸 Processing images...")
    images = find_images(vault_path)
    
    for img_path in images:
        img_path = Path(img_path)
        # Create safe filename
        safe_name = slugify(img_path.stem) + img_path.suffix.lower()
        
        # Handle name conflicts
        counter = 1
        original_safe_name = safe_name
        while (assets_path / safe_name).exists():
            name_part, ext = os.path.splitext(original_safe_name)
            safe_name = f"{name_part}-{counter}{ext}"
            counter += 1
        
        # Copy image
        dest_path = assets_path / safe_name
        shutil.copy2(img_path, dest_path)
        processed_images[str(img_path)] = safe_name
        print(f"  📄 {img_path.name} → {safe_name}")
    
    # Step 2: Process markdown files
    print("📝 Processing markdown files...")
    
    for md_file in vault_path.glob('*.md'):
        # Skip if it's already in a subdirectory
        if not md_file.is_file():
            continue
            
        # Create slug filename
        slug_name = slugify(md_file.stem) + '.md'
        
        # Handle filename conflicts
        counter = 1
        original_slug = slug_name
        while (output_path / slug_name).exists():
            name_part = original_slug[:-3]  # Remove .md
            slug_name = f"{name_part}-{counter}.md"
            counter += 1
        
        file_map[md_file.name] = slug_name
        
        # Read and process content
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Process links and embeds
            content, links_found = process_links(content, file_map, processed_images, broken_links)
            link_map[md_file.name] = links_found
            
            # Write processed file
            output_file = output_path / slug_name
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  📄 {md_file.name} → {slug_name}")
            
        except Exception as e:
            print(f"  ❌ Error processing {md_file.name}: {e}")
    
    # Step 3: Generate reports
    print("📊 Generating reports...")
    
    # Save link map
    with open(output_path / 'link_map.json', 'w', encoding='utf-8') as f:
        json.dump({
            'file_mappings': file_map,
            'link_mappings': link_map,
            'broken_links': broken_links,
            'processed_images': processed_images
        }, f, indent=2, ensure_ascii=False)
    
    # Generate cleanup report
    cleanup_report = generate_cleanup_report(file_map, link_map, broken_links, processed_images)
    with open(output_path / 'README_CLEANUP.md', 'w', encoding='utf-8') as f:
        f.write(cleanup_report)
    
    print(f"✅ Vault cleaning complete!")
    print(f"   📁 {len(file_map)} markdown files processed")
    print(f"   🖼️ {len(processed_images)} images processed")
    print(f"   ❌ {len(broken_links)} broken links found")


def process_links(content, file_map, processed_images, broken_links):
    """Process Obsidian-style links and embeds in markdown content"""
    
    links_found = []
    
    # Pattern for [[Note|Alias]] or [[Note]] links
    def replace_wiki_link(match):
        full_match = match.group(0)
        link_content = match.group(1)
        
        # Handle alias: [[Note|Alias]]
        if '|' in link_content:
            note_name, alias = link_content.split('|', 1)
        else:
            note_name = link_content
            alias = note_name
        
        # Clean note name
        note_name = note_name.strip()
        original_note = note_name + '.md'
        
        links_found.append({'type': 'wiki_link', 'original': note_name, 'alias': alias})
        
        # Find corresponding file
        if original_note in file_map:
            slug_name = file_map[original_note][:-3]  # Remove .md
            return f"[{alias}]({slug_name}.md)"
        else:
            broken_links.append(f"Missing file: {original_note} (referenced as [[{link_content}]])")
            return f"[{alias}](#{slugify(note_name)})"  # Create anchor link
    
    # Pattern for ![[Image]] embeds
    def replace_image_embed(match):
        image_name = match.group(1).strip()
        
        links_found.append({'type': 'image_embed', 'original': image_name})
        
        # Find the image in processed images
        for orig_path, new_name in processed_images.items():
            if Path(orig_path).name == image_name:
                return f"![{image_name}](assets/{new_name})"
        
        # Try without extension matching
        image_base = Path(image_name).stem
        for orig_path, new_name in processed_images.items():
            if Path(orig_path).stem == image_base:
                return f"![{image_name}](assets/{new_name})"
        
        broken_links.append(f"Missing image: {image_name}")
        return f"![{image_name}](assets/{slugify(image_name)})"
    
    # Process wiki links [[...]]
    content = re.sub(r'\[\[([^\]]+)\]\]', replace_wiki_link, content)
    
    # Process image embeds ![[...]]
    content = re.sub(r'!\[\[([^\]]+)\]\]', replace_image_embed, content)
    
    # Fix standard markdown image paths to point to assets when they exist
    def fix_markdown_image(match):
        alt_text = match.group(1)
        image_path = match.group(2)
        
        # If it's already pointing to assets, leave it
        if image_path.startswith('assets/'):
            return match.group(0)
        
        # Check if we have this image in processed images
        image_name = Path(image_path).name
        for orig_path, new_name in processed_images.items():
            if Path(orig_path).name == image_name:
                return f"![{alt_text}](assets/{new_name})"
        
        return match.group(0)  # Leave unchanged if not found
    
    # Process standard markdown images ![alt](path)
    content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', fix_markdown_image, content)
    
    return content, links_found


def generate_cleanup_report(file_map, link_map, broken_links, processed_images):
    """Generate a human-readable cleanup report"""
    
    report = f"""# Vault Cleanup Report

## Summary
- **Markdown files processed**: {len(file_map)}
- **Images processed**: {len(processed_images)}
- **Broken links found**: {len(broken_links)}

## File Mappings

### Markdown Files
"""
    
    for original, slug in file_map.items():
        report += f"- `{original}` → `{slug}`\n"
    
    report += f"\n### Images\n"
    for original_path, new_name in processed_images.items():
        original_name = Path(original_path).name
        report += f"- `{original_name}` → `assets/{new_name}`\n"
    
    if broken_links:
        report += f"\n## ⚠️ Broken Links\n"
        for link in broken_links:
            report += f"- {link}\n"
    
    report += f"""
## Next Steps

1. Review broken links and fix manually if needed
2. Run `python tools/build_wiki.py` to generate the static wiki
3. Check the generated wiki for any remaining issues

Generated by `tools/clean_vault.py`
"""
    
    return report


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 2:
        vault_path = sys.argv[1]
        output_path = sys.argv[2]
    else:
        vault_path = 'vault'
        output_path = 'vault_clean'
    
    if not os.path.exists(vault_path):
        print(f"❌ Vault path not found: {vault_path}")
        sys.exit(1)
    
    clean_vault(vault_path, output_path)