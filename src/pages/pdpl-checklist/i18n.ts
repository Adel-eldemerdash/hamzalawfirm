/**
 * Language state and interface copy for the assessment tool.
 *
 * The spec (01-TOOL-SPEC.md sections 2 and 12) ships the tool in English only
 * and puts an Arabic questionnaire out of scope. That was superseded by the
 * client's decision of August 30, 2026 to carry both languages, with the
 * Arabic taken from the source of record.
 *
 * Direction is applied to the tool's own container, never to the document.
 * The site's nav and footer stay left-to-right.
 */

export type Lang = "en" | "ar";

/**
 * Held in memory for the session, like the answers themselves. Nothing about
 * a half-finished compliance self-assessment is written to browser storage.
 */
let current: Lang = "en";

const listeners: Array<(lang: Lang) => void> = [];

export function getLang(): Lang {
  return current;
}

export function isArabic(): boolean {
  return current === "ar";
}

export function onLangChange(fn: (lang: Lang) => void) {
  listeners.push(fn);
}

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  applyDirection();
  listeners.forEach(function (fn) {
    fn(lang);
  });
}

export function applyDirection() {
  const root = document.getElementById("pdpl");
  if (!root) return;
  root.setAttribute("dir", current === "ar" ? "rtl" : "ltr");
  root.setAttribute("lang", current);
}

