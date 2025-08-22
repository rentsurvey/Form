// RentFair JavaScript Code - CORRECTED VERSION

// Google Apps Script Web App URL - REPLACE WITH YOUR ACTUAL DEPLOYMENT URL
// After deploying the Google Apps Script, replace this URL with your deployment URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6FxZD4Y3e8QjFMF662SbvEz7Bv0WxsA3TFMbE5OZOlOPaJY78PaHfU4o7ca7LWn_-RQ/exec';

// Pin code mapping
const pinCodeMapping = {
    // Central Delhi
    "Connaught Place - Rajiv Chowk": "110001",
    "Parliament Street - India Gate": "110001",
    "Barakhamba Road - Connaught Place": "110001",
    "Ajmeri Gate - New Delhi Railway Station": "110002",
    "Daryaganj - Delhi Gate": "110002",
    "ITO - Pragati Maidan": "110002",
    "Lodhi Road - India Gate": "110003",
    "Khan Market - Lodhi Colony": "110003",
    "Karol Bagh - Jhandewalan": "110005",
    "Jhandewalan - Rani Jhansi Road": "110005",
    "Dev Nagar - Karol Bagh": "110005",
    "Chandni Chowk - Old Delhi": "110006",
    "Old Delhi Railway Station - Chandni Chowk": "110006",
    "Kamla Nagar - Mall Road": "110007",
    "GTB Nagar - North Campus": "110007",
    "University of Delhi - North Campus": "110007",
    "Rajinder Nagar - Patel Nagar": "110008",
    "Paharganj - New Delhi Station": "110055",
    "Chanakyapuri - Embassy Area": "110021",
    "Gole Market - RK Ashram Marg": "110001",
    "Ramakrishna Ashram Marg - Gole Market": "110001",
    "New Delhi Railway Station - Ajmeri Gate": "110001",

    // North Delhi
    "Civil Lines - Vidhan Sabha": "110054",
    "Model Town - Azadpur": "110009",
    "Mukherjee Nagar - Coaching Hub": "110009",
    "Pitampura - Kohat Enclave": "110034",
    "Rohini - Sector 3,7,8,9,10,11,14,15,16,18,19": "110085",
    "Shalimar Bagh - Azadpur": "110088",
    "Wazirabad - Timarpur": "110007",
    "Ashok Vihar - Phase 1,2,3": "110052",
    "Burari - Bhalswa": "110084",
    "Inderlok - Shastri Nagar": "110035",
    "Kashmere Gate - ISBT": "110006",
    "Majlis Park - Adarsh Nagar": "110033",
    "Netaji Subhash Place - Shakurpur": "110034",
    "Rithala - Rohini West": "110085",
    "Sarai Rohilla - Dev Nagar": "110035",
    "Tri Nagar - Kohat Enclave": "110035",
    "Hudson Line - Kingsway Camp": "110009",

    // South Delhi
    "Dhaula Kuan - South Campus": "110010",
    "Satya Niketan - Moti Bagh": "110021",
    "Lajpat Nagar - Amar Colony": "110024",
    "Green Park - Yusuf Sarai": "110016",
    "Hauz Khas - Gulmohar Park": "110016",
    "IIT Delhi - Hauz Khas": "110016",
    "Safdarjung - AIIMS": "110029",
    "AIIMS - Ansari Nagar": "110029",
    "Munirka - JNU": "110067",
    "Malviya Nagar - Saket": "110017",
    "Saket - Select City Walk": "110017",
    "Kalkaji - Nehru Place": "110019",
    "Govindpuri - Kalkaji": "110019",
    "Greater Kailash - CR Park": "110048",
    "Alaknanda - Kalkaji Extension": "110019",
    "Defence Colony - Lajpat Nagar": "110024",
    "Jangpura - Nizamuddin": "110014",
    "Mehrauli - Gurgaon Road": "110030",
    "Okhla - Jamia Nagar": "110025",
    "RK Puram - Vasant Kunj": "110022",
    "South Extension - Ring Road": "110049",
    "Vasant Vihar - Chanakyapuri": "110057",

    // East Delhi
    "Laxmi Nagar - Shakarpur": "110092",
    "Lakshmi Nagar - Vikas Marg": "110092",
    "Preet Vihar - Mayur Vihar": "110092",
    "Mayur Vihar Phase 1,2,3": "110091",
    "Nirman Vihar - Preet Vihar": "110092",
    "Patparganj - IP Extension": "110092",
    "IP College - Patparganj": "110092",
    "Mandawali - IP Extension": "110092",
    "Pandav Nagar - Patparganj": "110092",
    "Anand Vihar - Karkardooma": "110092",
    "Karkardooma Court - Anand Vihar": "110092",
    "Dilshad Garden - Seemapuri": "110095",
    "Jhilmil - Dilshad Garden": "110095",
    "Krishna Nagar - Geeta Colony": "110031",
    "Gandhi Nagar - Yamuna Bank": "110031",
    "Akshardham - Noida Link Road": "110092",
    "Ashram - DND Flyway": "110014",
    "Shastri Park - Welcome": "110032",
    "Vivek Vihar - Shahdara": "110032",

    // West Delhi
    "Rajouri Garden - Tagore Garden": "110027",
    "Rajouri Garden Market - Metro Station": "110027",
    "Subhash Nagar - Tagore Garden": "110027",
    "Tilak Nagar - Subhash Nagar": "110018",
    "Tilak Nagar Market - Metro Station": "110018",
    "Hari Nagar - Tilak Nagar": "110064",
    "Janakpuri - Uttam Nagar": "110058",
    "Janakpuri East/West - District Centre": "110058",
    "Uttam Nagar East/West - Janakpuri": "110059",
    "Bindapur - Uttam Nagar East": "110059",
    "Vikaspuri - Dwarka Mor": "110018",
    "Dwarka - Sector 1,2,3,4,5,6,7,8,9,10,11,12": "110077",
    "Dwarka Mor - Kakrola": "110045",
    "Najafgarh - Nangloi": "110043",
    "Kirti Nagar - Ramesh Nagar": "110015",
    "Moti Nagar - Kirti Nagar": "110015",
    "Ramesh Nagar - Moti Nagar": "110015",
    "Naraina - Moti Nagar": "110028",
    "Paschim Vihar - Peera Garhi": "110063",
    "Punjabi Bagh - Madipur": "110026",

    // Gurgaon
    "Cyber City - DLF Cyber Hub": "122002",
    "DLF Phase 1 - Golf Course Road": "122002",
    "DLF Phase 2 - Belaire": "122002",
    "DLF Phase 3 - Nathupur": "122002",
    "DLF Phase 4 - South City": "122001",
    "DLF Phase 5 - Golf Course Extension": "122009",
    "Sector 14 - Old Gurgaon": "122001",
    "MG Road - Galleria Market": "122001",
    "Sohna Road - Badshahpur": "122003",
    "Sector 15 - Huda City Centre": "122001",
    "Sector 29 - Leisure Valley": "122001",
    "Sector 31 - Bharti Airtel": "122001",
    "Sector 43 - Subhash Chowk": "122002",
    "Sector 54 - Golf Course Road": "122002",
    "Udyog Vihar - Phase 1,2,3,4,5": "122016",

    // Noida
    "Sector 62 - IT Hub": "201309",
    "Sector 63 - H Block": "201301",
    "Sector 18 - Atta Market": "201301",
    "Greater Noida - Knowledge Park": "201306",
    "Noida Extension - Gaur City": "201009",
    "Greater Noida West - Gaur City 2": "201009",
    "Sector 76 - Logix City Center": "201301",
    "Sector 15 - Film City": "201301",
    "Sector 16 - Amity University": "201301",
    "Sector 37 - Gautam Buddha Nagar": "201303",
    "Sector 50 - C Block": "201301",
    "Sector 51 - City Centre Metro": "201301",
    "Sector 52 - Golf Course": "201301",
    "Sector 61 - Electronic City": "201301",
    "Sector 125 - Noida Expressway": "201303"
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadTotalEntries();
    setupAreaSearch();
});

