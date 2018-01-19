<template lang="html">
    <div class="">
        <search-header></search-header>

        <results v-if='showResult'></results>
    </div>
</template>

<script>
export default {
name: 'home',
    data () {
        return {
            showResult: true
        }
    }
}
</script>
