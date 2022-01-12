<template>
	<button :class="['bubbly-button', isClick ? 'animate' : '']" @click.prevent="handleClick">
		<i class="iconfont blog-approve reply-approve"></i>
		{{ like }}
	</button>
</template>
<script lang="ts">
import { onMounted, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
	props: {
		like: {
			type: Number,
			default: 0,
		},
	},
	setup(props) {
		const state = reactive({
			isClick: false,
			like: 0,
		})

		const handleClick = () => {
			state.isClick = true
			setTimeout(() => {
				state.isClick = false
			}, 700)
		}

		onMounted(() => {
			state.like = props.like
		})

		return {
			handleClick,
			...toRefs(state),
		}
	},
})
</script>
<style scoped lang="less">
@color0: #ff0081; // Appears 17 times
@color1: #ffffff; // Appears 2 times

// Width variables (appears count calculates by raw css)
@width0: 140%; // Appears 2 times

// Height variables (appears count calculates by raw css)
@height0: 100%; // Appears 2 times
.bubbly-button {
	z-index: 2;
	font-family: 'Helvetica', 'Arial', sans-serif;
	display: inline-block;
	font-size: 1em;
	padding: 0.7em 1em;
	margin-bottom: 60px;
	-webkit-appearance: none;
	appearance: none;
	background-color: @color0;
	color: @color1;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	position: relative;
	transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
	box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
	&:focus {
		outline: 0;
	}
	&:before {
		background-image: radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, transparent 20%, @color0 20%, transparent 30%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, @color0 15%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%);
		background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%,
			18% 18%;
		background-repeat: no-repeat;
		content: '';
		display: none;
		height: @height0;
		left: -20%;
		position: absolute;
		top: -75%;
		transition: all ease-in-out 0.5s;
		width: @width0;
		z-index: -1000;
	}
	&:after {
		background-image: radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, transparent 10%, @color0 15%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%),
			radial-gradient(circle, @color0 20%, transparent 20%);
		background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
		bottom: -75%;
		background-repeat: no-repeat;
		content: '';
		display: none;
		height: @height0;
		left: -20%;
		position: absolute;
		transition: all ease-in-out 0.5s;
		width: @width0;
		z-index: -1000;
	}
	&:active {
		background-color: #e60074;
		box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
		transform: scale(0.9);
	}
	&.animate {
		&:before {
			animation: topBubbles ease-in-out 0.75s forwards;
			display: block;
		}
		&:after {
			animation: bottomBubbles ease-in-out 0.75s forwards;
			display: block;
		}
	}
}

@keyframes topBubbles {
	0% {
		background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
			70% 90%;
	}
	50% {
		background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
			90% 30%;
	}
	100% {
		background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
			90% 20%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}

@keyframes bottomBubbles {
	0% {
		background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
	}
	50% {
		background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
	}
	100% {
		background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}
</style>
