import sys

file_path = '/home/jaisree/Documents/Fruit_Forest_Foundation/index.html'

with open(file_path, 'r') as f:
    content = f.read()

start_marker = "<!-- Who We Are -->"
end_marker = "<!-- Mission, Vision, Purpose -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = """<!-- About Intro Split Section -->
      <div class="about-intro-split reveal">
        <!-- LEFT SIDE: Text content -->
        <div class="about-intro-left">
          <h3 class="about-intro-title">About Our <span>Fruit Forest Foundation</span></h3>
          <p><strong>Fruit Forest Foundation</strong> is a non-profit trust dedicated to building a greener, healthier, and more sustainable future. Our primary mission is to spread awareness about the importance of planting <span class="text-highlight-green">fruit-bearing trees</span> and to encourage tree plantation in public places, open spaces, and communities across the world.</p>
          <p>We believe fruit trees not only help protect the environment by improving air quality and supporting biodiversity, but also provide <span class="text-highlight-gold">natural food sources</span> for people and wildlife. As part of our initiatives, we also distribute fruit-bearing plants and encourage individuals and communities to actively participate in creating greener spaces.</p>
          <p>Beyond environmental efforts, our foundation is committed to public well-being through <span class="text-highlight-green">health and wellness coaching</span> that supports individual happiness, balanced living, and personal growth. We also provide <span class="text-highlight-gold">wealth awareness</span> and financial guidance programs to help people understand the importance of money, financial planning, and building a better future.</p>
        </div>

        <!-- RIGHT SIDE: Image Placeholder -->
        <div class="about-intro-right">
          <div class="about-image-placeholder">
            <span>Image will be added here</span>
          </div>
        </div>
      </div>

      """
    
    # We replace from start_marker to just before end_marker
    new_content = content[:start_idx] + new_html + content[end_idx:]
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Updated index.html")
else:
    print("Markers not found!")
