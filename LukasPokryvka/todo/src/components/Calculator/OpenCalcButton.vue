<template>
	<a>Calc</a>
</template>

<style lang="css" scoped>
a {
	position: fixed;
	top: 10px;
	right: 10px;
	color: white;
	font-weight: 500;
	text-decoration: none;
	padding: 0.7rem;
	background-color: #ff9671;
	border-radius: 13px;
	opacity: 0.7;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
}

a:hover {
	opacity: 1;
}

@media screen and (max-width: 400px) {
	a {
		top: auto;
		bottom: 10px;
	}
}
</style>