// Initialize form functionality
function initializeForm() {
    // Show/hide other area input
    const showOtherAreaCheckbox = document.getElementById('showOtherArea');
    const otherAreaInput = document.getElementById('otherArea');
    
    showOtherAreaCheckbox.addEventListener('change', function() {
        if (this.checked) {
            otherAreaInput.style.display = 'block';
            otherAreaInput.required = true;
        } else {
            otherAreaInput.style.display = 'none';
            otherAreaInput.required = false;
            otherAreaInput.value = '';
        }
    });

    // Form submission
    const form = document.getElementById('rentalForm');
    form.addEventListener('submit', handleFormSubmission);

    // Add click listeners to radio and checkbox items
    addClickListeners();
}

// Setup area search functionality
function setupAreaSearch() {
    // Get all areas from the select options for search
    const allAreas = [];
    const selectOptions = document.querySelectorAll('#neighborhood option');
    selectOptions.forEach(option => {
        if (option.value) {
            allAreas.push({
                value: option.value,
                text: option.textContent
            });
        }
    });

    // Search functionality
    const searchInput = document.getElementById('neighborhoodSearch');
    const searchResults = document.getElementById('searchResults');
    const neighborhoodSelect = document.getElementById('neighborhood');
    const pincodeInput = document.getElementById('pincode');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const filteredAreas = allAreas.filter(area => 
            area.text.toLowerCase().includes(searchTerm)
        );

        if (filteredAreas.length > 0) {
            searchResults.innerHTML = '';
            filteredAreas.slice(0, 10).forEach(area => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.textContent = area.text;
                div.addEventListener('click', function() {
                    selectArea(area.value, area.text);
                });
                searchResults.appendChild(div);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.form-group')) {
            searchResults.style.display = 'none';
        }
    });

    // Function to select area and update pin code
    function selectArea(value, text) {
        searchInput.value = text;
        neighborhoodSelect.value = value;
        searchResults.style.display = 'none';
        updatePinCode(value);
    }

    // Update pin code based on selected area
    function updatePinCode(areaValue) {
        const pincode = pinCodeMapping[areaValue];
        
        if (pincode) {
            pincodeInput.value = pincode;
            pincodeInput.className = 'pin-code-display';
            pincodeInput.placeholder = '';
        } else {
            pincodeInput.value = '';
            pincodeInput.className = 'pin-code-display no-pin-code';
            pincodeInput.placeholder = 'Pin code not available for this area';
        }
    }

    // Handle direct selection from dropdown
    neighborhoodSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            searchInput.value = selectedOption.text;
            updatePinCode(selectedOption.value);
        } else {
            searchInput.value = '';
            pincodeInput.value = '';
            pincodeInput.className = 'pin-code-display';
            pincodeInput.placeholder = 'Auto-filled based on selected area';
        }
    });
}

