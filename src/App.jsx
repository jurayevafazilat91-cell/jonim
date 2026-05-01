import { useState, useRef, useEffect } from "react";

// ── TARJIMALAR (LANGUAGES) ──
const translations = {
  uz: {
    nav: { home: "Bosh sahifa", courses: "Kurslar", teachers: "O'qituvchilar", faq: "FAQ" },
    hero: {
      badge: "🔥 200+ kurs — Barchasi bepul!",
      title1: "O'z kelajagingizni",
      title2: "bugun",
      title3: "qurishni boshlang",
      desc: "Tajribali o'qituvchilardan professional ko'nikmalar o'rganing. O'z sur'atingizda, istagan joydan. Mutlaqo bepul.",
      search: "Kurs qidiring...",
      stats: { students: "Talabalar", courses: "Kurslar", free: "Bepul" }
    },
    levels: { beginner: "Boshlang'ich", intermediate: "O'rta", advanced: "Yuqori" },
    meta: { hours: "soat", lessons: "dars", students: "talaba", free: "Bepul", start: "Boshlash" },
    faqTitle: "Ko'p Beriladigan Savollar!!",
    faqSub: "Yana sizni qiziqtirgan savollar bo'lsa, biz bilan bog'laning.",
    footer: { rights: "Barcha huquqlar himoyalangan.", slogan: "— Bilim sizning kuchingiz" },
    pageTitles: { home: "", courses: "Barcha Kurslar", teachers: "Bizning Ustozlar", faq: "Ko'p Beriladigan Savollar" },
    teachers: { students: "o'quvchi", rating: "reyting", viewProfile: "Profilni ko'rish" },
    theme: { light: "Yorug'", dark: "Qorong'u" },
    courseModal: {
      rating: "reyting",
      reviews: "ta sharh",
      aboutTitle: "Kurs haqida",
      watchVideo: "Videoni ko'rish",
      close: "Yopish",
      madeWith: "Bilan yaratilgan"
    }
  },
  en: {
    nav: { home: "Home", courses: "Courses", teachers: "Teachers", faq: "SAVOLLAR" },
    hero: {
      badge: "🔥 200+ courses — All free!",
      title1: "Start building your",
      title2: "future",
      title3: "today",
      desc: "Learn professional skills from experienced instructors. At your own pace, from anywhere. Absolutely free.",
      search: "Search courses...",
      stats: { students: "Students", courses: "Courses", free: "Free" }
    },
    levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    meta: { hours: "hours", lessons: "lessons", students: "students", free: "Free", start: "Start" },
    faqTitle: "Frequently Asked Questions!!",
    faqSub: "If you have more questions, contact us.",
    footer: { rights: "All rights reserved.", slogan: "— Knowledge is your power" },
    pageTitles: { home: "", courses: "All Courses", teachers: "Our Instructors", faq: "FAQ" },
    teachers: { students: "students", rating: "rating", viewProfile: "View Profile" },
    theme: { light: "Light", dark: "Dark" },
    courseModal: {
      rating: "rating",
      reviews: "reviews",
      aboutTitle: "About the Course",
      watchVideo: "Watch Video",
      close: "Close",
      madeWith: "Made with"
    }
  },
  ru: {
    nav: { home: "Главная", courses: "Курсы", teachers: "Преподаватели", faq: "FAQ" },
    hero: {
      badge: "🔥 200+ курсов — Все бесплатно!",
      title1: "Начните строить свое",
      title2: "будущее",
      title3: "сегодня",
      desc: "Изучайте профессиональные навыки у опытных преподавателей. В своем темпе, из любой точки. Абсолютно бесплатно.",
      search: "Поиск курсов...",
      stats: { students: "Студентов", courses: "Курсов", free: "Бесплатно" }
    },
    levels: { beginner: "Начальный", intermediate: "Средний", advanced: "Продвинутый" },
    meta: { hours: "часов", lessons: "уроков", students: "студентов", free: "Бесплатно", start: "Начать" },
    faqTitle: "Часто задаваемые вопросы!!",
    faqSub: "Если у вас есть другие вопросы, свяжитесь с нами.",
    footer: { rights: "Все права защищены.", slogan: "— Знание — ваша сила" },
    pageTitles: { home: "", courses: "Все Курсы", teachers: "Наши Преподаватели", faq: "Частые Вопросы" },
    teachers: { students: "студентов", rating: "рейтинг", viewProfile: "Профиль" },
    theme: { light: "Светлый", dark: "Тёмный" },
    courseModal: {
      rating: "рейтинг",
      reviews: "отзывов",
      aboutTitle: "О курсе",
      watchVideo: "Смотреть видео",
      close: "Закрыть",
      madeWith: "Создано с"
    }
  }
};

