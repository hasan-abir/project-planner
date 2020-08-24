<template>
  <div class="project">
    <h3>{{project.title}}</h3>
    <div class="divider"></div>
    <router-link :to="'/manage/'+project.id">Open Project</router-link>
  </div>
</template>

<script>
export default {
  name: "Project",
  props: ["project"],
};
</script>

<style scoped>
@import "../../assets/style.css";

.project {
  border: 1px solid var(--borderColor);
  margin: var(--spacehalf);
  text-align: center;
  max-width: 250px;
  width: 100%;
  padding: var(--space2);
  border-radius: var(--roundLg);
}

h3 {
  font-weight: 400;
}

a {
  width: 100%;
  display: block;
  background: var(--primary);
  color: var(--light);
  text-decoration: none;
  padding: var(--spacehalf) var(--space1);
  text-transform: uppercase;
  border-radius: var(--round);
  font-size: var(--sizeSm);
}
</style>