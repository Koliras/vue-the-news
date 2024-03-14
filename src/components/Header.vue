<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/" class="routerLink">Home</RouterLink>
                <RouterLink to="/about" class="routerLink">About</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    width: 100%;
    padding: 1rem 2rem;
    background-color: lightblue;
    justify-content: flex-end;
}

nav {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
}

.routerLink {
    color: darkblue;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.25rem;
}
</style>
