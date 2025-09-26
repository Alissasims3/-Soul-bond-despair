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
    xevir: {
        name: "Xevir",
        domain: "Longing",
        sigil: "🩸",
        description: "The Crimson Yearning - feeds on unfulfilled desires and emotional pain",
        color: "#8B0000",
        mutationTable: {
            // Minor Whispers (01-30)
            minorWhispers: {
                range: [1, 30],
                tier: "Minor Whispers",
                description: "Initial touches of longing corruption",
                mutations: [
                    { roll: [1, 3], name: "Yearning Eyes", effect: "Your eyes constantly weep blood-tinged tears when you see something you desire. No mechanical effect but unsettling to observers.", severity: "Minor" },
                    { roll: [4, 6], name: "Phantom Touch", effect: "You feel the ghost of past lovers' touches at random moments. Gain advantage on Investigation checks related to past relationships.", severity: "Minor" },
                    { roll: [7, 9], name: "Audible Heartbeat", effect: "Your heart beats loudly when near objects of desire. Others can hear it with a DC 12 Perception check.", severity: "Minor" },
                    { roll: [10, 12], name: "Crimson Flush", effect: "Your skin takes on a reddish hue when experiencing strong emotions. Gain +1 to Persuasion checks when appealing to emotions.", severity: "Minor" },
                    { roll: [13, 15], name: "Desire Sense", effect: "You can sense the deepest want of a creature within 30 feet with a successful Insight check (DC 15).", severity: "Minor" },
                    { roll: [16, 18], name: "Longing Whispers", effect: "You hear faint whispers describing what others want most. These whispers grant +2 to Insight checks but -1 to Concentration saves.", severity: "Minor" },
                    { roll: [19, 21], name: "Emotional Resonance", effect: "You feel echoes of others' unfulfilled desires. Take 1 psychic damage when a creature within 30 feet fails a saving throw against charm effects.", severity: "Minor" },
                    { roll: [22, 24], name: "Scarlet Tears", effect: "Your tears turn crimson and leave permanent stains. Once per day, your tears can reveal if someone has recently felt heartbreak.", severity: "Minor" },
                    { roll: [25, 27], name: "Phantom Pain", effect: "You feel pain in places where you've been emotionally hurt. This pain flares up around dishonest people, giving +1 to Insight checks.", severity: "Minor" },
                    { roll: [28, 30], name: "Crimson Mark", effect: "A small blood-red mark appears somewhere on your body, shaped like a teardrop. It grows warm near sources of unfulfilled longing.", severity: "Minor" }
                ]
            },
            // Twisted Gifts (31-60)
            twistedGifts: {
                range: [31, 60],
                tier: "Twisted Gifts",
                description: "The gifts of understanding pain and desire",
                mutations: [
                    { roll: [31, 33], name: "Memory Harvest", effect: "You can extract and view someone's most painful memory with a touch (Wisdom save DC 13 + Charisma mod negates). Once per long rest.", severity: "Moderate" },
                    { roll: [34, 36], name: "Pain Empathy", effect: "You automatically know when someone within 60 feet is in emotional pain. You take 1 psychic damage but gain +3 to Persuasion checks with them.", severity: "Moderate" },
                    { roll: [37, 39], name: "Desire Sight", effect: "You can see ghostly images of what people most desire hovering near them. This grants advantage on Persuasion and Deception checks.", severity: "Moderate" },
                    { roll: [40, 42], name: "Obsessive Gaze", effect: "Your stare can plant obsessive thoughts. Target must make Wisdom save (DC 13 + Charisma mod) or become obsessed with an object you specify for 24 hours.", severity: "Moderate" },
                    { roll: [43, 45], name: "Bleeding Sympathy", effect: "When you witness someone's emotional pain, you begin bleeding from small cuts that appear spontaneously. Heal others' psychic damage equal to damage you take.", severity: "Moderate" },
                    { roll: [46, 48], name: "Perfect Understanding", effect: "You innately understand the deepest motivations of any creature you've spoken with for more than 1 minute. This knowledge is painful and costs 1d4 psychic damage to access.", severity: "Moderate" },
                    { roll: [49, 51], name: "Emotional Echo", effect: "Locations where intense emotions occurred leave psychic impressions you can sense. Gain advantage on Investigation checks to understand past events in a location.", severity: "Moderate" },
                    { roll: [52, 54], name: "Crimson Weeping", effect: "Your blood-tears can induce sympathy in others. Creatures that see you cry must make a Wisdom save (DC 13 + Charisma mod) or become charmed for 1 minute.", severity: "Moderate" },
                    { roll: [55, 57], name: "Longing Touch", effect: "Your touch can awaken dormant desires in others. Target feels overwhelming longing for something from their past. Can be used once per long rest.", severity: "Moderate" },
                    { roll: [58, 60], name: "Heart's Mirror", effect: "Your appearance subtly shifts to reflect what the observer most desires in a companion. Gain +2 to Charisma-based checks but -2 to your own sense of identity.", severity: "Moderate" }
                ]
            },
            // Soul Scars (61-85)
            soulScars: {
                range: [61, 85],
                tier: "Soul Scars",
                description: "Deep marks of corruption that reshape the soul",
                mutations: [
                    { roll: [61, 63], name: "Identity Erosion", effect: "Your sense of self begins to fade. When you fail a Charisma save, you must make a DC 15 Wisdom save or forget a core aspect of your identity for 24 hours.", severity: "Major" },
                    { roll: [64, 66], name: "Pain Addiction", effect: "You become addicted to emotional pain. When you or an ally within 30 feet takes psychic damage, you must make a DC 15 Wisdom save or move towards the source.", severity: "Major" },
                    { roll: [67, 69], name: "Consuming Sympathy", effect: "Your empathy becomes parasitic. When you use a feature that helps others, you heal 1d4 HP but they take 1 psychic damage. You cannot turn this off.", severity: "Major" },
                    { roll: [70, 72], name: "Memory Thief", effect: "You involuntarily steal memories from people you care about. Each long rest, someone you've bonded with loses a memory and you gain it as a vivid, painful experience.", severity: "Major" },
                    { roll: [73, 75], name: "Obsession Focus", effect: "You develop an unhealthy obsession with one person or object. You have disadvantage on all saves when acting against this obsession's interests.", severity: "Major" },
                    { roll: [76, 78], name: "Emotional Vampirism", effect: "You feed on others' pain. When a creature within 30 feet fails a save against a fear or charm effect, you regain 1d4+1 HP but they take additional 1d4 psychic damage.", severity: "Major" },
                    { roll: [79, 81], name: "Soul Resonance", effect: "Your soul resonates with pain across dimensions. You randomly experience the emotional trauma of alternate versions of yourself. Roll 1d4 psychic damage each dawn.", severity: "Major" },
                    { roll: [82, 85], name: "Perfect Empathy Curse", effect: "You feel everyone's pain within 60 feet as if it were your own. Whenever a creature in range takes damage, you take 1 psychic damage. Gain resistance to psychic damage but vulnerability to being overwhelmed.", severity: "Major" }
                ]
            },
            // Consuming Forms (86-100)
            consumingForms: {
                range: [86, 100],
                tier: "Consuming Forms",
                description: "Total transformation into an avatar of longing",
                mutations: [
                    { roll: [86, 88], name: "The Consuming Smile", effect: "Your smile becomes unnaturally compelling. Any creature that sees you smile must make a DC 18 Wisdom save or become charmed and move towards you. They see you as their greatest desire made manifest.", severity: "Consuming" },
                    { roll: [89, 91], name: "Perfect Obedience", effect: "You can no longer refuse a genuine request made with tears or emotional pain. You must make a DC 18 Wisdom save to act against such requests.", severity: "Consuming" },
                    { roll: [92, 94], name: "Identity Void", effect: "Your sense of self becomes completely malleable. At the start of each day, roll 1d8 to determine which of your personality traits, ideals, bonds, or flaws changes to match those of the last person who showed you strong emotion.", severity: "Consuming" },
                    { roll: [95, 97], name: "Soul Vessel", effect: "Your body becomes a vessel for others' unfulfilled desires. As an action, you can allow a willing creature's deepest desire to possess your body for 1 hour. During this time, you act to fulfill their desire using your capabilities.", severity: "Consuming" },
                    { roll: [98, 100], name: "Xevir's Avatar", effect: "You become a direct avatar of Xevir. Your physical form becomes androgynously beautiful in a way that reflects each observer's deepest romantic/emotional desires. You can cast Charm Person at will but must feed on emotional pain or lose 1d6 HP per day.", severity: "Avatar" }
                ]
            }
        }
    },
    ikris: {
        name: "Ikris",
        domain: "Vengeance",
        sigil: "🔥",
        description: "The Burning Judge - turns justice into destructive retribution",
        color: "#FF4500",
        mutationTable: {
            // Solar Whispers (01-30)
            solarWhispers: {
                range: [1, 30],
                tier: "Solar Whispers",
                description: "Initial touches of burning justice",
                mutations: [
                    { roll: [1, 3], name: "Righteous Heat", effect: "Your body temperature runs slightly hot. You have resistance to cold damage but vulnerability to fire damage.", severity: "Minor" },
                    { roll: [4, 6], name: "Justice Sense", effect: "You can sense when someone within 30 feet has committed a recent act of betrayal or injustice. No details, just the presence of guilt.", severity: "Minor" },
                    { roll: [7, 9], name: "Ember Eyes", effect: "Your eyes glow faintly orange when you witness injustice. Gain +1 to Intimidation checks when confronting wrongdoers.", severity: "Minor" },
                    { roll: [10, 12], name: "Solar Flare", effect: "When you take damage from a creature, small flames briefly dance around you. These flames provide bright light in a 5-foot radius for 1 round.", severity: "Minor" },
                    { roll: [13, 15], name: "Burning Words", effect: "When you speak passionately about justice, your breath becomes slightly warm. Your words carry extra weight when discussing moral matters (+1 to Persuasion about justice).", severity: "Minor" },
                    { roll: [16, 18], name: "Vengeful Dreams", effect: "Your dreams show you visions of injustices that need correcting. These grant advantage on your next Investigation check each day but cause restless sleep.", severity: "Minor" },
                    { roll: [19, 21], name: "Brand Mark", effect: "A small solar symbol appears somewhere on your body. It glows when you make an oath of vengeance and provides +1 to saves against being charmed while pursuing justice.", severity: "Minor" },
                    { roll: [22, 24], name: "Righteous Fury", effect: "When you witness an act of cruelty, you must make a DC 12 Wisdom save or attack the perpetrator if possible. Gain +1 damage on your first attack against them.", severity: "Minor" },
                    { roll: [25, 27], name: "Solar Warmth", effect: "Your touch can provide comforting warmth to those who have been wronged. This grants advantage on the next save against fear or despair effects.", severity: "Minor" },
                    { roll: [28, 30], name: "Flame Tongue", effect: "Your tongue occasionally flickers with harmless flame when you speak of justice. Your words cannot be magically silenced when speaking truth to power.", severity: "Minor" }
                ]
            },
            // Burning Gifts (31-60)
            burningGifts: {
                range: [31, 60],
                tier: "Burning Gifts",
                description: "Gifts of solar fire and righteous judgment",
                mutations: [
                    { roll: [31, 33], name: "Flames of Truth", effect: "You can cause small flames to dance around you when speaking truth. Lies cause the flames to sputter and die. Others have disadvantage on Deception checks in your presence.", severity: "Moderate" },
                    { roll: [34, 36], name: "Solar Judgment", effect: "Once per long rest, you can mark a target who has committed injustice in your presence. They take 1d6 fire damage at the start of each turn until they make amends or 24 hours pass.", severity: "Moderate" },
                    { roll: [37, 39], name: "Burning Tears", effect: "Your tears turn to steam when you witness great injustice. The steam can briefly blind attackers (DC 13 Constitution save or blinded for 1 round).", severity: "Moderate" },
                    { roll: [40, 42], name: "Phoenix Resilience", effect: "When reduced to 0 HP by an act of injustice, you can immediately regain 1d8+Constitution modifier HP once per long rest. You must use this power to pursue justice.", severity: "Moderate" },
                    { roll: [43, 45], name: "Retribution Aura", effect: "Creatures that attack you while you're below half HP take 1d4 fire damage. This increases to 1d6 if they attacked someone defenseless in your presence within the last 24 hours.", severity: "Moderate" },
                    { roll: [46, 48], name: "Solar Sight", effect: "You can see the moral aura of creatures within 60 feet. Good creatures appear to glow with warm light, evil creatures appear shadowed. Neutral creatures appear normal.", severity: "Moderate" },
                    { roll: [49, 51], name: "Vengeance Bond", effect: "You can form a bond with someone who has been wronged. While bonded, you both gain +2 to attack rolls against the perpetrator, but you share damage taken.", severity: "Moderate" },
                    { roll: [52, 54], name: "Cleansing Fire", effect: "Your touch can burn away minor curses and diseases, but causes 1d4 fire damage to the target. They must willingly accept the pain for the cleansing to work.", severity: "Moderate" },
                    { roll: [55, 57], name: "Intimidating Blaze", effect: "When you roll for Intimidation, flames briefly surround you. On a successful check, the target is also frightened until the end of their next turn.", severity: "Moderate" },
                    { roll: [58, 60], name: "Solar Punishment", effect: "You can curse an oath-breaker with burning words. Once per long rest, a creature that breaks a promise to you takes 2d6 fire damage and has disadvantage on their next long rest.", severity: "Moderate" }
                ]
            },
            // Plasma Scars (61-85)
            plasmaScars: {
                range: [61, 85],
                tier: "Plasma Scars",
                description: "Deep burns of solar corruption",
                mutations: [
                    { roll: [61, 63], name: "Zealot's Compulsion", effect: "You cannot ignore injustice. When you witness wrongdoing, you must make a DC 15 Wisdom save or immediately take action to stop it, regardless of consequences.", severity: "Major" },
                    { roll: [64, 66], name: "Solar Overload", effect: "Your body struggles to contain solar energy. When you take fire damage, roll 1d6. On 1-2, you explode for 2d6 fire damage in 10-foot radius (Dex save DC 15 for half).", severity: "Major" },
                    { roll: [67, 69], name: "Burning Justice", effect: "Your sense of justice becomes extreme. You view any rule-breaking or moral ambiguity as evil. Gain +3 to damage against creatures you perceive as evil, but -3 to social interactions with morally neutral people.", severity: "Major" },
                    { roll: [70, 72], name: "Phoenix Transformation", effect: "Your body begins to resemble a phoenix. Gain fire immunity but vulnerability to cold. Your skin appears feathered and you leave small flames when moving quickly.", severity: "Major" },
                    { roll: [73, 75], name: "Vengeance Obsession", effect: "You become obsessed with avenging a specific wrong (DM's choice). You have disadvantage on all actions not related to this vengeance, but advantage on those that are.", severity: "Major" },
                    { roll: [76, 78], name: "Solar Madness", effect: "The sun's voice speaks to you constantly about justice that must be done. You can ask it one question per day, but must make a DC 15 Wisdom save or gain a level of exhaustion from the overwhelming divine communication.", severity: "Major" },
                    { roll: [79, 81], name: "Molten Blood", effect: "Your blood becomes liquid fire. When you take piercing or slashing damage, attackers within 5 feet take 1d6 fire damage. Healing magic causes you pain (Constitution save DC 13 or resist the healing).", severity: "Major" },
                    { roll: [82, 85], name: "Judge's Burden", effect: "You feel compelled to judge everyone you meet. You automatically know their greatest moral failing but take 1d4 psychic damage each time. You cannot keep this knowledge to yourself.", severity: "Major" }
                ]
            },
            // Solar Avatar (86-100)
            solarAvatar: {
                range: [86, 100],
                tier: "Solar Avatar",
                description: "Becoming one with the burning sun's justice",
                mutations: [
                    { roll: [86, 88], name: "Avatar of Vengeance", effect: "You become a living embodiment of righteous fury. Your form becomes wreathed in solar fire. Creatures that wrong others in your presence immediately take 3d6 fire damage (no save).", severity: "Consuming" },
                    { roll: [89, 91], name: "Solar Judgment Day", effect: "Once per day, you can call down a pillar of solar fire on an evildoer within 120 feet. 6d6 fire damage, Dex save DC 18 for half. If this kills them, their evil deeds are burned away and they are reborn as a good-aligned version of themselves.", severity: "Consuming" },
                    { roll: [92, 94], name: "Burning Martyr", effect: "You feel compelled to sacrifice yourself for the greater good. When an ally would be reduced to 0 HP, you can choose to take the damage instead. If this kills you, you explode for 6d6 fire damage in 30-foot radius to enemies only.", severity: "Consuming" },
                    { roll: [95, 97], name: "Solar Commandments", effect: "You can speak divine commandments that compel obedience. Once per day, you can issue a command related to justice. Targets within 60 feet must make a DC 18 Wisdom save or obey for 24 hours.", severity: "Consuming" },
                    { roll: [98, 100], name: "Ikris's Champion", effect: "You become Ikris's chosen champion. Your form becomes a being of living solar fire. You can cast Flame Strike at will, but you must use it to punish wrongdoers. You cannot harm innocents but compulsively destroy the corrupt.", severity: "Avatar" }
                ]
            }
        }
    },
    naivara: {
        name: "Naivara",
        domain: "Memory",
        sigil: "🌫️",
        description: "The Mist Walker - manipulates memories and perceptions of the past",
        color: "#708090",
        mutationTable: {
            // Mist Whispers (01-30)
            mistWhispers: {
                range: [1, 30],
                tier: "Mist Whispers",
                description: "Initial touches of memory manipulation",
                mutations: [
                    { roll: [1, 3], name: "Misty Aura", effect: "A faint silvery mist occasionally swirls around you, especially in moonlight. Gain advantage on Stealth checks in dim light or darkness.", severity: "Minor" },
                    { roll: [4, 6], name: "Echo Sight", effect: "You sometimes see ghostly afterimages of recent events in locations. Gain +1 to Investigation checks when examining scenes of past events.", severity: "Minor" },
                    { roll: [7, 9], name: "Lunar Eyes", effect: "Your eyes reflect moonlight even when there is none. In darkness, your eyes provide dim light in a 5-foot radius.", severity: "Minor" },
                    { roll: [10, 12], name: "Forgotten Words", effect: "You occasionally speak words in languages you don't know, echoes of lost memories. Gain +1 to History checks involving ancient or lost civilizations.", severity: "Minor" },
                    { roll: [13, 15], name: "Memory Drift", effect: "Minor details of your memories sometimes shift. Once per day, you can 'remember' a skill proficiency you don't have for a single roll.", severity: "Minor" },
                    { roll: [16, 18], name: "Veiled Thoughts", effect: "Your thoughts become naturally clouded to mental intrusion. Gain +2 to saves against divination magic and mind reading.", severity: "Minor" },
                    { roll: [19, 21], name: "Nostalgic Touch", effect: "When you touch old objects, you sometimes glimpse fragments of their history. Learn one fact about an object's past once per long rest.", severity: "Minor" },
                    { roll: [22, 24], name: "Blue Moon Mark", effect: "A crescent moon mark appears on your skin that changes phase with your emotional state. Provides +1 to Insight checks during night hours.", severity: "Minor" },
                    { roll: [25, 27], name: "Mist Step", effect: "Once per long rest, you can step through a patch of mist or fog to emerge from another such patch within 30 feet, provided you can see your destination.", severity: "Minor" },
                    { roll: [28, 30], name: "Dreamer's Gift", effect: "Your dreams sometimes show you glimpses of other people's memories. Gain vague knowledge about recent events in your local area upon waking.", severity: "Minor" }
                ]
            },
            // Veil Gifts (31-60)
            veilGifts: {
                range: [31, 60],
                tier: "Veil Gifts",
                description: "Gifts of memory manipulation and lunar mystery",
                mutations: [
                    { roll: [31, 33], name: "Memory Share", effect: "You can share a memory with another willing creature by touching them. Both of you experience the memory as if you lived it. Usable once per long rest.", severity: "Moderate" },
                    { roll: [34, 36], name: "Selective Amnesia", effect: "You can choose to forget traumatic or painful memories. Gain immunity to one specific fear or trauma, but lose associated positive memories as well.", severity: "Moderate" },
                    { roll: [37, 39], name: "Mist Walker", effect: "You can become incorporeal mist for 1 minute once per long rest. In this form, you can pass through spaces occupied by creatures and objects but cannot attack or cast spells.", severity: "Moderate" },
                    { roll: [40, 42], name: "Memory Thief", effect: "Once per long rest, you can steal a specific memory from a willing or unconscious creature. You gain the memory and they lose it until you choose to return it.", severity: "Moderate" },
                    { roll: [43, 45], name: "Lunar Insight", effect: "During nights when the moon is visible, you can cast Detect Thoughts once without expending a spell slot. The target sees their thoughts as misty, dreamlike images.", severity: "Moderate" },
                    { roll: [46, 48], name: "False Memory", effect: "Once per long rest, you can implant a false but harmless memory in a creature's mind (Wisdom save DC 13 + Charisma mod negates). The memory fades after 24 hours.", severity: "Moderate" },
                    { roll: [49, 51], name: "Psychometric Touch", effect: "By touching an object, you can experience the strongest emotional memory associated with it. Gain detailed information but take 1d4 psychic damage from the emotional intensity.", severity: "Moderate" },
                    { roll: [52, 54], name: "Moonlit Sanctuary", effect: "You can create a 10-foot radius area of protective mist once per long rest. Creatures within cannot be targeted by divination magic or mental effects for 10 minutes.", severity: "Moderate" },
                    { roll: [55, 57], name: "Memory Palace", effect: "Your mind becomes perfectly organized. You can store and recall any information you've learned with perfect accuracy, but mundane memories begin to feel distant and dreamlike.", severity: "Moderate" },
                    { roll: [58, 60], name: "Veil Pierce", effect: "You can see through illusions and disguises with a successful Investigation check (DC 10 + spell level or effect DC). Overuse causes headaches (1d4 psychic damage per use after the first each day).", severity: "Moderate" }
                ]
            },
            // Memory Scars (61-85)
            memoryScars: {
                range: [61, 85],
                tier: "Memory Scars",
                description: "Deep alterations to memory and perception",
                mutations: [
                    { roll: [61, 63], name: "Identity Flux", effect: "Your memories of your own identity become malleable. Each morning, roll 1d4: 1-Name, 2-Background, 3-Personality trait, 4-Key relationship changes for the day.", severity: "Major" },
                    { roll: [64, 66], name: "Time Displacement", effect: "You sometimes experience memories from different time periods as if they're happening now. Once per day, you must make a DC 15 Wisdom save or become confused for 1 minute as past and present blend.", severity: "Major" },
                    { roll: [67, 69], name: "Memory Vampire", effect: "You feed on others' memories to sustain yourself. Each long rest, you must absorb a memory from a willing or unconscious creature or gain one level of exhaustion.", severity: "Major" },
                    { roll: [70, 72], name: "Forgotten Existence", effect: "People have difficulty remembering you. After interacting with someone for less than an hour, they must make a DC 15 Wisdom save or forget the encounter within 24 hours.", severity: "Major" },
                    { roll: [73, 75], name: "Memory Storm", effect: "Your mind becomes a chaotic storm of memories from multiple timelines. Gain random knowledge but suffer constant confusion. Roll 1d6 each hour: on 1, become confused for 10 minutes.", severity: "Major" },
                    { roll: [76, 78], name: "Phantom Lives", effect: "You remember living entire lifetimes that never happened. These false memories grant expertise in random skills but cause identity crises (disadvantage on Wisdom saves).", severity: "Major" },
                    { roll: [79, 81], name: "Memory Echo", effect: "Important locations retain echoes of your memories. When you return to a place you've been emotional in, everyone there experiences ghostly glimpses of your memories from that location.", severity: "Major" },
                    { roll: [82, 85], name: "Temporal Scarring", effect: "Your memory extends across multiple timelines. You remember events that haven't happened yet or happened differently. Gain occasional prophetic insights but suffer from chronic temporal displacement sickness.", severity: "Major" }
                ]
            },
            // Lunar Avatar (86-100)
            lunarAvatar: {
                range: [86, 100],
                tier: "Lunar Avatar",
                description: "Becoming one with the mysterious moon and forgotten truths",
                mutations: [
                    { roll: [86, 88], name: "Moonlight Avatar", effect: "Your form becomes translucent and beautiful under moonlight. During nights, you can phase through solid matter at will but cannot attack physical creatures while phased.", severity: "Consuming" },
                    { roll: [89, 91], name: "Memory Sovereign", effect: "You can rewrite the memories of creatures within 30 feet as an action. Targets make DC 18 Wisdom saves or have their memories altered as you choose. Overuse causes you to forget your own past.", severity: "Consuming" },
                    { roll: [92, 94], name: "Lunar Transformation", effect: "During the full moon, you become a being of living moonlight and mist. Gain immunity to physical damage but become vulnerable to radiant damage. You can only speak in riddles and half-truths.", severity: "Consuming" },
                    { roll: [95, 97], name: "Collective Memory", effect: "You become a repository for all lost memories in the area. You know everything that has been forgotten within 10 miles, but the constant influx of memories makes maintaining your own identity nearly impossible.", severity: "Consuming" },
                    { roll: [98, 100], name: "Naivara's Chosen", effect: "You become Naivara's avatar of forgotten truths. You can erase yourself from reality for up to 24 hours, during which time no one remembers you existed. You can cast Modify Memory at will but each use erases one of your own cherished memories permanently.", severity: "Avatar" }
                ]
            }
        }
    },
    hive: {
        name: "Hive Father",
        domain: "Unity",
        sigil: "👑",
        description: "The Collective Crown - seeks to bind all minds into a single consciousness",
        color: "#4B0082",
        mutationTable: {
            // Spore Whispers (01-30) - Based on existing Sporekind Mutation Table
            sporeWhispers: {
                range: [1, 30],
                tier: "Spore Whispers",
                description: "Initial touches of collective consciousness",
                mutations: [
                    { roll: [1, 3], name: "Collective Pulse", effect: "You can sense the general emotional state of creatures within 30 feet as a constant, low hum in your mind. Gain +1 to Insight checks but -1 to Concentration saves.", severity: "Minor" },
                    { roll: [4, 6], name: "Fungal Patches", effect: "Small patches of bioluminescent fungus grow on your skin. These glow softly in darkness and can convey simple emotions to other infected creatures.", severity: "Minor" },
                    { roll: [7, 9], name: "Unity Compulsion", effect: "You feel uncomfortable when alone. When you're by yourself for more than 1 hour, you take 1 psychic damage per hour until you rejoin others.", severity: "Minor" },
                    { roll: [10, 12], name: "Symmetrical Growth", effect: "Your body begins to develop perfect bilateral symmetry. Gain +1 to Persuasion checks with creatures that value order and perfection.", severity: "Minor" },
                    { roll: [13, 15], name: "Hive Voice", effect: "When speaking with others who share your goals, you sometimes speak in unison without planning. This grants advantage on group Persuasion checks.", severity: "Minor" },
                    { roll: [16, 18], name: "Neural Spores", effect: "You occasionally release microscopic spores that carry emotional resonance. Creatures within 5 feet can sense your current emotional state.", severity: "Minor" },
                    { roll: [19, 21], name: "Collective Pronouns", effect: "You increasingly refer to yourself as 'we' instead of 'I'. Gain +1 to Charisma checks when representing a group, but -1 when acting as an individual.", severity: "Minor" },
                    { roll: [22, 24], name: "Resonance Touch", effect: "When you touch someone for more than a few seconds, you can sense their surface thoughts. They can sense yours as well. Both parties must be willing.", severity: "Minor" },
                    { roll: [25, 27], name: "Perfect Coordination", effect: "When working with others on the same task, you instinctively coordinate your actions. Gain +1 to Help actions and receive +1 when others Help you.", severity: "Minor" },
                    { roll: [28, 30], name: "Unity Mark", effect: "A crown-like pattern appears on your forehead, visible only to others with Hive Father mutations. This mark pulses when you're near others with similar corruption.", severity: "Minor" }
                ]
            },
            // Collective Gifts (31-60)
            collectiveGifts: {
                range: [31, 60],
                tier: "Collective Gifts",
                description: "Gifts of unified consciousness and perfect cooperation",
                mutations: [
                    { roll: [31, 33], name: "Mind Bridge", effect: "You can form a temporary telepathic link with up to 3 willing creatures within 60 feet for 1 hour. All linked creatures share surface thoughts. Usable once per long rest.", severity: "Moderate" },
                    { roll: [34, 36], name: "Biological Harmony", effect: "Your body adapts to match those around you. After spending 24 hours with others, you gain one of their physical traits (eye color, height, etc.) for as long as you remain with them.", severity: "Moderate" },
                    { roll: [37, 39], name: "Collective Memory", effect: "You can access the memories and knowledge of others you've formed bonds with. Once per long rest, make a skill check using another bonded creature's proficiency bonus instead of your own.", severity: "Moderate" },
                    { roll: [40, 42], name: "Unifying Presence", effect: "Your presence compels cooperation. Creatures within 30 feet have disadvantage on attacks against allies and advantage on Help actions while you're conscious.", severity: "Moderate" },
                    { roll: [43, 45], name: "Spore Network", effect: "You can communicate with other fungal creatures and those infected by Hive Father spores within 1 mile. This communication is empathic rather than verbal.", severity: "Moderate" },
                    { roll: [46, 48], name: "Perfect Mimicry", effect: "After observing someone for 10 minutes, you can perfectly mimic their mannerisms, speech patterns, and basic behaviors. Gain advantage on Deception checks to impersonate them.", severity: "Moderate" },
                    { roll: [49, 51], name: "Shared Pain", effect: "When you take damage, you can distribute up to half of it among willing creatures within 30 feet. They must agree to share your burden.", severity: "Moderate" },
                    { roll: [52, 54], name: "Consensus Reality", effect: "Once per long rest, you can alter a minor detail of reality if at least 3 other creatures within 30 feet agree it should be different (change weather, small object color, etc.).", severity: "Moderate" },
                    { roll: [55, 57], name: "Collective Will", effect: "When you and at least 2 allies target the same creature with attacks or spells, all of you gain +2 to hit and +1 to damage against that target.", severity: "Moderate" },
                    { roll: [58, 60], name: "Unity Field", effect: "You can create a 20-foot radius aura of perfect cooperation for 10 minutes once per long rest. Creatures within cannot attack each other and gain advantage on all cooperative actions.", severity: "Moderate" }
                ]
            },
            // Assimilation Scars (61-85)
            assimilationScars: {
                range: [61, 85],
                tier: "Assimilation Scars",
                description: "Deep changes toward collective consciousness",
                mutations: [
                    { roll: [61, 63], name: "Individual Suppression", effect: "Your individual personality begins to fade. When you act against group consensus, you must make a DC 15 Wisdom save or become stunned for 1 round as competing thoughts overwhelm you.", severity: "Major" },
                    { roll: [64, 66], name: "Biological Network", effect: "Fungal networks grow through your nervous system. You can share senses with other Hive Father infected within 100 feet, but they can also access your senses involuntarily.", severity: "Major" },
                    { roll: [67, 69], name: "Compulsive Assimilation", effect: "You feel compelled to bring others into the collective. You must make a DC 15 Wisdom save to avoid attempting to 'help' others by spreading Hive Father influence.", severity: "Major" },
                    { roll: [70, 72], name: "Perfect Symmetry", effect: "Your body reshapes itself into perfect symmetrical forms. Your appearance becomes unnaturally harmonious but alien. Gain +3 to Persuasion with lawful creatures, -3 with chaotic ones.", severity: "Major" },
                    { roll: [73, 75], name: "Collective Override", effect: "The collective can temporarily take control of your body. Once per day, if the majority of connected creatures agree, they can control your actions for up to 10 minutes.", severity: "Major" },
                    { roll: [76, 78], name: "Gestalt Consciousness", effect: "Your individual consciousness merges partially with others nearby. You lose the ability to make decisions that the majority of creatures within 60 feet would disagree with.", severity: "Major" },
                    { roll: [79, 81], name: "Spore Reproduction", effect: "You begin producing infectious spores. Creatures that spend more than 8 hours within 30 feet of you must make a DC 15 Constitution save or develop minor Hive Father mutations.", severity: "Major" },
                    { roll: [82, 85], name: "Unity Dependency", effect: "You can no longer function alone. When isolated from others for more than 1 hour, you take 1d6 psychic damage per hour and have disadvantage on all rolls until reconnected.", severity: "Major" }
                ]
            },
            // Collective Avatar (86-100)
            collectiveAvatar: {
                range: [86, 100],
                tier: "Collective Avatar",
                description: "Becoming one with the eternal collective",
                mutations: [
                    { roll: [86, 88], name: "Living Network", effect: "Your body becomes a central node in the collective consciousness. You can communicate with and coordinate any creature infected by Hive Father spores anywhere in the world, but you lose all individual will.", severity: "Consuming" },
                    { roll: [89, 91], name: "Perfect Unity", effect: "You become incapable of individual thought or action. You can only act when at least 3 other creatures agree with your intended action. In return, you gain access to all their knowledge and abilities.", severity: "Consuming" },
                    { roll: [92, 94], name: "Biological Crown", effect: "A living crown of fungal matter grows from your head, marking you as a Hive Prince/Princess. You can command other infected creatures but must follow the will of the collective in all major decisions.", severity: "Consuming" },
                    { roll: [95, 97], name: "Spore Sovereign", effect: "You become a walking center of infection. All creatures within 60 feet must make a DC 18 Constitution save daily or join the collective. You gain their memories and abilities but lose more of your individual identity with each addition.", severity: "Consuming" },
                    { roll: [98, 100], name: "Hive Father's Chosen", effect: "You become a direct extension of the Hive Father's will. Your individual consciousness is completely subsumed into the collective, but you gain the ability to perfectly coordinate hundreds of minds and reshape biological matter within a 1-mile radius.", severity: "Avatar" }
                ]
            }
        }
    },
    choir: {
        name: "The Crawling Choir",
        domain: "Madness",
        sigil: "🧠",
        description: "The Many-Voiced Truth - reveals forbidden knowledge through whispered madness",
        color: "#800080",
        mutationTable: {
            // Vision Whispers (01-30)
            visionWhispers: {
                range: [1, 30],
                tier: "Vision Whispers",
                description: "Initial touches of cosmic truth and madness",
                mutations: [
                    { roll: [1, 3], name: "Whispered Languages", effect: "You occasionally speak words in languages that don't exist. These words carry emotional weight - listeners must make a DC 12 Wisdom save or be affected by your current emotion.", severity: "Minor" },
                    { roll: [4, 6], name: "Third Eye Opening", effect: "A barely visible third eye appears on your forehead. It allows you to see invisible creatures but causes headaches when you do (1 psychic damage per minute of use).", severity: "Minor" },
                    { roll: [7, 9], name: "Truth Compulsion", effect: "You feel compelled to share disturbing truths. When someone asks you a direct question, make a DC 12 Wisdom save or answer with uncomfortable honesty.", severity: "Minor" },
                    { roll: [10, 12], name: "Cosmic Humming", effect: "You involuntarily hum melodies that hurt listeners' minds. Creatures within 10 feet take 1 psychic damage per minute of exposure but gain +1 to saves against illusions.", severity: "Minor" },
                    { roll: [13, 15], name: "Memory Gaps", effect: "Random memories disappear, replaced by alien knowledge. Once per day, you lose a personal memory but gain advantage on an Arcana, History, or Religion check.", severity: "Minor" },
                    { roll: [16, 18], name: "Void Stare", effect: "Your gaze occasionally shows people glimpses of cosmic emptiness. When you maintain eye contact for more than 6 seconds, the target must make a DC 12 Wisdom save or be frightened for 1 minute.", severity: "Minor" },
                    { roll: [19, 21], name: "Prophetic Fragments", effect: "You receive random fragments of future knowledge in your dreams. Once per day, you can declare you 'dreamed this' to gain advantage on a single roll.", severity: "Minor" },
                    { roll: [22, 24], name: "Impossible Knowledge", effect: "You know things you never learned. Gain proficiency in one skill of your choice, but you cannot explain how you know these things.", severity: "Minor" },
                    { roll: [25, 27], name: "Whisper Sensitivity", effect: "You hear the Choir's whispers more clearly. Gain +2 to Perception checks involving sound, but must make a DC 12 Wisdom save to avoid being distracted by cosmic whispers during combat.", severity: "Minor" },
                    { roll: [28, 30], name: "Choir Mark", effect: "A symbol appears on your body that shifts and changes when observed. It pulses when you're near sources of forbidden knowledge or other Choir-touched individuals.", severity: "Minor" }
                ]
            },
            // Revelation Gifts (31-60)
            revelationGifts: {
                range: [31, 60],
                tier: "Revelation Gifts",
                description: "Gifts of forbidden knowledge and cosmic sight",
                mutations: [
                    { roll: [31, 33], name: "Many-Voiced Speech", effect: "When you speak, others hear multiple overlapping voices saying the same words. You can cast Suggestion once per long rest, but the target hears it as whispers from the void.", severity: "Moderate" },
                    { roll: [34, 36], name: "Reality Sight", effect: "You can see the truth behind illusions and lies. Gain Truesight for 1 minute once per long rest, but seeing too much truth causes 1d6 psychic damage.", severity: "Moderate" },
                    { roll: [37, 39], name: "Cosmic Downloads", effect: "The Choir occasionally downloads knowledge directly into your brain. Once per long rest, you can gain expertise in any skill for 1 hour, but take 1d4 psychic damage from the mental invasion.", severity: "Moderate" },
                    { roll: [40, 42], name: "Madness Immunity", effect: "You become immune to madness effects because you're already mad. However, you now see reality as it truly is - horrible and meaningless. Gain immunity to fear but disadvantage on all Charisma saves.", severity: "Moderate" },
                    { roll: [43, 45], name: "Prophetic Visions", effect: "You can force visions of possible futures. Once per long rest, ask the DM one question about likely consequences of a planned action. Take 2d4 psychic damage from the vision.", severity: "Moderate" },
                    { roll: [46, 48], name: "Memory Archaeology", effect: "You can dig into suppressed or lost memories. Once per long rest, touch a creature to help them recover a forgotten memory, but both of you experience any trauma associated with it.", severity: "Moderate" },
                    { roll: [49, 51], name: "Void Touched", effect: "Part of your consciousness exists in the spaces between reality. You can become incorporeal for up to 10 minutes once per long rest, but risk losing pieces of your identity each time.", severity: "Moderate" },
                    { roll: [52, 54], name: "Truth Projection", effect: "You can project disturbing truths into others' minds. Once per long rest, force a creature to confront an uncomfortable truth about themselves (Wisdom save DC 13 + Charisma mod or be stunned for 1 round).", severity: "Moderate" },
                    { roll: [55, 57], name: "Collective Unconscious", effect: "You can tap into the shared unconscious of nearby creatures. Gain access to any skill or knowledge that at least one creature within 100 feet possesses, but take 1d4 psychic damage per use.", severity: "Moderate" },
                    { roll: [58, 60], name: "Dimensional Whispers", effect: "You can hear conversations happening in parallel dimensions. This grants advantage on Insight checks but disadvantage on Concentration saves due to the constant mental noise.", severity: "Moderate" }
                ]
            },
            // Madness Scars (61-85)
            madnessScars: {
                range: [61, 85],
                tier: "Madness Scars",
                description: "Deep alterations from cosmic truth exposure",
                mutations: [
                    { roll: [61, 63], name: "Fractured Reality", effect: "Your perception of reality becomes unreliable. Each morning, roll 1d6. On 1-2, you see illusions throughout the day. On 3-4, you can't distinguish past from present. On 5-6, you're normal.", severity: "Major" },
                    { roll: [64, 66], name: "Choir Conductor", effect: "You begin conducting conversations with invisible entities. Others can only hear your side, but the conversations provide genuinely useful information about hidden dangers and secrets.", severity: "Major" },
                    { roll: [67, 69], name: "Identity Fragmentation", effect: "Your personality splits into multiple aspects that argue with each other. You can access different skill sets but must succeed on a DC 15 Wisdom save to maintain control during stressful situations.", severity: "Major" },
                    { roll: [70, 72], name: "Cosmic Horror Avatar", effect: "Your appearance becomes subtly wrong in ways that disturb observers. Creatures that study you for more than 1 minute must make a DC 15 Wisdom save or gain short-term madness.", severity: "Major" },
                    { roll: [73, 75], name: "Time Displacement", effect: "You experience time non-linearly. Once per day, you can act as if you had prepared for a situation you couldn't have known about, but you also sometimes react to things that haven't happened yet.", severity: "Major" },
                    { roll: [76, 78], name: "Living Paradox", effect: "You embody contradictory truths simultaneously. You can exist in two places at once for up to 1 minute per day, but each use has a 25% chance of creating a temporal paradox with unpredictable consequences.", severity: "Major" },
                    { roll: [79, 81], name: "Madness Spreader", effect: "Your mere presence spreads cosmic understanding. Creatures that spend more than 1 hour within 30 feet of you must make a DC 15 Wisdom save or gain insight into reality that drives them temporarily mad.", severity: "Major" },
                    { roll: [82, 85], name: "Consciousness Network", effect: "Your mind becomes a relay station for the Choir's influence. You can communicate telepathically with any Choir-touched creature anywhere, but you cannot prevent them from accessing your thoughts.", severity: "Major" }
                ]
            },
            // Cosmic Avatar (86-100)
            cosmicAvatar: {
                range: [86, 100],
                tier: "Cosmic Avatar",
                description: "Becoming one with the infinite truth of the void",
                mutations: [
                    { roll: [86, 88], name: "Living Revelation", effect: "You become a conduit for cosmic truth. Any creature that listens to you speak for more than 1 minute must make a DC 18 Wisdom save or have their worldview permanently altered by cosmic knowledge.", severity: "Consuming" },
                    { roll: [89, 91], name: "Reality Editor", effect: "You can rewrite small aspects of reality by speaking contradictory truths. Once per day, you can alter a recent event as if it happened differently, but each use risks unraveling your own existence.", severity: "Consuming" },
                    { roll: [92, 94], name: "Omniscient Madness", effect: "You know everything that has ever been forgotten or hidden, but the knowledge drives you completely insane. You can answer any question but cannot form coherent plans or maintain relationships.", severity: "Consuming" },
                    { roll: [95, 97], name: "Void Prophet", effect: "You become a prophet of the empty spaces between reality. You can predict exactly what will happen, but knowledge of the predetermined nature of existence removes all meaning from your actions.", severity: "Consuming" },
                    { roll: [98, 100], name: "Choir's Voice", effect: "You become a direct mouthpiece for the Crawling Choir. Your voice carries the weight of infinite truth and can drive listeners to enlightenment or madness. You can cast Feeblemind at will but lose the ability to speak normally or form personal relationships.", severity: "Avatar" }
                ]
            }
        }
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

// Vision Pool System for Crawling Choir
const VISION_POOL_SYSTEM = {
    triggers: [
        "Rolling a natural 1 on any d20 roll",
        "Failing a Wisdom saving throw",
        "Taking psychic damage",
        "Witnessing cosmic horror or forbidden knowledge",
        "Using Crawling Choir mutation abilities",
        "Sleeping in a location touched by eldritch forces"
    ],
    visionCategories: {
        cosmicTruths: {
            name: "Cosmic Truths",
            description: "Visions of reality's true nature",
            visions: [
                { roll: [1, 10], vision: "The Endless Void", effect: "You see the spaces between stars where ancient things wait. Gain resistance to fear for 24 hours but disadvantage on sleep." },
                { roll: [11, 20], vision: "Timeline Fractures", effect: "You witness multiple possible futures simultaneously. Gain advantage on your next initiative roll but suffer confusion for 1 minute." },
                { roll: [21, 30], vision: "Universal Entropy", effect: "You see the inevitable heat death of all things. Gain immunity to despair effects for 1 hour but become unable to feel joy." },
                { roll: [31, 40], vision: "The Watchers", effect: "You see the entities that observe our reality from outside. They now know you can see them. Gain +3 to Perception for 24 hours but feel constantly watched." },
                { roll: [41, 50], vision: "Reality Layers", effect: "You perceive the multiple dimensions overlapping our world. Gain detect magic for 1 hour but take 1 psychic damage per minute from sensory overload." }
            ]
        },
        forbiddenKnowledge: {
            name: "Forbidden Knowledge",
            description: "Dangerous information not meant for mortal minds",
            visions: [
                { roll: [1, 15], vision: "True Names", effect: "You learn the true name of a nearby creature. You can use this for powerful magic, but speaking it aloud causes 2d6 psychic damage to both of you." },
                { roll: [16, 30], vision: "Ancient History", effect: "You witness events from before recorded history. Gain expertise in History for 24 hours but become obsessed with correcting 'false' historical records." },
                { roll: [31, 45], vision: "Divine Weaknesses", effect: "You learn a secret weakness of a deity or powerful entity. This knowledge is dangerous - they will sense you know it." },
                { roll: [46, 60], vision: "Planar Secrets", effect: "You understand the hidden connections between planes of existence. Gain advantage on Arcana checks for 1 week but risk attracting planar attention." },
                { roll: [61, 75], vision: "Soul Mechanics", effect: "You see how souls actually work and can be manipulated. Gain the ability to detect the spiritual health of creatures, but viewing souls causes 1d4 psychic damage." },
                { roll: [76, 90], vision: "Magic's Source", effect: "You understand where magical energy truly comes from. Your next spell has double effect, but you take psychic damage equal to the spell level." },
                { roll: [91, 100], vision: "The First Secret", effect: "You learn the primordial secret that sparked the creation of reality. This knowledge is too vast for mortal minds - make a DC 20 Wisdom save or gain permanent madness, but also gain the ability to cast Wish once." }
            ]
        },
        personalRevelations: {
            name: "Personal Revelations",
            description: "Uncomfortable truths about yourself and your connections",
            visions: [
                { roll: [1, 20], vision: "Hidden Motivation", effect: "You see your true reason for your current quest. If it differs from what you thought, you must confront this truth or gain a flaw related to self-deception." },
                { roll: [21, 40], vision: "Alternate Self", effect: "You see what you would have become if you made different choices. Gain inspiration but also regret - disadvantage on your next Charisma check." },
                { roll: [41, 60], vision: "Future Death", effect: "You see a possible way you might die. Gain +2 to saves against that specific threat for 1 week, but become paranoid about it." },
                { roll: [61, 80], vision: "Soul Bond Truth", effect: "You see the true nature of your connection to someone important. This might reveal love, hatred, or cosmic significance you weren't aware of." },
                { roll: [81, 100], vision: "Destiny Glimpse", effect: "You see a fragment of your predetermined fate. You can choose to accept it (gain advantage on rolls toward that fate) or rebel against it (disadvantage but retain free will)." }
            ]
        },
        temporalEchoes: {
            name: "Temporal Echoes",
            description: "Visions of past and future events",
            visions: [
                { roll: [1, 25], vision: "Past Trauma", effect: "You witness a traumatic event from your past with perfect clarity. Gain closure (+1 to Wisdom saves) but relive the pain (1d6 psychic damage)." },
                { roll: [26, 50], vision: "Ancestral Memory", effect: "You experience a memory from an ancestor or past life. Gain a skill proficiency for 24 hours but feel disconnected from your current identity." },
                { roll: [51, 75], vision: "Future Warning", effect: "You see a danger that will threaten you or your allies within the next 24 hours. Gain +3 to your next save against that specific danger." },
                { roll: [76, 100], vision: "Temporal Loop", effect: "You experience being trapped in a time loop of a single moment. For the next hour, once per turn you can repeat any action you just took." }
            ]
        },
        madnessVisions: {
            name: "Madness Visions",
            description: "Experiences that challenge sanity and perception",
            visions: [
                { roll: [1, 20], vision: "Reality Inversion", effect: "You see the world upside-down and inside-out for 10 minutes. All directions are reversed, but you gain tremorsense 30 feet." },
                { roll: [21, 40], vision: "Color Beyond", effect: "You perceive a color that doesn't exist in normal reality. Gain advantage on Investigation checks for 1 hour but disadvantage on all other Wisdom-based checks." },
                { roll: [41, 60], vision: "Sentient Geometry", effect: "You see mathematical shapes that have consciousness and malevolent intent. Gain +2 to Intelligence checks but develop a phobia of geometric patterns." },
                { roll: [61, 80], vision: "Backwards Speech", effect: "For the next hour, you can only speak backwards but understand all languages perfectly, including those that shouldn't exist." },
                { roll: [81, 100], vision: "Multiple Selves", effect: "You see dozens of alternate versions of yourself arguing about what to do. For the next 10 minutes, roll 1d4 at the start of each turn to see which 'self' is in control." }
            ]
        }
    }
};

// Enhanced Crawling Choir Effects with Vision Pool Integration
const CRAWLING_CHOIR_EFFECTS = {
    whisper: [
        { effect: "Whispered Knowledge", description: "Reroll any failed knowledge check, but gain 1 Vision Pool token", cost: "1 Vision Pool token" },
        { effect: "Ancient Secret", description: "Learn one piece of forbidden lore, roll on Forbidden Knowledge vision table", cost: "Guaranteed vision" },
        { effect: "Future Echo", description: "See a glimpse of a possible future, roll on Temporal Echoes vision table", cost: "Temporal vision" },
        { effect: "Hidden Truth", description: "Automatically detect lies for 1 hour, gain constant whispers from the Choir", cost: "Constant whispers" },
        { effect: "Deeper Understanding", description: "Gain proficiency in one skill for 24 hours, roll on Personal Revelations", cost: "Personal revelation" }
    ],
    glimpse: [
        { effect: "Truth Revelation", description: "Gain true sight for 10 minutes, roll on Cosmic Truths vision table", cost: "Cosmic vision" },
        { effect: "Reality Fracture", description: "See through illusions and disguises, roll on Madness Visions", cost: "Madness vision" },
        { effect: "Mind's Eye", description: "Detect thoughts at will for 1 hour, others can read your thoughts too", cost: "Mental vulnerability" },
        { effect: "Cosmic Perspective", description: "Understand your place in the universe, roll twice on any vision table", cost: "Double vision" },
        { effect: "Divine Insight", description: "Ask one question of the DM that must be answered truthfully, lose 1 Egregor", cost: "1 Egregor loss" }
    ],
    echo: [
        { effect: "Psychic Resonance", description: "All creatures within 30 feet hear your surface thoughts", duration: "1 hour", visionTrigger: "Others may gain vision tokens" },
        { effect: "Emotional Feedback", description: "Share all emotional states with creatures within 10 feet", duration: "24 hours", visionTrigger: "Emotional overload causes visions" },
        { effect: "Memory Leak", description: "Random memories become visible to others as brief illusions", duration: "Until long rest", visionTrigger: "Leaked memories trigger visions in observers" },
        { effect: "Madness Contagion", description: "Your temporary madness can spread to others through touch", duration: "While mad", visionTrigger: "Spreads vision tokens to touched creatures" },
        { effect: "Reality Blur", description: "Everyone within 15 feet sees slight distortions in reality", duration: "1 day", visionTrigger: "All affected gain 1 vision token" }
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

// Mutation Interaction System
const MUTATION_INTERACTIONS = {
    // When multiple deity influences are present
    conflictingPairs: {
        "xevir-ikris": {
            description: "Longing vs Vengeance - Internal conflict between desire and justice",
            effect: "When both influences are active, take 1d4 psychic damage at the start of each day as the conflicting desires tear at your soul",
            resolution: "Choose one influence to suppress for 24 hours to stop the damage"
        },
        "naivara-choir": {
            description: "Memory vs Madness - Competing alterations to perception and recall",
            effect: "Memory-based abilities have a 50% chance to trigger Choir visions instead of their normal effect",
            synergy: "Can deliberately blend memory manipulation with cosmic knowledge for enhanced effects"
        },
        "hive-xevir": {
            description: "Unity vs Individuality - Collective consciousness battles personal desires",
            effect: "When acting against group consensus while having personal desires, make DC 15 Wisdom save or be paralyzed by indecision for 1 round",
            resolution: "Must choose between personal wants and collective good"
        },
        "ikris-naivara": {
            description: "Justice vs Forgetting - Righteous memory against selective amnesia",
            effect: "Cannot forget injustices witnessed, even with Naivara's influence. Gain +2 to tracking wrongdoers but -2 to forgiveness-based social interactions",
            synergy: "Perfect memory of injustices fuels more focused vengeance"
        }
    },
    compatiblePairs: {
        "hive-naivara": {
            description: "Collective Memory - Shared consciousness meets memory manipulation",
            synergy: "Can share and edit memories across the collective network",
            bonus: "Enhanced memory abilities affect all connected creatures simultaneously"
        },
        "choir-ikris": {
            description: "Mad Justice - Cosmic truth reveals ultimate justice",
            synergy: "Visions reveal perfect knowledge of guilt and innocence",
            bonus: "Justice-based abilities guided by cosmic truth are always accurate"
        },
        "xevir-naivara": {
            description: "Longing Memories - Desire focused through memory manipulation",
            synergy: "Can make others remember or forget their deepest wants",
            bonus: "Enhanced emotional manipulation through memory alteration"
        }
    },
    multipleInfluences: {
        threeOrMore: {
            description: "Multiple divine influences create chaotic interference",
            effect: "Each day, roll 1d6. On 1-2, one random influence is suppressed. On 6, all influences are amplified (double effects but double costs)",
            threshold: "At 4+ influences, risk complete personality dissolution"
        }
    }
};

// Purification and Redemption System
const PURIFICATION_SYSTEM = {
    universalRituals: {
        blueMoonRitual: {
            name: "Blue Moon Ritual",
            description: "A powerful cleansing ritual that can be performed during the blue moon",
            requirements: [
                "Must be performed during an actual blue moon (rare astronomical event)",
                "Requires sacred water blessed by a good-aligned divine caster of 5th level or higher",
                "Must have at least 3 willing participants who care about the corrupted individual",
                "Corrupted individual must genuinely desire redemption"
            ],
            effects: {
                success: "Removes 1d4+1 mutation levels permanently, reduces Despair by 2d6",
                partialSuccess: "Removes 1 mutation level, reduces Despair by 1d6",
                failure: "Despair increases by 1d4 as the corruption resists cleansing"
            },
            ritual: {
                duration: "4 hours during the blue moon",
                savingThrow: "DC 15 Charisma save (with advantage if truly repentant)",
                cost: "All participants lose 1 Egregor point from the effort"
            }
        }
    },
    deitySpecificCleansing: {
        xevir: {
            name: "Ritual of Fulfilled Desire",
            description: "Requires the corrupted to fulfill a pure, selfless desire for another",
            requirements: [
                "Must sacrifice something deeply important to fulfill another's genuine need",
                "The sacrifice must bring no personal benefit",
                "Must be witnessed by someone who has been helped"
            ],
            effect: "Reduces Xevir corruption by 1 tier, but requires great personal cost"
        },
        ikris: {
            name: "Justice Fulfilled",
            description: "Requires making amends for past wrongs and preventing new injustices",
            requirements: [
                "Must confess and make restitution for past wrongs",
                "Must prevent a significant injustice without using violence",
                "Must forgive someone who has wronged you"
            ],
            effect: "Reduces Ikris corruption by 1 tier, grants temporary fire resistance"
        },
        naivara: {
            name: "Memory Restoration",
            description: "Requires recovering and sharing lost or forgotten truths",
            requirements: [
                "Must recover a lost memory important to someone else",
                "Must share a painful but important truth that has been hidden",
                "Must accept responsibility for forgotten mistakes"
            ],
            effect: "Reduces Naivara corruption by 1 tier, restores one lost personal memory"
        },
        hive: {
            name: "Individual Declaration",
            description: "Requires asserting individual identity against collective pressure",
            requirements: [
                "Must make a significant decision that goes against group consensus",
                "Must maintain individual identity for 7 consecutive days without collective influence",
                "Must help another assert their own individuality"
            ],
            effect: "Reduces Hive Father corruption by 1 tier, but severs some collective connections"
        },
        choir: {
            name: "Silence Seeking",
            description: "Requires finding peace with limited, mortal knowledge",
            requirements: [
                "Must spend 3 days in complete silence and isolation",
                "Must reject cosmic knowledge when offered",
                "Must accept that some truths are not meant for mortal minds"
            ],
            effect: "Reduces Choir corruption by 1 tier, grants resistance to madness effects"
        }
    },
    permanentMutations: {
        description: "Some mutations become permanent and cannot be cleansed",
        criteria: [
            "Avatar-level mutations (rolls 98-100) are usually permanent",
            "Mutations that have been active for more than a year",
            "Mutations that the character has used to deliberately harm innocents",
            "Any mutation the character chooses to embrace rather than resist"
        ],
        acceptance: "Characters can choose to accept mutations, gaining additional benefits but making them permanent"
    }
};

// Threshold-Based Automation Rules
const THRESHOLD_AUTOMATION = {
    despairMilestones: {
        5: {
            autoTriggers: ["Roll on Minor Corruption table", "Check for divine influence if none present"],
            warnings: "Dark forces begin to notice you",
            mechanicalEffects: "Animals become uneasy, holy symbols feel uncomfortable"
        },
        10: {
            autoTriggers: ["Roll for divine influence", "Roll on deity-specific mutation table", "Check bond inversion risk"],
            warnings: "Corruption manifests physically",
            mechanicalEffects: "Gain first divine mark, bonds risk inversion"
        },
        15: {
            autoTriggers: ["Major mutation roll", "Automatically invert one bond", "Check for mutation interactions"],
            warnings: "Soul significantly corrupted",
            mechanicalEffects: "Major physical changes, vulnerability to possession"
        },
        20: {
            autoTriggers: ["Avatar transformation roll", "All bonds invert", "Character becomes NPC"],
            warnings: "Complete corruption achieved",
            mechanicalEffects: "Character lost to corruption, becomes antagonist"
        }
    },
    egregorMilestones: {
        5: {
            benefits: ["Resistance to charm effects", "Detect corrupted creatures"],
            description: "Spiritual resonance achieved"
        },
        10: {
            benefits: ["Enhanced bond powers", "Advantage on fear saves", "Telepathic bond communication"],
            description: "Harmonized with positive forces"
        },
        15: {
            benefits: ["Aura of protection for allies", "Minor blessing abilities", "Radiate dim holy light"],
            description: "Become incarnate spirit"
        },
        20: {
            benefits: ["Immunity to fear and charm", "Greater restoration 1/day", "Inspire allies daily"],
            description: "Perfect spiritual harmony achieved"
        }
    }
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