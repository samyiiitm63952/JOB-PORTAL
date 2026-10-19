import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("✅ Connected to MongoDB");

const db = mongoose.connection.db;
const companiesCollection = db.collection("companies");

const companies = [
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2101'),
    name: 'Google',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:40:27.574Z'),
    updatedAt: new Date('2026-10-19T01:42:51.999Z'),
    __v: 0,
    description: 'Global technology leader specializing in search engine technology, cloud computing, and AI.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://google.com&size=256',
    website: 'https://www.google.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2102'),
    name: 'Microsoft',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:41:00.000Z'),
    updatedAt: new Date('2026-10-19T01:43:00.000Z'),
    __v: 0,
    description: 'Develops, manufactures, licenses, supports, and sells computer software, Azure cloud, and electronics.',
    location: 'Hyderabad',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://microsoft.com&size=256',
    website: 'https://www.microsoft.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2103'),
    name: 'Amazon',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:42:00.000Z'),
    updatedAt: new Date('2026-10-19T01:44:00.000Z'),
    __v: 0,
    description: 'Multinational technology company focusing on e-commerce, AWS cloud computing, and digital streaming.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://amazon.com&size=256',
    website: 'https://www.amazon.jobs'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2104'),
    name: 'Flipkart',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:43:00.000Z'),
    updatedAt: new Date('2026-10-19T01:45:00.000Z'),
    __v: 0,
    description: 'Leading Indian e-commerce marketplace offering electronics, fashion, and supply chain innovation.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://flipkart.com&size=256',
    website: 'https://www.flipkartcareers.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2105'),
    name: 'Razorpay',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:44:00.000Z'),
    updatedAt: new Date('2026-10-19T01:46:00.000Z'),
    __v: 0,
    description: 'Full-stack financial solutions company enabling businesses to accept, process, and disburse payments.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://razorpay.com&size=256',
    website: 'https://razorpay.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2106'),
    name: 'Zomato',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:45:00.000Z'),
    updatedAt: new Date('2026-10-19T01:47:00.000Z'),
    __v: 0,
    description: 'Indian multinational restaurant aggregator and quick-commerce food delivery company.',
    location: 'Gurgaon',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://zomato.com&size=256',
    website: 'https://www.zomato.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2107'),
    name: 'Swiggy',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:46:00.000Z'),
    updatedAt: new Date('2026-10-19T01:48:00.000Z'),
    __v: 0,
    description: 'On-demand convenience platform providing food delivery and Instamart grocery services.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://swiggy.com&size=256',
    website: 'https://www.swiggy.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2108'),
    name: 'Qualcomm',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:47:00.000Z'),
    updatedAt: new Date('2026-10-19T01:49:00.000Z'),
    __v: 0,
    description: 'Pioneer in 5G, Snapdragon processors, embedded systems, and wireless semiconductor technology.',
    location: 'Hyderabad',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://qualcomm.com&size=256',
    website: 'https://www.qualcomm.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2109'),
    name: 'Texas Instruments',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:48:00.000Z'),
    updatedAt: new Date('2026-10-19T01:50:00.000Z'),
    __v: 0,
    description: 'Designs and manufactures analog semiconductors, embedded processors, and microcontrollers.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ti.com&size=256',
    website: 'https://www.ti.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2110'),
    name: 'NVIDIA',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:49:00.000Z'),
    updatedAt: new Date('2026-10-19T01:51:00.000Z'),
    __v: 0,
    description: 'World leader in GPU architecture, accelerated computing, hardware verification, and AI hardware.',
    location: 'Pune',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nvidia.com&size=256',
    website: 'https://www.nvidia.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2111'),
    name: 'AMD',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:50:00.000Z'),
    updatedAt: new Date('2026-10-19T01:52:00.000Z'),
    __v: 0,
    description: 'High-performance computing, graphics, FPGA (Xilinx), and VLSI semiconductor design innovator.',
    location: 'Hyderabad',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://amd.com&size=256',
    website: 'https://www.amd.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2112'),
    name: 'Atlassian',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:51:00.000Z'),
    updatedAt: new Date('2026-10-19T01:53:00.000Z'),
    __v: 0,
    description: 'Collaboration and developer productivity software company behind Jira, Confluence, and Bitbucket.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://atlassian.com&size=256',
    website: 'https://www.atlassian.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2113'),
    name: 'Postman',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:52:00.000Z'),
    updatedAt: new Date('2026-10-19T01:54:00.000Z'),
    __v: 0,
    description: 'The world\'s leading API platform for building, testing, documenting, and scaling APIs.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://postman.com&size=256',
    website: 'https://www.postman.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2114'),
    name: 'CRED',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:53:00.000Z'),
    updatedAt: new Date('2026-10-19T01:55:00.000Z'),
    __v: 0,
    description: 'High-trust fintech community rewarding creditworthy individuals for timely credit card bill payments.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cred.club&size=256',
    website: 'https://cred.club'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2115'),
    name: 'PhonePe',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:54:00.000Z'),
    updatedAt: new Date('2026-10-19T01:56:00.000Z'),
    __v: 0,
    description: 'Digital payments and financial technology company driving UPI transactions at massive scale.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://phonepe.com&size=256',
    website: 'https://www.phonepe.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2116'),
    name: 'Paytm',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:55:00.000Z'),
    updatedAt: new Date('2026-10-19T01:57:00.000Z'),
    __v: 0,
    description: 'Indian multinational financial technology company specializing in digital payments and commerce.',
    location: 'Noida',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://paytm.com&size=256',
    website: 'https://paytm.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2117'),
    name: 'Zerodha',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:56:00.000Z'),
    updatedAt: new Date('2026-10-19T01:58:00.000Z'),
    __v: 0,
    description: 'India\'s largest stockbroker offering low-latency trading platforms like Kite and Coin.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://zerodha.com&size=256',
    website: 'https://zerodha.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2118'),
    name: 'Groww',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:57:00.000Z'),
    updatedAt: new Date('2026-10-19T01:59:00.000Z'),
    __v: 0,
    description: 'Next-generation investment platform making stocks, mutual funds, and ETFs accessible.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://groww.in&size=256',
    website: 'https://groww.in'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2119'),
    name: 'Zoho',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:58:00.000Z'),
    updatedAt: new Date('2026-10-19T02:00:00.000Z'),
    __v: 0,
    description: 'Multinational technology company that makes web-based business tools and cloud CRM suites.',
    location: 'Chennai',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://zoho.com&size=256',
    website: 'https://www.zoho.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2120'),
    name: 'Freshworks',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T01:59:00.000Z'),
    updatedAt: new Date('2026-10-19T02:01:00.000Z'),
    __v: 0,
    description: 'Cloud-based customer service, IT service management, and CRM software provider.',
    location: 'Chennai',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://freshworks.com&size=256',
    website: 'https://www.freshworks.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2121'),
    name: 'Adobe',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:00:00.000Z'),
    updatedAt: new Date('2026-10-19T02:02:00.000Z'),
    __v: 0,
    description: 'Global leader in digital media, generative AI creativity tools (Firefly), and marketing software.',
    location: 'Noida',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://adobe.com&size=256',
    website: 'https://www.adobe.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2122'),
    name: 'Uber',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:01:00.000Z'),
    updatedAt: new Date('2026-10-19T02:03:00.000Z'),
    __v: 0,
    description: 'Real-time ride-hailing, logistics, and distributed systems engineering at planetary scale.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://uber.com&size=256',
    website: 'https://www.uber.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2123'),
    name: 'Intel',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:02:00.000Z'),
    updatedAt: new Date('2026-10-19T02:04:00.000Z'),
    __v: 0,
    description: 'Designs and manufactures microprocessors, SoCs, and hardware acceleration platforms.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://intel.com&size=256',
    website: 'https://www.intel.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2124'),
    name: 'Samsung R&D',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:03:00.000Z'),
    updatedAt: new Date('2026-10-19T02:05:00.000Z'),
    __v: 0,
    description: 'Research and development center focusing on mobile OS, Android systems, 6G, and consumer electronics.',
    location: 'Noida',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://samsung.com&size=256',
    website: 'https://research.samsung.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2125'),
    name: 'Cisco',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:04:00.000Z'),
    updatedAt: new Date('2026-10-19T02:06:00.000Z'),
    __v: 0,
    description: 'Worldwide leader in networking hardware, cybersecurity, routing protocols, and telecommunications.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cisco.com&size=256',
    website: 'https://www.cisco.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2126'),
    name: 'Oracle',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:05:00.000Z'),
    updatedAt: new Date('2026-10-19T02:07:00.000Z'),
    __v: 0,
    description: 'Enterprise database management systems, cloud infrastructure, and enterprise resource planning.',
    location: 'Hyderabad',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://oracle.com&size=256',
    website: 'https://www.oracle.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2127'),
    name: 'Salesforce',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:06:00.000Z'),
    updatedAt: new Date('2026-10-19T02:08:00.000Z'),
    __v: 0,
    description: 'Cloud-based enterprise software company specializing in customer relationship management and AI agents.',
    location: 'Hyderabad',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://salesforce.com&size=256',
    website: 'https://www.salesforce.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2128'),
    name: 'Meesho',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:07:00.000Z'),
    updatedAt: new Date('2026-10-19T02:09:00.000Z'),
    __v: 0,
    description: 'Social e-commerce platform enabling small businesses and individuals to start online stores.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://meesho.com&size=256',
    website: 'https://www.meesho.io'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2129'),
    name: 'Ola Electric',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:08:00.000Z'),
    updatedAt: new Date('2026-10-19T02:10:00.000Z'),
    __v: 0,
    description: 'Electric two-wheeler manufacturer building EV motorcycles, battery management systems, and firmware.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://olaelectric.com&size=256',
    website: 'https://www.olaelectric.com'
  },
  {
    _id: new mongoose.Types.ObjectId('6ad5750b2b480763440f2130'),
    name: 'Ather Energy',
    userId: [new mongoose.Types.ObjectId('6ad54a8e2d08816c074e899f')],
    createdAt: new Date('2026-10-19T02:09:00.000Z'),
    updatedAt: new Date('2026-10-19T02:11:00.000Z'),
    __v: 0,
    description: 'Smart electric scooter and motorcycle manufacturer integrating IoT, embedded dashboards, and fast charging.',
    location: 'Bangalore',
    logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://atherenergy.com&size=256',
    website: 'https://www.atherenergy.com'
  }
];

// Upsert each company by _id or name to avoid duplicate key errors
let insertedCount = 0;
let modifiedCount = 0;

for (const company of companies) {
  const result = await companiesCollection.updateOne(
    { _id: company._id },
    { $set: company },
    { upsert: true }
  );
  if (result.upsertedCount > 0) insertedCount++;
  else if (result.modifiedCount > 0) modifiedCount++;
}

console.log(`✅ Upserted ${companies.length} companies successfully (${insertedCount} new, ${modifiedCount} updated)!`);

await mongoose.disconnect();
console.log("🔌 Disconnected from MongoDB");
process.exit(0);
