// Soul's Harmony Tracker - Main JavaScript
// Interactive functionality for the D&D 5e homebrew tracking system

class SoulsHarmonyTracker {
    constructor() {
        this.state = {
            characterName: '',
            egregorScore: 0,
            resonancePoints: 0,
            despairScore: 0,
            tempDespair: [false, false, false],
            bonds: [null, null, null],
            bondStates: ['empty', 'empty', 'empty'], // 'empty', 'active', 'inverted', 'strained'
            divineInfluence: null,
            memoryFragments: 0,
            mutations: [],
            rollHistory: [],
            // Enhanced mutation tracking
            deityMutations: {
                xevir: [],
                ikris: [],
                naivara: [],
                hive: [],
                choir: []
            },
            visionTokens: 0,
            visionHistory: [],
            activeInfluences: [], // Track multiple divine influences
            mutationInteractions: [],
            lastDespairThreshold: 0 // Track for auto-rolling
        };
        
        this.initialize();
    }
    
    initialize() {
        this.setupEventListeners();
        this.generateProgressBars();
        this.generateResonancePool();
        this.generateMemoryBoxes();
        this.loadState();
        this.updateDisplay();
        this.startAutoSave();
    }
    
    setupEventListeners() {
        // Character name
        document.getElementById('characterName').addEventListener('input', (e) => {
            this.state.characterName = e.target.value;
            this.saveState();
        });
        
        // Long rest button
        document.getElementById('longRestBtn').addEventListener('click', () => {
            this.performLongRest();
        });
        
        // Save/Load buttons
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveState();
            this.showNotification('Character saved successfully!');
        });
        
        document.getElementById('loadBtn').addEventListener('click', () => {
            this.loadState();
            this.showNotification('Character loaded successfully!');
        });
        
        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportCharacter();
        });
        
        document.getElementById('importBtn').addEventListener('change', (e) => {
            this.importCharacter(e.target.files[0]);
        });
        
        // Resonance spending buttons
        document.querySelectorAll('.resonance-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cost = parseInt(e.target.dataset.cost);
                const action = e.target.dataset.action;
                this.spendResonance(cost, action);
            });
        });
        
        // Bond selection
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`bond${i}`).addEventListener('change', (e) => {
                this.updateBond(i - 1, e.target.value);
            });
            
            document.getElementById(`invertBtn${i}`).addEventListener('click', () => {
                this.invertBond(i - 1);
            });
        }
        
        // Divine influence buttons
        document.querySelectorAll('.influence-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDivineInfluence(e.target.dataset.deity);
            });
        });
        
        // Temporary despair clear
        document.getElementById('clearTempBtn').addEventListener('click', () => {
            this.clearTempDespair();
        });
        
        // Crawling Choir effects
        document.querySelectorAll('.choir-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.triggerChoirEffect(e.target.dataset.effect);
            });
        });
        
        // Dice rolling
        document.getElementById('rollD10Btn').addEventListener('click', () => {
            this.rollDice('d10');
        });
        
        document.getElementById('rollD100Btn').addEventListener('click', () => {
            this.rollDice('d100');
        });
        
        document.getElementById('rollChoirBtn').addEventListener('click', () => {
            this.rollDice('choir');
        });
        
        // Clear roll history
        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            this.clearRollHistory();
        });
        
        // Add mutation button
        document.getElementById('addMutationBtn').addEventListener('click', () => {
            this.showMutationModal();
        });
        
        // Help toggle
        document.getElementById('helpToggle').addEventListener('click', () => {
            this.toggleHelp();
        });
        
        // Enhanced mutation system event listeners
        document.querySelectorAll('.roll-mutation-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const deity = e.target.dataset.deity;
                this.rollDeityMutation(deity);
            });
        });
        
        // Vision system buttons
        document.querySelectorAll('.vision-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.rollVision(category);
            });
        });
        
        // Modal handling
        this.setupModalHandlers();
        this.setupEnhancedMutationSystem();
    }
    
    generateProgressBars() {
        // Egregor progress bar
        const egregorBar = document.getElementById('egregorBar');
        egregorBar.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            const box = document.createElement('div');
            box.className = 'progress-box';
            box.dataset.value = i;
            box.title = `Egregor ${i}`;
            box.addEventListener('click', () => {
                this.setEgregorScore(i);
            });
            egregorBar.appendChild(box);
        }
        
        // Despair progress bar
        const despairBar = document.getElementById('despairBar');
        despairBar.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            const box = document.createElement('div');
            box.className = 'progress-box';
            box.dataset.value = i;
            box.title = `Despair ${i}`;
            box.addEventListener('click', () => {
                this.setDespairScore(i);
            });
            despairBar.appendChild(box);
        }
    }
    
    generateResonancePool() {
        const pool = document.getElementById('resonancePool');
        pool.innerHTML = '';
        for (let i = 1; i <= 10; i++) {
            const circle = document.createElement('div');
            circle.className = 'resonance-circle';
            circle.dataset.value = i;
            circle.title = `Resonance ${i}`;
            circle.addEventListener('click', () => {
                this.setResonancePoints(i);
            });
            pool.appendChild(circle);
        }
    }
    
    generateMemoryBoxes() {
        const container = document.getElementById('memoryBoxes');
        container.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const box = document.createElement('div');
            box.className = 'memory-box';
            box.dataset.index = i;
            box.title = `Memory Fragment ${i + 1}`;
            box.addEventListener('click', () => {
                this.toggleMemoryFragment(i);
            });
            container.appendChild(box);
        }
    }
    
    setEgregorScore(value) {
        // Allow setting to 0 by clicking current value
        if (this.state.egregorScore === value) {
            this.state.egregorScore = value - 1;
        } else {
            this.state.egregorScore = value;
        }
        
        this.checkEgregorThresholds();
        this.updateDisplay();
        this.saveState();
    }
    
    setDespairScore(value) {
        // Allow setting to 0 by clicking current value
        if (this.state.despairScore === value) {
            this.state.despairScore = value - 1;
        } else {
            this.state.despairScore = value;
        }
        
        this.checkDespairThresholds();
        this.checkBondInversionRisk();
        this.updateDisplay();
        this.saveState();
    }
    
    setResonancePoints(value) {
        // Allow setting to 0 by clicking current value
        if (this.state.resonancePoints === value) {
            this.state.resonancePoints = value - 1;
        } else {
            this.state.resonancePoints = value;
        }
        
        this.updateDisplay();
        this.saveState();
    }
    
    spendResonance(cost, action) {
        if (this.state.resonancePoints >= cost) {
            this.state.resonancePoints -= cost;
            this.addToHistory(`Spent ${cost} Resonance for ${action}`);
            
            // Trigger specific effects
            switch (action) {
                case 'resist':
                    this.showNotification('Reroll your failed Despair save!');
                    break;
                case 'empower':
                    this.showNotification('Add +1d4 to spell attack or +2 to save DC!');
                    break;
                case 'gift':
                    this.showNotification('Activate your Anchored Bond power!');
                    break;
            }
            
            this.updateDisplay();
            this.saveState();
        } else {
            this.showNotification('Not enough Resonance points!', 'error');
        }
    }
    
    updateBond(slot, bondType) {
        if (bondType === '') {
            this.state.bonds[slot] = null;
            this.state.bondStates[slot] = 'empty';
        } else {
            this.state.bonds[slot] = bondType;
            this.state.bondStates[slot] = 'active';
        }
        
        this.updateBondDisplay(slot);
        this.checkBondInversionRisk();
        this.saveState();
    }
    
    updateBondDisplay(slot) {
        const bondType = this.state.bonds[slot];
        const descElement = document.getElementById(`bondDesc${slot + 1}`);
        const statusElement = document.getElementById(`bondStatus${slot + 1}`);
        const invertBtn = document.getElementById(`invertBtn${slot + 1}`);
        
        if (!bondType) {
            descElement.textContent = '';
            statusElement.textContent = 'Empty';
            statusElement.className = 'bond-status';
            invertBtn.style.display = 'none';
            return;
        }
        
        const bond = GAME_DATA.BONDS[bondType];
        const state = this.state.bondStates[slot];
        
        if (state === 'inverted') {
            descElement.textContent = bond.inversionDescription;
            statusElement.textContent = 'INVERTED';
            statusElement.className = 'bond-status inverted';
            invertBtn.textContent = 'Restore Bond';
        } else {
            descElement.textContent = bond.description;
            statusElement.textContent = state === 'strained' ? 'STRAINED' : 'Active';
            statusElement.className = `bond-status ${state}`;
            invertBtn.textContent = 'Invert Bond';
        }
        
        invertBtn.style.display = 'block';
    }
    
    invertBond(slot) {
        if (!this.state.bonds[slot]) return;
        
        if (this.state.bondStates[slot] === 'inverted') {
            this.state.bondStates[slot] = 'active';
            this.showNotification('Bond restored to positive state.');
        } else {
            this.state.bondStates[slot] = 'inverted';
            this.showNotification('Bond inverted to negative state!', 'warning');
        }
        
        this.updateBondDisplay(slot);
        this.saveState();
    }
    
    checkBondInversionRisk() {
        if (this.state.despairScore > this.state.egregorScore) {
            // Bonds are at risk of inversion
            for (let i = 0; i < 3; i++) {
                if (this.state.bonds[i] && this.state.bondStates[i] === 'active') {
                    this.state.bondStates[i] = 'strained';
                    this.updateBondDisplay(i);
                }
            }
            this.showNotification('Warning: Your bonds are strained! Risk of inversion!', 'warning');
        } else {
            // Remove strain if Egregor is higher
            for (let i = 0; i < 3; i++) {
                if (this.state.bondStates[i] === 'strained') {
                    this.state.bondStates[i] = 'active';
                    this.updateBondDisplay(i);
                }
            }
        }
    }
    
    setDivineInfluence(deity) {
        this.state.divineInfluence = deity;
        
        // Update UI
        document.querySelectorAll('.influence-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-deity="${deity}"]`).classList.add('selected');
        
        const entity = GAME_DATA.DIVINE_ENTITIES[deity];
        document.getElementById('currentInfluence').textContent = 
            `${entity.sigil} ${entity.name} (${entity.domain}) - ${entity.description}`;
        
        this.addToHistory(`Divine influence set to ${entity.name}`);
        this.saveState();
    }
    
    toggleTempDespair(index) {
        this.state.tempDespair[index] = !this.state.tempDespair[index];
        
        // Check for conversion
        if (this.state.tempDespair.every(box => box)) {
            this.convertTempDespair();
        }
        
        this.updateDisplay();
        this.saveState();
    }
    
    convertTempDespair() {
        this.state.tempDespair = [false, false, false];
        this.state.despairScore += 1;
        this.showNotification('Temporary Despair converted to 1 permanent Despair!', 'warning');
        this.checkDespairThresholds();
        this.addToHistory('3 Temporary Despair converted to 1 permanent Despair');
    }
    
    clearTempDespair() {
        this.state.tempDespair = [false, false, false];
        this.updateDisplay();
        this.saveState();
        this.showNotification('Temporary Despair cleared.');
    }
    
    toggleMemoryFragment(index) {
        const box = document.querySelector(`[data-index="${index}"]`);
        box.classList.toggle('lost');
        
        // Count lost memories
        const lostCount = document.querySelectorAll('.memory-box.lost').length;
        this.state.memoryFragments = lostCount;
        
        this.saveState();
    }
    
    triggerChoirEffect(effectType) {
        const effects = GAME_DATA.CRAWLING_CHOIR_EFFECTS[effectType];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        this.showNotification(
            `${randomEffect.effect}: ${randomEffect.description}`,
            'choir'
        );
        
        this.addToHistory(`Crawling Choir ${effectType}: ${randomEffect.effect}`);
        
        // Some effects might add memory loss
        if (effectType === 'glimpse' && Math.random() < 0.5) {
            this.addRandomMemoryLoss();
        }
    }
    
    addRandomMemoryLoss() {
        const availableBoxes = document.querySelectorAll('.memory-box:not(.lost)');
        if (availableBoxes.length > 0) {
            const randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            randomBox.classList.add('lost');
            this.state.memoryFragments++;
            this.showNotification('A memory fragment has been lost to the Choir...', 'warning');
        }
    }
    
    rollDice(type) {
        let result, description;
        
        switch (type) {
            case 'd10':
                result = Math.floor(Math.random() * 10) + 1;
                const corruption = GAME_DATA.MINOR_CORRUPTION.find(item => item.roll === result);
                description = `d10 Minor Corruption: ${corruption.effect}`;
                document.getElementById('d10Result').textContent = `${result}: ${corruption.effect}`;
                break;
                
            case 'd100':
                result = Math.floor(Math.random() * 100) + 1;
                const influence = GAME_DATA.DIVINE_INFLUENCE_TABLE.find(
                    item => result >= item.min && result <= item.max
                );
                description = `d100 Divine Influence: ${influence.effect} - ${influence.description}`;
                document.getElementById('d100Result').textContent = `${result}: ${influence.effect}`;
                
                // Auto-set divine influence
                this.setDivineInfluence(influence.entity);
                break;
                
            case 'choir':
                const effectTypes = ['whisper', 'glimpse', 'echo'];
                const randomType = effectTypes[Math.floor(Math.random() * effectTypes.length)];
                const effects = GAME_DATA.CRAWLING_CHOIR_EFFECTS[randomType];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                
                result = `${randomType}: ${randomEffect.effect}`;
                description = `Crawling Choir: ${randomEffect.description}`;
                document.getElementById('choirResult').textContent = `${randomEffect.effect}: ${randomEffect.description}`;
                break;
        }
        
        this.addToHistory(description);
    }
    
    addToHistory(entry) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.rollHistory.unshift(`[${timestamp}] ${entry}`);
        
        // Keep only last 50 entries
        if (this.state.rollHistory.length > 50) {
            this.state.rollHistory = this.state.rollHistory.slice(0, 50);
        }
        
        this.updateRollHistory();
        this.saveState();
    }
    
    updateRollHistory() {
        const container = document.getElementById('rollHistory');
        container.innerHTML = this.state.rollHistory
            .map(entry => `<div class="history-entry">${entry}</div>`)
            .join('');
    }
    
    clearRollHistory() {
        this.state.rollHistory = [];
        this.updateRollHistory();
        this.saveState();
        this.showNotification('Roll history cleared.');
    }
    
    checkEgregorThresholds() {
        const thresholds = [5, 10, 15, 20];
        const currentThreshold = thresholds.find(t => this.state.egregorScore >= t && 
            (this.state.egregorScore < t + 5 || t === 20));
        
        if (currentThreshold) {
            const threshold = GAME_DATA.EGREGOR_THRESHOLDS[currentThreshold];
            document.getElementById('egregorThreshold').textContent = 
                `${threshold.name}: ${threshold.description}`;
        } else {
            document.getElementById('egregorThreshold').textContent = 'No threshold reached';
        }
    }
    
    checkDespairThresholds() {
        const thresholds = [5, 10, 15, 20];
        const crossedThreshold = thresholds.find(t => this.state.despairScore === t);
        
        if (crossedThreshold) {
            const threshold = GAME_DATA.DESPAIR_THRESHOLDS[crossedThreshold];
            this.showNotification(
                `Despair Threshold Reached: ${threshold.name} - ${threshold.description}`,
                'warning'
            );
            
            // Auto-add mutation for certain thresholds
            if (crossedThreshold >= 10) {
                this.autoAddMutation(crossedThreshold);
            }
            
            if (crossedThreshold === 20) {
                this.showNotification(
                    'COMPLETE CORRUPTION: Your character becomes an NPC under DM control!',
                    'error'
                );
            }
        }
    }
    
    autoAddMutation(level) {
        if (!this.state.divineInfluence) {
            // Roll for divine influence
            this.rollDice('d100');
        }
        
        const entity = GAME_DATA.DIVINE_ENTITIES[this.state.divineInfluence];
        const randomMutation = entity.mutations[Math.floor(Math.random() * entity.mutations.length)];
        
        const mutation = {
            level: level,
            source: this.state.divineInfluence,
            effect: randomMutation,
            date: new Date().toLocaleDateString(),
            id: Date.now()
        };
        
        this.state.mutations.push(mutation);
        this.updateMutationsTable();
        this.addToHistory(`Divine Mark gained: ${randomMutation}`);
    }
    
    performLongRest() {
        // Reset resonance points
        this.state.resonancePoints = 10;
        
        // Clear temporary despair
        this.state.tempDespair = [false, false, false];
        
        this.updateDisplay();
        this.saveState();
        this.showNotification('Long rest completed! Resonance restored and temporary despair cleared.');
        this.addToHistory('Long rest performed - Resonance and temporary despair reset');
    }
    
    updateDisplay() {
        // Update scores
        document.getElementById('egregorDisplay').textContent = this.state.egregorScore;
        document.getElementById('despairDisplay').textContent = this.state.despairScore;
        document.getElementById('resonanceDisplay').textContent = this.state.resonancePoints;
        document.getElementById('bondsCount').textContent = this.state.bonds.filter(b => b !== null).length;
        
        // Update progress bars
        this.updateProgressBars();
        this.updateResonanceDisplay();
        this.updateTempDespairDisplay();
        this.updateBondsDisplay();
        this.updateResonanceButtons();
        this.checkEgregorThresholds();
    }
    
    updateProgressBars() {
        // Egregor
        document.querySelectorAll('#egregorBar .progress-box').forEach((box, index) => {
            box.classList.toggle('filled', index < this.state.egregorScore);
        });
        
        // Despair
        document.querySelectorAll('#despairBar .progress-box').forEach((box, index) => {
            box.classList.toggle('filled', index < this.state.despairScore);
        });
        
        // Update milestones
        document.querySelectorAll('.egregor-section .milestone').forEach(milestone => {
            const value = parseInt(milestone.dataset.value);
            milestone.classList.toggle('reached', this.state.egregorScore >= value);
        });
        
        document.querySelectorAll('.despair-section .milestone').forEach(milestone => {
            const value = parseInt(milestone.dataset.value);
            milestone.classList.toggle('reached', this.state.despairScore >= value);
        });
    }
    
    updateResonanceDisplay() {
        document.querySelectorAll('.resonance-circle').forEach((circle, index) => {
            circle.classList.toggle('filled', index < this.state.resonancePoints);
        });
    }
    
    updateTempDespairDisplay() {
        document.querySelectorAll('.temp-box').forEach((box, index) => {
            box.classList.toggle('filled', this.state.tempDespair[index]);
            box.addEventListener('click', () => {
                this.toggleTempDespair(index);
            });
        });
    }
    
    updateBondsDisplay() {
        for (let i = 0; i < 3; i++) {
            document.getElementById(`bond${i + 1}`).value = this.state.bonds[i] || '';
            this.updateBondDisplay(i);
        }
    }
    
    updateResonanceButtons() {
        document.querySelectorAll('.resonance-btn').forEach(btn => {
            const cost = parseInt(btn.dataset.cost);
            btn.disabled = this.state.resonancePoints < cost;
        });
    }
    
    updateMutationsTable() {
        const tbody = document.getElementById('mutationsBody');
        tbody.innerHTML = this.state.mutations.map(mutation => {
            // Handle both old and new mutation formats
            const severity = mutation.severity || mutation.level || 'Unknown';
            const source = mutation.deity || mutation.source;
            const entity = source ? GAME_DATA.DIVINE_ENTITIES[source] : null;
            const sourceDisplay = entity ? entity.sigil + ' ' + entity.name : (source || 'Unknown');
            
            return `
                <tr>
                    <td>${severity}</td>
                    <td>${sourceDisplay}</td>
                    <td>${mutation.effect || mutation.name || 'No description'}</td>
                    <td>${mutation.date}</td>
                    <td><button onclick="tracker.removeMutation(${mutation.id})" class="clear-btn">Remove</button></td>
                </tr>
            `;
        }).join('');
    }
    
    removeMutation(id) {
        this.state.mutations = this.state.mutations.filter(m => m.id !== id);
        this.updateMutationsTable();
        this.saveState();
    }
    
    showMutationModal() {
        document.getElementById('mutationModal').style.display = 'block';
    }
    
    setupModalHandlers() {
        const modal = document.getElementById('mutationModal');
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const form = document.getElementById('mutationForm');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const mutation = {
                level: parseInt(document.getElementById('mutationLevel').value),
                source: document.getElementById('mutationSource').value,
                effect: document.getElementById('mutationEffect').value,
                date: new Date().toLocaleDateString(),
                id: Date.now()
            };
            
            this.state.mutations.push(mutation);
            this.updateMutationsTable();
            this.saveState();
            
            modal.style.display = 'none';
            form.reset();
            
            this.showNotification('Divine Mark/Mutation added successfully!');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    toggleHelp() {
        const content = document.getElementById('helpContent');
        const isVisible = content.style.display !== 'none';
        content.style.display = isVisible ? 'none' : 'block';
        
        const toggle = document.getElementById('helpToggle');
        toggle.textContent = isVisible ? 'Help & Documentation' : 'Hide Documentation';
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Set background color based on type
        switch (type) {
            case 'error':
                notification.style.backgroundColor = '#dc2626';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f59e0b';
                break;
            case 'choir':
                notification.style.backgroundColor = '#800080';
                break;
            default:
                notification.style.backgroundColor = '#059669';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    saveState() {
        try {
            localStorage.setItem(GAME_DATA.AUTO_SAVE_CONFIG.storageKey, JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem(GAME_DATA.AUTO_SAVE_CONFIG.storageKey);
            if (saved) {
                const savedState = JSON.parse(saved);
                
                // Merge with default state structure to handle new properties
                this.state = {
                    ...this.state,
                    ...savedState,
                    // Ensure new properties exist with defaults
                    deityMutations: savedState.deityMutations || {
                        xevir: [],
                        ikris: [],
                        naivara: [],
                        hive: [],
                        choir: []
                    },
                    visionTokens: savedState.visionTokens || 0,
                    visionHistory: savedState.visionHistory || [],
                    activeInfluences: savedState.activeInfluences || [],
                    mutationInteractions: savedState.mutationInteractions || [],
                    lastDespairThreshold: savedState.lastDespairThreshold || 0
                };
                
                document.getElementById('characterName').value = this.state.characterName;
                this.updateDisplay();
                this.updateMutationsTable();
                this.updateRollHistory();
                this.setupEnhancedMutationSystem();
                
                // Restore divine influence
                if (this.state.divineInfluence) {
                    this.setDivineInfluence(this.state.divineInfluence);
                }
                
                // Restore memory fragments
                document.querySelectorAll('.memory-box').forEach((box, index) => {
                    if (index < this.state.memoryFragments) {
                        box.classList.add('lost');
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    }
    
    startAutoSave() {
        setInterval(() => {
            this.saveState();
        }, GAME_DATA.AUTO_SAVE_CONFIG.interval);
    }
    
    exportCharacter() {
        const exportData = {
            version: '1.0',
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
                const data = JSON.parse(e.target.result);
                if (data.character) {
                    this.state = { ...this.state, ...data.character };
                    this.loadState();
                    this.showNotification('Character imported successfully!');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showNotification('Failed to import character file.', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }
    
    // Enhanced Mutation System Methods
    setupEnhancedMutationSystem() {
        this.updateDeityMutationCounts();
        this.updateVisionTokenDisplay();
        this.checkMutationInteractions();
        this.updatePurificationOptions();
    }
    
    rollDeityMutation(deity) {
        const roll = Math.floor(Math.random() * 100) + 1;
        const mutationTable = GAME_DATA.DIVINE_ENTITIES[deity].mutationTable;
        
        // Determine which tier based on roll
        let selectedTier = null;
        let mutation = null;
        
        for (const [tierKey, tierData] of Object.entries(mutationTable)) {
            if (roll >= tierData.range[0] && roll <= tierData.range[1]) {
                selectedTier = tierData;
                // Find specific mutation within tier
                for (const mut of tierData.mutations) {
                    if (roll >= mut.roll[0] && roll <= mut.roll[1]) {
                        mutation = mut;
                        break;
                    }
                }
                break;
            }
        }
        
        if (mutation) {
            const mutationEntry = {
                id: Date.now(),
                deity: deity,
                roll: roll,
                tier: selectedTier.tier,
                name: mutation.name,
                effect: mutation.effect,
                severity: mutation.severity,
                date: new Date().toLocaleDateString()
            };
            
            this.state.deityMutations[deity].push(mutationEntry);
            this.state.mutations.push(mutationEntry); // Keep for legacy table
            
            // Add to active influences if not already present
            if (!this.state.activeInfluences.includes(deity)) {
                this.state.activeInfluences.push(deity);
            }
            
            // Handle special cases
            if (deity === 'choir') {
                this.addVisionToken();
            }
            
            this.updateDeityMutationDisplay(deity);
            this.updateDeityMutationCounts();
            this.checkMutationInteractions();
            this.updateMutationsTable();
            this.saveState();
            
            this.showNotification(
                `${GAME_DATA.DIVINE_ENTITIES[deity].sigil} ${mutation.name}: ${mutation.effect}`,
                deity
            );
            
            this.addToHistory(`${deity.toUpperCase()} Mutation (${roll}): ${mutation.name}`);
        }
    }
    
    updateDeityMutationDisplay(deity) {
        const mutationsList = document.getElementById(`${deity}-mutations`);
        if (!mutationsList) return;
        
        mutationsList.innerHTML = this.state.deityMutations[deity]
            .map(mut => `
                <div class="mutation-entry ${mut.severity.toLowerCase()}">
                    <div class="mutation-name">${mut.name} (${mut.tier})</div>
                    <div class="mutation-effect">${mut.effect}</div>
                    <div class="mutation-meta">Roll: ${mut.roll} | ${mut.date}</div>
                </div>
            `).join('');
    }
    
    updateDeityMutationCounts() {
        for (const deity of ['xevir', 'ikris', 'naivara', 'hive', 'choir']) {
            const count = this.state.deityMutations[deity].length;
            const countElement = document.querySelector(`[data-deity="${deity}"] .mutation-count`);
            if (countElement) {
                countElement.textContent = `${count} mutation${count !== 1 ? 's' : ''}`;
            }
            
            // Update display for each deity
            this.updateDeityMutationDisplay(deity);
        }
    }
    
    rollVision(category) {
        if (this.state.visionTokens <= 0) {
            this.showNotification('No vision tokens available!', 'error');
            return;
        }
        
        const visionData = GAME_DATA.VISION_POOL_SYSTEM.visionCategories[category];
        const roll = Math.floor(Math.random() * 100) + 1;
        
        let selectedVision = null;
        for (const vision of visionData.visions) {
            if (roll >= vision.roll[0] && roll <= vision.roll[1]) {
                selectedVision = vision;
                break;
            }
        }
        
        if (selectedVision) {
            const visionEntry = {
                id: Date.now(),
                category: category,
                roll: roll,
                vision: selectedVision.vision,
                effect: selectedVision.effect,
                date: new Date().toLocaleDateString()
            };
            
            this.state.visionHistory.unshift(visionEntry);
            this.removeVisionToken();
            
            this.updateVisionHistory();
            this.saveState();
            
            this.showNotification(
                `Vision: ${selectedVision.vision} - ${selectedVision.effect}`,
                'choir'
            );
            
            this.addToHistory(`VISION (${category}): ${selectedVision.vision}`);
        }
    }
    
    addVisionToken() {
        this.state.visionTokens++;
        this.updateVisionTokenDisplay();
        this.saveState();
    }
    
    removeVisionToken() {
        if (this.state.visionTokens > 0) {
            this.state.visionTokens--;
            this.updateVisionTokenDisplay();
            this.saveState();
        }
    }
    
    updateVisionTokenDisplay() {
        const display = document.getElementById('visionTokens');
        if (display) {
            display.textContent = this.state.visionTokens;
        }
    }
    
    updateVisionHistory() {
        const historyContainer = document.getElementById('visionHistory');
        if (!historyContainer) return;
        
        historyContainer.innerHTML = this.state.visionHistory
            .slice(0, 10) // Show last 10 visions
            .map(vision => `
                <div class="vision-entry">
                    <div class="vision-title">${vision.vision} (${vision.category})</div>
                    <div class="vision-effect">${vision.effect}</div>
                    <div class="vision-meta">Roll: ${vision.roll} | ${vision.date}</div>
                </div>
            `).join('');
    }
    
    checkMutationInteractions() {
        const interactions = [];
        const influences = this.state.activeInfluences;
        
        if (influences.length < 2) {
            document.getElementById('mutationInteractions').style.display = 'none';
            return;
        }
        
        // Check for conflicts and synergies
        for (let i = 0; i < influences.length; i++) {
            for (let j = i + 1; j < influences.length; j++) {
                const pair = `${influences[i]}-${influences[j]}`;
                const reversePair = `${influences[j]}-${influences[i]}`;
                
                if (GAME_DATA.MUTATION_INTERACTIONS.conflictingPairs[pair]) {
                    interactions.push({
                        type: 'conflict',
                        ...GAME_DATA.MUTATION_INTERACTIONS.conflictingPairs[pair]
                    });
                } else if (GAME_DATA.MUTATION_INTERACTIONS.conflictingPairs[reversePair]) {
                    interactions.push({
                        type: 'conflict',
                        ...GAME_DATA.MUTATION_INTERACTIONS.conflictingPairs[reversePair]
                    });
                } else if (GAME_DATA.MUTATION_INTERACTIONS.compatiblePairs[pair]) {
                    interactions.push({
                        type: 'synergy',
                        ...GAME_DATA.MUTATION_INTERACTIONS.compatiblePairs[pair]
                    });
                } else if (GAME_DATA.MUTATION_INTERACTIONS.compatiblePairs[reversePair]) {
                    interactions.push({
                        type: 'synergy',
                        ...GAME_DATA.MUTATION_INTERACTIONS.compatiblePairs[reversePair]
                    });
                }
            }
        }
        
        // Check for multiple influences chaos
        if (influences.length >= 3) {
            interactions.push({
                type: 'chaos',
                ...GAME_DATA.MUTATION_INTERACTIONS.multipleInfluences.threeOrMore
            });
        }
        
        this.state.mutationInteractions = interactions;
        this.updateMutationInteractionsDisplay();
    }
    
    updateMutationInteractionsDisplay() {
        const container = document.getElementById('mutationInteractions');
        const list = document.getElementById('interactionsList');
        
        if (this.state.mutationInteractions.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'block';
        list.innerHTML = this.state.mutationInteractions
            .map(interaction => `
                <div class="interaction-entry ${interaction.type}">
                    <div class="interaction-title">${interaction.description}</div>
                    <div class="interaction-description">${interaction.effect || interaction.synergy || interaction.bonus || ''}</div>
                </div>
            `).join('');
    }
    
    updatePurificationOptions() {
        const container = document.getElementById('deityCleansingOptions');
        if (!container) return;
        
        const activeDeities = this.state.activeInfluences;
        container.innerHTML = activeDeities.map(deity => {
            const cleansing = GAME_DATA.PURIFICATION_SYSTEM.deitySpecificCleansing[deity];
            return `
                <div class="cleansing-option">
                    <h5>${GAME_DATA.DIVINE_ENTITIES[deity].sigil} ${cleansing.name}</h5>
                    <p>${cleansing.description}</p>
                    <div class="requirements">Requirements: ${cleansing.requirements.join(', ')}</div>
                    <div class="effect">Effect: ${cleansing.effect}</div>
                </div>
            `;
        }).join('');
    }
    
    // Enhanced threshold checking with auto-rolling
    checkDespairThresholds() {
        const thresholds = [5, 10, 15, 20];
        const currentThreshold = thresholds.find(t => 
            this.state.despairScore >= t && this.state.lastDespairThreshold < t
        );
        
        if (currentThreshold) {
            const threshold = GAME_DATA.DESPAIR_THRESHOLDS[currentThreshold];
            this.showNotification(
                `Despair Threshold Reached: ${threshold.name} - ${threshold.description}`,
                'warning'
            );
            
            // Auto-trigger mutation rolls based on threshold automation
            const automation = GAME_DATA.THRESHOLD_AUTOMATION.despairMilestones[currentThreshold];
            if (automation && automation.autoTriggers) {
                this.handleThresholdAutomation(currentThreshold, automation);
            }
            
            this.state.lastDespairThreshold = currentThreshold;
            
            if (currentThreshold === 20) {
                this.showNotification(
                    'COMPLETE CORRUPTION: Your character becomes an NPC under DM control!',
                    'error'
                );
            }
        }
    }
    
    handleThresholdAutomation(threshold, automation) {
        automation.autoTriggers.forEach(trigger => {
            switch (trigger) {
                case 'Roll on Minor Corruption table':
                    this.rollDice('d10');
                    break;
                case 'Check for divine influence if none present':
                    if (!this.state.divineInfluence) {
                        this.rollDice('d100');
                    }
                    break;
                case 'Roll for divine influence':
                    this.rollDice('d100');
                    break;
                case 'Roll on deity-specific mutation table':
                    if (this.state.divineInfluence) {
                        this.rollDeityMutation(this.state.divineInfluence);
                    }
                    break;
                case 'Major mutation roll':
                    if (this.state.divineInfluence) {
                        this.rollDeityMutation(this.state.divineInfluence);
                    }
                    break;
                case 'Avatar transformation roll':
                    if (this.state.divineInfluence) {
                        this.rollDeityMutation(this.state.divineInfluence);
                    }
                    break;
            }
        });
    }
}

// Global functions for HTML onclick handlers
function toggleDeitySection(deity) {
    const content = document.getElementById(`${deity}-content`);
    const header = document.querySelector(`[data-deity="${deity}"] .deity-header`);
    const icon = header.querySelector('.expand-icon');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        header.classList.add('expanded');
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        header.classList.remove('expanded');
        icon.textContent = '▼';
    }
}

function addVisionToken() {
    if (tracker) {
        tracker.addVisionToken();
    }
}

function removeVisionToken() {
    if (tracker) {
        tracker.removeVisionToken();
    }
}

function showPurificationOptions() {
    const options = document.getElementById('purificationOptions');
    if (options.style.display === 'none') {
        options.style.display = 'block';
        if (tracker) {
            tracker.updatePurificationOptions();
        }
    } else {
        options.style.display = 'none';
    }
}

// Initialize the tracker when the page loads
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new SoulsHarmonyTracker();
});