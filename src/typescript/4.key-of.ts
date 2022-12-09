type User = {
  name: string;
  age: number;
  location: string;
};

// Create a union type of the keys of the User type
type UserKeys = keyof User; // The type of UserKeys is "name" | "age" | "location"

const key: UserKeys = 'age';

enum PLAN_TAB_OPTIONS {
  PREMIUM_PRE_PURCHASE = 'PREMIUM_PRE_PURCHASE',
  PREMIUM_POST_PURCHASE = 'PREMIUM_POST_PURCHASE',
  SPARKLE_PRE_PURCHASE = 'SPARKLE_PRE_PURCHASE',
  SPARKLE_POST_PURCHASE = 'SPARKLE_POST_PURCHASE',
  KUNDALI_PRE_PURCHASE = 'KUNDALI_PRE_PURCHASE',
  KUNDALI_POST_PURCHASE = 'KUNDALI_POST_PURCHASE',
}

let activeTab: keyof typeof PLAN_TAB_OPTIONS = 'KUNDALI_POST_PURCHASE';
// activeTab = 'as'; // this is not allowed
activeTab = 'KUNDALI_POST_PURCHASE';

const USER_STATUS = {
  ON_BOARDING_STARTED: 'on_boarding_started',
  OTP_VERIFICATION_INFO: 'otp_verification_info',
  AI_DETAILS: 'ai_details',
  PERSONAL_DETAILS: 'personal_details',
  PARTNER_PREFERENCES: 'partner_preferences',
  ON_BOARDING_COMPLETED: 'on_boarding_completed',
};

const userStatus: keyof typeof USER_STATUS = 'on_boarding_started'; // not allowed
const userStatus2: keyof typeof USER_STATUS = 'ON_BOARDING_STARTED'; // allowed

export {};
