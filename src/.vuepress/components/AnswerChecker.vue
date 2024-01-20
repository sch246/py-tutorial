<template>
<audio src="/wow2.mp3" ref="audio"></audio>
</template>

<script setup>
import {onMounted, ref, onUnmounted} from 'vue'
import {counter, wait} from './utils.js'
// import JSConfetti from 'js-confetti'

const props = defineProps({
    target: String,
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
let target


function checking(){
    wait(()=>target.querySelector('.py-editor-box .py-editor-output'),3000)
    .then(output=>{
        wait(()=>output.innerHTML===props.answer, props.timeout||10000)
        .then(()=>{
            celebrate()
        })
        .catch(()=>{
            alert('运行超时!')
        })
    })
}


onMounted(()=>{
    target = document.getElementById(props.target)
    confetti = new JSConfetti()
    wait(()=>target.querySelector('.py-editor-box .py-editor-input .py-editor-run-button'),3000)
    .then(button=>button.addEventListener("click", checking))
})

onUnmounted(()=>{
})

</script>