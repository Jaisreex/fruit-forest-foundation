import os
import re

nav_order = [
    "Home",
    "Our Initiatives",
    "Get Involved",
    "Impact",
    "About Us",
    "FAQ"
]

def reorder_navbar(content):
    # Find the nav-links UL block
    ul_match = re.search(r'(<ul class="nav-links" id="navLinks">)(.*?)(</ul>)', content, re.DOTALL)
    if not ul_match:
        # Check for non-ID version if exists
        ul_match = re.search(r'(<div class="nav-links" id="navLinks">)(.*?)(</div>)', content, re.DOTALL)
    
    if ul_match:
        prefix, items_block, suffix = ul_match.groups()
        # Find all LI items or A items
        items = re.findall(r'(<li class="nav-item">.*?</li>|<a href=".*?" class="nav-link">.*?</a>)', items_block, re.DOTALL)
        
        # Map items by text
        item_map = {}
        for item in items:
            text_match = re.search(r'>(.*?)</a>', item)
            if text_match:
                text = text_match.group(1).strip()
                # Normalize "Our Initiative" to "Our Initiatives"
                if text == "Our Initiative": text = "Our Initiatives"
                item_map[text] = item.replace("Our Initiative", "Our Initiatives")

        # Build new block
        new_items = []
        for key in nav_order:
            if key in item_map:
                new_items.append(item_map[key])
            elif key == "Our Initiatives" and "Our Initiative" in item_map:
                new_items.append(item_map["Our Initiative"].replace("Our Initiative", "Our Initiatives"))
        
        # Add remaining items if any
        for key, val in item_map.items():
            if key not in nav_order:
                new_items.append(val)
        
        new_items_block = "\n        " + "\n        ".join(new_items) + "\n      "
        content = content.replace(ul_match.group(0), prefix + new_items_block + suffix)
    
    # Update DONATE button
    content = content.replace("DONATE</a>", "PLAN A TREE</a>")
    content = content.replace("Donate</a>", "PLAN A TREE</a>")
    
    return content

files = ["index.html"] + [os.path.join("pages", f) for f in os.listdir("pages") if f.endswith(".html")]

for f in files:
    if os.path.exists(f):
        with open(f, "r") as file:
            c = file.read()
        new_c = reorder_navbar(c)
        with open(f, "w") as file:
            file.write(new_c)
