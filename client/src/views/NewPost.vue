<template>
    <div class="create-posts"> 
        <div class="add-post-form">
            <div>
            <input type="text" name="title" placeholder="Title" v-model="title">
            </div>
            <div>
            <textarea rows="22" placeholder="Content" v-model="content"></textarea>
            </div>
            <div>
            <button class="button btn-action primary" @click.prevent="addPost">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        async addPost () {
            await PostsService.addPost({
                title: this.title,
                content: this.content
            })
            this.$router.push({name: 'Posts'})
        }
    }
}
</script>


<style lang="scss">

@import '../styles/app.scss';

    .create-posts {
        background: $dull;
    }

    .add-post-form {
        margin: 0 auto;
        width: 100%;
        padding: 2rem;
        box-sizing: border-box;
        display: grid;
        grid-gap: 20px;

        div input, div textarea, div button{
            width: 100%;
        }
    }


    @media only screen and (min-width: 700px) {
        .add-post-form{
            width: 500px;
        }
    }

    // @media only screen and (min-width: 1200px) {
 
    // }

    // @media only screen and (min-width: 1600px) {

    // }

</style>
