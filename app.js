/*
 * ════════════════════════════════════════════════════════════════
 * FIREBASE — Realtime Database (verrous de pièces multi-équipes)
 *
 * 1. Créez un projet sur https://console.firebase.google.com/
 * 2. "Ajouter une application" → Web
 * 3. Copiez ici les valeurs de "Paramètres du projet > Vos applis"
 * 4. Dans "Realtime Database", créez la DB (région europe-west1)
 *    et collez ces règles de sécurité :
 *      { "rules": { ".read": true, ".write": true } }
 * 5. Remplacez AUSSI le FIREBASE_CONFIG dans elfes.html
 *
 * Laissez "REMPLACE_MOI" pour désactiver Firebase (jeu mono-écran).
 * ════════════════════════════════════════════════════════════════
 */
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyABJl-EEifHMsSGFgeZsTeOQODCMsTwJg8",
  authDomain:        "escape-noel-9a1f2.firebaseapp.com",
  databaseURL:       "https://escape-noel-9a1f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "escape-noel-9a1f2",
  storageBucket:     "escape-noel-9a1f2.firebasestorage.app",
  messagingSenderId: "366865765699",
  appId:             "1:366865765699:web:b42fb49fddb055553c0bf6",
};

/* ============================================================
 * ⚙️  CONFIGURATION — Modifiez ici sans toucher au reste !
 *
 * CONFIG.timer    : durée du chrono en secondes (300 = 5 min)
 * CONFIG.leds     : les 6 ampoules de la guirlande (mêmes pour tous)
 * CONFIG.teams[N] : config spécifique à chaque équipe
 *   .name         : nom affiché sur l'écran d'accueil
 *   .order        : tableau des indices de LED (0–5) dans l'ordre de clic
 *   .victory      : textes affichés après la victoire
 *     .title, .message, .hint
 * ============================================================ */
