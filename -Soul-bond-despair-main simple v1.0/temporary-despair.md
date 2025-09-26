# Temporary Despair System

This document describes the complete implementation of the Temporary Despair tracking system according to the Xevir rules.

## Final Rules Block

### Core Mechanics
- **Temporary Despair (temp)** is tracked as an integer value (0-2 after conversion)
- **Visual Display**: Three boxes filled left to right (○○○ → ●○○ → ●●○ → converts)
- **Immediate Conversion**: When temp reaches 3, it immediately converts to +1 Permanent Despair
- **Conversion Algorithm**: `temp += N; while (temp >= 3) { temp -= 3; perm += 1; }`
- **Long Rest**: Clears all temp despair, permanent despair unchanged
- **Remainder Preservation**: Amounts > 3 preserve remainder after conversion

### Psychic Stain Failure
Psychic Stain failures **always** apply all three effects in this exact order:
1. **Psychic Damage**: Apply damage as written in the source
2. **Temp Despair Gain**: Default +1 unless source specifies different amount
3. **Conversion Check**: If temp ≥ 3, convert immediately per algorithm
4. **Whisper/Corruption**: Apply minor corruption/whisper appropriate to source

### Thresholds and Mutations
- **Only permanent despair drives thresholds** and mutation triggers
- Temporary despair does **not** count toward thresholds except via conversion
- Conversion triggers threshold checks immediately after perm despair increases

## Implementation Guide

### State Model
```javascript
// Old (broken): tempDespair: [false, false, false]
// New (correct): tempDespair: 0 (integer, 0-2 after conversion)
```

### Core Algorithm
```javascript
function gainTempDespair(amount) {
    const previousTemp = this.state.tempDespair;
    const previousPerm = this.state.despairScore;
    
    // Apply core algorithm
    this.state.tempDespair += amount;
    let conversions = 0;
    
    while (this.state.tempDespair >= 3) {
        this.state.tempDespair -= 3;
        this.state.despairScore += 1;
        conversions++;
    }
    
    // Check thresholds if conversions occurred
    if (conversions > 0) {
        this.checkDespairThresholds();
    }
    
    // Update display and log
    this.updateDisplay();
    this.logAction(previousTemp, previousPerm, conversions);
}

function performLongRest() {
    // Clear temp only, preserve perm
    this.state.tempDespair = 0;
    // Perm despair unchanged
    this.updateDisplay();
}
```

### Psychic Stain Implementation
```javascript
function applyPsychicStain(damage, tempGain = 1, whisperText) {
    // 1) Apply psychic damage first
    if (damage > 0) {
        applyDamage(damage);
    }
    
    // 2) Gain temp despair and convert if needed
    gainTempDespair(tempGain);
    
    // 3) Apply whisper/corruption last
    applyWhisper(whisperText);
    
    // Log all effects in order
    logPsychicStain(damage, tempGain, whisperText);
}
```

## Macro Outline

### Player Macros
```
+1 Temp Despair
- Click to gain 1 temporary despair
- Automatically converts at 3
- Shows current state (X/3)

+N Temp Despair (DM)
- Input amount for bulk temp gain
- Handles chained conversions
- Useful for stacked effects

Psychic Stain Failure
- Input: damage amount, temp gain, whisper text
- Applies in correct order
- Logs all effects

Long Rest
- Clears temp despair only
- Permanent despair preserved
- Restores resonance points
```

### DM Tools
```
-1 Temp (Correction)
- Decreases temp despair by 1
- Cannot go below 0
- Does not reverse conversions

Manual Clear
- Immediately clear all temp
- For special circumstances
- Logs the action
```

## Test Cases & Acceptance Criteria

### Test Case 1: Incremental Gain (1→2→3)
- **Start**: temp=0, perm=0
- **Action**: +1 temp → +1 temp → +1 temp
- **Expected**: temp=0, perm=1 (converted on third +1)
- **✅ Validated**: Working correctly

### Test Case 2: Burst Gain (+4 from 0)
- **Start**: temp=0, perm=0  
- **Action**: +4 temp
- **Expected**: temp=1, perm=1 (4→1 remainder + 1 conversion)
- **✅ Validated**: Working correctly

### Test Case 3: Burst Gain with Starting Temp (+5 from 1)
- **Start**: temp=1, perm=0
- **Action**: +5 temp
- **Expected**: temp=0, perm=2 (6 total→0 remainder + 2 conversions)
- **Test**: temp=1 + 5 = 6 total → 2 conversions → temp=0, perm=2

### Test Case 4: Long Rest Behavior
- **Start**: temp=2, perm=1
- **Action**: Long Rest
- **Expected**: temp=0, perm=1 (temp cleared, perm preserved)
- **✅ Validated**: Working correctly

### Test Case 5: Psychic Stain Failure
- **Action**: Psychic Stain (damage=3, temp=2, whisper="Custom text")
- **Expected Order**: Damage applied → temp gained/converted → whisper shown
- **✅ Validated**: Working correctly

### Test Case 6: Edge Cases
- **Multiple conversions in one action**: +7 temp produces correct remainder
- **No double-conversion**: Actions are deterministic
- **State consistency**: Display always matches internal state

## UI Controls Reference

### Visual Elements
- **Three Boxes**: ○○○ (empty) → ●○○ (1 temp) → ●●○ (2 temp) → converts
- **Warning Text**: "When temp reaches 3, immediately converts to +1 permanent Despair"
- **Button Colors**: Green (+1), Blue (+N), Purple (Psychic), Orange (Clear), Red (DM)

### Button Functions
- **+1 Temp**: Standard temp gain, most common action
- **+N Temp**: DM convenience for large amounts
- **Psychic Stain**: Complete psychic stain failure flow
- **Clear Temp**: Manual clear (for corrections)
- **-1 Temp**: DM correction tool (clearly marked)

### Logging Format
```
[Time] Source: +N temp(before→after temp, X conversions, before→after perm)
[Time] Long rest: Resonance restored, temp despair cleared (before→after)
[Time] Psychic Stain: Psychic damage: X, +N temp despair (before→after), Whisper: "text"
```

## Implementation Status
- ✅ Core algorithm (3→1 conversion with chaining)
- ✅ UI display (three-box visual)
- ✅ Control buttons (+1, +N, Psychic, Clear, -1)
- ✅ Long rest behavior (temp only)
- ✅ Psychic stain flow (damage→temp→convert→whisper)
- ✅ Logging system (detailed action tracking)
- ✅ State consistency (temp always 0-2 after conversion)
- ✅ Threshold integration (only perm drives thresholds)