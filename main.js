const map = L.map("map").setView([0, 0], 3);
    map.setMinZoom(2.5);
    map.setMaxZoom(20);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        className: 'dark',
        attribution : "@openstreetmap, @Sathwik Nayak"
    }).addTo(map);

    fetch("nasa.json")
        .then(response => {
            if (!response.ok) {
                console.log("COuldn't fetch the data from the json file")
            }
            return response.json();
        })
        .then(nasa => {
            for (let i = 0; i <=nasa.length; i++) {
                const latitude = nasa[i].latitude; 
                const longitude = nasa[i].longitude; 
                let circle = L.circle([latitude, longitude], {
                    color: "red",
                    fillColor: "blue",
                    fillOpacity: 0.8,  
                    radius: 1000
                }).addTo(map);
                circle.bindPopup(`Country : ${nasa[i].country}<br> County Code: ${nasa[i].iso3}<br>ID: ${nasa[i].id}<br> Geolocation: ${nasa[i].gelocation} <br> Historical Event: ${nasa[i].historical} <br> Disaster Type: ${nasa[i].disastertype} <br> Disaster Year: ${nasa[i].year} <br> DIsaster Level: ${nasa[i].level}<br> Administrative Division: ${nasa[i].adm1} <br> Estimated Death Count: ${nasa[i].estimated_death_count}`);
            }
        })
        .catch(error => {
            console.error('Error fetching nasa.json:', error);
        });