// ── O'QITUVCHILAR MA'LUMOTLARI ──
const teachersData = [
  { 
    id: 1, 
    name: "Хislat Rahimjonov", 
    role: {uz: "Universal Ekspert", en: "Universal Expert", ru: "Универсальный Эксперт"}, 
    bio: {uz: "5 yillik tajriba. Sun'iy intellekt sohasida 10+ loyiha.", en: "5 years exp. 10+ AI projects.", ru: "5 лет опыта. 10+ AI проектов."}, 
    avatar: "https://i.pravatar.cc/150?img=68", 
    rating: 4.9, 
    students: "12k", 
    color: "#4ade80" 
  },
  { id: 2, name: "Malika Yusupova", role: {uz: "UI/UX Dizayner", en: "UI/UX Designer", ru: "UI/UX Дизайнер"}, bio: {uz: "Figma bo'yicha xalqaro sertifikat egasi.", en: "Internationally certified in Figma.", ru: "Международный сертификат Figma."}, avatar: "https://i.pravatar.cc/150?img=5", rating: 4.8, students: "8k", color: "#c084fc" },
  { id: 3, name: "Bobur Rahimov", role: {uz: "Frontend Lead", en: "Frontend Lead", ru: "Frontend Lead"}, bio: {uz: "React va Next.js bo'yicha senior dasturchi.", en: "Senior React & Next.js developer.", ru: "Сеньор React и Next.js разработчик."}, avatar: "https://i.pravatar.cc/150?img=3", rating: 4.9, students: "9k", color: "#38bdf8" },
  { id: 4, name: "Dilnoza Karimova", role: {uz: "Data Scientist", en: "Data Scientist", ru: "Data Scientist"}, bio: {uz: "Katta ma'lumotlar tahlili bo'yicha mutaxassis.", en: "Big Data analysis specialist.", ru: "Специалист по анализу Big Data."}, avatar: "https://i.pravatar.cc/150?img=9", rating: 4.7, students: "5k", color: "#fbbf24" },
  { id: 5, name: "Sherzod Nazarov", role: {uz: "Mobile Dev", en: "Mobile Developer", ru: "Мобильный разработчик"}, bio: {uz: "Flutter orqali 20+ ilova yaratgan.", en: "Created 20+ apps with Flutter.", ru: "Создал 20+ приложений на Flutter."}, avatar: "https://i.pravatar.cc/150?img=13", rating: 4.8, students: "6k", color: "#2dd4bf" },
  { id: 6, name: "Zulfiya Abdullayeva", role: {uz: "Marketing Strategist", en: "Marketing Strategist", ru: "Маркетолог"}, bio: {uz: "SMM va SEO bo'yicha amaliyotchi.", en: "Practitioner in SMM & SEO.", ru: "Практик SMM и SEO."}, avatar: "https://i.pravatar.cc/150?img=24", rating: 4.6, students: "11k", color: "#fb923c" },
  { id: 7, name: "Sarvinoz Ergasheva", role: {uz: "English Tutor", en: "English Tutor", ru: "Преподаватель английского"}, bio: {uz: "IELTS 8.5. 7 yillik o'qitish tajribasi.", en: "IELTS 8.5. 7 years teaching exp.", ru: "IELTS 8.5. 7 лет опыта преподавания."}, avatar: "https://i.pravatar.cc/150?img=32", rating: 4.9, students: "22k", color: "#a78bfa" },
  { id: 8, name: "Ulugbek Xasanov", role: {uz: "DevOps Engineer", en: "DevOps Engineer", ru: "DevOps Инженер"}, bio: {uz: "AWS va Kubernetes arxitektori.", en: "AWS & Kubernetes architect.", ru: "Архитектор AWS и Kubernetes."}, avatar: "https://i.pravatar.cc/150?img=59", rating: 4.8, students: "3k", color: "#60a5fa" },
];

// ── FAQ MA'LUMOTLARI ──
const faqData = [
  { q: "Kurslar bepulmi?", a: "Ha, bizning platformadagi barcha kurslar mutlaqo bepul." },
  { q: "Qanday to'lov usullaridan foydalanish mumkin?", a: "Kurslar bepul bo'lgani uchun to'lov talab qilinmaydi." },
  { q: "Kurslar noldan boshlab o'rgatiladimi?", a: "Ha, aksariyat kurslar noldan boshlab o'rgatadi." },
  { q: "Kurs sotib olgach undan qachongacha foydalana olamanmi?", a: "Siz kurs materiallariga cheksiz vaqt davomida kirishingiz mumkin." },
  { q: "Kurslarda o'qish uchun kompyuter kerakmi?", a: "Dasturlash kurslari uchun kompyuter tavsiya etiladi, lekin nazariya uchun telefon ham yetarli." },
  { q: "Express kurslar kimlar uchun?", a: "Tez vaqt ichida asosiy ko'nikmalarni egallamoqchi bo'lganlar uchun." },
  { q: "Express kurslar faqat boshlang'ich darajadagilar uchunmi?", a: "Asosan ha, lekin ba'zi mavzular o'rta daraja uchun ham foydali." },
  { q: "Offline kursda ham darslar bormi?", a: "Hozirda faqat online formatda ishlaymiz." },
  { q: "Cloud42 taklimi?", a: "Bu bizning hamkorimiz bo'lib, ularda ham amaliyot o'tashingiz mumkin." },
  { q: "Kurslarni tugatgach ishga kira olamanmi?", a: "Ha, ko'plab bitiruvchilarimiz ishga joylashishgan." },
  { q: "Sizlar bilan qanday bog'lanish mumkin?", a: "Telegram yoki Instagram orqali bog'lanishingiz mumkin." },
  { q: "Ba'zi darslar yopiq ekan, qachon ochiladi?", a: "Yangi darslar har haftada ochib boriladi." },
  { q: "Jonli darslar nima? Va ular bepulmi?", a: "Jonli darslar real vaqtda o'tiladi va ular ham bepul." },
  { q: "Kursdan hech narsa o'rgana olmadim, pulimni qaytarib berasizlarmi?", a: "Kurslar bepul, shuning uchun pul qaytarish masalasi yo'q." },
  { q: "Telefon raqamimni o'zgartirsam bo'ladimi?", a: "Ha, profil sozlamalaridan o'zgartirishingiz mumkin." },
];

