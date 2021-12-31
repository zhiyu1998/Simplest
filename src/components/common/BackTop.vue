<template>
	<el-backtop :bottom="100" :visibility-height="200" target=".content">
		<div class="backtop">UP</div>
	</el-backtop>
</template>
<script></script>
<style lang="less">
.backtop {
	height: 100%;
	width: 100%;
	background-color: #fff;
	box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
		15px 25px 10px rgba(0, 0, 0, 0.05) 15px 20px 20px rgba(0, 0, 0, 0.05),
		inset -10px -10px 15px rgba(255, 255, 255, 0.9);
	border-radius: 50%;
	text-align: center;
	line-height: 40px;
	color: #1989fa;
}
.backtop:hover {
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
		rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
		rgba(0, 0, 0, 0.07) 0px 16px 16px;
	background-color: #f1f2f6;
}
</style>
