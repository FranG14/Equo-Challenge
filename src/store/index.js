import axios from 'axios'
import { createStore } from 'vuex'

const allCountriesUrl = "https://restcountries.eu/rest/v2/all"
// const headers = {Accept: 'application/json'}

export default createStore({

  state: {
    countries: "",
    allCountries: "",
    countryDetails: "",
    searchCountry: "",
    page: 0,
    size: 10,
    alpha3Code: ""
  },

  mutations: {
    setCountries(state, payload) {
      state.countries = payload;
      state.allCountries = payload;
      state.page = 0
    },
    setCountryDetail(state, payload) {
      state.countryDetails = payload;
    },
    searchCountry(state, countryName) {
      let country = countryName.toLowerCase();
      state.countries = state.countries.filter(e =>
        e.name.toLowerCase().includes(country)
      );
      state.page = 0
    },
    nextPage(state) {
      state.page++;
    },
    previousPage(state) {
      state.page--;
    },
    details(state, payload) {
      state.alpha3Code = payload;
      state.countryDetails = state.countries.filter(
        e => e.alpha3Code === state.alpha3Code
      );
    },
    filterByRegion(state, region) {
      state.countries = state.allCountries;
      state.countries = state.countries.filter(e => e.region === region);
    },
    sortAtoZ(state) {
      state.countries = state.countries.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    sortZtoA(state) {
      state.countries = state.countries.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    },
    sortMostPopulation(state, payload) {
      state.countries = state.countries.sort((a, b) => b.population - a.population);
    },
    sortLeastPopulation(state, payload) {
      state.countries = state.countries.sort((a, b) => a.population - b.population);
    }
  },

  actions: {
    setCountries({ commit }) {
      axios
        .get(allCountriesUrl)
        .then(response => response.data)
        .then(countries => {
          console.log("entra mal");
          commit("setCountries", countries);
        });
    },
    setCountriesByRegion({ commit }, region) {
      console.log(region);
      if (region !== "All") {
        commit("filterByRegion", region);
      } else {
        axios
          .get(allCountriesUrl)
          .then(response => response.data)
          .then(countries => {
            console.log("entra mal");
            commit("setCountries", countries);
          });
      }
    },
    searchCountry({ commit }, countryName) {
      if (countryName === "") {
        axios
          .get(allCountriesUrl)
          .then(response => response.data)
          .then(countries => {
            commit("setCountries", countries);
          });
      }
      commit("searchCountry", countryName);
    },
    sortBy({ commit }, option) {
      console.log(option);
      if (option === "A-Z") {
        commit("sortAtoZ");
      }
      if (option === "Z-A") {
        commit("sortZtoA");
      }
      if (option === "Least Population") {
        commit("sortLeastPopulation");
      }
      if (option === "Most Population") {
        commit("sortMostPopulation");
      }
    }
  },

  getters: {
    getCountries: state => {
      return state.countries.slice(
        state.page * state.size,
        state.page * state.size + state.size
      );
    },
    getCountryDetails: state => {
      return state.countryDetails;
    }
  }

});
