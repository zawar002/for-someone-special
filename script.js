onload = () => {
  // Entry Page Logic
  const entryPage = document.getElementById('entryPage');
  const mainContent = document.getElementById('mainContent');
  const firstNameInput = document.getElementById('firstNameInput');
  const secondNameInput = document.getElementById('secondNameInput');
  const firstNextBtn = document.getElementById('firstNextBtn');
  const secondNextBtn = document.getElementById('secondNextBtn');
  const firstField = document.getElementById('firstField');
  const secondField = document.getElementById('secondField');
  const firstError = document.getElementById('firstError');
  const secondError = document.getElementById('secondError');
  const firstMatched = document.getElementById('firstMatched');
  const secondMatched = document.getElementById('secondMatched');
  const entryHeading = document.querySelector('.entry-heading');
  
  // Hide main content initially
  mainContent.classList.add('hidden');
  
  // Debug: Check if elements exist
  if (!firstNextBtn) {
    console.error('First next button not found');
    return;
  }
  if (!firstNameInput) {
    console.error('First name input not found');
    return;
  }
  
  // First field validation
  function handleFirstNext() {
    const firstName = firstNameInput.value.trim().toLowerCase();
    
    if (firstName === 'khizra') {
      // Show matched message, keep first field visible, show second field below
      firstError.classList.remove('show');
      firstError.textContent = '';
      firstMatched.textContent = 'matched';
      firstMatched.classList.add('show');
      
      // Disable first field
      firstNameInput.disabled = true;
      firstNextBtn.disabled = true;
      firstNextBtn.style.opacity = '0.5';
      firstNextBtn.style.cursor = 'not-allowed';
      
      // Show second field below first field
      secondField.classList.remove('hidden');
      setTimeout(() => {
        secondNameInput.focus();
      }, 100);
    } else if (firstName === '') {
      // Show error if empty
      firstError.textContent = 'please enter your first name';
      firstError.classList.add('show');
      firstMatched.classList.remove('show');
    } else {
      // Show error
      firstError.textContent = 'sorry not for you';
      firstError.classList.add('show');
      firstMatched.classList.remove('show');
      firstNameInput.focus();
    }
  }
  
  firstNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFirstNext();
  });
  
  // Allow Enter key on first input
  firstNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      firstNextBtn.click();
    }
  });
  
  // Second field validation
  secondNextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const secondName = secondNameInput.value.trim().toLowerCase();
    
    if (secondName === 'zawar') {
      // Both validations passed - transition
      secondError.classList.remove('show');
      secondMatched.textContent = 'matched';
      secondMatched.classList.add('show');
      
      // Disable second field
      secondNameInput.disabled = true;
      secondNextBtn.disabled = true;
      secondNextBtn.style.opacity = '0.5';
      secondNextBtn.style.cursor = 'not-allowed';
      
      // Move heading to center
      entryHeading.classList.add('centered');
      
      // Wait for heading animation, then fade out entry page and show main content
      setTimeout(() => {
        entryPage.classList.add('fade-out');
        
        setTimeout(() => {
          entryPage.style.display = 'none';
          mainContent.classList.remove('hidden');
          
          // Remove not-loaded class to start animations
          document.body.classList.remove("not-loaded");
          
          // Initialize shooting star after main content is shown
          setTimeout(() => {
            initShootingStar();
          }, 100);
        }, 500);
      }, 1000);
    } else if (secondName === '') {
      // Show error if empty
      secondError.textContent = 'please enter the first name';
      secondError.classList.add('show');
    } else {
      // Show error
      secondError.textContent = 'sorry not for you';
      secondError.classList.add('show');
      secondNameInput.focus();
    }
  });
  
  // Clear error messages when user types
  firstNameInput.addEventListener('input', () => {
    if (firstError.classList.contains('show')) {
      firstError.classList.remove('show');
    }
  });
  
  secondNameInput.addEventListener('input', () => {
    if (secondError.classList.contains('show')) {
      secondError.classList.remove('show');
    }
  });
  
  // Allow Enter key on second input
  secondNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      secondNextBtn.click();
    }
  });
  
  // Shooting star function - will be initialized after main content is shown
  function initShootingStar() {
    const shootingStar = document.querySelector('.shooting-star');
    if (!shootingStar) return;
    
    const ANIMATION_DURATION = 3; // seconds
    const WAIT_AFTER_DISAPPEAR = 10; // seconds - counter starts after star disappears
    
    function setRandomPosition() {
      // Random direction: true = right to left, false = left to right
      const directionRightToLeft = Math.random() >= 0.5;
      
      // Random start position in center to top area
      // Top: 5% to 30% (center to top part of screen)
      const startTop = Math.random() * 25 + 5; // 5% to 30%
      
      // Random base rotation angle (-15deg to -5deg for slight downward movement)
      let rotation = Math.random() * 10 - 15; // -15deg to -5deg
      
      // Random travel distance: 60% to 120% of screen width
      const travelDistance = Math.random() * 60 + 60; // 60% to 120%
      
      let startLeft, endLeft;
      
      if (directionRightToLeft) {
        // Moving right to left: start from right side, end on left side
        startLeft = Math.random() * 80 + 10; // 10% to 90%
        endLeft = startLeft - travelDistance; // Moves left
      } else {
        // Moving left to right: start from left side, end on right side
        startLeft = Math.random() * 30 - 30; // -30% to 0% (off screen on left)
        endLeft = startLeft + travelDistance; // Moves right
        
        // Adjust rotation for left-to-right (opposite angle)
        rotation = rotation * -1; // Flip the angle
      }
      
      const endTop = startTop + Math.random() * 20 + 5; // 5% to 25% further down
      
      shootingStar.style.setProperty('--start-top', startTop + '%');
      shootingStar.style.setProperty('--start-left', startLeft + '%');
      shootingStar.style.setProperty('--end-top', endTop + '%');
      shootingStar.style.setProperty('--end-left', endLeft + '%');
      shootingStar.style.setProperty('--rotation', rotation + 'deg');
    }
    
    function startStarAnimation() {
      setRandomPosition();
      shootingStar.style.animation = 'none';
      // Force reflow to restart animation
      shootingStar.offsetHeight;
      shootingStar.style.animation = `shooting-star-animation ${ANIMATION_DURATION}s ease-in-out`;
    }
    
    function scheduleNextStar() {
      // Start animation
      startStarAnimation();
      
      // After animation completes (disappears), wait 10 seconds before next star
      setTimeout(() => {
        scheduleNextStar();
      }, (ANIMATION_DURATION * 1000) + (WAIT_AFTER_DISAPPEAR * 1000));
    }
    
    // Start the first star after initial delay
    setTimeout(() => {
      scheduleNextStar();
    }, 1000);
  }
};