const CONFIG = {

  timer: 60,   // ← Durée du chrono en secondes (60 = 1 min)

  /* Les 6 ampoules de la guirlande (index 0 à 5) — palette chaude pixel art */
  leds: [
    { color: '#c44040', glow: '#ff6060', name: 'Rouge'    },  // 0
    { color: '#508038', glow: '#70cc50', name: 'Verte'    },  // 1
    { color: '#d89830', glow: '#ffcc40', name: 'Dorée'    },  // 2
    { color: '#3870c0', glow: '#60a0ff', name: 'Bleue'    },  // 3
    { color: '#e8e0d0', glow: '#ffffff', name: 'Blanche'  },  // 4
    { color: '#9050c0', glow: '#cc80ff', name: 'Violette' },  // 5
  ],

  /* ── Équipe 1 ── */
  teams: {
    1: {
      name: 'Équipe des Rennes',
      order: [0, 2, 4, 1, 5, 3],
      // Ordre : Rouge → Dorée → Blanche → Verte → Violette → Bleue
      victory: {
        title: 'Accès autorisé, humains !',
        message: '🏅 Accès aux systèmes accordé.\n\nUtilisez le plan pour explorer les pièces de la Propriété.'
      }
    },

    /* ── Équipe 2 ── */
    2: {
      name: 'Équipe des Étoiles',
      order: [3, 5, 1, 4, 0, 2],
      // Ordre : Bleue → Violette → Verte → Blanche → Rouge → Dorée
      victory: {
        title: 'Accès autorisé, humains !',
        message: '🏅 Accès aux systèmes accordé.\n\nUtilisez le plan pour explorer les pièces de la Propriété.'
      }
    },

    /* ── Équipe 3 ── */
    3: {
      name: 'Équipe des Flocons',
      order: [4, 1, 3, 0, 2, 5],
      // Ordre : Blanche → Verte → Bleue → Rouge → Dorée → Violette
      victory: {
        title: 'Accès autorisé, humains !',
        message: '🏅 Accès aux systèmes accordé.\n\nUtilisez le plan pour explorer les pièces de la Propriété.'
      }
    }
  },

  /* ── Plan de la maison ── */
  plan: {
    defaultMessage: 'Rien à signaler dans cette pièce…',
    rooms: {
      /* Équipe 1 — Équipe des Rennes */
      1: {
        'terrasse':          { message: '', action: null },
        'terrasse-cuisine':  { message: '', action: null },
        'salon':             { message: '', action: null },
        'entree':            { message: '', action: null },
        'cuisine':           { message: '', action: null },
        'chambre-noah':      { message: '', action: null },
        'chambre-abel':      { message: '', action: null },
        'garage':            { message: '', action: null },
        'couloir':           { message: '', action: null },
        'wc':                { message: '', action: null },
        'salle-de-bain':     { message: '', action: null },
        'chambre-parents':   { message: '', action: null },
      },
      /* Équipe 2 — Équipe des Elfes */
      2: {
        'terrasse':          { message: '', action: null },
        'terrasse-cuisine':  { message: '', action: null },
        'salon':             { message: '', action: null },
        'entree':            { message: '', action: null },
        'cuisine':           { message: '', action: null },
        'chambre-noah':      { message: '', action: null },
        'chambre-abel':      { message: '', action: null },
        'garage':            { message: '', action: null },
        'couloir':           { message: '', action: null },
        'wc':                { message: '', action: null },
        'salle-de-bain':     { message: '', action: null },
        'chambre-parents':   { message: '', action: null },
      },
      /* Équipe 3 — Équipe des Flocons */
      3: {
        'terrasse':          { message: '', action: null },
        'terrasse-cuisine':  { message: '', action: null },
        'salon':             { message: '', action: null },
        'entree':            { message: '', action: null },
        'cuisine':           { message: '', action: null },
        'chambre-noah':      { message: '', action: null },
        'chambre-abel':      { message: '', action: null },
        'garage':            { message: '', action: null },
        'couloir':           { message: '', action: null },
        'wc':                { message: '', action: null },
        'salle-de-bain':     { message: '', action: null },
        'chambre-parents':   { message: '', action: null },
      },
    }
  },

  /* ── Menu des Elfes — liste des outils ──
   *  unlock: null  = toujours actif après badge
   *  unlock: 'key' = débloqué par esc_noel_unlock_key_{teamId} en localStorage
   * ── */
  menu: {
    items: [
      {
        id:     'plan',
        label:  'Plan',
        unlock: null,
        action: 'openPlan',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect width="24" height="24" fill="#5A3A28"/><rect x="1" y="1" width="9" height="10" fill="#E8C27A"/><rect x="12" y="1" width="11" height="6" fill="#E8C27A"/><rect x="12" y="9" width="11" height="14" fill="#E8C27A"/><rect x="1" y="13" width="9" height="10" fill="#E8C27A"/><rect x="11" y="1" width="1" height="22" fill="#5A3A28"/><rect x="1" y="11" width="9" height="1" fill="#5A3A28"/><rect x="3" y="3" width="5" height="6" fill="#C8955C" opacity="0.4"/><rect x="14" y="11" width="7" height="4" fill="#C8955C" opacity="0.3"/></svg>',
      },
      {
        id:     'radio',
        label:  'Radio',
        unlock: 'radio',
        action: 'openRadio',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="2" y="11" width="20" height="11" fill="#5A3A28"/><rect x="3" y="12" width="18" height="9" fill="#8B6914"/><rect x="4" y="13" width="7" height="7" fill="#9CC6D0"/><rect x="4" y="13" width="7" height="2" fill="#C0E0E8"/><rect x="13" y="14" width="4" height="4" fill="#C4504A"/><rect x="13" y="14" width="4" height="1" fill="#D46A5E"/><rect x="11" y="1" width="2" height="11" fill="#5A3A28"/><rect x="8" y="3" width="4" height="2" fill="#8B6914"/><rect x="6" y="6" width="8" height="2" fill="#8B6914"/></svg>',
      },
      {
        id:     'carnet',
        label:  'Carnet',
        unlock: null,
        action: 'openCarnet',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="4" y="2" width="14" height="20" fill="#5E8C5A"/><rect x="5" y="3" width="12" height="18" fill="#4F7D4E"/><rect x="6" y="4" width="10" height="14" fill="#F6F2EA"/><rect x="7" y="7" width="8" height="1" fill="#C8B890"/><rect x="7" y="10" width="8" height="1" fill="#C8B890"/><rect x="7" y="13" width="8" height="1" fill="#C8B890"/><rect x="7" y="16" width="5" height="1" fill="#C8B890"/><rect x="4" y="2" width="2" height="20" fill="#3A5C38"/><rect x="4" y="5" width="2" height="1" fill="#E8B04B"/><rect x="4" y="11" width="2" height="1" fill="#E8B04B"/><rect x="4" y="17" width="2" height="1" fill="#E8B04B"/></svg>',
      },
      {
        id:     'recettes',
        label:  'Recettes',
        unlock: 'recettes',
        action: 'openRecettes',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="2" y="2" width="9" height="20" fill="#8B1A1A"/><rect x="3" y="3" width="7" height="18" fill="#F6F2E8"/><rect x="13" y="2" width="9" height="20" fill="#8B1A1A"/><rect x="14" y="3" width="7" height="18" fill="#EDE8D5"/><rect x="11" y="1" width="2" height="22" fill="#5A0808"/><rect x="4" y="7" width="5" height="1" fill="#D4C4A0"/><rect x="4" y="10" width="5" height="1" fill="#D4C4A0"/><rect x="4" y="13" width="4" height="1" fill="#D4C4A0"/><rect x="15" y="7" width="4" height="3" fill="#D89830"/><rect x="14" y="10" width="6" height="3" fill="#D89830"/><rect x="15" y="13" width="4" height="3" fill="#D89830"/><rect x="15" y="8" width="1" height="1" fill="#C4504A"/><rect x="18" y="11" width="1" height="1" fill="#508038"/></svg>',
      },
      {
        id:     'carillon',
        label:  'Carillon',
        unlock: 'carillon',
        action: 'openCarillon',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="10" y="2" width="4" height="2" fill="#D4A840"/><rect x="9" y="4" width="6" height="2" fill="#D4A840"/><rect x="7" y="6" width="10" height="2" fill="#D4A840"/><rect x="5" y="8" width="14" height="2" fill="#E8C040"/><rect x="4" y="10" width="16" height="6" fill="#D4A840"/><rect x="3" y="10" width="2" height="6" fill="#C49030"/><rect x="19" y="10" width="2" height="6" fill="#C49030"/><rect x="3" y="16" width="18" height="2" fill="#8B6914"/><rect x="10" y="18" width="4" height="2" fill="#D4A840"/><rect x="11" y="20" width="2" height="2" fill="#8B6914"/><rect x="1" y="4" width="1" height="4" fill="#E8B04B"/><rect x="2" y="4" width="2" height="1" fill="#E8B04B"/><rect x="2" y="7" width="1" height="1" fill="#E8B04B"/><rect x="20" y="3" width="1" height="4" fill="#E8B04B"/><rect x="21" y="3" width="2" height="1" fill="#E8B04B"/><rect x="21" y="6" width="1" height="1" fill="#E8B04B"/></svg>',
      },
      {
        id:     'bougie',
        label:  'Bougie',
        unlock: 'bougie',
        action: 'openBougie',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="5" y="4" width="14" height="6" fill="#F0A840" opacity="0.5"/><rect x="10" y="2" width="4" height="1" fill="#5A9888"/><rect x="8" y="3" width="8" height="1" fill="#6BADA0"/><rect x="6" y="4" width="12" height="1" fill="#79BAA8"/><rect x="4" y="5" width="16" height="1" fill="#85C4B4"/><rect x="4" y="6" width="16" height="2" fill="#79BAA8"/><rect x="4" y="8" width="16" height="1" fill="#6BADA0"/><rect x="11" y="9" width="2" height="2" fill="#3A6058"/><rect x="8" y="11" width="8" height="1" fill="#3A9A88"/><rect x="7" y="12" width="10" height="1" fill="#3AA898"/><rect x="6" y="13" width="12" height="3" fill="#3AB0A0"/><rect x="6" y="16" width="12" height="1" fill="#3A9A88"/><rect x="7" y="17" width="10" height="1" fill="#3A8878"/><rect x="8" y="18" width="8" height="1" fill="#2A7868"/><rect x="6" y="19" width="12" height="1" fill="#287060"/><rect x="5" y="20" width="14" height="2" fill="#1A5048"/><rect x="11" y="4" width="2" height="5" fill="#E8A030" opacity="0.6"/></svg>',
      },
      {
        id:     'foret',
        label:  'Forêt',
        unlock: 'foret',
        action: 'openForet',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="9" y="10" width="2" height="6" fill="#D0C8B4"/><rect x="5" y="4" width="14" height="8" fill="#C0300E"/><rect x="6" y="2" width="12" height="4" fill="#C0300E"/><rect x="8" y="1" width="8" height="2" fill="#C03818"/><rect x="6" y="4" width="2" height="2" fill="#801808"/><rect x="5" y="10" width="14" height="2" fill="#801808"/><rect x="7" y="5" width="3" height="3" fill="#E8E0D0"/><rect x="13" y="6" width="3" height="3" fill="#E8E0D0"/><rect x="10" y="4" width="2" height="2" fill="#E8E0D0"/><rect x="4" y="16" width="16" height="6" fill="#1E4418"/><rect x="4" y="16" width="16" height="2" fill="#2A6020"/></svg>',
      },
      {
        id:     'traducteur',
        label:  'Traducteur',
        unlock: 'traducteur',
        action: 'openTraducteur',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="crispEdges"><rect x="11" y="1" width="2" height="2" fill="#C82010"/><rect x="10" y="3" width="4" height="2" fill="#C82010"/><rect x="9" y="5" width="6" height="2" fill="#C82010"/><rect x="8" y="7" width="8" height="2" fill="#A81008"/><rect x="6" y="9" width="12" height="2" fill="#E8E0D0"/><rect x="7" y="11" width="10" height="4" fill="#E8C090"/><rect x="8" y="12" width="1" height="1" fill="#2A1810"/><rect x="15" y="12" width="1" height="1" fill="#2A1810"/><rect x="5" y="15" width="4" height="4" fill="#E8E0D0"/><rect x="15" y="15" width="4" height="4" fill="#E8E0D0"/><rect x="5" y="17" width="14" height="5" fill="#E8E0D0"/><rect x="9" y="15" width="6" height="2" fill="#E8C090"/><rect x="4" y="21" width="16" height="3" fill="#2A6820"/><rect x="4" y="22" width="16" height="1" fill="#D4A840"/></svg>',
      },
    ]
  },

  /* ── Radio du Pôle Nord ── */
  radio: {
    freqMin:            88.0,
    freqMax:           108.0,
    freqStep:            0.1,
    detectionWidth:      0.5,  // ±MHz pour les stations leurres
    realStationWidth:    1.2,  // ±MHz pour la vraie station (plus facile à attraper)
    snapThreshold:       0.8,  // ±MHz : aimant actif si on relâche dans cette zone
    lockTolerance:       0.3,  // MHz : mouvement toléré avant de quitter la station
    realStationDelay:  1000,   // ms sur la vraie station pour déclencher l'indice
    mhzPerRotation:     8.0,   // MHz par tour complet du cadran (moins sensible)
    stations: [
      { freq:  88.5, name: 'Pôle Nord FM',      synth: { type: 'sine',     freq: 220 }, isReal: false },
      { freq:  91.3, name: 'Elfes Radio',        synth: { type: 'sawtooth', freq: 165 }, isReal: false },
      { freq:  94.0, name: 'Renne Express',      synth: { type: 'square',   freq: 196 }, isReal: false },
      { freq:  96.7, name: 'Hiver FM',           synth: { type: 'sine',     freq: 330 }, isReal: false },
      { freq:  99.1, name: '📡 Station Secrète', synth: { type: 'sine',     freq: 523 }, isReal: true,
        clue: {
          title: 'Message radio intercepté',
          text: '…ici la Station Secrète du Pôle Nord…\nle Père Noël a rangé la clé\nsous le sapin du salon…\n…répète : sous le sapin du salon…'
        }
      },
      { freq: 102.4, name: 'Flocons Radio',      synth: { type: 'sawtooth', freq: 262 }, isReal: false },
      { freq: 105.0, name: 'Nuit de Noël FM',    synth: { type: 'triangle', freq: 349 }, isReal: false },
      { freq: 107.5, name: 'Elfe Variétés',      synth: { type: 'sine',     freq: 294 }, isReal: false },
    ],
    voucherCode: 'ANTENNE-2',
    rewardMsg:   'Seuls les mots peuvent résoudre certaines énigmes… En captant cette station, vous avez reçu le message des elfes, et une pièce de puzzle s\'est glissée entre les ondes. Allez vite l\'échanger au Comptoir des Elfes !',
  },

  /* ── Objets détectables sur le plan (communs à toutes les équipes) ── */
  planObjects: {
    'garage': {
      name:    'une vieille radio !',
      message: 'Objet détecté : une vieille radio !',
      tool:    'radio',
      icon:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="4" y="22" width="40" height="22" fill="#5A3A28"/><rect x="6" y="24" width="36" height="18" fill="#8B6914"/><rect x="8" y="26" width="14" height="14" fill="#1a0d04"/><rect x="8" y="26" width="14" height="4" fill="#2a1d0a"/><rect x="10" y="30" width="10" height="8" fill="#9CC6D0"/><rect x="10" y="30" width="10" height="3" fill="#C0E0E8"/><rect x="26" y="27" width="12" height="10" fill="#C4504A"/><rect x="26" y="27" width="12" height="3" fill="#D46A5E"/><rect x="26" y="39" width="6" height="4" fill="#3A2010"/><rect x="34" y="39" width="6" height="4" fill="#3A2010"/><rect x="40" y="28" width="2" height="6" fill="#E8B04B"/><rect x="22" y="2" width="4" height="22" fill="#5A3A28"/><rect x="16" y="6" width="8" height="4" fill="#8B6914"/><rect x="12" y="12" width="16" height="4" fill="#8B6914"/></svg>',
    },
    'cuisine': {
      name:    'un livre de cuisine !',
      message: 'Objet détecté : un livre de cuisine !',
      tool:    'recettes',
      icon:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="5" y="11" width="40" height="34" fill="rgba(0,0,0,0.25)"/><rect x="3" y="8" width="20" height="32" fill="#8B1A1A"/><rect x="4" y="9" width="18" height="30" fill="#F6F2E8"/><rect x="26" y="9" width="18" height="30" fill="#EDE8D5"/><rect x="25" y="8" width="20" height="32" fill="#8B1A1A"/><rect x="22" y="6" width="4" height="36" fill="#5A0808"/><rect x="4" y="9" width="18" height="2" fill="#FFFEF5"/><rect x="26" y="9" width="18" height="2" fill="#F8F5E8"/><rect x="6" y="15" width="14" height="2" fill="#D4C4A0"/><rect x="6" y="19" width="12" height="2" fill="#D4C4A0"/><rect x="6" y="23" width="14" height="2" fill="#D4C4A0"/><rect x="6" y="27" width="10" height="2" fill="#D4C4A0"/><rect x="6" y="31" width="13" height="2" fill="#D4C4A0"/><rect x="31" y="13" width="4" height="2" fill="#D89830"/><rect x="29" y="15" width="8" height="2" fill="#D89830"/><rect x="28" y="17" width="10" height="4" fill="#D89830"/><rect x="29" y="21" width="8" height="2" fill="#D89830"/><rect x="31" y="23" width="4" height="2" fill="#D89830"/><rect x="30" y="18" width="1" height="1" fill="#C4504A"/><rect x="33" y="17" width="1" height="1" fill="#508038"/><rect x="35" y="19" width="1" height="1" fill="#C4504A"/><rect x="28" y="28" width="14" height="2" fill="#D4C4A0"/><rect x="28" y="32" width="12" height="2" fill="#D4C4A0"/></svg>',
    },
    'chambre-parents': {
      name:    'une lampe !',
      message: 'Objet détecté : une lampe !',
      tool:    'bougie',
      warning: 'Attention : une seule équipe à la fois dans cette pièce.\nSi la pancarte indique « Équipe en cours », attendez votre tour ou explorez le reste de la maison.',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="10" y="8" width="28" height="12" fill="#F0A840" opacity="0.6"/><rect x="20" y="4" width="8" height="2" fill="#5A9888"/><rect x="18" y="6" width="12" height="2" fill="#6BADA0"/><rect x="14" y="8" width="20" height="2" fill="#79BAA8"/><rect x="10" y="10" width="28" height="2" fill="#85C4B4"/><rect x="8" y="12" width="32" height="2" fill="#85C4B4"/><rect x="8" y="14" width="32" height="2" fill="#79BAA8"/><rect x="8" y="16" width="32" height="2" fill="#6BADA0"/><rect x="21" y="18" width="6" height="4" fill="#3A6058"/><rect x="16" y="22" width="16" height="2" fill="#3A9A88"/><rect x="13" y="24" width="22" height="2" fill="#3AA898"/><rect x="11" y="26" width="26" height="2" fill="#3AB0A0"/><rect x="10" y="28" width="28" height="4" fill="#3AB0A0"/><rect x="10" y="32" width="28" height="2" fill="#3AA898"/><rect x="11" y="34" width="26" height="2" fill="#3A9A88"/><rect x="13" y="36" width="22" height="2" fill="#3A8878"/><rect x="16" y="38" width="16" height="2" fill="#2A7868"/><rect x="14" y="24" width="2" height="14" fill="#28706A" opacity="0.5"/><rect x="20" y="23" width="2" height="16" fill="#28706A" opacity="0.4"/><rect x="26" y="23" width="2" height="16" fill="#28706A" opacity="0.4"/><rect x="32" y="24" width="2" height="14" fill="#28706A" opacity="0.5"/><rect x="13" y="40" width="22" height="2" fill="#287060"/><rect x="10" y="42" width="28" height="2" fill="#1A5048"/></svg>',
    },
    'salle-de-bain': {
      name:    'un nain !',
      message: 'Objet détecté : un nain !',
      tool:    'traducteur',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="22" y="2" width="4" height="2" fill="#C82010"/><rect x="20" y="4" width="8" height="2" fill="#C82010"/><rect x="18" y="6" width="12" height="2" fill="#C82010"/><rect x="16" y="8" width="16" height="2" fill="#C82010"/><rect x="14" y="10" width="20" height="2" fill="#C82010"/><rect x="13" y="12" width="22" height="2" fill="#C82010"/><rect x="12" y="14" width="24" height="4" fill="#A81008"/><rect x="10" y="18" width="28" height="4" fill="#E8E0D0"/><rect x="14" y="22" width="20" height="8" fill="#E8C090"/><rect x="16" y="24" width="2" height="2" fill="#2A1810"/><rect x="30" y="24" width="2" height="2" fill="#2A1810"/><rect x="14" y="28" width="3" height="2" fill="#D88080"/><rect x="31" y="28" width="3" height="2" fill="#D88080"/><rect x="23" y="27" width="2" height="2" fill="#D09070"/><rect x="10" y="28" width="6" height="6" fill="#E8E0D0"/><rect x="32" y="28" width="6" height="6" fill="#E8E0D0"/><rect x="10" y="34" width="28" height="6" fill="#E8E0D0"/><rect x="18" y="28" width="12" height="4" fill="#E8C090"/><rect x="20" y="29" width="8" height="2" fill="#D0C8B0"/><rect x="8" y="40" width="32" height="8" fill="#2A6820"/><rect x="8" y="40" width="32" height="2" fill="#3A8830"/><rect x="8" y="44" width="32" height="2" fill="#D4A840"/><rect x="22" y="44" width="4" height="2" fill="#A87820"/></svg>',
    },
    'chambre-abel': {
      name:    'une boîte à musique !',
      message: 'Objet détecté : une boîte à musique !',
      tool:    'carillon',
      icon:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="5" y="43" width="38" height="4" fill="rgba(0,0,0,0.2)"/><rect x="4" y="28" width="40" height="14" fill="#5A3A28"/><rect x="5" y="29" width="38" height="12" fill="#7A4A28"/><rect x="6" y="30" width="36" height="10" fill="#D4A840"/><rect x="6" y="34" width="36" height="2" fill="#C49030"/><rect x="4" y="12" width="40" height="16" fill="#5A3A28"/><rect x="5" y="13" width="38" height="14" fill="#7A4A28"/><rect x="6" y="14" width="36" height="12" fill="#D4A840"/><rect x="10" y="16" width="28" height="8" fill="#C4504A"/><rect x="10" y="16" width="28" height="2" fill="#D46A5E"/><rect x="10" y="22" width="28" height="2" fill="#A83828"/><rect x="12" y="17" width="2" height="4" fill="#D4A840"/><rect x="16" y="18" width="2" height="3" fill="#D4A840"/><rect x="20" y="17" width="2" height="4" fill="#D4A840"/><rect x="24" y="18" width="2" height="3" fill="#D4A840"/><rect x="28" y="17" width="2" height="4" fill="#D4A840"/><rect x="32" y="18" width="2" height="3" fill="#D4A840"/><rect x="4" y="27" width="40" height="2" fill="#3A1808"/><rect x="44" y="33" width="4" height="2" fill="#7A4A28"/><rect x="45" y="30" width="2" height="8" fill="#D4A840"/><rect x="14" y="4" width="2" height="6" fill="#E8B04B"/><rect x="16" y="4" width="4" height="2" fill="#E8B04B"/><rect x="16" y="8" width="2" height="2" fill="#E8B04B"/><rect x="26" y="2" width="2" height="6" fill="#E8B04B"/><rect x="28" y="2" width="4" height="2" fill="#E8B04B"/><rect x="28" y="6" width="2" height="2" fill="#E8B04B"/></svg>',
    },
    'chambre-noah': {
      name:    'un champignon !',
      message: 'Objet détecté : un champignon !',
      tool:    'foret',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="8" y="34" width="32" height="10" fill="#F0A840" opacity="0.3"/><rect x="20" y="30" width="8" height="2" fill="#C0B09A"/><rect x="18" y="32" width="12" height="16" fill="#D0C8B4"/><rect x="16" y="46" width="16" height="2" fill="#C0B09A"/><rect x="10" y="28" width="28" height="2" fill="#801808"/><rect x="6" y="10" width="36" height="20" fill="#C82010"/><rect x="4" y="18" width="40" height="8" fill="#C82010"/><rect x="8" y="6" width="32" height="6" fill="#C83018"/><rect x="14" y="2" width="20" height="6" fill="#C03010"/><rect x="6" y="10" width="4" height="2" fill="#D04020"/><rect x="10" y="14" width="8" height="6" fill="#E8E0D0"/><rect x="24" y="18" width="8" height="6" fill="#E8E0D0"/><rect x="20" y="8" width="6" height="6" fill="#E8E0D0"/><rect x="34" y="12" width="6" height="4" fill="#E8E0D0"/></svg>',
    },
  },

  /* ── Carillon des elfes ── */
  carillon: {
    unlockName: 'Carillon des elfes',
    unlock:     'carillon',
    melody:     ['G5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'E5', 'D5', 'C5'],
    noteFreqs:  { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00 },
    noteColors: { C5: '#E05050', D5: '#D88040', E5: '#D4A830', G5: '#509050', A5: '#4878C0' },
    noteNames:  { C5: 'Do', D5: 'Ré', E5: 'Mi', G5: 'Sol', A5: 'La' },
    tempoMs:    620,
    highlightBells: true,   // illumine la clochette correspondante pendant l'écoute
    carnetEntry: {
      icon:  '🎵',
      title: 'Mélodie du Carillon des Elfes',
      text:  'Les elfes gardaient jalousement leur mélodie secrète…\nMais vous avez su l\'entendre et la rejouer ! Le secret du carillon est désormais entre vos mains.',
    },
    voucherCode: 'NOTE-4',
    rewardMsg:   'La boîte à musique a retrouvé sa mélodie ! Quand la dernière note s\'est envolée, une pièce de puzzle est tombée du couvercle. Chaque pièce a sa place, comme chaque note dans une chanson… Allez l\'échanger au Comptoir des Elfes !',
  },

  /* ── Bougie des Elfes ── */
  bougie: {
    unlockName: 'Bougie des Elfes',
    unlock:     'bougie',
    sequence:   [3, 1, 5, 2, 4],
    starPositions: {
      1: { cx: 120, cy: 22  },
      2: { cx: 66,  cy: 90  },
      3: { cx: 46,  cy: 160 },
      4: { cx: 174, cy: 90  },
      5: { cx: 194, cy: 160 },
    },
    texts: {
      consigne: 'Retrouvez les étoiles cachées dans la pièce\npour reconstituer la Constellation des Elfes.',
      wrong:    'Les étoiles se sont éteintes…\nRecommencez depuis le début.',
      success:  'Bravo ! Avant de partir, rallumez la lumière,\nremettez tout en place et retournez la pancarte\nsur « Pièce libre » pour les autres équipes.',
    },
    carnetEntry: {
      icon:  '🕯️',
      title: 'La Bougie des Elfes',
      text:  'Dans le noir le plus total, vous avez suivi les étoiles…\nLa constellation des elfes vous a guidé vers la lumière.',
    },
    voucherCode: 'ETOILE-3',
    rewardMsg:   'La constellation brille à nouveau ! Une étoile filante a laissé tomber une pièce de puzzle à vos pieds. Retenez bien ceci : il suffit parfois de suivre les flèches, comme vous avez suivi les étoiles… Allez l\'échanger au Comptoir des Elfes !',
  },

  /* ── Mini-Forêt des Elfes ── */
  foret: {
    unlockName: 'Mini-Forêt des Elfes',
    unlock:     'foret',
    answer:     27,
    cooldownMs: 30000,
    texts: {
      consigne: 'Les elfes cultivent des champignons magiques dans leur mini-forêt.\nMais ils ont oublié de les compter !\n\nCombien de champignons rouges poussent dans la mini-forêt des elfes ?\nObservez bien… mais n\'ouvrez surtout pas la forêt !',
      wrong:    'Ce n\'est pas le bon compte…\nLes champignons se cachent bien !\nRecomptez tranquillement.',
      cooldown: 'Les elfes recomptent aussi…',
      success:  '🍄 Bonne réponse !\nLes elfes crient de joie — tous les champignons magiques ont été comptés !',
    },
    carnetEntry: {
      icon:  '🍄',
      title: 'La Mini-Forêt des Elfes',
      text:  'Vous avez compté tous les champignons magiques des elfes…\nLeur jardin secret n\'a plus de mystère pour vous !',
    },
    voucherCode: 'MOUSSE-6',
    rewardMsg:   'Bravo, le compte est bon ! Pour vous remercier, les elfes jardiniers vous offrent la pièce de puzzle qu\'ils avaient cachée sous la mousse. Un conseil des elfes : certaines cases comptent plus que d\'autres… Allez l\'échanger au Comptoir des Elfes !',
  },

  /* ── Traducteur Elfique ── */
  traducteur: {
    unlockName:  'Traducteur Elfique',
    unlock:      'traducteur',
    room:        'salle-de-bain',
    gridLetters: ['O','A','L','T','C','I','S','E','U','P','N','F','D','M'],
    hints: [
      {
        word: 'SAPIN',
        img:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" shape-rendering="crispEdges"><rect x="26" y="50" width="8" height="10" fill="#5A3010"/><rect x="22" y="40" width="16" height="12" fill="#2A5818"/><rect x="16" y="28" width="28" height="14" fill="#2A5818"/><rect x="10" y="14" width="40" height="16" fill="#2A5818"/><rect x="22" y="40" width="4" height="2" fill="#3A7828"/><rect x="16" y="28" width="6" height="2" fill="#3A7828"/><rect x="10" y="14" width="8" height="2" fill="#3A7828"/><rect x="28" y="8" width="4" height="2" fill="#E8C040"/><rect x="26" y="10" width="8" height="4" fill="#E8C040"/><rect x="28" y="14" width="4" height="2" fill="#E8C040"/><rect x="18" y="38" width="4" height="4" fill="#C83020"/><rect x="34" y="40" width="4" height="4" fill="#C83020"/><rect x="28" y="30" width="4" height="4" fill="#D4A840"/><rect x="20" y="24" width="4" height="4" fill="#2050A0"/><rect x="36" y="26" width="4" height="4" fill="#2050A0"/></svg>',
      },
      {
        word: 'ETOILE',
        img:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" shape-rendering="crispEdges"><rect x="26" y="26" width="8" height="8" fill="#E8C040"/><rect x="28" y="20" width="4" height="6" fill="#E8C040"/><rect x="29" y="12" width="2" height="8" fill="#E8C040"/><rect x="28" y="34" width="4" height="6" fill="#E8C040"/><rect x="29" y="40" width="2" height="8" fill="#E8C040"/><rect x="20" y="28" width="6" height="4" fill="#E8C040"/><rect x="12" y="29" width="8" height="2" fill="#E8C040"/><rect x="34" y="28" width="6" height="4" fill="#E8C040"/><rect x="40" y="29" width="8" height="2" fill="#E8C040"/><rect x="22" y="22" width="4" height="4" fill="#E8C040"/><rect x="34" y="22" width="4" height="4" fill="#E8C040"/><rect x="22" y="34" width="4" height="4" fill="#E8C040"/><rect x="34" y="34" width="4" height="4" fill="#E8C040"/><rect x="14" y="14" width="2" height="2" fill="#FFF8C0"/><rect x="44" y="14" width="2" height="2" fill="#FFF8C0"/><rect x="14" y="44" width="2" height="2" fill="#FFF8C0"/><rect x="44" y="44" width="2" height="2" fill="#FFF8C0"/></svg>',
      },
      {
        word: 'CADEAU',
        img:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" shape-rendering="crispEdges"><rect x="8" y="34" width="44" height="22" fill="#C83020"/><rect x="8" y="34" width="44" height="4" fill="#D04030"/><rect x="6" y="26" width="48" height="10" fill="#A82010"/><rect x="6" y="26" width="48" height="2" fill="#B83020"/><rect x="6" y="40" width="48" height="4" fill="#E8C040"/><rect x="27" y="26" width="6" height="30" fill="#E8C040"/><rect x="16" y="18" width="12" height="10" fill="#E8C040"/><rect x="18" y="20" width="8" height="6" fill="#D4A820"/><rect x="32" y="18" width="12" height="10" fill="#E8C040"/><rect x="34" y="20" width="8" height="6" fill="#D4A820"/><rect x="27" y="20" width="6" height="6" fill="#C49020"/><rect x="28" y="21" width="4" height="4" fill="#E8C040"/><rect x="10" y="30" width="6" height="2" fill="#D04040"/><rect x="50" y="36" width="2" height="18" fill="#801010"/></svg>',
      },
    ],
    answer:      'FLOCON',
    hintDelay:   180000,
    hintCooldown:120000,
    texts: {
      consigne: 'Un nain garde un parchemin en écriture elfique…\nDéchiffrez l\'alphabet avec les mots-indices,\npuis traduisez le parchemin !',
      prompt:   'Que dit le parchemin du nain ?\nTapez le mot magique.',
      hintBtn:  '✨ Aide des elfes',
      wrong:    'Le nain secoue la tête…\nCe n\'est pas le bon mot.',
      success:  'C\'est le mot magique ! ✨\nLes elfes applaudissent de joie !',
    },
    carnetEntry: {
      icon:  '🧝',
      title: 'Le Traducteur Elfique',
      text:  'Vous avez déchiffré l\'écriture elfique des nains…\nLe parchemin secret n\'a plus de secrets pour vous !',
    },
    voucherCode: 'BONNET-5',
    rewardMsg:   'Vous parlez maintenant la langue des elfes ! Ravi, le nain vous offre la pièce de puzzle qu\'il cachait sous son bonnet. Il vous murmure un secret : ce que vous cherchez attend toujours bien au chaud… Allez l\'échanger au Comptoir des Elfes !',
  },

  /* ── Énigmes associées aux objets — config du composant réutilisable ── */
  puzzles: {
    'recettes': {
      title:      '📖 Livre de recettes de la Mère Noël',
      unlockName: 'Livre de recettes de la Mère Noël',
      unlock:     'recettes',
      carnetEntry: {
        icon:  '📖',
        title: 'Livre de recettes de la Mère Noël',
        text:  'Vous avez découvert ce que chaque tatie ramène à table !\nLe repas des elfes est maintenant complet.',
      },
      errorMessages: [
        "Hmm, ce n'est pas ça… La Mère Noël goûte et fait la grimace !",
        'Pas encore… Réfléchissez bien !',
        "Ce n'est pas ça ! La Mère Noël secoue la tête.",
      ],
      stepSuccessMessage: 'Miam ! C\'est exactement ça !',
      successMessage:     'Le repas des elfes est prêt ! 🍽️',
      /* Illustration de table (page gauche, partagée) */
      tableIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 50" shape-rendering="crispEdges"><rect x="4" y="14" width="52" height="2" fill="#8B5A28"/><rect x="4" y="16" width="52" height="22" fill="#E8D4B0"/><rect x="4" y="16" width="52" height="2" fill="#D4A030" opacity="0.4"/><rect x="4" y="20" width="52" height="2" fill="#D4A030" opacity="0.3"/><rect x="4" y="24" width="52" height="2" fill="#D4A030" opacity="0.4"/><rect x="4" y="28" width="52" height="2" fill="#D4A030" opacity="0.3"/><rect x="4" y="32" width="52" height="2" fill="#D4A030" opacity="0.4"/><rect x="4" y="36" width="52" height="2" fill="#8B5A28"/><rect x="6" y="38" width="8" height="12" fill="#6B3A18"/><rect x="46" y="38" width="8" height="12" fill="#6B3A18"/><rect x="6" y="18" width="16" height="12" fill="#FAF8F4"/><rect x="8" y="20" width="12" height="8" fill="#F0EDE6"/><rect x="38" y="18" width="16" height="12" fill="#FAF8F4"/><rect x="40" y="20" width="12" height="8" fill="#F0EDE6"/><rect x="27" y="8" width="6" height="14" fill="#FAF4EC"/><rect x="28" y="4" width="4" height="6" fill="#E8A020"/><rect x="29" y="2" width="2" height="4" fill="#FFE060"/><rect x="25" y="22" width="10" height="2" fill="#D4A840"/></svg>',
      /* Les 3 questions (dans l'ordre de configuration) */
      questions: [
        {
          tatie:    'Sandra',
          question: 'Tatie Sandra est invitée à un repas où chacun doit apporter quelque chose à manger. Que ramène-t-elle ?',
          answers:  ['samoussa', 'samoussas', 'samosa', 'samosas', 'des samoussas'],
          dishIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" shape-rendering="crispEdges"><rect x="4" y="8" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="18" fill="#FAF8F4"/><rect x="4" y="8" width="28" height="20" fill="#FAF8F4"/><rect x="4" y="26" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="2" fill="#EDE8E0"/><rect x="5" y="22" width="8" height="2" fill="#A85E08"/><rect x="6" y="20" width="6" height="2" fill="#B86C10"/><rect x="7" y="18" width="4" height="2" fill="#C87A18"/><rect x="8" y="16" width="2" height="2" fill="#D08820"/><rect x="14" y="21" width="8" height="2" fill="#A85E08"/><rect x="15" y="19" width="6" height="2" fill="#B86C10"/><rect x="16" y="17" width="4" height="2" fill="#C87A18"/><rect x="17" y="15" width="2" height="2" fill="#D08820"/><rect x="23" y="22" width="8" height="2" fill="#A85E08"/><rect x="24" y="20" width="6" height="2" fill="#B86C10"/><rect x="25" y="18" width="4" height="2" fill="#C87A18"/><rect x="26" y="16" width="2" height="2" fill="#D08820"/></svg>',
        },
        {
          tatie:    'Jacinte',
          question: 'Tatie Jacinte est invitée à un repas où chacun doit apporter quelque chose à manger. Que ramène-t-elle ?',
          answers:  ['croissant', 'croissants', 'des croissants'],
          dishIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" shape-rendering="crispEdges"><rect x="4" y="8" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="18" fill="#FAF8F4"/><rect x="4" y="8" width="28" height="20" fill="#FAF8F4"/><rect x="4" y="26" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="2" fill="#EDE8E0"/><rect x="5" y="12" width="10" height="2" fill="#D4A030"/><rect x="5" y="14" width="2" height="6" fill="#B88010"/><rect x="13" y="14" width="2" height="6" fill="#B88010"/><rect x="6" y="18" width="8" height="2" fill="#D4A030"/><rect x="6" y="12" width="8" height="2" fill="#F0C040"/><rect x="21" y="12" width="10" height="2" fill="#D4A030"/><rect x="21" y="14" width="2" height="6" fill="#B88010"/><rect x="29" y="14" width="2" height="6" fill="#B88010"/><rect x="22" y="18" width="8" height="2" fill="#D4A030"/><rect x="22" y="12" width="8" height="2" fill="#F0C040"/></svg>',
        },
        {
          tatie:    'Katia',
          question: 'Tatie Katia est invitée à un repas où chacun doit apporter quelque chose à manger. Que ramène-t-elle ?',
          answers:  ['pizza', 'pizzas', 'une pizza', 'de la pizza', 'des pizzas'],
          dishIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" shape-rendering="crispEdges"><rect x="4" y="8" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="18" fill="#FAF8F4"/><rect x="4" y="8" width="28" height="20" fill="#FAF8F4"/><rect x="4" y="26" width="28" height="2" fill="#D8C8B0"/><rect x="2" y="10" width="32" height="2" fill="#EDE8E0"/><rect x="10" y="10" width="16" height="16" fill="#C83020"/><rect x="8" y="12" width="20" height="12" fill="#C83020"/><rect x="8" y="12" width="20" height="4" fill="#E8C040"/><rect x="10" y="10" width="16" height="2" fill="#E8C040"/><rect x="17" y="10" width="2" height="16" fill="#A02010" opacity="0.5"/><rect x="8" y="17" width="20" height="2" fill="#A02010" opacity="0.5"/><rect x="12" y="14" width="2" height="2" fill="#2A5010"/><rect x="21" y="19" width="2" height="2" fill="#2A5010"/><rect x="15" y="21" width="2" height="2" fill="#C03028"/></svg>',
        },
      ],
      voucherCode: 'FARINE-7',
      rewardMsg:   'Vous avez débloqué une nouvelle recette de la Mère Noël ! Entre deux pages couvertes de farine, vous trouvez une pièce de puzzle. La Mère Noël le dit toujours : un bon repas se termine par quelque chose de bien chaud… Allez échanger votre pièce au Comptoir des Elfes !',
    },
  },

  /* ── Firebase : verrous de pièces ── */
  firebase: {
    lockTimeout:   15 * 60 * 1000,  // 15 min avant libération automatique
    elfesPassword: 'NOELELFES2024', // mot de passe page organisatrices (elfes.html)
  },
};

/* ============================================================
   ÉTAT DU JEU
============================================================ */
const state = {
  teamId:    1,
  teamCfg:   null,
  testMode:  false,

  timerInterval: null,
  timeLeft:  CONFIG.timer,

  currentStep: 0,          // index dans order[] = prochaine LED attendue
  litLeds:     new Set(),  // indices des LED actuellement allumées

  audioCtx:     null,
  soundEnabled: true,
  wakeLock:     null,

  scanning:   false,       // scan de pièce en cours
  planLoaded: false,       // SVG du plan chargé
  planZoom:   1.0,         // facteur de zoom du plan
};

const fbState = {
  db:        null,
  connected: false,
  rooms:     {},
  mission:   null,
  progress:  {},   // { toolKey: true, done_xxx: true, radio_clue: true, ... }
  carnet:    [],   // entrées du carnet (array)
};
let _fbFirstUpdate = true;

/* ============================================================
   UTILITAIRES DOM
============================================================ */
const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ============================================================
   SONS — Web Audio API
   Les sons ne démarrent qu'après le premier clic utilisateur.
============================================================ */
function ensureAudio() {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

function playTone(freq, duration, type = 'sine', gainVal = 0.28) {
  if (!state.soundEnabled || !state.audioCtx) return;
  const ctx = state.audioCtx;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(gainVal, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.01);
}

function playLedOn() {
  ensureAudio();
  playTone(523.25, 0.25, 'sine', 0.25);
  setTimeout(() => playTone(659.25, 0.25, 'sine', 0.20), 70);
}

function playError() {
  ensureAudio();
  if (!state.audioCtx || !state.soundEnabled) return;
  const ctx = state.audioCtx;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.45);
  gain.gain.setValueAtTime(0.28, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.52);
}

function playVictory() {
  ensureAudio();
  if (!state.soundEnabled || !state.audioCtx) return;
  [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.4, 'sine', 0.28), i * 140);
  });
  setTimeout(() => {
    playTone(523.25,  0.9, 'sine', 0.18);
    playTone(783.99,  0.9, 'sine', 0.18);
    playTone(1046.50, 0.9, 'sine', 0.18);
  }, 600);
}

