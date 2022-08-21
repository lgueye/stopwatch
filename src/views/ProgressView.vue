<template>
  <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col" colspan="4">Challenge: 3 hearts master mode</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Progress</td>
        <td>000 %</td>
        <td>
          <StopWatch />
        </td>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
            />
          </svg>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import StopWatch from "@/components/StopWatch.vue";
export default {
  name: "ProgressView",
  components: { StopWatch },
};
</script>
