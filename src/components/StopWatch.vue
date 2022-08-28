<template>
  <div>
    <p class="stopwatch">
      {{ displayedDuration }}
      <span @click="play" v-if="running === false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-play-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
          />
        </svg>
      </span>
      <span @click="pause" v-if="running === true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-pause-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
          />
        </svg>
      </span>
      <span viewBox="0 0 16 16" @click="reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          class="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
          />
          <path
            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
          />
        </svg>
      </span>
    </p>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { Duration } from "luxon";

const DURATION_FORMAT = "hh':'mm':'ss";
const REFRESH_FREQUENCY = 1000; // every second (1000 ms)
const DURATION_ZERO = Duration.fromISO("PT0S");

export default {
  name: "StopWatch",
  mounted() {
    this.duration = this.getStoredDuration();
    this.displayedDuration = Duration.fromISO(this.duration).toFormat(
      DURATION_FORMAT
    );
  },
  beforeUnmount() {
    if (this.duration) this.storeDuration(this.duration);
    this.running = false;
    clearInterval(this.timer);
  },
  data() {
    return {
      started: null,
      duration: null,
      running: false,
      timer: null,
      displayedDuration: null,
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
        ? Duration.fromISO(localStorage.getItem("stored-duration"))
        : DURATION_ZERO;
    },
    storeDuration(duration) {
      localStorage.setItem("stored-duration", duration.toISO());
    },
  },
};
</script>
<style scoped>
.stopwatch {
  font-size: 1rem;
}
</style>