function playFailure() {
  ensureAudio();
  if (!state.soundEnabled || !state.audioCtx) return;
  [392, 349.23, 293.66].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.4, 'sine', 0.24), i * 300);
  });
}

/* ============================================================
   WAKE LOCK — empêche la mise en veille pendant le jeu
============================================================ */
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      state.wakeLock = await navigator.wakeLock.request('screen');
    } catch (_) { /* non disponible sur cet appareil */ }
  }
}

function releaseWakeLock() {
  if (state.wakeLock) { state.wakeLock.release(); state.wakeLock = null; }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.timerInterval) {
    requestWakeLock();
  }
});

/* ============================================================
   CANVAS — Flocons pixel art, étincelles dorées, sapin
============================================================ */
function initSnow() {
  const canvas = $('snowCanvas');
  const ctx    = canvas.getContext('2d');
  let flakes   = [];
  let sparks   = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    spawnSparks();
  }

  /* ── Flocons : carrés pixelisés ── */
  function newFlake() {
    const size = (Math.random() < 0.5 ? 2 : 4);
    return {
      x:       Math.floor(Math.random() * canvas.width),
      y:       Math.floor(Math.random() * canvas.height - canvas.height),
      size,
      speed:   Math.random() * 0.9 + 0.35,
      drift:   (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.2,
    };
  }

  /* ── Étincelles dorées fixes (fireflies) ── */
  function spawnSparks() {
    sparks = Array.from({ length: 22 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height * 0.7,
      r:       Math.random() * 1.5 + 0.5,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.025 + 0.01,
    }));
  }

  /* ── Sapin pixel art dans le coin haut-gauche ── */
  function drawPixelTree(ctx, ox, oy) {
    const pix = 5; // taille d'un pixel logique

    // Calques du sapin (rétréci du bas vers le haut)
    const layers = [
      [0,0,1,0,0],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [1,1,1,1,1],
    ];
    const trunk  = [[0,0,1,0,0],[0,0,1,0,0]];

    ctx.save();
    ctx.globalAlpha = 0.22;
    layers.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell) return;
        ctx.fillStyle = (r % 2 === 0) ? '#3c6830' : '#508038';
        ctx.fillRect(ox + c * pix, oy + r * pix, pix, pix);
      });
    });
    trunk.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell) return;
        ctx.fillStyle = '#7a3c14';
        ctx.fillRect(ox + c * pix, oy + (layers.length + r) * pix, pix, pix);
      });
    });
    // Étoile au sommet
    ctx.fillStyle = '#e8c030';
    ctx.fillRect(ox + 2 * pix, oy - pix, pix, pix);
    ctx.restore();
  }

  resize();
  flakes = Array.from({ length: 65 }, () => {
    const f = newFlake(); f.y = Math.floor(Math.random() * canvas.height); return f;
  });

  let frame = 0;
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Sapin (statique, dessiné sur le canvas) */
    drawPixelTree(ctx, 10, 10);

    /* Flocons */
    if (!prefersReducedMotion()) {
      flakes.forEach((f, i) => {
        f.y += f.speed; f.x += f.drift;
        if (f.y > canvas.height + 8) { flakes[i] = newFlake(); flakes[i].y = -8; }
        if (f.x < -8) f.x = canvas.width + 8;
        if (f.x > canvas.width + 8) f.x = -8;
        ctx.fillStyle = `rgba(220,230,255,${f.opacity})`;
        ctx.fillRect(Math.floor(f.x), Math.floor(f.y), f.size, f.size);
      });
    } else {
      /* Réduit : flocons statiques */
      flakes.forEach(f => {
        ctx.fillStyle = `rgba(220,230,255,${f.opacity})`;
        ctx.fillRect(Math.floor(f.x), Math.floor(f.y), f.size, f.size);
      });
    }

    /* Étincelles dorées (pulsation douce) */
    frame++;
    sparks.forEach(s => {
      s.phase += s.speed;
      const alpha = (Math.sin(s.phase) * 0.5 + 0.5) * 0.6 + 0.1;
      ctx.fillStyle = `rgba(232,176,60,${alpha})`;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), Math.ceil(s.r * 2), Math.ceil(s.r * 2));
    });

    requestAnimationFrame(animate);
  })();

  window.addEventListener('resize', () => resize());
}

/* ============================================================
   CONFETTIS PIXEL ART (victoire) — dorés & chauds
============================================================ */
let _confAnim = null;

function startConfetti() {
  if (prefersReducedMotion()) return;

  const canvas = $('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  /* Palette dorée/chaude */
  const COLORS = ['#d89830', '#e8c040', '#c44040', '#508038', '#e8e0d0', '#9050c0', '#ff9820'];
  const parts   = Array.from({ length: 100 }, () => ({
    x:        Math.random() * canvas.width,
    y:        Math.random() * canvas.height - canvas.height * 1.1,
    /* Tailles en multiples de 2 pour l'esthétique pixel */
    w:        (Math.floor(Math.random() * 4) + 2) * 2,
    h:        (Math.floor(Math.random() * 2) + 1) * 2,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    speed:    Math.random() * 3.5 + 1.5,
    drift:    (Math.random() - 0.5) * 1.6,
    /* Rotation discrète : 0°, 45°, 90° */
    rot:      Math.floor(Math.random() * 4) * Math.PI / 2,
    rotSpeed: (Math.random() < 0.5 ? 1 : -1) * Math.PI / 2 * (0.01 + Math.random() * 0.02),
  }));

  if (_confAnim) cancelAnimationFrame(_confAnim);

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let done = true;
    parts.forEach(p => {
      p.y += p.speed; p.x += p.drift; p.rot += p.rotSpeed;
      if (p.y < canvas.height + 20) done = false;
      ctx.save();
      ctx.translate(Math.floor(p.x), Math.floor(p.y));
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - p.y / (canvas.height * 1.1));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (!done) _confAnim = requestAnimationFrame(draw);
  })();
}

/* ============================================================
   GUIRLANDE — courbure parabolique des LED items
============================================================ */
function applyGarlandCurve() {
  const items = document.querySelectorAll('.led-item');
  const n = items.length;
  if (n === 0) return;
  /* Courbe de Bézier quadratique normalisée 2t(1-t), pic = 1 au centre */
  items.forEach((el, i) => {
    const t = (i + 0.5) / n;
    const sag = 2 * t * (1 - t);  // 0 aux bords, 0.5 au centre
    const pxOffset = Math.round(sag * 12);  // 12px de sag max
    el.style.transform = `translateY(${pxOffset}px)`;
  });
}

/* ============================================================
   TYPEWRITER (victoire)
============================================================ */
async function typeWriter(el, text, speed = 32) {
  if (prefersReducedMotion()) {
    el.textContent = text;
    return;
  }
  el.textContent = '';
  el.classList.add('typing');
  for (const char of text) {
    el.textContent += char;
    await new Promise(r => setTimeout(r, speed));
  }
  el.classList.remove('typing');
}

/* ============================================================
   CONSTRUCTION DES LED
============================================================ */
function buildLeds() {
  const row = $('ledRow');
  row.innerHTML = '';

  CONFIG.leds.forEach((led, i) => {
    const item = document.createElement('div');
    item.className = 'led-item';
    /* CSS vars sur le parent pour que filter:drop-shadow puisse les lire */
    item.style.setProperty('--led-color', led.color);
    item.style.setProperty('--led-glow',  led.glow);

    const cap  = document.createElement('div');
    cap.className = 'led-cap';

    const bulb = document.createElement('div');
    bulb.className = 'led-bulb';
    bulb.id = `led-${i}`;
    bulb.setAttribute('role', 'button');
    bulb.setAttribute('tabindex', '0');
    bulb.setAttribute('aria-label', `LED ${led.name}`);

    bulb.addEventListener('click',   () => handleLedClick(i));
    bulb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') handleLedClick(i);
    });

    item.appendChild(cap);
    item.appendChild(bulb);
    row.appendChild(item);
  });

  applyGarlandCurve();
}

function ledEl(i)    { return $(`led-${i}`); }
function ledItem(i)  { return ledEl(i)?.closest('.led-item'); }

function lightLed(i) {
  ledEl(i)?.classList.add('on');
  ledItem(i)?.classList.add('lit');
}

function resetAllLeds() {
  CONFIG.leds.forEach((_, i) => {
    ledEl(i)?.classList.remove('on');
    ledItem(i)?.classList.remove('lit');
  });
}

/* ============================================================
   LOGIQUE DE JEU
============================================================ */
function handleLedClick(index) {
  const expected = state.teamCfg.order[state.currentStep];

  if (index === expected) {
    state.litLeds.add(index);
    lightLed(index);
    state.currentStep++;
    playLedOn();

    const total = state.teamCfg.order.length;
    updateProgress(state.currentStep, total);
    showFeedback(`✨ ${state.currentStep} / ${total}`, 'success');

    if (state.currentStep === total) {
      setTimeout(endSuccess, 700);
    }
  } else {
    playError();
    showFeedback('❌ Mauvaise LED ! Recommencez.', 'error');

    /* Secousse de la guirlande */
    const wrap = $('garlandWrap');
    wrap.classList.remove('shake');
    void wrap.offsetWidth; // reflow pour relancer l'animation
    wrap.classList.add('shake');
    wrap.addEventListener('animationend', () => wrap.classList.remove('shake'), { once: true });

    /* Flash rouge sur toute la rangée */
    const row = $('ledRow');
    row.classList.add('error-flash');
    setTimeout(() => {
      row.classList.remove('error-flash');
      state.litLeds.clear();
      state.currentStep = 0;
      resetAllLeds();
      updateProgress(0, state.teamCfg.order.length);
    }, 620);
  }
}

function updateProgress(current, total) {
  const pct = (current / total) * 100;
  $('progressFill').style.width = pct + '%';
  $('progressFill').parentElement.setAttribute('aria-valuenow', current);
  $('progressText').textContent = `${current} / ${total} LED allumées`;
}

function showFeedback(msg, type) {
  const el = $('feedbackMsg');
  el.textContent = msg;
  el.className   = 'feedback-msg ' + (type || '');
  if (type === 'error') {
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.textContent = ''; el.className = 'feedback-msg'; }, 2200);
  }
}

/* ============================================================
   CHRONOMÈTRE
============================================================ */
function fmt(s) {
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

function startTimer() {
  state.timeLeft = CONFIG.timer;
  const disp = $('timerDisplay');
  disp.textContent = fmt(state.timeLeft);
  disp.className   = 'timer-display';

  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    disp.textContent = fmt(state.timeLeft);

    if      (state.timeLeft <= 15) disp.className = 'timer-display danger';
    else if (state.timeLeft <= 30) disp.className = 'timer-display warning';
    else                           disp.className = 'timer-display';

    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      endFailure();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
}

/* ============================================================
   TRANSITIONS D'ÉCRANS
============================================================ */
function startGame() {
  state.currentStep = 0;
  state.litLeds.clear();
  try { localStorage.setItem('esc_noel_team', String(state.teamId)); } catch (_) {}

  buildLeds();
  updateProgress(0, state.teamCfg.order.length);
  $('feedbackMsg').textContent = '';
  $('feedbackMsg').className   = 'feedback-msg';

  if (state.testMode) {
    const html = state.teamCfg.order
      .map(i => {
        const led = CONFIG.leds[i];
        return `<span class="test-swatch" style="background:${led.color}"></span> ${led.name}`;
      })
      .join(' &rarr; ');
    $('testOrderDisplay').innerHTML = html;
    $('testPanel').classList.remove('hidden');
  } else {
    $('testPanel').classList.add('hidden');
  }

  showScreen('screen-game');
  startTimer();
  requestWakeLock();
}

async function endSuccess() {
  stopTimer();
  releaseWakeLock();
  playVictory();

  /* Allumer toutes les LED */
  CONFIG.leds.forEach((_, i) => lightLed(i));

  /* Mémoriser la réussite (sauf en mode test) */
  if (!state.testMode) {
    _fbWriteProgress('game_won');
    try { localStorage.setItem('esc_noel_team', String(state.teamId)); } catch (_) {}
  }

  showScreen('screen-menu');
  buildMenu(true); /* true = confettis */
}

function endFailure() {
  stopTimer();
  releaseWakeLock();
  playFailure();
  showScreen('screen-failure');
}

/* ============================================================
   PLAN — Onglets, chargement SVG, scan de pièce, zoom
============================================================ */
let _scanElements = [];

/* Icône cadenas SVG pixel art (overlay sur les boutons verrouillés) */
const PADLOCK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect x="4" y="7" width="8" height="7" fill="#2C1808"/><rect x="5" y="8" width="6" height="5" fill="#8B6914"/><rect x="6" y="4" width="1" height="4" fill="#2C1808"/><rect x="9" y="4" width="1" height="4" fill="#2C1808"/><rect x="6" y="3" width="4" height="2" fill="#2C1808"/><rect x="6" y="10" width="4" height="3" fill="#5A3A28"/><rect x="7" y="9" width="2" height="2" fill="#5A3A28"/></svg>';

/* ── Helpers Firebase état ── */
function isToolUnlocked(key) {
  if (!key) return true;
  if (state.testMode) return true;
  return fbState.progress[key] === true;
}

function unlockTool(key) {
  if (state.testMode) return;
  _fbWriteProgress(key);
  if (fbState.mission?.tool === key) _endMission(true);
  if (key === 'carnet' && fbState.mission) _endMission(true);
}

function _fbWriteProgress(key, val) {
  if (!fbState.db || !state.teamId) return;
  try { fbState.db.ref('progress/' + state.teamId + '/' + key).set(val !== undefined ? val : true); } catch (_) {}
}

function _fbWriteCarnet(type, entry) {
  if (!fbState.db || !state.teamId) return;
  try { fbState.db.ref('carnet/' + state.teamId + '/' + type).set(entry); } catch (_) {}
}

function buildMenu(withConfetti) {
  const grid = $('menuGrid');
  if (!grid) return;

  $('menuTeamDisplay').textContent = state.teamCfg.name;
  grid.innerHTML = '';

  CONFIG.menu.items.forEach(item => {
    const locked = !isToolUnlocked(item.unlock);
    const btn = document.createElement('button');
    btn.className = 'menu-item-btn' + (locked ? ' locked' : '');
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-label', item.label + (locked ? ' — verrouillé' : ''));

    const iconWrap = document.createElement('div');
    iconWrap.className = 'menu-item-icon';
    iconWrap.innerHTML = item.icon;

    if (locked) {
      const padlock = document.createElement('div');
      padlock.className = 'menu-item-padlock';
      padlock.innerHTML = PADLOCK_SVG;
      iconWrap.appendChild(padlock);
    }

    const label = document.createElement('div');
    label.className = 'menu-item-label';
    label.textContent = item.label;

    btn.appendChild(iconWrap);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      ensureAudio();
      if (locked) { showLockedNotif(); return; }
      if (item.action === 'openPlan')      openPlan();
      if (item.action === 'openRadio')    openRadio();
      if (item.action === 'openCarnet')   openCarnet();
      if (item.action === 'openRecettes') openPuzzle('recettes');
      if (item.action === 'openCarillon') openCarillon();
      if (item.action === 'openBougie')   openBougie();
      if (item.action === 'openForet')    openForet();
      if (item.action === 'openTraducteur') openTraducteur();
    });

    grid.appendChild(btn);
  });

  if (withConfetti) setTimeout(startConfetti, 350);
}

function showLockedNotif() {
  let notif = document.getElementById('lockedNotif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'lockedNotif';
    notif.className = 'locked-notif';
    document.body.appendChild(notif);
  }
  notif.textContent = '🔒 Accès verrouillé…';
  notif.classList.add('show');
  clearTimeout(notif._t);
  notif._t = setTimeout(() => notif.classList.remove('show'), 1800);
}

function openPlan() {
  showScreen('screen-plan');
  if (!state.planLoaded) loadPlan();
  else requestAnimationFrame(applyPlanZoom);
}

function returnToMenu() {
  showScreen('screen-menu');
}

function adjustZoom(delta) {
  state.planZoom = Math.max(0.4, Math.min(4.0, state.planZoom + delta));
  applyPlanZoom();
}

function applyPlanZoom() {
  const svgEl = $('planSvgWrap')?.querySelector('svg');
  if (!svgEl) return;
  const viewport = $('planViewport');
  if (!viewport) return;
  const baseW = viewport.clientWidth || 320;
  const vb = svgEl.viewBox.baseVal;
  if (!vb || vb.width === 0) return;

  const scaledW = Math.round(baseW * state.planZoom);
  const scaledH = Math.round(scaledW * (vb.height / vb.width));
  svgEl.setAttribute('width',  scaledW);
  svgEl.setAttribute('height', scaledH);
  if ($('planZoomLabel')) $('planZoomLabel').textContent = Math.round(state.planZoom * 100) + '%';
}

