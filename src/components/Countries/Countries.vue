<template>
<!---------------- NavBar ---------------->
  <div class="navBar">
    <div class="innerNavBar">
      <select class="regionSelector" @change="regionSearch($event)">
        <option>All</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
        <option>Polar</option>
      </select>
    </div>
    <div class="innerNavBar">
      <img src="https://i.pinimg.com/originals/8b/63/da/8b63dada06707627f15789fb14890aa0.png" height="80" width="150" />
    </div>
    <div class="innerNavBar">
      <input class="searchBar" type="text" @input="searchCountry($event)" placeholder='Search for a Country' />
    </div>

  <div class="innerConfig">
    <button class="paginationButtons" @click="previousPage" :disabled='isFirstPage'>Previous Page</button>
  </div>
  <div class="innerConfig">
    <select class="sortBy" @change="sortBy">
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Most Population</option>
        <option>Least Population</option>
      </select>
  </div>
  <div class="innerConfig">
    <button class="paginationButtons" @click="nextPage" :disabled='isLastPage'>Next Page</button>
  </div>
  </div>
<!---------------- NavBar ---------------->

<!---------------- Countries Grid ---------------->
  <div className="grid-container">
    <!---------------- Countries Map ---------------->
    <div v-for="countries in country" :key="countries.alpha3Code" className="countryCardGrid">
      <div className="countryCard">
        <div>
          <img alt="flag" :src=countries.flag width='200' height='125' /> 
        </div>
        <div className="cardName">
          {{countries.name}}
        </div>
        <div className="cardRegion">
          Region: {{countries.region}}
        </div>
        <div>
          <button class="openPopup" @click="setCountryId(countries.alpha3Code)">Learn More</button>
        </div>
      </div>
    </div>
    <!---------------- Countries Map ---------------->

    <!---------------- PopUp with Details ---------------->
    <Popup class="modal" v-if="modal"> 
      <div class="details" v-for="detail in countryDetail" :key="detail.alpha3Code">
        <div className="cardFlagDetail"><img className="cardFlagImgDetail" alt="" :src=detail.flag width='450' height='250' /> </div>
        <div className="cardNameDetail">{{detail.name}} - ({{detail.alpha3Code}})</div>
        <div className="cardCapitalDetail">Capital: {{ detail.capital }}</div>
        <div className="cardRegionDetail">Region: {{detail.subregion}} - ({{ detail.region}})</div>
        <div className="cardPopulationDetail">Population: {{detail.population}}</div>
        <div className="cardAreaDetail">Area: {{detail.area}} km²</div>    
        <button class="closePopup" @click="modal = false">Close</button>
      </div>
    </Popup>
    <!---------------- PopUp with Details ---------------->

  </div>
<!---------------- Countries Grid ---------------->
</template>

<script>

export default {
  name: 'Countries',

  data: () => ({
    country: '',
    disabled: false,
    countryDetail: '',
    modal: false
  }),

  computed: {
    country() {
      return this.$store.getters.getCountries
    },
    isLastPage() {
      let page = this.$store.state.page + 1
      let totalCountries = this.$store.state.countries.length / this.$store.state.size 
      totalCountries = Math.ceil(totalCountries)
      if(page == totalCountries){
        this.disabled = true
        return this.disabled
      }
    },
    isFirstPage() {
      let page = this.$store.state.page + 1
      if(page === 1){
        this.disabled = true
        return this.disabled
      }
    },
    countryDetail(){
      // console.log(this.$route.params.id)
      return this.$store.getters.getCountryDetails
    }
  },
  
  methods: {
    regionSearch(event) {
      this.region = event.target.value
      this.$store.dispatch("setCountriesByRegion", this.region)
    },
    setCountryDetail(data) {
      this.$store.commit('setCountryDetail', data);
    },
    searchCountry(event) {
      this.$store.dispatch('searchCountry', event.target.value)
    },
    nextPage() {
      this.$store.commit('nextPage')
    },
    previousPage() {
      this.$store.commit('previousPage')
    },
    setCountryId(alpha3Code) {
      this.$store.commit('details', alpha3Code)
      this.modal = !this.modal
      this.countryDetail = this.$store.getters.getCountryDetails
      
      console.log(this.countryDetail)
    },
    sortBy(event) {
      console.log(event.target.value)
      this.$store.dispatch("sortBy", event.target.value)
    }
    
  }
}
</script>

<style scoped src="./Countries.css"></style>
