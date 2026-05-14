import os
import re

def update_float_buttons(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Pattern to match the floating button
            pattern = r'<!-- ===== FLOATING PLANT A TREE BUTTON ===== -->\s*<button class="float-btn" onclick="window.location.href=\'donate\.html\'">\s*<span>🌱 Plant a Tree</span>\s*</button>'
            
            # Fallback if comment is missing
            pattern_no_comment = r'<button class="float-btn" onclick="window.location.href=\'donate\.html\'">\s*<span>🌱 Plant a Tree</span>\s*</button>'
            
            replacement = """  <!-- ===== FLOATING ACTION BUTTONS ===== -->
  <div class="fab-container">
    <button class="float-btn" onclick="window.location.href='donate.html'">
      <span>💰 Donate a Tree</span>
    </button>
    <button class="float-btn" onclick="window.location.href='donate.html'">
      <span>🌳 Adopt a Tree</span>
    </button>
    <button class="float-btn" onclick="window.location.href='donate.html'">
      <span>🌱 Plant a Tree</span>
    </button>
  </div>"""
            
            new_content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
            if new_content == content:
                new_content = re.sub(pattern_no_comment, replacement, content, flags=re.MULTILINE)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filename}")

update_float_buttons('pages')
