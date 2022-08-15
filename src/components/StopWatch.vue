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

export default {
  name: "StopWatch",
  mounted() {
    this.reset();
  },
  data() {
    return {
      started: null,
      duration: null,
      running: false,
      timer: null,
      displayedDuration: Duration.fromISO("PT0S").toFormat(
        "hh 'h' mm 'm' ss 's'"
      ),
    };
  },
  methods: {
    play() {
      this.running = true;
      this.started = DateTime.now();
      this.timer = setInterval(this.updateDuration, 1000);
    },
    pause() {
      this.running = false;
      this.storeDuration(this.duration);
      clearInterval(this.timer);
    },
    reset() {
      this.running = false;
      clearInterval(this.timer);
      this.duration = Duration.fromISO("PT0S");
      this.storeDuration(this.duration);
      this.displayedDuration = Duration.fromObject({ seconds: 0 }).toFormat(
        "hh 'h' mm 'm' ss 's'"
      );
    },
    updateDuration() {
      this.duration = Duration.fromISO(this.getStoredDuration()).plus(
        DateTime.now().diff(this.started)
      );
      this.displayedDuration = this.duration.toFormat("hh 'h' mm 'm' ss 's'");
    },
    getStoredDuration() {
      return localStorage.getItem("stored-duration")
        ? localStorage.getItem("stored-duration")
        : Duration.fromISO("PT0S");
    },
    storeDuration(duration) {
      localStorage.getItem("stored-duration");
      localStorage.setItem("stored-duration", duration.toISO());
    },
  },
};
</script>
