self.addEventListener('message', (event) => {
    // Check if the event is a message we are interested in
    if (event.data && event.data.type === 'FETCH_DATA') {
      event.waitUntil(
        fetchSomeData().then((data) => {
          // Respond back with the data
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({ type: 'DATA', data: data });
            });
          });
        }).catch((error) => {
          console.error('Error fetching data:', error);
        })
      );
    }
  });
  
  // Example function to fetch some data
  async function fetchSomeData() {
    // Simulate a network request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Fetched Data');
      }, 1000);
    });
  }
  