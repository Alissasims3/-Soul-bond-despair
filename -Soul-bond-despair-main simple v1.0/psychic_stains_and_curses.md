# Psychic Stains and Curses

This document describes the interaction between psychic stains, temporary despair, and corruption effects in the Soul's Harmony system.

## Psychic Stain Mechanics

### Core Rule: Failure Applies All Three
When a **Psychic Stain** check **fails**, it **always** applies all three effects in strict order:

1. **Psychic Damage** (as written in the source)
2. **Temporary Despair Gain** (default +1 unless source specifies)  
3. **Whisper/Corruption** (minor corruption appropriate to the source)

**Important**: This is not optional - failure means all three effects occur.

### Success vs Failure

#### Success (Save Made)
- **Reduced or no psychic damage** (as specified by source)
- **No temporary despair gain**
- **No whisper or corruption effect**
- Follow the specific success conditions of the source

#### Failure (Save Failed)  
- **Full psychic damage** (as written)
- **Temporary despair gain** (+1 default, or amount specified by source)
- **Immediate conversion check** (if temp reaches 3, converts to permanent)
- **Whisper/corruption applied** (appropriate to the entity/source)

## Temporary Despair Integration

### Conversion Rules
- **3 Temporary → 1 Permanent**: When temp despair reaches 3, immediately convert
- **Chained Conversions**: Large temp gains can trigger multiple conversions
- **Algorithm**: `temp += N; while (temp >= 3) { temp -= 3; perm += 1; }`
- **Remainder Preserved**: Amounts > 3 preserve remainder after conversion

### Examples

#### Psychic Stain with Conversion
```
Character has 2 temp despair
Psychic Stain failure:
1. Take 4 psychic damage
2. Gain +2 temp despair (2 + 2 = 4 total)
3. Automatic conversion: 4 temp → 1 conversion → 1 temp remains  
4. Whisper: "The void whispers your name..."
Result: 1 temp despair, +1 permanent despair
```

#### Multiple Conversions
```
Character has 1 temp despair  
Massive psychic event (+8 temp):
1. Apply damage
2. Gain +8 temp (1 + 8 = 9 total)
3. Convert: 9 temp → 3 conversions → 0 temp remains
4. Apply corruption effects
Result: 0 temp despair, +3 permanent despair
```

## Source-Specific Behaviors

### Divine Entity Stains

#### Xevir (Longing)
- **Damage**: Emotional/psychic pain from unfulfilled desires
- **Temp Gain**: +1 (standard)
- **Whisper**: Related to longing, desire, or heartbreak
- **Example**: "You feel the ache of every unfulfilled dream..."

#### Ikris (Vengeance)  
- **Damage**: Burning psychic pain from injustice
- **Temp Gain**: +1 (standard), +2 for major betrayals
- **Whisper**: Related to justice, retribution, or rage
- **Example**: "The fire of righteous anger burns within you..."

#### Naivara (Memory)
- **Damage**: Disorienting psychic confusion
- **Temp Gain**: +1 (standard)
- **Whisper**: Memory-related confusion or false recollections
- **Example**: "Your memories shift and blur like smoke..."

#### Hive Father (Unity)
- **Damage**: Isolating psychic pain from separation
- **Temp Gain**: +1 (standard)
- **Whisper**: Related to loneliness, connection, or collective consciousness
- **Example**: "You feel utterly alone in a vast, uncaring universe..."

#### Crawling Choir (Madness)
- **Damage**: Reality-bending psychic trauma
- **Temp Gain**: +1 to +3 depending on severity
- **Whisper**: Cosmic truths, forbidden knowledge, or reality distortions
- **Example**: "You glimpse the truth behind reality's facade..."

## Implementation Guidelines

### For DMs
1. **Always apply all three effects on failure** - no picking and choosing
2. **Use appropriate whispers** that match the source entity
3. **Consider temp gain modifiers** for especially severe stains
4. **Remember conversion is automatic** - no separate check needed

