<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<router-link class="navbar-brand" to="/"><img width="50px" :src="require('@/assets/logo.png')"></router-link>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li :class="{'active': $route.name === 'manga-view'}" class="nav-item">
					<router-link class="nav-link" to="/manga">Manga</router-link>
				</li>
				<li :class="{'active': $route.name === 'anime'}" class="nav-item">
					<router-link class="nav-link" to="/anime">Anime</router-link>
				</li>
				<li :class="{'active': $route.name === 'about'}" class="nav-item">
					<router-link class="nav-link" to="/about">About</router-link>
				</li>
			</ul>
			<ul class="navbar-nav">
				<li class="nav-item dropdown mr-3">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Guest
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="#">Login with Google</a>
						<a class="dropdown-item" href="#">Login with Facebook</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
	nav {
		position: fixed;
		width: 100%;
		z-index: 9999;
	}
</style>
