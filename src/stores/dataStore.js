import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    categories_total: null,
    transactions: [],
    transactions_total: null,
    items: [],
    errorCode: "",
    errorMessage: "",
  }),
  actions: {
    async create_category(formData) {
      this.errorMessage = "";
      try {
        const response = await axios.post(backendUrl + '/category', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          },
        });
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    },
    async get_categories(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/categories', {
          params: {
            page: page,
            perpage: perpage
          },
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        this.categories = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_categories_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/categories_total', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        this.categories_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_transactions(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/transactions', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.transactions = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_transactions_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/transactions_total');
        this.transactions_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
  },
});