// ── ICONS ──
const PythonIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="py" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.95"/><stop offset="100%" stopColor={color} stopOpacity="0.35"/></linearGradient></defs>
    <rect x="10" y="10" width="26" height="26" rx="8" fill="url(#py)"/><rect x="44" y="44" width="26" height="26" rx="8" fill="url(#py)" opacity="0.6"/>
    <circle cx="23" cy="23" r="5" fill="white" opacity="0.95"/><circle cx="57" cy="57" r="5" fill="white" opacity="0.95"/>
    <path d="M36 23 L44 23" stroke={color} strokeWidth="3" strokeLinecap="round"/><path d="M36 57 L44 57" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
    <path d="M23 36 Q23 44 44 44" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M57 44 Q57 36 36 36" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const DesignIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="dsg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor={color} stopOpacity="0.3"/></linearGradient></defs>
    <circle cx="40" cy="40" r="28" stroke="url(#dsg)" strokeWidth="3" fill="none"/><circle cx="40" cy="40" r="18" stroke={color} strokeWidth="2" fill="none" opacity="0.4"/>
    <circle cx="40" cy="40" r="9" fill={color} opacity="0.85"/><circle cx="40" cy="40" r="4" fill="white"/>
    <line x1="40" y1="8" x2="40" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round"/><line x1="40" y1="60" x2="40" y2="72" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    <line x1="8" y1="40" x2="20" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round"/><line x1="60" y1="40" x2="72" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const ReactIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <ellipse cx="40" cy="40" rx="32" ry="13" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9"/>
    <ellipse cx="40" cy="40" rx="32" ry="13" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9" transform="rotate(60 40 40)"/>
    <ellipse cx="40" cy="40" rx="32" ry="13" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9" transform="rotate(120 40 40)"/>
    <circle cx="40" cy="40" r="5.5" fill={color}/><circle cx="40" cy="40" r="2.5" fill="white"/>
  </svg>
);

const DataIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="dat" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={color} stopOpacity="0.15"/><stop offset="100%" stopColor={color} stopOpacity="0.9"/></linearGradient></defs>
    <rect x="8" y="46" width="14" height="26" rx="4" fill="url(#dat)"/><rect x="28" y="32" width="14" height="40" rx="4" fill="url(#dat)" opacity="0.85"/><rect x="48" y="16" width="14" height="56" rx="4" fill="url(#dat)" opacity="0.9"/>
    <polyline points="10,50 34,36 54,20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="50" r="3.5" fill={color}/><circle cx="34" cy="36" r="3.5" fill={color}/><circle cx="54" cy="20" r="3.5" fill={color}/>
  </svg>
);

const MobileIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <rect x="22" y="8" width="36" height="64" rx="9" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9"/>
    <rect x="30" y="13" width="20" height="4" rx="2" fill={color} opacity="0.4"/><circle cx="40" cy="63" r="4" fill={color} opacity="0.6"/>
    <rect x="28" y="22" width="24" height="34" rx="4" fill={color} opacity="0.1"/>
    <path d="M32 36 L40 30 L48 36 L48 44 L40 50 L32 44 Z" fill={color} opacity="0.75"/><circle cx="40" cy="39" r="4" fill="white" opacity="0.95"/>
  </svg>
);

const MarketingIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="mkt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor={color} stopOpacity="0.35"/></linearGradient></defs>
    <path d="M12 30 L50 12 L50 50 L12 38 Z" fill="url(#mkt)" opacity="0.85"/><rect x="50" y="24" width="14" height="18" rx="4" fill={color} opacity="0.55"/><rect x="12" y="38" width="18" height="24" rx="4" fill={color} opacity="0.35"/>
    <circle cx="66" cy="18" r="7" fill={color} opacity="0.75"/><path d="M63 15 L69 21 M69 15 L63 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LanguageIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <circle cx="30" cy="38" r="20" stroke={color} strokeWidth="2.5" fill="none" opacity="0.9"/><ellipse cx="30" cy="38" rx="8" ry="20" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
    <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="2" opacity="0.5"/><line x1="10" y1="46" x2="50" y2="46" stroke={color} strokeWidth="2" opacity="0.5"/>
    <rect x="46" y="42" width="26" height="24" rx="6" fill={color} opacity="0.18" stroke={color} strokeWidth="2"/><path d="M52 50 L66 50 M52 56 L62 56" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="59" cy="32" r="8" fill={color} opacity="0.15" stroke={color} strokeWidth="2"/><text x="55.5" y="36" fontSize="10" fill={color} fontWeight="bold" fontFamily="sans-serif">A</text>
  </svg>
);

const PhotoshopIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="psh" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.8"/><stop offset="100%" stopColor={color} stopOpacity="0.2"/></linearGradient></defs>
    <circle cx="40" cy="40" r="28" stroke="url(#psh)" strokeWidth="2.5" fill="none"/><circle cx="40" cy="40" r="18" fill={color} opacity="0.12"/><circle cx="40" cy="40" r="10" fill={color} opacity="0.65"/><circle cx="40" cy="40" r="4" fill="white"/>
    <path d="M40 10 L40 22 M40 58 L40 70 M10 40 L22 40 M58 40 L70 40" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.45"/>
    <path d="M20 20 L28 28 M52 52 L60 60 M20 60 L28 52 M52 28 L60 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const DevOpsIcon = ({ color }) => (
  <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
    <defs><linearGradient id="dvp" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor={color} stopOpacity="0.5"/></linearGradient></defs>
    <path d="M40 10 Q62 10 68 34 Q74 56 56 64 Q40 72 24 64 Q8 56 12 32 Q16 10 40 10Z" stroke="url(#dvp)" strokeWidth="2.5" fill="none"/>
    <circle cx="40" cy="40" r="13" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/><path d="M32 40 L37 46 L50 30" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="40" cy="10" r="4" fill={color}/><circle cx="68" cy="34" r="4" fill={color} opacity="0.8"/><circle cx="56" cy="64" r="4" fill={color} opacity="0.6"/><circle cx="12" cy="34" r="4" fill={color} opacity="0.8"/>
  </svg>
);

