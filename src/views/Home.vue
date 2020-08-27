<template>
  <div class="wrapper container">
    <div class="header">
      <h1>Project Planner</h1>
      <h3>A Github projects manager clone</h3>
      <router-link to="/register" class="register">Get started</router-link>
    </div>
    <div class="divider"></div>
    <h2>Here's how it works</h2>
    <div class="how-it-works">
      <div class="step">
        <p>
          <b>Create any project</b>
          <br />that you want to organize and plan out.
        </p>
        <div class="img">
          <img src="../assets/step1.jpg" alt />
        </div>
      </div>
      <div class="step step-reverse">
        <div class="img">
          <img src="../assets/step2.jpg" alt />
        </div>
        <p>
          <b>Manage Tasks</b>
          <br />and be able to move them between columns.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
@import "../assets/style.css";

.wrapper {
  min-height: 100vh;
  padding-top: var(--spaceTop);
  padding-bottom: var(--space4);
}

h1,
h2,
h3 {
  font-family: var(--heading);
  text-align: center;
}

.header {
  margin-bottom: var(--space3);
  text-align: center;
}

.header h1 {
  margin-bottom: var(--spacehalf);
}

.header h3 {
  color: var(--borderColor);
  margin-bottom: var(--space3);
}

.header a {
  text-decoration: none;
  background: var(--primary);
  color: var(--light);
  padding: var(--spacehalf) var(--space2);
  text-transform: uppercase;
  border-radius: var(--round);
  font-weight: bold;
}

.divider {
  margin: var(--space4) 0;
}

.step {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step {
  flex: 1;
}

.step p {
  font-size: var(--space1half);
  margin-right: var(--space1);
}

.step-reverse {
  margin-top: var(--space1);
}

.step-reverse p {
  margin-left: var(--space1);
  margin-right: 0;
}

.img {
  max-width: 400px;
}

.img img {
  box-shadow: var(--shadow);

  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  margin-bottom: var(--space3);
}

@media (max-width: 600px) {
  .wrapper {
    padding-top: var(--spaceTopLg);
  }
  .step {
    flex-direction: column;
  }

  .step p,
  .step-reverse p {
    margin-left: 0;
    margin-right: 0;
    font-size: var(--space1);
    text-align: center;
    margin-bottom: var(--space1);
  }

  .step-reverse {
    margin-top: var(--space2);
  }

  .img {
    order: 1;
  }
}
</style>