### For Players
1. **Track temp despair carefully** - it builds up quickly
2. **Long rests clear temp** but not permanent despair
3. **Conversions are immediate** - no delaying or preventing them
4. **Thresholds use permanent only** - temp doesn't count except via conversion

### For System Implementation
```javascript
function applyPsychicStain(source, damageAmount, tempGain = 1, whisperText) {
    // Order is critical - must be exactly as specified
    
    // 1. Apply psychic damage first
    if (damageAmount > 0) {
        this.applyDamage(damageAmount, 'psychic');
        this.showNotification(`You take ${damageAmount} psychic damage!`, 'error');
    }
    
    // 2. Gain temporary despair and handle conversion
    const previousTemp = this.state.tempDespair;
    const previousPerm = this.state.despairScore;
    
    this.state.tempDespair += tempGain;
    let conversions = 0;
    
    while (this.state.tempDespair >= 3) {
        this.state.tempDespair -= 3;
        this.state.despairScore += 1;
        conversions++;
    }
    
    if (conversions > 0) {
        this.checkDespairThresholds();
    }
    
    // 3. Apply whisper/corruption last
    this.showNotification(`Psychic Stain applied! ${whisperText}`, 'choir');
    
    // Log all effects in order
    const logEntries = [];
    if (damageAmount > 0) logEntries.push(`Psychic damage: ${damageAmount}`);
    logEntries.push(`+${tempGain} temp despair (${previousTemp}→${this.state.tempDespair})`);
    if (conversions > 0) logEntries.push(`${conversions} conversion${conversions > 1 ? 's' : ''} (${previousPerm}→${this.state.despairScore} perm)`);
    logEntries.push(`Whisper: "${whisperText}"`);
    
    this.addToHistory(`Psychic Stain: ${logEntries.join(', ')}`);
    this.updateDisplay();
}
```

## Interaction with Other Systems

### Bond Inversions
- **Psychic stains can trigger bond inversions** if despair thresholds are crossed
- **Inverted bonds may modify stain resistance** or amplify effects
- **Some bonds provide protection** against specific entity types

### Resonance Spending
- **Resist ability** can reroll failed saves against psychic stains
- **Cost varies** based on source and severity
- **Success negates all three effects** - partial resistance not available

### Mutation Triggers
- **Only permanent despair triggers mutations** - temp despair does not count
- **Conversions from stains can immediately trigger** threshold effects
- **Multiple conversions** from one stain can cascade threshold effects

## Balancing Notes

### For DMs
- **Psychic stains are serious** - they always have consequences on failure
- **Use sparingly** for dramatic moments or major supernatural encounters  
- **Consider the cumulative effect** - temp despair builds up across encounters
- **Long rests provide relief** - allow characters to recover between major events

### Design Intent
- **Psychological horror** - the mind is vulnerable and degradation is cumulative
- **Meaningful choices** - spending resonance to resist becomes critical
- **Escalating tension** - temp builds toward inevitable conversion
- **Entity personality** - different sources create different experiences

## Common Mistakes to Avoid

1. **❌ Applying only damage or whisper** - must be all three on failure
2. **❌ Delaying conversions** - they happen immediately when temp ≥ 3  
3. **❌ Using temp for thresholds** - only permanent despair counts
4. **❌ Inconsistent whispers** - match the entity's nature and influence
5. **❌ Forgetting long rest relief** - temp despair should clear on rest

## Quick Reference

### Failure Checklist
- [ ] Apply psychic damage (as written)
- [ ] Gain temporary despair (+1 default)  
- [ ] Check for immediate conversion (temp ≥ 3)
- [ ] Apply whisper/corruption (entity-appropriate)
- [ ] Log all effects in order
- [ ] Update displays

### Conversion Reminder
```
temp += amount
while (temp >= 3):
    temp -= 3
    perm += 1
    check_thresholds()
```

This system ensures psychic stains remain a serious and consistent threat while providing clear, predictable mechanics for both players and DMs.