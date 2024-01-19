<template>
<audio src="/wow2.mp3" ref="audio"></audio>
<pre type="py-editor" env="test" :target="result">
<slot></slot>
</pre>
<div :id="result" ref="target">

</div>
</template>

<script setup>
import {onMounted, ref, onUnmounted} from 'vue'
import {counter, wait} from './utils.js'
// import JSConfetti from 'js-confetti'

const props = defineProps({
    answer: String,
    timeout: Number,
})

// const confetti = new JSConfetti()
const audio = ref(null)
let confetti

function celebrate() {
    confetti.addConfetti()
    audio.value.play();
}

const result = 'result-'+counter()
const target = ref(null)
let button

function checking(){
    wait(()=>target.value.querySelector('.py-editor-box .py-editor-output'),3000)
    .then(output=>{
        wait(()=>output.innerHTML===props.answer, props.timeout||1000)
        .then(()=>{
            celebrate()
        })
        .catch(()=>{
            alert('运行超时!')
        })
        .finally(()=>{
            button.removeEventListener("click", checking)
        })
    })
}


onMounted(()=>{
    confetti = new JSConfetti()
    wait(()=>target.value.querySelector('.py-editor-box .py-editor-input .py-editor-run-button'),3000)
    .then(b=>{
        button = b
        button.addEventListener("click", checking)
    })
})

onUnmounted(()=>{
})

</script>