// Sell Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    const sellForm = document.getElementById('sellForm');
    const successMessage = document.getElementById('successMessage');
    const formWrapper = document.querySelector('.form-wrapper');

    // Form submission handler
    sellForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitProduct();
        }
    });

    // Form validation
    function validateForm() {
        const requiredFields = [
            'sellerName', 'sellerEmail', 'sellerPhone', 'sellerLocation',
            'productName', 'productCategory', 'productDescription', 
            'ecoFeatures', 'productPrice', 'quantity', 'shipping'
        ];

        let isValid = true;
        const errors = [];

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            if (!value) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                errors.push(`${getFieldLabel(fieldId)} is required`);
            } else {
                field.style.borderColor = '#28a745';
            }
        });

        // Email validation
        const email = document.getElementById('sellerEmail').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            isValid = false;
            document.getElementById('sellerEmail').style.borderColor = '#dc3545';
            errors.push('Please enter a valid email address');
        }

        // Phone validation
        const phone = document.getElementById('sellerPhone').value;
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (phone && !phoneRegex.test(phone)) {
            isValid = false;
            document.getElementById('sellerPhone').style.borderColor = '#dc3545';
            errors.push('Please enter a valid phone number');
        }

        // Price validation
        const price = parseFloat(document.getElementById('productPrice').value);
        if (price && price <= 0) {
            isValid = false;
            document.getElementById('productPrice').style.borderColor = '#dc3545';
            errors.push('Price must be greater than 0');
        }

        // Quantity validation
        const quantity = parseInt(document.getElementById('quantity').value);
        if (quantity && quantity <= 0) {
            isValid = false;
            document.getElementById('quantity').style.borderColor = '#dc3545';
            errors.push('Quantity must be greater than 0');
        }

        if (!isValid) {
            showNotification('Please fix the following errors: ' + errors.join(', '), 'error');
        }

        return isValid;
    }

    // Get field label for error messages
    function getFieldLabel(fieldId) {
        const labels = {
            'sellerName': 'Seller Name',
            'sellerEmail': 'Email',
            'sellerPhone': 'Phone Number',
            'sellerLocation': 'Location',
            'productName': 'Product Name',
            'productCategory': 'Category',
            'productDescription': 'Product Description',
            'ecoFeatures': 'Eco-Friendly Features',
            'productPrice': 'Price',
            'quantity': 'Quantity',
            'shipping': 'Shipping Options'
        };
        return labels[fieldId] || fieldId;
    }

    // Submit product data
    function submitProduct() {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '🌱 Listing Product...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            seller: {
                name: document.getElementById('sellerName').value.trim(),
                email: document.getElementById('sellerEmail').value.trim(),
                phone: document.getElementById('sellerPhone').value.trim(),
                location: document.getElementById('sellerLocation').value.trim()
            },
            product: {
                name: document.getElementById('productName').value.trim(),
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value.trim(),
                image: document.getElementById('productImage').value.trim() || 'https://via.placeholder.com/300x200?text=Eco+Product',
                ecoFeatures: document.getElementById('ecoFeatures').value.trim(),
                price: parseFloat(document.getElementById('productPrice').value),
                quantity: parseInt(document.getElementById('quantity').value),
                shipping: document.getElementById('shipping').value
            },
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        // Simulate API call
        setTimeout(() => {
            // Store in localStorage (in real app, this would be sent to server)
            const listings = JSON.parse(localStorage.getItem('ecoBazaarListings') || '[]');
            listings.push(formData);
            localStorage.setItem('ecoBazaarListings', JSON.stringify(listings));

            // Show success message
            formWrapper.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });

            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            showNotification('Product listed successfully! 🎉', 'success');
        }, 2000);
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            max-width: 400px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: linear-gradient(135deg, #28a745, #20c997);' : ''}
            ${type === 'error' ? 'background: linear-gradient(135deg, #dc3545, #e74c3c);' : ''}
            ${type === 'info' ? 'background: linear-gradient(135deg, #17a2b8, #6f42c1);' : ''}
        `;

        // Add close button styles
        const closeBtn = notification.querySelector('button');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Real-time validation
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else if (this.value.trim()) {
                this.style.borderColor = '#28a745';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)' && this.value.trim()) {
                this.style.borderColor = '#e0e7e0';
            }
        });
    });

    // Auto-save draft (optional feature)
    let draftTimer;
    sellForm.addEventListener('input', function() {
        clearTimeout(draftTimer);
        draftTimer = setTimeout(saveDraft, 2000);
    });

    function saveDraft() {
        const formData = new FormData(sellForm);
        const draft = {};
        for (let [key, value] of formData.entries()) {
            draft[key] = value;
        }
        localStorage.setItem('ecoBazaarDraft', JSON.stringify(draft));
    }

    // Load draft on page load
    function loadDraft() {
        const draft = localStorage.getItem('ecoBazaarDraft');
        if (draft) {
            const draftData = JSON.parse(draft);
            Object.keys(draftData).forEach(key => {
                const field = document.getElementById(key);
                if (field && draftData[key]) {
                    field.value = draftData[key];
                }
            });
        }
    }

    // Load draft when page loads
    loadDraft();
});

// Function to list another product (called from success message)
function listAnother() {
    const successMessage = document.getElementById('successMessage');
    const formWrapper = document.querySelector('.form-wrapper');
    const sellForm = document.getElementById('sellForm');
    
    successMessage.style.display = 'none';
    formWrapper.style.display = 'block';
    sellForm.reset();
    
    // Clear draft
    localStorage.removeItem('ecoBazaarDraft');
    
    // Scroll to form
    formWrapper.scrollIntoView({ behavior: 'smooth' });
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);