function playScanSound() {
  ensureAudio();
  if (!state.audioCtx || !state.soundEnabled) return;
  /* Bip initial */
  playTone(1400, 0.08, 'square', 0.09);
  /* Séquence de balayage */
  [0.25, 0.55, 0.85, 1.15, 1.45, 1.75].forEach(t => {
    setTimeout(() => {
      if (!state.scanning) return;
      playTone(900 + Math.round(Math.random() * 3) * 220, 0.07, 'square', 0.07);
    }, t * 1000);
  });
  /* Bip de confirmation */
  setTimeout(() => { if (state.audioCtx) playTone(1600, 0.18, 'sine', 0.14); }, 1900);
}

function addScanOverlay(pieceEl) {
  const svgEl = $('planSvgWrap')?.querySelector('svg');
  if (!svgEl) return;

  _scanElements.forEach(el => el.remove());
  _scanElements = [];

  const sol = pieceEl.querySelector('.sol');
  if (!sol) return;

  /* Surbrillance dorée */
  const pts = sol.getAttribute('points');
  if (pts) {
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    overlay.setAttribute('points', pts);
    overlay.setAttribute('fill', 'rgba(232,176,75,0.28)');
    overlay.setAttribute('pointer-events', 'none');
    svgEl.appendChild(overlay);
    _scanElements.push(overlay);
  }

  /* Ligne de scan animée */
  const bbox = sol.getBBox();
  if (!bbox || bbox.width === 0) return;

  const scanRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  scanRect.setAttribute('x',      bbox.x + 2);
  scanRect.setAttribute('width',  bbox.width - 4);
  scanRect.setAttribute('height', 4);
  scanRect.setAttribute('fill',   '#E8B04B');
  scanRect.setAttribute('opacity','0.95');
  scanRect.setAttribute('pointer-events', 'none');
  svgEl.appendChild(scanRect);
  _scanElements.push(scanRect);

  /* Animation par paliers (style pixel art) */
  const startY = bbox.y, rangeY = bbox.height, dur = 1800;
  const t0 = performance.now();
  (function step(now) {
    const prog = Math.min((now - t0) / dur, 1);
    scanRect.setAttribute('y', Math.floor((startY + prog * rangeY) / 4) * 4);
    if (prog < 1) requestAnimationFrame(step);
  })(performance.now());
}

function removeScanOverlay() {
  _scanElements.forEach(el => el.remove());
  _scanElements = [];
}

async function scanRoom(pieceEl) {
  if (state.scanning) return;

  const nom     = pieceEl.dataset.nom   || '?';
  const pieceId = pieceEl.dataset.piece || '';

  /* Firebase : vérification verrous avant scan */
  if (fbState.db) {
    if (fbState.mission) {
      _showQuickScanMsg(nom, pieceId === fbState.mission.roomId
        ? '🎯 Votre mission est ici !\nScannez l\'objet pour débloquer votre outil.'
        : '🎯 Mission en cours !\nTerminez-la avant d\'explorer d\'autres pièces.');
      return;
    }
    const _lck = fbState.rooms[pieceId];
    if (_lck?.lockedBy && String(_lck.lockedBy) !== String(state.teamId)) {
      _showQuickScanMsg(nom,
        '🔒 Une autre équipe d\'humains est déjà en mission dans cette pièce…\nRevenez plus tard !');
      return;
    }
  }

  state.scanning = true;

  $('scanRoomName').textContent = '';
  $('scanMsg').textContent      = '';
  const dialog = $('scanDialog');
  dialog.classList.remove('hidden', 'scan-done');

  addScanOverlay(pieceEl);
  playScanSound();

  /* Afficher le nom de la pièce en typewriter */
  await typeWriter($('scanRoomName'), nom, 36);

  /* Attendre la fin de l'animation de scan (1.8 s depuis le début) */
  const elapsed = 36 * nom.length;
  await new Promise(r => setTimeout(r, Math.max(0, 1800 - elapsed) + 200));
  removeScanOverlay();

  /* Message depuis CONFIG (supprimé si objet détectable présent) */
  const roomCfg  = CONFIG.plan?.rooms?.[state.teamId]?.[pieceId];
  const hasObject = !!CONFIG.planObjects?.[pieceId];
  const message  = hasObject
    ? (roomCfg?.message || '')
    : (roomCfg?.message || CONFIG.plan?.defaultMessage || 'Rien à signaler dans cette pièce…');

  /* Réinitialiser la zone objet */
  const objWrap = $('scanObjectWrap');
  if (objWrap) objWrap.classList.add('hidden');
  const objMsg = $('scanObjectMsg');
  if (objMsg) objMsg.textContent = '';

  if (message) {
    await typeWriter($('scanMsg'), message, 22);
  } else {
    $('scanMsg').textContent = '';
  }

  /* Objet détectable dans cette pièce */
  await showScanObject(pieceId);

  /* Firebase : proposition de mission */
  if (fbState.db) {
    const _planObj = CONFIG.planObjects?.[pieceId];
    if (_planObj && !isToolUnlocked(_planObj.tool) && !fbState.mission) {
      state.scanning = false;
      _showLockConfirm(pieceId, nom, _planObj);
      return; // confirm gère la fermeture du dialog
    }
  }

  /* Action optionnelle */
  if (typeof roomCfg?.action === 'function') roomCfg.action(pieceEl, nom, pieceId);

  state.scanning = false;
  dialog.classList.add('scan-done');

  /* Auto-fermeture après 7 s */
  setTimeout(() => { if (!state.scanning) dialog.classList.add('hidden'); }, 7000);
}

function loadPlan() {
  if (state.planLoaded) return;

  const wrap  = $('planSvgWrap');
  const svgEl = wrap?.querySelector('svg');
  if (!svgEl) return;

  /* SVG embarqué dans le HTML — retirer les attributs de taille fixes */
  svgEl.removeAttribute('width');
  svgEl.removeAttribute('height');

  /* Clics sur les pièces */
  wrap.querySelectorAll('.piece').forEach(piece => {
    piece.addEventListener('click', () => scanRoom(piece));
  });

  /* Boutons zoom */
  $('btnZoomIn').addEventListener('click',  () => adjustZoom(0.3));
  $('btnZoomOut').addEventListener('click', () => adjustZoom(-0.3));

  /* Pinch-to-zoom */
  let pinchDist = null;
  const viewport = $('planViewport');
  viewport.addEventListener('touchstart', e => {
    if (e.touches.length === 2) pinchDist = null;
  }, { passive: true });
  viewport.addEventListener('touchmove', e => {
    if (e.touches.length !== 2) { pinchDist = null; return; }
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (pinchDist !== null) adjustZoom(state.planZoom * (d / pinchDist - 1));
    pinchDist = d;
  }, { passive: false });
  viewport.addEventListener('touchend', () => { pinchDist = null; }, { passive: true });

  /* Fermer le dialog au tap */
  $('scanDialog').addEventListener('click', () => {
    if (!state.scanning) $('scanDialog').classList.add('hidden');
  });

  /* Retour au menu */
  $('btnPlanBack').addEventListener('click', () => { ensureAudio(); returnToMenu(); });

  state.planLoaded = true;
  applyPlanZoom();

  /* Groupe SVG pour les verrous Firebase */
  const _svgForLock = wrap.querySelector('svg');
  if (_svgForLock) {
    const _lockGrp = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    _lockGrp.setAttribute('id', 'planLockOverlay');
    _lockGrp.setAttribute('pointer-events', 'none');
    _svgForLock.appendChild(_lockGrp);
    _renderPlanLocks();
  }

  /* Boutons de la bannière mission */
  const _abBtn = $('missionAbandonBtn');
  if (_abBtn && !_abBtn.dataset.bound) {
    _abBtn.dataset.bound = '1';
    _abBtn.addEventListener('click', () => {
      ensureAudio();
      $('missionAbandonConfirm').classList.remove('hidden');
    });
    $('missionAbandonYes').addEventListener('click', () => {
      ensureAudio();
      $('missionAbandonConfirm').classList.add('hidden');
      _endMission(true);
    });
    $('missionAbandonNo').addEventListener('click', () => {
      ensureAudio();
      $('missionAbandonConfirm').classList.add('hidden');
    });
  }
  _updateMissionBanner();

}

/* ============================================================
   SCAN PLAN — Objet détecté dans une pièce
============================================================ */
async function showScanObject(pieceId) {
  const obj = CONFIG.planObjects?.[pieceId];
  if (!obj) return;

  const wrap = $('scanObjectWrap');
  const icon = $('scanObjectIcon');
  const msg  = $('scanObjectMsg');
  if (!wrap || !icon || !msg) return;

  icon.innerHTML = obj.icon;
  msg.textContent = '';
  const warnEl = $('scanObjectWarning');
  if (warnEl) warnEl.classList.add('hidden');
  wrap.classList.remove('hidden');

  await typeWriter(msg, obj.message, 24);

  if (obj.warning && warnEl) {
    warnEl.textContent = '';
    warnEl.classList.remove('hidden');
    await typeWriter(warnEl, obj.warning, 20);
  }
}

/* ============================================================
   TAG NFC — gestion de ?tag=
============================================================ */
function handleTagScan(tag) {
  /* Retrouver l'équipe depuis localStorage */
  let teamId;
  try { teamId = parseInt(localStorage.getItem('esc_noel_team'), 10); } catch (_) {}

  if (!CONFIG.teams[teamId]) {
    showScreen('screen-tag-error');
    $('tagErrorMsg').textContent = 'Aucun badge détecté !\nScannez d\'abord le badge NFC de votre équipe.';
    return;
  }

  /* Vérifier que le badge a été validé */
  try {
    if (localStorage.getItem('esc_noel_success_' + teamId) !== '1') {
      showScreen('screen-tag-error');
      $('tagErrorMsg').textContent = 'Badge non validé !\nTerminez d\'abord l\'épreuve de la guirlande.';
      return;
    }
  } catch (_) {
    showScreen('screen-tag-error');
    $('tagErrorMsg').textContent = 'Erreur d\'accès aux données.';
    return;
  }

  state.teamId  = teamId;
  state.teamCfg = CONFIG.teams[teamId];

  if (tag === 'radio') {
    handleRadioTag();
  } else if (CONFIG.puzzles?.[tag]) {
    handlePuzzleTag(tag);
  } else if (tag === 'boite-a-musique') {
    handleCarillonTag();
  } else if (tag === 'lampe') {
    handleBougieTag();
  } else if (/^nuit-[1-5]$/.test(tag)) {
    handleNuitTag(parseInt(tag.split('-')[1], 10));
  } else if (tag === 'champignon') {
    handleForetTag();
  } else if (tag === 'nain') {
    handleNainTag();
  } else {
    showScreen('screen-tag-error');
    $('tagErrorMsg').textContent = 'Tag inconnu : « ' + tag + ' »';
  }
}

function handlePuzzleTag(puzzleId) {
  const pz = CONFIG.puzzles?.[puzzleId];
  if (!pz) {
    showScreen('screen-tag-error');
    $('tagErrorMsg').textContent = 'Tag inconnu.';
    return;
  }
  if (isToolUnlocked(pz.unlock)) {
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(() => openPuzzle(puzzleId), 80);
  } else {
    unlockTool(pz.unlock);
    showUnlockAnimation(pz.unlockName || pz.title, () => {
      showScreen('screen-menu');
      buildMenu(false);
    });
  }
}

function handleRadioTag() {
  if (isToolUnlocked('radio')) {
    /* Déjà débloqué → aller directement à la radio */
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(openRadio, 80);
  } else {
    /* Première fois → animation de déblocage */
    unlockTool('radio');
    showUnlockAnimation('Radio du Pôle Nord', () => {
      showScreen('screen-menu');
      buildMenu(false);
    });
  }
}

function handleCarillonTag() {
  const cfg = CONFIG.carillon;
  if (isToolUnlocked(cfg.unlock)) {
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(openCarillon, 80);
  } else {
    unlockTool(cfg.unlock);
    showUnlockAnimation(cfg.unlockName, () => {
      showScreen('screen-menu');
      buildMenu(false);
    });
  }
}

function showUnlockAnimation(itemName, callback) {
  showScreen('screen-unlock');
  $('unlockItemName').textContent = itemName;

  /* Confettis sur le canvas de déblocage */
  const canvas = $('unlockCanvas');
  if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx    = canvas.getContext('2d');
    const COLORS = ['#d89830','#e8c040','#c44040','#508038','#e8e0d0','#9050c0'];
    const parts  = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: (Math.floor(Math.random() * 3) + 2) * 2,
      h: (Math.floor(Math.random() * 2) + 1) * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 3 + 1.5,
      drift: (Math.random() - 0.5) * 1.4,
    }));
    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      parts.forEach(p => {
        p.y += p.speed; p.x += p.drift;
        if (p.y < canvas.height + 20) alive = true;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.w, p.h);
        ctx.globalAlpha = 1;
      });
      if (alive) requestAnimationFrame(draw);
    })();
  }

  playVictory();
  setTimeout(callback, 3400);
}

/* ============================================================
   MODE TEST — bannière en haut de l'écran d'accueil
============================================================ */
function setupTestBanner() {
  const banner = document.createElement('div');
  banner.style.cssText = [
    'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:999',
    'background:rgba(216,152,48,0.92)', 'color:#3c1808',
    'font:bold 11px/1.4 monospace', 'text-align:center', 'padding:4px 8px',
    'pointer-events:none',
  ].join(';');
  banner.textContent = `🔧 MODE TEST — ${state.teamCfg.name}`;
  document.body.appendChild(banner);
}

/* ============================================================
   INITIALISATION
============================================================ */
function init() {
  const params = new URLSearchParams(window.location.search);

  /* ── Tag NFC : ?tag=radio etc. ── */
  const tag = params.get('tag');
  if (tag) {
    initSnow();
    /* Récupérer l'équipe pour que Firebase sache où écrire */
    try {
      const savedTeam = parseInt(localStorage.getItem('esc_noel_team'), 10);
      if (CONFIG.teams[savedTeam]) state.teamId = savedTeam;
    } catch (_) {}
    initFirebase();
    handleTagScan(tag);
    return;
  }

  const raw    = parseInt(params.get('equipe'), 10);
  const teamId = CONFIG.teams[raw] ? raw : 1;

  /* ── Réinitialisation forcée : ?reset=1 ── */
  if (params.get('reset') === '1') {
    const prefix = 'esc_noel_';
    const suffix = '_' + teamId;
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix) && k.endsWith(suffix)) toRemove.push(k);
    }
    toRemove.forEach(k => localStorage.removeItem(k));
    /* Retirer le paramètre reset de l'URL sans recharger */
    const clean = new URL(window.location.href);
    clean.searchParams.delete('reset');
    window.history.replaceState({}, '', clean.toString());
  }

  state.teamId   = teamId;
  state.teamCfg  = CONFIG.teams[teamId];
  state.testMode = params.get('test') === '1';

  initFirebase();

  $('teamNameWelcome').textContent = state.teamCfg.name;

  initSnow();

  if (state.testMode) setupTestBanner();

  $('soundBtn').addEventListener('click', () => {
    ensureAudio();
    state.soundEnabled = !state.soundEnabled;
    $('soundBtn').textContent = state.soundEnabled ? '🔊' : '🔇';
  });

  $('btnStart').addEventListener('click', () => {
    ensureAudio();
    startGame();
  });

  $('btnRetry').addEventListener('click', () => {
    ensureAudio();
    startGame();
  });

  /* Toujours montrer la guirlande — le listener Firebase gérera le skip si déjà gagné */
  showScreen('screen-welcome');
}

/* ============================================================
   RADIO — état, audio, cadran
============================================================ */
const radioState = {
  freq:             88.0,
  dialAngle:        0,
  dragging:         false,
  lastAngle:        0,
  realStationTimer: null,
  clueFound:        false,
  initialized:      false,
  lockedStation:    null,   // station verrouillée (aimant actif)
  snapAnim:         null,   // requestAnimationFrame pour l'animation aimant
};

let _radioAudio = null;

function openRadio() {
  showScreen('screen-radio');
  if (!radioState.initialized) {
    radioState.initialized = true;
    setupRadioDial();
    buildStationMarkers();
    $('btnRadioBack').addEventListener('click', () => { ensureAudio(); closeRadio(); });
    $('btnRadioReplay').addEventListener('click', () => { ensureAudio(); replayRealStation(); });
  }
  updateRadioFreqDisplay(radioState.freq);
  drawDial(radioState.dialAngle);

  /* Restaurer l'état depuis Firebase */
  if (fbState.progress['radio_clue'] === true) {
    radioState.clueFound = true;
    $('btnRadioReplay').classList.remove('hidden');
  }

  /* Démarrer l'audio après interaction utilisateur */
  setTimeout(() => initRadioAudio(), 100);
}

function closeRadio() {
  stopRadioAudio();
  clearTimeout(radioState.realStationTimer);
  radioState.realStationTimer = null;
  returnToMenu();
}

/* ── Audio radio (bruit blanc + oscillateur station) ── */
function initRadioAudio() {
  if (_radioAudio || !state.soundEnabled) return;
  ensureAudio();
  if (!state.audioCtx) return;

  const ctx = state.audioCtx;

  /* Bruit blanc (loop) */
  const bufLen = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const noiseData   = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufLen; i++) noiseData[i] = Math.random() * 2 - 1;

  const noiseSrc = ctx.createBufferSource();
  noiseSrc.buffer = noiseBuffer;
  noiseSrc.loop   = true;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2000;
  noiseFilter.Q.value = 0.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.18;

  noiseSrc.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSrc.start();

  /* Oscillateur station (un seul, retuneable) */
  const stationOsc = ctx.createOscillator();
  stationOsc.type  = 'sine';
  stationOsc.frequency.value = 440;

  const stationGain = ctx.createGain();
  stationGain.gain.value = 0;

  stationOsc.connect(stationGain);
  stationGain.connect(ctx.destination);
  stationOsc.start();

  _radioAudio = { noiseSrc, noiseGain, stationOsc, stationGain };
}

function stopRadioAudio() {
  if (!_radioAudio) return;
  try { _radioAudio.noiseSrc.stop(); } catch (_) {}
  try { _radioAudio.stationOsc.stop(); } catch (_) {}
  _radioAudio = null;
}

function updateRadioAudio(strength, station) {
  if (!_radioAudio || !state.soundEnabled) return;
  const { noiseGain, stationOsc, stationGain } = _radioAudio;
  const ctx = state.audioCtx;
  const now = ctx.currentTime;

  noiseGain.gain.setTargetAtTime(0.18 * (1 - strength * 0.85), now, 0.12);

  if (station && strength > 0) {
    stationOsc.type = station.synth.type;
    stationOsc.frequency.setTargetAtTime(station.synth.freq, now, 0.06);
    stationGain.gain.setTargetAtTime(0.35 * strength, now, 0.12);
  } else {
    stationGain.gain.setTargetAtTime(0, now, 0.12);
  }
}

/* ── Signal ── */
function _stationWidth(st) {
  return st.isReal ? CONFIG.radio.realStationWidth : CONFIG.radio.detectionWidth;
}

function getSignalStrength(freq) {
  let best = 0;
  for (const st of CONFIG.radio.stations) {
    const dist = Math.abs(freq - st.freq);
    const w = _stationWidth(st);
    if (dist < w) {
      const s = 1 - dist / w;
      if (s > best) best = s;
    }
  }
  return best;
}

function getNearestStation(freq) {
  let best = null, bestS = 0;
  for (const st of CONFIG.radio.stations) {
    const dist = Math.abs(freq - st.freq);
    const w = _stationWidth(st);
    if (dist < w) {
      const s = 1 - dist / w;
      if (s > bestS) { bestS = s; best = st; }
    }
  }
  return best;
}

function updateSignalDisplay(strength, isReal) {
  const leds = $('radioSignalLeds');
  if (!leds) return;
  const count = Math.round(strength * 5);
  leds.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const led = document.createElement('div');
    led.className = 'radio-led' + (i < count ? ' on' : '') + (i < count && isReal && strength > 0.9 ? ' strong' : '');
    leds.appendChild(led);
  }
  const onAir = $('radioOnAir');
  if (onAir) {
    if (isReal && strength > 0.85) onAir.classList.remove('hidden');
    else onAir.classList.add('hidden');
  }
}

