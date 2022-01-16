<template>
	<div>
		<el-row justify="center">
			<el-col :span="18">
				<div class="about-content">
					<el-avatar class="about-avatar" src="avatar.jpg" :size="180"></el-avatar>
					<el-card shadow="hover" class="about-card">
						<el-row justify="center">
							<h2 style="padding: 10px 0">zhiyu1998</h2>
						</el-row>
						<el-row justify="center">
							<span style="padding: 10px 0">简洁至上 / 持续更新 / 最新技术</span>
						</el-row>
						<el-row class="about-icon" justify="center">
							<el-tooltip effect="dark" content="Github" placement="bottom-end">
								<i
									style="transform: scale(1.5); padding: 10px"
									class="iconfont blog-github"
								></i>
							</el-tooltip>
							<el-tooltip effect="dark" content="项目地址" placement="bottom-end">
								<i
									style="transform: scale(1.5); padding: 10px"
									class="iconfont blog-document"
								></i>
							</el-tooltip>
						</el-row>
						<el-row class="item">
							<h2>项目概述</h2>
							<el-divider></el-divider>
							<p>前端界面参考了Material Design 风格的 Hexo 主题</p>
						</el-row>
						<el-row class="item">
							<el-col>
								<h2>前端技术栈</h2>
								<el-divider></el-divider>
								<el-image
									class="framework-icon"
									src="https://vuejs.bootcss.com/images/logo.png"
								/>
								<el-image class="framework-icon" src="https://vitejs.cn/logo.svg" />
								<el-image
									class="framework-icon"
									src="https://www.axios-http.cn/assets/logo.svg"
								/>
								<el-image
									class="framework-icon"
									src="https://element-plus.gitee.io/images/element-plus-logo.svg"
								/>
								<el-image
									class="framework-icon"
									src="https://pinia.vuejs.org/logo.svg"
								/>
								<el-image
									class="framework-icon"
									src="https://camo.githubusercontent.com/9ad02d3d760df07fe6ed0428acd937ad8ffb871e4d825e4c435c4f195e872755/68747470733a2f2f692e696d6775722e636f6d2f42717358394e542e706e67"
								/>
								<el-image
									class="framework-icon"
									src="https://www.lodashjs.com/img/lodash.png"
								/>
							</el-col>
						</el-row>

						<el-row class="item">
							<h2>社区</h2>
							<el-divider></el-divider>
							<p>待加入</p>
						</el-row>
						<el-row class="item">
							<h2>支持</h2>
							<el-divider></el-divider>
							<p style="width: 100%">你可以扫描下方微信赞赏码支持我的开源创作。</p>
							<el-image class="qr-code" src="devote.png" lazt></el-image>
						</el-row>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script></script>
<style lang="less">
p {
	width: 100%;
}
.about-content {
	margin: 35% 0 20px 0;
	.about-card {
		animation: fadeInUp 0.5s;
		padding-top: 50px;
		border-radius: 25px;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
		.qr-code {
			left: 35%;
			width: 251px;
		}
	}
	.about-avatar {
		animation: bounceInDown 1.3s;
		position: absolute;
		left: 45%;
		margin-top: -6%;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
	}
	.framework-icon {
		animation: slideInLeft 1s;
		width: 100px;
		padding: 0 10px;
	}
	.item {
		margin-bottom: 20px;
	}
}
</style>
