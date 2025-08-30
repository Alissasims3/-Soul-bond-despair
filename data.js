// Game Data for Soul's Harmony Tracking System

// Bond Definitions
const BONDS = {
    // Positive Bonds
    love: {
        name: "Love",
        description: "Deep affection and care for others. Grants resistance to charm effects and ability to shield allies from emotional attacks.",
        inversion: "obsession",
        inversionDescription: "Obsession - Unhealthy fixation that blinds you to reality and pushes others away."
    },
    hope: {
        name: "Hope",
        description: "Unwavering optimism and faith in better outcomes. Grants advantage on saving throws against despair effects.",
        inversion: "delusion",
        inversionDescription: "Delusion - False optimism that ignores real dangers and leads to poor decisions."
    },
    sacrifice: {
        name: "Sacrifice",
        description: "Willingness to give up personal gain for others. Allows you to take damage meant for allies.",
        inversion: "martyrdom",
        inversionDescription: "Martyrdom - Self-destructive behavior that harms both you and those you claim to protect."
    },
    unity: {
        name: "Unity",
        description: "Strength through cooperation and shared purpose. Grants bonuses when working with trusted allies.",
        inversion: "control",
        inversionDescription: "Control - Manipulative behavior disguised as leadership, forcing others to conform."
    },
    justice: {
        name: "Justice",
        description: "Commitment to fairness and righteousness. Grants insight into lies and deception.",
        inversion: "vengeance",
        inversionDescription: "Vengeance - Twisted justice that seeks punishment over redemption."
    },
    memory: {
        name: "Memory",
        description: "Preservation of important experiences and connections. Grants perfect recall of bonded memories.",
        inversion: "forgetting",
        inversionDescription: "Forgetting - Selective amnesia that erases inconvenient truths and painful growth."
    }
};

// Divine Influence Entities
const DIVINE_ENTITIES = {
    xevir: {
        name: "Xevir",
        domain: "Longing",
        sigil: "🩸",
        description: "The Crimson Yearning - feeds on unfulfilled desires and emotional pain",
        color: "#8B0000",
        mutations: [
            "Blood-red tears that never dry",
            "Heart that beats audibly when near objects of desire",
            "Phantom pain in places touched by lost loves",
            "Eyes that see the deepest wants of others",
            "Skin that flushes with others' emotional pain"
        ]
    },
    ikris: {
        name: "Ikris",
        domain: "Vengeance",
        sigil: "🔥",
        description: "The Burning Judge - turns justice into destructive retribution",
        color: "#FF4500",
        mutations: [
            "Flames that dance around you when angry",
            "Brand marks that appear when witnessing injustice",
            "Voice that echoes with righteous fury",
            "Eyes that glow with inner fire",
            "Ability to sense recent acts of betrayal"
        ]
    },
    naivara: {
        name: "Naivara",
        domain: "Memory",
        sigil: "🌫️",
        description: "The Mist Walker - manipulates memories and perceptions of the past",
        color: "#708090",
        mutations: [
            "Memories that shift like mist",
            "Ability to see echoes of past events in locations",
            "Forgotten words that slip from your tongue",
            "Dreams of lives you never lived",
            "Tendency to confuse past and present"
        ]
    },
    hive: {
        name: "Hive Father",
        domain: "Unity",
        sigil: "👑",
        description: "The Collective Crown - seeks to bind all minds into a single consciousness",
        color: "#4B0082",
        mutations: [
            "Ability to sense others' thoughts when touching",
            "Compulsive need to organize and control groups",
            "Speaking in collective 'we' instead of 'I'",
            "Physical changes that mirror those around you",
            "Overwhelming urge to eliminate individuality"
        ]
    },
    choir: {
        name: "The Crawling Choir",
        domain: "Madness",
        sigil: "🧠",
        description: "The Many-Voiced Truth - reveals forbidden knowledge through whispered madness",
        color: "#800080",
        mutations: [
            "Hearing whispers in languages that don't exist",
            "Knowledge of things you never learned",
            "Compulsive singing or humming of alien melodies",
            "Eyes that see too much of reality's true nature",
            "Memory gaps filled with impossible truths"
        ]
    }
};

// Minor Corruption Table (d10)
const MINOR_CORRUPTION = [
    { roll: 1, effect: "Temporary blindness for 1 hour - see only through divine influence" },
    { roll: 2, effect: "Compulsive truth-telling for 24 hours - cannot lie or withhold information" },
    { roll: 3, effect: "Painful headaches when near holy symbols or blessed items" },
    { roll: 4, effect: "Food tastes like ash and provides no satisfaction for 1 week" },
    { roll: 5, effect: "Nightmares of your greatest fear every time you sleep" },
    { roll: 6, effect: "Cannot touch silver without burning pain for 3 days" },
    { roll: 7, effect: "Shadow moves independently of your actions for 24 hours" },
    { roll: 8, effect: "Hear whispers of your own doubts spoken aloud by others" },
    { roll: 9, effect: "Animals become hostile and aggressive in your presence" },
    { roll: 10, effect: "Temporary loss of one cherished memory (DM's choice)" }
];

// Divine Influence Table (d100)
const DIVINE_INFLUENCE_TABLE = [
    // Xevir (Longing) - 1-20
    { min: 1, max: 20, entity: "xevir", effect: "Xevir's Influence Manifests", description: "The Crimson Yearning stirs within you" },
    // Ikris (Vengeance) - 21-40
    { min: 21, max: 40, entity: "ikris", effect: "Ikris's Influence Manifests", description: "The Burning Judge's fury ignites" },
    // Naivara (Memory) - 41-60
    { min: 41, max: 60, entity: "naivara", effect: "Naivara's Influence Manifests", description: "The Mist Walker's presence clouds your mind" },
    // Hive Father (Unity) - 61-80
    { min: 61, max: 80, entity: "hive", effect: "Hive Father's Influence Manifests", description: "The Collective Crown seeks to bind your will" },
    // The Crawling Choir (Madness) - 81-100
    { min: 81, max: 100, entity: "choir", effect: "The Crawling Choir's Influence Manifests", description: "Many voices whisper forbidden truths" }
];

