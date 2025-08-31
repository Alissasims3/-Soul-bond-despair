// Soul's Harmony Tracker - v2.0 Calibrated Script

class SoulsHarmonyTracker {
    constructor() {
        this.state = this.getDefaultState();
        this.initialize();
    }

    getDefaultState() {
        return {
            characterName: '',
            egregorScore: 0,
            resonancePoints: 0,
            despairScore: 0,
            tempDespair: 0,
            bonds: [null, null, null],
            bondStates: ['empty', 'empty', 'empty'],
            divineInfluence: null,
            memoryFragments: 0,
            mutations: [],
            rollHistory: [],
            deityMutations: { xevir: [], ikris: [], naivara: [], hive: [], choir: [] },
            visionTokens: 0,
            visionHistory: [],
            activeInfluences: [],
            mutationInteractions: [],
            lastDespairThreshold: 0
        };
    }

    initialize() {
        this.generateProgressBars();
        this.generateResonancePool();
        this.generateTempDespairBoxes();
        this.generateBondSlots();
        this.generateDeityMutationSections();
        this.setupEventListeners();
        // DO NOT auto-load. Start with a fresh sheet.
        this.updateDisplay();
    }

    setupEventListeners() {
        // View Toggle
        document.getElementById('viewToggleSwitch').addEventListener('change', (e) => {
            document.body.classList.toggle('dm-view', e.target.checked);
            document.getElementById('viewToggleLabel').textContent = e.target.checked ? 'DM View' : 'Player View';
        });

        // Character Name
        document.getElementById('characterName').addEventListener('input', (e) => this.state.characterName = e.target.value);

        // Core Buttons
        document.getElementById('longRestBtn').addEventListener('click', () => this.performLongRest());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCharacter());
        document.getElementById('gainTempBtn').addEventListener('click', () => this.gainTempDespair(1));
        document.getElementById('resistBtn').addEventListener('click', () => this.resistDespair());

