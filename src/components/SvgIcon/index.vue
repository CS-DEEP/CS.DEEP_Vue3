<template>
    <svg>
        <use :xlink:href="prefix+'message'" fill="red"></use>
    </svg>
</template>

<script setup lang='ts'>
defineProps({
    prefix:{
        type:String,
        default: '#icon-'
    }
})
</script>

<style scoped lang="scss"></style>