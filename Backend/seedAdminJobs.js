import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
console.log("✅ Connected to MongoDB");

const db = mongoose.connection.db;
const companiesCollection = db.collection("companies");
const jobsCollection = db.collection("jobs");

const recruiterId = new mongoose.Types.ObjectId("6ad54a8e2d08816c074e899f");

// Fetch companies belonging to this recruiter
const recruiterCompanies = await companiesCollection.find({ userId: recruiterId }).toArray();

if (recruiterCompanies.length === 0) {
  console.log("❌ No companies found for recruiter", recruiterId);
  process.exit(1);
}

console.log(`Found ${recruiterCompanies.length} companies for recruiter.`);

// Helper to look up company by name or fallback to index
const findCompany = (name, fallbackIndex = 0) => {
  const found = recruiterCompanies.find(c => c.name.toLowerCase() === name.toLowerCase());
  return found ? found._id : recruiterCompanies[fallbackIndex % recruiterCompanies.length]._id;
};

const jobDefinitions = [
  {
    title: "Senior Full Stack Engineer",
    companyName: "Google",
    description: "Design and implement scalable web applications using React, Node.js, and Google Cloud Platform. Work closely with cross-functional product and infrastructure teams.",
    requirements: ["React", "Node.js", "TypeScript", "GCP", "Microservices", "System Design"],
    location: "Bangalore",
    salary: 2800000,
    experience: 5,
    position: "Senior Engineer",
    jobType: "Full-time"
  },
  {
    title: "Cloud Solutions Architect",
    companyName: "Microsoft",
    description: "Architect and lead large-scale enterprise cloud transformations on Azure, ensuring reliability, high availability, and zero-trust security postures.",
    requirements: ["Azure", "Kubernetes", "Terraform", "CI/CD", "Security Architecture", "Docker"],
    location: "Hyderabad",
    salary: 3200000,
    experience: 6,
    position: "Lead Architect",
    jobType: "Full-time"
  },
  {
    title: "Backend Platform Engineer",
    companyName: "CRED",
    description: "Build ultra-low-latency financial transaction pipelines handling millions of events daily with zero margin for error.",
    requirements: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "Distributed Systems"],
    location: "Bangalore",
    salary: 2500000,
    experience: 3,
    position: "Software Engineer II",
    jobType: "Full-time"
  },
  {
    title: "Distributed Systems SDE",
    companyName: "Amazon",
    description: "Scale high-throughput fulfillment and warehouse dispatch systems powered by AWS serverless and distributed NoSQL databases.",
    requirements: ["Java", "AWS DynamoDB", "Step Functions", "Distributed Caching", "Algorithms"],
    location: "Bangalore",
    salary: 2400000,
    experience: 3,
    position: "SDE II",
    jobType: "Full-time"
  },
  {
    title: "E-Commerce Frontend Specialist",
    companyName: "Flipkart",
    description: "Craft pixel-perfect, highly responsive shopping cart and checkout experiences optimized for millions of mobile devices.",
    requirements: ["React", "Next.js", "Redux Toolkit", "Web Performance", "Tailwind CSS"],
    location: "Bangalore",
    salary: 1900000,
    experience: 3,
    position: "UI Engineer",
    jobType: "Full-time"
  },
  {
    title: "Payment Gateway Engineer",
    companyName: "Razorpay",
    description: "Develop secure payment APIs, international checkout workflows, and automated reconciliation systems.",
    requirements: ["Go", "Node.js", "MySQL", "PCI-DSS", "REST APIs", "gRPC"],
    location: "Bangalore",
    salary: 2200000,
    experience: 3,
    position: "Payment Systems Engineer",
    jobType: "Full-time"
  },
  {
    title: "Real-Time Tracking & Dispatch Engineer",
    companyName: "Swiggy",
    description: "Optimize hyper-local order routing algorithms, delivery partner batching, and live GPS tracking services.",
    requirements: ["Python", "Golang", "Kafka", "Geospatial Indexing", "Redis"],
    location: "Bangalore",
    salary: 2100000,
    experience: 2,
    position: "Backend Developer",
    jobType: "Full-time"
  },
  {
    title: "Mobile App Engineer (iOS/Android)",
    companyName: "Zomato",
    description: "Deliver buttery-smooth 60fps food discovery feeds, live order animations, and offline-first cart persistence.",
    requirements: ["React Native", "TypeScript", "Redux", "Native Modules", "App Performance"],
    location: "Gurgaon",
    salary: 1800000,
    experience: 2,
    position: "Mobile Engineer",
    jobType: "Full-time"
  },
  {
    title: "GPU Kernel Optimization Engineer",
    companyName: "NVIDIA",
    description: "Accelerate deep learning inference and high-performance computing workloads directly on CUDA cores.",
    requirements: ["C++", "CUDA", "Parallel Computing", "TensorRT", "GPU Architecture"],
    location: "Pune",
    salary: 3500000,
    experience: 4,
    position: "Compute Engineer",
    jobType: "Full-time"
  },
  {
    title: "Modem Firmware Developer",
    companyName: "Qualcomm",
    description: "Implement low-level 5G NR baseband physical layer protocols and embedded drivers for Snapdragon chipsets.",
    requirements: ["Embedded C", "5G NR", "RTOS", "ARM Cortex", "JTAG Debugging"],
    location: "Hyderabad",
    salary: 2600000,
    experience: 3,
    position: "Firmware Engineer",
    jobType: "Full-time"
  },
  {
    title: "Low-Power Mixed Signal Designer",
    companyName: "Texas Instruments",
    description: "Design analog-to-digital converters and power management ICs for automotive and industrial IoT.",
    requirements: ["Cadence Virtuoso", "SPICE", "Analog Design", "Silicon Validation"],
    location: "Bangalore",
    salary: 2300000,
    experience: 3,
    position: "Analog IC Designer",
    jobType: "Full-time"
  },
  {
    title: "SoC Verification Engineer",
    companyName: "AMD",
    description: "Verify next-gen Zen CPU core fabrics and high-bandwidth interconnects using constrained random verification.",
    requirements: ["SystemVerilog", "UVM", "Perl/Python", "Functional Coverage", "VCS"],
    location: "Hyderabad",
    salary: 2400000,
    experience: 3,
    position: "Verification Specialist",
    jobType: "Full-time"
  },
  {
    title: "DevOps & SRE Lead",
    companyName: "Atlassian",
    description: "Ensure five-nines availability and rapid incident recovery across Jira and Confluence cloud services.",
    requirements: ["AWS", "Kubernetes", "Prometheus", "Grafana", "Incident Management", "Python"],
    location: "Bangalore",
    salary: 3000000,
    experience: 5,
    position: "Senior SRE",
    jobType: "Full-time"
  },
  {
    title: "Developer Experience & API Engineer",
    companyName: "Postman",
    description: "Build cutting-edge testing, mock server, and API monitoring capabilities used by 30M+ developers worldwide.",
    requirements: ["JavaScript", "Node.js", "Electron", "OpenAPI", "WebSockets"],
    location: "Bangalore",
    salary: 2000000,
    experience: 2,
    position: "Product Engineer",
    jobType: "Full-time"
  },
  {
    title: "FinTech Security Analyst",
    companyName: "PhonePe",
    description: "Execute penetration tests, audit smart payment switches, and safeguard UPI cryptographic transaction channels.",
    requirements: ["Application Security", "OWASP", "Burp Suite", "Cryptography", "Network Security"],
    location: "Bangalore",
    salary: 2200000,
    experience: 3,
    position: "Security Analyst",
    jobType: "Full-time"
  },
  {
    title: "High-Frequency Trading Infra Developer",
    companyName: "Zerodha",
    description: "Maintain lightning-fast Kite exchange connectivity, OMS/RMS engines, and low-latency tick data feeds.",
    requirements: ["Go", "Python", "WebSockets", "Linux Tuning", "PostgreSQL"],
    location: "Bangalore",
    salary: 2600000,
    experience: 4,
    position: "Trading Systems Engineer",
    jobType: "Full-time"
  },
  {
    title: "Mutual Funds & Wealth Platform SDE",
    companyName: "Groww",
    description: "Build customer-facing investment tracking journeys, portfolio analytics, and automated KYC pipelines.",
    requirements: ["Kotlin", "Spring Boot", "Microservices", "MongoDB", "Kafka"],
    location: "Bangalore",
    salary: 2100000,
    experience: 2,
    position: "SDE I",
    jobType: "Full-time"
  },
  {
    title: "Enterprise SaaS Core Developer",
    companyName: "Zoho",
    description: "Design multi-tenant data stores, custom script engines, and real-time collaboration suites for Zoho One.",
    requirements: ["Java", "Distributed Databases", "C++", "System Architecture", "Security"],
    location: "Chennai",
    salary: 1600000,
    experience: 2,
    position: "Member Technical Staff",
    jobType: "Full-time"
  },
  {
    title: "AI-Powered Customer Experience SDE",
    companyName: "Freshworks",
    description: "Integrate generative AI bots and automated ticket routing into omni-channel customer support desks.",
    requirements: ["Ruby on Rails", "Python", "LLMs", "LangChain", "AWS"],
    location: "Chennai",
    salary: 1800000,
    experience: 3,
    position: "Senior Developer",
    jobType: "Full-time"
  },
  {
    title: "Creative Cloud Web Experience Engineer",
    companyName: "Adobe",
    description: "Empower digital creators with high-performance canvas rendering and web assembly modules in the browser.",
    requirements: ["WebAssembly", "TypeScript", "WebGL", "Canvas API", "C++"],
    location: "Noida",
    salary: 2700000,
    experience: 4,
    position: "Computer Scientist",
    jobType: "Full-time"
  },
  {
    title: "Driver-Rider Matching Systems Engineer",
    companyName: "Uber",
    description: "Solve dynamic surge pricing, graph shortest-path routing, and driver dispatch optimization under high load.",
    requirements: ["Golang", "Java", "Cassandra", "Graph Theory", "Distributed Locking"],
    location: "Hyderabad",
    salary: 3100000,
    experience: 4,
    position: "Software Engineer II",
    jobType: "Full-time"
  },
  {
    title: "Processor Performance Modeling Engineer",
    companyName: "Intel",
    description: "Build cycle-accurate CPU architectural simulators to guide silicon design choices for future server nodes.",
    requirements: ["C++", "Python", "Computer Architecture", "Gem5", "Cache Coherency"],
    location: "Bangalore",
    salary: 2500000,
    experience: 3,
    position: "Architecture Engineer",
    jobType: "Full-time"
  },
  {
    title: "Camera & Computer Vision AI Engineer",
    companyName: "Samsung R&D",
    description: "Develop on-device neural enhancement pipelines for low-light photography, portrait blur, and HDR video capture.",
    requirements: ["OpenCV", "PyTorch", "C++", "NPU Optimization", "Computer Vision"],
    location: "Noida",
    salary: 2300000,
    experience: 3,
    position: "Lead AI Researcher",
    jobType: "Full-time"
  },
  {
    title: "Enterprise SDN Network Engineer",
    companyName: "Cisco",
    description: "Program software-defined routing policies, telemetry collectors, and automated failover protocols for Catalyst series.",
    requirements: ["Python", "C", "BGP/OSPF", "SDN Controllers", "Linux Networking"],
    location: "Bangalore",
    salary: 2200000,
    experience: 3,
    position: "Network Engineer",
    jobType: "Full-time"
  },
  {
    title: "Database Kernel Storage Engineer",
    companyName: "Oracle",
    description: "Enhance transactional write-ahead logs, buffer pool management, and lock-free concurrency algorithms.",
    requirements: ["C", "C++", "OS Internals", "POSIX Threads", "Storage Engines"],
    location: "Hyderabad",
    salary: 2900000,
    experience: 4,
    position: "Principal Member of Tech Staff",
    jobType: "Full-time"
  },
  {
    title: "Apex & Lightning Web Components Lead",
    companyName: "Salesforce",
    description: "Build enterprise CRM workflows, predictive sales forecasting, and custom component libraries.",
    requirements: ["Salesforce Apex", "LWC", "JavaScript", "SOQL", "CI/CD"],
    location: "Hyderabad",
    salary: 2400000,
    experience: 4,
    position: "Technical Lead",
    jobType: "Full-time"
  },
  {
    title: "Social Commerce Growth Hacker SDE",
    companyName: "Meesho",
    description: "Drive viral customer acquisition with gamified referral loops, micro-rewards, and personalized catalog feeds.",
    requirements: ["Node.js", "React", "Kafka", "Redis", "A/B Testing"],
    location: "Bangalore",
    salary: 1900000,
    experience: 2,
    position: "Growth Engineer",
    jobType: "Full-time"
  },
  {
    title: "Battery Management Firmware Engineer",
    companyName: "Ola Electric",
    description: "Design real-time BMS state-of-charge estimators, regenerative braking controls, and CAN bus vehicle telemetry.",
    requirements: ["Embedded C", "CAN Protocol", "MATLAB/Simulink", "Battery Chemistry", "AUTOSAR"],
    location: "Bangalore",
    salary: 2100000,
    experience: 3,
    position: "BMS Engineer",
    jobType: "Full-time"
  },
  {
    title: "EV Telematics & Cloud Platform SDE",
    companyName: "Ather Energy",
    description: "Ingest live scooter telemetry streams, process predictive maintenance alerts, and power the Ather mobile companion app.",
    requirements: ["Go", "MQTT", "AWS IoT Core", "TimescaleDB", "Kubernetes"],
    location: "Bangalore",
    salary: 2000000,
    experience: 2,
    position: "IoT Cloud Engineer",
    jobType: "Full-time"
  },
  {
    title: "Swift iOS Frameworks Engineer",
    companyName: "Apple",
    description: "Build system-level iOS frameworks, privacy-preserving client telemetry, and smooth SwiftUI developer components.",
    requirements: ["Swift", "SwiftUI", "Objective-C", "CoreData", "Metal API"],
    location: "Hyderabad",
    salary: 3400000,
    experience: 4,
    position: "Software Engineer",
    jobType: "Full-time"
  }
];

const jobsToInsert = jobDefinitions.map((job, index) => {
  const companyId = findCompany(job.companyName, index);
  return {
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    location: job.location,
    salary: job.salary,
    experience: job.experience,
    company: companyId,
    position: job.position,
    jobType: job.jobType,
    created_by: recruiterId,
    application: [],
    createdAt: new Date(Date.now() - (30 - index) * 3600000 * 4), // Staggered over recent days
    updatedAt: new Date(Date.now() - (30 - index) * 3600000 * 4)
  };
});

const result = await jobsCollection.insertMany(jobsToInsert);
console.log(`🎉 Successfully inserted ${result.insertedCount} jobs created by recruiter ${recruiterId}!`);

await mongoose.disconnect();
console.log("🔌 Disconnected from MongoDB");
process.exit(0);
