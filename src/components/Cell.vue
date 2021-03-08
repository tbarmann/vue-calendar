<template>
  <div v-if="dayNumber" class="day-number cell">
    <div class="date">{{dayNumber}}</div>
    <ul class="event-list">
      <li v-for="event in dayEvents" :key="event.id">{{event.time}} {{event.name}}</li>
    </ul>
  </div>
  <div v-else class="blank cell"></div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    dayNumber: Number,
    dayEvents: Array
  }
}
</script>

<style scoped>
  .cell {
    min-height: 160px;
    display: flex;
    flex-direction: column;
    padding: 3px;
  }
  .blank {
    background-color: #EFEFEF;
  }
  .day-number {
    background-color: lightblue;
  }
  .date {
    align-self: flex-end;
  }
  .event-list {
    align-self: flex-start;
    list-style-type: none;
    padding-left: 0
  }
  .event-list li {
    display: flex;
    align-self: flex-start;
    font-size: 12px;
    overflow: hidden;
    text-align: left;
  }
</style>