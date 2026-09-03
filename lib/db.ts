import fs from "fs";
import path from "path";

// ─── Submissions Database (Existing) ──────────────────────────────────────────

export interface SubmissionRecord {
  id: string;
  type: "volunteer" | "contact" | "community";
  data: Record<string, unknown>;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const DYNAMIC_CONTENT_FILE = path.join(DATA_DIR, "dynamic-content.json");

function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("[Database] Error ensuring data directory:", err);
  }
}

function ensureSubmissionsFile() {
  ensureDirectory();
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Database] Error initializing submissions file:", err);
  }
}

export async function saveSubmission(
  type: "volunteer" | "contact" | "community",
  payload: Record<string, unknown>
): Promise<SubmissionRecord | null> {
  try {
    ensureSubmissionsFile();

    const newRecord: SubmissionRecord = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      type,
      data: payload,
      createdAt: new Date().toISOString(),
    };

    let records: SubmissionRecord[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const fileContent = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      try {
        records = JSON.parse(fileContent);
      } catch {
        records = [];
      }
    }

    records.push(newRecord);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(records, null, 2), "utf-8");

    console.info(`[Database] Submission record saved (${newRecord.id})`);
    return newRecord;
  } catch (err) {
    console.error("[Database] Failed to persist submission record:", err);
    return null;
  }
}

// ─── Dynamic Multilingual Content Database ─────────────────────────────────────

export interface MultilingualText {
  en: string;
  mr: string;
  hi: string;
}

export interface DynamicContentRecord {
  id: string;
  type: "announcement" | "news" | "event_update" | "notice";
  title: MultilingualText;
  content: MultilingualText;
  category: MultilingualText;
  date: string;
  author?: string;
  priority?: "normal" | "high" | "urgent";
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}