const courses = [
  { id: 1, title: {uz:"Python dasturlash asoslari", en:"Python Basics", ru:"Основы Python"}, desc: {uz:"Noldan boshlab Python o'rganing.", en:"Learn Python from scratch.", ru:"Изучите Python с нуля."}, fullDesc: {uz: "Agar siz Python dasturlash kursini qidirayotgan bo'lsangiz, bu kurs siz uchun. Bu kursda siz Python asoslarini o'rganasiz, veb-ilovalar yaratish, ma'lumotlar tahlili va mashinali o'qitish bilan tanishasiz. Kurs 3 ta real loyihani o'z ichiga oladi.", en: "If you're looking for a complete Python programming course, this is it. Learn Python basics, build web apps, explore data analysis and machine learning. Includes 3 real-world projects.", ru: "Если вы ищете полный курс программирования на Python, это он. Изучите основы Python, создавайте веб-приложения, исследуйте анализ данных и машинное обучение. Включает 3 реальных проекта."}, category: "Dasturlash", level: "Boshlang'ich", Icon: PythonIcon, from: "#0d1f0d", to: "#162e16", accent: "#4ade80", students: "12,400", duration: "42", rating: 4.7, lessons: 86, instructor: "Хislat Rahimjonov", videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc&t=12s", videoThumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg" },
  { id: 2, title: {uz:"UI/UX Dizayn kursi", en:"UI/UX Design Course", ru:"Курс UI/UX Дизайна"}, desc: {uz:"Figma yordamida interfeys loyihalash.", en:"Design interfaces with Figma.", ru:"Проектирование интерфейсов в Figma."}, category: "Dizayn", level: "O'rta", Icon: DesignIcon, from: "#1a0533", to: "#2d0b6b", accent: "#c084fc", students: "8,200", duration: "35", rating: 4.8, lessons: 64, instructor: "Malika Yusupova" },
  { id: 3, title: {uz:"React va Next.js", en:"React & Next.js", ru:"React и Next.js"}, desc: {uz:"Modern frontend texnologiyalar.", en:"Modern frontend technologies.", ru:"Современные фронтенд технологии."}, category: "Dasturlash", level: "O'rta", Icon: ReactIcon, from: "#001a2e", to: "#003355", accent: "#38bdf8", students: "9,750", duration: "58", rating: 4.9, lessons: 112, instructor: "Bobur Rahimov" },
  { id: 4, title: {uz:"Data Science va ML", en:"Data Science & ML", ru:"Data Science и ML"}, desc: {uz:"Ma'lumotlar tahlili va AI.", en:"Data analysis and AI.", ru:"Анализ данных и ИИ."}, category: "Data", level: "Yuqori", Icon: DataIcon, from: "#1a1200", to: "#3d2c00", accent: "#fbbf24", students: "5,600", duration: "70", rating: 4.7, lessons: 134, instructor: "Dilnoza Karimova" },
  { id: 5, title: {uz:"Flutter Mobile Dasturlash", en:"Flutter Mobile Dev", ru:"Мобильная разработка Flutter"}, desc: {uz:"Android va iOS uchun ilovalar.", en:"Apps for Android & iOS.", ru:"Приложения для Android и iOS."}, category: "Mobile", level: "O'rta", Icon: MobileIcon, from: "#001a18", to: "#003330", accent: "#2dd4bf", students: "6,100", duration: "48", rating: 4.8, lessons: 92, instructor: "Sherzod Nazarov" },
  { id: 6, title: {uz:"Raqamli Marketing", en:"Digital Marketing", ru:"Цифровой маркетинг"}, desc: {uz:"SMM, SEO va Google Ads.", en:"SMM, SEO and Google Ads.", ru:"SMM, SEO и Google Ads."}, category: "Marketing", level: "Boshlang'ich", Icon: MarketingIcon, from: "#1a0a00", to: "#3d1a00", accent: "#fb923c", students: "11,300", duration: "30", rating: 4.6, lessons: 58, instructor: "Zulfiya Abdullayeva" },
  { id: 7, title: {uz:"Ingliz tili: A1 → B2", en:"English: A1 → B2", ru:"Английский: A1 → B2"}, desc: {uz:"Grammatika va so'zlashuv.", en:"Grammar and speaking.", ru:"Грамматика и разговорная речь."}, category: "Til", level: "Boshlang'ich", Icon: LanguageIcon, from: "#0a001a", to: "#1a0040", accent: "#a78bfa", students: "22,000", duration: "60", rating: 4.9, lessons: 120, instructor: "Sarvinoz Ergasheva" },
  { id: 8, title: {uz:"Grafik Dizayn Photoshop", en:"Graphic Design Photoshop", ru:"Графический дизайн Photoshop"}, desc: {uz:"Adobe Photoshop bilan ishlash.", en:"Working with Adobe Photoshop.", ru:"Работа в Adobe Photoshop."}, category: "Dizayn", level: "Boshlang'ich", Icon: PhotoshopIcon, from: "#1a0a0a", to: "#3d1010", accent: "#f87171", students: "7,800", duration: "38", rating: 4.7, lessons: 74, instructor: "Kamola Mirzayeva" },
  { id: 9, title: {uz:"DevOps va Cloud", en:"DevOps & Cloud", ru:"DevOps и Облака"}, desc: {uz:"Docker, Kubernetes va AWS.", en:"Docker, Kubernetes & AWS.", ru:"Docker, Kubernetes и AWS."}, category: "Dasturlash", level: "Yuqori", Icon: DevOpsIcon, from: "#001020", to: "#002040", accent: "#60a5fa", students: "3,400", duration: "65", rating: 4.8, lessons: 98, instructor: "Ulugbek Xasanov" },
];