        // Save/Load
        document.getElementById('saveBtn').addEventListener('click', () => this.saveState());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadState());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportCharacter());
        document.getElementById('importBtn').addEventListener('change', (e) => this.importCharacter(e.target.files[0]));
        
        // DM Tools
        document.getElementById('psychicStainBtn').addEventListener('click', () => this.applyPsychicStain());
        document.getElementById('rollD100Btn').addEventListener('click', () => this.rollDice('d100'));
        document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearRollHistory());

         // Divine influence buttons
        document.querySelectorAll('.influence-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDivineInfluence(e.target.dataset.deity);
            });
        });
    }

    // --- CORE MECHANICS ---

    gainTempDespair(amount = 1) {
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
        this.logAction(previousTemp, previousPerm, conversions, amount);
    }

    checkDespairThresholds() {
        const currentDespair = this.state.despairScore;
        const lastThreshold = this.state.lastDespairThreshold || 0;
        
        // Check if we've crossed any thresholds
        const thresholds = [5, 10, 15, 20];
        for (const threshold of thresholds) {
            if (currentDespair >= threshold && lastThreshold < threshold) {
                this.triggerDespairThreshold(threshold);
                this.state.lastDespairThreshold = threshold;
            }
        }
    }

    triggerDespairThreshold(threshold) {
        const thresholdData = window.GAME_DATA.THRESHOLD_AUTOMATION?.despairMilestones?.[threshold];
        if (thresholdData) {
            let message = `Despair Threshold ${threshold} reached: ${thresholdData.warnings}`;
            if (thresholdData.autoTriggers) {
                message += ` | Auto-triggers: ${thresholdData.autoTriggers.join(', ')}`;
            }
            this.addToHistory(message);
            this.showNotification(`Despair Threshold ${threshold} reached!`, 'error');
            
            // Auto-trigger mutation roll if at mutation thresholds
            if (threshold >= 10 && this.state.divineInfluence) {
                this.rollMutationForDeity(this.state.divineInfluence);
            }
        }
    }

    rollMutationForDeity(deityKey) {
        const deity = window.GAME_DATA.DIVINE_ENTITIES?.[deityKey];
        if (deity?.mutationTable) {
            const roll = Math.floor(Math.random() * 100) + 1;
            const mutations = deity.mutationTable.mutations || [];
            
            // Find mutation that matches roll
            const mutation = mutations.find(m => 
                Array.isArray(m.roll) ? roll >= m.roll[0] && roll <= m.roll[1] : roll === m.roll
            );
            
            if (mutation) {
                this.addToHistory(`Mutation Roll (d100=${roll}): ${mutation.name} - ${mutation.effect}`);
                this.showNotification(`New Mutation: ${mutation.name}`, 'error');
            } else {
                this.addToHistory(`Mutation Roll (d100=${roll}): No mutation triggered`);
            }
        }
    }

    logAction(previousTemp, previousPerm, conversions, amount) {
        let message = `Gained ${amount} Temporary Despair`;
        if (conversions > 0) {
            message += ` → ${conversions} conversion(s) to Permanent Despair`;
            message += ` (${previousTemp}→${this.state.tempDespair} temp, ${previousPerm}→${this.state.despairScore} perm)`;
        } else {
            message += ` (${previousTemp}→${this.state.tempDespair} temp)`;
        }
        this.addToHistory(message);
    }

    resistDespair() {
        if (this.state.resonancePoints < 3) {
            alert('Not enough Resonance to resist! (Requires 3)');
            return;
        }
        if (this.state.tempDespair <= 0) {
            alert('No temporary despair to resist.');
            return;
        }

        this.state.resonancePoints -= 3;
        this.state.tempDespair -= 1;
        this.addToHistory(`Resist: Spent 3 Resonance to reduce 1 Temporary Despair.`);
        this.updateDisplay();
    }

    performLongRest() {
        // Clear temp despair only (Advanced tracker: immediate conversion rule)
        const clearedTemp = this.state.tempDespair;
        this.state.tempDespair = 0;
        this.state.resonancePoints = 10;
        
        this.addToHistory(`Long Rest: ${clearedTemp} Temporary Despair cleared. Resonance restored to 10.`);
        this.updateDisplay();
    }

    resetCharacter() {
        if (confirm('Reset character to default state? This cannot be undone.')) {
            // Replace state with default state
            this.state = this.getDefaultState();
            
            // Remove local storage entry
            localStorage.removeItem(window.GAME_DATA.AUTO_SAVE_CONFIG.storageKey);
            
            // Clear UI selections
            document.getElementById('characterName').value = '';
            
            // Clear influence selection highlight (if exists)
            const influenceElements = document.querySelectorAll('.divine-influence-option.selected');
            influenceElements.forEach(el => el.classList.remove('selected'));
            
            // Clear memory boxes (if exists)
            const memoryBoxes = document.querySelectorAll('.memory-box.filled');
            memoryBoxes.forEach(box => box.classList.remove('filled'));
            
            // Clear per-deity mutation lists and counts (if exists)
            const deityMutationLists = document.querySelectorAll('.deity-mutations-list');
            deityMutationLists.forEach(list => list.innerHTML = '');
            
            const mutationCounts = document.querySelectorAll('.mutation-count');
            mutationCounts.forEach(count => count.textContent = '0');
            
            // Clear roll history area
            const rollHistoryArea = document.getElementById('rollHistory');
            if (rollHistoryArea) {
                rollHistoryArea.innerHTML = '';
            }
            
            // Clear vision tokens/history (if exists)
            const visionTokensDisplay = document.getElementById('visionTokensDisplay');
            if (visionTokensDisplay) {
                visionTokensDisplay.textContent = '0';
            }
            
            const visionHistoryArea = document.getElementById('visionHistory');
            if (visionHistoryArea) {
                visionHistoryArea.innerHTML = '';
            }
            
            // Call required update methods
            this.updateDisplay();
            this.updateMutationsTable();
            this.updateRollHistory();
            this.checkMutationInteractions();
            this.updatePurificationOptions();
            
            // Log and show notification
            this.addToHistory('Character reset to default state.');
            this.showNotification('Character reset to default state successfully!', 'info');
        }
    }

    // --- UTILITY FUNCTIONS ---

    addToHistory(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.rollHistory.unshift(`[${timestamp}] ${message}`);
        if (this.state.rollHistory.length > 50) {
            this.state.rollHistory.pop();
        }
        this.updateRollHistory();
    }

    updateRollHistory() {
        const historyContainer = document.getElementById('rollHistory');
        if (historyContainer) {
            historyContainer.innerHTML = this.state.rollHistory
                .map(entry => `<div class="history-entry">${entry}</div>`)
                .join('');
        }
    }

    clearRollHistory() {
        this.state.rollHistory = [];
        this.updateRollHistory();
    }

    // --- DISPLAY UPDATES ---

    updateDisplay() {
        // Update score displays
        document.getElementById('egregorDisplay').textContent = this.state.egregorScore;
        document.getElementById('despairDisplay').textContent = this.state.despairScore;
        document.getElementById('resonanceDisplay').textContent = this.state.resonancePoints;
        document.getElementById('bondsCount').textContent = this.state.bonds.filter(b => b !== null).length;

        // Update progress bars
        this.updateProgressBars();
        this.updateResonanceDisplay();
        this.updateTempDespairDisplay();
        this.updateThresholdStatus();
    }

    updateProgressBars() {
        // Update Egregor bar
        const egregorBoxes = document.querySelectorAll('#egregorBar .progress-box');
        egregorBoxes.forEach((box, index) => {
            box.classList.toggle('filled', index < this.state.egregorScore);
        });

        // Update Despair bar
        const despairBoxes = document.querySelectorAll('#despairBar .progress-box');
        despairBoxes.forEach((box, index) => {
            box.classList.toggle('filled', index < this.state.despairScore);
        });
    }

    updateResonanceDisplay() {
        const resonanceCircles = document.querySelectorAll('#resonancePool .resonance-circle');
        resonanceCircles.forEach((circle, index) => {
            circle.classList.toggle('filled', index < this.state.resonancePoints);
        });
    }

    updateTempDespairDisplay() {
        const tempBoxes = document.querySelectorAll('#tempDespairBoxes .temp-box');
        tempBoxes.forEach((box, index) => {
            box.classList.toggle('filled', index < this.state.tempDespair);
        });
    }

    updateThresholdStatus() {
        const egregorStatus = document.getElementById('egregorThreshold');
        if (egregorStatus) {
            if (this.state.egregorScore >= 20) egregorStatus.textContent = 'Nexus (20) - Perfect spiritual harmony';
            else if (this.state.egregorScore >= 15) egregorStatus.textContent = 'Incarnate (15) - Radiate holy light';
            else if (this.state.egregorScore >= 10) egregorStatus.textContent = 'Harmonized (10) - Enhanced bond powers';
            else if (this.state.egregorScore >= 5) egregorStatus.textContent = 'Resonant (5) - Resistance to charm';
            else egregorStatus.textContent = 'No threshold reached';
        }
    }

    // --- GENERATION FUNCTIONS ---

    generateProgressBars() {
        // Generate Egregor progress bar
        const egregorBar = document.getElementById('egregorBar');
        if (egregorBar) {
            egregorBar.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const box = document.createElement('div');
                box.className = 'progress-box';
                box.dataset.index = i;
                egregorBar.appendChild(box);
            }
        }

        // Generate Despair progress bar
        const despairBar = document.getElementById('despairBar');
        if (despairBar) {
            despairBar.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                const box = document.createElement('div');
                box.className = 'progress-box';
                box.dataset.index = i;
                despairBar.appendChild(box);
            }
        }
    }

    generateResonancePool() {
        const resonancePool = document.getElementById('resonancePool');
        if (resonancePool) {
            resonancePool.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const circle = document.createElement('div');
                circle.className = 'resonance-circle';
                circle.dataset.index = i;
                resonancePool.appendChild(circle);
            }
        }
    }

    generateTempDespairBoxes() {
        const tempContainer = document.getElementById('tempDespairBoxes');
        if (tempContainer) {
            tempContainer.innerHTML = '';
            for (let i = 0; i < 15; i++) {
                const box = document.createElement('div');
                box.className = 'temp-box';
                box.dataset.index = i;
                tempContainer.appendChild(box);
            }
        }
    }

    generateBondSlots() {
        const bondsContainer = document.querySelector('.bonds-container');
        if (bondsContainer) {
            bondsContainer.innerHTML = '<p>Bond tracking system placeholder</p>';
        }
    }

    generateDeityMutationSections() {
        const mutationsContainer = document.querySelector('.deity-mutations-container');
        if (mutationsContainer) {
            mutationsContainer.innerHTML = '<p>Divine mutations system placeholder</p>';
        }
    }

    // --- DIVINE INFLUENCE ---

    setDivineInfluence(deity) {
        this.state.divineInfluence = deity;
        const currentInfluence = document.getElementById('currentInfluence');
        if (currentInfluence) {
            const deityNames = {
                xevir: 'Xevir (Blood)',
                ikris: 'Ikris (Fire)',
                naivara: 'Naivara (Mist)', 
                hive: 'Hive (Crown)',
                choir: 'Choir (Mind)'
            };
            currentInfluence.textContent = deityNames[deity] || 'No influence selected';
        }
        this.addToHistory(`Divine influence set to ${deity}`);
    }

    // --- MUTATION AND INTERACTION METHODS ---

    updateMutationsTable() {
        // Update mutations display - stub method for compatibility
        // Implementation would update any mutations table UI elements
        console.log('updateMutationsTable called');
    }

    checkMutationInteractions() {
        // Check for mutation interactions - stub method for compatibility
        // Implementation would analyze current mutations for conflicts/synergies
        console.log('checkMutationInteractions called');
    }

    updatePurificationOptions() {
        // Update purification options display - stub method for compatibility
        // Implementation would refresh available purification rituals
        console.log('updatePurificationOptions called');
    }

    // --- DM TOOLS ---

    applyPsychicStain() {
        this.gainTempDespair(1);
        this.addToHistory('Psychic Stain applied: +1 Temporary Despair');
    }

    rollDice(type) {
        let result = 0;
        if (type === 'd100') {
            result = Math.floor(Math.random() * 100) + 1;
            const resultDiv = document.getElementById('d100Result');
            if (resultDiv) {
                resultDiv.textContent = `Result: ${result}`;
            }
        }
        this.addToHistory(`Rolled ${type}: ${result}`);
        return result;
    }

    // --- SAVE/LOAD ---

    saveState() {
        try {
            localStorage.setItem(window.GAME_DATA.AUTO_SAVE_CONFIG.storageKey, JSON.stringify(this.state));
            this.showNotification('Character saved successfully!');
        } catch (error) {
            this.showNotification('Error saving character: ' + error.message, 'error');
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem(window.GAME_DATA.AUTO_SAVE_CONFIG.storageKey);
            if (saved) {
                const savedState = JSON.parse(saved);
                this.state = { ...this.getDefaultState(), ...savedState };
                document.getElementById('characterName').value = this.state.characterName || '';
                this.updateDisplay();
                this.showNotification('Character loaded successfully!');
            } else {
                this.showNotification('No saved character found.');
            }
        } catch (error) {
            this.showNotification('Error loading character: ' + error.message, 'error');
        }
    }

    exportCharacter() {
        const exportData = {
            version: '2.0',
            exported: new Date().toISOString(),
            character: this.state
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.state.characterName || 'character'}_souls_harmony.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Character exported successfully!');
    }

    importCharacter(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                if (importData.character) {
                    this.state = { ...this.getDefaultState(), ...importData.character };
                    document.getElementById('characterName').value = this.state.characterName || '';
                    this.updateDisplay();
                    this.showNotification('Character imported successfully!');
                } else {
                    this.showNotification('Invalid character file format.', 'error');
                }
            } catch (error) {
                this.showNotification('Error importing character: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    // --- NOTIFICATIONS ---

    showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.tracker = new SoulsHarmonyTracker();
});