document.addEventListener("DOMContentLoaded", function() {
    const currentWeatherInfo = document.getElementById('current-weather-info');
    const destinationWeatherInfo = document.getElementById('destination-weather-info');
    const chatBox = document.getElementById('chat-box');

    let selectedDestination = '';
    let selectedDays = '';
    let selectedGender = '';
    let destinationTemp = '';

    fetch("https://ipinfo.io/json?token=26ab7a8e2100ac")
        .then(response => response.json())
        .then(data => {
            const hostname = data.hostname;
            if (hostname) {
                const parts = hostname.split('.');
                if (parts.length > 1) {
                    const city = parts[1];
                    console.log(`Fetching weather for: ${city}`);
                    fetchWeather(city, currentWeatherInfo, 'current');
                } else {
                    if (currentWeatherInfo) {
                        currentWeatherInfo.textContent = 'Unable to get current city from hostname.';
                    }
                    console.error('City data is not available in hostname.');
                }
            } else {
                if (currentWeatherInfo) {
                    currentWeatherInfo.textContent = 'Unable to get hostname.';
                }
                console.error('Hostname data is not available.');
            }
        })
        .catch(error => {
            if (currentWeatherInfo) {
                currentWeatherInfo.textContent = 'Unable to fetch location data.';
            }
            console.error('Error:', error);
        });

    const tomtomApiUrl = 'https://api.tomtom.com/search/2/search/';
    
    function fetchCitySuggestions(query) {
        const tomtomApiKey="F8TSvdRV7kGFsXu0noKhTTphOjuKJv3G";
        const url = `${tomtomApiUrl}${encodeURIComponent(query)}.json?key=${tomtomApiKey}&typeahead=true&limit=5`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data.results.map(result => result.address.freeformAddress))
            .catch(error => {
                console.error('Error fetching city suggestions:', error);
                return [];
            });
    }

    function fetchWeather(city, element, type) {
        const weatherApiKey = "db1a978d747a81fba12310ed45a49292";
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.weather && data.weather[0]) {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
                    }

                    const capitalizedCity = capitalizeFirstLetter(city);

                    if (type === 'current') {
                        document.getElementById('current-weather-title').textContent = `Current weather in ${capitalizedCity}`;
                        const currentWeatherIcon = document.getElementById('current-weather-icon');
                        const currentTempDiv = document.getElementById('current-temp-div');
                        currentWeatherIcon.src = iconUrl;
                        currentWeatherIcon.alt = weatherDescription;
                        currentWeatherIcon.style.display = 'block';
                        currentTempDiv.textContent = `${Math.round(temperature)}°C`;
                        currentTempDiv.style.display = 'block';
                        document.getElementById('current-weather-info-details').textContent = weatherDescription;
                    } else if (type === 'destination') {
                        destinationTemp = Math.round(temperature);
                        document.getElementById('destination-weather-title').textContent = `Weather in ${city}`;
                        const destinationWeatherIcon = document.getElementById('destination-weather-icon');
                        const destinationTempDiv = document.getElementById('destination-temp-div');
                        destinationWeatherIcon.src = iconUrl;
                        destinationWeatherIcon.alt = weatherDescription;
                        destinationWeatherIcon.style.display = 'block';
                        destinationTempDiv.textContent = `${Math.round(temperature)}°C`;
                        destinationTempDiv.style.display = 'block';
                        document.getElementById('destination-weather-info-details').textContent = weatherDescription;
                    }
                } else {
                    element.textContent = 'Unable to fetch weather data.';
                }
            })
            .catch(error => {
                element.textContent = 'Unable to fetch weather data.';
                console.error('Error:', error);
            });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function clearChat() {
        chatBox.innerHTML = '';
    }

    function addSummaryMessage(city, days, gender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('bot-message');
        messageElement.innerHTML = `
            <div class="bot-icon">
                <img src="images/bot.png" alt="">
            </div>
            <div class="message-text">You're going to ${city} for ${days} day(s), so here is the list for ${gender}:</div>
        `;
        chatBox.appendChild(messageElement);
    }

    setTimeout(() => {
        addBotMessage('Hello! I will help you with the packing on your travel, what city are you going to?');
    }, 1000);

    setTimeout(() => {
        addUserMessageInput('');
    }, 2000);

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('bot-message');
        messageElement.innerHTML = `
            <div class="bot-icon">
                <img src="images/bot.png" alt="">
            </div>
            <div class="message-text">${message}</div>
        `;
        chatBox.appendChild(messageElement);
    }

    function addUserMessageInput(prefix) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `
        <div class="message-text input-message">
            <span>${prefix}</span>
            <input type="text" id="destination-input" placeholder="Enter city" autocomplete="off" />
            <div id="suggestions-container" class="suggestions-container"></div>
        </div>
        <div class="user-icon">
            <img src="images/user.png" alt="">
        </div>
    `;
    chatBox.appendChild(messageElement);
    document.getElementById('destination-input').focus();

    const suggestionsContainer = document.getElementById('suggestions-container');

    document.getElementById('destination-input').addEventListener('input', function(event) {
        const query = event.target.value.trim();
        if (query.length >= 2) {
            fetchCitySuggestions(query).then(suggestions => {
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.add('suggestions');
                suggestions.forEach(suggestion => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = suggestion;
                    suggestionItem.addEventListener('click', () => {
                        const cityName = suggestion.split(',')[0].replace(/\(.*?\)/g, '').trim();
                        document.getElementById('destination-input').value = cityName;
                        suggestionsContainer.innerHTML = '';
                        suggestionsContainer.classList.remove('suggestions');
                        handleDestinationSelection(cityName);
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            });
        } else {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('suggestions');
        }
    });

    document.getElementById('destination-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const destination = capitalizeFirstLetter(event.target.value.trim());
            if (destination) {
                handleDestinationSelection(destination);
            }
        }
    });
}
    
    function handleDestinationSelection(destination) {
        const cityName = destination.split(',')[0].replace(/\(.*?\)/g, '').trim();
        selectedDestination = cityName;
        fetchWeather(destination, destinationWeatherInfo, 'destination');
        addBotMessage('Awesome, for how many days?');
        addUserMessageInputDays('day(s).');
        const suggestionsContainer = document.getElementById('suggestions-container');
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('suggestions');
        }
    }

    function addUserMessageInputDays(suffix) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.innerHTML = `
            <div class="message-text input-message">
                <input type="number" id="days-input" placeholder="" />
                <span>${suffix}</span>
            </div>
            <div class="user-icon">
                <img src="images/user.png" alt="">
            </div>
        `;
        chatBox.appendChild(messageElement);
        document.getElementById('days-input').focus();

        document.getElementById('days-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const days = event.target.value.trim();
                if (days && !isNaN(days) && Number(days) > 0) {
                    selectedDays = days;
                    addBotMessage(`Got it! You're traveling for ${days} days. What is your gender?`);
                    addUserMessageInputGender();
                } else {
                    addBotMessage(`Please enter a valid number of days.`);
                }
                
            }
        });
    }

    function addUserMessageInputGender() {
        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.id = 'gender-selection';
        messageElement.innerHTML = `
            <div class="message-text input-message">
                <button id="male-btn">Male</button>
                <button id="female-btn">Female</button>
            </div>
            <div class="user-icon">
                <img src="images/user.png" alt="">
            </div>
        `;
        chatBox.appendChild(messageElement);

        document.getElementById('male-btn').addEventListener('click', function() {
            addUserGender('Male');
        });

        document.getElementById('female-btn').addEventListener('click', function() {
            addUserGender('Female');
        });
    }

    function addUserGender(gender) {
        selectedGender = gender;

        const genderMessage = document.getElementById('gender-selection');
        if (genderMessage) {
            genderMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.innerHTML = `
            <div class="message-text">${gender}</div>
            <div class="user-icon">
                <img src="images/user.png" alt="">
            </div>
        `;
        chatBox.appendChild(messageElement);

        setTimeout(() => {
            clearChat();
            addBotMessage(`You're going to ${selectedDestination} for ${selectedDays} day(s), so here is the list for ${gender}:`);
            setTimeout(displayPackingList, 1000);
        }, 1000);
    }

    function clearChat() {
        while (chatBox.firstChild) {
            chatBox.removeChild(chatBox.firstChild);
        }
    }

    function displayPackingList() {
        const items = getPackingList(selectedGender, destinationTemp);
        const table = document.createElement('table');
        table.classList.add('packing-list-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Check</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="${item.quantity}" min="1">
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </td>
                        <td>
                            <label class="custom-checkbox">
                                <input type="checkbox" class="item-check">
                                <span class="checkmark"></span>
                            </label>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        chatBox.appendChild(table);

        const quantityControls = table.querySelectorAll('.quantity-control');
        quantityControls.forEach(control => {
            const input = control.querySelector('input[type="number"]');
            const minusBtn = control.querySelector('.minus');
            const plusBtn = control.querySelector('.plus');

            minusBtn.addEventListener('click', () => {
                if (input.value > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                input.value = parseInt(input.value) + 1;
            });
        });

        const checkboxes = table.querySelectorAll('.item-check');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (Array.from(checkboxes).every(cb => cb.checked)) {
                    addBotMessage('Good job! Now you are ready, have a nice trip :)');
                }
            });
        });
}
    
    function getPackingList(gender, temperature) {
        let items = [];
        if (temperature >= 20) {
            items = [
                { name: 'T-shirts', quantity: selectedDays },
                { name: 'Shorts', quantity: Math.ceil(selectedDays / 2) },
                { name: 'Sunglasses', quantity: 1 },
                { name: 'Hat', quantity: 1 },
                { name: 'Swimwear', quantity: 1 }
            ];
        } else {
            items = [
                { name: 'Sweaters', quantity: selectedDays },
                { name: 'Jeans', quantity: Math.ceil(selectedDays / 2) },
                { name: 'Jacket', quantity: 1 },
                { name: 'Scarf', quantity: 1 },
                { name: 'Gloves', quantity: 1 }
            ];
        }
    
        if (gender === 'Female') {
            items.push(
                { name: 'Dresses', quantity: Math.ceil(selectedDays / 2) },
                { name: 'Makeup kit', quantity: 1 }
            );
        } else {
            items.push(
                { name: 'Shaving kit', quantity: 1 }
            );
        }
    
        return items;
    }
});
