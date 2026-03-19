import { DomainQuestion, Domain, DomainResult } from '../types';

export const domainQuestions: DomainQuestion[] = [
  {
    id: 1,
    question: 'What is your primary professional background?',
    options: [
      { label: '🏥 Medicine / Healthcare', value: 'healthcare' },
      { label: '⚖️ Law / Legal', value: 'legal' },
      { label: '🤖 Engineering / Robotics', value: 'robotics' },
      { label: '📈 Finance / Economics', value: 'finance' },
      { label: '🌍 Languages / Translation', value: 'linguistics' },
      { label: '🔬 Science / Research', value: 'stem' },
    ],
  },
  {
    id: 2,
    question: 'How many years of experience do you have in your field?',
    options: [
      { label: '0–2 years', value: 'entry' },
      { label: '3–5 years', value: 'mid' },
      { label: '6–10 years', value: 'senior' },
      { label: '10+ years', value: 'expert' },
    ],
  },
  {
    id: 3,
    question: 'What type of data are you most comfortable working with?',
    options: [
      { label: '📄 Text documents', value: 'text' },
      { label: '🖼️ Images & visual data', value: 'image' },
      { label: '🎙️ Audio & speech', value: 'audio' },
      { label: '🎬 Video & motion', value: 'video' },
    ],
  },
  {
    id: 4,
    question: 'How many hours per week can you dedicate?',
    options: [
      { label: '1–3 hours (casual)', value: 'low' },
      { label: '4–8 hours (part-time)', value: 'medium' },
      { label: '8–15 hours (serious)', value: 'high' },
      { label: '15+ hours (full-time)', value: 'fulltime' },
    ],
  },
  {
    id: 5,
    question: 'What is your highest education level?',
    options: [
      { label: 'High school diploma', value: 'hs' },
      { label: "Bachelor's degree", value: 'bachelors' },
      { label: "Master's degree", value: 'masters' },
      { label: 'PhD / Doctorate', value: 'phd' },
    ],
  },
];

const DOMAIN_RESULTS: Record<Domain, DomainResult> = {
  healthcare: {
    domain: 'healthcare',
    displayName: 'Healthcare & Medical',
    emoji: '🏥',
    description:
      'Medical AI demands the highest accuracy standards. Your clinical expertise is among the rarest and most valuable contributions on the platform.',
    taskTypes: ['Medical imaging annotation', 'Clinical note evaluation', 'Diagnosis validation', 'Drug interaction review'],
    earningPotential: 'very-high',
    reason: 'Healthcare tasks pay 2–3× standard rate due to expert scarcity and high stakes.',
  },
  legal: {
    domain: 'legal',
    displayName: 'Legal & Compliance',
    emoji: '⚖️',
    description:
      'Legal AI requires precision in contract analysis, case law, and regulatory compliance. Your legal training is rare and commands the highest task rates.',
    taskTypes: ['Contract annotation', 'Case law labeling', 'Compliance review', 'Legal document classification'],
    earningPotential: 'very-high',
    reason: 'Legal domain has the highest points-per-task rate on the entire platform.',
  },
  robotics: {
    domain: 'robotics',
    displayName: 'Robotics & Engineering',
    emoji: '🤖',
    description:
      "Perle's WhisperMind product trains robots using human demonstrations. Engineering expertise is critical for accurate spatial and motion data labeling.",
    taskTypes: ['Motion trajectory annotation', 'Object manipulation labeling', 'Spatial reasoning tasks', 'Sensor data evaluation'],
    earningPotential: 'very-high',
    reason: "WhisperMind robotics data is Perle's highest-value enterprise product right now.",
  },
  finance: {
    domain: 'finance',
    displayName: 'Finance & Economics',
    emoji: '📈',
    description:
      'Financial AI needs deep market understanding to be trustworthy. Your ability to evaluate trading signals, risk models, and economic data is in constant demand.',
    taskTypes: ['Financial document analysis', 'Market sentiment labeling', 'Risk assessment review', 'Economic data validation'],
    earningPotential: 'high',
    reason: 'Finance tasks are high volume with consistent enterprise demand year-round.',
  },
  linguistics: {
    domain: 'linguistics',
    displayName: 'Linguistics & Translation',
    emoji: '🌍',
    description:
      'Perle supports 27 languages. Native speaker fluency combined with linguistic training makes you essential for multilingual AI training tasks.',
    taskTypes: ['Text translation & review', 'Sentiment analysis', 'Named entity labeling', 'Speech transcription'],
    earningPotential: 'high',
    reason: 'Multilingual tasks carry a 1.8× point bonus for rare or regional languages.',
  },
  stem: {
    domain: 'stem',
    displayName: 'Science & Research',
    emoji: '🔬',
    description:
      'STEM expertise powers cutting-edge AI across physics, chemistry, biology, and math. Research-grade annotation quality is highly valued across enterprise clients.',
    taskTypes: ['Scientific literature review', 'Data pattern labeling', 'Formula & equation validation', 'Research methodology review'],
    earningPotential: 'high',
    reason: 'STEM domain covers the widest range of enterprise AI projects on the platform.',
  },
};

export const matchDomain = (answers: Record<number, string>): DomainResult => {
  const primary = answers[1] as Domain;
  return DOMAIN_RESULTS[primary] ?? DOMAIN_RESULTS['stem'];
};

export const getDomainResult = (domain: Domain): DomainResult =>
  DOMAIN_RESULTS[domain] ?? DOMAIN_RESULTS['stem'];

export const getAllDomains = (): DomainResult[] => Object.values(DOMAIN_RESULTS);