/* ── Cadran canvas ── */
function drawDial(angle) {
  const canvas = $('radioDial');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;
  const cx  = W / 2;
  const cy  = H / 2;
  const R   = cx - 6;

  ctx.clearRect(0, 0, W, H);

  /* Anneau extérieur bois */
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = '#5A3A28';
  ctx.fill();

  /* Disque intérieur */
  ctx.beginPath();
  ctx.arc(cx, cy, R - 8, 0, Math.PI * 2);
  ctx.fillStyle = '#8B6914';
  ctx.fill();

  /* Marques (style pixel — 12 crans) */
  for (let i = 0; i < 12; i++) {
    const a     = (i / 12) * Math.PI * 2;
    const inner = R - 20;
    const outer = R - 10;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
    ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
    ctx.strokeStyle = '#E8C27A';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /* Bouton rotatif (repère doré) */
  const markerR = R - 16;
  const mx = cx + Math.cos(angle) * markerR;
  const my = cy + Math.sin(angle) * markerR;
  ctx.beginPath();
  ctx.arc(mx, my, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#E8B04B';
  ctx.fill();
  ctx.strokeStyle = '#5A3A28';
  ctx.lineWidth = 2;
  ctx.stroke();

  /* Bouton central */
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#3A2010';
  ctx.fill();
  ctx.strokeStyle = '#E8C27A';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#5A3A28';
  ctx.fill();
}

/* ── Geste rotatif ── */
function getAngleFromEvent(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  const pt = e.touches ? e.touches[0] : e;
  return Math.atan2(pt.clientY - cy, pt.clientX - cx);
}

function setupRadioDial() {
  const canvas = $('radioDial');
  if (!canvas) return;

  canvas.addEventListener('mousedown', e => {
    radioState.dragging   = true;
    radioState.lastAngle  = getAngleFromEvent(e, canvas);
    if (radioState.snapAnim) { cancelAnimationFrame(radioState.snapAnim); radioState.snapAnim = null; }
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!radioState.dragging) return;
    const a     = getAngleFromEvent(e, canvas);
    let   delta = a - radioState.lastAngle;
    if (delta >  Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    radioState.lastAngle = a;
    changeFreqByAngle(delta);
  });
  document.addEventListener('mouseup', () => { radioState.dragging = false; _trySnapToStation(); });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    radioState.dragging  = true;
    radioState.lastAngle = getAngleFromEvent(e, canvas);
    if (radioState.snapAnim) { cancelAnimationFrame(radioState.snapAnim); radioState.snapAnim = null; }
  }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!radioState.dragging) return;
    const a     = getAngleFromEvent(e, canvas);
    let   delta = a - radioState.lastAngle;
    if (delta >  Math.PI) delta -= 2 * Math.PI;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    radioState.lastAngle = a;
    changeFreqByAngle(delta);
  }, { passive: false });
  canvas.addEventListener('touchend', () => { radioState.dragging = false; _trySnapToStation(); }, { passive: true });
}

function changeFreqByAngle(deltaRad) {
  const mhzDelta = (deltaRad / (2 * Math.PI)) * CONFIG.radio.mhzPerRotation;

  /* Si on est verrouillé sur une station, absorber les petits mouvements */
  if (radioState.lockedStation) {
    const absMovement = Math.abs(mhzDelta);
    if (absMovement < CONFIG.radio.lockTolerance * 0.6) return; // petit frémissement ignoré
    radioState.lockedStation = null; // mouvement franc → quitter la station
  }

  const newFreq = Math.max(
    CONFIG.radio.freqMin,
    Math.min(CONFIG.radio.freqMax, radioState.freq + mhzDelta)
  );
  const snapped = Math.round(newFreq * 10) / 10;
  if (snapped === radioState.freq) return;

  radioState.dialAngle += deltaRad;
  radioState.freq = snapped;

  updateRadioFreqDisplay(snapped);
}

function _trySnapToStation() {
  const cfg = CONFIG.radio;
  for (const st of cfg.stations) {
    const dist = Math.abs(radioState.freq - st.freq);
    const threshold = st.isReal ? cfg.snapThreshold : cfg.detectionWidth * 0.9;
    if (dist > 0 && dist <= threshold) {
      /* Animer l'aimant vers la fréquence exacte */
      _animSnapTo(st);
      return;
    }
  }
}

function _animSnapTo(st) {
  if (radioState.snapAnim) cancelAnimationFrame(radioState.snapAnim);
  const targetFreq = st.freq;
  const startFreq  = radioState.freq;
  const startAngle = radioState.dialAngle;
  const freqDiff   = targetFreq - startFreq;
  const angleDiff  = (freqDiff / CONFIG.radio.mhzPerRotation) * (2 * Math.PI);
  const startTime  = performance.now();
  const duration   = 180; // ms

  function step(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const freq  = Math.round((startFreq + freqDiff * ease) * 10) / 10;
    radioState.freq      = freq;
    radioState.dialAngle = startAngle + angleDiff * ease;
    updateRadioFreqDisplay(freq);
    if (t < 1) {
      radioState.snapAnim = requestAnimationFrame(step);
    } else {
      radioState.freq      = targetFreq;
      radioState.dialAngle = startAngle + angleDiff;
      radioState.lockedStation = st;
      radioState.snapAnim  = null;
      updateRadioFreqDisplay(targetFreq);
    }
  }
  radioState.snapAnim = requestAnimationFrame(step);
}

function updateRadioFreqDisplay(freq) {
  /* Affichage fréquence */
  const el = $('radioFreqValue');
  if (el) el.textContent = freq.toFixed(1);

  /* Aiguille sur la bande */
  const pct = (freq - CONFIG.radio.freqMin) / (CONFIG.radio.freqMax - CONFIG.radio.freqMin) * 100;
  const needle = $('radioBandNeedle');
  if (needle) needle.style.left = pct + '%';

  /* Cadran */
  drawDial(radioState.dialAngle);

  /* Signal */
  const strength = getSignalStrength(freq);
  const station  = getNearestStation(freq);
  updateSignalDisplay(strength, station?.isReal);
  updateRadioAudio(strength, station);

  /* Nom de station */
  const nameEl = $('radioStationName');
  if (nameEl) nameEl.textContent = station && strength > 0.4 ? station.name : '';

  /* Vrai station : chrono de déclenchement de l'indice */
  if (station?.isReal && strength > 0.85) {
    if (!radioState.realStationTimer) {
      radioState.realStationTimer = setTimeout(() => triggerRealStation(station), CONFIG.radio.realStationDelay);
    }
  } else {
    clearTimeout(radioState.realStationTimer);
    radioState.realStationTimer = null;
  }
}

function buildStationMarkers() {
  const container = $('radioStationMarkers');
  if (!container) return;
  const range = CONFIG.radio.freqMax - CONFIG.radio.freqMin;
  CONFIG.radio.stations.forEach(st => {
    const mk = document.createElement('div');
    mk.className = 'radio-station-marker' + (st.isReal ? ' real' : '');
    mk.style.left = ((st.freq - CONFIG.radio.freqMin) / range * 100) + '%';
    container.appendChild(mk);
  });
}

async function triggerRealStation(station) {
  radioState.realStationTimer = null;
  if (radioState.clueFound) return;
  radioState.clueFound = true;

  /* Enregistrer l'indice */
  if (!state.testMode) {
    _fbWriteProgress('radio_clue');
    unlockTool('carnet');
    _fbWriteCarnet('radio', { type: 'radio', title: station.clue.title, text: station.clue.text, freq: station.freq });
  }

  /* Afficher les sous-titres */
  await showStationSubtitles(station);

  /* Montrer le bouton Réécouter */
  $('btnRadioReplay').classList.remove('hidden');

  /* Notification "indice enregistré" */
  const nameEl = $('radioStationName');
  if (nameEl) {
    nameEl.textContent = '✅ Indice enregistré dans le Carnet !';
    nameEl.style.color = 'var(--amber-glow)';
    setTimeout(() => { nameEl.style.color = ''; }, 4000);
  }
}

async function showStationSubtitles(station) {
  const box = $('radioSubtitleBox');
  if (!box) return;
  box.classList.remove('hidden');
  box.textContent = '';
  await typeWriter(box, station.clue.text, 28);
}

function replayRealStation() {
  const st = CONFIG.radio.stations.find(s => s.isReal);
  if (!st) return;
  showScreen('screen-radio');
  showStationSubtitles(st);
}

/* ============================================================
   ÉNIGMES — moteur générique pour objets-énigme
============================================================ */
const puzzleState = {
  currentPuzzle: null,
  solved:        false,
  hintTimer:     null,
  initialized:   false,
};

function openPuzzle(puzzleId) {
  if (puzzleId === 'recettes') { openRecettes(); return; }
  const pz = CONFIG.puzzles?.[puzzleId];
  if (!pz) return;

  puzzleState.currentPuzzle = puzzleId;
  puzzleState.solved = false;

  if (!state.testMode && fbState.progress['done_puzzle_' + puzzleId] === true) {
    puzzleState.solved = true;
  }

  $('puzzleTitle').textContent = pz.title;
  $('puzzleText').textContent  = pz.enigma.text;

  const imgEl = $('puzzleImg');
  if (pz.enigma.imageUrl) {
    imgEl.src = pz.enigma.imageUrl;
    imgEl.classList.remove('hidden');
  } else {
    imgEl.classList.add('hidden');
  }

  if (puzzleState.solved) {
    _showPuzzleSolvedState(pz);
  } else {
    $('puzzleSuccessArea').classList.add('hidden');
    $('puzzleInputArea').classList.remove('hidden');
    $('puzzleInput').value = '';
    $('puzzleErrorMsg').classList.add('hidden');
    $('puzzleHintBtn').classList.add('hidden');
    $('puzzleHintText').classList.add('hidden');

    clearTimeout(puzzleState.hintTimer);
    if (pz.enigma.hint?.delayMs) {
      puzzleState.hintTimer = setTimeout(() => {
        $('puzzleHintBtn').classList.remove('hidden');
      }, pz.enigma.hint.delayMs);
    }
  }

  if (!puzzleState.initialized) {
    puzzleState.initialized = true;

    $('btnPuzzleBack').addEventListener('click', () => { ensureAudio(); closePuzzle(); });

    $('puzzleSubmitBtn').addEventListener('click', () => { ensureAudio(); checkPuzzleAnswer(); });

    $('puzzleInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') { ensureAudio(); checkPuzzleAnswer(); }
    });

    $('puzzleHintBtn').addEventListener('click', () => {
      const pz2 = CONFIG.puzzles?.[puzzleState.currentPuzzle];
      if (!pz2?.enigma.hint) return;
      $('puzzleHintText').textContent = pz2.enigma.hint.text;
      $('puzzleHintText').classList.remove('hidden');
      $('puzzleHintBtn').classList.add('hidden');
    });
  }

  showScreen('screen-puzzle');
}

function closePuzzle() {
  clearTimeout(puzzleState.hintTimer);
  returnToMenu();
}

function normAnswer(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function checkPuzzleAnswer() {
  const pz = CONFIG.puzzles?.[puzzleState.currentPuzzle];
  if (!pz || puzzleState.solved) return;

  const raw    = $('puzzleInput').value.trim();
  const normed = normAnswer(raw);
  const ok     = pz.enigma.answers.some(a => normAnswer(a) === normed);

  if (ok) {
    puzzleState.solved = true;
    clearTimeout(puzzleState.hintTimer);

    if (!state.testMode) {
      _fbWriteProgress('done_puzzle_' + puzzleState.currentPuzzle);
      unlockTool('carnet');
      _fbWriteCarnet('puzzle_' + puzzleState.currentPuzzle, {
        type:     'puzzle',
        puzzleId: puzzleState.currentPuzzle,
        icon:     pz.carnetEntry.icon || '📖',
        title:    pz.carnetEntry.title,
        text:     pz.carnetEntry.text,
        answer:   raw,
      });
    }

    _triggerPuzzleSuccess(pz, raw);
  } else {
    _triggerPuzzleError(pz);
  }
}

function _triggerPuzzleSuccess(pz, answer) {
  showPuzzleSparkles();
  playVictory();
  $('puzzleInputArea').classList.add('hidden');
  $('puzzleSuccessArea').classList.remove('hidden');
  $('puzzleSuccessMsg').textContent    = pz.enigma.successMessage || 'Réussi !';
  $('puzzleAnswerDisplay').textContent = '→ ' + answer;
  $('puzzleCarnetNotif').textContent   = '';
  setTimeout(() => {
    $('puzzleCarnetNotif').textContent = '✅ Indice enregistré dans le Carnet !';
  }, 1400);
}

function _showPuzzleSolvedState(pz) {
  $('puzzleSuccessArea').classList.remove('hidden');
  $('puzzleInputArea').classList.add('hidden');
  $('puzzleHintBtn').classList.add('hidden');
  $('puzzleHintText').classList.add('hidden');
  $('puzzleSuccessMsg').textContent  = pz.enigma.successMessage || 'Réussi !';
  $('puzzleCarnetNotif').textContent = '✅ Indice enregistré dans le Carnet !';
  try {
    const entry = [...(fbState.carnet || [])].reverse().find(e => e.puzzleId === puzzleState.currentPuzzle);
    $('puzzleAnswerDisplay').textContent = entry?.answer ? '→ ' + entry.answer : '';
  } catch (_) { $('puzzleAnswerDisplay').textContent = ''; }
}

function _triggerPuzzleError(pz) {
  const book = $('puzzleBook');
  book.classList.remove('shake');
  void book.offsetWidth;
  book.classList.add('shake');
  book.addEventListener('animationend', () => book.classList.remove('shake'), { once: true });

  showFlourCloud();
  playError();

  const msgs  = pz.enigma.errorMessages;
  const errEl = $('puzzleErrorMsg');
  errEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
  errEl.classList.remove('hidden');
  clearTimeout(errEl._t);
  errEl._t = setTimeout(() => errEl.classList.add('hidden'), 3500);
}

/* ============================================================
   FIREBASE — Verrous de pièces multi-équipes
============================================================ */

function initFirebase() {
  if (FIREBASE_CONFIG.apiKey === 'REMPLACE_MOI') return;
  if (state.testMode) return; // pas de Firebase en mode test
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    fbState.db = firebase.database();

    /* Connexion */
    fbState.db.ref('.info/connected').on('value', snap => {
      fbState.connected = snap.val() === true;
      _showConnectionBanner(!fbState.connected);
    });

    /* Écoute des verrous de pièces */
    fbState.db.ref('rooms').on('value', snap => {
      _onRoomsUpdate(snap.val() || {});
    });

    /* Écoute de la progression et du carnet de l'équipe */
    if (state.teamId) {
      fbState.db.ref('progress/' + state.teamId).on('value', snap => {
        fbState.progress = snap.val() || {};
        if (!state.testMode && fbState.progress['game_won'] === true) {
          showScreen('screen-menu');
          buildMenu(false);
        } else if ($('menuGrid')) {
          buildMenu(false);
        }
      });
      fbState.db.ref('carnet/' + state.teamId).on('value', snap => {
        const data = snap.val() || {};
        fbState.carnet = Object.values(data);
        if ($('carnetEntries')) renderCarnet();
      });
    }

    /* Vérification timeout toutes les minutes */
    setInterval(_checkLockTimeouts, 60000);
  } catch (e) {
    console.warn('[Firebase] init error', e);
  }
}

function _onRoomsUpdate(rooms) {
  fbState.rooms = rooms || {};

  if (_fbFirstUpdate) {
    _fbFirstUpdate = false;
    _loadMission();
  }

  _renderPlanLocks();
  _checkLockTimeouts();

  /* Mission libérée par un autre (admin ou timeout côté serveur) */
  if (fbState.mission) {
    const lk = fbState.rooms[fbState.mission.roomId];
    if (!lk?.lockedBy) {
      fbState.mission = null;
      _removeMissionFromStorage();
      _updateMissionBanner();
    }
  }
}

function _renderPlanLocks() {
  if (!state.planLoaded) return;
  const svgEl  = $('planSvgWrap')?.querySelector('svg');
  const overlay = svgEl?.querySelector('#planLockOverlay');
  if (!overlay) return;

  overlay.innerHTML = '';
  const rooms = fbState.rooms || {};

  for (const [roomId, lockData] of Object.entries(rooms)) {
    if (!lockData?.lockedBy) continue;
    if (String(lockData.lockedBy) === String(state.teamId)) continue;

    const piece = svgEl.querySelector(`.piece[data-piece="${roomId}"]`);
    if (!piece) continue;
    const sol = piece.querySelector('.sol');
    if (!sol) continue;

    try {
      const pts = sol.getAttribute('points');
      if (pts) {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', pts);
        poly.setAttribute('fill', 'rgba(50,50,70,0.62)');
        overlay.appendChild(poly);
      }
      const bbox = sol.getBBox();
      const cx = Math.round(bbox.x + bbox.width  / 2);
      const cy = Math.round(bbox.y + bbox.height / 2);

      const lock = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lock.setAttribute('x', cx); lock.setAttribute('y', cy - 10);
      lock.setAttribute('text-anchor', 'middle');
      lock.setAttribute('font-size', '28'); lock.setAttribute('fill', 'white');
      lock.textContent = '🔒';
      overlay.appendChild(lock);

      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', cx); lbl.setAttribute('y', cy + 20);
      lbl.setAttribute('text-anchor', 'middle');
      lbl.setAttribute('font-size', '13'); lbl.setAttribute('fill', '#ffffffee');
      lbl.setAttribute('font-weight', 'bold');
      lbl.textContent = lockData.lockedByName || ('Équipe ' + lockData.lockedBy);
      overlay.appendChild(lbl);
    } catch (_) {}
  }
}

async function fb_lockRoom(roomId, roomName) {
  if (!fbState.db) return false;
  const ref      = fbState.db.ref('rooms/' + roomId);
  const teamId   = String(state.teamId);
  const teamName = CONFIG.teams?.[state.teamId]?.name || ('Équipe ' + state.teamId);
  try {
    const res = await ref.transaction(current => {
      if (current?.lockedBy && current.lockedBy !== teamId) return; // abort
      return { lockedBy: teamId, lockedAt: firebase.database.ServerValue.TIMESTAMP, lockedByName: teamName };
    });
    return res.committed;
  } catch (_) { return false; }
}

function fb_unlockRoom(roomId) {
  if (!fbState.db) return;
  fbState.db.ref('rooms/' + roomId).set(null).catch(() => {});
}

function _startMission(roomId, tool, roomDisplayName) {
  fbState.mission = { roomId, tool, roomDisplayName };
  try { localStorage.setItem('esc_noel_mission_' + state.teamId, JSON.stringify(fbState.mission)); }
  catch (_) {}
  _updateMissionBanner();
}

function _endMission(unlock) {
  if (!fbState.mission) return;
  const { roomId } = fbState.mission;
  fbState.mission  = null;
  _removeMissionFromStorage();
  if (unlock) fb_unlockRoom(roomId);
  _updateMissionBanner();
  _renderPlanLocks();
}

function _loadMission() {
  try {
    const raw = localStorage.getItem('esc_noel_mission_' + state.teamId);
    if (!raw) { _updateMissionBanner(); return; }
    const m = JSON.parse(raw);
    if (!m?.roomId) { _updateMissionBanner(); return; }
    const lk = fbState.rooms[m.roomId];
    if (String(lk?.lockedBy) === String(state.teamId)) fbState.mission = m;
    else localStorage.removeItem('esc_noel_mission_' + state.teamId);
  } catch (_) {}
  _updateMissionBanner();
}

function _removeMissionFromStorage() {
  try { localStorage.removeItem('esc_noel_mission_' + state.teamId); } catch (_) {}
}

function _updateMissionBanner() {
  const banner = $('missionBanner');
  if (!banner) return;
  if (fbState.mission) {
    $('missionBannerText').textContent = fbState.mission.roomDisplayName;
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
    const ac = $('missionAbandonConfirm');
    if (ac) ac.classList.add('hidden');
  }
}

function _showConnectionBanner(lost) {
  const b = $('connectionBanner');
  if (!b) return;
  if (lost) b.classList.remove('hidden');
  else      b.classList.add('hidden');
}

function _checkLockTimeouts() {
  const now     = Date.now();
  const timeout = CONFIG.firebase?.lockTimeout || 15 * 60 * 1000;
  for (const [roomId, lockData] of Object.entries(fbState.rooms || {})) {
    if (!lockData?.lockedAt || !lockData?.lockedBy) continue;
    if (now - lockData.lockedAt < timeout) continue;
    if (String(lockData.lockedBy) !== String(state.teamId)) continue;
    _endMission(true);
    _showQuickScanMsg('', '⏰ Le temps est écoulé, les elfes ont rouvert la pièce aux autres équipes.');
    break;
  }
}

