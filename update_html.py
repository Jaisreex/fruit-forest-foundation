import sys

with open('/home/jaisree/Documents/Fruit_Forest_Foundation/index.html', 'r') as f:
    content = f.read()

start_marker = "<!-- ===== GET INVOLVED SECTION ===== -->"
end_marker = "<!-- ===== ABOUT US SECTION ===== -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = """<!-- ===== GET INVOLVED SECTION ===== -->
  <section class="get-involved-detailed-section" id="get-involved">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-tag">JOIN THE MOVEMENT</div>
        <h2 class="section-title">How Can You <span class="text-green">Contribute Us?</span></h2>
        <p class="section-subtitle">
          At FruitForest Foundation, we believe that every fruit tree planted today becomes a source of food, health, shade, and hope for future generations. Our mission is to transform public spaces into living fruit forests while spreading awareness about nature, wellness, and sustainable living.
        </p>
      </div>

      <div class="gi-split-layout">
        <!-- LEFT SIDE: Image Placeholder -->
        <div class="gi-left reveal-left">
          <div class="gi-image-placeholder">
            <span>Image will be added here</span>
          </div>
        </div>

        <!-- RIGHT SIDE: Content -->
        <div class="gi-right reveal-right">
          <div class="gi-content-blocks">
            <div class="gi-block">
              <h4>🌱 Support Fruit Tree Plantation</h4>
              <p>Help us plant fruit trees in schools, roadsides, villages, parks, public lands, and community spaces. Every contribution helps create greener environments and provides free, healthy fruits for people and wildlife.</p>
            </div>
            
            <div class="gi-block">
              <h4>🍎 Sponsor and Distribute Fruit Trees</h4>
              <p>Support the distribution of fruit tree saplings to communities, families, educational institutions, and public organizations to encourage natural and sustainable food growth.</p>
            </div>
            
            <div class="gi-block">
              <h4>📢 Spread Awareness</h4>
              <p>Share our mission with friends, schools, organizations, and communities to inspire more people to protect nature and plant for the future.</p>
            </div>
            
            <div class="gi-block">
              <h4>🤝 Volunteer With Us</h4>
              <p>Join plantation drives, awareness campaigns, educational activities, and community programs to create positive environmental and social impact.</p>
            </div>
            
            <div class="gi-block">
              <h4>💚 Build a Healthier and Wealthier Future</h4>
              <p>We also focus on wellness and wealth coaching to help individuals build healthier lifestyles, positive habits, financial awareness, and personal growth.</p>
            </div>
          </div>

          <div class="gi-highlight-box">
            <h4>Why Your Support Matters</h4>
            <ul class="gi-support-list">
              <li><i class="fas fa-check-circle"></i> Provides free and nutritious food</li>
              <li><i class="fas fa-check-circle"></i> Improves air quality and biodiversity</li>
              <li><i class="fas fa-check-circle"></i> Reduces environmental impact</li>
              <li><i class="fas fa-check-circle"></i> Creates greener public spaces</li>
              <li><i class="fas fa-check-circle"></i> Supports future generations</li>
            </ul>
          </div>

          <p class="gi-closing-statement">Small actions today can create forests tomorrow.</p>
        </div>
      </div>
      
      <!-- Existing CTA Cards -->
      <div class="movement-grid" style="margin-top: 6rem;">
        <!-- Card 1: Volunteer -->
        <div class="movement-card reveal delay-1">
          <div class="movement-card-icon"><i class="fas fa-hands-helping"></i></div>
          <h3>Volunteer With Us</h3>
          <p>Join our community efforts to grow fruit forests and support a greener future for everyone.</p>
          <div class="movement-card-footer">
            <a href="pages/become-a-volunteer.html" class="btn-primary">👉 Join Now</a>
          </div>
        </div>

        <!-- Card 2: Partner -->
        <div class="movement-card reveal delay-2">
          <div class="movement-card-icon"><i class="fas fa-handshake"></i></div>
          <h3>Collaborate & Partner</h3>
          <p>Work with us to expand fruit forests and create sustainable community impact worldwide.</p>
          <div class="movement-card-footer">
            <a href="pages/partner-with-us.html" class="btn-primary">🤝 Partner With Us</a>
          </div>
        </div>

        <!-- Card 3: Explore -->
        <div class="movement-card reveal delay-3">
          <div class="movement-card-icon"><i class="fas fa-seedling"></i></div>
          <h3>Explore Opportunities</h3>
          <p>Discover programs for wellness, sustainability, and education to empower individuals.</p>
          <div class="movement-card-footer">
            <a href="pages/opportunities.html" class="btn-primary">🔍 View Programs</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  """
    new_content = content[:start_idx] + new_html + content[end_idx:]
    with open('/home/jaisree/Documents/Fruit_Forest_Foundation/index.html', 'w') as f:
        f.write(new_content)
    print("Updated index.html")
else:
    print("Markers not found!")
