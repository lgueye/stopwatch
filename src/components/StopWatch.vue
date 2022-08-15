<template>
  <div>
    {{ displayedDuration }}
    <i class="fa fa-play" @click="play" v-if="running === false" />
    <i class="fa fa-pause" @click="pause" v-if="running === true" />&nbsp;
    <i class="fa fa-refresh" @click="reset" />
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { Duration } from "luxon";

const DURATION_FORMAT = "hh':'mm':'ss";
const REFRESH_FREQUENCY = 1000; // every second (1000)
const DURATION_ZERO = Duration.fromISO("PT0S");

export default {
  name: "StopWatch",
  mounted() {
    this.reset();
  },
  data() {
    return {
      started: null,
      duration: Duration.fromISO(localStorage.getItem("stored-duration")),
      running: false,
      timer: null,
      displayedDuration: Duration.fromISO(
        localStorage.getItem("stored-duration")
      ).toFormat(DURATION_FORMAT),
    };
  },
  methods: {
    play() {
      this.running = true;
      this.started = DateTime.now();
      this.timer = setInterval(this.updateDuration, REFRESH_FREQUENCY);
    },
    pause() {
      this.running = false;
      this.storeDuration(this.duration);
      clearInterval(this.timer);
    },
    reset() {
      this.running = false;
      clearInterval(this.timer);
      this.duration = DURATION_ZERO;
      this.storeDuration(this.duration);
      this.displayedDuration = this.duration.toFormat(DURATION_FORMAT);
    },
    updateDuration() {
      this.duration = Duration.fromISO(this.getStoredDuration()).plus(
        DateTime.now().diff(this.started)
      );
      this.displayedDuration = this.duration.toFormat(DURATION_FORMAT);
    },
    getStoredDuration() {
      return localStorage.getItem("stored-duration")
        ? localStorage.getItem("stored-duration")
        : DURATION_ZERO;
    },
    storeDuration(duration) {
      localStorage.setItem("stored-duration", duration.toISO());
    },
  },
};
</script>
