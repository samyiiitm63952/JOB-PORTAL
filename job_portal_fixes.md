# 🛠️ Job Portal — Bug Fixes & Improvements

All issues found during the Q&A review session. Fix these one by one!

---

## 🔴 CRITICAL (Security / Data Loss)

---

### FIX 1 — `postJob`: Company can only post ONE job ever
**File:** [`job.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/job.controller.js#L13-L19)

**Problem:** `Job.findOne({ company: companyId })` blocks a company from ever posting a second job.

```js
// ❌ Current — wrong logic
let newJob = await Job.findOne({ company: companyId })
if (newJob) {
    return res.status(404).json({ message: "Job is already posted" })
}
```

```js
// ✅ Fix — check by title + company to avoid duplicate listings
let existingJob = await Job.findOne({ company: companyId, title: title })
if (existingJob) {
    return res.status(400).json({ message: "This job title is already posted for this company" })
}
```

---

### FIX 2 — `CORS`: All origins allowed with credentials
**File:** [`index.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/index.js#L15-L18)

**Problem:** `origin: true` mirrors any Origin header — malicious websites can make credentialed requests using a user's cookies (CSRF risk).

```js
// ❌ Current
const corsOptions = {
    origin: true,
    credentials: true,
}
```

```js
// ✅ Fix — whitelist only your frontend URL
const corsOptions = {
    origin: "http://localhost:5173", // change to your production URL
    credentials: true,
}
```

---

### FIX 3 — `updateCompany`: No ownership check (Authorization hole)
**File:** [`company.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/company.controller.js#L66-L86)

**Problem:** Any authenticated user (even a Student) can update ANY company if they know the company's ID.

```js
// ✅ Fix — add ownership check before updating
const company = await Company.findById(req.params.id);
if (!company) return res.status(404).json({ message: "Company not found" });

const isOwner = company.userId.some(id => id.toString() === req.id);
if (!isOwner) {
    return res.status(403).json({ message: "You are not authorized to update this company" });
}
// then proceed with findByIdAndUpdate...
```

---

### FIX 4 — `getApplicants`: Applicant password exposed
**File:** [`application.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/application.controller.js#L82-L86)

**Problem:** Nested `.populate('applicant')` returns the full User document including the **hashed password** to the recruiter.

```js
// ❌ Current
populate: { path: "applicant" }
```

```js
// ✅ Fix — exclude password field
populate: { path: "applicant", select: "-password" }
```

---

### FIX 5 — `applyjob` route uses GET instead of POST
**File:** [`application.route.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/routes/application.route.js#L9)

**Problem:** Applying for a job creates a new document in DB — this is a write operation and must use POST, not GET.

```js
// ❌ Current
router.route("/apply/:id").get(authenticateToken, applyjob);

// ✅ Fix
router.route("/apply/:id").post(authenticateToken, applyjob);
```

---

## 🟠 HIGH (Broken Behavior)

---

### FIX 6 — `registerCompany`: Missing `await` on `.save()`
**File:** [`company.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/company.controller.js#L22)

**Problem:** `newCompany.save()` runs in the background. If the DB write fails, the client still gets a 201 success response.

```js
// ❌ Current
newCompany.save();

// ✅ Fix
await newCompany.save();
```

---

### FIX 7 — `company.controller.js`: All catch blocks have no response
**File:** [`company.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/company.controller.js)

**Problem:** Every `catch` block only logs the error but never sends a response. The HTTP request hangs forever and the client times out.

```js
// ❌ Current (in registerCompany, getAllCompanies, getcompanyById, updateCompany)
catch(err) {
    console.error(err);
    // ← NO response sent! Client hangs.
}

// ✅ Fix — add this to every catch block
catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", success: false });
}
```

---

### FIX 8 — `connectDB()` called AFTER server starts listening
**File:** [`index.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/index.js#L41-L44)

**Problem:** `connectDB()` is inside the `app.listen()` callback — the server accepts requests BEFORE the database is connected.

```js
// ❌ Current
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});

// ✅ Fix — connect DB first, then start server
await connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

> [!NOTE]
> This requires your entry `index.js` to be wrapped in a top-level `async` function or use top-level `await` (supported in ES modules).

---

### FIX 9 — `updateProfile`: No duplicate email check
**File:** [`user.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/user.controller.js#L153-L155)

**Problem:** A user can change their email to one that's already taken, causing a MongoDB duplicate key error (unhandled crash).

```js
// ✅ Fix — check for existing email before updating
if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: "Email already in use", success: false });
    }
    user.email = email;
}
```

---

### FIX 10 — `Login.jsx`: User data not stored in Redux after login
**File:** [`Login.jsx`](file:///c:/Users/samad/Downloads/JOB PORTAL/Frontend/src/components/authentication/Login.jsx#L41-L44) | [`authSlice.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Frontend/src/redux/authSlice.js)

**Problem:** The API returns user data (name, email, role, profile) on login, but it's never saved to Redux. On page refresh, the app doesn't know who is logged in.

```js
// ✅ Step 1 — Add user state to authSlice.js
const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,       // ← ADD THIS
    },
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload; },
        setUser: (state, action) => { state.user = action.payload; }, // ← ADD THIS
    }
})
export const { setLoading, setUser } = authSlice.actions;

// ✅ Step 2 — Dispatch setUser in Login.jsx after successful login
if (res.data.success) {
    dispatch(setUser(res.data.user)); // ← ADD THIS
    navigate("/");
    toast.success(res.data.message);
}
```

---

### FIX 11 — `Login.jsx`: RadioGroup `defaultValue` conflict
**File:** [`Login.jsx`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Frontend/src/components/authentication/Login.jsx#L70)

**Problem:** `defaultValue="comfortable"` sets an invalid uncontrolled state that conflicts with the controlled `checked` prop on radio inputs.

```jsx
// ❌ Current
<RadioGroup defaultValue="comfortable" ...>

// ✅ Fix
<RadioGroup value={input.role} onValueChange={(val) => setInput({ ...input, role: val })}>
    <RadioGroupItem value="Student" id="r1" />
    <Label htmlFor="r1">Student</Label>
    <RadioGroupItem value="Recruiter" id="r2" />
    <Label htmlFor="r2">Recruiter</Label>
</RadioGroup>
```

---

## 🟡 MEDIUM (Validation & Edge Cases)

---

### FIX 12 — `postJob`: Wrong HTTP status codes used for server errors
**File:** [`job.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/job.controller.js) | Same issue in all controllers

**Problem:** Server-side errors return `res.status(404)` — 404 means "Not Found", not "Server Error".

```js
// ❌ Current (in catch blocks)
return res.status(404).json({ message: "Server error" })

// ✅ Fix
return res.status(500).json({ message: "Server error", success: false })
```

> [!TIP]
> Quick reference — use the right status codes:
> - `400` — Bad Request (missing/invalid input from client)
> - `401` — Unauthorized (no/invalid token)
> - `403` — Forbidden (valid token but wrong role/permission)
> - `404` — Not Found (resource doesn't exist)
> - `500` — Internal Server Error (unexpected server failure)

---

### FIX 13 — `postJob`: Salary validation doesn't catch non-numeric strings
**File:** [`job.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/job.controller.js#L24)

**Problem:** `Number('50k')` returns `NaN`. This passes the `!salary` check but causes a Mongoose CastError at `Job.create()`.

```js
// ✅ Fix — validate salary is a valid number before using it
const parsedSalary = Number(salary);
if (isNaN(parsedSalary) || parsedSalary < 0) {
    return res.status(400).json({ message: "Salary must be a valid positive number", success: false });
}
// then use parsedSalary in Job.create()
```

---

### FIX 14 — `job.model.js`: No minimum validation on salary
**File:** [`job.model.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/models/job.model.js#L18-L21)

**Problem:** `salary: { type: Number, required: true }` allows negative values like `-999999`.

```js
// ✅ Fix — add min validation
salary: {
    type: Number,
    required: true,
    min: [0, "Salary cannot be negative"]
},
experience: {
    type: Number,
    required: true,
    min: [0, "Experience cannot be negative"]
}
```

---

### FIX 15 — `multer.memoryStorage()`: No file size limit
**File:** [`multer.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/middleware/multer.js)

**Problem:** Large file uploads (e.g. 50MB PDFs) sit entirely in Node.js RAM, potentially crashing the server under load.

```js
// ❌ Current
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");

// ✅ Fix — add file size limit and type filter
export const singleUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowed = ["application/pdf", "image/jpeg", "image/png"];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Only PDF, JPG, PNG files are allowed"), false);
    }
}).single("file");
```

---

### FIX 16 — `updateProfile`: Cloudinary upload not implemented
**File:** [`user.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/user.controller.js#L134)

**Problem:** There's a comment `//cloudinary upload` but no actual implementation — profile photos and resumes are never saved.

```js
// ✅ Fix — add Cloudinary upload logic
import cloudinary from "../utils/cloudinary.js"; // set up cloudinary config separately

if (file) {
    const fileUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    if (req.body.uploadType === "resume") {
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalname = file.originalname;
    } else {
        user.profile.profilePhoto = cloudResponse.secure_url;
    }
}
```

---

## 🟢 LOW (Code Quality)

---

### FIX 17 — `isAuthenticated.js`: Dead code — `if(!decoded)` never runs
**File:** [`isAuthenticated.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/middleware/isAuthenticated.js#L14-L17)

**Problem:** `jwt.verify()` either returns the payload OR throws. It never returns `null`, so the `if(!decoded)` block is unreachable dead code.

```js
// ❌ Remove this dead code
const decoded = await jwt.verify(token, process.env.JWT_SECRET);
if (!decoded) {
    return res.status(401).json({ message: "Server" }); // ← never runs
}

// ✅ The catch block already handles invalid tokens — just keep:
req.id = decoded.userId;
next();
```

---

### FIX 18 — `updatestatus`: Typo in response key
**File:** [`application.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/application.controller.js#L122-L125)

**Problem:** Two typos — `"Appliaction"` and `succes: true` (missing an 's').

```js
// ❌ Current
return res.status(200).json({
    message: "Appliaction status updated",
    succes: true,             // ← typo, frontend checking res.data.success will get undefined
})

// ✅ Fix
return res.status(200).json({
    message: "Application status updated",
    success: true,
})
```

---

### FIX 19 — `getAllJobs`: Returns 404 when no jobs found (wrong behavior)
**File:** [`job.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/job.controller.js#L67-L72)

**Problem:** When no jobs match the search keyword, returning 404 makes the frontend think it's an error. It should return 200 with an empty array.

```js
// ❌ Current
if (!job || job.length === 0) {
    return res.status(404).json({ message: "Job not found", success: false })
}

// ✅ Fix — return empty array with 200
return res.status(200).json({
    message: job.length === 0 ? "No jobs found" : `${job.length} jobs found`,
    job: job || [],
    success: true
})
```

---

### FIX 20 — `getAllJobs`: Performance — `$regex` doesn't use indexes
**File:** [`job.controller.js`](file:///c:/Users/samad/Downloads/JOB%20PORTAL/Backend/controllers/job.controller.js#L54-L63)

**Problem:** Case-insensitive `$regex` queries do full collection scans. At scale, search will be very slow.

```js
// ✅ Short-term fix — add a MongoDB text index on the Job collection
// In job.model.js, add after the schema definition:
jobSchema.index({ title: "text", description: "text", location: "text" });

// Then update the query in getAllJobs:
const query = keyword
    ? { $text: { $search: keyword } }
    : {};
```

> [!TIP]
> For production scale, consider **MongoDB Atlas Search** or **Elasticsearch** for full-text search with ranking, typo tolerance, and filters.

---

## ✅ Summary Checklist

| # | Fix | File | Priority |
|---|-----|------|----------|
| 1 | postJob allows only 1 job per company | job.controller.js | 🔴 Critical |
| 2 | CORS allows all origins | index.js | 🔴 Critical |
| 3 | No ownership check in updateCompany | company.controller.js | 🔴 Critical |
| 4 | Applicant password exposed in getApplicants | application.controller.js | 🔴 Critical |
| 5 | applyjob route uses GET instead of POST | application.route.js | 🔴 Critical |
| 6 | Missing await on newCompany.save() | company.controller.js | 🟠 High |
| 7 | Catch blocks have no response (request hangs) | company.controller.js | 🟠 High |
| 8 | connectDB() called after server starts | index.js | 🟠 High |
| 9 | No duplicate email check in updateProfile | user.controller.js | 🟠 High |
| 10 | User not stored in Redux after login | Login.jsx + authSlice.js | 🟠 High |
| 11 | RadioGroup defaultValue conflict | Login.jsx | 🟠 High |
| 12 | Wrong HTTP status codes (404 for server errors) | all controllers | 🟡 Medium |
| 13 | Salary not validated for NaN | job.controller.js | 🟡 Medium |
| 14 | No min validation on salary/experience | job.model.js | 🟡 Medium |
| 15 | No file size/type limit on multer | multer.js | 🟡 Medium |
| 16 | Cloudinary upload not implemented | user.controller.js | 🟡 Medium |
| 17 | Dead code: if(!decoded) never runs | isAuthenticated.js | 🟢 Low |
| 18 | Typo: succes and Appliaction | application.controller.js | 🟢 Low |
| 19 | 404 returned when no jobs found | job.controller.js | 🟢 Low |
| 20 | $regex causes full collection scan | job.controller.js | 🟢 Low |
