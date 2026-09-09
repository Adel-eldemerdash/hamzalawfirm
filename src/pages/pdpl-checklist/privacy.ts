/**
 * The privacy notice, in English and Arabic.
 *
 * The Arabic is the approved text of record, signed off on August 30, 2026.
 * The English is its translation. Neither is paraphrased at render time.
 *
 * The notice is bilingual because it addresses the data subject whose data is
 * being collected and must be intelligible to that person. The Arabic block
 * carries dir="rtl" scoped to itself; the document direction does not change.
 *
 * NOTICE_VERSION in content.ts is stored against every submission as
 * `consentRecord.noticeVersion`, so the firm can show what a person was shown
 * and when. Bump it whenever this text changes, and never reuse a version.
 */

import { NOTICE_VERSION } from "./content";
import { t } from "./i18n";

interface Section {
  heading: string;
  body: string;
}

const EN: Section[] = [
  {
    heading: "Who controls your data",
    body: "Hamza &amp; Partners Law Firm - 48 Fareed Semeika Street, Hegaz Square, Nozha, Cairo, Arab Republic of Egypt. Telephone: +20 100 170 7074. Website: www.hamzalawfirm.com",
  },
  {
    heading: "To contact us about your data and exercise your rights",
    body: "dpo@hamzalawfirm.com",
  },
  {
    heading: "What we collect",
    body: "Your company name, your name and job title, your email address, and your telephone number. Your answers to the assessment questions, and the result produced from them. This tool does not ask for any sensitive personal data, and we ask that you do not enter any in the free-text fields.",
  },
  {
    heading: "Why we collect it, and on what basis",
    body: "To produce your assessment result and deliver it to you. If you give your explicit consent, we also send you subsequent communications about the Personal Data Protection Law and related services. Your result is shown to you whether or not you give that consent. In either case the basis for processing is your explicit consent.",
  },
  {
    heading: "Who sees your data",
    body: "The firm’s public relations and marketing team. And Google, as the cloud hosting provider that processes the data on our behalf and on our instructions. We do not sell your data and we do not make it available to any third party for that party’s own purposes.",
  },
  {
    heading: "Where it is held - cross-border transfer",
    body: "With a cloud hosting provider outside the Arab Republic of Egypt, in the United States of America. The basis for this transfer is your explicit consent to it, and submitting the form constitutes the giving of that consent.",
  },
  {
    heading: "Retention period",
    body: "Twenty-four months from the date of submission, after which it is erased. If you give marketing consent, the record of that consent is kept for three years from the date of the last message we send you, in accordance with Article 18 of the Law.",
  },
  {
    heading: "Your rights",
    body: "Under Article 2 of the Law you have the right: to know of and access and obtain your data; to withdraw a prior consent; to correct, amend, erase, add to, or update it; to restrict its processing to a defined scope; to be notified of any breach or violation affecting your data; and to object to the processing or to its results.",
  },
  {
    heading: "How to exercise your rights or withdraw your consent",
    body: "By message to dpo@hamzalawfirm.com.",
  },
];