// Crawling Choir Specific Tables
const CRAWLING_CHOIR_EFFECTS = {
    whisper: [
        { effect: "Whispered Knowledge", description: "Reroll any failed knowledge check, but take 1d4 psychic damage", cost: "1d4 psychic damage" },
        { effect: "Ancient Secret", description: "Learn one piece of forbidden lore, lose one cherished memory", cost: "Lose one memory" },
        { effect: "Future Echo", description: "See a glimpse of a possible future, gain temporary madness", cost: "Short-term madness" },
        { effect: "Hidden Truth", description: "Automatically detect lies for 1 hour, hear whispers constantly", cost: "Constant whispers" },
        { effect: "Deeper Understanding", description: "Gain proficiency in one skill, lose proficiency in another", cost: "Lose existing proficiency" }
    ],
    glimpse: [
        { effect: "Truth Revelation", description: "Gain true sight for 10 minutes, take psychic damage equal to your level", cost: "Psychic damage" },
        { effect: "Reality Fracture", description: "See through illusions and disguises, reality appears unstable", cost: "Perception of instability" },
        { effect: "Mind's Eye", description: "Detect thoughts at will for 1 hour, others can read your thoughts too", cost: "Vulnerable to mind reading" },
        { effect: "Cosmic Perspective", description: "Understand your place in the universe, become temporarily catatonic", cost: "10 minutes of catatonia" },
        { effect: "Divine Insight", description: "Ask one question of the DM that must be answered truthfully, lose 1 Egregor", cost: "1 Egregor loss" }
    ],
    echo: [
        { effect: "Psychic Resonance", description: "All creatures within 30 feet hear your surface thoughts", duration: "1 hour" },
        { effect: "Emotional Feedback", description: "Share all emotional states with creatures within 10 feet", duration: "24 hours" },
        { effect: "Memory Leak", description: "Random memories become visible to others as brief illusions", duration: "Until long rest" },
        { effect: "Madness Contagion", description: "Your temporary madness can spread to others through touch", duration: "While mad" },
        { effect: "Reality Blur", description: "Everyone within 15 feet sees slight distortions in reality", duration: "1 day" }
    ]
};

// Egregor Thresholds and Benefits
const EGREGOR_THRESHOLDS = {
    5: {
        name: "Resonant",
        description: "You begin to harmonize with positive spiritual forces. Gain resistance to charm effects.",
        benefits: ["Resistance to charm effects", "Can sense other Resonant beings within 60 feet"]
    },
    10: {
        name: "Harmonized",
        description: "Your soul achieves balance with the spiritual realm. Your Anchored Bonds become more powerful.",
        benefits: ["Anchored Bonds gain enhanced effects", "Advantage on saves against fear", "Can communicate telepathically with bonded creatures"]
    },
    15: {
        name: "Incarnate",
        description: "You become a living vessel of spiritual energy. Your presence uplifts others.",
        benefits: ["Allies within 30 feet gain +1 to saves", "Your touch can remove minor curses", "Radiate dim holy light"]
    },
    20: {
        name: "Nexus",
        description: "You have achieved perfect spiritual harmony. You become a beacon of hope in the darkness.",
        benefits: ["Immunity to charm and fear", "Can cast greater restoration once per long rest", "All allies within 60 feet gain inspiration daily"]
    }
};

// Despair Thresholds and Consequences
const DESPAIR_THRESHOLDS = {
    5: {
        name: "Minor Influence",
        description: "Dark forces begin to notice you. Roll on Minor Corruption table.",
        consequences: ["Roll d10 on Minor Corruption table", "Divine entities can sense your location"]
    },
    10: {
        name: "Moderate Influence",
        description: "Corruption begins to manifest physically. Gain one Divine Mark.",
        consequences: ["Gain one Divine Mark from current influence", "Anchored Bonds risk inversion", "Animals are uneasy around you"]
    },
    15: {
        name: "Major Influence",
        description: "Your soul is significantly corrupted. Major physical and mental changes occur.",
        consequences: ["Gain major Divine Mark", "One Anchored Bond automatically inverts", "Vulnerable to possession"]
    },
    20: {
        name: "Complete Corruption",
        description: "Your soul belongs to the corrupting force. You become an NPC under DM control.",
        consequences: ["Character becomes NPC", "All bonds invert", "Become avatar of corrupting entity"]
    }
};

// Temporary Despair Conversion Rules
const TEMP_DESPAIR_RULES = {
    conversionThreshold: 3,
    conversionValue: 1,
    longRestClear: true,
    description: "When all 3 temporary despair boxes are filled, they immediately convert to 1 permanent despair point and clear."
};

// Auto-save configuration
const AUTO_SAVE_CONFIG = {
    enabled: true,
    interval: 30000, // 30 seconds
    storageKey: "soulsHarmonyTracker"
};

// Export all data
window.GAME_DATA = {
    BONDS,
    DIVINE_ENTITIES,
    MINOR_CORRUPTION,
    DIVINE_INFLUENCE_TABLE,
    CRAWLING_CHOIR_EFFECTS,
    EGREGOR_THRESHOLDS,
    DESPAIR_THRESHOLDS,
    TEMP_DESPAIR_RULES,
    AUTO_SAVE_CONFIG
};