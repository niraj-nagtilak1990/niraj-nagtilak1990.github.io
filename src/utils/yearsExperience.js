const CAREER_START_YEAR = 2012;

export function getYearsExperience() {
  return new Date().getFullYear() - CAREER_START_YEAR;
}

export const yearsExp = getYearsExperience();
