import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("portfolio.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    en TEXT,
    bn TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_bn TEXT,
    desc_en TEXT,
    desc_bn TEXT,
    date TEXT,
    images TEXT
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_bn TEXT,
    url TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_bn TEXT,
    desc_en TEXT,
    desc_bn TEXT,
    url TEXT,
    type TEXT
  );

  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    url TEXT,
    icon TEXT
  );
`);

// Seed initial content if empty
const contentCount = db.prepare("SELECT COUNT(*) as count FROM content").get() as { count: number };
if (contentCount.count === 0) {
  const insertContent = db.prepare("INSERT INTO content (key, en, bn) VALUES (?, ?, ?)");
    insertContent.run("name", "Tahsan Abib", "তাহসান আবীব");
    insertContent.run("full_name", "MD TAIYABUR RAHAMAN", "মো: তৈয়বুর রহমান");
    insertContent.run("title", "Computer Science Student | Entrepreneur | Technology Enthusiast", "কম্পিউটার সায়েন্সের ছাত্র | উদ্যোক্তা | প্রযুক্তি প্রেমী");
    insertContent.run("intro", "I am a dedicated Computer Science student with a passion for technology and entrepreneurship. My goal is to leverage my skills for the welfare of my nation.", "আমি একজন নিবেদিতপ্রাণ কম্পিউটার সায়েন্সের ছাত্র, যার প্রযুক্তি এবং উদ্যোক্তা হওয়ার প্রতি গভীর আগ্রহ রয়েছে। আমার লক্ষ্য হলো আমার দক্ষতাকে দেশের কল্যাণে কাজে লাগানো।");
    insertContent.run("mission", "To use technology and knowledge to work for the welfare of my country and nation.", "প্রযুক্তি ও জ্ঞান ব্যবহার করে দেশ ও জাতির কল্যাণে কাজ করা।");
    insertContent.run("bio", "I am currently pursuing my BSc in Computer Science and Engineering at Sonargaon University, Dhaka. I have a strong background in graphic design and programming.", "আমি বর্তমানে ঢাকার সোনারগাঁও ইউনিভার্সিটিতে কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বিএসসি করছি। গ্রাফিক ডিজাইন এবং প্রোগ্রামিংয়ে আমার শক্তিশালী ভিত্তি রয়েছে।");
    
    // Navigation
    insertContent.run("nav_home", "Home", "হোম");
    insertContent.run("nav_about", "About Me", "আমার সম্পর্কে");
    insertContent.run("nav_skills", "Skills", "দক্ষতা");
    insertContent.run("nav_portfolio", "Portfolio", "পোর্টফোলিও");
    insertContent.run("nav_events", "Events", "ইভেন্ট");
    insertContent.run("nav_gallery", "Gallery", "গ্যালারি");
    insertContent.run("nav_contact", "Contact", "যোগাযোগ");
    insertContent.run("nav_education", "Education", "শিক্ষা");

    // Hero
    insertContent.run("hero_welcome", "Welcome to my portfolio", "আমার পোর্টফোলিওতে স্বাগতম");
    insertContent.run("btn_view_portfolio", "View Portfolio", "পোর্টফোলিও দেখুন");
    insertContent.run("btn_contact_me", "Contact Me", "যোগাযোগ করুন");

    // About
    insertContent.run("about_who_am_i", "Who am I?", "আমি কে?");
    insertContent.run("about_location", "Location", "অবস্থান");
    insertContent.run("current_address_val", "Fakirapool, Motijheel, Dhaka", "ফকিরাপুল, মতিঝিল, ঢাকা");
    insertContent.run("about_mission", "My Mission", "আমার লক্ষ্য");
    insertContent.run("phone", "+880 1779-036017", "+৮৮০ ১৭৭৯-০৩৬০১৭");
    insertContent.run("facebook_url", "https://www.facebook.com/thasanabib36", "https://www.facebook.com/thasanabib36");
    insertContent.run("whatsapp_url", "https://wa.me/8801779036017", "https://wa.me/8801779036017");
    insertContent.run("hsc_info", "HSC (Batch 2023) - Science Group", "এইচএসসি (ব্যাচ ২০২৩) - বিজ্ঞান বিভাগ");

    // Portfolio Filters
    insertContent.run("filter_all", "All", "সব");
    insertContent.run("filter_graphic", "Graphic Design", "গ্রাফিক ডিজাইন");
    insertContent.run("filter_printing", "Printing Design", "প্রিন্টিং ডিজাইন");
    insertContent.run("filter_social", "Social Media", "সোশ্যাল মিডিয়া");
    insertContent.run("filter_video", "Video Creation", "ভিডিও নির্মাণ");
    insertContent.run("view_project", "View Project", "প্রজেক্ট দেখুন");
    insertContent.run("no_portfolio_items", "No portfolio items yet.", "এখনো কোনো পোর্টফোলিও আইটেম নেই।");

    // Events
    insertContent.run("view_event_details", "View Details", "বিস্তারিত দেখুন");
    insertContent.run("no_events_found", "No events found.", "কোনো ইভেন্ট পাওয়া যায়নি।");

    // Gallery
    insertContent.run("no_gallery_images", "No images in gallery.", "গ্যালারিতে কোনো ছবি নেই।");

    // Contact
    insertContent.run("contact_get_in_touch", "Get in Touch", "যোগাযোগ করুন");
    insertContent.run("contact_desc", "Feel free to reach out for collaborations or just a friendly hello!", "সহযোগিতা বা সাধারণ হাই-হ্যালো করার জন্য নির্দ্বিধায় যোগাযোগ করুন!");
    insertContent.run("contact_chat_now", "Chat Now", "চ্যাট করুন");
    insertContent.run("contact_follow_me", "Follow Me", "ফলো করুন");
    insertContent.run("form_name", "Full Name", "পুরো নাম");
    insertContent.run("form_email", "Email Address", "ইমেল ঠিকানা");
    insertContent.run("form_subject", "Subject", "বিষয়");
    insertContent.run("form_message", "Message", "বার্তা");
    insertContent.run("form_submit", "Send Message", "বার্তা পাঠান");
    insertContent.run("form_name_placeholder", "Your Name", "আপনার নাম");
    insertContent.run("form_email_placeholder", "Your Email", "আপনার ইমেল");
    insertContent.run("form_subject_placeholder", "What is this about?", "এটি কী সম্পর্কে?");
    insertContent.run("form_message_placeholder", "Your Message", "আপনার বার্তা");

    // AI Chat
    insertContent.run("ai_welcome_msg", "Hello! I am Tahsan's AI assistant. Ask me anything about his education, skills, or work.", "হ্যালো! আমি তাহসানের এআই সহকারী। তার শিক্ষা, দক্ষতা বা কাজ সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন।");
    insertContent.run("ai_input_placeholder", "Ask me something...", "আমাকে কিছু জিজ্ঞাসা করুন...");

    // Footer
    insertContent.run("footer_desc", "Building technology for the welfare of the nation.", "জাতির কল্যাণে প্রযুক্তি নির্মাণ।");
    insertContent.run("footer_quick_links", "Quick Links", "দ্রুত লিঙ্ক");
    insertContent.run("footer_services", "Services", "সেবা");
    insertContent.run("footer_contact_info", "Contact Info", "যোগাযোগ তথ্য");
    insertContent.run("service_graphic", "Graphic Design", "গ্রাফিক ডিজাইন");
    insertContent.run("service_printing", "Printing Design", "প্রিন্টিং ডিজাইন");
    insertContent.run("service_video", "Video Editing", "ভিডিও এডিটিং");
    insertContent.run("service_content", "Content Creation", "কন্টেন্ট ক্রিয়েশন");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/content", (req, res) => {
    const content = db.prepare("SELECT * FROM content").all();
    res.json(content);
  });

  app.post("/api/content", (req, res) => {
    const { key, en, bn } = req.body;
    db.prepare("INSERT OR REPLACE INTO content (key, en, bn) VALUES (?, ?, ?)").run(key, en, bn);
    res.json({ success: true });
  });

  app.get("/api/events", (req, res) => {
    const events = db.prepare("SELECT * FROM events ORDER BY date DESC").all();
    res.json(events);
  });

  app.post("/api/events", (req, res) => {
    const { title_en, title_bn, desc_en, desc_bn, date, images } = req.body;
    db.prepare("INSERT INTO events (title_en, title_bn, desc_en, desc_bn, date, images) VALUES (?, ?, ?, ?, ?, ?)").run(
      title_en, title_bn, desc_en, desc_bn, date, JSON.stringify(images)
    );
    res.json({ success: true });
  });

  app.delete("/api/events/:id", (req, res) => {
    db.prepare("DELETE FROM events WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/gallery", (req, res) => {
    const gallery = db.prepare("SELECT * FROM gallery").all();
    res.json(gallery);
  });

  app.post("/api/gallery", (req, res) => {
    const { title_en, title_bn, url, category } = req.body;
    db.prepare("INSERT INTO gallery (title_en, title_bn, url, category) VALUES (?, ?, ?, ?)").run(
      title_en, title_bn, url, category
    );
    res.json({ success: true });
  });

  app.delete("/api/gallery/:id", (req, res) => {
    db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/portfolio", (req, res) => {
    const portfolio = db.prepare("SELECT * FROM portfolio").all();
    res.json(portfolio);
  });

  app.post("/api/portfolio", (req, res) => {
    const { title_en, title_bn, desc_en, desc_bn, url, type } = req.body;
    db.prepare("INSERT INTO portfolio (title_en, title_bn, desc_en, desc_bn, url, type) VALUES (?, ?, ?, ?, ?, ?)").run(
      title_en, title_bn, desc_en, desc_bn, url, type
    );
    res.json({ success: true });
  });

  app.delete("/api/portfolio/:id", (req, res) => {
    db.prepare("DELETE FROM portfolio WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/links", (req, res) => {
    const links = db.prepare("SELECT * FROM links").all();
    res.json(links);
  });

  app.post("/api/links", (req, res) => {
    const { platform, url, icon } = req.body;
    db.prepare("INSERT INTO links (platform, url, icon) VALUES (?, ?, ?)").run(
      platform, url, icon
    );
    res.json({ success: true });
  });

  app.delete("/api/links/:id", (req, res) => {
    db.prepare("DELETE FROM links WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
