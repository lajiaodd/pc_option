<template>
    <div class="exercise-price">
        <Dropdown @on-click="onChanceMonth">
            <a href="javascript:void(0)" name="0">
                {{monNumber | chanceMonth}}
                <span class="san"></span>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem
                    v-for="(item, index) in months"
                    :key="index"
                    :name="index"
                >{{item}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    name: "wu_fen",
    data() {
        return {
            bianhao: 0,
        };
    },
    created() {
        console.log("this.bianhao")
        console.log(this.bianhao)
    },
    computed: {
        monNumber: {
            get() {
                if (!this.$store.state.list_month) {
                    return "";
                } else {
                    return this.$store.state.list_month[this.bianhao];
                }
            },
            set(value) {}
        },
        months: function() {
            if (!this.$store.state.list_month) {
                return [];
            } else {
                return this.$store.state.list_month;
            }
        },
    },
    methods: {
        onChanceMonth(index) {
            this.monNumber = this.months[index];
            this.bianhao = index;
            this.$emit('onselect', this.bianhao)
        }
    }
};
</script>

<style scoped>


</style>