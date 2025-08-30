# Soul's Harmony Tracker

Interactive web-based character tracker for D&D 5e Soul's Harmony homebrew system. Features dual-progression mechanics (Egregor vs Despair), divine corruption tracking, Crawling Choir madness integration, and automated dice rolling. Built for live gameplay sessions.

## Key Mechanics

### Temporary Despair System
- **Accumulation**: Temp Despair accumulates during play without automatic conversion
- **Resist**: Spend 3 Resonance Points to reduce Temp Despair by 1 (player agency)
- **Long Rest**: The only time Temp converts to Permanent (floor(temp/3) conversions), then temp clears to 0
- **Player Agency**: Players can now resist despair buildup rather than face immediate consequences

### Gameplay Flow
1. **During the Day**: Temp Despair accumulates from various sources
2. **Player Choice**: Use Resist action (3 Resonance → -1 Temp) for risk management
3. **Long Rest**: DM triggers conversion of accumulated Temp to Permanent, then clears remainder
4. **Fresh Start**: Each day begins with 0 Temp Despair

### Reset Character
- Instant character reset to default values for fresh starts
- Includes confirmation dialog to prevent accidental resets
