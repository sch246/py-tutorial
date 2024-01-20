<template>
<audio src="/wow2.mp3" ref="audio"></audio>
<div v-show="show">
    <slot></slot>
</div>
<div v-show="show">
    <slot></slot>
</div>
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
let show = ref(false)
let show = ref(false)
let confetti

let target
let button
function celebrate() {

    confetti.addConfetti()

    audio.value.play();

    show.value = true

    let classList = target.parentNode.classList
    classList.remove('important')
    classList.remove('warning')
    classList.add('tip')

    // button.removeEventListener("click", checking)

}

function wrongAnswer(){
    let classList = target.parentNode.classList
    classList.remove('important')
    classList.remove('tip')
    classList.add('warning')
}



function checking(){
    wait(()=>target.querySelector('.py-editor-box .py-editor-output'), 3000)
    .then(output=>{
        wait(()=>target.getAttribute('state')==='finished', props.timeout||10000)
        .then(()=>{
            if (output.innerHTML===props.answer){
                celebrate()
            } else {
                wrongAnswer()
            }
        })
        .catch(()=>{
            alert('运行超时!')
        })
    })
}


onMounted(()=>{
    target = document.getElementById(props.target)
    confetti = new JSConfetti()
    wait(()=>target.querySelector('.py-editor-box .py-editor-input .py-editor-run-button'), 3000)
    .then(button=>{
        button.addEventListener("click", checking)
    })
})

onUnmounted(()=>{
})

</script>