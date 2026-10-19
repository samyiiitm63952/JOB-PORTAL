import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("✅ Connected to MongoDB");

const db = mongoose.connection.db;
const companiesCollection = db.collection("companies");

const rawData = [
  {
    "_id": "6ad5750b2b480763440f2131",
    "name": "Apple",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:12:00.000Z",
    "updatedAt": "2026-10-19T02:12:00.000Z",
    "__v": 0,
    "description": "Designs and manufactures consumer electronics, custom silicon (M-series), and operating systems.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://apple.com&size=256",
    "website": "https://www.apple.com"
  },
  {
    "_id": "6ad5750b2b480763440f2132",
    "name": "Meta",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:13:00.000Z",
    "updatedAt": "2026-10-19T02:13:00.000Z",
    "__v": 0,
    "description": "Builds social networking platforms, open-source AI models (Llama), and AR/VR hardware.",
    "location": "Gurgaon",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://meta.com&size=256",
    "website": "https://www.meta.com"
  },
  {
    "_id": "6ad5750b2b480763440f2133",
    "name": "Netflix",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:14:00.000Z",
    "updatedAt": "2026-10-19T02:14:00.000Z",
    "__v": 0,
    "description": "Global streaming entertainment service pioneer in cloud microservices and content delivery.",
    "location": "Mumbai",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://netflix.com&size=256",
    "website": "https://www.netflix.com"
  },
  {
    "_id": "6ad5750b2b480763440f2134",
    "name": "Spotify",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:15:00.000Z",
    "updatedAt": "2026-10-19T02:15:00.000Z",
    "__v": 0,
    "description": "Audio streaming and media services provider specializing in personalized music recommendation.",
    "location": "Mumbai",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://spotify.com&size=256",
    "website": "https://www.spotify.com"
  },
  {
    "_id": "6ad5750b2b480763440f2135",
    "name": "Stripe",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:16:00.000Z",
    "updatedAt": "2026-10-19T02:16:00.000Z",
    "__v": 0,
    "description": "Financial infrastructure platform and payment processing APIs for internet businesses.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://stripe.com&size=256",
    "website": "https://stripe.com"
  },
  {
    "_id": "6ad5750b2b480763440f2136",
    "name": "Airbnb",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:17:00.000Z",
    "updatedAt": "2026-10-19T02:17:00.000Z",
    "__v": 0,
    "description": "Online marketplace for short- and long-term homestays and travel experiences.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://airbnb.com&size=256",
    "website": "https://www.airbnb.com"
  },
  {
    "_id": "6ad5750b2b480763440f2137",
    "name": "PayPal",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:18:00.000Z",
    "updatedAt": "2026-10-19T02:18:00.000Z",
    "__v": 0,
    "description": "Global online payments system supporting online money transfers and fraud detection.",
    "location": "Chennai",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://paypal.com&size=256",
    "website": "https://www.paypal.com"
  },
  {
    "_id": "6ad5750b2b480763440f2138",
    "name": "LinkedIn",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:19:00.000Z",
    "updatedAt": "2026-10-19T02:19:00.000Z",
    "__v": 0,
    "description": "Business and employment-focused social media platform and distributed graph creator (Kafka).",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://linkedin.com&size=256",
    "website": "https://www.linkedin.com"
  },
  {
    "_id": "6ad5750b2b480763440f2139",
    "name": "GitHub",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:20:00.000Z",
    "updatedAt": "2026-10-19T02:20:00.000Z",
    "__v": 0,
    "description": "AI-powered developer platform to build, scale, and deliver secure software using Git and Copilot.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://github.com&size=256",
    "website": "https://github.com"
  },
  {
    "_id": "6ad5750b2b480763440f213a",
    "name": "GitLab",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:21:00.000Z",
    "updatedAt": "2026-10-19T02:21:00.000Z",
    "__v": 0,
    "description": "Comprehensive DevSecOps platform delivered as a single application for CI/CD automation.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gitlab.com&size=256",
    "website": "https://about.gitlab.com"
  },
  {
    "_id": "6ad5750b2b480763440f213b",
    "name": "Docker",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:22:00.000Z",
    "updatedAt": "2026-10-19T02:22:00.000Z",
    "__v": 0,
    "description": "Containerization platform helping developers build, share, and run cloud-native applications.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://docker.com&size=256",
    "website": "https://www.docker.com"
  },
  {
    "_id": "6ad5750b2b480763440f213c",
    "name": "MongoDB",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:23:00.000Z",
    "updatedAt": "2026-10-19T02:23:00.000Z",
    "__v": 0,
    "description": "Creator of the leading modern, general-purpose NoSQL document database and Atlas cloud.",
    "location": "Gurgaon",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mongodb.com&size=256",
    "website": "https://www.mongodb.com"
  },
  {
    "_id": "6ad5750b2b480763440f213d",
    "name": "Cloudflare",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:24:00.000Z",
    "updatedAt": "2026-10-19T02:24:00.000Z",
    "__v": 0,
    "description": "Global edge network, DDoS mitigation, CDN, DNS, and serverless Workers platform.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cloudflare.com&size=256",
    "website": "https://www.cloudflare.com"
  },
  {
    "_id": "6ad5750b2b480763440f213e",
    "name": "Vercel",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:25:00.000Z",
    "updatedAt": "2026-10-19T02:25:00.000Z",
    "__v": 0,
    "description": "Frontend cloud platform and creators of Next.js, enabling instant web deployment and edge functions.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vercel.com&size=256",
    "website": "https://vercel.com"
  },
  {
    "_id": "6ad5750b2b480763440f213f",
    "name": "Supabase",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:26:00.000Z",
    "updatedAt": "2026-10-19T02:26:00.000Z",
    "__v": 0,
    "description": "Open-source Firebase alternative providing Postgres database, authentication, and real-time APIs.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://supabase.com&size=256",
    "website": "https://supabase.com"
  },
  {
    "_id": "6ad5750b2b480763440f2140",
    "name": "Figma",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:27:00.000Z",
    "updatedAt": "2026-10-19T02:27:00.000Z",
    "__v": 0,
    "description": "Collaborative browser-based interface design tool built with WebGL, WASM, and C++.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://figma.com&size=256",
    "website": "https://www.figma.com"
  },
  {
    "_id": "6ad5750b2b480763440f2141",
    "name": "Notion",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:28:00.000Z",
    "updatedAt": "2026-10-19T02:28:00.000Z",
    "__v": 0,
    "description": "Connected workspace for wikis, docs, project management, and AI-powered productivity.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://notion.so&size=256",
    "website": "https://www.notion.so"
  },
  {
    "_id": "6ad5750b2b480763440f2142",
    "name": "Canva",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:29:00.000Z",
    "updatedAt": "2026-10-19T02:29:00.000Z",
    "__v": 0,
    "description": "Online graphic design and visual communication platform empowering the world to design.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://canva.com&size=256",
    "website": "https://www.canva.com"
  },
  {
    "_id": "6ad5750b2b480763440f2143",
    "name": "Slack",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:30:00.000Z",
    "updatedAt": "2026-10-19T02:30:00.000Z",
    "__v": 0,
    "description": "Channel-based messaging platform and enterprise collaboration hub for engineering teams.",
    "location": "Pune",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://slack.com&size=256",
    "website": "https://slack.com"
  },
  {
    "_id": "6ad5750b2b480763440f2144",
    "name": "Discord",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:31:00.000Z",
    "updatedAt": "2026-10-19T02:31:00.000Z",
    "__v": 0,
    "description": "Real-time voice, video, and text communication service built on Rust, Elixir, and React.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://discord.com&size=256",
    "website": "https://discord.com"
  },
  {
    "_id": "6ad5750b2b480763440f2145",
    "name": "Zoom",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:32:00.000Z",
    "updatedAt": "2026-10-19T02:32:00.000Z",
    "__v": 0,
    "description": "Unified communications platform offering low-latency video conferencing and WebRTC solutions.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://zoom.us&size=256",
    "website": "https://zoom.us"
  },
  {
    "_id": "6ad5750b2b480763440f2146",
    "name": "Shopify",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:33:00.000Z",
    "updatedAt": "2026-10-19T02:33:00.000Z",
    "__v": 0,
    "description": "Global commerce company providing internet infrastructure for e-commerce and point-of-sale.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://shopify.com&size=256",
    "website": "https://www.shopify.com"
  },
  {
    "_id": "6ad5750b2b480763440f2147",
    "name": "Twilio",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:34:00.000Z",
    "updatedAt": "2026-10-19T02:34:00.000Z",
    "__v": 0,
    "description": "Cloud communications platform as a service enabling programmable SMS, voice, and video APIs.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://twilio.com&size=256",
    "website": "https://www.twilio.com"
  },
  {
    "_id": "6ad5750b2b480763440f2148",
    "name": "Datadog",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:35:00.000Z",
    "updatedAt": "2026-10-19T02:35:00.000Z",
    "__v": 0,
    "description": "Observability and security monitoring service for cloud-scale applications and servers.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://datadoghq.com&size=256",
    "website": "https://www.datadoghq.com"
  },
  {
    "_id": "6ad5750b2b480763440f2149",
    "name": "Snowflake",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:36:00.000Z",
    "updatedAt": "2026-10-19T02:36:00.000Z",
    "__v": 0,
    "description": "AI Data Cloud company enabling data warehousing, data lakes, and distributed analytics.",
    "location": "Pune",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://snowflake.com&size=256",
    "website": "https://www.snowflake.com"
  },
  {
    "_id": "6ad5750b2b480763440f214a",
    "name": "Databricks",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:37:00.000Z",
    "updatedAt": "2026-10-19T02:37:00.000Z",
    "__v": 0,
    "description": "Data and AI company behind Apache Spark, Delta Lake, and the Lakehouse architecture.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://databricks.com&size=256",
    "website": "https://www.databricks.com"
  },
  {
    "_id": "6ad5750b2b480763440f214b",
    "name": "Palantir",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:38:00.000Z",
    "updatedAt": "2026-10-19T02:38:00.000Z",
    "__v": 0,
    "description": "Builds enterprise data operating systems and AI decision platforms for defense and industry.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://palantir.com&size=256",
    "website": "https://www.palantir.com"
  },
  {
    "_id": "6ad5750b2b480763440f214c",
    "name": "OpenAI",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:39:00.000Z",
    "updatedAt": "2026-10-19T02:39:00.000Z",
    "__v": 0,
    "description": "AI research and deployment company building frontier large language models and multimodal systems.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://openai.com&size=256",
    "website": "https://openai.com"
  },
  {
    "_id": "6ad5750b2b480763440f214d",
    "name": "Anthropic",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:40:00.000Z",
    "updatedAt": "2026-10-19T02:40:00.000Z",
    "__v": 0,
    "description": "AI safety and research company building reliable, interpretable, and steerable AI systems.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://anthropic.com&size=256",
    "website": "https://www.anthropic.com"
  },
  {
    "_id": "6ad5750b2b480763440f214e",
    "name": "Cohere",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:41:00.000Z",
    "updatedAt": "2026-10-19T02:41:00.000Z",
    "__v": 0,
    "description": "Enterprise AI platform providing large language models, embeddings, and RAG search models.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cohere.com&size=256",
    "website": "https://cohere.com"
  },
  {
    "_id": "6ad5750b2b480763440f214f",
    "name": "Hugging Face",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:42:00.000Z",
    "updatedAt": "2026-10-19T02:42:00.000Z",
    "__v": 0,
    "description": "Open-source machine learning community and hub for sharing models, datasets, and demos.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://huggingface.co&size=256",
    "website": "https://huggingface.co"
  },
  {
    "_id": "6ad5750b2b480763440f2150",
    "name": "Broadcom",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:43:00.000Z",
    "updatedAt": "2026-10-19T02:43:00.000Z",
    "__v": 0,
    "description": "Global semiconductor and infrastructure software leader in networking chips, PCIe, and VMware.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://broadcom.com&size=256",
    "website": "https://www.broadcom.com"
  },
  {
    "_id": "6ad5750b2b480763440f2151",
    "name": "ARM",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:44:00.000Z",
    "updatedAt": "2026-10-19T02:44:00.000Z",
    "__v": 0,
    "description": "Architects energy-efficient RISC CPU cores (Cortex) powering smartphones, IoT, and servers.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://arm.com&size=256",
    "website": "https://www.arm.com"
  },
  {
    "_id": "6ad5750b2b480763440f2152",
    "name": "STMicroelectronics",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:45:00.000Z",
    "updatedAt": "2026-10-19T02:45:00.000Z",
    "__v": 0,
    "description": "Global semiconductor leader creating STM32 microcontrollers, MEMS sensors, and power MOSFETs.",
    "location": "Greater Noida",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://st.com&size=256",
    "website": "https://www.st.com"
  },
  {
    "_id": "6ad5750b2b480763440f2153",
    "name": "NXP Semiconductors",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:46:00.000Z",
    "updatedAt": "2026-10-19T02:46:00.000Z",
    "__v": 0,
    "description": "Designs automotive microcontrollers, radar processors, NFC chips, and embedded security.",
    "location": "Noida",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nxp.com&size=256",
    "website": "https://www.nxp.com"
  },
  {
    "_id": "6ad5750b2b480763440f2154",
    "name": "Infineon Technologies",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:47:00.000Z",
    "updatedAt": "2026-10-19T02:47:00.000Z",
    "__v": 0,
    "description": "World leader in power electronics, automotive semiconductors, SiC/GaN MOSFETs, and PSoC MCUs.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://infineon.com&size=256",
    "website": "https://www.infineon.com"
  },
  {
    "_id": "6ad5750b2b480763440f2155",
    "name": "Analog Devices",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:48:00.000Z",
    "updatedAt": "2026-10-19T02:48:00.000Z",
    "__v": 0,
    "description": "Specializes in data conversion (ADC/DAC), analog-to-digital signal processing, and RF ICs.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://analog.com&size=256",
    "website": "https://www.analog.com"
  },
  {
    "_id": "6ad5750b2b480763440f2156",
    "name": "Microchip Technology",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:49:00.000Z",
    "updatedAt": "2026-10-19T02:49:00.000Z",
    "__v": 0,
    "description": "Leading provider of PIC and AVR microcontrollers, mixed-signal, analog, and Flash-IP solutions.",
    "location": "Chennai",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://microchip.com&size=256",
    "website": "https://www.microchip.com"
  },
  {
    "_id": "6ad5750b2b480763440f2157",
    "name": "Micron Technology",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:50:00.000Z",
    "updatedAt": "2026-10-19T02:50:00.000Z",
    "__v": 0,
    "description": "Produces computer memory and computer data storage including DRAM, HBM, and NAND flash memory.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://micron.com&size=256",
    "website": "https://www.micron.com"
  },
  {
    "_id": "6ad5750b2b480763440f2158",
    "name": "Western Digital",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:51:00.000Z",
    "updatedAt": "2026-10-19T02:51:00.000Z",
    "__v": 0,
    "description": "Designs NVMe SSD controllers, RISC-V cores, flash storage systems, and data center drives.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://westerndigital.com&size=256",
    "website": "https://www.westerndigital.com"
  },
  {
    "_id": "6ad5750b2b480763440f2159",
    "name": "Synopsys",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:52:00.000Z",
    "updatedAt": "2026-10-19T02:52:00.000Z",
    "__v": 0,
    "description": "Silicon-to-software partner providing Electronic Design Automation (EDA), RTL synthesis, and IP.",
    "location": "Noida",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://synopsys.com&size=256",
    "website": "https://www.synopsys.com"
  },
  {
    "_id": "6ad5750b2b480763440f215a",
    "name": "Cadence Design Systems",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:53:00.000Z",
    "updatedAt": "2026-10-19T02:53:00.000Z",
    "__v": 0,
    "description": "Develops Virtuoso and Genus EDA software, hardware emulators, and VLSI circuit design tools.",
    "location": "Noida",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cadence.com&size=256",
    "website": "https://www.cadence.com"
  },
  {
    "_id": "6ad5750b2b480763440f215b",
    "name": "Siemens EDA",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:54:00.000Z",
    "updatedAt": "2026-10-19T02:54:00.000Z",
    "__v": 0,
    "description": "Provides Questa verification, Calibre physical verification, and IC design automation software.",
    "location": "Noida",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://siemens.com&size=256",
    "website": "https://eda.sw.siemens.com"
  },
  {
    "_id": "6ad5750b2b480763440f215c",
    "name": "MediaTek",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:55:00.000Z",
    "updatedAt": "2026-10-19T02:55:00.000Z",
    "__v": 0,
    "description": "Fabless semiconductor company designing Dimensity 5G SoCs, Wi-Fi 7 chips, and Smart TV processors.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mediatek.com&size=256",
    "website": "https://www.mediatek.com"
  },
  {
    "_id": "6ad5750b2b480763440f215d",
    "name": "Marvell Technology",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:56:00.000Z",
    "updatedAt": "2026-10-19T02:56:00.000Z",
    "__v": 0,
    "description": "Develops data infrastructure semiconductors, custom AI ASICs, and optical interconnects.",
    "location": "Pune",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://marvell.com&size=256",
    "website": "https://www.marvell.com"
  },
  {
    "_id": "6ad5750b2b480763440f215e",
    "name": "Renesas Electronics",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:57:00.000Z",
    "updatedAt": "2026-10-19T02:57:00.000Z",
    "__v": 0,
    "description": "Premier supplier of automotive microcontrollers, embedded SoCs, analog, and power devices.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://renesas.com&size=256",
    "website": "https://www.renesas.com"
  },
  {
    "_id": "6ad5750b2b480763440f215f",
    "name": "Espressif Systems",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:58:00.000Z",
    "updatedAt": "2026-10-19T02:58:00.000Z",
    "__v": 0,
    "description": "Creators of the ESP8266 and ESP32 series of Wi-Fi and Bluetooth IoT microcontrollers and RTOS SDKs.",
    "location": "Pune",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://espressif.com&size=256",
    "website": "https://www.espressif.com"
  },
  {
    "_id": "6ad5750b2b480763440f2160",
    "name": "Nordic Semiconductor",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T02:59:00.000Z",
    "updatedAt": "2026-10-19T02:59:00.000Z",
    "__v": 0,
    "description": "Fabless semiconductor company specializing in ultra-low-power Bluetooth Low Energy (nRF52/nRF53) SoCs.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nordicsemi.com&size=256",
    "website": "https://www.nordicsemi.com"
  },
  {
    "_id": "6ad5750b2b480763440f2161",
    "name": "Silicon Labs",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:00:00.000Z",
    "updatedAt": "2026-10-19T03:00:00.000Z",
    "__v": 0,
    "description": "Leader in secure, intelligent wireless technology (Zigbee, Matter, Thread) for the connected world.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://silabs.com&size=256",
    "website": "https://www.silabs.com"
  },
  {
    "_id": "6ad5750b2b480763440f2162",
    "name": "Applied Materials",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:01:00.000Z",
    "updatedAt": "2026-10-19T03:01:00.000Z",
    "__v": 0,
    "description": "Materials engineering solutions used to produce virtually every new semiconductor chip and display.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://appliedmaterials.com&size=256",
    "website": "https://www.appliedmaterials.com"
  },
  {
    "_id": "6ad5750b2b480763440f2163",
    "name": "ASML",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:02:00.000Z",
    "updatedAt": "2026-10-19T03:02:00.000Z",
    "__v": 0,
    "description": "World's sole supplier of extreme ultraviolet (EUV) photolithography machines for sub-3nm chips.",
    "location": "Remote",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://asml.com&size=256",
    "website": "https://www.asml.com"
  },
  {
    "_id": "6ad5750b2b480763440f2164",
    "name": "TSMC",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:03:00.000Z",
    "updatedAt": "2026-10-19T03:03:00.000Z",
    "__v": 0,
    "description": "World's largest dedicated independent semiconductor foundry manufacturing advanced FinFET and GAA chips.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://tsmc.com&size=256",
    "website": "https://www.tsmc.com"
  },
  {
    "_id": "6ad5750b2b480763440f2165",
    "name": "Keysight Technologies",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:04:00.000Z",
    "updatedAt": "2026-10-19T03:04:00.000Z",
    "__v": 0,
    "description": "Manufactures electronic test and measurement equipment, oscilloscopes, and RF simulation software.",
    "location": "Gurgaon",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://keysight.com&size=256",
    "website": "https://www.keysight.com"
  },
  {
    "_id": "6ad5750b2b480763440f2166",
    "name": "National Instruments",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:05:00.000Z",
    "updatedAt": "2026-10-19T03:05:00.000Z",
    "__v": 0,
    "description": "Producer of automated test equipment, data acquisition hardware, and LabVIEW virtual instrumentation.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ni.com&size=256",
    "website": "https://www.ni.com"
  },
  {
    "_id": "6ad5750b2b480763440f2167",
    "name": "MathWorks",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:06:00.000Z",
    "updatedAt": "2026-10-19T03:06:00.000Z",
    "__v": 0,
    "description": "Creators of MATLAB and Simulink for technical computing, control systems, and signal processing.",
    "location": "Hyderabad",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mathworks.com&size=256",
    "website": "https://www.mathworks.com"
  },
  {
    "_id": "6ad5750b2b480763440f2168",
    "name": "Bosch Global Software",
    "userId": ["6ad54a8e2d08816c074e899f"],
    "createdAt": "2026-10-19T03:07:00.000Z",
    "updatedAt": "2026-10-19T03:07:00.000Z",
    "__v": 0,
    "description": "Develops automotive ECU firmware, AUTOSAR, ADAS sensors, and industrial IoT solutions.",
    "location": "Bangalore",
    "logo": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://bosch.com&size=256",
    "website": "https://www.bosch-softwaretechnologies.com"
  }
];

let insertedCount = 0;
let modifiedCount = 0;

for (const item of rawData) {
  const companyDoc = {
    _id: new mongoose.Types.ObjectId(item._id),
    name: item.name,
    userId: item.userId.map(id => new mongoose.Types.ObjectId(id)),
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
    __v: item.__v,
    description: item.description,
    location: item.location,
    logo: item.logo,
    website: item.website
  };

  const result = await companiesCollection.updateOne(
    { _id: companyDoc._id },
    { $set: companyDoc },
    { upsert: true }
  );

  if (result.upsertedCount > 0) insertedCount++;
  else if (result.modifiedCount > 0) modifiedCount++;
}

console.log(`✅ Upserted ${rawData.length} additional companies successfully (${insertedCount} new, ${modifiedCount} updated)!`);

await mongoose.disconnect();
console.log("🔌 Disconnected from MongoDB");
process.exit(0);
