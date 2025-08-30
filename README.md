# Soul's Harmony Tracker - Final Calibration

Interactive web-based character tracker for D&D 5e Soul's Harmony homebrew system. This is the **final calibrated version** featuring dual-progression mechanics (Egregor vs Despair), divine corruption tracking, Player/DM view toggle, and comprehensive character management.

## Core Features

### Player/DM View Toggle
- **Player View**: Shows essential character information and player-accessible actions
- **DM View**: Reveals DM tools, divine influence controls, mutation systems, and advanced features
- Toggle in the top-right corner of the interface

### Character Management
- **Manual Save/Load**: No automatic saving on startup - players start with a fresh sheet
- **Export/Import**: JSON-based character file exchange
- **Reset Character**: Complete character reset with confirmation dialog

## Core Mechanics

### Egregor Score (0-20)
Represents spiritual harmony and positive growth with thresholds at:
- **5 (Resonant)**: Resistance to charm effects
- **10 (Harmonized)**: Enhanced bond powers
- **15 (Incarnate)**: Radiate holy light
- **20 (Nexus)**: Perfect spiritual harmony

### Despair Score (0-20)
Represents corruption and negative influences that attract divine entities.

### Resonance Points (0-10)
Temporary resource pool that restores to 10 on Long Rest. Used for:
- **Resist Action**: Spend 3 Resonance to reduce Temporary Despair by 1
- **Ability Enhancement**: Various costs for different abilities
- **Bond Powers**: Activating anchored bond abilities

### Temporary Despair System
- **Accumulation**: Temp Despair accumulates during play without automatic conversion
- **Resist**: Spend 3 Resonance Points to reduce Temp Despair by 1 (player agency)
- **Long Rest**: Converts Temp to Permanent by multiples of 3, clears remaining Temp to 0
- **Player Control**: Players manage despair buildup through strategic resource use

### Anchored Bonds (0-3)
Spiritual connections that can be inverted when Despair exceeds Egregor.

## Gameplay Flow

### During Play
1. **Temporary Despair** accumulates from various sources
2. **Players choose** when to use Resist action (3 Resonance → -1 Temp Despair)
3. **Resource management** becomes crucial for survival

### Long Rest Process
1. **Resonance restored** to 10
2. **Temp Despair conversion**: floor(temp/3) becomes permanent despair
3. **Temp Despair cleared** to 0
4. **Fresh start** for the next day

### DM Tools
- **Divine Influence**: Track and set active divine corruption
- **Psychic Stain**: Apply temporary despair effects
- **Mutation System**: Track divine marks and mutations
- **Dice Rolling**: d100 rolls for divine influence
- **History Logging**: Complete action and roll history

## Technical Features

### No Auto-Loading
- Application starts with a fresh character sheet
- Players must manually load saved characters
- Prevents accidental overwrites and ensures intentional character loading

### Manual Persistence
- **Save Button**: Manually save character state to browser storage
- **Load Button**: Manually load previously saved character
- **Export**: Download character as JSON file
- **Import**: Upload and load character from JSON file

### View Management
- **Player View**: Essential tracking and player actions only
- **DM View**: Complete feature set including mutation tracking, divine influence, and DM tools
- **Responsive Toggle**: Instant switching between views

## Interface Elements

### Progress Bars
- Visual representation of Egregor and Despair scores
- Clear milestone indicators at key thresholds
- Instant visual feedback for score changes

### Resonance Pool
- Visual circles representing available Resonance Points
- Clear indication of spent vs available resources
- Instant updates on expenditure

### Temporary Despair Tracking
- Visual boxes showing current Temporary Despair level
- Support for high accumulation (up to 15 boxes)
- Clear visual feedback for resist actions

### History System
- Comprehensive logging of all actions and rolls
- Timestamped entries for session tracking
- Clearable history for new sessions

## Installation & Usage

1. **Open index.html** in any modern web browser
2. **No server required** - runs entirely client-side
3. **Enter character name** and begin tracking
4. **Use view toggle** to switch between Player and DM views
5. **Save progress** manually using the Save button

## File Structure

- `index.html` - Main interface with Player/DM view toggle
- `script.js` - Core tracking logic and mechanics
- `styles.css` - Visual styling and responsive design
- `print.css` - Print-optimized layout
- `data.js` - Game data, mutations, and reference tables

## Version History

**v2.0 - Final Calibration**
- Added Player/DM view toggle
- Implemented manual save/load system (no auto-loading)
- Corrected Long Rest mechanics (Temp→Permanent by multiples of 3)
- Fixed Resist action (3 Resonance → -1 Temp)
- Added comprehensive character reset functionality
- Enhanced UI feedback and history tracking
