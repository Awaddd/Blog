<template>
    <div>
        
        <input type="file" @change="fileSelected" ref="file">

    </div>
</template>

<script>
import { serverBus } from '../main';

export default {
    data() {
        return {
            file: ""
        }
    },
    methods: {
        fileSelected: function() {
            this.file = this.$refs.file.files[0];
            serverBus.$emit('fileSelected', this.file);
        }
    },
}
</script>