const categories = ["Barchasi", "Dasturlash", "Dizayn", "Data", "Mobile", "Marketing", "Til"];
const levelStyle = {
  "Boshlang'ich": { color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  "O'rta":        { color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  "Yuqori":       { color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

// ── THEME COLORS ──
const themeColors = {
  dark: {
    bg: "#070a10",
    text: "#e8edf8",
    textMuted: "rgba(200,215,255,0.5)",
    textMuted2: "rgba(200,215,255,0.38)",
    textMuted3: "rgba(200,215,255,0.36)",
    cardBg: "rgba(255,255,255,0.05)",
    cardBorder: "rgba(255,255,255,0.07)",
    headerBg: "rgba(7,10,16,0.9)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(255,255,255,0.09)",
    footerBorder: "rgba(255,255,255,0.06)"
  },
  light: {
    bg: "#f8fafc",
    text: "#1e293b",
    textMuted: "rgba(30,41,59,0.6)",
    textMuted2: "rgba(30,41,59,0.5)",
    textMuted3: "rgba(30,41,59,0.45)",
    cardBg: "#ffffff",
    cardBorder: "rgba(0,0,0,0.08)",
    headerBg: "rgba(248,250,252,0.9)",
    inputBg: "#ffffff",
    inputBorder: "rgba(0,0,0,0.12)",
    footerBorder: "rgba(0,0,0,0.08)"
  }
};

// ── LANGUAGE SELECTOR COMPONENT ──
function LanguageSelector({ lang, setLang, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: "uz", flag: "🇺🇿", name: "O'zbek" },
    { code: "en", flag: "uk", name: "English" },
    { code: "ru", flag: "🇷🇺", name: "Русский" }
  ];

  const currentLang = languages.find(l => l.code === lang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
        style={{
          background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          color: isDark ? "#e8edf8" : "#1e293b",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-full mt-2 z-50 w-40 rounded-xl overflow-hidden shadow-2xl animate-[fadeUp_0.2s_ease-out]"
            style={{
              background: isDark ? "#1e2230" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
            }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
                style={{
                  background: lang === l.code ? (isDark ? "rgba(251,191,36,0.15)" : "rgba(251,191,36,0.1)") : "transparent",
                  color: lang === l.code ? (isDark ? "#fbbf24" : "#d97706") : (isDark ? "#e8edf8" : "#1e293b"),
                }}
              >
                <span className="text-lg">{l.flag}</span>
                <span className="font-medium">{l.name}</span>
                {lang === l.code && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── THEME TOGGLE COMPONENT ──
function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full transition-colors duration-300"
      style={{
        background: isDark ? "#334155" : "#fbbf24",
      }}
    >
      <div className="absolute top-1 left-1 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
        style={{
          background: isDark ? "#94a3b8" : "#fff",
          transform: isDark ? "translateX(24px)" : "translateX(0)",
        }}
      >
        {isDark ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        )}
      </div>
    </button>
  );
}

// ── COURSE MODAL COMPONENT ──
function CourseModal({ course, isOpen, onClose, lang, isDark }) {
  if (!isOpen || !course) return null;
  
  const t = translations[lang];
  const colors = isDark ? themeColors.dark : themeColors.light;

  const handleVideoClick = () => {
    if (course.videoUrl) {
      window.open(course.videoUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden animate-[fadeUp_0.3s_ease-out] max-h-[90vh] overflow-y-auto"
        style={{
          background: isDark ? "#0a0a0a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors"
          style={{ 
            background: "rgba(0,0,0,0.5)", 
            color: "#fff" 
          }}>
          ✕
        </button>
        
        {/* Header */}
        <div className="p-6 pb-4">
          <p className="text-xs text-purple-400 uppercase tracking-wider mb-2">A Course You'll Actually Finish</p>
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: isDark ? "#fff" : "#1e293b" }}>{course.title[lang]}</h2>
          <p className="text-sm mb-4" style={{ color: colors.textMuted }}>{course.fullDesc ? course.fullDesc[lang] : course.desc[lang]}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-green-400 text-sm font-bold">Excellent</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < Math.floor(course.rating) ? "#22c55e" : "#333" }}>★</span>
              ))}
            </div>
            <span className="text-sm" style={{ color: colors.textMuted }}>{course.rating} out of 5 based on {course.students} reviews</span>
          </div>
        </div>

        {/* Video Thumbnail */}
        {course.videoUrl && course.videoThumbnail && (
          <div className="relative mx-6 mb-6 group cursor-pointer" onClick={handleVideoClick}>
            <img 
              src={course.videoThumbnail} 
              alt="Course Preview" 
              className="w-full rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="#000"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded text-xs"
              style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
              {t.courseModal.watchVideo}
            </div>
          </div>
        )}

        {/* Course Info */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {course.instructor[0]}
            </div>
            <span className="text-sm" style={{ color: colors.textMuted }}>{t.courseModal.madeWith}</span>
          </div>

          <h3 className="text-xl font-bold mb-4" style={{ color: isDark ? "#fff" : "#1e293b" }}>{t.courseModal.aboutTitle}</h3>
          
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: isDark ? "#ccc" : "#475569" }}>
            <p>{course.fullDesc ? course.fullDesc[lang] : course.desc[lang]}</p>
            <p>Kurs davomiyligi: <strong>{course.duration} {t.meta.hours}</strong></p>
            <p>Darslar soni: <strong>{course.lessons} {t.meta.lessons}</strong></p>
            <p>Talabalar: <strong>{course.students}</strong></p>
            <p>O'qituvchi: <strong>{course.instructor}</strong></p>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={handleVideoClick}
              className="flex-1 font-bold py-3 rounded-xl transition-colors"
              style={{ background: "#4ade80", color: "#000" }}
            >
              {t.meta.start} →
            </button>
            <button 
              onClick={onClose}
              className="px-6 font-bold py-3 rounded-xl transition-colors"
              style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", color: isDark ? "#fff" : "#1e293b" }}
            >
              {t.courseModal.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, lang, isDark, onOpenModal }) {
  const [hovered, setHovered] = useState(false);
  const lvl = levelStyle[course.level];
  const t = translations[lang];
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <div
      className="rounded-2xl border overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: isDark ? `linear-gradient(145deg, ${course.from}, ${course.to})` : `linear-gradient(145deg, ${course.from}dd, ${course.to}dd)`,
        borderColor: hovered ? `${course.accent}40` : colors.cardBorder,
        boxShadow: hovered ? `0 28px 64px rgba(0,0,0,0.6), 0 0 0 1px ${course.accent}25` : isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.1)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition: "all 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-44 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 55% 40%, ${course.accent}20, transparent 70%)` }}/>
        <div className="absolute" style={{ width: 140, height: 140, borderRadius: "50%", border: `1px solid ${course.accent}18`, transform: hovered ? "scale(1.18)" : "scale(1)", transition: "transform 0.5s ease" }}/>
        <div className="absolute" style={{ width: 96, height: 96, borderRadius: "50%", border: `1px solid ${course.accent}28`, transform: hovered ? "scale(1.22)" : "scale(1)", transition: "transform 0.5s ease 0.04s" }}/>
        <div style={{ transform: hovered ? "scale(1.12) translateY(-3px)" : "scale(1)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)", filter: hovered ? `drop-shadow(0 8px 22px ${course.accent}55)` : "none" }}>
          <course.Icon color={course.accent} />
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: course.accent, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>{course.category}</span>
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ color: lvl.color, background: lvl.bg }}>{t.levels[course.level] || course.level}</span>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-bold text-lg leading-snug" style={{ fontFamily: "'Sora', sans-serif", color: isDark ? "#eef2ff" : "#1e293b" }}>{course.title[lang]}</h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: colors.textMuted }}>{course.desc[lang]}</p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: course.accent, color: "#080a0f" }}>{course.instructor[0]}</div>
          <span className="text-xs" style={{ color: colors.textMuted2 }}>{course.instructor}</span>
        </div>
        <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: colors.textMuted3 }}>
          <span>⏱ {course.duration} {t.meta.hours}</span>
          <span>📚 {course.lessons} {t.meta.lessons}</span>
          <span>👥 {course.students}</span>
        </div>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${colors.cardBorder}` }}>
          <div>
            <div className="flex items-center gap-1"><span style={{ color: "#fbbf24", fontSize: 14 }}>★</span><span className="text-sm font-bold" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>{course.rating}</span></div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base font-black" style={{ fontFamily: "'Sora', sans-serif", color: course.accent }}>{t.meta.free}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${course.accent}22`, color: course.accent, letterSpacing: "0.06em" }}>FREE</span>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(course);
            }}
            className="text-sm font-bold px-4 py-2 rounded-xl active:scale-95" 
            style={{ 
              background: course.accent, 
              color: "#080a0f", 
              boxShadow: hovered ? `0 0 24px ${course.accent}50` : "none", 
              transition: "box-shadow 0.25s ease" 
            }}
          >
            {t.meta.start} →
          </button>
        </div>
      </div>
    </div>
  );
}

