document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const counter = document.getElementById('counter');
    const progress = document.getElementById('progress'); // Make sure this is defined
    const prestigeBtn = document.getElementById('prestigeBtn');

    const upgrade1 = document.getElementById('upgrade1');
    const upgrade2 = document.getElementById('upgrade2');
    const upgrade3 = document.getElementById('upgrade3');
    const upgrade4 = document.getElementById('upgrade4');
    const settingsBtn = document.getElementById('settingsBtn');
    const muteBtn = document.getElementById('muteBtn');
    const setMenu = document.getElementById('setMenu');

    const upgrade1Count = document.getElementById('upgrade1Count');
    const upgrade2Count = document.getElementById('upgrade2Count');
    const upgrade3Count = document.getElementById('upgrade3Count');
    const upgrade4Count = document.getElementById('upgrade4Count');

    const fp1 = document.getElementById('fp1');
    const fp2 = document.getElementById('fp2');
    const fp3 = document.getElementById('fp3');
    const fp4 = document.getElementById('fp4');
    const fpCounter = document.getElementById('fpCounter');

    const targetCoconuts = 1e9; // Target for prestige
    let count = 0;
    let increment = 1;  // Initial increment value
    let upg1Cost = 25;
    let upg2Cost = 25;
    let upg3Cost = 5;
    let upg4Cost = 10;
    let upg1Count = 0;
    let moneypersec = 0;
    let employeeCount = 0;
    let fieldCount = 0;
    let factoryCount = 0;
    let fpPoints = 0;
    let prestigeCount = 0;
    let soundEnabled = true; // Sound is enabled by default
    let revenueMultiplier = 1;
    let costReduction = 1;
    let fpGainMultiplier = 1;
    let prestigeCostReduction = 1;

    function updateProgressBar() {
        const progressPercentage = (count / targetCoconuts) * 100;
        progress.style.width = `${Math.min(progressPercentage, 100)}%`;
    
        if (count >= targetCoconuts) {
            document.querySelector('.prestigeBar').style.display = 'none'; // Hide the progress bar
            prestigeBtn.style.display = 'block'; // Show the prestige button
        } else {
            document.querySelector('.prestigeBar').style.display = 'block'; // Show the progress bar
            prestigeBtn.style.display = 'none'; // Hide the prestige button
        }
    }
    
    function updateFpCounter() {
        fpCounter.textContent = fpPoints;
    }

    function updateCounter() {
        counter.textContent = `Coconuts: ${Math.round(count.toFixed(1))}`;
        updateProgressBar();
        updateFpCounter();
    }

    function updateUpgradeCounters() {
        upgrade1Count.textContent = upg1Count;
        upgrade2Count.textContent = employeeCount;
        upgrade3Count.textContent = fieldCount;
        upgrade4Count.textContent = factoryCount;
    }

    function updateUpgradeCost(barBtn, cost) {
        barBtn.querySelector('.cost').textContent = Math.round(cost);
    }

    function updateFpUpgradeButton(fpBtn, level, maxLevel, cost) {
        const dataText = fpBtn.getAttribute('data-text');
        const newText = `${dataText.split('(')[0]}(${level}/${maxLevel}) (Cost: <span class="cost">${cost}</span>)`;
        fpBtn.innerHTML = newText;
    }


    function addFpPoints() {
        const prestigeThreshold = 1e9; // 1 billion coconuts
        const basePoints = 1; // Points given on prestige
    
        // Calculate the number of points based on coconuts
        if (count >= prestigeThreshold) {
            // Calculate additional points if player continues
            let additionalPoints = Math.log10(count / prestigeThreshold) * 10; // Adjust multiplier for balance
            fpPoints = basePoints + additionalPoints;
            console.log(`Gained ${fpPoints} FP Points for ${count} coconuts`);
        } else {
            // Calculate points based on current coconuts
            let points = Math.log10(count / prestigeThreshold + 1) * 10; // Ensure minimum 0 points
            fpPoints = points;
            console.log(`Gained ${fpPoints} FP Points for ${count} coconuts`);
        }
    
        // Update the player's fp points
        // Assuming you have a variable or a way to store fp points:
        // playerFpPoints += fpPoints;
    
        return fpPoints; // Return the calculated fp points
    }
    

    function prestige() {
        if (count >= 1e9) {
             prestigeCount++;
             addFpPoints();
             count = 0;
             increment = 1;  // Initial increment value
             upg1Cost = 25;
             upg2Cost = 25;
             upg3Cost = 5;
             upg4Cost = 10;
             upg1Count = 0;
             moneypersec = 0;
             employeeCount = 0;
             fieldCount = 0;
             factoryCount = 0;
             fpShopBtn.style.display = 'block';
            updateUI();
        } else {
            alert("You need at least 1 Billion Coconuts to sell.");
        }
    }

    // Mute/Unmute functionality
    muteBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        muteBtn.textContent = soundEnabled ? 'Mute' : 'Unmute';
    });

    mainBtn.addEventListener('click', () => {
        count += increment;
        updateCounter();
    });

    prestigeBtn.addEventListener('click', () =>{
        prestige();
    })

    // Upgrade 1: Increase Coconuts Per Collect (+1/Click) (Cost: 25)
    upgrade1.addEventListener('click', () => {
        if (count >= 25) {
            count -= upg1Cost;
            moneypersec += 1;
            upg1Count += 1;
            upg1Cost *= 1.25;
            updateCounter();
            updateUpgradeCounters();
            updateUpgradeCost(upgrade1, upg1Cost);
        } else {
            alert('Not enough Coconuts!');
        }
    });

    // Upgrade 2: Hire Coconut Employee (+1 1st Upgrade/s) (Cost: 25 1st Upgrade)
    upgrade2.addEventListener('click', () => {
        if (upg1Count >= 25) {
            upg1Count -= upg2Cost;
            moneypersec -= 25;
            employeeCount += 1;
            upg2Cost *= 1.25;
            updateCounter();
            updateUpgradeCounters();
            updateUpgradeCost(upgrade2, upg2Cost);
        } else {
            alert('Not enough 1st Upgrade increments!');
        }
    });

    // Upgrade 3: Buy Coconut Field (+1 Coconut Employee/s) (Cost: 5 2nd Upgrade)
    upgrade3.addEventListener('click', () => {
        if (employeeCount >= 5) {
            employeeCount -= upg3Cost;
            fieldCount += 1;
            upg3Cost *= 2;
            updateCounter();
            updateUpgradeCounters();
            updateUpgradeCost(upgrade3, upg3Cost);
        } else {
            alert('Not enough 2nd Upgrade employees!');
        }
    });

    // Upgrade 4: Buy Coconut Factory (+1 Coconut Field/s) (Cost: 10 3rd Upgrade)
    upgrade4.addEventListener('click', () => {
        if (fieldCount >= 10) {
            fieldCount -= upg4Cost;
            factoryCount += 1;
            upg4Cost *= 1.5;
            updateCounter();
            updateUpgradeCounters();
            updateUpgradeCost(upgrade4, upg4Cost);
        } else {
            alert('Not enough 3rd Upgrade fields!');
        }
    });

    settingsBtn.addEventListener('click', () => {
        setMenu.style.display = setMenu.style.display === 'block' ? 'none' : 'block';
    });

    setMenu.style.display = 'none';

     // Prestige Upgrade 1: Increase Revenue By 5%
     let fp1Level = 0;
     const fp1MaxLevel = 200;
     let fp1Cost = 1;
     fp1.addEventListener('click', () => {
         if (fpPoints >= fp1Cost && fp1Level < fp1MaxLevel) {
             fpPoints -= fp1Cost;
             fp1Level += 1;
             revenueMultiplier *= 1.05;
             fp1Cost *= 1.2;
             updateFpUpgradeButton(fp1, fp1Level, fp1MaxLevel, fp1Cost);
         } else {
             alert('Not enough FP points or maximum level reached!');
         }
     });
 
     // Prestige Upgrade 2: Decrease All Costs By 1%
     let fp2Level = 0;
     const fp2MaxLevel = 200;
     let fp2Cost = 1;
     fp2.addEventListener('click', () => {
         if (fpPoints >= fp2Cost && fp2Level < fp2MaxLevel) {
             fpPoints -= fp2Cost;
             fp2Level += 1;
             costReduction *= 0.99;
             fp2Cost *= 1.2;
             updateFpUpgradeButton(fp2, fp2Level, fp2MaxLevel, fp2Cost);
         } else {
             alert('Not enough FP points or maximum level reached!');
         }
     });
 
     // Prestige Upgrade 3: Increase FP points gain By 25%
     let fp3Level = 0;
     const fp3MaxLevel = 4;
     let fp3Cost = 10;
     fp3.addEventListener('click', () => {
         if (fpPoints >= fp3Cost && fp3Level < fp3MaxLevel) {
             fpPoints -= fp3Cost;
             fp3Level += 1;
             fpGainMultiplier *= 1.25;
             fp3Cost *= 2;
             updateFpUpgradeButton(fp3, fp3Level, fp3MaxLevel, fp3Cost);
         } else {
             alert('Not enough FP points or maximum level reached!');
         }
     });
 
     // Prestige Upgrade 4: Decrease Prestige Cost By 0.1%
     let fp4Level = 0;
     const fp4MaxLevel = 1000;
     let fp4Cost = 5;
     fp4.addEventListener('click', () => {
         if (fpPoints >= fp4Cost && fp4Level < fp4MaxLevel) {
             fpPoints -= fp4Cost;
             fp4Level += 1;
             prestigeCostReduction *= 0.999;
             fp4Cost *= 1.1;
             updateFpUpgradeButton(fp4, fp4Level, fp4MaxLevel, fp4Cost);
         } else {
             alert('Not enough FP points or maximum level reached!');
         }
     });
 
     fpShopBtn.addEventListener('click', () => {
         fpShop.style.display = fpShop.style.display === 'block' ? 'none' : 'block';
     });
 
     fpShop.style.display = 'none';

    // Functions to periodically add previous upgrades
    setInterval(() => {
        count += upg1Count;
        updateCounter();
        updateUpgradeCounters();
    }, 1000); // Every second

    setInterval(() => {
        upg1Count += employeeCount;
        updateCounter();
        updateUpgradeCounters();
    }, 2000); // Every 2 seconds

    setInterval(() => {
        employeeCount += fieldCount;
        updateCounter();
        updateUpgradeCounters();
    }, 3000); // Every 3 seconds

    setInterval(() => {
        fieldCount += factoryCount;
        updateCounter();
        updateUpgradeCounters();
    }, 4000); // Every 4 seconds
});
