const fs = require('fs'),
   FormData = require('form-data'),
   axios = require('axios'),
   md5 = require('md5'),
   env = require('./env.json')

// API credentials
const apiId = env.vipa.api_id;
const apiKey = env.vipa.api_key;
const apiUrl = env.vipa.url + '/api/game-feature';
const vipaRole = env.vipa.role

// Function to generate the API sign
function calculateSign(apiId, apiKey) {
  return md5(apiId + apiKey);
}

// Function to check transaction status
Scrape.checkTransactionStatus = async (trxid) => {
  const sign = calculateSign(apiId, apiKey);

  const form = new FormData();
  form.append('key', apiKey);
  form.append('sign', sign);
  form.append('type', 'status');
  form.append('trxid', trxid);

  try {
    const response = await axios.post(apiUrl, form, {
      headers: form.getHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('{ SlrmyApi } 🔐 Error checking transaction status:', error);
    throw '{ SlrmyApi } 🔐 Fecthing Error To Connect SlrmyApi!';
  }
}

Scrape.fetchGameList = async (title) => {
  const sign = calculateSign(apiId, apiKey);

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('sign', sign);
  formData.append('type', 'services');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();
    return result.data.filter(item => item.game === title);
  } catch (error) {
    console.error('Error fetching game list:', error);
    throw '{ SlrmyApi } 🔐 Error';
  }
}

Scrape.getUniqueCheapestProducts = async (productList) => {
  return productList.reduce((acc, curr) => {
    const existingItem = acc.find(item => item.name === curr.name && item.status === 'available');
    if (!existingItem) {
      // If item with same name doesn't exist, add current item
      acc.push(curr);
    } else if (existingItem.price[vipaRole] > curr.price[vipaRole]) {
      // If current item has a lower price, replace the existing item
      acc = acc.map(item => (item.name === curr.name ? curr : item));
    }
    return acc;
  }, []);
}

Scrape.fetchSosmedList = async () => {
  const sign = calculateSign(apiId, apiKey);

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('sign', sign);
  formData.append('type', 'services');
  formData.append('filter_type', 'game');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();
    if (!result.data || !Array.isArray(result.data)) {
      throw '{ SlrmyApi } 🔐 Data category not found';
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching category list:', error);
    throw '{ SlrmyApi } 🔐 Error Fetching Category!';
  }
}

Scrape.fetchGameDetail = async (game, name) => {
  const sign = calculateSign(apiId, apiKey);

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('sign', sign);
  formData.append('type', 'services');
  formData.append('filter_type', 'game');

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();
    // Filter item dengan status ✅
    const filteredList = result.data.filter(item => item.game === game && item.name === name && item.status !== 'empty');

    // Jika tidak ada produk yang sesuai
    if (filteredList.length === 0) {
      return [];
    }

    // Cari produk dengan harga terendah
    const lowestPriceProduct = filteredList.reduce((prev, curr) => {
      const prevPrice = prev.price[vipaRole];
      const currPrice = curr.price[vipaRole];
      return currPrice < prevPrice ? curr : prev;
    });

    return [lowestPriceProduct];
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw '{ SlrmyApi } 🔐 Error';
  }
}

Scrape.checkPurchaseStatus = async (trxid) => {
    const sign = md5(apiId + apiKey);

    // Prepare form-data
    const form = new FormData();
    form.append('key', apiKey);
    form.append('sign', sign);
    form.append('type', 'status');

    try {
        const response = await axios.post(apiUrl + '/api/game-feature', form, {
            headers: form.getHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Error checking purchase status:', error);
        throw new Error('{ SlrmyApi } 🔐 Unable to check purchase status');
    }
}