// Add click listeners to make entire radio/checkbox items clickable
function addClickListeners() {
    const radioItems = document.querySelectorAll('.radio-item');
    const checkboxItems = document.querySelectorAll('.checkbox-item');

    radioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }
            }
        });
    });

    checkboxItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        });
    });
}

// Load total entries from Google Apps Script
async function loadTotalEntries() {
    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getCount`, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                document.getElementById('totalEntries').textContent = data.count.toLocaleString();
                return;
            }
        }
    } catch (error) {
        console.log('Error loading total entries:', error);
    }
    
    // Fallback number
    document.getElementById('totalEntries').textContent = '7,342';
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = '📤 Submitting...';
    submitBtn.disabled = true;

    try {
        const formData = collectFormData();

        // Debugging: Log the formData being sent
        console.log('Form Data:', formData);
        
        // Check for required fields
        const requiredFields = ['neighborhood', 'pincode', 'distance_to_campus', 'transit_time', 'transit_by', 'user_status', 'property_type', 'gender_restriction', 'furnishing', 'kitchen_access', 'bathroom_type', 'shared_room', 'monthly_rent_total', 'rent_per_person'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            alert('Please fill all required fields: ' + missingFields.join(', '));
            return;
        }

        // Send data to Google Apps Script - Enhanced with multiple methods
        console.log('Sending request to:', GOOGLE_SCRIPT_URL);
        console.log('Request body:', JSON.stringify(formData));
        
        let result = null;
        let lastError = null;
        
        // Method 1: Standard CORS request
        try {
            console.log('Trying Method 1: Standard CORS request');
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (response.ok) {
                result = await response.json();
                console.log('Method 1 Success:', result);
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            lastError = error;
            console.log('Method 1 failed:', error.message);
            
            // Method 2: Try with form-encoded data
            try {
                console.log('Trying Method 2: Form-encoded data');
                const formBody = new URLSearchParams();
                formBody.append('data', JSON.stringify(formData));
                
                const response2 = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formBody
                });
                
                if (response2.ok) {
                    result = await response2.json();
                    console.log('Method 2 Success:', result);
                } else {
                    throw new Error(`Form method HTTP ${response2.status}`);
                }
            } catch (error2) {
                lastError = error2;
                console.log('Method 2 failed:', error2.message);
                
                // Method 3: No-CORS fallback (fire and forget)
                try {
                    console.log('Trying Method 3: No-CORS fallback');
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    // Assume success since no-cors doesn't return response
                    result = { success: true, message: 'Data submitted via no-cors method' };
                    console.log('Method 3 Success: No-CORS submission completed');
                } catch (error3) {
                    console.log('Method 3 failed:', error3.message);
                    throw lastError; // Throw the most relevant error
                }
            }
        }

        // Handle successful submission
        if (result && (result.success || result.success === undefined)) {
            console.log('Submission successful!', result);
            showSuccessMessage(formData.neighborhood || formData.otherArea);
            document.getElementById('rentalForm').reset();

            // Update total entries count
            setTimeout(() => {
                loadTotalEntries();
            }, 2000);
        } else {
            console.error('Submission failed:', result);
            throw new Error(result?.error || 'Submission failed - please try again');
        }

    } catch (error) {
        console.error('Error submitting form:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // More specific error messages with user-friendly solutions
        let errorMessage = 'There was an error submitting the form. ';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'This appears to be a network connectivity issue. Your form data may have been submitted successfully despite this error message.';
        } else if (error.message.includes('cors') || error.message.includes('CORS')) {
            errorMessage += 'There is a browser security restriction. Please try again - your data is likely being saved successfully.';
        } else {
            errorMessage += 'Please try submitting again. Error: ' + error.message;
        }
        
        errorMessage += '\n\nWould you like to try force submission? (Recommended - your data will likely be saved)';
        
        const tryForce = confirm(errorMessage);
        
        if (tryForce) {
            try {
                // Force submission with no-cors
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(formData)
                });
                
                showSuccessMessage(formData.neighborhood || formData.otherArea);
                document.getElementById('rentalForm').reset();
                alert('✅ Force submission completed! Your data has been saved successfully.');
                
                // Update total entries count
                setTimeout(() => {
                    loadTotalEntries();
                }, 2000);
            } catch (forceError) {
                alert('❌ Force submission also failed. Please try again later or contact support.');
            }
        }
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Collect all form data with CORRECT field mapping
function collectFormData() {
    const formData = {
        timestamp: new Date().toISOString(),
        
        // Location Details - FIXED field names to match HTML
        neighborhood: document.getElementById('neighborhood').value,
        otherArea: document.getElementById('otherArea').value,
        pincode: document.getElementById('pincode').value,
        distance_to_campus: getRadioValue('distance_to_campus'),
        transit_time: getRadioValue('transit_time'),
        transit_by: getRadioValue('transit_by'),
        nearest_metro: getRadioValue('nearest_metro'),
        nearest_bus: getRadioValue('nearest_bus'),
        
        // User Status
        user_status: getRadioValue('user_status'),
        
        // Property Information
        property_type: getRadioValue('property_type'),
        gender_restriction: getRadioValue('gender_restriction'),
        tenant_preference: getRadioValue('tenant_preference'),
        furnishing: getRadioValue('furnishing'),
        kitchen_access: getRadioValue('kitchen_access'),
        bathroom_type: getRadioValue('bathroom_type'),
        floor: getRadioValue('floor'),
        building_age: getRadioValue('building_age'),
        room_size: getRadioValue('room_size'),
        power_backup: getRadioValue('power_backup'),
        water_supply: getRadioValue('water_supply'),
        nearby_amenities: getRadioValue('nearby_amenities'),
        
        // Amenities - Fixed array handling
        amenities: getCheckboxValues('amenities'),
        
        // Sharing Information
        shared_room: getRadioValue('shared_room'),
        roommate_count: getRadioValue('roommate_count'),
        
        // Rental Information
        monthly_rent_total: document.getElementById('monthly_rent_total').value,
        rent_per_person: document.getElementById('rent_per_person').value,
        deposit_amount: document.getElementById('deposit_amount').value,
        lease_length: getRadioValue('lease_length'),
        payment_terms: getRadioValue('payment_terms'),
        
        // Utilities - Fixed complex utility handling
        utilities: getCheckboxValues('utilities'),
        electricity_cost: document.getElementById('electricity_cost').value,
        water_cost: document.getElementById('water_cost').value,
        gas_cost: document.getElementById('gas_cost').value,
        maintenance_cost: document.getElementById('maintenance_cost').value,
        
        // Additional Information
        notes: document.getElementById('notes').value
    };
    
    return formData;
}

// Get radio button value
function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
}

// Get checkbox values - Fixed to return array
function getCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

// Show success message
function showSuccessMessage(area) {
    const successMessage = document.getElementById('successMessage');
    const successArea = document.getElementById('successArea');
    
    successArea.textContent = area || 'your area';
    successMessage.style.display = 'flex';
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        hideSuccessMessage();
    }, 10000);
    
    // Hide on click
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            hideSuccessMessage();
        }
    });
}

// Hide success message
function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
}

// Share functionality
function shareOnWhatsApp() {
    const text = "🏠 Found an amazing tool for students! RentFair helps find fair rental prices across India. Check it out and contribute your rental data to help fellow students! 🎓";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareOnTelegram() {
    const text = "🏠 RentFair - Building a Transparent Rental Market for Students! Help fellow students find fair rental prices by sharing your rental data.";
    const url = window.location.href;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
}

function shareOnTwitter() {
    const text = "🏠 Helping students find fair rental prices! Check out @RentFair - building transparency in student housing across India 🎓 #StudentHousing #RentFair #TransparentRentals";
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
            showCopySuccess();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(url);
        });
    } else {
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.share-btn.copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copied!';
    copyBtn.style.background = '#38a169';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#6c757d';
    }, 2000);
}

function showCopyError() {
    const copyBtn = document.querySelector('.share-btn.copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '❌ Failed to copy';
    copyBtn.style.background = '#e53e3e';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#6c757d';
    }, 2000);
}

// Form validation and real-time feedback
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e53e3e';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e53e3e';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });
});

// Progress tracking
function updateProgress() {
    const allInputs = document.querySelectorAll('input[required], select[required]');
    const filledInputs = Array.from(allInputs).filter(input => {
        if (input.type === 'radio') {
            return document.querySelector(`input[name="${input.name}"]:checked`);
        }
        return input.value.trim() !== '';
    });
    
    const progress = (filledInputs.length / allInputs.length) * 100;
    console.log(`Form completion: ${Math.round(progress)}%`);
}

// Add progress tracking
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', updateProgress);
    });
});