module.exports = {
    fetchData: async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    buildQueryString: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return queryString ? `?${queryString}` : '';
    }
};