<template>
  <div class="actions">
    <p>Move to</p>
    <button class="status-btn">In Progress</button>
    <button class="status-btn">Done</button>
    <div class="divider"></div>
    <button class="error">Remove task</button>
  </div>
</template>

<script>
export default {
  name: "TaskActions",
};
</script>

<style scoped>
@import "../../../assets/style.css";

.actions {
  font-size: var(--sizeSm);
}

p {
  text-align: center;
  font-weight: bold;
  margin-bottom: var(--space1);
}

.divider {
  margin-top: var(--spacehalf);
  margin-bottom: var(--space1);
}

.status-btn {
  margin-bottom: var(--spacehalf);
  background: none;
}

button {
  display: block;
  width: 100%;
  padding: var(--spacehalf);
  font-size: var(--sizeSm);
}
</style>