import { SUPPORTED_LOCALES, Locale, DEFAULT_LOCALE, RESOURCE_TYPES } from './constants';

const translations = {
  ar: {
    common: {
      home: 'الرئيسية',
      admin: 'لوحة التحكم',
      search: 'بحث',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'تم بنجاح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      upload: 'رفع',
      download: 'تحميل',
      close: 'إغلاق',
      confirm: 'تأكيد',
    },
    auth: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
    },
    home: {
      title: 'منصة المعرفة الإسلامية',
      subtitle: 'اسأل واحصل على إجابات من مصادر إسلامية موثوقة',
      searchPlaceholder: 'اكتب سؤالك هنا...',
    },
    search: {
      answer: 'الإجابة',
      references: 'المراجع',
      book: 'الكتاب',
      chapter: 'الفصل',
      verse: 'الآية',
      page: 'الصفحة',
    },
    resources: {
      title: 'المصادر',
      upload: 'رفع مصدر جديد',
      titleLabel: 'عنوان المصدر',
      typeLabel: 'نوع المصدر',
      selectType: 'اختر نوع المصدر',
      types: {
        [RESOURCE_TYPES.QURAN]: 'القرآن الكريم',
        [RESOURCE_TYPES.HADITH]: 'الحديث الشريف',
        [RESOURCE_TYPES.TAFSIR]: 'التفسير',
        [RESOURCE_TYPES.FIQH]: 'الفقه'
      },
      fileLabel: 'الملف',
      uploadFile: 'اختر ملف',
      dragDrop: 'أو اسحب وأفلت',
      fileTypes: 'JSON أو CSV أو Excel (حتى 10 ميجابايت)',
      errors: {
        invalidFormat: 'تنسيق الملف غير صحيح. يرجى التحقق من البيانات',
        requiredFields: 'بعض الحقول المطلوبة مفقودة',
        uploadFailed: 'فشل رفع الملف',
      },
    },
  },
  en: {
    common: {
      home: 'Home',
      admin: 'Admin',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      upload: 'Upload',
      download: 'Download',
      close: 'Close',
      confirm: 'Confirm',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
    },
    home: {
      title: 'Islamic Knowledge Platform',
      subtitle: 'Ask questions and receive answers from authentic Islamic sources',
      searchPlaceholder: 'Type your question here...',
    },
    search: {
      answer: 'Answer',
      references: 'References',
      book: 'Book',
      chapter: 'Chapter',
      verse: 'Verse',
      page: 'Page',
    },
    resources: {
      title: 'Resources',
      upload: 'Upload Resource',
      titleLabel: 'Resource Title',
      typeLabel: 'Resource Type',
      selectType: 'Select resource type',
      types: {
        [RESOURCE_TYPES.QURAN]: 'Quran',
        [RESOURCE_TYPES.HADITH]: 'Hadith',
        [RESOURCE_TYPES.TAFSIR]: 'Tafsir',
        [RESOURCE_TYPES.FIQH]: 'Fiqh'
      },
      fileLabel: 'File',
      uploadFile: 'Upload a file',
      dragDrop: 'or drag and drop',
      fileTypes: 'JSON, CSV, or Excel (up to 10MB)',
      errors: {
        invalidFormat: 'Invalid file format. Please check the data',
        requiredFields: 'Some required fields are missing',
        uploadFailed: 'Failed to upload file',
      },
    },
  },
};

export function getTranslation(locale: Locale = DEFAULT_LOCALE) {
  return translations[locale];
}

export function getCurrentLocale(): Locale {
  const savedLocale = localStorage.getItem('locale') as Locale;
  return SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE;
}

export function setLocale(locale: Locale) {
  if (SUPPORTED_LOCALES.includes(locale)) {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }
}