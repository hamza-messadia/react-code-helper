export interface ScoreField {
  id: string;
  label: string;
  description?: string;
  points: number;
}

export interface MedicalScore {
  id: string;
  name: string;
  fullName: string;
  category: string;
  specialty: string;
  description: string;
  fields: ScoreField[];
  interpretation: { range: string; risk: string; color: string }[];
  source?: string;
}

export const MEDICAL_SCORES: MedicalScore[] = [
  {
    id: 'chadsvasc',
    name: 'CHA₂DS₂-VASc',
    fullName: 'Score CHA₂DS₂-VASc',
    category: 'scores',
    specialty: 'cardio',
    description: 'Évalue le risque thromboembolique dans la fibrillation atriale',
    fields: [
      { id: 'chf', label: 'Insuffisance cardiaque congestive', description: 'Ou dysfonction VG', points: 1 },
      { id: 'hypertension', label: 'Hypertension artérielle', description: 'Ou traitement antihypertenseur', points: 1 },
      { id: 'age75', label: 'Âge ≥ 75 ans', points: 2 },
      { id: 'diabetes', label: 'Diabète', points: 1 },
      { id: 'stroke', label: 'AVC / AIT / Thromboembolie', points: 2 },
      { id: 'vascular', label: 'Maladie vasculaire', description: 'IDM, AOMI, plaque aortique', points: 1 },
      { id: 'age65', label: 'Âge 65-74 ans', points: 1 },
      { id: 'female', label: 'Sexe féminin', points: 1 },
    ],
    interpretation: [
      { range: '0', risk: 'Risque faible - Pas d\'anticoagulation', color: 'text-green-600' },
      { range: '1', risk: 'Risque modéré - Anticoagulation à considérer', color: 'text-yellow-600' },
      { range: '≥2', risk: 'Risque élevé - Anticoagulation recommandée', color: 'text-red-600' },
    ],
    source: 'European Heart Journal 2010'
  },
  {
    id: 'hasbled',
    name: 'HAS-BLED',
    fullName: 'Score HAS-BLED',
    category: 'scores',
    specialty: 'cardio',
    description: 'Évalue le risque hémorragique sous anticoagulant',
    fields: [
      { id: 'hypertension', label: 'HTA non contrôlée', description: 'PAS > 160 mmHg', points: 1 },
      { id: 'renal', label: 'Insuffisance rénale/hépatique', description: 'Dialyse, créat > 200, cirrhose', points: 1 },
      { id: 'stroke', label: 'AVC', points: 1 },
      { id: 'bleeding', label: 'Antécédent hémorragique', description: 'Ou prédisposition', points: 1 },
      { id: 'inr', label: 'INR labile', description: 'TTR < 60%', points: 1 },
      { id: 'elderly', label: 'Âge > 65 ans', points: 1 },
      { id: 'drugs', label: 'Médicaments/Alcool', description: 'AINS, antiplaquettaires, alcool', points: 1 },
    ],
    interpretation: [
      { range: '0-2', risk: 'Risque hémorragique faible', color: 'text-green-600' },
      { range: '≥3', risk: 'Risque hémorragique élevé - Prudence', color: 'text-red-600' },
    ],
    source: 'Chest 2010'
  },
  {
    id: 'wells-dvt',
    name: 'Wells TVP',
    fullName: 'Score de Wells pour TVP',
    category: 'scores',
    specialty: 'cardio',
    description: 'Probabilité clinique de thrombose veineuse profonde',
    fields: [
      { id: 'cancer', label: 'Cancer actif', description: 'Traitement < 6 mois ou palliatif', points: 1 },
      { id: 'paralysis', label: 'Paralysie/parésie/immobilisation', description: 'Membre inférieur', points: 1 },
      { id: 'bedridden', label: 'Alitement > 3 jours ou chirurgie < 4 sem', points: 1 },
      { id: 'tenderness', label: 'Douleur sur trajet veineux profond', points: 1 },
      { id: 'swelling', label: 'Œdème de tout le membre inférieur', points: 1 },
      { id: 'calf', label: 'Mollet > 3 cm vs controlatéral', description: '10 cm sous tubérosité tibiale', points: 1 },
      { id: 'pitting', label: 'Œdème prenant le godet', description: 'Unilatéral', points: 1 },
      { id: 'collateral', label: 'Veines collatérales superficielles', description: 'Non variqueuses', points: 1 },
      { id: 'previous', label: 'ATCD de TVP documentée', points: 1 },
      { id: 'alternative', label: 'Diagnostic alternatif probable', description: 'Enlève 2 points', points: -2 },
    ],
    interpretation: [
      { range: '≤0', risk: 'Probabilité faible (3%)', color: 'text-green-600' },
      { range: '1-2', risk: 'Probabilité modérée (17%)', color: 'text-yellow-600' },
      { range: '≥3', risk: 'Probabilité élevée (75%)', color: 'text-red-600' },
    ],
    source: 'NEJM 2003'
  },
  {
    id: 'wells-pe',
    name: 'Wells EP',
    fullName: 'Score de Wells pour Embolie Pulmonaire',
    category: 'scores',
    specialty: 'cardio',
    description: 'Probabilité clinique d\'embolie pulmonaire',
    fields: [
      { id: 'dvt', label: 'Signes cliniques de TVP', points: 3 },
      { id: 'alternative', label: 'Diagnostic alternatif moins probable que EP', points: 3 },
      { id: 'hr', label: 'Fréquence cardiaque > 100/min', points: 1.5 },
      { id: 'immob', label: 'Immobilisation ≥ 3j ou chirurgie < 4 sem', points: 1.5 },
      { id: 'previous', label: 'ATCD de TVP ou EP', points: 1.5 },
      { id: 'hemoptysis', label: 'Hémoptysie', points: 1 },
      { id: 'cancer', label: 'Cancer', description: 'Traitement < 6 mois ou palliatif', points: 1 },
    ],
    interpretation: [
      { range: '≤4', risk: 'EP peu probable', color: 'text-green-600' },
      { range: '>4', risk: 'EP probable - Imagerie recommandée', color: 'text-red-600' },
    ],
    source: 'Ann Intern Med 2001'
  },
  {
    id: 'glasgow',
    name: 'Glasgow',
    fullName: 'Score de Glasgow (GCS)',
    category: 'scores',
    specialty: 'neuro',
    description: 'Évalue le niveau de conscience',
    fields: [
      { id: 'eye4', label: 'Ouverture des yeux: Spontanée', points: 4 },
      { id: 'eye3', label: 'Ouverture des yeux: À la demande', points: 3 },
      { id: 'eye2', label: 'Ouverture des yeux: À la douleur', points: 2 },
      { id: 'eye1', label: 'Ouverture des yeux: Aucune', points: 1 },
      { id: 'verbal5', label: 'Réponse verbale: Orientée', points: 5 },
      { id: 'verbal4', label: 'Réponse verbale: Confuse', points: 4 },
      { id: 'verbal3', label: 'Réponse verbale: Mots inappropriés', points: 3 },
      { id: 'verbal2', label: 'Réponse verbale: Sons incompréhensibles', points: 2 },
      { id: 'verbal1', label: 'Réponse verbale: Aucune', points: 1 },
      { id: 'motor6', label: 'Réponse motrice: Obéit aux ordres', points: 6 },
      { id: 'motor5', label: 'Réponse motrice: Localise la douleur', points: 5 },
      { id: 'motor4', label: 'Réponse motrice: Évitement', points: 4 },
      { id: 'motor3', label: 'Réponse motrice: Flexion anormale', points: 3 },
      { id: 'motor2', label: 'Réponse motrice: Extension', points: 2 },
      { id: 'motor1', label: 'Réponse motrice: Aucune', points: 1 },
    ],
    interpretation: [
      { range: '15', risk: 'Conscience normale', color: 'text-green-600' },
      { range: '13-14', risk: 'Traumatisme crânien léger', color: 'text-yellow-600' },
      { range: '9-12', risk: 'Traumatisme crânien modéré', color: 'text-orange-600' },
      { range: '3-8', risk: 'Traumatisme crânien sévère - Coma', color: 'text-red-600' },
    ],
    source: 'Lancet 1974'
  },
  {
    id: 'nihss',
    name: 'NIHSS',
    fullName: 'NIH Stroke Scale',
    category: 'scores',
    specialty: 'neuro',
    description: 'Évalue la sévérité d\'un AVC ischémique',
    fields: [
      { id: 'consciousness', label: 'Niveau de conscience (0-3)', points: 3 },
      { id: 'questions', label: 'Questions (0-2)', points: 2 },
      { id: 'commands', label: 'Commandes (0-2)', points: 2 },
      { id: 'gaze', label: 'Regard (0-2)', points: 2 },
      { id: 'visual', label: 'Champ visuel (0-3)', points: 3 },
      { id: 'facial', label: 'Paralysie faciale (0-3)', points: 3 },
      { id: 'motor_arm', label: 'Motricité bras (0-4 x2)', points: 8 },
      { id: 'motor_leg', label: 'Motricité jambes (0-4 x2)', points: 8 },
      { id: 'ataxia', label: 'Ataxie (0-2)', points: 2 },
      { id: 'sensory', label: 'Sensibilité (0-2)', points: 2 },
      { id: 'language', label: 'Langage (0-3)', points: 3 },
      { id: 'dysarthria', label: 'Dysarthrie (0-2)', points: 2 },
      { id: 'neglect', label: 'Extinction/Négligence (0-2)', points: 2 },
    ],
    interpretation: [
      { range: '0', risk: 'Pas de déficit', color: 'text-green-600' },
      { range: '1-4', risk: 'AVC mineur', color: 'text-yellow-600' },
      { range: '5-15', risk: 'AVC modéré', color: 'text-orange-600' },
      { range: '16-20', risk: 'AVC modéré à sévère', color: 'text-red-500' },
      { range: '21-42', risk: 'AVC sévère', color: 'text-red-700' },
    ],
    source: 'Stroke 1989'
  },
  {
    id: 'apgar',
    name: 'APGAR',
    fullName: 'Score d\'APGAR',
    category: 'scores',
    specialty: 'pediatrie',
    description: 'Évalue l\'état du nouveau-né à la naissance',
    fields: [
      { id: 'appearance2', label: 'Coloration: Rose', points: 2 },
      { id: 'appearance1', label: 'Coloration: Extrémités cyanosées', points: 1 },
      { id: 'appearance0', label: 'Coloration: Cyanose/pâleur', points: 0 },
      { id: 'pulse2', label: 'Fréquence cardiaque: > 100/min', points: 2 },
      { id: 'pulse1', label: 'Fréquence cardiaque: < 100/min', points: 1 },
      { id: 'pulse0', label: 'Fréquence cardiaque: Absente', points: 0 },
      { id: 'grimace2', label: 'Réactivité: Cri vigoureux', points: 2 },
      { id: 'grimace1', label: 'Réactivité: Grimace', points: 1 },
      { id: 'grimace0', label: 'Réactivité: Aucune', points: 0 },
      { id: 'activity2', label: 'Tonus: Mouvements actifs', points: 2 },
      { id: 'activity1', label: 'Tonus: Flexion légère', points: 1 },
      { id: 'activity0', label: 'Tonus: Flasque', points: 0 },
      { id: 'respiration2', label: 'Respiration: Cri vigoureux', points: 2 },
      { id: 'respiration1', label: 'Respiration: Lente/irrégulière', points: 1 },
      { id: 'respiration0', label: 'Respiration: Absente', points: 0 },
    ],
    interpretation: [
      { range: '7-10', risk: 'Nouveau-né en bonne santé', color: 'text-green-600' },
      { range: '4-6', risk: 'Détresse modérée - Surveillance', color: 'text-yellow-600' },
      { range: '0-3', risk: 'Détresse sévère - Réanimation', color: 'text-red-600' },
    ],
    source: 'JAMA 1958'
  },
  {
    id: 'child-pugh',
    name: 'Child-Pugh',
    fullName: 'Score de Child-Pugh',
    category: 'scores',
    specialty: 'internal',
    description: 'Évalue la sévérité de la cirrhose hépatique',
    fields: [
      { id: 'encephalopathy0', label: 'Encéphalopathie: Aucune', points: 1 },
      { id: 'encephalopathy1', label: 'Encéphalopathie: Grade I-II', points: 2 },
      { id: 'encephalopathy2', label: 'Encéphalopathie: Grade III-IV', points: 3 },
      { id: 'ascites0', label: 'Ascite: Absente', points: 1 },
      { id: 'ascites1', label: 'Ascite: Modérée', points: 2 },
      { id: 'ascites2', label: 'Ascite: Tendue', points: 3 },
      { id: 'bilirubin1', label: 'Bilirubine: < 35 µmol/L', points: 1 },
      { id: 'bilirubin2', label: 'Bilirubine: 35-50 µmol/L', points: 2 },
      { id: 'bilirubin3', label: 'Bilirubine: > 50 µmol/L', points: 3 },
      { id: 'albumin1', label: 'Albumine: > 35 g/L', points: 1 },
      { id: 'albumin2', label: 'Albumine: 28-35 g/L', points: 2 },
      { id: 'albumin3', label: 'Albumine: < 28 g/L', points: 3 },
      { id: 'inr1', label: 'INR: < 1.7', points: 1 },
      { id: 'inr2', label: 'INR: 1.7-2.3', points: 2 },
      { id: 'inr3', label: 'INR: > 2.3', points: 3 },
    ],
    interpretation: [
      { range: '5-6', risk: 'Classe A - Cirrhose compensée', color: 'text-green-600' },
      { range: '7-9', risk: 'Classe B - Atteinte significative', color: 'text-yellow-600' },
      { range: '10-15', risk: 'Classe C - Cirrhose décompensée', color: 'text-red-600' },
    ],
    source: 'Br J Surg 1973'
  },
  {
    id: 'sofa',
    name: 'SOFA',
    fullName: 'Sequential Organ Failure Assessment',
    category: 'scores',
    specialty: 'internal',
    description: 'Évalue la défaillance d\'organes en réanimation',
    fields: [
      { id: 'resp0', label: 'PaO2/FiO2 ≥ 400', points: 0 },
      { id: 'resp1', label: 'PaO2/FiO2 300-399', points: 1 },
      { id: 'resp2', label: 'PaO2/FiO2 200-299', points: 2 },
      { id: 'resp3', label: 'PaO2/FiO2 100-199 + VM', points: 3 },
      { id: 'resp4', label: 'PaO2/FiO2 < 100 + VM', points: 4 },
      { id: 'coag0', label: 'Plaquettes ≥ 150', points: 0 },
      { id: 'coag1', label: 'Plaquettes < 150', points: 1 },
      { id: 'coag2', label: 'Plaquettes < 100', points: 2 },
      { id: 'coag3', label: 'Plaquettes < 50', points: 3 },
      { id: 'coag4', label: 'Plaquettes < 20', points: 4 },
      { id: 'liver0', label: 'Bilirubine < 20 µmol/L', points: 0 },
      { id: 'liver1', label: 'Bilirubine 20-32', points: 1 },
      { id: 'liver2', label: 'Bilirubine 33-101', points: 2 },
      { id: 'liver3', label: 'Bilirubine 102-204', points: 3 },
      { id: 'liver4', label: 'Bilirubine > 204', points: 4 },
    ],
    interpretation: [
      { range: '0-6', risk: 'Mortalité < 10%', color: 'text-green-600' },
      { range: '7-9', risk: 'Mortalité 15-20%', color: 'text-yellow-600' },
      { range: '10-12', risk: 'Mortalité 40-50%', color: 'text-orange-600' },
      { range: '≥13', risk: 'Mortalité > 80%', color: 'text-red-600' },
    ],
    source: 'Intensive Care Med 1996'
  },
  {
    id: 'curb65',
    name: 'CURB-65',
    fullName: 'Score CURB-65',
    category: 'scores',
    specialty: 'internal',
    description: 'Évalue la sévérité d\'une pneumonie communautaire',
    fields: [
      { id: 'confusion', label: 'Confusion', description: 'Désorientation temps/espace/personne', points: 1 },
      { id: 'urea', label: 'Urée > 7 mmol/L', description: '> 19 mg/dL', points: 1 },
      { id: 'respiratory', label: 'Fréquence respiratoire ≥ 30/min', points: 1 },
      { id: 'bp', label: 'PA: PAS < 90 ou PAD ≤ 60 mmHg', points: 1 },
      { id: 'age', label: 'Âge ≥ 65 ans', points: 1 },
    ],
    interpretation: [
      { range: '0-1', risk: 'Traitement ambulatoire possible', color: 'text-green-600' },
      { range: '2', risk: 'Hospitalisation courte ou surveillance', color: 'text-yellow-600' },
      { range: '3-5', risk: 'Hospitalisation - Considérer USI', color: 'text-red-600' },
    ],
    source: 'Thorax 2003'
  },
];

export const getScoreById = (id: string): MedicalScore | undefined => {
  return MEDICAL_SCORES.find(score => score.id === id);
};