const AR: Section[] = [
  {
    heading: "من يتحكم في بياناتكم",
    body: "حمزة وشركاه للمحاماة - 48 شارع فريد سميكة، ميدان الحجاز، النزهة، القاهرة، جمهورية مصر العربية. هاتف: ‎+20 100 170 7074. الموقع: www.hamzalawfirm.com",
  },
  {
    heading: "للتواصل بشأن بياناتكم وممارسة حقوقكم",
    body: "dpo@hamzalawfirm.com",
  },
  {
    heading: "ما الذي نجمعه",
    body: "اسم الشركة، واسمك والمسمى الوظيفي، والبريد الإلكتروني، ورقم الهاتف. وإجاباتكم على أسئلة التقييم، والنتيجة الصادرة عنها. ولا نطلب في هذه الأداة أي بيانات شخصية حساسة، ونرجو عدم إدراجها في الحقول المفتوحة.",
  },
  {
    heading: "لماذا نجمعه، وعلى أي أساس",
    body: "نجمعها لإعداد نتيجة التقييم وتسليمها لكم. وإذا منحتم موافقتكم الصريحة، نرسل إليكم كذلك مراسلات لاحقة عن قانون حماية البيانات الشخصية والخدمات المتصلة به. ونتيجة التقييم تظهر لكم سواء منحتم هذه الموافقة أو لم تمنحوها. وأساس المعالجة في الحالين موافقتكم الصريحة.",
  },
  {
    heading: "من يطّلع على بياناتكم",
    body: "فريق العلاقات العامة والتسويق بالمكتب. وشركة Google بوصفها مقدّم خدمة الاستضافة السحابية الذي يعالج البيانات لحسابنا ووفقاً لتعليماتنا. ولا نبيع بياناتكم ولا نتيحها لأي طرف ثالث لأغراضه الخاصة.",
  },
  {
    heading: "أين تُحفَظ - نقل عبر الحدود",
    body: "تُحفَظ لدى مقدّم خدمة استضافة سحابية خارج جمهورية مصر العربية، في الولايات المتحدة الأمريكية. وأساس هذا النقل موافقتكم الصريحة عليه، وإرسالكم للنموذج يُعد منحاً لها.",
  },
  {
    heading: "مدة الحفظ",
    body: "أربعة وعشرون شهراً من تاريخ الإرسال، ثم تُمحى. وإذا منحتم الموافقة التسويقية، يُحتفظ بسجل تلك الموافقة ثلاث سنوات من تاريخ آخر رسالة نرسلها إليكم، وفقاً للمادة 18 من القانون.",
  },
  {
    heading: "حقوقكم",
    body: "لكم بموجب المادة 2 من القانون: العلم ببياناتكم والوصول إليها والحصول عليها؛ وسحب موافقة سابقة؛ وتصحيحها أو تعديلها أو محوها أو إضافتها أو تحديثها؛ وقصر معالجتها على نطاق محدد؛ والإخطار بأي خرق أو انتهاك يمسّ بياناتكم؛ والاعتراض على المعالجة أو على نتائجها.",
  },
  {
    heading: "كيف تمارسون حقوقكم أو تسحبون موافقتكم",
    body: "برسالة إلى dpo@hamzalawfirm.com.",
  },
];

function sections(list: Section[]): string {
  return list
    .map(function (s) {
      return (
        '<div class="pdpl__privacyitem"><h4>' +
        s.heading +
        "</h4><p>" +
        s.body +
        "</p></div>"
      );
    })
    .join("");
}

/**
 * Two tabs rather than two stacked columns, so neither language is buried
 * below the other on a narrow screen.
 */
export function privacyNoticeHtml(): string {
  return (
    '<details class="pdpl__privacy">' +
    '<summary class="pdpl__privacysummary">' + t("privacyHeading") + "</summary>" +
    '<div class="pdpl__tabs" role="tablist" aria-label="Privacy notice language">' +
    '<button type="button" role="tab" id="pdplTabEn" aria-controls="pdplPanelEn" aria-selected="true" class="pdpl__tab pdpl__tab--active">English</button>' +
    '<button type="button" role="tab" id="pdplTabAr" aria-controls="pdplPanelAr" aria-selected="false" class="pdpl__tab">العربية</button>' +
    "</div>" +
    '<div class="pdpl__privacybody" id="pdplPanelEn" role="tabpanel" aria-labelledby="pdplTabEn">' +
    sections(EN) +
    "</div>" +
    '<div class="pdpl__privacybody pdpl__privacybody--ar" id="pdplPanelAr" role="tabpanel" aria-labelledby="pdplTabAr" dir="rtl" lang="ar" hidden>' +
    sections(AR) +
    "</div>" +
    '<p class="pdpl__privacyversion">' + t("version") + " " + NOTICE_VERSION + "</p>" +
    "</details>"
  );
}

export function wirePrivacyTabs(root: Document | HTMLElement) {
  const en = root.querySelector("#pdplTabEn") as HTMLButtonElement | null;
  const ar = root.querySelector("#pdplTabAr") as HTMLButtonElement | null;
  const panelEn = root.querySelector("#pdplPanelEn") as HTMLElement | null;
  const panelAr = root.querySelector("#pdplPanelAr") as HTMLElement | null;
  if (!en || !ar || !panelEn || !panelAr) return;

  function select(showArabic: boolean) {
    if (!en || !ar || !panelEn || !panelAr) return;
    panelEn.hidden = showArabic;
    panelAr.hidden = !showArabic;
    en.setAttribute("aria-selected", showArabic ? "false" : "true");
    ar.setAttribute("aria-selected", showArabic ? "true" : "false");
    en.className = showArabic ? "pdpl__tab" : "pdpl__tab pdpl__tab--active";
    ar.className = showArabic ? "pdpl__tab pdpl__tab--active" : "pdpl__tab";
  }

  en.addEventListener("click", function () { select(false); });
  ar.addEventListener("click", function () { select(true); });
}