function _showQuickScanMsg(roomName, msg) {
  const dialog = $('scanDialog');
  if (!dialog) return;
  $('scanRoomName').textContent = roomName;
  $('scanMsg').textContent      = msg;
  $('scanObjectWrap').classList.add('hidden');
  const cf = $('scanLockConfirm');
  if (cf) cf.classList.add('hidden');
  dialog.classList.remove('hidden', 'scan-done');
  dialog.classList.add('scan-done');
  setTimeout(() => dialog.classList.add('hidden'), 5000);
}

function _showLockConfirm(roomId, roomName, obj) {
  const confirmEl = $('scanLockConfirm');
  if (!confirmEl) return;
  confirmEl.classList.remove('hidden');

  const cleanup = () => {
    confirmEl.classList.add('hidden');
    $('scanLockYes').onclick = null;
    $('scanLockNo').onclick  = null;
  };

  $('scanLockYes').onclick = async () => {
    ensureAudio();
    cleanup();
    const success = await fb_lockRoom(roomId, roomName);
    if (success) {
      _startMission(roomId, obj.tool, roomName);
      $('scanDialog').classList.add('hidden');
    } else {
      $('scanMsg').textContent = "Trop tard, une autre équipe vient de partir en mission dans cette pièce !";
      setTimeout(() => $('scanDialog').classList.add('hidden'), 4000);
    }
  };

  $('scanLockNo').onclick = () => {
    ensureAudio();
    cleanup();
    $('scanDialog').classList.add('hidden');
  };
}

/* ============================================================
   RECETTES — Livre multi-questions
============================================================ */
const recettesState = { order: [], progress: 0 };

function _shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function openRecettes() {
  const pz = CONFIG.puzzles?.recettes;
  if (!pz) return;

  showScreen('screen-puzzle');

  if (!puzzleState.initialized) {
    puzzleState.initialized = true;
    $('btnPuzzleBack').addEventListener('click', () => { ensureAudio(); closePuzzle(); });
    $('puzzleSubmitBtn').addEventListener('click', () => { ensureAudio(); _checkRecettesAnswer(); });
    $('puzzleInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') { ensureAudio(); _checkRecettesAnswer(); }
    });
  }

  $('recettesProgress').classList.remove('hidden');
  $('recettesTableWrap').innerHTML = pz.tableIcon;
  $('recettesTableWrap').classList.remove('hidden');
  $('puzzleHintBtn').classList.add('hidden');
  $('puzzleHintText').classList.add('hidden');
  $('puzzleImg').classList.add('hidden');

  const teamId = state.teamId;
  const allSolved = !state.testMode && fbState.progress['done_puzzle_recettes'] === true;

  try {
    const savedOrder = JSON.parse(localStorage.getItem('esc_noel_recettes_order_' + teamId) || 'null');
    if (Array.isArray(savedOrder) && savedOrder.length === pz.questions.length) {
      recettesState.order = savedOrder;
    } else {
      recettesState.order = _shuffleArray(pz.questions.map((_, i) => i));
      if (!state.testMode) localStorage.setItem('esc_noel_recettes_order_' + teamId, JSON.stringify(recettesState.order));
    }
  } catch (_) {
    recettesState.order = _shuffleArray(pz.questions.map((_, i) => i));
  }

  try {
    const p = parseInt(localStorage.getItem('esc_noel_recettes_progress_' + teamId) || '0', 10);
    recettesState.progress = isNaN(p) ? 0 : Math.max(0, p);
  } catch (_) { recettesState.progress = 0; }

  if (allSolved || recettesState.progress >= pz.questions.length) {
    recettesState.progress = pz.questions.length;
    _renderRecettesPlates(true);
    _renderRecettesSolvedState();
  } else {
    _renderRecettesPlates(false);
    _showRecettesQuestion(recettesState.order[recettesState.progress]);
  }

  const testBtn = $('recettes-test-btn');
  if (testBtn) {
    testBtn.classList.toggle('hidden', !state.testMode);
    _bindRecettesTestBtn();
  }
}

function _bindRecettesTestBtn() {
  const testBtn = $('recettes-test-btn');
  if (!testBtn) return;
  testBtn.onclick = () => {
    ensureAudio();
    const pz = CONFIG.puzzles.recettes;
    const q  = pz.questions[recettesState.order[recettesState.progress]];
    if (q) { $('puzzleInput').value = q.answers[0]; _checkRecettesAnswer(); }
  };
}

function _showRecettesQuestion(qIdx) {
  const pz = CONFIG.puzzles.recettes;
  const q  = pz.questions[qIdx];
  $('puzzleTitle').textContent = 'Recette ' + (recettesState.progress + 1) + ' / ' + pz.questions.length;
  $('puzzleText').textContent  = q.question;
  $('puzzleInputArea').classList.remove('hidden');
  $('puzzleSuccessArea').classList.add('hidden');
  $('recettesStepSuccessArea').classList.add('hidden');
  $('puzzleInput').value = '';
  $('puzzleErrorMsg').classList.add('hidden');
}

function _renderRecettesPlates(glow) {
  const pz = CONFIG.puzzles.recettes;
  for (let i = 0; i < pz.questions.length; i++) {
    const slot = $('rslot-' + i);
    if (!slot) continue;
    const filled = i < recettesState.progress;
    if (filled) {
      const qIdx = recettesState.order[i];
      const q    = pz.questions[qIdx];
      slot.innerHTML = '<div class="recettes-plate-dish' + (glow ? ' recettes-plate-shine' : '') + '">' + q.dishIcon + '</div>';
    } else {
      slot.innerHTML = '<div class="recettes-plate-empty">🍽</div>';
    }
  }
}

function _checkRecettesAnswer() {
  const pz = CONFIG.puzzles.recettes;
  if (recettesState.progress >= pz.questions.length) return;
  const qIdx   = recettesState.order[recettesState.progress];
  const q      = pz.questions[qIdx];
  const raw    = $('puzzleInput').value.trim();
  const normed = normAnswer(raw);
  const ok     = q.answers.some(a => normAnswer(a) === normed);
  if (ok) {
    _triggerRecettesStepSuccess(qIdx);
  } else {
    _triggerPuzzleError({ enigma: { errorMessages: pz.errorMessages } });
  }
}

function _triggerRecettesStepSuccess(qIdx) {
  const pz = CONFIG.puzzles.recettes;
  const q  = pz.questions[qIdx];

  recettesState.progress++;
  if (!state.testMode) {
    try { localStorage.setItem('esc_noel_recettes_progress_' + state.teamId, String(recettesState.progress)); } catch (_) {}
  }

  _renderRecettesPlates(false);

  $('puzzleInputArea').classList.add('hidden');
  $('puzzleErrorMsg').classList.add('hidden');
  $('recettesStepDishWrap').innerHTML = q.dishIcon;
  $('recettesStepMsg').textContent    = pz.stepSuccessMessage;
  $('recettesStepSuccessArea').classList.remove('hidden');

  /* Son intermédiaire (note Mi) */
  if (recettesState.progress < pz.questions.length) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = 659;
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
    } catch (_) {}
  }

  setTimeout(() => {
    if (recettesState.progress >= pz.questions.length) {
      _triggerRecettesComplete();
    } else {
      _animRecettesPageTurn(() => {
        _showRecettesQuestion(recettesState.order[recettesState.progress]);
        _bindRecettesTestBtn();
      });
    }
  }, 1500);
}

function _animRecettesPageTurn(callback) {
  const book = $('puzzleBook');
  book.classList.add('recettes-turning');
  setTimeout(callback, 220);
  setTimeout(() => book.classList.remove('recettes-turning'), 480);
}

function _triggerRecettesComplete() {
  const pz = CONFIG.puzzles.recettes;
  if (!state.testMode) {
    _fbWriteProgress('done_puzzle_recettes');
    unlockTool('carnet');
    _fbWriteCarnet('puzzle_recettes', { type: 'puzzle', puzzleId: 'recettes', icon: pz.carnetEntry.icon, title: pz.carnetEntry.title, text: pz.carnetEntry.text });
  }
  playVictory();
  showPuzzleSparkles();
  _renderRecettesPlates(true);
  $('recettesStepSuccessArea').classList.add('hidden');
  $('puzzleInputArea').classList.add('hidden');
  $('puzzleSuccessArea').classList.remove('hidden');
  $('puzzleSuccessMsg').textContent    = pz.successMessage;
  $('puzzleAnswerDisplay').textContent = '';
  $('puzzleCarnetNotif').textContent   = '';
  setTimeout(() => { $('puzzleCarnetNotif').textContent = '✅ Indice enregistré dans le Carnet !'; }, 1400);
  const testBtn = $('recettes-test-btn');
  if (testBtn) testBtn.classList.add('hidden');
}

function _renderRecettesSolvedState() {
  const pz = CONFIG.puzzles.recettes;
  $('puzzleInputArea').classList.add('hidden');
  $('recettesStepSuccessArea').classList.add('hidden');
  $('puzzleSuccessArea').classList.remove('hidden');
  $('puzzleSuccessMsg').textContent    = pz.successMessage;
  $('puzzleAnswerDisplay').textContent = '';
  $('puzzleCarnetNotif').textContent   = '✅ Indice enregistré dans le Carnet !';
  $('puzzleTitle').textContent         = pz.title;
  $('puzzleText').textContent          = '';
}

function showFlourCloud() {
  if (prefersReducedMotion()) return;
  const cloud = document.createElement('div');
  cloud.className = 'flour-cloud';
  document.body.appendChild(cloud);
  setTimeout(() => cloud.remove(), 1300);
}

function showPuzzleSparkles() {
  if (prefersReducedMotion()) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:200;pointer-events:none;';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx  = canvas.getContext('2d');
  const COLS = ['#e8c040','#d89830','#ff9820','#ffffff','#c4504a','#508038'];
  const parts = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.6 + canvas.height * 0.2,
    r: Math.floor(Math.random() * 3) + 2,
    dx: (Math.random() - 0.5) * 5,
    dy: Math.random() * -5 - 2,
    life: 1,
    decay: Math.random() * 0.02 + 0.012,
    color: COLS[Math.floor(Math.random() * COLS.length)],
  }));
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    parts.forEach(p => {
      p.x += p.dx; p.y += p.dy; p.dy += 0.15; p.life -= p.decay;
      if (p.life > 0) {
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.r, p.r);
      }
    });
    ctx.globalAlpha = 1;
    if (alive) requestAnimationFrame(draw);
    else canvas.remove();
  })();
}

/* ============================================================
   CARILLON DES ELFES — état, audio, interface
============================================================ */
const carillonState = {
  sequence:    [],
  solved:      false,
  playing:     false,
  initialized: false,
};

function openCarillon() {
  showScreen('screen-carillon');
  if (fbState.progress['done_carillon'] === true) {
    carillonState.solved = true;
  }
  if (!carillonState.initialized) {
    carillonState.initialized = true;
    _buildCarillon();
  }
  _renderCarillonState();
}

function _buildCarillon() {
  $('btnCarillonBack').addEventListener('click', () => { ensureAudio(); returnToMenu(); });
  $('btnEcouterMelodie').addEventListener('click', () => { ensureAudio(); _playCarillonMelody(false); });

  const cfg      = CONFIG.carillon;
  const bellsRow = $('carillonBellsRow');
  ['C5', 'D5', 'E5', 'G5', 'A5'].forEach(noteId => {
    const btn = document.createElement('button');
    btn.className = 'carillon-bell';
    btn.dataset.note = noteId;
    btn.style.setProperty('--bell-color', cfg.noteColors[noteId]);
    btn.setAttribute('aria-label', 'Clochette ' + cfg.noteNames[noteId]);
    btn.textContent = cfg.noteNames[noteId];
    btn.addEventListener('click', () => { ensureAudio(); _handleBellClick(noteId); });
    bellsRow.appendChild(btn);
  });

  const prog = $('carillonProgress');
  for (let i = 0; i < CONFIG.carillon.melody.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'carillon-dot';
    dot.id = 'carillon-dot-' + i;
    prog.appendChild(dot);
  }
}

function _renderCarillonState() {
  const count = carillonState.solved ? CONFIG.carillon.melody.length : carillonState.sequence.length;
  _updateCarillonProgress(count);
  if (carillonState.solved) {
    $('carillonSuccessArea').classList.remove('hidden');
    $('carillonSuccessMsg').textContent    = '🎶 Mélodie réussie !';
    $('carillonCarnetNotif').textContent   = '✅ Indice enregistré dans le Carnet !';
    document.getElementById('carillonElf')?.classList.add('dancing');
  }
}

function _handleBellClick(noteId) {
  if (carillonState.playing) return;

  playBellNote(noteId);
  _animateBell(noteId);

  if (carillonState.solved) return; /* jeu libre après réussite */

  const melody   = CONFIG.carillon.melody;
  const expected = melody[carillonState.sequence.length];

  if (noteId === expected) {
    carillonState.sequence.push(noteId);
    _updateCarillonProgress(carillonState.sequence.length);
    if (carillonState.sequence.length === melody.length) {
      setTimeout(_triggerCarillonSuccess, 600);
    }
  } else {
    _playPlonk();
    carillonState.sequence = [];
    const prog = $('carillonProgress');
    prog.classList.add('reset-flash');
    setTimeout(() => {
      prog.classList.remove('reset-flash');
      _updateCarillonProgress(0);
    }, 420);
  }
}

function _updateCarillonProgress(count) {
  const melody = CONFIG.carillon.melody;
  for (let i = 0; i < melody.length; i++) {
    const dot = $('carillon-dot-' + i);
    if (!dot) continue;
    dot.classList.toggle('active', i < count);
    if (i < count) {
      dot.style.setProperty('--dot-color', CONFIG.carillon.noteColors[melody[i]]);
    } else {
      dot.style.removeProperty('--dot-color');
    }
  }
}

function _animateBell(noteId) {
  const btn = document.querySelector(`.carillon-bell[data-note="${noteId}"]`);
  if (!btn) return;
  btn.classList.remove('ring');
  void btn.offsetWidth;
  btn.classList.add('ring');
  btn.addEventListener('animationend', () => btn.classList.remove('ring'), { once: true });
}

function _illuminateBell(noteId, duration) {
  const btn = document.querySelector(`.carillon-bell[data-note="${noteId}"]`);
  if (!btn) return;
  btn.classList.add('lit');
  setTimeout(() => btn.classList.remove('lit'), duration);
}

async function _playCarillonMelody(slow) {
  if (carillonState.playing) return;
  carillonState.playing = true;
  const btn = $('btnEcouterMelodie');
  if (btn) btn.disabled = true;
  document.querySelectorAll('.carillon-bell').forEach(b => { b.disabled = true; });

  const melody    = CONFIG.carillon.melody;
  const tempo     = slow ? Math.round(CONFIG.carillon.tempoMs * 1.6) : CONFIG.carillon.tempoMs;
  const highlight = CONFIG.carillon.highlightBells;

  await new Promise(r => setTimeout(r, 350));
  for (let i = 0; i < melody.length; i++) {
    const noteId = melody[i];
    playBellNote(noteId, 0.45);
    if (highlight) _illuminateBell(noteId, Math.round(tempo * 0.75));
    await new Promise(r => setTimeout(r, tempo));
  }
  await new Promise(r => setTimeout(r, 600));

  carillonState.playing = false;
  if (btn) btn.disabled = false;
  if (!carillonState.solved) {
    document.querySelectorAll('.carillon-bell').forEach(b => { b.disabled = false; });
  }
}

function _triggerCarillonSuccess() {
  carillonState.solved = true;

  if (!state.testMode) {
    _fbWriteProgress('done_carillon');
    unlockTool('carnet');
    const cfg = CONFIG.carillon;
    _fbWriteCarnet('carillon', { type: 'carillon', icon: cfg.carnetEntry.icon, title: cfg.carnetEntry.title, text: cfg.carnetEntry.text });
  }

  buildMenu(false);
  _playCarillonMelody(true);

  document.getElementById('carillonElf')?.classList.add('dancing');
  _showMusicNotes();

  $('carillonSuccessArea').classList.remove('hidden');
  $('carillonSuccessMsg').textContent = '🎶 Mélodie réussie !';
  setTimeout(() => {
    $('carillonCarnetNotif').textContent = '✅ Indice enregistré dans le Carnet !';
  }, 1400);
}

function playBellNote(noteId, volume) {
  if (!state.soundEnabled) return;
  ensureAudio();
  if (!state.audioCtx) return;
  const ctx  = state.audioCtx;
  const freq = CONFIG.carillon.noteFreqs[noteId];
  if (!freq) return;
  if (volume === undefined) volume = 0.5;

  /* Timbre de clochette : fondamentale + harmoniques inharmoniques */
  [
    { r: 1.0, g: 0.55 },
    { r: 2.0, g: 0.20 },
    { r: 3.0, g: 0.09 },
    { r: 4.1, g: 0.06 },
    { r: 5.5, g: 0.03 },
  ].forEach(({ r, g }) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * r, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(g * volume, ctx.currentTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.8);
  });
}

function _playPlonk() {
  if (!state.soundEnabled) return;
  ensureAudio();
  if (!state.audioCtx) return;
  const ctx  = state.audioCtx;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.35);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.42);
}

function _showMusicNotes() {
  if (prefersReducedMotion()) return;
  const syms   = ['♪', '♫', '♩', '♬'];
  const colors = ['#E8C040', '#D89830', '#FF9820', '#E8B04B', '#ffffff'];
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const el   = document.createElement('div');
      el.className = 'music-note-fly';
      el.textContent = syms[Math.floor(Math.random() * syms.length)];
      el.style.left  = (15 + Math.random() * 70) + '%';
      el.style.top   = (20 + Math.random() * 50) + '%';
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
      el.style.fontSize = (Math.random() < 0.5 ? '20px' : '28px');
      el.style.setProperty('--dx', ((Math.random() - 0.5) * 70) + 'px');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1900);
    }, i * 110);
  }
}

/* ============================================================
   BOUGIE DES ELFES
============================================================ */
let _bougieLastScanWrong = false;
let _bougieJustScanned   = false;
const bougieState = { initialized: false };

function handleBougieTag() {
  const cfg = CONFIG.bougie;
  if (isToolUnlocked(cfg.unlock)) {
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(openBougie, 80);
  } else {
    unlockTool(cfg.unlock);
    showUnlockAnimation(cfg.unlockName, () => {
      showScreen('screen-menu');
      buildMenu(false);
    });
  }
}

function handleNuitTag(starNum) {
  const teamId = state.teamId;
  if (!isToolUnlocked(CONFIG.bougie.unlock)) {
    showScreen('screen-tag-error');
    $('tagErrorMsg').textContent = 'Il fait trop sombre…\nTrouvez d\'abord la lampe des elfes.';
    return;
  }

  const progressKey = 'esc_noel_bougie_progress_' + teamId;
  if (fbState.progress['done_bougie'] === true) {
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(openBougie, 80);
    return;
  }

  const seq = CONFIG.bougie.sequence;
  let progress = [];
  try { progress = JSON.parse(localStorage.getItem(progressKey) || '[]'); } catch (_) {}

  const expected = seq[progress.length];
  if (starNum === expected) {
    progress.push(starNum);
    localStorage.setItem(progressKey, JSON.stringify(progress));
    if (progress.length === seq.length) {
      _fbWriteProgress('done_bougie');
      _triggerBougieSolved(teamId);
    }
    _bougieLastScanWrong = false;
  } else {
    localStorage.removeItem(progressKey);
    _bougieLastScanWrong = true;
  }

  _bougieJustScanned = true;
  openBougie(true);
}

function openBougie(skipPrep) {
  showScreen('screen-bougie');
  _initBougie();
  if (skipPrep || fbState.progress['done_bougie'] === true) {
    _showBougiePuzzle();
  } else {
    _showBougiePrep();
  }
}

function _initBougie() {
  if (bougieState.initialized) return;
  bougieState.initialized = true;

  const back = $('btnBougieBack');
  if (back && !back._bound) {
    back.addEventListener('click', () => { ensureAudio(); returnToMenu(); });
    back._bound = true;
  }

  const prepWrap   = $('bougie-prep');
  const puzzleWrap = $('bougie-puzzle');
  if (prepWrap   && !prepWrap._built)   { _buildBougiePrep(prepWrap);     prepWrap._built   = true; }
  if (puzzleWrap && !puzzleWrap._built) { _buildBougiePuzzle(puzzleWrap); puzzleWrap._built = true; }
}

function _showBougiePrep() {
  $('bougie-prep').classList.remove('hidden');
  $('bougie-puzzle').classList.add('hidden');
}

function _showBougiePuzzle() {
  $('bougie-prep').classList.add('hidden');
  $('bougie-puzzle').classList.remove('hidden');
  _renderConstellationState();
}

