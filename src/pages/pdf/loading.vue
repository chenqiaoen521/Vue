<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
  </div>
</template>
<script>
export default {
  name: 'loading'
}
</script>
<style>
	.loading {
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(255,255,255,0.6);
    position: absolute;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>