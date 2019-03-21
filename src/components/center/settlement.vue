<template>
    <div class="center">
        <div class="title">
            <span style="font-size: 26px; vertical-align: middle;">●</span>
            <span style="padding-left: 10px; vertical-align: middle;">结算清单</span>
        </div>
         <Divider type="horizontal" />

         <div class="center-content">
            
         </div>
    </div>
</template>

<script>
export default {
    name: "center",
    data() {
        return {
            buttonSize: 'large',
        };
    }
};
</script>

<style scoped>
.title {
    font-size: 16px;
    color: rgb(162, 77, 19); 
    font-weight: bold;
    
}

</style>