/** Interface copy. Legal content lives in questions.ar.ts and content.ar.ts. */
const UI: { [key: string]: { en: string; ar: string } } = {
  langToggleLabel: { en: "Language", ar: "اللغة" },
  langEnglish: { en: "English", ar: "English" },
  langArabic: { en: "العربية", ar: "العربية" },

  eyebrow: { en: "Self-assessment", ar: "تقييم ذاتي" },
  landingTitle: {
    en: "What does Egypt’s Personal Data Protection Law require of your organization?",
    ar: "ما الذي يتطلبه قانون حماية البيانات الشخصية المصري من مؤسستكم؟",
  },
  landingLede: {
    en: "Answer questions about how your organization handles data. No legal knowledge is needed. This tool performs the legal characterization for you and shows the result on screen immediately.",
    ar: "أجيبوا عن أسئلة عن كيفية تعاملكم مع البيانات. لا تحتاجون معرفة قانونية؛ فالأداة تتولى التكييف القانوني وتعرض النتيجة على الشاشة فوراً.",
  },
  promiseHeading: { en: "What you will get", ar: "ما الذي ستحصلون عليه" },
  promise1: {
    en: "<strong>Your legal role</strong> under the law  -  controller, processor, or both.",
    ar: "<strong>صفتكم القانونية</strong> بموجب القانون  -  متحكم أم معالج أم الاثنان معاً.",
  },
  promise2: {
    en: "<strong>The primary license or permit you need</strong>, its category, and its official fee band.",
    ar: "<strong>الترخيص أو التصريح الأساسي اللازم لكم</strong>، وفئته، وشريحة رسومه الرسمية.",
  },
  promise3: {
    en: "<strong>Every supplementary license or permit that applies</strong>, with the fee percentage for each.",
    ar: "<strong>كل ترخيص أو تصريح تكميلي ينطبق عليكم</strong>، ونسبة رسوم كل منها.",
  },
  promise4: {
    en: "<strong>Your document and obligation map</strong>  -  what is required, what you already have, and what needs verification.",
    ar: "<strong>خريطة الوثائق والالتزامات</strong>  -  المطلوب، وما هو قائم لديكم فعلاً، وما يحتاج تحققاً.",
  },
  start: { en: "Begin the assessment", ar: "ابدأ التقييم" },

  back: { en: "Back", ar: "السابق" },
  next: { en: "Continue", ar: "التالي" },
  progress: { en: "Question {n} of about {total}", ar: "السؤال {n} من نحو {total}" },
  screenError: {
    en: "Every question on this page needs an answer.",
    ar: "كل سؤال في هذه الصفحة يحتاج إجابة.",
  },
  chooseAnswer: {
    en: "Please choose an answer to continue.",
    ar: "يُرجى اختيار إجابة للمتابعة.",
  },

  exitNote: {
    en: "Nothing you entered has been saved, and no contact details were collected.",
    ar: "لم يُحفظ شيء مما أدخلتموه، ولم تُجمع أي بيانات تواصل.",
  },
  exitReturn: { en: "Return to the site", ar: "العودة إلى الموقع" },

  contactHeading: { en: "Where should we send your result?", ar: "إلى أين نرسل نتيجتكم؟" },
  contactLede: {
    en: "We use these details to produce and deliver your assessment result.",
    ar: "نستخدم هذه البيانات لإعداد نتيجة التقييم وتسليمها لكم.",
  },
  fieldCompany: { en: "Company name", ar: "اسم الشركة" },
  fieldName: { en: "Your full name and job title", ar: "اسمكم الكامل ومسماكم الوظيفي" },
  fieldEmail: { en: "Work email", ar: "بريد العمل الإلكتروني" },
  fieldPhone: { en: "Phone number", ar: "رقم الهاتف" },
  errCompany: {
    en: "Please enter your company name, 2 to 120 characters.",
    ar: "يُرجى إدخال اسم الشركة، من حرفين إلى 120 حرفاً.",
  },
  errName: {
    en: "Please enter your full name and job title, 2 to 120 characters.",
    ar: "يُرجى إدخال الاسم الكامل والمسمى الوظيفي، من حرفين إلى 120 حرفاً.",
  },
  errEmail: {
    en: "Please enter a valid work email address.",
    ar: "يُرجى إدخال بريد عمل إلكتروني صحيح.",
  },
  errPhone: {
    en: "Please enter a phone number, 8 to 20 characters, digits and + only.",
    ar: "يُرجى إدخال رقم هاتف من 8 إلى 20 خانة، أرقاماً وعلامة + فقط.",
  },
  consent: {
    en: "I agree to receive occasional communications from Hamza &amp; Partners Law Firm about Egypt’s Personal Data Protection Law and related services. Your result will be shown whether or not you check this box.",
    ar: "أوافق على تلقي مراسلات من حين لآخر من حمزة وشركاه للمحاماة بشأن قانون حماية البيانات الشخصية والخدمات المتصلة به. وستظهر نتيجتكم سواء أشّرتم على هذا المربع أو لم تؤشروا.",
  },
  submit: { en: "Show my result", ar: "اعرض نتيجتي" },
  submitting: { en: "Preparing your result…", ar: "جارٍ إعداد نتيجتكم…" },

  privacyHeading: { en: "Privacy notice", ar: "إشعار الخصوصية" },
  version: { en: "Version", ar: "النسخة" },

  resultTitle: { en: "Your assessment", ar: "نتيجة تقييمكم" },
  sec1: { en: "1. Your role under the PDPL", ar: "1. صفتكم القانونية بموجب القانون" },
  sec2: {
    en: "2. The primary license or permit you need",
    ar: "2. الترخيص أو التصريح الأساسي اللازم لكم",
  },
  sec3: {
    en: "3. Supplementary licenses and permits",
    ar: "3. التراخيص والتصاريح التكميلية",
  },
  sec4: { en: "4. Registrations and accreditations", ar: "4. القيود والاعتمادات" },
  sec5: {
    en: "5. Your document and obligation map",
    ar: "5. خريطة الوثائق والالتزامات",
  },
  sec6: {
    en: "6. Items we could not determine from your answers",
    ar: "6. بنود لم نستطع تحديدها من إجاباتكم",
  },
  sec7: { en: "7. Statutory timelines", ar: "7. المواعيد القانونية" },
  labelRequired: { en: "Required", ar: "مطلوب" },
  labelInPlace: { en: "Already in place", ar: "قائم لديكم" },
  labelFee: { en: "Official fee", ar: "الرسم الرسمي" },
  labelDisclaimer: { en: "Disclaimer", ar: "إخلاء مسؤولية" },
  inPlaceNote: {
    en: "Deducted from the scope of work on your answers. What remains is to review each against the requirements, not to produce it anew.",
    ar: "مخصومة من نطاق العمل بناءً على إجاباتكم. والمتبقي مراجعة كل منها في ضوء المتطلبات، لا إنشاؤها من جديد.",
  },
  nothingFurther: { en: "Nothing further identified.", ar: "لم يُرصد شيء إضافي." },
  unresolvedLede: {
    en: "Each of these follows from an answer of “Not sure” or “Not known”. Nothing has been assumed in their place.",
    ar: "كل بند من هذه ناتج عن إجابة «غير متأكد» أو «غير معروف». ولم يُفترض شيء مكانها.",
  },
  hedge: {
    en: "On the information given, this is the likely outcome rather than a settled one.",
    ar: "بناءً على المعطيات، هذه هي النتيجة المرجَّحة لا المستقرة.",
  },
  notesOnResult: { en: "Notes on this result", ar: "ملاحظات على هذه النتيجة" },
  conditionsAttach: { en: "Conditions that attach", ar: "اشتراطات مرتبطة" },
  notesOnDpo: {
    en: "Notes on the Data Protection Officer",
    ar: "ملاحظات على مسؤول حماية البيانات",
  },
  obligationsNote: { en: "Obligations to note", ar: "التزامات يُنبَّه إليها" },
  colItem: { en: "Item", ar: "البند" },
  colPeriod: { en: "Period", ar: "المدة" },
  colSource: { en: "Source", ar: "السند" },
  ctaHeading: { en: "Discuss this result with us", ar: "ناقشوا هذه النتيجة معنا" },
  ctaBody: {
    en: "A professional review establishes what this assessment could not, and turns the map above into a plan with a scope and a sequence. The first consultation is free.",
    ar: "المراجعة المهنية تُثبت ما لم يستطع هذا التقييم إثباته، وتحوّل الخريطة أعلاه إلى خطة لها نطاق وتسلسل. والاستشارة الأولى مجانية.",
  },
  ctaButton: { en: "Request a consultation", ar: "اطلب استشارة" },
  ctaNote: {
    en: "Opens a message to info@hamzalawfirm.com with your details and this result already filled in. Press send, and we will reply with a proposed time.",
    ar: "يفتح رسالة إلى info@hamzalawfirm.com وبها بياناتكم وهذه النتيجة مُعبّأة سلفاً. اضغطوا إرسال، ونردّ عليكم بموعد مقترح.",
  },
  firmLine: {
    en: "Hamza &amp; Partners Law Firm  -  48 Fareed Semeika Street, Hegaz Square, Nozha, Cairo. +20 100 170 7074.",
    ar: "حمزة وشركاه للمحاماة  -  48 شارع فريد سميكة، ميدان الحجاز، النزهة، القاهرة. ‎+20 100 170 7074.",
  },
};

export function t(key: string, vars?: { [k: string]: string | number }): string {
  const entry = UI[key];
  if (!entry) return key;
  let s = entry[current];
  if (vars) {
    Object.keys(vars).forEach(function (v) {
      s = s.replace("{" + v + "}", String(vars[v]));
    });
  }
  return s;
}
