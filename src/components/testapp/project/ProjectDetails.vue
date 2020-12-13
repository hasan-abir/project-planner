<template>
  <div class="project-details">
    <div class="project-header">
      <Columns />
    </div>
  </div>
</template>

<script>
import Columns from "./task/Columns";

export default {
  name: "ProjectDetails",
  components: {
    Columns,
  },
};
</script>

<style scoped>
@import "../../../assets/style.css";

.project-header {
  text-align: center;
}
</style>