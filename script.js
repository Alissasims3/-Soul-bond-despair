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
            mutations: [],
            rollHistory: [],
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
        this.state.tempDespair += amount;
        this.addToHistory(`Gained ${amount} Temporary Despair.`);
        this.updateDisplay();
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
        const conversions = Math.floor(this.state.tempDespair / 3);
        this.state.despairScore += conversions;
        this.state.tempDespair = 0;
        this.state.resonancePoints = 10;
        
        this.addToHistory(`Long Rest: ${conversions} Temp converted to Permanent. Resonance restored to 10.`);
        this.updateDisplay();
    }

    resetCharacter() {
        if (confirm('Reset character to default state? This cannot be undone.')) {
            this.state = this.getDefaultState();
            document.getElementById('characterName').value = '';
            this.addToHistory('Character reset to default state.');
            this.updateDisplay();
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
            localStorage.setItem('soulsHarmonyTracker', JSON.stringify(this.state));
            this.showNotification('Character saved successfully!');
        } catch (error) {
            this.showNotification('Error saving character: ' + error.message, 'error');
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem('soulsHarmonyTracker');
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