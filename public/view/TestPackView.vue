<template>
<div>
    
</div>
</template>

<script>
export default {
    name: "TestPackView",

    props: ["fields", "values"],

    data() {
        return {}
    },

    computed: {
        valuedFields() {
            return this.fields.map(field => {
                return {
                    field: field,
                    value: this.values.filter(val => val.name === field.name)
                }
            })
        }
    },

    methods: {
    
    }
}
</script>

<style scoped>
</style><!-- Lallalalalalalala jared is gay i like programming i also like to smoke weed the dank shit so much i want to move to seattle where it is depressing and always rainy even though i know i should live in Carlsbad where it's sunny a majority of the time i should visit my friends more because my best friends are awesome i should really try and limit smoking weed because smoking too much isn't good for me tweak is a nigglet like what the fuck nigga tweakster ball so hard he went to jail am i right that shit cray i stopped dating through tinder because it's reptitive but my girlfriends just found out about it and now they think it's fun kim gave me so much for it "i am the pioneer" i should workout and take gym selfies but i shouldn't send semi nudes surprisingly to my best girlfriends because they open it in public and they're on a date and well tiffany opened it and he saw my phone and he looked away and tiff was all like "did you see that" and he was like "hahah yes" and she was like "i'm sorry my friends and i are all really close we all send semi-nudes to eachother it's weird hahahahahahahahah" fuck you jared nigga but the underwear that kim gave you looked really good so that's okay i don't know why your call is failing jared maybe it's a sign from jesus from above i like your keyboard it's very typable i like. JARED. JARED. JARED. JARED. JARRED. JARTED. hahahahahha i typed jarted. "it's turbo time" remember we sent that video to Gianni.  I WANT TO SEE YOU NOT SHAVE YOUR BEARD BECAUSE I WANT TO SEE IT GROWN OUT LIKE OMG I WANT TO SEE U LOOK LIKE A DIFF INDIVIDUAL LIKE, DIFF PROFILE OMG. WOAH. who the fuck is victor and david ziolkowski btw. i need to pee. brb. jk. i'm gonna study you ones more time. bc. its funny. ahahhahahahahahah. ok i'm gonna go pee now -->