function _buildBougiePrep(wrap) {
  const cfg = CONFIG.bougie;
  wrap.innerHTML = `
    <div class="bougie-prep-title">🕯️ La Bougie des Elfes</div>
    <div class="bougie-prep-subtitle">Préparez la pièce avant de commencer</div>
    <div class="bougie-prep-steps">
      <div class="bougie-prep-step">
        <div class="bougie-prep-icon">${_pancarteSvg()}</div>
        <div class="bougie-prep-step-text">
          <strong>Étape 1</strong> — Retournez la pancarte sur « Équipe en cours »
          <label class="bougie-prep-check-label">
            <input type="checkbox" id="bougie-check-pancarte" class="bougie-prep-checkbox">
            <span class="bougie-prep-check-custom"></span>
            C'est fait !
          </label>
        </div>
      </div>
      <div class="bougie-prep-step">
        <div class="bougie-prep-icon">${_lampoffSvg()}</div>
        <div class="bougie-prep-step-text"><strong>Étape 2</strong> — Éteignez toutes les lumières de la pièce</div>
      </div>
      <div class="bougie-prep-step">
        <div class="bougie-prep-icon">${_torchSvg()}</div>
        <div class="bougie-prep-step-text"><strong>Étape 3</strong> — Prenez la lampe torche</div>
      </div>
    </div>
    <button id="bougie-start-btn" class="bougie-start-btn" disabled>Commencer l'énigme</button>
  `;

  const cb  = wrap.querySelector('#bougie-check-pancarte');
  const btn = wrap.querySelector('#bougie-start-btn');
  cb.addEventListener('change', () => {
    btn.disabled = !cb.checked;
    btn.classList.toggle('bougie-start-btn-ready', cb.checked);
  });
  btn.addEventListener('click', () => { ensureAudio(); _showBougiePuzzle(); });

  if (state.testMode) {
    const testDiv = document.createElement('div');
    testDiv.className = 'bougie-test-wrap';
    testDiv.innerHTML = '<div class="bougie-test-title">🧪 Test — ordre : ' + cfg.sequence.join(', ') + '</div>';
    wrap.appendChild(testDiv);
  }
}

function _buildBougiePuzzle(wrap) {
  const cfg   = CONFIG.bougie;
  const instr = $('bougie-instructions');
  if (instr) instr.textContent = cfg.texts.consigne;

  const svgWrap = $('bougie-svg-wrap');
  if (svgWrap) svgWrap.innerHTML = _buildConstellationSvgStr();

  if (state.testMode) {
    const tb = $('bougie-test-btns');
    if (tb) {
      tb.classList.remove('hidden');
      tb.innerHTML = '<div class="bougie-test-title">🧪 Test — simule les scans :</div>';
      cfg.sequence.forEach((n, i) => {
        const b = document.createElement('button');
        b.className = 'btn-test-small';
        b.textContent = 'Étoile ' + n + ' (' + (i + 1) + '/' + cfg.sequence.length + ')';
        b.addEventListener('click', () => { ensureAudio(); handleNuitTag(n); });
        tb.appendChild(b);
      });
      const reset = document.createElement('button');
      reset.className = 'btn-test-small';
      reset.textContent = '↺ Réinitialiser';
      reset.addEventListener('click', () => {
        localStorage.removeItem('esc_noel_bougie_progress_' + state.teamId);
        localStorage.removeItem('esc_noel_bougie_solved_'   + state.teamId);
        _bougieLastScanWrong = false;
        _bougieJustScanned   = false;
        _renderConstellationState();
      });
      tb.appendChild(reset);
    }
  }
}

function _buildConstellationSvgStr() {
  const cfg = CONFIG.bougie;
  const bg = [
    [20,15],[55,8],[90,30],[145,12],[180,20],[210,35],[230,15],
    [10,55],[35,70],[80,65],[110,45],[155,55],[195,42],[220,60],
    [15,100],[45,115],[85,105],[130,85],[165,100],[215,88],[238,110],
    [25,140],[60,155],[100,135],[140,148],[185,140],[225,130],
    [10,180],[50,190],[95,175],[135,185],[175,172],[210,185],[235,170],
  ];
  let str = '<svg id="bougieSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" shape-rendering="crispEdges">';
  str += '<rect width="240" height="200" fill="#04060C"/>';
  bg.forEach(([x, y]) => {
    str += `<rect x="${x}" y="${y}" width="2" height="2" fill="#ffffff" opacity="${(0.15 + Math.random() * 0.25).toFixed(2)}"/>`;
  });

  const pos = cfg.starPositions;
  const seq = cfg.sequence;

  /* lignes reliant la séquence */
  for (let i = 0; i < seq.length - 1; i++) {
    const a = pos[seq[i]], b = pos[seq[i + 1]];
    str += `<line id="bougie-line-${i}" x1="${a.cx + 5}" y1="${a.cy + 5}" x2="${b.cx + 5}" y2="${b.cy + 5}" stroke="#C8A040" stroke-width="1" opacity="0" stroke-dasharray="3 3"/>`;
  }

  /* étoiles */
  for (let n = 1; n <= 5; n++) {
    const { cx, cy } = pos[n];
    str += _buildStarSvg(n, cx, cy);
  }

  str += '</svg>';
  return str;
}

function _buildStarSvg(n, cx, cy) {
  let s = `<g id="bougie-star-${n}" class="b-star" data-star="${n}" style="cursor:pointer">`;
  s += `<rect x="${cx+2}" y="${cy}" width="6" height="2" fill="#808080"/>`;
  s += `<rect x="${cx}" y="${cy+2}" width="10" height="2" fill="#808080"/>`;
  s += `<rect x="${cx+2}" y="${cy+4}" width="6" height="2" fill="#808080"/>`;
  s += `<rect x="${cx+4}" y="${cy-2}" width="2" height="2" fill="#808080"/>`;
  s += `<rect x="${cx+4}" y="${cy+6}" width="2" height="2" fill="#808080"/>`;
  for (let d = 0; d < n; d++) {
    s += `<rect x="${cx+11+(d*4)}" y="${cy+1}" width="2" height="2" fill="#808080" class="b-dot-${n}"/>`;
  }
  s += '</g>';
  return s;
}

function _renderConstellationState() {
  const teamId     = state.teamId;
  const solvedKey  = 'esc_noel_bougie_solved_'   + teamId;
  const progressKey= 'esc_noel_bougie_progress_' + teamId;
  const cfg        = CONFIG.bougie;
  const seq        = cfg.sequence;

  const isSolved = fbState.progress['done_bougie'] === true;
  let progress   = [];
  try { progress = JSON.parse(localStorage.getItem(progressKey) || '[]'); } catch (_) {}

  const litStars = isSolved ? new Set(seq) : new Set(progress);

  seq.forEach((n, i) => {
    const starEl = document.getElementById('bougie-star-' + n);
    if (!starEl) return;
    const lit  = litStars.has(n);
    const fill = lit ? '#E8C040' : '#808080';
    starEl.querySelectorAll('rect').forEach(r => r.setAttribute('fill', fill));

    const lineEl = document.getElementById('bougie-line-' + i);
    if (lineEl && i < seq.length - 1) {
      const nextLit = litStars.has(seq[i + 1]);
      lineEl.setAttribute('opacity', (lit && nextLit) ? '0.7' : '0');
    }
  });

  /* Progress counter */
  const prog = $('bougie-progress');
  if (prog) {
    if (isSolved) {
      prog.textContent = '★ Constellation complète !';
      prog.style.color = '#E8C040';
    } else {
      prog.textContent = progress.length + ' / ' + seq.length + ' étoile' + (progress.length !== 1 ? 's' : '');
      prog.style.color = '#a09070';
    }
  }

  /* Messages */
  const msgEl = $('bougie-message');
  if (msgEl) {
    if (isSolved) {
      _showBougieSuccess();
    } else if (_bougieLastScanWrong && _bougieJustScanned) {
      msgEl.textContent = cfg.texts.wrong;
      msgEl.className   = 'bougie-message bougie-msg-wrong';
      msgEl.classList.remove('hidden');
      _playBougieNote(false);
    } else if (_bougieJustScanned && progress.length > 0) {
      msgEl.classList.add('hidden');
      _playBougieNote(true);
    } else {
      msgEl.classList.add('hidden');
    }
  }

  _bougieJustScanned = false;
}

function _triggerBougieSolved(teamId) {
  const cfg   = CONFIG.bougie;
  const entry = cfg.carnetEntry;
  unlockTool('carnet');
  _fbWriteCarnet('bougie', { type: 'bougie', icon: entry.icon, title: entry.title, text: entry.text });
}

function _showBougieSuccess() {
  const cfg   = CONFIG.bougie;
  const seq   = cfg.sequence;
  const msgEl = $('bougie-message');

  seq.forEach(n => {
    const starEl = document.getElementById('bougie-star-' + n);
    if (starEl) starEl.querySelectorAll('rect').forEach(r => r.setAttribute('fill', '#FFE060'));
  });
  for (let i = 0; i < seq.length - 1; i++) {
    const lineEl = document.getElementById('bougie-line-' + i);
    if (lineEl) lineEl.setAttribute('opacity', '1');
  }

  if (msgEl) {
    msgEl.textContent = cfg.texts.success;
    msgEl.className   = 'bougie-message bougie-msg-success';
    msgEl.classList.remove('hidden');
  }

  _playBougieSuccess();
  if (!prefersReducedMotion()) {
    _animateBougieShootingStar();
    setTimeout(_animateBougieSuccessStars, 600);
  }
}

function _playBougieNote(correct) {
  if (!audioCtx) return;
  const freq  = correct ? 660 : 330;
  const osc   = audioCtx.createOscillator();
  const gain  = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type    = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
  osc.start(); osc.stop(audioCtx.currentTime + 0.4);
}

function _playBougieSuccess() {
  if (!audioCtx) return;
  const notes = [523, 659, 784, 880, 1047];
  notes.forEach((freq, i) => {
    const t    = audioCtx.currentTime + i * 0.18;
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.start(t); osc.stop(t + 0.5);
  });
}

function _animateBougieShootingStar() {
  const svg = document.getElementById('bougieSvg');
  if (!svg) return;
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  dot.setAttribute('width', '3'); dot.setAttribute('height', '3');
  dot.setAttribute('fill', '#FFE8A0');
  svg.appendChild(dot);

  const target = CONFIG.bougie.starPositions[CONFIG.bougie.sequence[0]];
  let x = -10, y = -5;
  const tx = target.cx + 5, ty = target.cy + 5;
  const steps = 40;
  let step = 0;
  const id = setInterval(() => {
    const t = step / steps;
    dot.setAttribute('x', (x + (tx - x) * t).toFixed(1));
    dot.setAttribute('y', (y + (ty - y) * t).toFixed(1));
    step++;
    if (step > steps) { clearInterval(id); dot.remove(); }
  }, 25);
}

function _animateBougieSuccessStars() {
  const wrap = $('bougie-svg-wrap');
  if (!wrap || prefersReducedMotion()) return;
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = '✦';
      el.style.cssText = `position:absolute;pointer-events:none;font-size:14px;color:#E8C040;opacity:0.9;
        left:${15 + Math.random() * 70}%;top:${10 + Math.random() * 80}%;
        animation:floatUp 1.4s ease-out forwards;`;
      wrap.style.position = 'relative';
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 1500);
    }, i * 100);
  }
}

function _pancarteSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">'
    + '<rect x="8" y="2" width="20" height="28" fill="#8B6914"/>'
    + '<rect x="9" y="3" width="18" height="26" fill="#E8D080"/>'
    + '<rect x="10" y="4" width="16" height="2" fill="#C8A840"/>'
    + '<rect x="10" y="8" width="14" height="2" fill="#A88020"/>'
    + '<rect x="10" y="12" width="14" height="2" fill="#A88020"/>'
    + '<rect x="10" y="16" width="10" height="2" fill="#A88020"/>'
    + '<rect x="17" y="30" width="2" height="6" fill="#8B6914"/>'
    + '</svg>';
}

function _lampoffSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">'
    + '<rect x="13" y="2" width="10" height="2" fill="#808080"/>'
    + '<rect x="11" y="4" width="14" height="2" fill="#808080"/>'
    + '<rect x="9" y="6" width="18" height="2" fill="#909090"/>'
    + '<rect x="8" y="8" width="20" height="2" fill="#A0A0A0"/>'
    + '<rect x="8" y="10" width="20" height="4" fill="#A0A0A0"/>'
    + '<rect x="8" y="14" width="20" height="2" fill="#808080"/>'
    + '<rect x="15" y="16" width="6" height="4" fill="#606060"/>'
    + '<rect x="12" y="20" width="12" height="2" fill="#505050"/>'
    + '</svg>';
}

function _torchSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" shape-rendering="crispEdges">'
    + '<rect x="4" y="14" width="8" height="8" fill="#D4A840"/>'
    + '<rect x="12" y="12" width="4" height="12" fill="#E8B84B"/>'
    + '<rect x="16" y="10" width="4" height="16" fill="#D4A840"/>'
    + '<rect x="20" y="13" width="10" height="10" fill="#8B6914"/>'
    + '<rect x="2" y="12" width="4" height="2" fill="#E8D080" opacity="0.6"/>'
    + '<rect x="1" y="16" width="4" height="2" fill="#E8D080" opacity="0.5"/>'
    + '<rect x="2" y="20" width="4" height="2" fill="#E8D080" opacity="0.4"/>'
    + '</svg>';
}

/* ============================================================
   MINI-FORÊT DES ELFES
============================================================ */
const foretState = { initialized: false, cooldownTimer: null, cooldownEnd: 0 };

function handleForetTag() {
  const cfg = CONFIG.foret;
  if (isToolUnlocked(cfg.unlock)) {
    showScreen('screen-menu');
    buildMenu(false);
    setTimeout(openForet, 80);
  } else {
    unlockTool(cfg.unlock);
    showUnlockAnimation(cfg.unlockName, () => {
      showScreen('screen-menu');
      buildMenu(false);
    });
  }
}

function openForet() {
  showScreen('screen-foret');
  _initForet();
  _renderForetState();
}

function _initForet() {
  if (foretState.initialized) return;
  foretState.initialized = true;

  const back = $('btnForetBack');
  if (back && !back._bound) {
    back.addEventListener('click', () => { ensureAudio(); returnToMenu(); });
    back._bound = true;
  }

  const svgWrap = $('foret-svg-wrap');
  if (svgWrap) svgWrap.innerHTML = _buildForetSvgStr();

  const btn = $('foretSubmitBtn');
  if (btn && !btn._bound) {
    btn.addEventListener('click', () => { ensureAudio(); _checkForetAnswer(); });
    btn._bound = true;
  }
  const input = $('foretInput');
  if (input && !input._bound) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { ensureAudio(); _checkForetAnswer(); }
    });
    input._bound = true;
  }
}

function _renderForetState() {
  const teamId = state.teamId;
  const solved  = fbState.progress['done_foret'] === true;
  const consigneEl = $('foret-consigne');
  if (consigneEl) consigneEl.textContent = CONFIG.foret.texts.consigne;

  if (solved) {
    _showForetSolved(false);
  } else {
    $('foret-input-area').classList.remove('hidden');
    $('foretInput').value = '';
    $('foret-error-msg').classList.add('hidden');
    $('foret-success').classList.add('hidden');
    _resetShroomColors();
    const remaining = foretState.cooldownEnd - Date.now();
    if (remaining > 0) {
      _startForetCooldown(remaining);
    } else {
      $('foret-cooldown').classList.add('hidden');
      const btn = $('foretSubmitBtn');
      if (btn) btn.disabled = false;
    }
    if (state.testMode) {
      const tEl = $('foret-test-hint');
      if (tEl) {
        tEl.textContent = '🧪 Réponse : ' + CONFIG.foret.answer;
        tEl.classList.remove('hidden');
      }
    }
  }
}

function _resetShroomColors() {
  for (let i = 1; i <= 6; i++) {
    const g = document.getElementById('foret-shroom-' + i);
    if (!g) continue;
    g.querySelectorAll('.b-shroom-cap').forEach(r => r.setAttribute('fill', '#C0300E'));
    g.querySelectorAll('.b-shroom-spot').forEach(r => r.setAttribute('fill', '#E8E0D0'));
  }
}

function _checkForetAnswer() {
  const btn = $('foretSubmitBtn');
  if (btn && btn.disabled) return;
  const cfg = CONFIG.foret;
  const raw = ($('foretInput').value || '').trim();
  const num = parseInt(raw, 10);
  if (isNaN(num) || raw === '') return;

  if (num === cfg.answer) {
    _fbWriteProgress('done_foret');
    unlockTool('carnet');
    _fbWriteCarnet('foret', { type: 'foret', icon: cfg.carnetEntry.icon, title: cfg.carnetEntry.title, text: cfg.carnetEntry.text, answer: String(num) });
    $('foret-input-area').classList.add('hidden');
    $('foret-error-msg').classList.add('hidden');
    $('foret-cooldown').classList.add('hidden');
    const tEl = $('foret-test-hint');
    if (tEl) tEl.classList.add('hidden');
    _animateForetMushrooms(() => _showForetSolved(true));
  } else {
    _triggerForetError();
  }
}

function _triggerForetError() {
  const cfg = CONFIG.foret;
  const svgEl = document.getElementById('foretSvg');
  if (svgEl) {
    svgEl.classList.remove('foret-shake');
    void svgEl.offsetWidth;
    svgEl.classList.add('foret-shake');
    svgEl.addEventListener('animationend', () => svgEl.classList.remove('foret-shake'), { once: true });
  }
  const errEl = $('foret-error-msg');
  errEl.textContent = cfg.texts.wrong;
  errEl.classList.remove('hidden');
  foretState.cooldownEnd = Date.now() + cfg.cooldownMs;
  _startForetCooldown(cfg.cooldownMs);
  _playForetError();
}

function _startForetCooldown(ms) {
  const btn  = $('foretSubmitBtn');
  const cdEl = $('foret-cooldown');
  if (!btn || !cdEl) return;
  btn.disabled = true;
  cdEl.classList.remove('hidden');
  clearInterval(foretState.cooldownTimer);
  const update = () => {
    const rem  = Math.max(0, foretState.cooldownEnd - Date.now());
    const secs = Math.ceil(rem / 1000);
    cdEl.textContent = CONFIG.foret.texts.cooldown + ' ' + secs + 's';
    if (rem <= 0) {
      clearInterval(foretState.cooldownTimer);
      btn.disabled = false;
      cdEl.classList.add('hidden');
      $('foret-error-msg').classList.add('hidden');
    }
  };
  update();
  foretState.cooldownTimer = setInterval(update, 500);
}

function _animateForetMushrooms(callback) {
  for (let i = 1; i <= 6; i++) {
    (idx => setTimeout(() => {
      const g = document.getElementById('foret-shroom-' + idx);
      if (!g) return;
      g.querySelectorAll('.b-shroom-cap').forEach(r => r.setAttribute('fill', '#E8C040'));
      g.querySelectorAll('.b-shroom-spot').forEach(r => r.setAttribute('fill', '#FFF8D0'));
    }, idx * 350))(i);
  }
  setTimeout(callback, 7 * 350);
}

function _showForetSolved(withSound) {
  for (let i = 1; i <= 6; i++) {
    const g = document.getElementById('foret-shroom-' + i);
    if (!g) continue;
    g.querySelectorAll('.b-shroom-cap').forEach(r => r.setAttribute('fill', '#E8C040'));
    g.querySelectorAll('.b-shroom-spot').forEach(r => r.setAttribute('fill', '#FFF8D0'));
  }
  $('foret-input-area').classList.add('hidden');
  $('foret-error-msg').classList.add('hidden');
  $('foret-cooldown').classList.add('hidden');
  const tEl = $('foret-test-hint');
  if (tEl) tEl.classList.add('hidden');
  const succEl = $('foret-success');
  succEl.textContent = CONFIG.foret.texts.success + (withSound ? '\n✅ Indice enregistré dans le Carnet !' : '\n✅ Indice déjà enregistré dans le Carnet.');
  succEl.classList.remove('hidden');
  if (withSound) _playForetSuccess();
}

function _playForetSuccess() {
  if (!audioCtx) return;
  [392, 440, 494, 523, 587, 659, 784].forEach((freq, i) => {
    const t    = audioCtx.currentTime + i * 0.20;
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.14, t + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    osc.start(t); osc.stop(t + 0.5);
  });
}

function _playForetError() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type = 'sawtooth'; osc.frequency.value = 180;
  gain.gain.setValueAtTime(0.12, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  osc.start(t); osc.stop(t + 0.4);
}

