import re

with open('assets/css/style.css', 'r') as f:
    content = f.read()

# Remove transform: scale(...) and transform-origin: ... on the logo blocks
lines = content.split('\n')
new_lines = []
for line in lines:
    if 'transform: scale' in line and '!' in line:
        continue # skip
    if 'transform-origin: center left' in line:
        continue # skip
    if 'transform: scale(1.6); /* Significantly increase visual size without breaking layout */' in line:
        continue
    if 'transform-origin: center left; /* Scale from the left edge so it doesn\'t push into the button visually */' in line:
        continue
    if 'transform: scale(1.4);' in line:
        continue
    new_lines.append(line)

with open('assets/css/style.css', 'w') as f:
    f.write('\n'.join(new_lines))

