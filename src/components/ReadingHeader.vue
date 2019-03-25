<template>
  <nav
		:class="{ 'position-fixed': $route.query.mode === 'multi-page' }"
		class="p-0 mb-3 reading-header navbar navbar-expand-lg navbar-dark bg-dark"
	>
		<router-link
			:to="mangaInfo ? `/manga/${mangaInfo.id}` : ''"
			class="mr-0 mr-lg-3 clickable arrow-wrapper navbar-brand"
		>
			<span class="back-arrow">&laquo;</span>
		</router-link>
		<router-link
			v-if="mangaInfo"
			:to="`/manga/${mangaInfo.id}`"
			class="mr-lg-5 mb-0 d-none d-lg-block"
			tag="h4"
		>
			{{ mangaInfo.name }}
		</router-link>
		<select
			v-if="mangaInfo"
			class="ml-lg-3 d-lg-none mobile-chapter-select form-control form-control-sm"
		>
			<option
				v-for="chapter in mangaInfo.chapterList"
				:key="chapter.id"
				v-text="chapter.name"
			/>
		</select>
		<select
			v-else
			class="ml-lg-3 d-lg-none mobile-chapter-select form-control form-control-sm"
		>
			<option>Loading...</option>
		</select>
		<button class="mr-3 navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="ml-auto navbar-nav">
				<li class="d-lg-none navbar-brand">
					{{ mangaInfo ? mangaInfo.name : 'Loading...' }}
				</li>
				<li class="px-5 px-lg-0 mr-lg-3 mb-3 mb-lg-0 nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Mode
					</a>
					<div class="text-center dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" href="#">One page mode</a>
						<a class="dropdown-item" href="#">Multi page mode</a>
					</div>
				</li>
				<li class="mr-3 d-none d-lg-flex form-inline">
					<select
						v-if="mangaInfo"
						class="desktop-chapter-select form-control form-control-sm"
					>
						<option
							v-for="chapter in mangaInfo.chapterList"
							:key="chapter.id"
							v-text="chapter.name"
						/>
					</select>
					<select
						v-else
						class="form-control form-control-sm"
					>
						<option>Loading...</option>
					</select>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ChapterReading from '@/store/modules/chapter-reading.ts';
import { Manga, Chapter } from '@/models/manga.ts';
import { getModule } from 'vuex-module-decorators';

@Component
export default class ReadingHeader extends Vue {
	chapterReading = getModule(ChapterReading, this.$store);

	get chapterInfo(): Chapter | null {
		return this.chapterReading.chapterInfo;
	}

	get mangaInfo(): Manga | null {
		return this.chapterReading.mangaInfo;
	}
}
</script>

<style scoped lang="scss">
	nav {
		width: 100%;
		z-index: 9999;
	}

	.arrow-wrapper {
		background-color: #3f3b8b;
		font-size: 40px;
		padding: 5px 10px;
	}

	.mobile-chapter-select {
		width: 20%;
		flex-grow: 0.8;
	}

	.desktop-chapter-select {
		max-width: 240px;
	}

	.back-arrow {
		position: relative;
		top: -2px;
	}
</style>