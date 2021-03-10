<template>
  <div class="monthView">
    <div class="header">
      <router-link class="link" :to="{ name: 'MonthView', params: {month: previous.month, year: previous.year}}">Last</router-link>
      <h2>{{ getNameOfMonth($route.params.month)}} {{ $route.params.year }}</h2>
      <router-link class="link" :to="{ name: 'MonthView', params: {month: next.month, year: next.year}}">Next</router-link>
    </div>
    <div class="table">
      <div class="headings">
        <div class="column" v-for="dayName in dayNames" :key="dayName">{{dayName}}</div>
      </div>
      <div class="row"
        v-for="(row, rowIndex) in monthArray"
        :key="`row_${rowIndex}`"
      >
        <div class="column"
          v-for="(col, colIndex) in row"
          :key="`row_${rowIndex}_col${colIndex}`"
        >
          <Cell 
            :dayNumber="monthArray[rowIndex][colIndex]"
            :dayEvents="eventsByDayNumber(monthArray[rowIndex][colIndex])"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import helpers from "@/mixins/helpers";

import Cell from "@/components/Cell";
export default {
  name: "Month",
  components: { Cell, RotateSquare2 },
  mixins: [helpers],
  data() {
    return {
      calendarMonthArray: [],
      events: []
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
    monthArray: function() {
      const monthNumber = this.$route.params.month - 1;
      const year = this.$route.params.year;
      return this.getCalendarMonthArray(monthNumber, year);
    },
    dayNames: function() {
      return this.getDayNamesFull();
    },
    next: function() {
      return this.getNextMonthYear(parseInt(this.$route.params.month), parseInt(this.$route.params.year));
    },
    previous: function() {
      return this.getPreviousMonthYear(parseInt(this.$route.params.month), parseInt(this.$route.params.year));
    },    
  },
  methods: {
    ...mapActions(['setIsLoading', 'setLoadingErrorMessage', 'clearLoadingErrorMessage']),
    eventsByDayNumber: function(dayNumber) {
      return this.events.filter((e) => e.date.day === dayNumber);
    },
    fetchEvents: function() {
      this.setIsLoading(true);
      this.clearLoadingErrorMessage();
      const url = `/api/events?date.month=${this.$route.params.month}&date.year=${this.$route.params.year}`
      axios.get(url)
        .then(res => this.events = res.data)
        .catch(err => this.setLoadingErrorMessage(err))
        .finally(() => this.setIsLoading(false));
    }
  },
  mounted: function() {
    // console.log(this.$route.params);
  },
  created: function() {
   this.fetchEvents();
  },
  watch: {
    $route(to, from) {
      this.events = [];
      this.fetchEvents();
    }
  }
};
</script>

<style scoped>
.monthView {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table {
  display: flex;
  flex-direction: column;
}
.column {
  flex-basis: 0;
  flex-grow: 1;
  border: 1px solid white;
}
.row, .headings {
  display: flex;
  border-bottom: 1px solid white;
}
.link {
  font-size: 12px;
  text-transform: uppercase;
}
</style>
