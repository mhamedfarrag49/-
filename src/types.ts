export interface UserProfileAnswers {
  goalApproach: string;
  biggestDream: string;
  fiveYearsLocation: string;
}

export interface FiveYearContractData {
  letterToSelf: string;
  wantToAchieve: string;
  neverBecome: string;
  onePromise: string;
  timestamp: string;
  signature: string;
}

export type StageId = 
  | 0  // 00 Access Screen
  | 1  // 01 System Initialization
  | 2  // 02 The Reason
  | 3  // 03 Who is Mohamed Awad?
  | 4  // 04 The Year 2026
  | 5  // 05 No Photos Required
  | 6  // 06 The Friendship File
  | 7  // 07 The Future You
  | 8  // 08 The 5 Year Contract
  | 9  // 09 The Secret Room
  | 10 // 10 The Gift
  | 11 // 11 The Birthday
  | 12; // 12 Final Screen

export interface StageInfo {
  id: StageId;
  code: string;
  titleEn: string;
  titleAr: string;
}

export const STAGES: StageInfo[] = [
  { id: 0, code: '00', titleEn: 'THE ACCESS SCREEN', titleAr: 'بوابة الدخول' },
  { id: 1, code: '01', titleEn: 'SYSTEM INITIALIZATION', titleAr: 'بدء تشغيل النظام' },
  { id: 2, code: '02', titleEn: 'THE REASON', titleAr: 'السبب والدافع' },
  { id: 3, code: '03', titleEn: 'WHO IS MOHAMED AWAD?', titleAr: 'من هو محمد عوض؟' },
  { id: 4, code: '04', titleEn: 'THE YEAR 2026', titleAr: 'محطة 2026' },
  { id: 5, code: '05', titleEn: 'NO PHOTOS REQUIRED', titleAr: 'بدون صور' },
  { id: 6, code: '06', titleEn: 'THE FRIENDSHIP FILE', titleAr: 'ملف الصداقة' },
  { id: 7, code: '07', titleEn: 'THE FUTURE YOU', titleAr: 'أنت في المستقبل' },
  { id: 8, code: '08', titleEn: 'THE 5 YEAR CONTRACT', titleAr: 'ميثاق الخمس سنوات' },
  { id: 9, code: '09', titleEn: 'THE SECRET ROOM', titleAr: 'الغرفة السرية' },
  { id: 10, code: '10', titleEn: 'THE GIFT', titleAr: 'حقيقة الهدية' },
  { id: 11, code: '11', titleEn: 'THE BIRTHDAY', titleAr: 'عيد الميلاد' },
  { id: 12, code: '12', titleEn: 'FINAL SCREEN', titleAr: 'بداية الفصل الأول' },
];
