<template>
<audio src="/wow2.mp3" ref="audio"></audio>
<div v-show="show">
    <slot></slot>
</div>
</template>

<script setup>
import {onMounted, ref, onUnmounted} from 'vue'
import {wait} from './utils.js'
// import JSConfetti from 'js-confetti'

const props = defineProps({
    target: String,
    answer: String,
    timeout: Number,
})

// const confetti = new JSConfetti()
const audio = ref(null)
let show = ref(false)
let confetti

let target
let button
function celebrate() {

    show.value = true

    if (target.parentNode.classList.includes('hint-container')){
        // 只有在框框里才会播放音乐啥的
        confetti.addConfetti()

        audio.value.play();

        let classList = target.parentNode.classList
        classList.remove('important')
        classList.remove('warning')
        classList.add('tip')
    }

    // button.removeEventListener("click", checking)

}

function wrongAnswer(){
    if (target.parentNode.classList.includes('hint-container')){
        let classList = target.parentNode.classList
        classList.remove('important')
        classList.remove('tip')
        classList.add('warning')
    }
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
        .catch(e=>{
            alert('运行超时!\n'+e)
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