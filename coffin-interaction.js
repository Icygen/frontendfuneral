document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const coffinLid = document.querySelector('.coffin-lid');
    const coffinBody = document.querySelector('.coffin-body');
    const coffinTitle = document.getElementById('coffin-title');
    const coffinDescription = document.getElementById('coffin-description');
    
    // Toggle coffin lid on click
    if (coffinLid) {
        coffinLid.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    }
    
    // Handle design option clicks
    const designOptions = document.querySelectorAll('.design-option');
    designOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            designOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update coffin display based on design
            const design = this.getAttribute('data-design');
            updateCoffinDesign(design);
            
            // Update title and description
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            if (title) coffinTitle.textContent = title;
            if (desc) coffinDescription.textContent = desc;
        });
    });
    
    // Handle material option clicks
    const materialOptions = document.querySelectorAll('.material-option');
    materialOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            materialOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update coffin material
            const material = this.getAttribute('data-material');
            updateCoffinMaterial(material);
        });
    });
    
    // Handle finish option clicks
    const finishOptions = document.querySelectorAll('.finish-option');
    finishOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            finishOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update coffin finish
            const finish = this.getAttribute('data-finish');
            updateCoffinFinish(finish);
        });
    });
    
    // 3D View Button
    const view3dBtn = document.querySelector('.btn-view-3d');
    if (view3dBtn) {
        view3dBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('3D viewer would open in a modal or new page in a full implementation.');
            // In a real implementation, this would open a 3D viewer
        });
    }
    
    // Function to update coffin design
    function updateCoffinDesign(design) {
        // Remove previous design classes
        coffinBody.classList.remove('traditional', 'modern', 'eco');
        coffinLid.classList.remove('traditional', 'modern', 'eco');
        
        // Add the selected design class
        if (design) {
            coffinBody.classList.add(design);
            coffinLid.classList.add(design);
        }
        
        // Ensure lid handle exists
        let lidHandle = document.querySelector('.lid-handle');
        if (!lidHandle && coffinLid) {
            lidHandle = document.createElement('div');
            lidHandle.className = 'lid-handle';
            coffinLid.appendChild(lidHandle);
        }
        
        // Update styles based on design
        switch(design) {
            case 'modern':
                coffinBody.style.backgroundColor = '#455a64';
                coffinLid.style.backgroundColor = '#37474f';
                break;
            case 'eco':
                coffinBody.style.backgroundColor = '#689f38';
                coffinLid.style.backgroundColor = '#558b2f';
                break;
            default: // traditional
                coffinBody.style.backgroundColor = '#6d4c41';
                coffinLid.style.backgroundColor = '#5d4037';
        }
    }
    
    // Function to update coffin material
    function updateCoffinMaterial(material) {
        // In a real implementation, this would update the 3D model's material
        console.log('Material updated to:', material);
        
        // For this demo, we'll just update the pattern or texture
        let pattern = document.querySelector('.coffin-pattern');
        
        // Create pattern element if it doesn't exist
        if (!pattern && coffinBody) {
            pattern = document.createElement('div');
            pattern.className = 'coffin-pattern';
            coffinBody.appendChild(pattern);
        }
        
        if (pattern) {
            // Clear any existing pattern classes
            pattern.className = 'coffin-pattern';
            
            // Add material-specific class
            pattern.classList.add(material || 'mahogany');
            
            // Set pattern based on material
            const patterns = {
                'oak': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M0,50 L100,50 M50,0 L50,100" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>',
                'walnut': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>',
                'bamboo': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M10,10 L90,10 L90,30 L10,30 Z M10,40 L90,40 L90,60 L10,60 Z M10,70 L90,70 L90,90 L10,90 Z" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/></svg>',
                'mahogany': 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><path d="M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 Z" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2"/></svg>'
            };
            
            pattern.style.backgroundImage = `url("${patterns[material] || patterns.mahogany}")`;
        }
    }
    
    // Function to update coffin finish
    function updateCoffinFinish(finish) {
        // In a real implementation, this would update the 3D model's finish
        console.log('Finish updated to:', finish);
        
        // Ensure we have the elements we need
        if (!coffinBody || !coffinLid) return;
        
        // Remove any existing finish classes
        coffinBody.classList.remove('polished', 'matte', 'satin');
        coffinLid.classList.remove('polished', 'matte', 'satin');
        
        // Add the selected finish class
        if (finish) {
            coffinBody.classList.add(finish);
            coffinLid.classList.add(finish);
        }
        
        // Update visual properties based on finish
        switch(finish) {
            case 'matte':
                coffinBody.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                coffinLid.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                break;
            case 'satin':
                coffinBody.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
                coffinLid.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
                break;
            default: // polished
                coffinBody.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
                coffinLid.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        }
    }
    
    // Initialize with default values
    updateCoffinDesign('traditional');
    updateCoffinMaterial('mahogany');
    updateCoffinFinish('polished');
});
