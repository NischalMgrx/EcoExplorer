// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the data to your server
                // For demo purposes, we'll just show an alert
                alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
                emailInput.value = '';
            }
        });
    }
    
    // Carbon Footprint Calculator
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const electricity = parseFloat(this.elements['electricity'].value) || 0;
            const gas = parseFloat(this.elements['gas'].value) || 0;
            const carMileage = parseFloat(this.elements['car-mileage'].value) || 0;
            const flights = parseFloat(this.elements['flights'].value) || 0;
            const diet = this.elements['diet'].value;
            const recycling = this.elements['recycling'].value;
            
            // Calculate footprint (simplified calculation)
            let footprint = 0;
            footprint += electricity * 0.85; // kg CO2 per kWh
            footprint += gas * 2.1; // kg CO2 per cubic meter
            footprint += carMileage * 0.25; // kg CO2 per km (average car)
            footprint += flights * 0.18; // kg CO2 per km (average flight)
            
            // Adjust based on diet
            switch(diet) {
                case 'vegan':
                    footprint -= 500;
                    break;
                case 'vegetarian':
                    footprint -= 300;
                    break;
                case 'meat-occasional':
                    footprint -= 100;
                    break;
                // 'meat-regular' adds nothing
            }
            
            // Adjust based on recycling
            switch(recycling) {
                case 'all':
                    footprint -= 200;
                    break;
                case 'some':
                    footprint -= 100;
                    break;
                // 'none' adds nothing
            }
            
            // Display results
            const results = document.querySelector('.results');
            const footprintResult = document.getElementById('footprint-result');
            const progressBar = document.querySelector('.progress-bar');
            const tipsList = document.querySelector('.tips-list');
            
            footprintResult.textContent = Math.round(footprint);
            
            // Set progress bar (max 10000 kg CO2/year for visualization)
            const progressPercent = Math.min((footprint / 10000) * 100, 100);
            progressBar.style.width = `${progressPercent}%`;
            
            // Generate tips based on footprint
            tipsList.innerHTML = '';
            let tips = [];
            
            if (electricity > 200) {
                tips.push('Switch to energy-efficient appliances and LED bulbs');
            }
            
            if (gas > 100) {
                tips.push('Consider improving your home insulation or switching to renewable heating');
            }
            
            if (carMileage > 5000) {
                tips.push('Try carpooling, public transport, or cycling for some trips');
            }
            
            if (flights > 2000) {
                tips.push('Consider train travel for shorter distances or carbon offset programs for flights');
            }
            
            if (diet === 'meat-regular') {
                tips.push('Reducing meat consumption, especially beef, can significantly lower your footprint');
            }
            
            if (recycling === 'none' || recycling === 'some') {
                tips.push('Recycling more can help reduce waste sent to landfills');
            }
            
            if (tips.length === 0) {
                tips.push('You\'re doing great! Keep up the sustainable habits');
            }
            
            tips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                tipsList.appendChild(li);
            });
            
            results.style.display = 'block';
            
            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Challenge Participation Toggle
    document.querySelectorAll('.challenge-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const challengeCard = this.closest('.challenge-card');
            const progressText = challengeCard.querySelector('.progress-text');
            
            if (this.textContent === 'Join Challenge') {
                this.textContent = 'Leave Challenge';
                this.classList.add('btn-outline');
                this.classList.remove('btn-primary');
                progressText.textContent = 'In Progress (0%)';
            } else {
                this.textContent = 'Join Challenge';
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline');
                progressText.textContent = 'Not Started';
            }
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .blog-card, .mission-card, .team-member, .tip-card, .challenge-card, .resource-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .blog-card, .mission-card, .team-member, .tip-card, .challenge-card, .resource-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});