function _buildForetSvgStr() {
  let s = '<svg id="foretSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" shape-rendering="crispEdges">';

  // Sky
  s += '<rect width="240" height="180" fill="#0B1808"/>';

  // Stars
  [[25,8],[48,5],[70,12],[90,6],[150,4],[165,12],[190,8],[210,5],[230,15],
   [20,25],[42,20],[85,18],[170,22],[215,25],[235,38],[8,42],[30,38],[75,32],[175,30],[228,42]
  ].forEach(([x,y]) => { s += `<rect x="${x}" y="${y}" width="2" height="2" fill="#FFFAE0" opacity="0.7"/>`; });

  // Moon
  s += '<rect x="116" y="6" width="8" height="2" fill="#FFFAE0"/>'
    + '<rect x="114" y="8" width="12" height="2" fill="#FFFAE0"/>'
    + '<rect x="112" y="10" width="16" height="6" fill="#FFFAE0"/>'
    + '<rect x="114" y="16" width="12" height="2" fill="#FFFAE0"/>'
    + '<rect x="116" y="18" width="8" height="2" fill="#FFFAE0"/>'
    + '<rect x="118" y="8" width="10" height="2" fill="#0B1808"/>'
    + '<rect x="116" y="10" width="12" height="4" fill="#0B1808"/>'
    + '<rect x="118" y="14" width="10" height="2" fill="#0B1808"/>';

  // Pine tree LEFT
  s += '<rect x="0" y="10" width="4" height="2" fill="#0C2210"/>'
    + '<rect x="0" y="12" width="8" height="4" fill="#0C2210"/>'
    + '<rect x="0" y="16" width="12" height="4" fill="#0C2210"/>'
    + '<rect x="0" y="20" width="18" height="6" fill="#0C2210"/>'
    + '<rect x="0" y="26" width="22" height="8" fill="#0C2210"/>'
    + '<rect x="0" y="34" width="26" height="10" fill="#0C2210"/>'
    + '<rect x="0" y="44" width="28" height="10" fill="#0C2210"/>'
    + '<rect x="0" y="54" width="30" height="12" fill="#0C2210"/>'
    + '<rect x="6" y="66" width="10" height="80" fill="#1C1008"/>';

  // Pine tree RIGHT
  s += '<rect x="236" y="10" width="4" height="2" fill="#0C2210"/>'
    + '<rect x="232" y="12" width="8" height="4" fill="#0C2210"/>'
    + '<rect x="228" y="16" width="12" height="4" fill="#0C2210"/>'
    + '<rect x="222" y="20" width="18" height="6" fill="#0C2210"/>'
    + '<rect x="218" y="26" width="22" height="8" fill="#0C2210"/>'
    + '<rect x="214" y="34" width="26" height="10" fill="#0C2210"/>'
    + '<rect x="212" y="44" width="28" height="10" fill="#0C2210"/>'
    + '<rect x="210" y="54" width="30" height="12" fill="#0C2210"/>'
    + '<rect x="224" y="66" width="10" height="80" fill="#1C1008"/>';

  // Ground
  s += '<rect x="0" y="138" width="240" height="42" fill="#122A10"/>'
    + '<rect x="0" y="138" width="240" height="4" fill="#1E4418"/>';

  // Grass tufts
  [[48,133],[55,134],[85,133],[96,134],[145,133],[158,134],[178,133],[195,134],[218,133]].forEach(([x,y]) => {
    s += `<rect x="${x}" y="${y}" width="2" height="6" fill="#2A6020"/><rect x="${x+3}" y="${y+1}" width="2" height="5" fill="#2A6020"/>`;
  });

  // Mushroom helper (cx=center-x, by=bottom-y, size s/m/l)
  const shroom = (id, cx, by, sz) => {
    const C = {
      s: { sw:4, sh:6, cw:12, ch:8,  ctw:8,  cth:4, spots:[[cx-2,by-9,2,2],[cx+3,by-8,2,2]] },
      m: { sw:6, sh:8, cw:18, ch:10, ctw:14, cth:6, spots:[[cx-6,by-11,3,3],[cx,by-10,2,2],[cx+6,by-11,3,3]] },
      l: { sw:8, sh:10,cw:24, ch:14, ctw:20, cth:8, spots:[[cx-8,by-14,4,4],[cx-1,by-13,3,3],[cx+6,by-15,4,4]] },
    }[sz];
    let g = `<g id="foret-shroom-${id}" class="b-shroom">`;
    g += `<rect x="${cx-C.sw/2}" y="${by-C.sh}" width="${C.sw}" height="${C.sh}" fill="#D0C8B4"/>`;
    g += `<rect x="${cx-C.cw/2}" y="${by-C.sh-C.ch}" width="${C.cw}" height="${C.ch}" class="b-shroom-cap" fill="#C0300E"/>`;
    g += `<rect x="${cx-C.ctw/2}" y="${by-C.sh-C.ch-C.cth}" width="${C.ctw}" height="${C.cth}" class="b-shroom-cap" fill="#C0300E"/>`;
    g += `<rect x="${cx-C.cw/2}" y="${by-C.sh-2}" width="${C.cw}" height="2" fill="#801808"/>`;
    C.spots.forEach(([sx,sy,sw,sh]) => { g += `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" class="b-shroom-spot" fill="#E8E0D0"/>`; });
    g += '</g>';
    return g;
  };

  s += shroom(1, 48,  154, 's');
  s += shroom(2, 76,  150, 'm');
  s += shroom(3, 102, 146, 'l');
  s += shroom(4, 152, 146, 'l');
  s += shroom(5, 178, 150, 'm');
  s += shroom(6, 206, 154, 's');

  // Elf gardener (between mushrooms 3 & 4)
  s += '<g id="foret-elf">'
    // hat
    + '<rect x="127" y="112" width="2" height="2" fill="#3A8028"/>'
    + '<rect x="126" y="114" width="4" height="2" fill="#3A8028"/>'
    + '<rect x="125" y="116" width="6" height="2" fill="#3A8028"/>'
    + '<rect x="124" y="118" width="8" height="2" fill="#2A6020"/>'
    // face
    + '<rect x="125" y="120" width="6" height="4" fill="#D4A878"/>'
    + '<rect x="126" y="121" width="1" height="1" fill="#2A1810"/>'
    + '<rect x="129" y="121" width="1" height="1" fill="#2A1810"/>'
    + '<rect x="127" y="123" width="2" height="1" fill="#B07850"/>'
    // body
    + '<rect x="124" y="124" width="8" height="8" fill="#3A8028"/>'
    + '<rect x="124" y="127" width="8" height="1" fill="#D4A840"/>'
    // arms
    + '<rect x="120" y="124" width="4" height="2" fill="#D4A878"/>'
    + '<rect x="132" y="124" width="4" height="2" fill="#D4A878"/>'
    // legs
    + '<rect x="125" y="132" width="2" height="8" fill="#1A4818"/>'
    + '<rect x="129" y="132" width="2" height="8" fill="#1A4818"/>'
    // feet
    + '<rect x="124" y="140" width="3" height="2" fill="#3A2010"/>'
    + '<rect x="129" y="140" width="3" height="2" fill="#3A2010"/>'
    + '</g>';

  // Sparkle dots near mushrooms
  [[50,138],[78,139],[104,138],[154,138],[180,139],[208,138]].forEach(([x,y]) => {
    s += `<rect x="${x}" y="${y}" width="2" height="2" fill="#D4A840" opacity="0.5"/>`;
  });

  s += '</svg>';
  return s;
}

/* ============================================================
   TRADUCTEUR ELFIQUE
============================================================ */
const tradState = { initialized: false, hintInterval: null };

function handleNainTag() {
  const cfg = CONFIG.traducteur;
  if (!isToolUnlocked(cfg.unlock)) {
    showUnlockAnimation(cfg.unlockName, () => {
      unlockTool(cfg.unlock);
      setTimeout(openTraducteur, 80);
    });
  } else {
    setTimeout(openTraducteur, 80);
  }
}

function openTraducteur() {
  showScreen('screen-traducteur');
  _initTraducteur();
  _renderTradState();
}

function _initTraducteur() {
  if (tradState.initialized) return;
  tradState.initialized = true;

  const cfg = CONFIG.traducteur;
  const teamId = state.teamId;

  $('btnTradBack').addEventListener('click', () => {
    ensureAudio();
    _stopTradTimers();
    returnToMenu();
  });

  document.querySelector('.trad-prompt').textContent = cfg.texts.prompt;

  _buildTradHints();
  _buildTradGrid();

  $('tradAnswerBtn').addEventListener('click', () => { ensureAudio(); _checkTradAnswer(); });
  $('tradAnswerInput').addEventListener('keydown', e => { if (e.key === 'Enter') { ensureAudio(); _checkTradAnswer(); } });

  const hintBtn = $('tradHintBtn');
  hintBtn.addEventListener('click', () => { ensureAudio(); _triggerTradHint(); });

  const testBtn = $('trad-test-btn');
  if (state.testMode) {
    testBtn.classList.remove('hidden');
    testBtn.addEventListener('click', () => {
      ensureAudio();
      const map = {};
      cfg.gridLetters.forEach(l => { map[l] = l; });
      _saveTradMap(map);
      _renderTradState();
    });
  }

  if (!localStorage.getItem('esc_noel_traducteur_enter_' + teamId)) {
    localStorage.setItem('esc_noel_traducteur_enter_' + teamId, Date.now().toString());
  }
  _startTradHintTimer();
}

function _renderTradState() {
  const cfg = CONFIG.traducteur;
  const teamId = state.teamId;
  const map = _loadTradMap();

  cfg.gridLetters.forEach(letter => {
    const inp = $('trad-input-' + letter);
    if (inp) inp.value = map[letter] || '';
  });
  _updateTradDisplay(map);

  if (fbState.progress['done_traducteur'] === true) {
    _showTradSolvedState();
  }
}

function _buildTradHints() {
  const cfg = CONFIG.traducteur;
  const container = $('tradHints');
  container.innerHTML = '';

  cfg.hints.forEach(hint => {
    const card = document.createElement('div');
    card.className = 'trad-hint-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'trad-hint-img-wrap';
    imgWrap.innerHTML = hint.img;
    card.appendChild(imgWrap);

    const wordRow = document.createElement('div');
    wordRow.className = 'trad-hint-word';
    hint.word.split('').forEach((letter, i) => {
      const cell = document.createElement('div');
      cell.className = 'trad-hint-cell';

      const symImg = document.createElement('img');
      symImg.className = 'trad-symb-img';
      symImg.src = 'assets/symboles-elfiques/symbole-' + letter.toLowerCase() + '.png';
      symImg.alt = '';
      cell.appendChild(symImg);

      const userSpan = document.createElement('span');
      userSpan.className = 'trad-hint-user-letter';
      userSpan.id = 'trad-hint-' + hint.word + '-' + i;
      userSpan.textContent = '';
      cell.appendChild(userSpan);

      wordRow.appendChild(cell);
    });
    card.appendChild(wordRow);
    container.appendChild(card);
  });
}

function _buildTradGrid() {
  const cfg = CONFIG.traducteur;
  const grid = $('tradGrid');
  grid.innerHTML = '';

  cfg.gridLetters.forEach(letter => {
    const cell = document.createElement('div');
    cell.className = 'trad-cell';
    cell.id = 'trad-cell-' + letter;

    const img = document.createElement('img');
    img.className = 'trad-cell-img';
    img.id = 'trad-cell-img-' + letter;
    img.src = 'assets/symboles-elfiques/symbole-' + letter.toLowerCase() + '.png';
    img.alt = '';
    cell.appendChild(img);

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'trad-cell-input';
    inp.id = 'trad-input-' + letter;
    inp.maxLength = 1;
    inp.autocomplete = 'off';
    inp.addEventListener('input', () => {
      const val = inp.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 1);
      inp.value = val;
      const map = _loadTradMap();
      if (val) map[letter] = val;
      else delete map[letter];
      _saveTradMap(map);
      _updateTradDisplay(map);
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') { ensureAudio(); _checkTradAnswer(); }
    });
    cell.appendChild(inp);

    grid.appendChild(cell);
  });
}

function _updateTradDisplay(map) {
  const cfg = CONFIG.traducteur;
  cfg.hints.forEach(hint => {
    hint.word.split('').forEach((letter, i) => {
      const span = $('trad-hint-' + hint.word + '-' + i);
      if (span) span.textContent = map[letter] || '';
    });
  });
}

function _loadTradMap() {
  try {
    return JSON.parse(localStorage.getItem('esc_noel_traducteur_map_' + state.teamId) || '{}');
  } catch(e) { return {}; }
}

function _saveTradMap(map) {
  localStorage.setItem('esc_noel_traducteur_map_' + state.teamId, JSON.stringify(map));
}

function _checkTradAnswer() {
  const teamId = state.teamId;
  if (fbState.progress['done_traducteur'] === true) return;

  const cfg = CONFIG.traducteur;
  const raw = $('tradAnswerInput').value;
  if (!raw.trim()) return;

  if (normAnswer(raw) === normAnswer(cfg.answer)) {
    _fbWriteProgress('done_traducteur');
    _triggerTradSuccess();
  } else {
    _triggerTradError();
  }
}

function _triggerTradSuccess() {
  const cfg = CONFIG.traducteur;
  _stopTradTimers();
  _playTradSuccess();
  _tradSnow();

  cfg.gridLetters.forEach(letter => {
    const img = $('trad-cell-img-' + letter);
    if (img) img.classList.add('trad-gold');
  });

  const successEl = $('trad-success');
  successEl.textContent = cfg.texts.success;
  successEl.classList.remove('hidden');
  $('trad-error').classList.add('hidden');
  $('tradHintBtn').classList.add('hidden');
  $('trad-test-btn').classList.add('hidden');

  if (!state.testMode) {
    unlockTool('carnet');
    _fbWriteCarnet('traducteur', { type: 'traducteur', icon: cfg.carnetEntry.icon, title: cfg.carnetEntry.title, text: cfg.carnetEntry.text });
  }
}

function _showTradSolvedState() {
  const cfg = CONFIG.traducteur;
  _stopTradTimers();
  cfg.gridLetters.forEach(letter => {
    const img = $('trad-cell-img-' + letter);
    if (img) img.classList.add('trad-gold');
    const inp = $('trad-input-' + letter);
    if (inp) inp.disabled = true;
  });
  const successEl = $('trad-success');
  successEl.textContent = cfg.texts.success;
  successEl.classList.remove('hidden');
  $('tradHintBtn').classList.add('hidden');
  $('trad-test-btn').classList.add('hidden');
}

function _triggerTradError() {
  const cfg = CONFIG.traducteur;
  const grimoire = $('tradGrimoire');
  grimoire.classList.remove('trad-shake');
  void grimoire.offsetWidth;
  grimoire.classList.add('trad-shake');

  const errEl = $('trad-error');
  errEl.textContent = cfg.texts.wrong;
  errEl.classList.remove('hidden');
  _playTradError();

  setTimeout(() => {
    errEl.classList.add('hidden');
    grimoire.classList.remove('trad-shake');
  }, 4000);
}

function _startTradHintTimer() {
  _stopTradTimers();
  tradState.hintInterval = setInterval(() => {
    const teamId = state.teamId;
    if (fbState.progress['done_traducteur'] === true) {
      _stopTradTimers(); return;
    }
    const cfg = CONFIG.traducteur;
    const enterTs = parseInt(localStorage.getItem('esc_noel_traducteur_enter_' + teamId) || '0', 10);
    const hintTs  = parseInt(localStorage.getItem('esc_noel_traducteur_hint_' + teamId) || '0', 10);
    const now = Date.now();
    const hintBtn = $('tradHintBtn');
    if (!hintBtn) return;

    if (now - enterTs >= cfg.hintDelay) {
      if (hintTs === 0 || now - hintTs >= cfg.hintCooldown) {
        hintBtn.classList.remove('hidden');
        hintBtn.disabled = false;
        hintBtn.textContent = cfg.texts.hintBtn;
      } else {
        hintBtn.classList.remove('hidden');
        const remaining = Math.ceil((cfg.hintCooldown - (now - hintTs)) / 1000);
        hintBtn.disabled = true;
        hintBtn.textContent = '⏳ ' + remaining + 's';
      }
    }
  }, 2000);
}

function _stopTradTimers() {
  if (tradState.hintInterval) { clearInterval(tradState.hintInterval); tradState.hintInterval = null; }
}

function _triggerTradHint() {
  const cfg = CONFIG.traducteur;
  const teamId = state.teamId;
  const map = _loadTradMap();

  const wrongLetters = cfg.gridLetters.filter(l => map[l] !== l);
  if (wrongLetters.length === 0) return;

  const letter = wrongLetters[Math.floor(Math.random() * wrongLetters.length)];
  map[letter] = letter;
  _saveTradMap(map);
  localStorage.setItem('esc_noel_traducteur_hint_' + teamId, Date.now().toString());

  const inp = $('trad-input-' + letter);
  if (inp) {
    inp.value = letter;
    inp.classList.add('trad-hint-filled');
    setTimeout(() => inp.classList.remove('trad-hint-filled'), 2000);
  }
  _updateTradDisplay(map);

  const hintBtn = $('tradHintBtn');
  if (hintBtn) { hintBtn.disabled = true; }
}

function _playTradSuccess() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523,659,784,1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.start(t); osc.stop(t + 0.5);
    });
  } catch(e) {}
}

function _playTradError() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [300, 220].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      const t = ctx.currentTime + i * 0.2;
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.3);
    });
  } catch(e) {}
}

function _tradSnow() {
  const container = $('trad-snowflakes');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const flake = document.createElement('span');
    flake.className = 'trad-snowflake';
    flake.textContent = '❄';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (2 + Math.random() * 3) + 's';
    flake.style.animationDelay = (Math.random() * 2) + 's';
    flake.style.fontSize = (12 + Math.random() * 16) + 'px';
    container.appendChild(flake);
  }
}

/* ============================================================
   CARNET — affichage des indices collectés
============================================================ */
function openCarnet() {
  showScreen('screen-carnet');
  if (!$('btnCarnetBack')._bound) {
    $('btnCarnetBack').addEventListener('click', () => { ensureAudio(); returnToMenu(); });
    $('btnCarnetBack')._bound = true;
  }
  renderCarnet();
}

function renderCarnet() {
  const list    = $('carnetEntries');
  const empty   = $('carnetEmpty');
  if (!list || !empty) return;

  let entries = fbState.carnet || [];

  /* En mode test, afficher une entrée factice */
  if (state.testMode && entries.length === 0) {
    const realSt = CONFIG.radio.stations.find(s => s.isReal);
    if (realSt) entries = [{ type: 'radio', title: realSt.clue.title, text: realSt.clue.text, freq: realSt.freq }];
  }

  list.innerHTML = '';

  if (entries.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'carnet-entry';

    const icon  = entry.icon || (entry.type === 'radio' ? '📻' : '📖');

    const title = document.createElement('div');
    title.className   = 'carnet-entry-title';
    title.textContent = icon + ' ' + entry.title;

    const text = document.createElement('div');
    text.className   = 'carnet-entry-text';
    text.textContent = entry.text;

    card.appendChild(title);
    card.appendChild(text);

    /* Message de récompense + code bon depuis CONFIG */
    const _toolCfg = (entry.type === 'recettes') ? CONFIG.puzzles?.['recettes'] : CONFIG[entry.type];
    if (_toolCfg?.rewardMsg) {
      const reward = document.createElement('div');
      reward.className   = 'carnet-entry-reward';
      reward.textContent = _toolCfg.rewardMsg;
      card.appendChild(reward);
    }
    if (_toolCfg?.voucherCode) {
      const code = document.createElement('div');
      code.className   = 'carnet-entry-code';
      code.textContent = '🧩 Bon : ' + _toolCfg.voucherCode;
      card.appendChild(code);
    }

    /* Bouton Réécouter uniquement pour les entrées radio */
    if (entry.type === 'radio' && entry.freq) {
      const replay = document.createElement('button');
      replay.className   = 'carnet-entry-replay';
      replay.textContent = '▶ Réécouter';
      replay.addEventListener('click', () => {
        ensureAudio();
        openRadio();
        radioState.freq      = entry.freq;
        const range          = CONFIG.radio.freqMax - CONFIG.radio.freqMin;
        radioState.dialAngle = (entry.freq - CONFIG.radio.freqMin) / range * 2 * Math.PI * 2;
        updateRadioFreqDisplay(entry.freq);
        const st = CONFIG.radio.stations.find(s => s.isReal);
        if (st) setTimeout(() => showStationSubtitles(st), 300);
      });
      card.appendChild(replay);
    }

    list.appendChild(card);
  });
}

init();
