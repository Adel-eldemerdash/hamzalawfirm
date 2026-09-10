/**
 * Field checks shared by the site's forms.
 *
 * The length limits mirror database.rules.json. A value the rules would
 * reject must be caught here, or the visitor sees a generic failure after the
 * write is refused instead of being told which field to fix.
 */

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length <= 160 && emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNum: string): boolean {
  if (!phoneNum || phoneNum.length > 20) {
    return false;
  }
  const cleanedNum = phoneNum.replace(/[\s()\-]/g, "");
  const phoneRegex = /^\+?\d{7,15}$/;
  return phoneRegex.test(cleanedNum);
}
