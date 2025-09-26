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

// Divine Influence Entities with Comprehensive Mutation Tables
const DIVINE_ENTITIES = {
    /* ... unchanged (omitted for brevity) ... */
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
    { min: 1, max: 20, entity: "xevir", effect: "Xevir's Influence Manifests", description: "The Crimson Yearning stirs within you" },
    { min: 21, max: 40, entity: "ikris", effect: "Ikris's Influence Manifests", description: "The Burning Judge's fury ignites" },
    { min: 41, max: 60, entity: "naivara", effect: "Naivara's Influence Manifests", description: "The Mist Walker's presence clouds your mind" },
    { min: 61, max: 80, entity: "hive", effect: "Hive Father's Influence Manifests", description: "The Collective Crown seeks to bind your will" },
    { min: 81, max: 100, entity: "choir", effect: "The Crawling Choir's Influence Manifests", description: "Many voices whisper forbidden truths" }
];

// Vision Pool System for Crawling Choir
const VISION_POOL_SYSTEM = {
    /* ... unchanged ... */
};

// Enhanced Crawling Choir Effects with Vision Pool Integration
const CRAWLING_CHOIR_EFFECTS = {
    /* ... unchanged ... */
};

// Egregor Thresholds and Benefits
const EGREGOR_THRESHOLDS = {
    /* ... unchanged ... */
};

// Despair Thresholds and Consequences
const DESPAIR_THRESHOLDS = {
    /* ... unchanged ... */
};

// Temporary Despair Conversion Rules
const TEMP_DESPAIR_RULES = {
    conversionThreshold: 3,
    conversionValue: 1,
    longRestClear: true,
    description: "When all 3 temporary despair boxes are filled, they immediately convert to 1 permanent despair point and clear."
};

// Mutation Interaction System
const MUTATION_INTERACTIONS = {
    /* ... unchanged ... */
};

// Purification and Redemption System
const PURIFICATION_SYSTEM = {
    /* ... unchanged ... */
};

// Threshold-Based Automation Rules
const THRESHOLD_AUTOMATION = {
    /* ... unchanged ... */
};

// Auto-save configuration
const AUTO_SAVE_CONFIG = {
    enabled: true,
    interval: 30000,
    storageKey: "soulsHarmonyTrackerAdvanced"
};

// Export all data
window.GAME_DATA = {
    BONDS,
    DIVINE_ENTITIES,
    MINOR_CORRUPTION,
    DIVINE_INFLUENCE_TABLE,
    VISION_POOL_SYSTEM,
    CRAWLING_CHOIR_EFFECTS,
    MUTATION_INTERACTIONS,
    PURIFICATION_SYSTEM,
    THRESHOLD_AUTOMATION,
    EGREGOR_THRESHOLDS,
    DESPAIR_THRESHOLDS,
    TEMP_DESPAIR_RULES,
    AUTO_SAVE_CONFIG
};