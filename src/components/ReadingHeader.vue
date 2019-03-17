<template>
  <nav class="reading-header navbar navbar-expand-lg navbar-dark bg-dark">
		<span class="navbar-brand">Back</span>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">Settings</li>
			</ul>
			<ul class="navbar-nav">
				<li class="nav-item dropdown mr-3">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Mode
					</a>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="#">One page mode</a>
						<a class="dropdown-item" href="#">Multi page mode</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ReadingHeader extends Vue {}
</script>

<style scoped lang="scss">
</style>