function ensureDynamicContentFile() {
  ensureDirectory();
  try {
    if (!fs.existsSync(DYNAMIC_CONTENT_FILE)) {
      // Initialize with seed announcements so visitors immediately see live multilingual content
      const initialSeed: DynamicContentRecord[] = [
        {
          id: "seed-ganeshotsav-announcement",
          type: "announcement",
          title: {
            en: "Grand Ganeshotsav 2026 Preparations Commencing Soon",
            mr: "भव्य गणेशोत्सव २०२६ ची पूर्वतयारी लवकरच सुरू होत आहे",
            hi: "भव्य गणेशोत्सव २०२६ की पूर्व तैयारी जल्द शुरू हो रही है",
          },
          content: {
            en: "Shree Pratishtan invites all youth and citizens to join the volunteer orientation and stage planning meetings in Indira Nagar, Nashik.",
            mr: "श्री प्रतिष्ठान सर्व तरुण आणि नागरिकांना इंदिरा नगर, नाशिक येथे होणाऱ्या स्वयंसेवक मार्गदर्शन आणि नियोजन बैठकीस उपस्थित राहण्याचे आवाहन करते.",
            hi: "श्री प्रतिष्ठान सभी युवाओं और नागरिकों को इंदिरा नगर, नाशिक में आयोजित स्वयंसेवक मार्गदर्शन एवं योजना बैठक में शामिल होने का निमंत्रण देता है।",
          },
          category: {
            en: "Cultural Festival",
            mr: "सांस्कृतिक उत्सव",
            hi: "सांस्कृतिक उत्सव",
          },
          date: "2026-09-03",
          author: "Administrative Office",
          priority: "high",
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "seed-blood-donation-drive",
          type: "notice",
          title: {
            en: "Mega Blood Donation & Free Health Camp on Sunday",
            mr: "रविवारी भव्य रक्तदान शिबिर व मोफत आरोग्य तपासणी शिबिर",
            hi: "रविवार को भव्य रक्तदान शिविर और निःशुल्क स्वास्थ्य जांच शिविर",
          },
          content: {
            en: "Join hands with our medical seva cell to donate blood and save lives. Specialist doctors will provide complimentary health consultations.",
            mr: "रक्तदान करून जीवन वाचवण्यासाठी आमच्या आरोग्य सेवा कक्षासोबत सहभागी व्हा. तज्ज्ञ डॉक्टरांकडून मोफत आरोग्य सल्ला दिला जाईल.",
            hi: "रक्तदान कर जीवन बचाने के लिए हमारे स्वास्थ्य सेवा दल से जुड़ें। विशेषज्ञ डॉक्टरों द्वारा निःशुल्क स्वास्थ्य परामर्श प्रदान किया जाएगा।",
          },
          category: {
            en: "Healthcare Seva",
            mr: "आरोग्य सेवा",
            hi: "स्वास्थ्य सेवा",
          },
          date: "2026-09-08",
          author: "Healthcare Cell",
          priority: "urgent",
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      fs.writeFileSync(DYNAMIC_CONTENT_FILE, JSON.stringify(initialSeed, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[Database] Error initializing dynamic content file:", err);
  }
}

export async function getDynamicContentList(
  filter: "all" | "published" = "published"
): Promise<DynamicContentRecord[]> {
  try {
    ensureDynamicContentFile();
    if (!fs.existsSync(DYNAMIC_CONTENT_FILE)) return [];

    const fileContent = fs.readFileSync(DYNAMIC_CONTENT_FILE, "utf-8");
    const records: DynamicContentRecord[] = JSON.parse(fileContent);

    const filtered = filter === "published"
      ? records.filter((r) => r.status === "published")
      : records;

    // Sort descending by date / createdAt
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.error("[Database] Error reading dynamic content:", err);
    return [];
  }
}

export async function getDynamicContentById(id: string): Promise<DynamicContentRecord | null> {
  try {
    ensureDynamicContentFile();
    const records = await getDynamicContentList("all");
    return records.find((r) => r.id === id) || null;
  } catch (err) {
    console.error("[Database] Error finding dynamic content by id:", err);
    return null;
  }
}

export async function saveDynamicContent(
  payload: Omit<DynamicContentRecord, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<DynamicContentRecord | null> {
  try {
    ensureDynamicContentFile();

    let records: DynamicContentRecord[] = [];
    if (fs.existsSync(DYNAMIC_CONTENT_FILE)) {
      try {
        records = JSON.parse(fs.readFileSync(DYNAMIC_CONTENT_FILE, "utf-8"));
      } catch {
        records = [];
      }
    }

    const now = new Date().toISOString();

    if (payload.id) {
      // Update existing record
      const existingIndex = records.findIndex((r) => r.id === payload.id);
      if (existingIndex !== -1) {
        const updatedRecord: DynamicContentRecord = {
          ...records[existingIndex],
          type: payload.type || records[existingIndex].type,
          title: payload.title,
          content: payload.content,
          category: payload.category,
          date: payload.date || records[existingIndex].date,
          author: payload.author ?? records[existingIndex].author,
          priority: payload.priority ?? records[existingIndex].priority,
          status: payload.status ?? records[existingIndex].status,
          updatedAt: now,
        };
        records[existingIndex] = updatedRecord;
        fs.writeFileSync(DYNAMIC_CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");
        return updatedRecord;
      }
    }

    // Create new record
    const newRecord: DynamicContentRecord = {
      id: `content_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: payload.type || "announcement",
      title: payload.title,
      content: payload.content,
      category: payload.category,
      date: payload.date || new Date().toISOString().split("T")[0],
      author: payload.author || "Admin",
      priority: payload.priority || "normal",
      status: payload.status || "published",
      createdAt: now,
      updatedAt: now,
    };

    records.unshift(newRecord);
    fs.writeFileSync(DYNAMIC_CONTENT_FILE, JSON.stringify(records, null, 2), "utf-8");

    return newRecord;
  } catch (err) {
    console.error("[Database] Failed to save dynamic content:", err);
    return null;
  }
}

export async function deleteDynamicContent(id: string): Promise<boolean> {
  try {
    ensureDynamicContentFile();
    if (!fs.existsSync(DYNAMIC_CONTENT_FILE)) return false;

    const records: DynamicContentRecord[] = JSON.parse(fs.readFileSync(DYNAMIC_CONTENT_FILE, "utf-8"));
    const filtered = records.filter((r) => r.id !== id);

    if (filtered.length === records.length) return false;

    fs.writeFileSync(DYNAMIC_CONTENT_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[Database] Error deleting dynamic content:", err);
    return false;
  }
}