function TeacherCard({ teacher, lang, isDark }) {
  const [hovered, setHovered] = useState(false);
  const t = translations[lang];
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <div
      className="rounded-2xl border overflow-hidden flex flex-col items-center text-center p-6 cursor-pointer transition-all duration-300"
      style={{
        background: isDark ? "linear-gradient(145deg, #131824, #0f131f)" : "linear-gradient(145deg, #ffffff, #f8fafc)",
        borderColor: hovered ? `${teacher.color}40` : colors.cardBorder,
        boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${teacher.color}25` : isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: teacher.color }}></div>
        <img src={teacher.avatar} alt={teacher.name} className="relative w-24 h-24 rounded-full border-4 object-cover" style={{ borderColor: isDark ? "#1e2230" : "#e2e8f0" }} />
        <div className="absolute bottom-0 right-0 rounded-full p-1.5 border" style={{ background: isDark ? "#1e2230" : "#f1f5f9", borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
           <span style={{ color: "#fbbf24" }}>★</span>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-1" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>{teacher.name}</h3>
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: teacher.color }}>{teacher.role[lang]}</p>
      
      <p className="text-sm mb-6 line-clamp-2" style={{ color: colors.textMuted }}>{teacher.bio[lang]}</p>
      
      <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl border" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)" }}>
        <div className="text-center">
          <div className="text-xs" style={{ color: colors.textMuted2 }}>{t.teachers.students}</div>
          <div className="font-bold" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>{teacher.students}</div>
        </div>
        <div className="w-px h-8" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}></div>
        <div className="text-center">
          <div className="text-xs" style={{ color: colors.textMuted2 }}>{t.teachers.rating}</div>
          <div className="font-bold flex items-center gap-1" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>
            {teacher.rating} <span style={{color:"#fbbf24"}}>★</span>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-2 rounded-lg text-sm font-bold transition-colors"
        style={{ 
          background: hovered ? teacher.color : "transparent",
          color: hovered ? "#080a0f" : teacher.color,
          border: `1px solid ${teacher.color}`
        }}
      >
        {t.teachers.viewProfile}
      </button>
    </div>
  );
}

function LoginModal({ isOpen, onClose, onLogin, isDark }) {
  if (!isOpen) return null;
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl animate-[fadeUp_0.3s_ease-out]"
        style={{
          background: isDark ? "#18181b" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4" style={{ color: colors.textMuted }}>✕</button>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>Sign in to EduHub</h2>
          <p className="text-sm" style={{ color: colors.textMuted }}>Welcome back! Please sign in to continue</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors border"
            style={{ background: isDark ? "#27272a" : "#f1f5f9", borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)", color: isDark ? "#eef2ff" : "#1e293b" }}>GitHub</button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors border"
            style={{ background: isDark ? "#27272a" : "#f1f5f9", borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)", color: isDark ? "#eef2ff" : "#1e293b" }}>Google</button>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span style={{ background: isDark ? "#18181b" : "#ffffff", color: colors.textMuted2 }} className="px-2">or</span></div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? "#eef2ff" : "#1e293b" }}>Email address</label>
          <input type="email" placeholder="Enter your email address" className="w-full rounded-lg px-4 py-2.5 outline-none transition-all"
            style={{
              background: isDark ? "#27272a" : "#f8fafc",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"}`,
              color: isDark ? "#eef2ff" : "#1e293b",
            }} />
        </div>
        <button onClick={onLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 group">Continue <span className="group-hover:translate-x-1 transition-transform">▸</span></button>
        <div className="mt-6 text-center text-sm" style={{ color: colors.textMuted2 }}>Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a></div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("uz");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const t = translations[lang];
  const colors = isDarkMode ? themeColors.dark : themeColors.light;

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "Barchasi" || c.category === activeCategory;
    const matchSearch = c.title[lang].toLowerCase().includes(search.toLowerCase()) || c.desc[lang].toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLogin = () => {
    setUser({ name: "Azizbek User", avatar: "https://i.pravatar.cc/150?img=11" });
    setIsAuthModalOpen(false);
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: colors.bg, 
      fontFamily: "'DM Sans', sans-serif", 
      color: colors.text,
      transition: "background 0.3s ease, color 0.3s ease"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${isDarkMode ? "#1e2230" : "#cbd5e1"}; border-radius: 4px; }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{ 
        borderBottom: `1px solid ${colors.footerBorder}`, 
        backdropFilter: "blur(16px)", 
        background: colors.headerBg 
      }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <span className="text-2xl">🎓</span>
            <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: "#fbbf24" }}>EduHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo('home')} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: currentView === 'home' ? "#fbbf24" : colors.textMuted, textDecoration: "none", background:'none', border:'none', cursor:'pointer' }}>{t.nav.home}</button>
            <button onClick={() => navigateTo('courses')} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: currentView === 'courses' ? "#fbbf24" : colors.textMuted, textDecoration: "none", background:'none', border:'none', cursor:'pointer' }}>{t.nav.courses}</button>
            <button onClick={() => navigateTo('teachers')} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: currentView === 'teachers' ? "#fbbf24" : colors.textMuted, textDecoration: "none", background:'none', border:'none', cursor:'pointer' }}>{t.nav.teachers}</button>
            <button onClick={() => navigateTo('faq')} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: currentView === 'faq' ? "#fbbf24" : colors.textMuted, textDecoration: "none", background:'none', border:'none', cursor:'pointer' }}>{t.nav.faq}</button>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
            <LanguageSelector lang={lang} setLang={setLang} isDark={isDarkMode} />

            {user ? (
              <div className="flex items-center gap-3 animate-[fadeUp_0.3s_ease-out]">
                <span className="text-sm font-medium hidden sm:block" style={{ color: colors.textMuted }}>{user.name}</span>
                <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-blue-600 cursor-pointer hover:opacity-90 transition-opacity" />
              </div>
            ) : (
              <>
                <button className="text-sm px-4 py-2" style={{ color: colors.textMuted, background: "none", border: "none", cursor: "pointer" }}>Kirish</button>
                <button onClick={() => setIsAuthModalOpen(true)} className="text-sm font-bold px-4 py-2 rounded-xl" style={{ background: "#fbbf24", color: "#080a0f", border: "none", cursor: "pointer" }}>Ro'yxatdan o'tish</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO (Only on Home View) */}
      {currentView === 'home' && (
        <section className="relative overflow-hidden px-6 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-[0.16] blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse, #fbbf24, transparent 70%)" }}/>
          <div className="absolute top-16 right-0 w-72 h-72 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ background: "#38bdf8" }}/>
          <div className="absolute top-16 left-0 w-72 h-72 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ background: "#c084fc" }}/>

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 fade-up" style={{ background: "rgba(251,191,36,0.08)", borderColor: "rgba(251,191,36,0.22)", color: "#fbbf24" }}>
              <span>🔥</span> {t.hero.badge.split("—")[0]}
            </div>

            <h1 className="font-black leading-tight mb-4 fade-up" style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: colors.text, animationDelay: "80ms" }}>
              {t.hero.title1}{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "#fbbf24" }}>{t.hero.title2}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 rounded-sm" style={{ background: "rgba(251,191,36,0.14)", zIndex: 0 }}/>
              </span>{" "}
              {t.hero.title3}
            </h1>

            <p className="text-lg leading-relaxed mb-8 fade-up" style={{ color: colors.textMuted, animationDelay: "140ms" }}>
              {t.hero.desc}
            </p>

            <div className="relative max-w-lg mx-auto fade-up" style={{ animationDelay: "200ms" }}>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg" style={{ color: colors.textMuted2 }}>🔍</span>
              <input type="text" placeholder={t.hero.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", paddingLeft: "2.75rem", paddingRight: "1rem", paddingTop: "0.875rem", paddingBottom: "0.875rem", borderRadius: "1rem", fontSize: "0.875rem", outline: "none", background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, color: colors.text, boxSizing: "border-box" }} />
            </div>

            <div className="flex items-center justify-center gap-10 mt-10 fade-up" style={{ animationDelay: "260ms" }}>
              {[["50,000+", t.hero.stats.students], ["200+", t.hero.stats.courses], ["100%", t.hero.stats.free]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="font-black text-2xl" style={{ fontFamily: "'Sora', sans-serif", color: colors.text }}>{num}</div>
                  <div className="text-xs mt-0.5" style={{ color: colors.textMuted2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COURSES SECTION */}
      {(currentView === 'home' || currentView === 'courses') && (
        <section className={`px-6 ${currentView === 'courses' ? 'pt-10' : 'pb-8'} max-w-7xl mx-auto`}>
          {currentView === 'courses' && (
            <div className="mb-8 text-center fade-up">
              <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "'Sora', sans-serif", color: colors.text }}>{t.pageTitles.courses}</h2>
              <p style={{ color: colors.textMuted }}>Eng yaxshi kurslarni tanlang va o'rganishni boshlang</p>
            </div>
          )}
          
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-xl text-sm font-semibold border" style={activeCategory === cat ? { background: "#fbbf24", color: "#0a0a0a", borderColor: "#fbbf24", cursor: "pointer", transition: "all 0.2s" } : { background: "transparent", color: colors.textMuted, borderColor: colors.cardBorder, cursor: "pointer", transition: "all 0.2s" }}>{cat}</button>
            ))}
            <span className="ml-auto text-sm" style={{ color: colors.textMuted2 }}>{filtered.length} ta kurs</span>
          </div>

          <main className="pb-20">
            {filtered.length === 0 ? (
              <div className="text-center py-24" style={{ color: colors.textMuted2 }}>
                <p className="text-5xl mb-4">😕</p>
                <p className="text-lg">Hech narsa topilmadi</p>
              </div>
            ) : (
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                {filtered.map((course) => (<CourseCard key={course.id} course={course} lang={lang} isDark={isDarkMode} onOpenModal={setSelectedCourse} />))}
              </div>
            )}
          </main>
        </section>
      )}

      {/* TEACHERS SECTION */}
      {currentView === 'teachers' && (
        <section className="px-6 pt-10 pb-20 max-w-7xl mx-auto fade-up">
           <div className="mb-10 text-center">
             <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "'Sora', sans-serif", color: colors.text }}>{t.pageTitles.teachers}</h2>
             <p style={{ color: colors.textMuted }}>Soha yetakchilari bilan birga o'rganing</p>
           </div>
           <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
              {teachersData.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} lang={lang} isDark={isDarkMode} />
              ))}
           </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {currentView === 'faq' && (
        <section className="px-6 pt-10 pb-20 max-w-3xl mx-auto fade-up">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "'Sora', sans-serif", color: colors.text }}>{t.faqTitle}</h2>
            <p style={{ color: colors.textMuted }}>{t.faqSub}</p>
          </div>
          
          <div className="space-y-3">
            {faqData.map((item, index) => (
              <div key={index} className="border rounded-xl overflow-hidden" style={{ borderColor: colors.cardBorder, background: isDarkMode ? "#131824" : "#ffffff" }}>
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors"
                  style={{ color: colors.text }}
                >
                  <span className="font-medium text-sm md:text-base">{item.q}</span>
                  <span style={{ color: "#fbbf24", transform: openFaqIndex === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>▼</span>
                </button>
                <div style={{ 
                  maxHeight: openFaqIndex === index ? "200px" : "0", 
                  overflow: "hidden", 
                  transition: "max-height 0.3s ease-out" 
                }}>
                  <p className="p-4 pt-0 text-sm" style={{ color: colors.textMuted }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${colors.footerBorder}` }} className="px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: colors.textMuted2 }}>
          <div className="flex items-center gap-2">
            <span>🎓</span>
            <span className="font-bold" style={{ fontFamily: "'Sora', sans-serif", color: colors.textMuted }}>EduHub</span>
            <span>{t.footer.slogan}</span>
          </div>
          <p>© 2025 EduHub. {t.footer.rights}</p>
        </div>
      </footer>

      {/* COURSE MODAL */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
        lang={lang}
        isDark={isDarkMode}
      />

      <LoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} isDark={isDarkMode} />
    </div>
  );
}